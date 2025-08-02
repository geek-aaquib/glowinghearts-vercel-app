
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'

function HowItWorks() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base/7 font-semibold text-indigo-600">Raise funds faster</h2>
        <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-5xl">
          How Glowing Hearts 50/50 Raffles Work
        </p>
        <p className="mt-3 text-md text-grey-300">Turn your next fundraising campaign into a seamless, engaging experience. From securing your license to celebrating the winner, our five-step process makes it easy—so you can focus on making an impact.</p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg bg-white max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              <img
                alt=""
                src="https://i.postimg.cc/YCx8wQ0G/Compliance.jpg"
                className="h-80 object-cover object-left"
              />

              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-indigo-600">Compliance</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">1. Secure Your Raffle License</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Obtain your official 50/50 permit through the Alcohol and Gaming Commission of Ontario with our step-by-step guidance. We’ll prepare and submit the application, handle any follow-up questions, and ensure you’re fully compliant—no surprises, no delays.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
          </div>
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg bg-white lg:rounded-tr-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              <img
                alt=""
                src="https://i.postimg.cc/DyLBB9Kc/Release.jpg"
                className="h-80 object-cover object-left lg:object-right"
              />

              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-indigo-600">Release</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">2. Launch Your Custom Raffle Page</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Your fundraiser deserves its own spotlight. In under 48 hours, we build a mobile-responsive microsite—complete with your logos, custom description, imagery and a live fundraising thermometer—so supporters feel connected every step of the way.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-tr-4xl" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-white lg:rounded-bl-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
              <img
                alt=""
                src="https://i.postimg.cc/W1VSK5Nc/Speed.jpg"
                className="h-80 object-cover object-left"
              />

              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-indigo-600">Speed</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">3. Drive Ticket Sales with Ease</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Share a single link via email, social, or your website—and watch the tickets roll in. Integrated social-share buttons and pre-built promo templates amplify reach.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-bl-4xl" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-white" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <img
                alt=""
                src="https://i.postimg.cc/hGPs4hQC/Technology.jpg"
                className="h-80 object-cover"
              />

              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-indigo-600">Technology</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">4. Conduct a Certified Draw & Notify Winners</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Skip the paper tickets: our GLI-certified random number generator picks a winner in seconds. Then, automated email workflows deliver winner notifications and tax receipts—so you never have to send a single manual message.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-br-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              <img
                alt=""
                src="https://i.postimg.cc/HWf60pFx/Integration.jpg"
                className="h-80 object-cover"
              />

              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-indigo-600">Integration</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">5. Collect Your Funds & Make an Impact</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Half of every jackpot is yours to deploy immediately. We invoice only after the raffle closes—so there are no upfront fees—and we deposit your proceeds directly into your Stripe-connected account within days.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

const perks = [
  {
    name: 'Flexible Timing',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-delivery-light.svg',
    description:
      "Run one-day flash raffles or month-long campaigns—your timeline, your rules.",
  },
  {
    name: 'Dedicated Account Support',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-warranty-light.svg',
    description:
      "A single point of contact available by phone or chat.",
  },
  {
    name: 'Media Partnerships',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-returns-light.svg',
    description:
      'Boost visibility through our in-house channels and partner networks.',
  },
  {
    name: 'Transparent, Pay-After-You-Raise Pricing',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-planet-light.svg',
    description:
      "No hidden fees; pay administration costs only once you’ve collected funds.",
  },
]

function StandOut() {
  return (
    <div className="bg-gray-50">
      <h2 className="sr-only">Our perks</h2>
      <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
        <p className="mt-2 text-4xl text-center font-semibold tracking-tight text-pretty text-gray-950 sm:text-4xl">
          Why Glowing Hearts Stands Out
        </p>
        <p className="mt-5 mb-20 text-md text-center text-grey-300">Beyond the core steps, our platform offers:</p>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 px-4 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {perks.map((perk) => (
            <div key={perk.name} className="sm:flex">
              <div className="sm:shrink-0">
                <div className="flow-root">
                  <img alt="" src={perk.imageSrc} className="h-24 w-28" />
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <h3 className="text-sm font-medium text-gray-900">{perk.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{perk.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default function Company() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <HowItWorks />
      <StandOut />
      <Footer />
    </main>
  )
}