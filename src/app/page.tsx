import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Keyboard } from '@/components/keyboard'
import { Link } from '@/components/link'
import { LinkedAvatars } from '@/components/linked-avatars'
import { LogoCloud } from '@/components/logo-cloud'
import { LogoCluster } from '@/components/logo-cluster'
import { LogoTimeline } from '@/components/logo-timeline'
import { Map } from '@/components/map'
import { Navbar } from '@/components/navbar'
import { Screenshot } from '@/components/screenshot'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  description:
    'Glowing Hearts is a nonprofit fundraising platform that helps organizations raise more money with less effort through secure 50/50 raffles.',
}

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar
          banner={
            <Link
              href="/how-it-works"
              className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-hover:bg-fuchsia-950/30"
            >
              How Glowing Hearts helps nonprofits meet their fundraising goals
              <ChevronRightIcon className="size-4" />
            </Link>
          }
        />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Raise More. Worry Less.
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Power your fundraising with easy, secure 50/50 raffles. We handle the details—so your organization can focus on making a difference in the community.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="/contact-us">Get started</Button>
            <Button variant="secondary" href="/how-it-works">
              How it works
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

// function FeatureSection() {
//   return (
//     <div className="overflow-hidden">
//       <Container className="pb-24">
//         <Heading as="h2" className="max-w-3xl">
//           A snapshot of your entire sales pipeline.
//         </Heading>
//         <Screenshot
//           width={1216}
//           height={768}
//           src="/screenshots/app.png"
//           className="mt-16 h-144 sm:h-auto sm:w-304"
//         />
//       </Container>
//     </div>
//   )
// }

// function BentoSection() {
//   return (
//     <Container>
//       <Subheading>Sales</Subheading>
//       <Heading as="h3" className="mt-2 max-w-3xl">
//         Features that make fundraising effortless.
//       </Heading>

//       <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
//         <BentoCard
//           eyebrow="Insight"
//           title="Get perfect clarity"
//           description="Radiant uses social engineering to build a detailed financial picture of your leads. Know their budget, compensation package, social security number, and more."
//           graphic={
//             <div className="h-80 bg-[url(/screenshots/profile.png)] bg-size-[1000px_560px] bg-position-[left_-109px_top_-112px] bg-no-repeat" />
//           }
//           fade={['bottom']}
//           className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
//         />
//         <BentoCard
//           eyebrow="Analysis"
//           title="Undercut your competitors"
//           description="With our advanced data mining, you’ll know which companies your leads are talking to and exactly how much they’re being charged."
//           graphic={
//             <div className="absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-size-[1100px_650px] bg-position-[left_-38px_top_-73px] bg-no-repeat" />
//           }
//           fade={['bottom']}
//           className="lg:col-span-3 lg:rounded-tr-4xl"
//         />
//         <BentoCard
//           eyebrow="Speed"
//           title="Built for power users"
//           description="It’s never been faster to cold email your entire contact list using our streamlined keyboard shortcuts."
//           graphic={
//             <div className="flex size-full pt-10 pl-10">
//               <Keyboard highlighted={['LeftCommand', 'LeftShift', 'D']} />
//             </div>
//           }
//           className="lg:col-span-2 lg:rounded-bl-4xl"
//         />
//         <BentoCard
//           eyebrow="Source"
//           title="Get the furthest reach"
//           description="Bypass those inconvenient privacy laws to source leads from the most unexpected places."
//           graphic={<LogoCluster />}
//           className="lg:col-span-2"
//         />
//         <BentoCard
//           eyebrow="Limitless"
//           title="Sell globally"
//           description="Radiant helps you sell in locations currently under international embargo."
//           graphic={<Map />}
//           className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
//         />
//       </div>
//     </Container>
//   )
// }

// function DarkBentoSection() {
//   return (
//     <div className="mx-2 mt-2 rounded-4xl bg-gray-900 py-32">
//       <Container>
//         <Subheading dark>Outreach</Subheading>
//         <Heading as="h3" dark className="mt-2 max-w-3xl">
//           Customer outreach has never been easier.
//         </Heading>

//         <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
//           <BentoCard
//             dark
//             eyebrow="Networking"
//             title="Sell at the speed of light"
//             description="Our RadiantAI chat assistants analyze the sentiment of your conversations in real time, ensuring you're always one step ahead."
//             graphic={
//               <div className="h-80 bg-[url(/screenshots/networking.png)] bg-size-[851px_344px] bg-no-repeat" />
//             }
//             fade={['top']}
//             className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
//           />
//           <BentoCard
//             dark
//             eyebrow="Integrations"
//             title="Meet leads where they are"
//             description="With thousands of integrations, no one will be able to escape your cold outreach."
//             graphic={<LogoTimeline />}
//             // `overflow-visible!` is needed to work around a Chrome bug that disables the mask on the graphic.
//             className="z-10 overflow-visible! lg:col-span-2 lg:rounded-tr-4xl"
//           />
//           <BentoCard
//             dark
//             eyebrow="Meetings"
//             title="Smart call scheduling"
//             description="Automatically insert intro calls into your leads' calendars without their consent."
//             graphic={<LinkedAvatars />}
//             className="lg:col-span-2 lg:rounded-bl-4xl"
//           />
//           <BentoCard
//             dark
//             eyebrow="Engagement"
//             title="Become a thought leader"
//             description="RadiantAI automatically writes LinkedIn posts that relate current events to B2B sales, helping you build a reputation as a thought leader."
//             graphic={
//               <div className="h-80 bg-[url(/screenshots/engagement.png)] bg-size-[851px_344px] bg-no-repeat" />
//             }
//             fade={['top']}
//             className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
//           />
//         </div>
//       </Container>
//     </div>
//   )
// }

const features = [
  {
    name: 'Effortless Compliance',
    description:
      'We navigate all the paperwork, applications and reporting with local regulators—so you get your license on time and stay fully compliant, every step of the way.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Seamless Technical Management',
    description:
      `Our experts manage your raffle’s backend infrastructure and payment processing, troubleshoot any challenge, and ensure a fast, secure experience for every ticket purchaser.`,
    icon: LockClosedIcon,
  },
  {
    name: 'Branded Raffle Webpage',
    description:
      'Each raffle gets its own dedicated, mobile-responsive page—complete with your logos, colours and messaging—to give donors an immersive, on-brand experience from first click to draw.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Automated Engagement',
    description:
      'We amplify your reach through our media network and turnkey marketing tools, then keep participants in the loop with automated emails—confirmations, reminders and winner notifications—so no one misses a beat.',
    icon: FingerPrintIcon,
  },
]

function Features() {
  return (
    <div className="bg-white py-24 sm:py-32" id="Features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Hands free fundraising</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Everything you need to run your 50/50 raffles
          </p>
          <p className="mt-6 text-lg/8 text-gray-700">
            At Glowing Hearts, we’ve built an end-to-end 50/50 raffle solution so you can focus on your cause—while we handle everything from licensing to promotion and communications. Here’s why organizations trust us to power their next big raffle:
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        {/* <Container className="mt-10">
          <LogoCloud />
        </Container> */}
          {/* <FeatureSection /> */}
          {/* <BentoSection /> */}
          <Features />
        {/* <DarkBentoSection /> */}
      </main>
      {/* <Testimonials /> */}
      <Footer />
    </div>
  )
}
