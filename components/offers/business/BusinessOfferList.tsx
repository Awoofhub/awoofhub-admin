import { Offer } from "@/types/offer";
import OfferRow from "./OfferRow";
import TableHeader from "./TableHeader";

interface Props {
    offers: Offer[];
}

export default function BusinessOfferList({ offers }: Props) {
  return (
    <table className="w-full min-w-[1283px] text-left shadow-sm">
      <TableHeader />
      <tbody>
        {offers.map((offer) => (
          <OfferRow key={offer.id} offer={offer} />
        ))}
      </tbody>
    </table>
  );
}