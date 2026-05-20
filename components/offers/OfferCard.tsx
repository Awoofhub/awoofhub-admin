import { Offer } from "@/types/offer";
import Rating from '@mui/material/Rating';
import Image from 'next/image';
import Link from 'next/link';
import WishlistButton from "../wishlist/WishlistButton";


interface Props {
  offer: Offer;
}

export default function OfferCard({ offer }: Props) {
  return (

    <div key={offer.id} className="bg-white w-[174px] h-[286px] sm:w-[300px] sm:h-[450px] md:w-[174px] md:h-[286px] lg:w-[300px] lg:h-[450px] rounded-xl shadow-sm border border-gray-100 p-2 sm:p-5 md:p-2 lg:p-5 flex flex-col group hover:shadow-md transition-shadow">

      {/* Card Image & Wishlist */}
      <div className="relative mb-3 sm:mb-6 md:mb-3 lg:mb-6 mt-5 flex justify-center items-center h-25 sm:h-48 md:h-25 lg:h-48 bg-white">
        <WishlistButton position="absolute right-0 top-[-25] p-1" size="text-[27px]" offerId={offer.id} />
        <Image
          src={offer.imageUrl}
          alt={offer.title}
          width={500}
          height={500}
          className="max-h-full object-contain group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Card Content */}
      <div className="flex-grow">
        <h4 className="font-bold text-gray-900 text-sm sm:text-base md:text-sm lg:text-base mb-2 line-clamp-1">
          {offer.title}
        </h4>
        <p className="text-gray-500 text-xs sm:text-sm md:text-xs lg:text-sm mb-1 sm:mb-4 md:mb-1 lg:mb-4 line-clamp-2">
          {offer.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1 sm:mb-4 md:mb-1 lg:mb-4">
          <Rating
            name="readonly"
            className="ml-[-3px] sm:!text-[24px] md:!text-[18px] lg:!text-[24px]"
            value={offer.avgRating}
            precision={0.1}
            readOnly
            sx={{
              fontSize: {
                xs: '18px',
              },
              '& .MuiRating-icon': {
                marginRight: '-7px', // tighter spacing
              },
              '& .MuiRating-iconFilled': {
                color: '#FFC000', // filled stars
              },
              '& .MuiRating-iconEmpty': {
                color: '#ccc', // empty stars
              },
            }}
          />
          <span className="text-[10px] sm:text-[15px] md:text-[10px] lg:text-[15px] text-gray-400 ml-1">({offer.reviewCount})</span>
        </div>
      </div>

      <Link href={`/offers/${offer.id}`}
        className="w-full flex items-center justify-center bg-primary text-white py-2 sm:py-2.5 md:py-2 lg:py-2.5 rounded-sm font-bold text-sm sm:text-base md:text-sm lg:text-base hover:bg-orange-700 active:scale-95 transition-all">
        View More
      </Link>
    </div>

  );
};

