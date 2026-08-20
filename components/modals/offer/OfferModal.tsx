import Image from 'next/image';


interface Props {
    offerId: string;
    isOpen: boolean;
    onClose: () => void;
}


export default function OfferModal({ offerId, isOpen, onClose }: Props) {

    if (!isOpen) return null;

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div className="bg-white rounded-xl px-6 py-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <Image src="/reject.png" width={200} height={200} alt='' priority className="mx-auto w-[150px] lg:w-[200px]" />
                <h3 className="font-bold text-lg xs:text-xl text-gray-900 mb-4 text-center">Specify why this offer is being rejected.</h3>
                <label className="text-sm text-gray-500 block mt-4 mb-1">Reason for rejection</label>

            </div>
        </div>
    );

}