import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function PurchaseError() {
  const router = useRouter()
  const { msg } = router.query

  return (
    <>
      <Head>
        <title>Purchase Error - Glowing Hearts Fundraising</title>
      </Head>
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl bg-white shadow-md rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-700 mb-6">
            {msg
              ? decodeURIComponent(msg as string)
              : 'An unexpected error occurred while processing your request.'}
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Return to Home
          </Link>
        </div>
      </main>
    </>
  )
}
