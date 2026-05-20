import { Offer } from "@/types/offer";
import Image from 'next/image';
import Link from "next/link";
import ChatButton from "../../chat/ChatButton";
import Comment from "../../comment/Comment";
import ReviewChart from "../../review/ReviewChart";
import BusinessLink from "./BusinessLink";
import OfferInfo from "./OfferInfo";
import TrustSection from "./TrustSection";

interface Props {
    offer: Offer;
}

export default function SingleOffer({ offer }: Props) {
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

                    <div className="w-full mt-4 xs:mt-8 md:mt-12 flex md:flex-col gap-3">
                        <ChatButton targetUserId={offer.business.id}>
                            <div className="w-4/5 md:w-full bg-orange-600 hover:bg-orange-700 text-white font-bold p-1 xs:py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all">
                                Message
                            </div>
                        </ChatButton>

                        <Link href="/report" className="w-1/5 md:w-full border border-red-500 text-red-500 text-xs xs:text-sm font-bold py-3 rounded-lg flex items-center justify-center hover:text-white hover:bg-red-500 transition-colors">
                            Report
                        </Link>
                    </div>
                </div>

                <div className="md:col-span-5">
                    <div className="flex justify-between items-center mb-6">
                        <BusinessLink offer={offer} />
                        <span className="bg-green-100 text-green-700 text-xs animate-pulse font-bold px-2 py-1 rounded">
                            Available
                        </span>
                    </div>

                    <OfferInfo offer={offer} />

                </div>

            </div>
            <TrustSection offer={offer} />

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