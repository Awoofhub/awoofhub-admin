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
        <div className="flex flex-col h-full w-full">

            {/* Table Wrapper */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left whitespace-nowrap relative">

                    {/* Sticky Header */}
                    <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-3 py-4 bg-gray-50">User</th>
                            <th className="px-3 py-4 bg-gray-50">Role</th>
                            <th className="px-3 py-4 bg-gray-50">Joined</th>
                            <th className="px-3 py-4 bg-gray-50">Status & Actions</th>
                            <th className="px-3 py-4 bg-gray-50 text-center">View</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <UserRow key={user.id} user={user} onModerateClick={onModerateClick} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Wrapper: Fixed at the bottom */}
            <div className="shrink-0 bg-white border-t border-gray-100 p-2 sm:p-4 z-20">
                <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
            </div>

        </div>
    );
}