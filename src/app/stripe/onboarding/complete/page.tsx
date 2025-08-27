import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'
import { Button } from '@/components/button'
import { CheckCircleIcon } from '@heroicons/react/16/solid'

export const metadata: Metadata = {
  title: 'Onboarding Complete — Stripe',
  description: 'Your Stripe Connect onboarding is complete.',
}

const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@yourdomain.tld'

export default function StripeOnboardingComplete() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>

      <Container className="mt-16 mb-16 justify-between">
        <div className="text-center">
        <Subheading>Stripe Connect</Subheading>
        <Heading as="h1" className="mt-2">Onboarding complete 🎉</Heading>
        </div>
        <Lead className="mt-6 max-w-2xl mx-auto">
          Thanks—your Stripe account onboarding is complete. You can return to the website now.
          It may take up to a minute for the status to update in the system.
        </Lead>

        <div className="mt-12 max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-zinc-900 mx-auto">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/40">
              <CheckCircleIcon className="size-6 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                You’re all set!
              </h2>
              <p className="mt-2 text-sm/6 text-gray-600 dark:text-zinc-300">
                If something looks off, contact us at{' '}
                <a
                  className="text-indigo-600 underline decoration-indigo-400 hover:decoration-2 dark:text-indigo-400"
                  href={`mailto:${SUPPORT_EMAIL}`}
                >
                  {SUPPORT_EMAIL}
                </a>.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/">Back to website</Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </main>
  )
}