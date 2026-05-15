import { Offer } from "@/types/offer";
import { CheckCircle2 } from "lucide-react";
import AlertButton from "../../alert/Alert";
import Review from "../../review/Review";
import BusinessLink from "./BusinessLink";

interface Props {
    offer: Offer;
}

export default function TrustSection({ offer }: Props) {
    return (
        <section className="border-t border-b border-gray-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-5 items-start">
            {/* Store Info */}
            <div className="flex flex-col items-center gap-3">
                <BusinessLink offer={offer} />
                <AlertButton businessId={offer.business.id} />
            </div>

            {/* Leave a Rating */}
            <div className="text-center md:border-x border-gray-300 xs:col-span-2 order-3 md:col-span-1 md:order-none px-4">
                <h3 className="font-bold text-gray-800">Leave a Rating</h3>
                <p className="text-gray-400 text-xs mb-4">Rate your experience about this offer</p>
               <Review offer={offer}/>
            </div>

            {/* Safety Tips */}
            <div className="space-y-3">
                <h3 className="font-bold text-gray-800">Safety Tips</h3>
                <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span>86% positive ratings from 100K+ customers</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span>10K+ recent orders from this brand</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span>2+ years on AwoofHub</span>
                    </div>
                </div>
            </div>
        </section>

    );
}