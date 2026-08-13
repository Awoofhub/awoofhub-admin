import { useQuery } from '@tanstack/react-query';
import OfferService from '@/services/offer-service';

const FETCH_LIMIT = 1000; 

function getMonthDateRange(monthIndex: number, year: number) {
  const from = new Date(year, monthIndex, 1);
  const to = new Date(year, monthIndex + 1, 0);
  return {
    createdFrom: from.toISOString(),
    createdTo: to.toISOString(),
  };
}

export const useOfferInsights = (monthIndex: number, year: number) => {
  const { createdFrom, createdTo } = getMonthDateRange(monthIndex, year);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['offers', 'insights', monthIndex, year],
    queryFn: () =>
      OfferService.offers("", "", 0, createdFrom, createdTo, 1, FETCH_LIMIT),
    staleTime: 60000,
  });

  const offers = data?.data ?? [];

  return { offers, isLoading, isError };
};