'use server'
// pages/api/checkout-sessions.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  console.log(req.body)
  try {
    // Expect tickets with quantity
    const { tickets } = req.body as {
      tickets: {
        Int_NumbTicket: string
        Dec_Price: number
        quantity: number
        Guid_BuyIn: string
        Total_Price: number
      }[]
    }
    const raffleID = req.body.raffleId
    const charityKey = req.body.charity_key
    const isAgeConfirmed = req.body.isAgeConfirmed
    const isTCConfirmed = req.body.isTCConfirmed
    const client_ip = req.body.client_ip;
    const clien_geo = req.body.clien_geo;

    if (!tickets?.length) {
      return res.status(400).json({ error: 'No tickets selected' })
    }

    // Build Stripe line items
    const line_items = tickets.map((t) => ({
      price_data: {
        currency: 'cad',
        product_data: { name: `${t.Int_NumbTicket}-ticket pack` },
        unit_amount: Math.round(t.Dec_Price * 100),
      },
      quantity: t.quantity,
    }))

    // creating obj_buyins
    const obj_BuyIns = tickets.map((t) => ({
      Guid_BuyIn: t.Guid_BuyIn,
      Int_PackageCount: t.quantity,
    }))

    // ---- Sales window checks (ALLOW up to salesEnd; block only before open/after close)
    const now = Date.now()
    const salesStart = new Date(req.body.startDate).getTime()
    const salesEnd = new Date(req.body.endDate).getTime()

    if (Number.isNaN(salesStart) || Number.isNaN(salesEnd)) {
      return res.status(400).json({ error: 'Invalid sales window' })
    }
    if (now < salesStart) {
      return res.status(403).json({ error: 'Sales have not opened yet.' })
    }
    if (now >= salesEnd) {
      return res.status(403).json({ error: 'Sales have closed.' })
    }

    // ---- Custom expiration: only set when >= 30 minutes remain (Stripe rule)
    const THIRTY_MIN = 30 * 60 * 1000
    const maxExpiresAt = now + 24 * 60 * 60 * 1000 // Stripe max 24h from now
    const desired = Math.min(salesEnd - 5_000, maxExpiresAt) // end a few seconds early
    const expiresAtSeconds =
      desired - now >= THIRTY_MIN ? Math.floor(desired / 1000) : undefined

    // Create the Checkout Session

    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        billing_address_collection: 'required',
        phone_number_collection: { enabled: true },
        custom_fields: [
          {
            key: 'full_name',
            label: { type: 'custom', custom: 'Full Legal Name' },
            type: 'text',
            optional: false,
          },
        ],
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}&account=${charityKey}`,
        cancel_url: `${req.headers.origin}/raffles/${raffleID}`,
        metadata: {
          raffleID: raffleID,
          isAgeConfirmed: isAgeConfirmed,
          isTCConfirmed: isTCConfirmed,
          obj_BuyIns: JSON.stringify(obj_BuyIns),
          client_ip: client_ip,
          clien_geo: clien_geo,
          salesEndISO: new Date(salesEnd).toISOString(), // (optional) helpful for debugging
        },
        // ...(expiresAtSeconds ? { expires_at: expiresAtSeconds } : {}),
      },
      { stripeAccount: charityKey },
    )


    // console.log('Test Meta Data' + JSON.stringify(session?.metadata))
    return res.status(200).json({ sessionId: session.id })

  } catch (err: any) {
    console.error('❌ Stripe Error:', err)
    return res
      .status(500)
      .json({ error: err?.message || 'Internal server error' })
  }
}
