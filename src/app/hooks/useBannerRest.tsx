// hooks/useUsers.ts
import { SERVICE_URL } from '@/constants/raffleConstants';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json())

export default function useBannerREST(charityId){
    const getRaffleBannerUrl = SERVICE_URL + '/Banner/'+ charityId + '/50';
    const { data, error, isLoading } = useSWR(getRaffleBannerUrl, fetcher);
    const charityData = Array.isArray(data) ? data : [data]
    return {
        charityData,
        isLoading,
        isBannerError: error
    }
}
