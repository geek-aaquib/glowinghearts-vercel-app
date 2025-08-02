// hooks/useUsers.ts
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json())

export default function useRaffleREST(id){
    const getRaffleUrl = 'https://5050-test.mikematich.ca' + '/Raffle/'+ id;
    const { data, error, isLoading } = useSWR(getRaffleUrl, fetcher);
    const restData = Array.isArray(data) ? data : [data]
    return {
        restData,
        isLoading,
        isError: error
    }

}
