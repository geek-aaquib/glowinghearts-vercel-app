'use client'
import { SERVICE_URL } from '@/constants/raffleConstants'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
  return res.json()
}

export default function useGetPaginatedRaffles(page: number, perPage = 3) {
  const offset = (page - 1) * perPage
  const url = `${SERVICE_URL}/RaffleList/${offset}/${perPage}`

  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  })

  const raffles = data?.obj_Raffles
  const total = data?.Int_NumbRaffle;

  return {
    raffles,
    total,
    isLoading,
    error,
  }
}