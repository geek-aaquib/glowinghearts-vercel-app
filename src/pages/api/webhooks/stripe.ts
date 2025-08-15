// pages/api/webhooks/stripe.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { buffer } from 'micro'
import { SERVICE_URL } from '@/constants/raffleConstants'

/**
 * Next.js API route config:
 *  - We MUST read the raw body to verify Stripe signatures.
 *  - Disable body parsing so `buffer(req)` gets the untouched payload.
 */
export const config = { api: { bodyParser: false } }

// Stripe SDK: use your secret key + explicit API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

// Your webhook signing secret from `stripe listen --print-secret`
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

/**
 * Small helper: safely JSON.parse or return fallback
 */
function safeJson<T>(value: string | undefined, fallback: T): T {
  if (!value) return fallback
  try { return JSON.parse(value) as T } catch { return fallback }
}

/**
 * Small helper: chunk a long string so each piece fits in Stripe metadata.
 * Stripe metadata values must be short (~500 chars). We use 450 for safety.
 */
function chunkString(s: string, max = 450) {
  const out: string[] = []
  for (let i = 0; i < s.length; i += max) out.push(s.slice(i, i + max))
  return out
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only accept POSTs from Stripe
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  // Verify signature and construct the Stripe Event
  let event: Stripe.Event
  try {
    const sig = req.headers['stripe-signature'] as string
    const buf = await buffer(req) // raw body
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret)
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err?.message)
    return res.status(400).send(`Webhook Error: ${err?.message}`)
  }

  // Useful debug context (you'll see these in your dev terminal)
  const connectedAccountId = (event as any).account as string | undefined
  const attempt = req.headers['stripe-event-attempt'] || '1'
  console.log(
    `📦 [Webhook Received]`,
    `Event ID: ${event.id}`,
    `Type: ${event.type}`,
    `Account: ${connectedAccountId || 'platform'}`,
    `Attempt: ${attempt}`,
    `Mode: ${event.livemode ? 'LIVE' : 'TEST'}`
  )

  try {
    // We only care about "checkout.session.completed" for fulfillment.
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      console.log(`💳 session.completed → payment_status=${session.payment_status} raffle=${session.metadata?.raffleID || 'N/A'}`)

      // Only fulfill when Stripe says it's paid.
      if (session.payment_status !== 'paid') {
        console.log('ℹ️ Not paid; acknowledging without fulfillment.')
        return res.json({ received: true })
      }

      // Pull raffle id from the session metadata (set in your checkout create call)
      const raffleID = session.metadata?.raffleID
      if (!raffleID) throw new Error('raffleID missing in session.metadata')

      /**
       * (Optional but recommended) Guard against late payments:
       * Check with your backend if sales are already closed.
       * If yes, refund and acknowledge (but do not fulfill).
       */
      try {
        const rRes = await fetch(`${SERVICE_URL}/Raffle/${raffleID}`)
        const rData = await rRes.json()
        const salesEndStr = rData?.obj_RaffleData?.Dt_SalesClose
        const salesEnd = salesEndStr ? new Date(salesEndStr).getTime() : 0
        if (salesEnd && Date.now() >= salesEnd) {
          const piId = typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id
          if (piId) {
            await stripe.refunds.create(
              { payment_intent: piId, reason: 'requested_by_customer' },
              { stripeAccount: connectedAccountId } // Connect refund
            )
            console.log(`⛔️ Post-close payment refunded for session ${session.id}`)
          }
          return res.json({ received: true, ignored: 'after_close' })
        }
      } catch (e) {
        console.warn('⚠️ salesEnd check failed; proceeding with fulfillment.')
      }

      // ---------- Build payload for your backend Save Purchase API ----------
      const Guid_PurchaseId = session.id // idempotent: use session.id
      const customer = session.customer_details
      const amount = session.amount_total || 0
      const createdISO = new Date(session.created * 1000).toISOString()
      const obj_BuyIns = safeJson(session.metadata?.obj_BuyIns, [])
      const isAgeConfirmed = session.metadata?.isAgeConfirmed
      const isTCConfirmed = session.metadata?.isTCConfirmed
      const client_ip = session.metadata?.client_ip;
      const client_geo = session.metadata?.clien_geo;
      // Custom field "full_name" added during checkout session creation
      const fullName =
        session.custom_fields?.find(f => f.key === 'full_name')?.text?.value ||
        customer?.name ||
        ''

      const payload = {
        Guid_RaffleId: raffleID,
        Guid_PurchaseId,
        Dt_Purchased: createdISO.replace('T', ' ').slice(0, 19),
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

      console.log('payload is.........'+payload)
      // ---------- Fulfill on your backend (this should send email + return tickets) ----------
      console.log(`📨 POST ${SERVICE_URL}/Sale/${raffleID}`)
      const saleRes = await fetch(`${SERVICE_URL}/Sale/${raffleID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!saleRes.ok) {
        const text = await saleRes.text()
        console.error(`❌ Backend Sale POST failed: ${saleRes.status} ${text}`)
        // Throw so Stripe will retry delivery automatically
        throw new Error(`Backend Sale POST failed: ${saleRes.status} ${text}`)
      }

      const saleData = await saleRes.json()
      // Defensive extraction: tickets are strings, preserve leading zeros
      const tickets: string[] =
        saleData?.obj_Packages?.obj_Packages?.flatMap((pkg: any) => pkg?.obj_Tickets || []) || []
      console.log(`🎟️ Received ${tickets.length} ticket(s) from backend.`)

      // ---------- (Optional) Fetch extras for your Success page ----------
      // These are just convenience; they don't affect acknowledgment.
      let VC_BannerLocation = ''
      try {
        const bRes = await fetch(`${SERVICE_URL}/Banner/${raffleID}/50`)
        const bData = await bRes.json()
        VC_BannerLocation = bData?.obj_Banner?.[0]?.VC_BannerLocation || ''
      } catch {}

      // ---------- Mark fulfillment in Stripe + store tickets in Session metadata ----------
      try {
        // 1) Prepare chunked tickets JSON so we fit Stripe metadata limits
        const ticketsJson = JSON.stringify(tickets) // e.g. ["070657417","..."]
        const chunks = chunkString(ticketsJson, 450) // ~450 chars per chunk for safety

        const metaUpdate: Record<string, string> = {
          app_fulfilled: 'true',
          tickets_chunk_count: String(chunks.length),
        }
        chunks.forEach((c, i) => { metaUpdate[`tickets_${i}`] = c })

        // Also handy to expose banner url (short string)
        if (VC_BannerLocation) metaUpdate['banner_img'] = VC_BannerLocation

        // 2) Update the Checkout Session metadata (Connect-aware)
        await stripe.checkout.sessions.update(
          session.id,
          { metadata: metaUpdate },
          { stripeAccount: connectedAccountId }
        )

        // 3) (Optional) Mirror the flag on the PaymentIntent as well
        const piId = typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id
        if (piId) {
          await stripe.paymentIntents.update(
            piId,
            { metadata: { app_fulfilled: 'true' } },
            { stripeAccount: connectedAccountId }
          )
        }

        console.log(`🏷️ Marked fulfilled and stored ${tickets.length} ticket(s) in session metadata.`)
      } catch (e) {
        // If metadata update fails, still return 200 so Stripe doesn't retry
        console.warn('⚠️ Could not update session metadata with tickets.', e)
      }

      // ---------- All done; acknowledge to Stripe (prevents retries) ----------
      return res.json({ received: true })
    }

    // Ignore other event types (but still 200 them so Stripe is happy)
    console.log(`ℹ️ Ignored event type: ${event.type}`)
    return res.json({ received: true })
  } catch (err: any) {
    // Any error here returns non-2xx → Stripe will retry automatically
    console.error(`❌ Webhook handler error [${event.type}] Attempt ${attempt}`, err)
    return res.status(400).send(`Webhook handler error: ${err?.message}`)
  }
}