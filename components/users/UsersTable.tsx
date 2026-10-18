import { useUsers } from "@/features/user/useUsers";
import { UsersPaginationContext } from "@/providers/users-pagination-provider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import PaginatedTable from "../table/PaginatedTable";
import { UserColumns } from "./UserColumns";

interface Props {
    search?: string,
    status?: string,
}


export default function UsersTable({ search, status }: Props) {
    const router = useRouter();
    const {page, setPage} = useContext(UsersPaginationContext);
    const limit = 4

    useEffect(() => {
        setPage(1);
    }, [search, status, setPage]);

    const { data: users, isFetched, isFetching } = useUsers({
        search: search ?? "",
        status: status ?? "",
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
