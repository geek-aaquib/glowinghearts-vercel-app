'use client'

import { GradientBackground } from '@/components/gradient'
import TicketStub from '@/components/ticket-stub'
import Head from 'next/head'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { format } from "date-fns"

type Purchase = {
  Guid_RaffleId: string
  Guid_PurchaseId: string
  Dt_Purchased: string  // ISO
  Int_TotalTickets: number
  Dec_TotalPrice: number
  Int_AgeVerified: number
  Int_TC_Confirmed: number
  VC_PlayerEmail: string
  VC_PlayerFullName: string
  VC_PlayerAddr1: string
  VC_PlayerAddr2: string
  VC_PlayerCity: string
  VC_PlayerProvince: string
  VC_PlayerPostalCode: string
  VC_PlayerPhone: string
  packages: Array<{
    VC_Description?: string
    Int_NumbTicket?: number
    Dec_Price?: number
    obj_Tickets?: string[]
  }>
  tickets: string[]
}

export default function SuccessPage() {
  const params = useSearchParams()
  const sessionId = params?.get('session_id') || ''

  const [purchase, setPurchase] = useState<Purchase | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeoutHit, setTimeoutHit] = useState(false)

  useEffect(() => {
    if (!sessionId) return
    let cancelled = false
    let tries = 0

    const poll = async () => {
      tries++
      const r = await fetch(`/api/purchase/${encodeURIComponent(sessionId)}?_${Date.now()}`, { cache: 'no-store' })
      const data = await r.json()

      if (cancelled) return
      if (data?.ready && data?.purchase) {
        setPurchase(data.purchase)
        setLoading(false)
      } else if (tries < 60) {
        setTimeout(poll, 2000) // ~2 minutes
      } else {
        setTimeoutHit(true)
        setLoading(false)
      }
    }

    poll()
    return () => { cancelled = true }
  }, [sessionId])

  if (!sessionId) {
    return <div className="p-10 text-center">Missing session details.</div>
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>Finalizing your purchase…</title>
          <meta name="robots" content="noindex,nofollow" />
          <link
            rel="icon"
            href="/logos/icon.svg"// Path to your custom favicon
            type="image/svg+xml"
          />
        </Head>
        <main className="overflow-hidden">
          <GradientBackground />
          <div className="mx-auto max-w-2xl p-10 text-center">
            <h1 className="text-2xl font-semibold">Finalizing your purchase…</h1>
            <p className="mt-2 text-gray-600">We’re confirming your tickets. This can take a few seconds.</p>
          </div>
        </main>
      </>
    )
  }

  if (timeoutHit || !purchase) {
    return (
      <>
        <Head>
          <title>Processing your order…</title>
          <meta name="robots" content="noindex,nofollow" />
          <link
            rel="icon"
            href="/logos/icon.svg" // Path to your custom favicon
            type="image/svg+xml"
          />
        </Head>
        <main className="overflow-hidden">
          <GradientBackground />
          <div className="mx-auto max-w-xl p-10 text-center">
            <h1 className="text-xl font-semibold text-red-600">We’re still processing your order</h1>
            <p className="mt-2 text-gray-700">
              Your payment was successful, but we haven’t received ticket confirmation yet. Please refresh in a moment.
              If this persists, contact {process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support'} with your order ID.
            </p>
          </div>
        </main>
      </>
    )
  }

  const orderNumber = purchase.Guid_PurchaseId
  const raffleID = purchase.Guid_RaffleId
  const tickets = purchase.tickets || []

  return (
    <>
      <Head>
        <title>Success - Glowing Hearts Fundraising</title>
        <meta name="description" content="Thank you for your purchase!" />
        <link
          rel="icon"
          href="/logos/icon.svg"// Path to your custom favicon
          type="image/svg+xml"
        />
      </Head>
      <main className="overflow-hidden">
        <GradientBackground />
        <div className="mx-auto mt-10 max-w-4xl space-y-8 p-6">

          <div className="text-center">
            <Link href={`/raffles/${raffleID}`} className="inline-block rounded bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
              Back to Raffle Page
            </Link>
          </div>

          <h1 className="text-center text-3xl font-bold text-green-600">Thank you for your purchase!</h1>
          <p className="text-center text-gray-700">
            Your Order (Purchase ID) <span className="font-mono font-bold text-black">{orderNumber}</span> was confirmed on{' '}
            <time dateTime={format(new Date(purchase.Dt_Purchased), 'MM d yyyy, h:mm a')}>{format(new Date(purchase.Dt_Purchased), 'MM d yyyy, h:mm a')}</time>.
          </p>

          {/* Order + Buyer */}
          <section className="rounded bg-gray-50 p-4 shadow-sm">
            <h2 className="mb-3 text-xl font-semibold">Order Summary</h2>
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-gray-600">Raffle ID</dt>
                <dd className="font-mono text-gray-900">{raffleID}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Total Tickets</dt>
                <dd className="text-gray-900">{purchase.Int_TotalTickets}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Total Paid</dt>
                <dd className="text-gray-900">${Number(purchase.Dec_TotalPrice || 0).toFixed(2)}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Name</dt>
                <dd className="text-gray-900">{purchase.VC_PlayerFullName || '—'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Email</dt>
                <dd className="text-gray-900">{purchase.VC_PlayerEmail || '—'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Phone</dt>
                <dd className="text-gray-900">{purchase.VC_PlayerPhone || '—'}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm text-gray-600">Address</dt>
                <dd className="text-gray-900">
                  {[
                    purchase.VC_PlayerAddr1,
                    purchase.VC_PlayerAddr2,
                    [purchase.VC_PlayerCity, purchase.VC_PlayerProvince, purchase.VC_PlayerPostalCode].filter(Boolean).join(', '),
                    purchase['VC_PlayerCountry'] // if you later add country
                  ].filter(Boolean).map((line, idx) => <div key={idx}>{line}</div>)}
                </dd>
              </div>
            </dl>
          </section>

          {/* Line items (packages) */}
          {!!purchase.packages?.length && (
            <section className="rounded bg-gray-50 p-4 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">Items Purchased</h2>
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="border-b py-1">Item</th>
                    <th className="border-b py-1">Qty</th>
                    <th className="border-b py-1">Price</th>
                    <th className="border-b py-1">Line Total</th>
                  </tr>
                </thead>
                <tbody>
                  {purchase.packages.map((p, i) => {
                    const qty = Number(p.Int_NumbTicket || 0)
                    const price = Number(p.Dec_Price || 0)
                    return (
                      <tr key={i}>
                        <td className="py-1">{p.VC_Description || `${qty} tickets`}</td>
                        <td className="py-1">{qty}</td>
                        <td className="py-1">${price.toFixed(2)}</td>
                        <td className="py-1">${(qty ? price : 0).toFixed(2)}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="pt-2 text-right font-bold">Total:</td>
                    <td className="pt-2 font-bold">${Number(purchase.Dec_TotalPrice || 0).toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </section>
          )}

          {/* Tickets */}
          <section className="rounded bg-gray-50 p-4 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">Your Tickets</h2>
            {tickets.length > 0 ? (
              <dl className="mx-auto grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {tickets.map((t) => (<TicketStub key={t} ticketNumber={t} />))}
              </dl>
            ) : (
              <p>No tickets available.</p>
            )}
          </section>

          <div className="text-center">
            <Link href={`/raffles/${raffleID}`} className="inline-block rounded bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
              Back to Raffle Page
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}