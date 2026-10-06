import { useUsers } from "@/features/user/useUsers";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import PaginatedTable from "../table/PaginatedTable";
import { UserColumns } from "./UserColumns";
import { UsersPaginationContext } from "@/providers/users-pagination-provider";



interface Props {
    search?: string,
    status?: string,
}


export default function UsersTable({ search, status }: Props) {
    const router = useRouter();
    const {page, setPage} = useContext(UsersPaginationContext);
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
