import { Comment } from '@/types/comment';
import Image from 'next/image';
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import Link from 'next/link';

interface UserCommentListItemProps {
    comment: Comment;
}



export default function UserCommentListItem({ comment }: UserCommentListItemProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <p className="text-gray-900 text-sm md:text-base mb-1">
                {comment.comment}
            </p>
            <p className="text-xs text-gray-400 mb-3">
                {formatTimeAgo(comment.createdAt)}
            </p>
            
            
                <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded overflow-hidden shrink-0">
                        <Image 
                            src={comment.offer.imageUrl || '/placeholder.png'} 
                            alt={comment.offer.title} 
                            fill 
                            unoptimized 
                            className="object-cover"
                        />
                    </div>
                    <Link href={`/offers/${comment.offer.id}`} className="text-xs text-gray-500 truncate italic">
                        {comment.offer.title}
                    </Link>
                </div>
            
        </div>
    );
}
