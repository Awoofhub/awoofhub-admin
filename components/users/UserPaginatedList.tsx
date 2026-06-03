import PaginationButtons from "@/components/button/PaginationButtons";
import { User } from "@/types/user";
import UserRow from "./UserRow";

interface Props {
    users: User[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onModerateClick: (id: string, action: 'suspended' | 'banned' | 'active') => void;
}

export default function UserPaginatedList({ users, currentPage, totalPages, onPageChange, onModerateClick }: Props) {
    return (
        <>
            <div className="overflow-x-auto rounded-lg">
                <table className="w-full text-left shadow-sm whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                        <tr>
                            <th className="px-3 py-4">User</th>
                            <th className="px-3 py-4">Role</th>
                            <th className="px-3 py-4">Joined</th>
                            <th className="px-3 py-4">Status & Actions</th>
                            <th className="px-3 py-4 text-center">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => <UserRow key={user.id} user={user} onModerateClick={onModerateClick} />)}
                    </tbody>
                </table>
            </div>
            <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
        </>
    );
}