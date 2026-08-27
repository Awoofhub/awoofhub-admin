import { Offer } from '@/types/offer';

export type EffectiveOfferStatus = Offer['status'] | 'expired';

export function getEffectiveOfferStatus(offer: Offer): EffectiveOfferStatus {
    const isPastEndDate = new Date(offer.endDate).getTime() < Date.now();
    
    // Only an approved (live) offer can be "expired" — a pending/rejected/
    // suspended offer past its end date is still shown as its actual status.
    if (offer.status === 'approved' && isPastEndDate) {
        return 'expired';
    }

    return offer.status;
}