'use client'

import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import useBannerREST  from '@/app/hooks/useBannerRest'

interface RaffleCardProps {
  raffle: any
}

export const RaffleCard = ({ raffle }: RaffleCardProps) => {
  const { charityData: banner, isLoading } = useBannerREST(raffle?.Guid_DrawId)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      {banner[0]?.obj_Banner[0]?.VC_BannerLocation && !isLoading ? (
        <img
          src={banner[0]?.obj_Banner[0]?.VC_BannerLocation}
          alt={`Image of ${raffle?.VC_RaffleName}`}
          className="aspect-[4/2] w-full bg-gray-200 object-cover group-hover:opacity-75"
        />
      ) : (
        <div className="aspect-[4/2] w-full bg-gray-100 animate-pulse" />
      )}

      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-2xl font-medium text-gray-900">
          <Link href={`/raffles/${raffle?.Guid_DrawId}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {raffle?.VC_RaffleName}
          </Link>
        </h3>
        <p className="text-3xl font-bold">${Number(raffle?.Dec_MoneyRaised)} raised</p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-md text-gray-500 italic">
            Sales End Date:{' '}
            {raffle?.Dt_SalesClose
              ? format(new Date(raffle?.Dt_SalesClose), 'dd MMM')
              : ''}
          </p>
        </div>
      </div>
    </div>
  )
}
