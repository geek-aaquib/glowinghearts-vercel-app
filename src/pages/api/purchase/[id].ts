// pages/api/purchase/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { SERVICE_URL } from '@/constants/raffleConstants'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).end('Method Not Allowed') }

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  const { id } = req.query as { id?: string }
  if (!id) return res.status(400).json({ error: 'Missing id' })

  try {
    const r = await fetch(`${SERVICE_URL}/Purchase/${encodeURIComponent(id)}`, { cache: 'no-store' })
    if (!r.ok) {
      // 404 or transient backend errors → tell client to keep polling
      return res.status(202).json({ ready: false })
    }
    const body = await r.json()

    const purchase = Array.isArray(body?.obj_Purchases) ? body.obj_Purchases[0] : null
    if (!purchase) return res.status(202).json({ ready: false })

    // Normalize a compact response for the Success page
    const packages = purchase.obj_Packages || []
    const tickets = packages.flatMap((p: any) => p?.obj_Tickets || [])

    return res.status(200).json({
      ready: true,
      purchase: {
        Guid_RaffleId: purchase.Guid_RaffleId,
        Guid_PurchaseId: purchase.Guid_PurchaseId,
        Dt_Purchased: purchase.Dt_Purchased,
        Int_TotalTickets: purchase.Int_TotalTickets,
        Dec_TotalPrice: purchase.Dec_TotalPrice,
        Int_AgeVerified: purchase.Int_AgeVerified,
        Int_TC_Confirmed: purchase.Int_TC_Confirmed,
        VC_PlayerEmail: purchase.VC_PlayerEmail,
        VC_PlayerFullName: purchase.VC_PlayerFullName,
        VC_PlayerAddr1: purchase.VC_PlayerAddr1,
        VC_PlayerAddr2: purchase.VC_PlayerAddr2,
        VC_PlayerCity: purchase.VC_PlayerCity,
        VC_PlayerProvince: purchase.VC_PlayerProvince,
        VC_PlayerPostalCode: purchase.VC_PlayerPostalCode,
        VC_PlayerPhone: purchase.VC_PlayerPhone,
        packages,   // includes Int_NumbTicket, Dec_Price, VC_Description, obj_Tickets, etc.
        tickets,    // flattened convenience list for stubs
      },
    })
  } catch (e) {
    // Network/exception → keep polling
    return res.status(202).json({ ready: false })
  }
}