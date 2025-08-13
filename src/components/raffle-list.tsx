//new code
import React from 'react'
import type { RaffleResponse } from '@/data/raffles'
import { RaffleCard } from './raffle-card'

interface RaffleListProps {
  raffles: RaffleResponse[]
}

export const RaffleList = ({ raffles }: RaffleListProps) => {
  const rafflesData = Array.isArray(raffles) ? raffles : [raffles]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {rafflesData.map((raffle, index) => (
        <RaffleCard key={index} raffle={raffle} />
      ))}
    </div>
  )
}

export default RaffleList
