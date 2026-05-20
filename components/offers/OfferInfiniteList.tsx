import { Offer } from "@/types/offer";
import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import OfferCard from "./OfferCard";

interface Props {
  offers: Offer[];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export default function OfferInfiniteList({ offers, hasNextPage, fetchNextPage, isFetchingNextPage }: Props) {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {offers.map((offer) => (
          <OfferCard offer={offer} key={offer.id} />
        ))}
      </div>
      <div ref={ref} className="h-10 flex items-center justify-center mt-6">
        {isFetchingNextPage && (
          <Spinner className="mt-5 w-17 h-17 text-primary" data-testid="loading" />
        )}
        {!hasNextPage && offers.length > 0 && <p className="text-center text-[14px] sm:text-[16px]">No more offers</p>}
      </div>
    </>
  );
};

