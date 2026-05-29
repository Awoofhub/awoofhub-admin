import React from 'react';
import Image from 'next/image';

const remoteImageLoader = ({ src }: { src: string }) => src;

export default function CommentDetailSkeleton() {
    return (
        <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
            <div className="py-4 sm:py-6 px-3 sm:px-4 md:px-6 mx-auto w-full max-w-4xl flex flex-col h-full">
                {/* Header skeleton */}
                <div className="mb-6 flex items-center gap-2 animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <div className="h-6 w-40 bg-gray-200 rounded" />
                </div>
                {/* Content skeleton */}
                <div className="flex-1 space-y-4 overflow-y-auto">
                    {/* User info */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full" />
                        <div className="flex flex-col gap-1">
                            <div className="h-4 w-32 bg-gray-200 rounded" />
                            <div className="h-3 w-24 bg-gray-200 rounded" />
                        </div>
                    </div>
                    {/* Offer info */}
                    <div className="space-y-2">
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                        <div className="h-3 w-36 bg-gray-200 rounded" />
                    </div>
                    {/* Comment content */}
                    <div className="space-y-2">
                        <div className="h-4 w-3/4 bg-gray-200 rounded" />
                        <div className="h-4 w-2/3 bg-gray-200 rounded" />
                        <div className="h-4 w-1/2 bg-gray-200 rounded" />
                    </div>
                    {/* Timestamp */}
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
                {/* Buttons skeleton */}
                <div className="mt-5 flex gap-3 animate-pulse">
                    <div className="flex-1 h-10 bg-gray-200 rounded" />
                    <div className="flex-1 h-10 bg-gray-200 rounded" />
                </div>
            </div>
        </section>
    );
}
