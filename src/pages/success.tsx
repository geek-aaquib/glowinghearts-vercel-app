// pages/success.tsx
'use client'

import { GradientBackground } from '@/components/gradient'
import TicketStub from '@/components/ticket-stub'
import Head from 'next/head'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * Types for the API payload we return from /api/stripe/session/[id]
 * (matches the handler I gave you)
 */
type Address = {
  line1?: string | null
  line2?: string | null
  city?: string | null
  state?: string | null
  postal_code?: string | null
  country?: string | null
}

type SessionData = {
  fulfilled: boolean
  id: string
  created: number
  amount_total: number | null
  currency: string | null
  metadata?: { raffleID?: string | null }
  line_items: {
    id: string
    description: string | null
    quantity: number
    unit_amount: number | null
    currency: string | null
  }[]
  customer_details: {
    name: string | null
    email: string | null
    phone: string | null
    address: Address | null
  } | null
  custom_fields_map?: Record<string, string | null>
  tickets: string[]
  banner_img?: string | null
}

export default function SuccessPage() {
  const params = useSearchParams()
  const sessionId = params?.get('session_id') || '' // from success_url
  const accountId = params?.get('account') || '' // Stripe Connect account id

  const [data, setData] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeoutHit, setTimeoutHit] = useState(false)

  /**
   * Poll the session endpoint until the webhook marks it "fulfilled".
   * - No extra storage; we rely purely on Stripe metadata flags.
   * - Cache-bust with ?_=${Date.now()} and also set cache: 'no-store'.
   */
  useEffect(() => {
    if (!sessionId) return
    let cancelled = false
    let tries = 0

    const poll = async () => {
      tries++
      const res = await fetch(
        `/api/stripe/session/${encodeURIComponent(sessionId)}?account=${encodeURIComponent(
          accountId,
        )}&_=${Date.now()}`,
        { cache: 'no-store' },
      )
      const json = await res.json()
      if (cancelled) return
      setData(json)

      if (json?.fulfilled) {
        setLoading(false)
      } else if (tries < 60) {
        // Try for ~2 minutes (every 2s); tweak as you like
        setTimeout(poll, 2000)
      } else {
        setTimeoutHit(true)
        setLoading(false)
      }
    }

    poll()
    return () => {
      cancelled = true
    }
  }, [sessionId, accountId])

  // Guard: missing query params
  if (!sessionId || !accountId) {
    return <div className="p-10 text-center">Missing session details.</div>
  }

  // Initial spinner while we wait for the webhook to complete
  if (loading) {
    return (
      <>
        <Head>
          <title>Finalizing your purchase…</title>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        <main className="overflow-hidden">
          <GradientBackground />
          <div className="mx-auto max-w-2xl p-10 text-center">
            <h1 className="text-2xl font-semibold">
              Finalizing your purchase…
            </h1>
            <p className="mt-2 text-gray-600">
              We’re confirming your tickets. This can take a few seconds.
            </p>
          </div>
        </main>
      </>
    )
  }

  // Fallback UI if we never saw "fulfilled"
  if (timeoutHit || !data?.fulfilled) {
    return (
      <>
        <Head>
          <title>Processing your order…</title>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        <main className="overflow-hidden">
          <GradientBackground />
          <div className="mx-auto max-w-xl p-10 text-center">
            <h1 className="text-xl font-semibold text-red-600">
              We’re still processing your order
            </h1>
            <p className="mt-2 text-gray-700">
              Your payment was successful, but we haven’t received ticket
              confirmation yet. Please refresh in a moment. If this persists,
              contact {process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support'} with
              your order details.
            </p>
          </div>
        </main>
      </>
    )
  }

  // --- Ready to render success ---

  // Core order details
  const orderNumber = data.id
  const raffleID = data.metadata?.raffleID || ''
  const purchaseDate = new Date(data.created * 1000).toLocaleString('en-CA', {
    dateStyle: 'long',
    timeStyle: 'short',
  })

  // Customer details (prefer custom field 'full_name' if present)
  const fullName =
    data.custom_fields_map?.full_name || data.customer_details?.name || ''
  const email = data.customer_details?.email || ''
  const phone = data.customer_details?.phone || ''
  const addr = data.customer_details?.address

  // Tickets returned from your backend, stored by webhook in session metadata
  const tickets = data.tickets || []

  return (
    <>
      <Head>
        <title>Success - Glowing Hearts Fundraising</title>
        <meta name="description" content="Thank you for your purchase!" />
      </Head>
      <main className="overflow-hidden">
        <GradientBackground />
        <div className="mx-auto mt-10 max-w-4xl space-y-8 p-6">
          <div className="text-center">
            <Link
              href={`/raffles/${raffleID}`}
              className="inline-block rounded bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
            >
              Back to Raffle Page
            </Link>
          </div>
          {/* Optional banner image you stored on the session's metadata as 'banner_img' */}
          {data.banner_img ? (
            <div className="lg:col-span-5 lg:row-end-1">
              <img
                alt="Raffle Banner"
                src={data.banner_img}
                className="aspect-4/2 w-full rounded-lg bg-gray-100 object-cover"
              />
            </div>
          ) : null}

          {/* Heading */}
          <h1 className="text-center text-3xl font-bold text-green-600">
            Thank you for your purchase!
          </h1>
          <p className="text-center text-gray-700">
            Your order{' '}
            <span className="font-mono font-bold text-black">
              {orderNumber}
            </span>{' '}
            was confirmed on{' '}
            <time dateTime={new Date(data.created * 1000).toISOString()}>
              {purchaseDate}
            </time>
            .
          </p>

          {/* Order Summary */}
          <section className="rounded bg-gray-50 p-4 shadow-sm">
            <h2 className="mb-3 text-xl font-semibold">Order Summary</h2>
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-gray-600">Raffle ID</dt>
                <dd className="font-mono text-gray-900">{raffleID || '—'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Purchase ID</dt>
                <dd className="font-mono text-gray-900">{orderNumber}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Name</dt>
                <dd className="text-gray-900">{fullName || '—'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Email</dt>
                <dd className="text-gray-900">{email || '—'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Phone</dt>
                <dd className="text-gray-900">{phone || '—'}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm text-gray-600">Address</dt>
                <dd className="text-gray-900">
                  {addr ? (
                    <>
                      {addr.line1}
                      {addr.line2 ? <>, {addr.line2}</> : null}
                      <br />
                      {[addr.city, addr.state, addr.postal_code]
                        .filter(Boolean)
                        .join(', ')}
                      <br />
                      {addr.country}
                    </>
                  ) : (
                    '—'
                  )}
                </dd>
              </div>
            </dl>
          </section>

          {/* Items Purchased */}
          {!!data.line_items?.length && (
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
                  {data.line_items.map((li) => {
                    const unit = (li.unit_amount || 0) / 100
                    const qty = li.quantity || 0
                    return (
                      <tr key={li.id}>
                        <td className="py-1">{li.description}</td>
                        <td className="py-1">{qty}</td>
                        <td className="py-1">${unit.toFixed(2)}</td>
                        <td className="py-1">${(unit * qty).toFixed(2)}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="pt-2 text-right font-bold">
                      Total:
                    </td>
                    <td className="pt-2 font-bold">
                      ${((data.amount_total || 0) / 100).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </section>
          )}

          {/* Your Tickets (from your backend; stored by webhook in session metadata) */}
          <section className="rounded bg-gray-50 p-4 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">Your Tickets</h2>
            {tickets.length > 0 ? (
              <dl className="mx-auto grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {tickets.map((t) => (
                  <TicketStub key={t} ticketNumber={t} />
                ))}
              </dl>
            ) : (
              <p>No tickets available.</p>
            )}
          </section>

          <div className="text-center">
            <Link
              href={`/raffles/${raffleID}`}
              className="inline-block rounded bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
            >
              Back to Raffle Page
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
