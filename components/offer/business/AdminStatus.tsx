import { Offer } from "@/types/offer";
import { formatDateTime } from "@/utils/formatDateTime";
import { Info } from "lucide-react";
import { RiAdminFill } from "react-icons/ri";

interface Props {
    offer: Offer;
}

const statusConfig = {
    approved: {
        container: "bg-green-50 border-green-500",
        button: "bg-green-800",
        text: "Approved at",
        iconColor: "text-green-700",
    },
    rejected: {
        container: "bg-red-50 border-red-500",
        button: "bg-red-800",
        text: "Rejected at",
        iconColor: "text-red-700",
    },
    pending: {
        container: "bg-orange-50 border-orange-500",
        button: "bg-orange-800",
        text: "Pending since",
        iconColor: "text-orange-700",
    },
};

export default function AdminStatus({ offer }: Props) {

    const config = statusConfig[offer.status] || statusConfig.pending;

    return (
        <section className="border-t border-b border-gray-300 py-6">
            <div className={`max-w-4xl p-6 mx-auto border-2 rounded-3xl ${config.container}`}>

                <div className="flex items-start gap-2 justify-between flex-col xxs:flex-row mb-6">
                    <div className="flex gap-4">
                        <div className="mt-1">
                            <RiAdminFill className={`w-8 h-8 ${config.iconColor}`} />
                        </div>

                        <div>
                            <h2 className="text-base xss:text-2xl font-bold text-gray-900 leading-tight">
                                Admin Moderation Status
                            </h2>
                            <p className="text-gray-500 text-sm xss:text-base font-medium">
                                {config.text} {offer.statusUpdatedAt && formatDateTime(offer.statusUpdatedAt)}
                            </p>
                        </div>
                    </div>

                    <button className={`px-8 py-3 text-white font-bold rounded-lg text-sm ${config.button}`}>
                        {offer.status}
                    </button>
                </div>

                {/* Notes */}
                <div className="p-6 w-full bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-black" />
                        <h3 className="text-xl font-bold text-gray-900">Note</h3>
                    </div>

                    <p className="leading-relaxed">
                        {offer.adminNote ? (
                            <span className="text-gray-500 break-words">
                                {offer.adminNote}
                            </span>
                        ) : (
                            <span className="text-gray-400 italic">
                                No admin note provided
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </section>
    );
}
