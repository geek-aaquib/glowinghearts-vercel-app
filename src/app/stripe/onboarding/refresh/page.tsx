import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'
import { Button } from '@/components/button'
import { ClockIcon } from '@heroicons/react/16/solid'

export const metadata: Metadata = {
  title: 'Onboarding Link Expired — Stripe',
  description: 'Your Stripe Connect onboarding session link has expired.',
}

const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL

export default function StripeOnboardingRefresh() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>

      <Container className="mt-16 mb-16">
        <div className="text-center">
          <Subheading>Stripe Connect</Subheading>
          <Heading as="h1" className="mt-2">Onboarding link expired</Heading>
        </div>

        <Lead className="mt-6 max-w-2xl mx-auto">
          This onboarding session link has expired. If you haven’t already completed onboarding,
          please reach out to us and we’ll send you a new link.
        </Lead>

        <div className="mt-12 max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-zinc-900 mx-auto">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-amber-100 p-2 dark:bg-yellow-900/40">
              <ClockIcon className="size-6 text-amber-600 dark:text-yellow-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                Session expired
              </h2>
              <p className="mt-2 text-sm/6 text-gray-600 dark:text-zinc-300">
                Email us at{' '}
                <a
                  className="text-indigo-600 underline decoration-indigo-400 hover:decoration-2 dark:text-indigo-400"
                  href={`mailto:${SUPPORT_EMAIL}`}
                >
                  {SUPPORT_EMAIL}
                </a>{' '}
                if you need a fresh onboarding link.
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