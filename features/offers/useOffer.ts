import OfferService from '@/services/offer-service';
import { Offer } from '@/types/offer';
import { useQuery } from '@tanstack/react-query';

type GetOfferOptions = {
    id: string;
};

export const getOffer = async ({ id }: GetOfferOptions): Promise<Offer> => {
    const result = await OfferService.offerById(id)
    return result.data;
};

export const useOffer = ({ id }: GetOfferOptions) => {
    const { data, isLoading } = useQuery({
        queryKey: ['offers', id],
        queryFn: () => getOffer({ id }),
    });

    return { data, isLoading };
};