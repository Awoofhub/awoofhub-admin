import { Offer } from "@/types/offer";
import OfferCard from "./OfferCard";

interface Props {
  offers: Offer[];
}

export default function OfferList({ offers }: Props) {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
      {offers.map((offer) => (
        <OfferCard offer={offer} key={offer.id} />
      ))}
    </div>
  );
};

