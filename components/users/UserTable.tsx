import { useUsers } from "@/features/user/useUsers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PaginatedTable from "../table/PaginatedTable";
import { UserColumns } from "./UserColumns";

interface Props {
    search?: string,
    status?: string,
}


export default function UserTable({ search, status }: Props) {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const limit = 4

    const { data: users, isFetched, isFetching } = useUsers({
        search: search ?? "",
        status: status ?? "",
        role: "",
        page,
        limit,
    });

    return (
        <div>
            <PaginatedTable
                response={users}
                columns={UserColumns}
                limit={limit}
                rowKey={(user) => user.id}
                currentPage={page}
                onPageChange={setPage}
                onRowClick={(user) => router.push(`users/${user.username}`)}
                isFetching={isFetching}
                isFetched={isFetched}
            />
        </div>
    )
}
