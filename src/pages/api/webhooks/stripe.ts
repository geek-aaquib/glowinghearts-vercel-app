// pages/api/webhooks/stripe.ts
import { SERVICE_URL } from '@/constants/raffleConstants'
import { buffer } from 'micro'
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

export const config = { api: { bodyParser: false } }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

// Tiny helpers
function safeJson<T>(v: string | undefined, fb: T): T {
  try {
    return v ? JSON.parse(v) : fb
  } catch {
    return fb
  }
}
function toLocalDateTimeString(d: Date, timeZone = 'America/Toronto') {
  return d.toLocaleString('sv-SE', { // ISO-like format
    timeZone,
    hour12: false
  }).replace('T', ' ')
}
async function fetchWithTimeout(
  input: RequestInfo,
  init: RequestInit = {},
  timeoutMs = 10000,
) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(id)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  // 1) Verify signature
  let event: Stripe.Event
  try {
    const sig = req.headers['stripe-signature'] as string
    const buf = await buffer(req)
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret)
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err?.message)
    return res.status(400).send(`Webhook Error: ${err?.message}`)
  }

  // Debug context
  const accountId = (event as any).account as string | undefined
  const attempt = req.headers['stripe-event-attempt'] || '1'
  console.log(
    `📦 [Webhook] id=${event.id} type=${event.type} acct=${accountId || 'platform'} attempt=${attempt}`,
  )

  // 2) Only handle the session.completed we care about
  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true, ignored: event.type })
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session
    if (session.payment_status !== 'paid') {
      console.log('↩︎ Not paid; ack.')
      return res.status(200).json({ received: true, skipped: 'not_paid' })
    }

    const raffleID = session.metadata?.raffleID
    if (!raffleID)
      return res.status(400).send('Missing raffleID in session.metadata')

    // ---------- Build payload for your backend Save Purchase API ----------
    const Guid_PurchaseId = session.id // idempotent: use session.id
    const customer = session.customer_details
    const amount = session.amount_total || 0
    const obj_BuyIns = safeJson(session.metadata?.obj_BuyIns, [])
    const isAgeConfirmed = session.metadata?.isAgeConfirmed
    const isTCConfirmed = session.metadata?.isTCConfirmed
    const client_ip = session.metadata?.client_ip
    const client_geo = session.metadata?.clien_geo
    // Custom field "full_name" added during checkout session creation
    const fullName =
      session.custom_fields?.find((f) => f.key === 'full_name')?.text?.value ||
      customer?.name ||
      ''
    // PaymentIntentId for handling refunds
    const piId =
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id

    console.log('🔎 PI on session:', session.payment_intent)
    if (!piId)
      console.warn('⚠️ No PaymentIntent on session', { sessionId: session.id })

    // Fetch the PaymentIntent with the latest charge + its balance_tx expanded
    const pi = await stripe.paymentIntents.retrieve(

      piId!,

      { expand: ['latest_charge.balance_transaction'] },

      accountId ? { stripeAccount: accountId } : undefined

    )

    // Narrow the types a bit
    const latestCharge = pi.latest_charge as Stripe.Charge | null
    const balTx = latestCharge?.balance_transaction as Stripe.BalanceTransaction | string | null

    // Best-effort paidAt time (Unix seconds)
    let paidAtUnix: number | undefined

    // 1) Prefer the BalanceTransaction.created (time Stripe recorded funds movement)
    if (balTx && typeof balTx !== 'string' && typeof balTx.created === 'number') {
      paidAtUnix = balTx.created
    }
    // 2) Else use the Charge.created (creation/capture time for automatic capture)
    else if (latestCharge && typeof latestCharge.created === 'number') {
      paidAtUnix = latestCharge.created
    }
    // 3) Else fall back to the webhook event time
    else {
      paidAtUnix = event.created
    }

    // Format as UTC ISO, or your DB-friendly “YYYY-MM-DD HH:mm:ss”
    const paidAtISO = toLocalDateTimeString(new Date(paidAtUnix * 1000))
    const dtPurchased = paidAtISO.replace('T', ' ').slice(0, 19)

    const payload = {
      Guid_RaffleId: raffleID,
      Guid_PurchaseId,
      Guid_IntentId: piId,
      Dt_Purchased: dtPurchased,
      Dec_PurchaseAmount: amount / 100,
      VC_PlayerEmail: customer?.email ?? '',
      VC_PlayerFullName: fullName,
      VC_PlayerAddr1: customer?.address?.line1 ?? '',
      VC_PlayerAddr2: customer?.address?.line2 ?? '',
      VC_PlayerCity: customer?.address?.city ?? '',
      VC_PlayerProvince: customer?.address?.state ?? '',
      VC_PlayerPostalCode: customer?.address?.postal_code ?? '',
      VC_PlayerPhone: customer?.phone,
      Int_AgeVerified: isAgeConfirmed ? 1 : 0,
      Int_TC_Confirm: isTCConfirmed ? 1 : 0,
      VC_PurchaseIP: client_ip,
      VC_GeoLocation: client_geo,
      obj_BuyIns,
    }

    console.log('📦 Payload to save purchase:', payload)

    console.log(
      `📨 POST ${SERVICE_URL}/Sale/${raffleID}  (purchase=${Guid_PurchaseId})`,
    )
    // 3) CRITICAL: time-box this call; return 4xx on any failure so Stripe retries
    const resp = await fetchWithTimeout(
      `${SERVICE_URL}/Purchase/Sale/${raffleID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': `stripe-session-${Guid_PurchaseId}`,
        },
        body: JSON.stringify(payload),
      },
      15000,
    )

    if (!resp.ok) {
      const text = await resp.text()
      console.error(`❌ Save Purchase failed ${resp.status}: ${text}`)
      return res.status(400).send('Save Purchase failed') // ← cause Stripe retry
    }

    const json = await resp.json()
    const tickets = json?.obj_Packages?.[0]?.obj_Tickets || []
    console.log(`🎟️ Saved OK. Tickets=${tickets.length}. ACK ${event.id}`)
    return res.status(200).json({ received: true })
  } catch (err: any) {
    console.error(`❌ Handler error id=${event.id}`, err)
    return res
      .status(400)
      .send(`Webhook handler error: ${err?.message || 'unknown'}`) // ← cause Stripe retry
  }
}
