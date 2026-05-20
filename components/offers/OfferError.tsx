
export function OfferError() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h2 className="text-xl font-bold">Oops! Something went wrong</h2>
            <p className="mt-2 text-gray-600">
                We couldn&apos;t load the offers. Please try again later.
            </p>
        </div>
    );
}