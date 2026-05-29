'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AlertCircle, Loader, MessageSquare, ShieldAlert } from 'lucide-react';
import { useComments } from '../../../../features/comments/useComments';
import { Comment } from '@/types/comment';
import { formatDateTime } from '@/utils/formatDateTime';
import CommentModerationModal from '@/components/comments/CommentModerationModal';
import CommentDetailSkeleton from '@/components/comments/CommentDetailSkeleton';

const remoteImageLoader = ({ src }: { src: string }) => src;

export default function CommentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const commentId = params.id as string;
  const [showModModal, setShowModModal] = useState(false);

  const { comments, isLoading, error } = useComments({ page: 1, limit: 100 });

  const comment = comments?.find((c: Comment) => c.id === commentId);

  if (isLoading) {
    return (
      <CommentDetailSkeleton />
    );
    return (
      <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
        <div className="py-4 sm:py-6 px-3 sm:px-4 md:px-6 mx-auto w-full flex flex-col h-full items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-primary mb-3" />
          <p className="text-gray-500">Loading comment...</p>
        </div>
      </section>
    );
  }

  if (error || !comment) {
    return (
      <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
        <div className="py-4 sm:py-6 px-3 sm:px-4 md:px-6 mx-auto w-full flex flex-col h-full">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-700 shrink-0" />
              <div>
                <h2 className="text-lg font-bold text-red-700 mb-1">Error Loading Comment</h2>
                <p className="text-red-600">{error?.message ?? 'Comment not found.'}</p>
              </div>
            </div>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
      <div className="py-4 sm:py-6 px-3 sm:px-4 md:px-6 mx-auto w-full max-w-4xl flex flex-col h-full">
        {/* Back Button & Header */}
        <div className="mb-6 sm:mb-8 shrink-0">
          <button
            onClick={() => router.back()}
            className="text-primary hover:text-orange-700 font-semibold mb-4 flex items-center gap-2 text-sm sm:text-base"
          >
            ← Back to Comments
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-primary" />
            Comment Details
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Comment Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8">
            {/* User Info */}
            <div className="mb-6 pb-6 border-b border-gray-300">
              <div className="flex items-center gap-4 mb-4">
                {comment.user?.profileImageUrl && (
                  <Image
                    loader={remoteImageLoader}
                    unoptimized
                    src={comment.user.profileImageUrl}
                    alt={comment.user.name ?? 'User avatar'}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <Link href={`/users/${comment.user?.id}`} className="text-sm text-gray-500 hover:underline">

                    <h2 className="text-xl font-bold text-slate-800">
                      {comment.user?.name || 'Anonymous'}
                    </h2>
                  </Link>
                </div>
              </div>
            </div>

            {/* Offer Info */}
            <div className="mb-6 pb-6 border-b border-gray-300">
              <h6 className="text-sm font-semibold text-gray-700 uppercase mb-2">On Offer</h6>
              <div className="bg-white rounded-lg p-4">

                <Link className='hover:underline' href={comment.offer?.id ? `/offers/${comment.offer.id}` : '#'} >


                  <p className="text-sm font-semibold text-slate-800 ">{comment.offer?.title}</p>
                </Link>

              </div>
            </div>

            {/* Comment Content */}
            <div className="mb-6 pb-6 border-b border-gray-300">
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-3">Comment</h3>
              <div className="bg-white rounded-lg p-4">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {comment.comment}
                </p>
              </div>
            </div>

            {/* Timestamp */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-2">Posted</h3>
              <p className="text-gray-600">
                {formatDateTime(comment.createdAt)}
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => router.push('/comments')}
                className="inline-flex items-center justify-center rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
              >
                Back to comments
              </button>
              <button
                type="button"
                onClick={() => setShowModModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                <ShieldAlert className="w-4 h-4" />
                Moderate Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      <CommentModerationModal
        isOpen={showModModal}
        onClose={() => setShowModModal(false)}
        commentId={commentId}
        commentText={comment.comment}
        onSubmitSuccess={() => {
          router.push('/comments');
        }}
      />
    </section>
  );
}
