import Head from 'next/head'
import { GradientBackground } from '@/components/gradient'
import TicketStub from '@/components/ticket-stub'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import Stripe from 'stripe'
import { SERVICE_URL } from '@/constants/raffleConstants'
import { sendErrorAlert } from '@/app/lib/sendErrorAlert'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

interface SuccessProps {
  session: Stripe.Checkout.Session & {
    line_items: Stripe.ApiList<Stripe.LineItem>
    customer_details: Stripe.Checkout.Session.CustomerDetails
  }
  raffle: {
    salesEndDate: string
    drawDate: string
    rafflePagePath: string
  }
  ticketNumbers: string[]
  VC_BannerLocation: string
}

const Success: NextPage<SuccessProps> = ({ session, raffle, VC_BannerLocation, ticketNumbers }) => {
  const {
    id: orderNumber,
    created,
    line_items,
    customer_details: customer,
    amount_total: totalAmount,
  } = session
  const purchaseDate = new Date(created * 1000).toLocaleString('en-CA', {
    dateStyle: 'long',
    timeStyle: 'short',
  })

  return (
    <>
      <Head>
        <title>Success - Glowing Hearts Fundraising</title>
        <meta name="description" content="Your donation was successful. Thank you for your support!" />
      </Head>
      <main className="overflow-hidden">
        <GradientBackground />
        <div className="mt-10 max-w-4xl mx-auto p-6 space-y-8">
          {/* Banner */}
          <div className="lg:col-span-5 lg:row-end-1">
            <img
              alt={'Raffle Banner'}
              src={VC_BannerLocation}// Adjust if you want dynamic raffle image
              className="aspect-4/2 w-full rounded-lg bg-gray-100 object-cover"
            />
          </div>

          {/* Success message */}
          <h1 className="text-3xl font-bold text-green-600 text-center">
            Thank you for your purchase!
          </h1>
          <p className="text-center text-gray-700">
            Your order <span className="font-mono font-bold text-black">{orderNumber}</span> was confirmed on{' '}
            <time dateTime={new Date(created * 1000).toISOString()}>{purchaseDate}</time>.
          </p>

          {/* Order details */}
          <section className="bg-gray-50 p-4 rounded shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-center">Order Details</h2>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-1">Item</th>
                  <th className="border-b py-1">Qty</th>
                  <th className="border-b py-1">Price</th>
                  <th className="border-b py-1">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {line_items.data.map(item => {
                  const unit = (item.price?.unit_amount || 0) / 100
                  const qty = item.quantity || 0
                  return (
                    <tr key={item.id}>
                      <td className="py-1">{item.description}</td>
                      <td className="py-1">{qty}</td>
                      <td className="py-1">${unit.toFixed(2)}</td>
                      <td className="py-1">${(unit * qty).toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="pt-2 font-bold text-right">Total:</td>
                  <td className="pt-2 font-bold">${((totalAmount || 0) / 100).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            {/* Customer address */}
            <div className="mt-4">
              <h3 className="font-semibold text-center pt-10">Billing Address</h3>
              {/* old code for address visulaization */}
              {/* <address className="not-italic">
                {customer.name}<br />
                {customer.address?.line1}<br />
                {customer.address?.line2 && <>{customer.address.line2}<br /></>}
                {customer.address?.city}, {customer.address?.postal_code}<br />
                {customer.address?.country}<br />
                <abbr title="Phone">Contact Number:</abbr> {customer.phone}
              </address> */}

              {/* new code for address visualization */}
              <div className="w-full max-w-xl mx-auto overflow-hidden rounded-md shadow-md bg-white">
                <div className="hidden md:table w-full text-sm text-gray-800 border border-gray-200">
                  <div className="table-row-group">
                    <div className="table-row border-b border-gray-100">
                      <div className="table-cell font-medium px-4 py-2 w-1/3">Name</div>
                      <div className="table-cell px-4 py-2">{customer.name}</div>
                    </div>
                    <div className="table-row border-b border-gray-100">
                      <div className="table-cell font-medium px-4 py-2">Address</div>
                      <div className="table-cell px-4 py-2">
                        {customer.address?.line1}<br />
                        {customer.address?.line2 && <>{customer.address.line2}<br /></>}
                        {customer.address?.city}, {customer.address?.postal_code}<br />
                        {customer.address?.country}
                      </div>
                    </div>
                    <div className="table-row">
                      <div className="table-cell font-medium px-4 py-2">Phone</div>
                      <div className="table-cell px-4 py-2">{customer.phone}</div>
                    </div>
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="md:hidden space-y-4 p-4 text-sm text-gray-800">
                  <div>
                    <p className="font-medium text-gray-600">Name</p>
                    <p>{customer.name}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Address</p>
                    <p>
                      {customer.address?.line1}<br />
                      {customer.address?.line2 && <>{customer.address.line2}<br /></>}
                      {customer.address?.city}, {customer.address?.postal_code}<br />
                      {customer.address?.country}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Phone</p>
                    <p>{customer.phone}</p>
                  </div>
                </div>
              </div>


            </div>
          </section>

          {/* Tickets */}
          <section className="bg-gray-50 p-4 rounded shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Your Tickets</h2>
            {ticketNumbers.length > 0 ? (
              <dl className="mx-auto grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {ticketNumbers.map(ticketNum => (
                  <TicketStub key={ticketNum} ticketNumber={ticketNum} />
                ))}
              </dl>
            ) : (
              <p>No tickets available.</p>
            )}
          </section>

          {/* Back to raffle link */}
          <div className="text-center">
            <Link
              href={raffle.rafflePagePath}
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Back to Raffle Page
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sessionId = ctx.query.session_id as string
  const accountId = ctx.query.account as string


  if (!sessionId) {
    return {
      notFound: true,
    }
  }

  // Fetch session from Stripe with expanded details
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer_details'],
  },
    {
      stripeAccount: accountId,
    }
  )

  const customer = session.customer_details
  const amount = session.amount_total || 0
  const createdISO = new Date(session.created * 1000).toISOString()

  const raffleID = session.metadata?.raffleID
  const obj_BuyInsStr = session.metadata?.obj_BuyIns || '[]';
  const isAgeConfirmed = session.metadata?.isAgeConfirmed;
  const isTCConfirmed = session.metadata?.isTCConfirmed;
  const obj_BuyIns = JSON.parse(obj_BuyInsStr); // this is now an array
  if (!raffleID) {
    throw new Error('raffleID missing in Stripe session metadata')
  }

  // Construct payload for backend API
  const payload = {
    Guid_RaffleId: raffleID,
    Guid_PurchaseId: crypto.randomUUID(),
    Dt_Purchased: createdISO.replace('T', ' ').slice(0, 19),
    Dec_PurchaseAmount: amount / 100,
    VC_PlayerEmail: customer?.email ?? '',
    VC_PlayerFullName: customer?.name,
    VC_PlayerAddr1: customer?.address?.line1 ?? '',
    VC_PlayerAddr2: customer?.address?.line2 ?? '',
    VC_PlayerCity: customer?.address?.city ?? '',
    VC_PlayerProvince: customer?.address?.state ?? '',
    VC_PlayerPostalCode: customer?.address?.postal_code ?? '',
    VC_PlayerPhone: customer?.phone,
    obj_BuyIns: obj_BuyIns,
    isAgeConfirmed: isAgeConfirmed,
    isTCConfirmed: isTCConfirmed
  }

  // // Post to your backend Sale API and get ticket numbers

  let ticketNumbers: string[] = []

  try {
    const response = await fetch(`${SERVICE_URL}/Sale/${raffleID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      throw new Error(`Backend API error: ${response.statusText}`)
    }

    const data = await response.json()
    const allTickets = data?.obj_Packages?.obj_Packages?.flatMap(pkg => pkg.obj_Tickets);
    ticketNumbers = allTickets
  } catch (error) {
    console.error('Error posting purchase to backend:', error)

    await sendErrorAlert(
      '⚠️⚠️⚠️ Glowing Hearts 5050 - Purchase Post Failure',
      `An error occurred while posting purchase to backend for session ID: ${sessionId}\n\nError: ${error}\n\nPayload:\n${JSON.stringify(payload, null, 2)}`
    )

    // Redirect user to an error page with message
    return {
      redirect: {
        destination: `/purchase-error?msg=${encodeURIComponent(
          'An error occurred while posting the transaction to our backend. Please check your email for ticket confirmation or contact us at info@glowinghearts5050.com'
        )}`,
        permanent: false,
      },
    }
  }

  let bannerData: any = [];

  try {
    const getRaffleBannerUrl = `${SERVICE_URL}/Banner/${raffleID}/50`;
    const res = await fetch(getRaffleBannerUrl);
    const data = await res.json();
    bannerData = Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Failed to fetch banner data:', error);
  }

  let raffleDetails: any = [];
  try {
    const getRafflDetails = `${SERVICE_URL}/Raffle/${raffleID}`;
    const res = await fetch(getRafflDetails);
    const data = await res.json();
    raffleDetails = Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Failed to fetch banner data:', error);
  }
  // const { salesEndDate, drawDate, rafflePagePath, name} = raffleData;
  const raffle = {
    salesEndDate: raffleDetails[0]?.obj_RaffleData?.Dt_SalesClose,
    rafflePagePath: `/raffles/${raffleDetails[0]?.obj_RaffleData?.Guid_DrawId}`,
  }

  const { VC_BannerLocation } = bannerData[0]?.obj_Banner[0];
  return {
    props: {
      session,
      raffle,
      VC_BannerLocation,
      ticketNumbers
    },
  }
}

export default Success