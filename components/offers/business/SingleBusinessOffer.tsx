import AdminStatus from "@/components/offer/business/AdminStatus";
import BusinessOfferInfo from "@/components/offer/business/BusinessOfferInfo";
import { Offer } from "@/types/offer";
import Image from 'next/image';
import Comment from "../../comment/Comment";
import ReviewChart from "../../review/ReviewChart";




interface Props {
    offer: Offer;
}

export default function SingleBusinessOffer({ offer }: Props) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-9 gap-10 pb-10">
                <div className="md:col-span-4 flex flex-col items-center justify-start">
                    <div className="bg-gray-100 rounded-sm md:rounded-2xl w-full">
                        <Image
                            src={offer.imageUrl}
                            alt="Logo"
                            width={500}
                            height={500}
                            priority
                            className="w-full aspect-[10/9] p-10 "
                        />
                    </div>
                </div>

                <div className="md:col-span-5">
                    <BusinessOfferInfo offer={offer} />
                </div>

            </div>
            <AdminStatus offer={offer} />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12">
                <div className="md:col-span-4 space-y-6">
                    <ReviewChart offer={offer} />
                </div>


                <div className="md:col-start-6 lg:col-start-5 md:col-span-6 space-y-8">
                    <Comment offer={offer} />
                </div>
            </div>

        </>
    );
}