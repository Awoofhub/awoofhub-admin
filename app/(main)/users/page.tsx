'use client';

import { useState, useCallback, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';
import UserPaginatedList from '@/components/users/UserPaginatedList';
import SearchInput from '@/components/offers/business/SearchInput';
import { useUsersAdmin } from '@/features/user/useUsersAdmin';
import { useModerateUser } from '@/features/user/useModerateUser';

export default function UsersPage() {
    const [filters, setFilters] = useState({ search: '', role: '', status: '', page: 1, limit: 10 });
    const { data, isLoading, error } = useUsersAdmin(filters);
    const { mutate: moderateUser } = useModerateUser();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateFilters = useCallback((partial: any) => setFilters(prev => ({ ...prev, ...partial })), []);
    const hasActiveFilters = useMemo(() => Boolean(filters.search || filters.role || filters.status), [filters]);

    const handleModerate = (id: string, action: 'suspended' | 'banned' | 'active') => {
        if (confirm(`Are you sure you want to mark this user as ${action}?`)) {
            moderateUser({ id, status: action });
        }
    };

    if (error) return <div className="p-8 text-red-500">Error loading users.</div>;

    return (
        <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
            <div className="py-4 sm:py-6 px-3 sm:px-4 md:px-6 mx-auto w-full max-w-360 flex flex-col h-full">

                <header className="mb-4 sm:mb-6 shrink-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">User Management</h1>
                </header>

                <div className="mb-4 sm:mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 bg-gray-50 p-3 sm:p-4 rounded-lg shrink-0">
                    <div className="sm:col-span-2"><SearchInput value={filters.search} onChange={(val) => updateFilters({ search: val, page: 1 })} /></div>

                    <select value={filters.role} onChange={(e) => updateFilters({ role: e.target.value, page: 1 })} className="px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none bg-white">
                        <option value="">All Roles</option>
                        <option value="user">User</option>
                        <option value="business">Business</option>
                        <option value="admin">Admin</option>
                    </select>

                    <select value={filters.status} onChange={(e) => updateFilters({ status: e.target.value, page: 1 })} className="px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none bg-white">
                        <option value="">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="banned">Banned</option>
                    </select>

                    <button onClick={() => setFilters({ search: '', role: '', status: '', page: 1, limit: 10 })} disabled={!hasActiveFilters} className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 font-semibold rounded-lg flex items-center justify-center gap-2">
                        <RotateCcw className="w-4 h-4" /> Reset
                    </button>
                </div>

                <div className="flex-1 min-h-0 flex flex-col bg-white rounded-lg border border-gray-100">
                    {isLoading ? (
                        <div className="flex-1 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
                    ) : data?.users && data.users.length > 0 ? (
                        <div className="flex-1 overflow-auto">
                            <UserPaginatedList users={data.users} currentPage={filters.page} totalPages={data.totalPages} onPageChange={(p) => updateFilters({ page: p })} onModerateClick={handleModerate} />
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center"><h2 className="text-lg font-bold text-gray-700">No Users Found</h2></div>
                    )}
                </div>
            </div>
        </section>
    );
}