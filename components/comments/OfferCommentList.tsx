import { useCommentsForOffer } from "@/features/comments/useCommentsForOffer";
import { useState } from "react";
import PaginatedList from "../list/PaginatedList";

interface Props {
    id: string,
}

export default function OfferCommentTable({ id }: Props) {
    const [page, setPage] = useState(1);
    const limit = 4

    const { data: comments, isFetched, isFetching } = useCommentsForOffer({
        id,
        page,
        limit,
    });

    return (
        <div>
            <PaginatedList
                response={comments}
                limit={limit}
                rowKey={(comment) => comment.id}
                currentPage={page}
                onPageChange={setPage}
                renderItem={{
                    key: "id",
                    render: (comment) => (
                        <div>
                            {comment.comment} 
                        </div>
                    )
                }}
                isFetching={isFetching}
                isFetched={isFetched}
                title="COMMENTS"
            />
        </div>
    )
}
