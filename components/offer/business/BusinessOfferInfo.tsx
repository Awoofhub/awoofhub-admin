import { ExpiryBadge } from "@/components/offers/business/OfferRow";
import { Offer } from "@/types/offer";
import Rating from "@mui/material/Rating";
import { MapPin } from "lucide-react";
import Action from "../Action";
import Terms from "../Terms";

interface Props {
    offer: Offer;
}


export default function BusinessOfferInfo({ offer }: Props) {

    const isExpired = new Date(offer.endDate) < new Date();

    return (
        <>
            <h1 className="text-xl xs:text-2xl md:text-3xl font-bold mb-1">
                {offer.title}
            </h1>

            <section className="flex flex-col gap-2 mb-4">
                <div className="flex items-center mb-1">
                    <Rating
                        name="readonly"
                        className="ml-[-3px]"
                        size="medium"
                        precision={0.1}
                        value={offer.avgRating}
                        readOnly
                        sx={{
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
                    <span className="text-gray-400 text-md ml-2">{`(${offer.reviewCount} reviews)`}</span>
                </div>
                <div className="flex justify-between items-start">
                    <div className="flex items-center text-gray-400 text-sm gap-1">
                        <MapPin color="#ffa600" size={18} /> {offer.location}
                    </div>

                    <ExpiryBadge isExpired={isExpired} />
                </div>
            </section>

            <section className="text-sm leading-relaxed text-gray-600">
                <h3 className="font-bold text-xl text-gray-900 mb-4">Details</h3>
                <p className="mb-7 break-words">
                    {offer.description}
                </p>

                <div className="inline-block bg-orange-50 text-orange-600 text-base sm:text-lg font-bold px-4 py-1 rounded-md border border-orange-100">
                    {offer.value}
                </div>
            </section>
            <Action offer={offer} />
            <Terms prop={offer.termsAndConditions} />
        </>
    )
}