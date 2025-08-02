
// new code
'use client'
import { useMemo } from 'react'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import RaffleList from '@/components/raffle-list'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import useGetAllRaffles from '../hooks/useGetAllRaffles'
import useBannerREST from '../hooks/useBannerRest'
import useGetPaginatedRaffles from '../hooks/useGetPaginatedRaffles'
import RafflePageSkeleton from '@/components/RaffleListShimmer'

interface PageProps {
  searchParams: { page?: string }
}


export default function RafflesPage({ searchParams }: PageProps) {
  const currentPage = Math.max(1, parseInt(searchParams.page || '1', 10))
  const perPage = 3

  const { raffles, total, isLoading, error } = useGetPaginatedRaffles(currentPage, perPage)

  const totalPages = Math.ceil(total / perPage)

  // if (isLoading) return <div className="text-center py-10">Loading raffles...</div>
  //Shimmer Loadings
  if (isLoading) return <RafflePageSkeleton />
  if (error) return <div className="text-center py-10 text-red-500">Failed to load raffles.</div>

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Ongoing Raffles
            </h2>
            <p className="mt-4 text-xl/8 text-gray-600">Support a cause. Win big.</p>
          </div>
          <RaffleList raffles={raffles} />
        </div>
      </section>

      {/* Pagination */}
      <nav className="flex items-center justify-between border-t border-gray-200 px-6 lg:px-8 mx-auto max-w-7xl mb-10">
        <div className="flex-1">
          {currentPage > 1 && (
            <Link
              href={`/raffles?page=${currentPage - 1}`}
              className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" />
              Previous
            </Link>
          )}
        </div>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={`/raffles?page=${i + 1}`}
              aria-current={i + 1 === currentPage ? 'page' : undefined}
              className={
                i + 1 === currentPage
                  ? 'border-indigo-500 text-indigo-600 inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium'
              }
            >
              {i + 1}
            </Link>
          ))}
        </div>
        <div className="flex-1 text-right">
          {currentPage < totalPages && (
            <Link
              href={`/raffles?page=${currentPage + 1}`}
              className="inline-flex items-center pt-4 pl-1 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Next
              <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" />
            </Link>
          )}
        </div>
      </nav>

      <Footer />
    </main>
  )
}