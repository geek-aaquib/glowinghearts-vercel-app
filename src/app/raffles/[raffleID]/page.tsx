'use client'

import { useRaffleDetails } from '@/app/hooks/useRaffleDetails'
import useRaffleREST from '@/app/hooks/useRaffleREST'
import useBannerREST from '@/app/hooks/useBannerRest'
import dynamic from 'next/dynamic'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { AnimatedNumber } from '@/components/animated-number'
import TicketPurchase from '@/components/ticket-purchase'
import PrizesTable from '@/components/prizes'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Fragment } from 'react'
import { format } from 'date-fns'
import RafflePageSkeleton from '@/components/RaffleListShimmer'
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share'
import { SERVICE_URL } from '@/constants/raffleConstants'

const CountdownTimer = dynamic(() => import('@/components/countdown-timer'), { ssr: false })

interface PageProps {
  params: { raffleID: string }
}

export default function RafflePage({ params }: PageProps) {
  const raffleId = params.raffleID;

  // const { raffles, loading, error } = useRaffleDetails(raffleId);
  const { restData, isLoading, isError } = useRaffleREST(raffleId);
  const { charityData: bannerData, isLoading: loadingBanner } = useBannerREST(raffleId);

  // if (isLoading || loadingBanner) return <p>Loading...</p>;
  if (isLoading || loadingBanner) return <RafflePageSkeleton />
  if (isError) return <p>Error loading raffle data.</p>;

  const raffleData = restData?.[0]?.obj_RaffleData;
  if (!raffleData) return <p>Raffle not found.</p>;

  const {
    VC_RaffleName,
    VC_RaffleLocation,
    Dec_MoneyRaised,
    Txt_GameDetails,
    Txt_GameRules,
    Dt_SalesOpen,
    Dt_SalesClose,
    obj_BuyIns,
    obj_Prizes,
    Int_DrawStatus,
    VC_CharityKey,
VC_LicenseNumb
  } = raffleData;
  console.log(raffleData)
  // console.log(VC_CharityKey)
  const { VC_BannerLocation } = bannerData?.[0]?.obj_Banner?.[0];

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>

      <div className="bg-white">
        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex flex-col-reverse">
            <div className="mb-5">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{VC_RaffleName}</h1>
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-4 xl:gap-x-16">
            {/* Product image */}
            <div className="lg:col-span-5 lg:row-end-1">
              <img
                src={VC_BannerLocation}
                alt={`Image of ${VC_RaffleName}`}
                className="aspect-4/2 w-full rounded-lg bg-gray-100 object-cover"
              />
            </div>

            {/* Raffle details */}
            {Int_DrawStatus === 2 && <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-2 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
              <div className="text-center p-6 bg-[{raffle.primary_color}] rounded-2xl border-2 border-gray-300 text-[#{raffle.font_color}] max-w-xs mx-auto">
                {/* Big raised amount */}
                <p className="text-5xl font-extrabold tracking-tight sm:text-6xl animate-pulse [animation-duration:1s] text-[#b060ff]">
                  $<AnimatedNumber end={Dec_MoneyRaised} decimals={0} />
                </p>

                {/* Smaller “Jackpot” label */}
                <p className="mt-2 text-2xl font-bold text-gray-600 sm:text-3xl">
                  Jackpot
                </p>

                {/* Smaller “Winner” label */}
                <p className="mt-2 text-sm font-medium text-gray-600">
                  Winner takes half
                </p>
              </div>

              {/* Ticket Sales End Time */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <div className="text-center max-w-xs mx-auto">
                  <p className="text-xl tracking-tight text-gray-900 sm:text-2xl">
                    Ticket Sales Ends In
                  </p>

                  {/* Smaller “Jackpot” label */}
                  <p className="mt-2 text-2xl font-bold sm:text-3xl">
                    <CountdownTimer endDate={Dt_SalesClose} />
                  </p>
                </div>
              </div>

              {/* Ticket Purchase */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <TicketPurchase tickets={obj_BuyIns} raffleID={raffleId} charity_key={VC_CharityKey}/>
              </div>
            </div> }
            {Int_DrawStatus !== 2 && <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-2 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
              <div className="text-center p-6 bg-[{raffle.primary_color}] rounded-2xl border-2 border-gray-300 text-[#{raffle.font_color}] max-w-xs mx-auto">
                {/* Big raised amount */}
                <p className="text-5xl font-extrabold tracking-tight sm:text-6xl animate-pulse [animation-duration:1s] text-[#b060ff]">
                  $<AnimatedNumber end={isNaN(Dec_MoneyRaised) || Dec_MoneyRaised == null ? 0 : Dec_MoneyRaised} decimals={0} />
                </p>

                {/* Smaller “Jackpot” label */}
                <p className="mt-2 text-2xl font-bold text-gray-600 sm:text-3xl">
                  Amount Raised
                </p>

              </div>
              {/* Ticket Sales End Time */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <div className="text-center max-w-xs mx-auto">
                  <p className="text-xl font-bold tracking-tight text-gray-900">
                    Ticket Sales Ended
                  </p>
                </div>
              </div>
            </div> }

            <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-5 lg:mt-0 lg:max-w-none">
              {/* Raffle Details */}
              <dl className="mx-auto grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 bg-gray-900/5 px-4 py-2 sm:px-6 xl:px-8 rounded-xl">
                  <dt className="text-sm font-medium text-gray-500">Licence #</dt>
                  <dd className="w-full flex-none text-xl font-medium tracking-tight text-gray-900">{VC_LicenseNumb}</dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 bg-gray-900/5 px-4 py-2 sm:px-6 xl:px-8 rounded-xl">
                  <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                  <dd className="w-full flex-none text-lg font-medium tracking-tight text-gray-900">{format(new Date(Dt_SalesOpen), 'dd MMM yyyy h:mm a')}</dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 bg-gray-900/5 px-4 py-2 sm:px-6 xl:px-8 rounded-xl">
                  <dt className="text-sm font-medium text-gray-500">Draw Date</dt>
                  <dd className="w-full flex-none text-lg font-medium tracking-tight text-gray-900">{format(new Date(Dt_SalesClose), 'dd MMM yyyy h:mm a')}</dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 bg-gray-900/5 px-4 py-2 sm:px-6 xl:px-8 rounded-xl">
                  <dt className="text-sm font-medium text-gray-500">Draw Location</dt>
                  <dd className="w-full flex-none text-md font-medium tracking-tight text-gray-900">{VC_RaffleLocation}</dd>
                </div>
              </dl>

              {/* Share */}
              <div className="border-gray-200 mb-10">
                {/* <h3 className="text-sm font-medium text-gray-900 mt-10">Share</h3> */}
                {/* <ul role="list" className="mt-4 flex items-center space-x-6">
                  <li>
                    <a href="" className="flex size-6 items-center justify-center text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Share on Facebook</span>
                      <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                        <path
                          d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex size-6 items-center justify-center text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Share on Instagram</span>
                      <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="size-6">
                        <path
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex size-6 items-center justify-center text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Share on X</span>
                      <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                        <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                      </svg>
                    </a>
                  </li>
                </ul> */}
                <h3 className="text-sm font-medium text-gray-900 mt-10">Share</h3>
                <div className="mt-4 flex items-center space-x-4">
                  <FacebookShareButton url={`${SERVICE_URL}/raffles/${raffleId}`} quote={`Check out this raffle: ${VC_RaffleName}`}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>

                  <TwitterShareButton url={`${SERVICE_URL}/raffles/${raffleId}`} title={`Join this raffle: ${VC_RaffleName}`}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>

                  <WhatsappShareButton url={`${SERVICE_URL}/raffles/${raffleId}`} title={`Join this raffle: ${VC_RaffleName}`}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              </div>
              <TabGroup>
                <div className="border-b border-gray-200">
                  <TabList className="-mb-px flex space-x-8">
                    <Tab className="border-b-2 border-transparent py-6 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-gray-300 hover:text-gray-800 data-selected:border-indigo-600 data-selected:text-indigo-600">
                      Details
                    </Tab>
                    <Tab className="border-b-2 border-transparent py-6 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-gray-300 hover:text-gray-800 data-selected:border-indigo-600 data-selected:text-indigo-600">
                      Rules
                    </Tab>
                    <Tab className="border-b-2 border-transparent py-6 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-gray-300 hover:text-gray-800 data-selected:border-indigo-600 data-selected:text-indigo-600">
                      Prizes
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as={Fragment}>
                  <TabPanel className="pt-10">
                    <h3 className="sr-only">Details</h3>

                    <div
                      dangerouslySetInnerHTML={{ __html: Txt_GameDetails }}
                      className="text-sm text-gray-500 [&_h4]:mt-5 [&_h4]:font-medium [&_h4]:text-gray-900 [&_li]:pl-2 [&_li::marker]:text-gray-300 [&_p]:my-2 [&_p]:text-sm/6 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-sm/6 [&>:first-child]:mt-0"
                    />
                  </TabPanel>

                  <TabPanel className="pt-10">
                    <h3 className="sr-only">Rules</h3>

                    <div
                      dangerouslySetInnerHTML={{ __html: Txt_GameRules }}
                      className="text-sm text-gray-500 [&_h4]:mt-5 [&_h4]:font-medium [&_h4]:text-gray-900 [&_li]:pl-2 [&_li::marker]:text-gray-300 [&_p]:my-2 [&_p]:text-sm/6 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-sm/6 [&>:first-child]:mt-0"
                    />
                  </TabPanel>

                  <TabPanel className="text-sm text-gray-500">
                    <h3 className="sr-only">Prizes</h3>

                    <PrizesTable prizes={obj_Prizes} />
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}