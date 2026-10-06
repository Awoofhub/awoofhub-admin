import { Offer, OfferDisplayStatus } from '@/types/offer';

export function getEffectiveOfferStatus(offer: Offer): OfferDisplayStatus  {
    const isPastEndDate = new Date(offer.endDate).getTime() < Date.now();
    
    if (offer.status === 'approved' && isPastEndDate) {
        return 'expired';
    }

    return offer.status;
}