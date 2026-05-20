export default function OfferDetailSkeleton() {
    return (
        <div className="animate-pulse flex flex-col gap-6 md:gap-8 w-full">
            <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-gray-200 aspect-square rounded-lg w-full"></div>
                    <div className="h-20 bg-gray-100 rounded-lg w-full"></div>
                    <div className="h-48 bg-gray-100 rounded-lg w-full"></div>
                </div>
                <div className="md:col-span-2 space-y-6">
                    <div className="h-24 bg-gray-100 rounded-lg w-full"></div>
                    <div className="h-32 bg-gray-100 rounded-lg w-full"></div>
                    <div className="h-24 bg-gray-100 rounded-lg w-full"></div>
                    <div className="h-48 bg-gray-100 rounded-lg w-full"></div>
                </div>
            </div>
        </div>
    );
}