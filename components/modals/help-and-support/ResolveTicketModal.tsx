import { useUpdateHelpAndSupportStatus } from "@/features/help-and-support/useUpdateHelpAndSupportStatus";
import { HelpAndSupport } from "@/types/help-and-support";
import { Loader2 } from "lucide-react";
import Image from 'next/image';

interface Props {
    data: HelpAndSupport;
    isOpen: boolean;
    onDone: () => void;
}


export default function ResolveTicketModal({ data, isOpen, onDone }: Props) {

    const { updateHelpAndSupport, isPending } = useUpdateHelpAndSupportStatus({
        id: data.id,
        onSuccess: () => {
            onDone();
        },
    })


    if (!isOpen) return null;

    const handleClose = () => {
        if (isPending) return;
        onDone();
    };

    const onSubmit = () => {
        updateHelpAndSupport({ status: "resolved" })
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-xl px-4 xs:px-6 py-10 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                <div className="text-center">
                    <div className="relative mx-auto mb-4 flex items-center justify-center">
                        <Image src="/approve.png" width={200} height={200} alt='' priority className="mx-auto w-[150px] lg:w-[200px]" />
                    </div>
                    <h3 className="font-bold text-xl xs:text-2xl lg:text-3xl text-gray-900 mb-4">
                        Resolve this ticket?
                    </h3>
                    <div className="flex-col xs:flex-row flex gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isPending}
                            className="flex-1 cursor-pointer border rounded-sm py-2 font-baloo font-semibold text-sm xs:text-base disabled:opacity-50 border-[#00A95D] text-[#00A95D]"
                        >
                            Not yet
                        </button>
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={isPending}
                            className="flex-1 cursor-pointer text-white rounded-sm py-2 font-baloo font-semibold text-sm xs:text-base disabled:opacity-50 flex items-center justify-center gap-2 bg-[#00A95D] hover:bg-green-700"
                        >
                            {isPending ? <Loader2 className="animate-spin" size={16} /> : 'Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}