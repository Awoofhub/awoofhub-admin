import { Offer } from '@/types/offer';
import { formatDate } from '@/utils/formatDate';
import { CopyAll } from '@mui/icons-material'; // Or use any Lucide/Heroicon
import { useState } from 'react';

interface Props {
    offer: Offer
}
export default function Action({ offer }: Props) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!offer.couponCode) return;

        navigator.clipboard.writeText(offer.couponCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getActionText = () => {
        switch (offer.category.name) {
            case "Coupons":
                return "Go to Site";
            case "Cashback":
                return "Activate Cashback";
            case "Freebies":
                return "Claim Freebie";
            case "Student Deals":
                return "Unlock Deal";
            case "Free Trials":
                return "Start Trial";
            case "Discount":
                return "Get Deal";
            default:
                return "Get Offer";
        }
    };

    return (
        <div className="flex items-start  flex-wrap space-y-5 justify-around py-6 my-6 border-t border-b border-gray-300">

            <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-bold text-gray-800">Expiring</span>
                <span className="text-sm font-medium italic text-gray-900">{formatDate(offer.endDate)}</span>
            </div>

            {offer.category.name === "Coupons" && (
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                        Use Coupon code
                    </span>

                    <button
                        onClick={handleCopy}
                        className="cursor-pointer relative flex items-center gap-2 bg-[#FF5500] hover:bg-[#E64D00] text-white font-bold py-2 px-8 rounded-sm uppercase transition-colors"
                    >
                        {offer.couponCode}
                        <CopyAll fontSize="small" />

                        {copied && (
                            <span className="absolute -top-8 right-0 text-xs text-green-600 bg-white px-2 py-1 rounded shadow">
                                Copied!
                            </span>
                        )}
                    </button>
                </div>
            )}

            <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-bold text-gray-800">
                    Unlock
                </span>

                <a
                    href={offer.dealUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-45 cursor-pointer flex justify-center items-center bg-[#006400] text-white font-bold py-2 px-8 rounded-sm"
                >
                    {getActionText()}
                </a>
            </div>
        </div>
    );
}