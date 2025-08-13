// pages/api/stripe/session/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

// Server-side Stripe client (secret key)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).end('Method Not Allowed')
  }

  // Ensure the response is never cached (so your success page poll is fresh)
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  const { id } = req.query as { id?: string }
  const account = (req.query.account as string) || undefined // Stripe Connect: pass ?account=acct_...

  if (!id || !/^cs_/.test(id)) {
    return res.status(400).json({ error: 'Invalid or missing session id' })
  }

  try {
    // One call to get everything we need:
    //  - line_items
    //  - customer_details (name/email/phone/address)
    //  - payment_intent (to read mirrored fulfilled flag if needed)
    const session = await stripe.checkout.sessions.retrieve(
      id,
      { expand: ['line_items', 'customer_details', 'payment_intent'] },
      account ? { stripeAccount: account } : undefined
    )

    // Gate the UI on this flag:
    // Either set on Checkout Session metadata or mirrored on PaymentIntent metadata
    const fulfilled =
      session.metadata?.app_fulfilled === 'true' ||
      (typeof session.payment_intent !== 'string' &&
        session.payment_intent?.metadata?.app_fulfilled === 'true') ||
      false

    // Reassemble ticket numbers from metadata chunks (set by webhook)
    let tickets: string[] = []
    const count = Number(session.metadata?.tickets_chunk_count || 0)
    if (count > 0) {
      let combined = ''
      for (let i = 0; i < count; i++) {
        combined += session.metadata?.[`tickets_${i}`] || ''
      }
      try { tickets = JSON.parse(combined) as string[] } catch {}
    }

    // Flatten custom_fields array → simple map: { full_name: "Jane Doe", ... }
    const cf = (session.custom_fields || []) as Array<any>
    const custom_fields_map = Object.fromEntries(
      cf.map(f => [f.key, f?.text?.value ?? f?.dropdown?.value ?? null])
    )

    // Lean list of line items for rendering in your success page
    const line_items = (session.line_items?.data || []).map(li => ({
      id: li.id,
      description: li.description,
      quantity: li.quantity || 0,
      unit_amount: li.price?.unit_amount ?? null, // cents
      currency: li.currency ?? session.currency ?? null,
    }))

    // Lean customer details for rendering
    const customer_details = session.customer_details
      ? {
          name: session.customer_details.name || null,
          email: session.customer_details.email || null,
          phone: session.customer_details.phone || null,
          address: session.customer_details.address
            ? {
                line1: session.customer_details.address.line1 || null,
                line2: session.customer_details.address.line2 || null,
                city: session.customer_details.address.city || null,
                state: session.customer_details.address.state || null,
                postal_code: session.customer_details.address.postal_code || null,
                country: session.customer_details.address.country || null,
              }
            : null,
        }
      : null

    // Optional banner url you stored on metadata (handy for your header image)
    const banner_img = session.metadata?.banner_img || null

    // Respond with everything the Success page needs in ONE call
    return res.status(200).json({
      // Fulfillment state — your UI should wait until this is true
      fulfilled,

      // Basics
      id: session.id,
      created: session.created,           // unix seconds
      amount_total: session.amount_total, // cents
      currency: session.currency,

      // Cross-link back to your raffle page
      metadata: { raffleID: session.metadata?.raffleID || null },

      // Details to render
      custom_fields_map,
      line_items,
      customer_details,
      tickets,
      banner_img,
    })
  } catch (err: any) {
    return res.status(err?.statusCode || 500).json({ error: err?.message || 'Failed to retrieve session' })
  }
}