import { useHelpAndSupport } from "@/features/help-and-support/useHelpAndSupport";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PaginatedTable from "../table/PaginatedTable";
import { HelpAndSupportColumns } from "./HelpAndSupportColumns";

interface Props {
    search?: string,
}

export default function HelpAndSupportTable({ search }: Props) {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const limit = 4

    const { data, isFetched, isFetching } = useHelpAndSupport({
        search: search ?? "",
        category: "",
        status: "",
        submittedAt: "",
        page,
        limit,
    });

    return (
        <div>
            <PaginatedTable
                response={data}
                columns={HelpAndSupportColumns}
                limit={limit}
                rowKey={(data) => data.id}
                currentPage={page}
                onPageChange={setPage}
                onRowClick={(data) => router.push(`helpdesk/${data.id}`)}
                isFetching={isFetching}
                isFetched={isFetched}
            />
        </div>
    )
}
