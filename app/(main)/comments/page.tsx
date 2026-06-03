'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, UserRound, ShieldAlert, SlidersHorizontal } from 'lucide-react';
import { useComments } from '../../../features/comments/useComments';
import CommentModerationModal from '@/components/comments/CommentModerationModal';
import { Comment } from '../../../types/comment';
import { formatDateTime } from '../../../utils/formatDateTime';

const PAGE_LIMIT = 5;

const imageLoader = ({ src }: { src: string }) => src;

type Filters = {
  search: string;
  offer: string;
  from: string;
  to: string;
};

const initialFilters: Filters = {
  search: '',
  offer: '',
  from: '',
  to: '',
};

function isCommentVisible(comment: Comment, filters: Filters) {
  const searchText = `${comment.comment} ${comment.user?.name ?? ''} ${comment.offer?.title ?? ''}`.toLowerCase();
  const offerText = `${comment.offer?.title ?? ''} ${comment.offer?.id ?? ''}`.toLowerCase();
  const commentDate = new Date(comment.createdAt);

  if (filters.search && !searchText.includes(filters.search)) {
    return false;
  }

  if (filters.offer && !offerText.includes(filters.offer)) {
    return false;
  }

  if (filters.from && commentDate < new Date(filters.from)) {
    return false;
  }

  if (filters.to && commentDate > new Date(`${filters.to}T23:59:59`)) {
    return false;
  }

  return true;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3 pr-2">
      {[...Array(PAGE_LIMIT)].map((_, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white animate-pulse">
          <div className="flex flex-col md:grid md:grid-cols-[30%_45%_15%_10%] gap-4 md:gap-0 items-start md:items-center">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-3 w-28 bg-slate-200 rounded-md" />
                <div className="h-3 w-24 bg-slate-200 rounded-md" />
              </div>
            </div>
            <div className="h-3 bg-slate-200 rounded-md w-full md:w-3/4" />
            <div className="flex justify-between items-center w-full md:contents">
              <div className="h-3 bg-slate-200 rounded-md w-20 md:w-16" />
              <div className="w-8 h-8 rounded-lg bg-slate-200 md:ml-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">{message}</p>
      </div>
    </div>
  );
}

function CommentRow({
  comment,
  onClick,
  onModerateClick,
}: {
  comment: Comment;
  onClick: () => void;
  onModerateClick: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-50 border border-gray-200 rounded-lg p-2 hover:border-primary hover:bg-blue-50 transition-all cursor-pointer"
    >
      <div className="flex flex-col md:grid md:grid-cols-[30%_45%_15%_10%] gap-3 md:gap-0 items-start md:items-center">
        <div className="flex items-start gap-3 min-w-0 w-full md:w-auto">
          {comment.user?.profileImageUrl ? (
            <Image
              loader={imageLoader}
              unoptimized
              src={comment.user.profileImageUrl}
              alt={comment.user.name ?? 'User avatar'}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <UserRound className="w-5 h-5 text-gray-500" />
            </div>
          )}

          <div className="min-w-0 flex flex-col gap-1">
            {comment.user?.id ? (
              <Link
                href={`/users/${comment.user.id}`}
                onClick={(event) => event.stopPropagation()}
                className="font-semibold text-slate-800 text-sm truncate hover:text-primary hover:underline"
              >
                {comment.user?.name || 'Anonymous'}
              </Link>
            ) : (
              <p className="font-semibold text-slate-800 text-sm truncate">{comment.user?.name || 'Anonymous'}</p>
            )}

            <Link
              href={comment.offer?.id ? `/offers/${comment.offer.id}` : '#'}
              onClick={(event) => event.stopPropagation()}
              className="text-xs text-gray-500 truncate hover:text-primary hover:underline"
            >
              on “{comment.offer?.title || 'Unknown Offer'}”
            </Link>
          </div>
        </div>

        <div className="text-sm font-semibold text-slate-700 leading-relaxed line-clamp-2 w-full md:w-auto">
          {comment.comment}
        </div>

        <div className="flex justify-between items-center w-full md:contents">
          <span className="text-xs text-gray-500 text-left ">
            {formatDateTime(comment.createdAt)}
          </span>

          <div className="text-right pr-2">
            <button
              onClick={onModerateClick}
              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-100 hover:border-red-200 inline-flex items-center justify-center"
              title="Moderate Comment"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommentsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [selectedComment, setSelectedComment] = useState<{ id: string; text: string } | null>(null);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const { comments, isLoading, error } = useComments({ page: 1, limit: 1000 });

  const normalizedFilters = useMemo(
    () => ({
      search: filters.search.trim().toLowerCase(),
      offer: filters.offer.trim().toLowerCase(),
      from: filters.from,
      to: filters.to,
    }),
    [filters],
  );

  const filteredComments = useMemo(
    () => (comments ?? []).filter((comment) => isCommentVisible(comment, normalizedFilters)),
    [comments, normalizedFilters],
  );

  const totalPages = Math.max(1, Math.ceil(filteredComments.length / PAGE_LIMIT));
  const currentPage = Math.min(page, totalPages);
  const paginatedComments = filteredComments.slice((currentPage - 1) * PAGE_LIMIT, currentPage * PAGE_LIMIT);
  const hasActiveFilters = Boolean(filters.search || filters.offer || filters.from || filters.to);

  const updateFilter = (field: keyof Filters, value: string) => {
    setPage(1);
    setFilters((current) => ({ ...current, [field]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  const handleCommentClick = (commentId: string) => {
    router.push(`/comments/${commentId}`);
  };

  if (error) {
    return (
      <section className="pt-14 px-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-700" />
            <div>
              <h2 className="text-lg font-bold text-red-700 mb-1">Error Loading Comments</h2>
              <p className="text-red-600">{error.message || 'Failed to load comments'}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[90dvh] overflow-hidden">
      <div className="py-4 sm:py-6 px-3 sm:px-4 md:px-6 mx-auto w-full flex flex-col h-full">
        <header className="mb-4 shrink-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Comments Management</h1>
        </header>

        {/* Mobile Filters Toggle Button */}
        <button
          type="button"
          onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          className="sm:hidden mb-4 w-full px-4 py-2.5 text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 flex items-center justify-between text-slate-700 transition-colors shrink-0"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            {isFiltersExpanded ? 'Hide Filters' : 'Show Filters'}
          </span>
          {hasActiveFilters && (
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          )}
        </button>

        <div className={`mb-4 sm:mb-6 sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 shrink-0 ${isFiltersExpanded ? 'grid' : 'hidden'}`}>
          <input
            id="comment-search"
            type="search"
            value={filters.search}
            onChange={(event) => updateFilter('search', event.target.value)}
            placeholder="Search comment text, user, or offer"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-gray-700"
          />

          <input
            id="offer-filter"
            type="text"
            value={filters.offer}
            onChange={(event) => updateFilter('offer', event.target.value)}
            placeholder="Filter by offer title or ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-gray-700"
          />

          <input
            id="date-from"
            type="date"
            value={filters.from}
            onChange={(event) => updateFilter('from', event.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-gray-700"
          />

          <input
            id="date-to"
            type="date"
            value={filters.to}
            onChange={(event) => updateFilter('to', event.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-gray-700"
          />

          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="w-full px-3 py-2 text-sm font-semibold rounded-lg transition-colors bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Reset Filters
          </button>
        </div>

        <div className="hidden md:grid mb-3 rounded-xl border font-bold border-gray-200 bg-slate-50 p-4 text-xs uppercase tracking-wide grid-cols-[30%_45%_15%_10%]">
          <span>User / Offer</span>
          <span>Comment</span>
          <span className="text-left">Posted</span>
          <span className="text-right pr-2">Actions</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <LoadingSkeleton />
          ) : filteredComments.length === 0 ? (
            <EmptyState message={hasActiveFilters ? 'No comments match your filters.' : 'No comments found.'} />
          ) : (
            <div className="space-y-2 pr-2">
              {paginatedComments.map((comment) => (
                <CommentRow
                  key={comment.id}
                  comment={comment}
                  onClick={() => handleCommentClick(comment.id)}
                  onModerateClick={(e) => {
                    e.stopPropagation();
                    setSelectedComment({ id: comment.id, text: comment.comment });
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {filteredComments.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center items-center gap-2 shrink-0">
            <button
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <CommentModerationModal
        isOpen={!!selectedComment}
        onClose={() => setSelectedComment(null)}
        commentId={selectedComment?.id || ''}
        commentText={selectedComment?.text || ''}
      />
    </section>
  );
}
