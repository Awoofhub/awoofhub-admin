export default function OfferDetailSkeleton() {
    return (
        <div className="pt-6 pb-10 px-3 xs:px-4 max-w-[1440px] mx-auto w-full animate-pulse">
            <div className="h-4 w-16 bg-gray-200 rounded mb-4" />

            <div className="bg-white rounded-xl shadow-sm p-3 xs:p-4 lg:p-5 mb-4">
                <div className="flex flex-col items-start xs:flex-row gap-3">
                    <div className="w-full h-50.5 xs:w-55 md:w-57.5 xs:h-45.5 lg:w-80 lg:h-70 xl:w-90 xl:h-72.5 rounded-xl bg-gray-200 shrink-0" />

                    <div className="flex-1 min-w-0 w-full">
                        <div className="h-6 w-3/4 bg-gray-200 rounded" />

                        <div className="flex gap-2 mt-3">
                            <div className="h-5 w-16 bg-gray-200 rounded" />
                            <div className="h-5 w-20 bg-gray-200 rounded-lg" />
                            <div className="h-5 w-20 bg-gray-200 rounded-lg" />
                            <div className="h-5 w-14 bg-gray-200 rounded-full" />
                        </div>

                        <div className="h-4 w-32 bg-gray-200 rounded mt-3" />
                        <div className="h-4 w-40 bg-gray-200 rounded mt-2" />

                        <div className="flex justify-between mt-3">
                            <div className="h-4 w-28 bg-gray-200 rounded" />
                            <div className="h-4 w-20 bg-gray-200 rounded" />
                        </div>

                        <div className="mt-3">
                            <div className="h-4 w-16 bg-gray-200 rounded" />
                            <div className="h-4 w-full bg-gray-200 rounded mt-2" />
                            <div className="h-4 w-2/3 bg-gray-200 rounded mt-1" />
                        </div>

                        <hr className="border border-muted/20 mt-4" />

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-gray-200" />
                                <div className="h-4 w-24 bg-gray-200 rounded" />
                            </div>
                            <div className="h-8 w-32 bg-gray-200 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mb-4 bg-[#F3F3F5] border border-gray-200 py-3 px-4 shadow-sm rounded-xl">
                <div className="h-7 w-28 bg-gray-200 rounded-lg" />
                <div className="h-7 w-40 bg-gray-200 rounded-lg" />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
                <div className="space-y-4">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                            <div className="flex-1">
                                <div className="h-4 w-40 bg-gray-200 rounded" />
                                <div className="h-3 w-full bg-gray-200 rounded mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}