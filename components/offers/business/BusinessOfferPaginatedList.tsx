import PaginationButtons from "@/components/button/PaginationButtons";
import { Offer } from "@/types/offer";
import OfferRow from "./OfferRow";
import TableHeader from "./TableHeader";

interface Props {
  offers: Offer[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BusinessOfferPaginatedList({ offers, currentPage, totalPages, onPageChange }: Props) {
  return (
    <>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-left shadow-sm">
          <TableHeader />
          <tbody>
            {offers.map((offer) => (
              <OfferRow key={offer.id} offer={offer} />
            ))}
          </tbody>
        </table>
      </div>
      <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
    </>
  );
}