import useSWR from 'swr';
import { initiateSocket, getSocket, disconnectSocket } from '@/app/lib/socket';
import {
  RAFFLE_EVENT_REQUEST,
  RAFFLE_EVENT_RESPONSE,
} from '@/constants/raffleConstants';

function fetchRaffleDetailsViaSocket(raffleId: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    if (!raffleId) return reject('Missing raffle ID');

    try {
      initiateSocket();
      const socket = getSocket();
      socket.connect();

      // Request raffle details
      socket.emit(RAFFLE_EVENT_REQUEST, { Guid_RaffleId: raffleId });

      // Listen for response
      socket.once(RAFFLE_EVENT_RESPONSE, (data: any) => {
        socket.off(RAFFLE_EVENT_RESPONSE);
        disconnectSocket();
        resolve(Array.isArray(data) ? data : [data]);
      });

      // Listen for errors
      socket.once('connect_error', (err) => {
        disconnectSocket();
        console.error('Socket connection error:', err);
        reject('Socket connection failed');
      });

      // Optional: timeout fallback
      setTimeout(() => {
        disconnectSocket();
        reject('Socket response timeout');
      }, 5000);

    } catch (err) {
      disconnectSocket();
      reject('Unexpected error occurred');
    }
  });
}

export function useRaffleDetails(raffleId: string) {
  const { data, error, isLoading } = useSWR(
    raffleId ? ['raffle-details', raffleId] : null,
    () => fetchRaffleDetailsViaSocket(raffleId),
    { revalidateOnFocus: false }
  );
  
  return {
    raffles: data || [],
    loading: isLoading,
    error,
  };
}
