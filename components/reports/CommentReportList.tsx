import { CommentReport } from "@/types/report";
import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CommentReportsCard from "./CommentReportCard";


interface Props {
    data: CommentReport[];
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
}


export default function CommentReportList({ data, hasNextPage, fetchNextPage, isFetchingNextPage }: Props) {

    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <>
            <div className="flex flex-col gap-3">
                {data.map(item => (
                    <CommentReportsCard data={item} key={item.report.id} />
                ))}
            </div>

            <div ref={ref} className="h-10 flex items-center justify-center mt-6">
                {isFetchingNextPage && (
                    <Spinner className="mt-5 w-10 h-10 text-primary" data-testid="loading" />
                )}
            </div>
        </>
    );
}
