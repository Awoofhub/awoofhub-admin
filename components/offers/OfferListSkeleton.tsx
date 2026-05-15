interface Props {
  number: number;
}

export default function OfferListSkeleton({ number }: Props) {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
      {[...Array(number)].map((_, i) => (
        <div
          key={i}
          className="bg-white w-[174px] h-[286px] sm:w-[300px] sm:h-[450px] md:w-[174px] md:h-[286px] lg:w-[300px] lg:h-[450px] rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col"
        >
          <div className="mb-6 mt-5 flex justify-center items-center h-48 bg-[#E0E0E0] animate-pulse rounded-md" />
          <div className="flex-grow flex flex-col gap-1 sm:gap-3 md:gap-1 lg:gap-3">
            <div className="h-0 sm:h-5 md:h-0 lg:h-5 w-full bg-[#E0E0E0] animate-pulse rounded-md" />
            <div className="h-4 w-[85%] bg-[#E0E0E0] animate-pulse rounded-md" />
            <div className="h-4 w-[65%] bg-[#E0E0E0] animate-pulse rounded-md" />
            <div className="h-5 w-[40%] bg-[#E0E0E0] animate-pulse rounded-md mt-2" />
          </div>

          <div className="h-[42px] w-full bg-[#E0E0E0] animate-pulse rounded-sm mt-4" />
        </div>
      ))}
    </div>
  );
}