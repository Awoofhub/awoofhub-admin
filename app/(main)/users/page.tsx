/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useCallback, useMemo } from 'react';
import { RotateCcw, Plus } from 'lucide-react';
import UserPaginatedList from '@/components/users/UserPaginatedList';
import SearchInput from '@/components/offers/admin/SearchInput';
import { useUsersAdmin } from '@/features/user/useUsersAdmin';
import { useModerateUser } from '@/features/user/useModerateUser';
import { addUserService } from '@/services/user-service';
import { notificationsStore } from '@/store/notifications/notifications';

export default function UsersPage() {
    const [filters, setFilters] = useState({ search: '', role: '', status: '', page: 1, limit: 10 });
    const { data, isLoading, error, refetch } = useUsersAdmin(filters);
    const { mutate: moderateUser, isPending: isModerating } = useModerateUser();


    // Add User Modal State
    // const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    // const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
    // const [isAdding, setIsAdding] = useState(false);

    // Moderation Modal State
    const [modModalState, setModModalState] = useState<{ isOpen: boolean; action: 'suspended' | 'banned' | 'active' | null; userId: string | null }>({ isOpen: false, action: null, userId: null });
    const [modReason, setModReason] = useState('');

    const updateFilters = useCallback((partial: any) => setFilters(prev => ({ ...prev, ...partial })), []);
    const hasActiveFilters = useMemo(() => Boolean(filters.search || filters.role || filters.status), [filters]);

    const handleModerate = (id: string, action: 'suspended' | 'banned' | 'active') => {
        if (action === 'active') {
            moderateUser({ id, status: 'active', reason: 'Unbanned/Activated from Admin Table' });
        } else {
            setModModalState({ isOpen: true, action, userId: id });
        }
    };

    const confirmModeration = () => {
        if (!modModalState.action || !modModalState.userId) return;
        moderateUser(
            { id: modModalState.userId, status: modModalState.action, reason: modReason },
            {
                onSuccess: () => {
                    setModModalState({ isOpen: false, action: null, userId: null });
                    setModReason('');
                }
            }
        );
    };
    // const handleAddUser = async () => {
    //     setIsAdding(true);
    //     try {
    //         await addUserService(newUser);
    //         notificationsStore.getState().showNotification({ type: 'success', title: 'User Created', duration: 3000, message: 'New user added successfully.' });
    //         setIsAddModalOpen(false);
    //         setNewUser({ name: '', email: '', password: '', role: 'user' });
    //         refetch();
    //     } catch (err: any) {
    //         notificationsStore.getState().showNotification({ type: 'error', title: 'Error', duration: 5000, message: err.message || 'Failed to create user.' });
    //     } finally {
    //         setIsAdding(false);
    //     }
    // };

    if (error) return <div className="p-8 text-red-500">Error loading users.</div>;

    return (
        <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden relative">
            <div className="py-4 sm:py-6 px-3 sm:px-4 md:px-6 mx-auto w-full max-w-360 flex flex-col h-full">

                <header className="mb-4 sm:mb-6 shrink-0 flex justify-between items-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">User Management</h1>
                    {/* <button onClick={() => setIsAddModalOpen(true)} className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm transition-colors">
                        <Plus className="w-4 h-4" /> Add User
                    </button> */}
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

                {/* Add User Modal */}
                {/* {isAddModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-150 p-4">
                        <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New User</h2>
                            <div className="space-y-4 mb-6">
                                <input type="text" placeholder="Full Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none text-sm" />
                                <input type="email" placeholder="Email Address" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none text-sm" />
                                <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none text-sm" />
                                <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none text-sm bg-white">
                                    <option value="user">Regular User</option>
                                    <option value="business">Business Account</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setIsAddModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg">Cancel</button>
                                <button onClick={handleAddUser} disabled={isAdding || !newUser.email || !newUser.password} className="flex-1 px-4 py-2 text-white bg-primary hover:bg-primary/90 font-semibold rounded-lg disabled:opacity-50">
                                    {isAdding ? 'Creating...' : 'Create User'}
                                </button>
                            </div>
                        </div>
                    </div>
                )} */}


                {/* Moderation Modal */}
                {modModalState.isOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-150 p-4">
                        <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl">
                            <h2 className="text-xl font-bold text-gray-900 mb-2 capitalize">
                                {modModalState.action} User
                            </h2>
                            <p className="text-gray-600 mb-4 text-sm">
                                Please provide a reason for this action. This will be logged in their moderation history.
                            </p>
                            <textarea
                                value={modReason}
                                onChange={(e) => setModReason(e.target.value)}
                                placeholder={`Reason for ${modModalState.action}...`}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none mb-6 h-28 resize-none text-sm"
                            />
                            <div className="flex gap-3">
                                <button onClick={() => { setModModalState({ isOpen: false, action: null, userId: null }); setModReason(''); }} className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg">
                                    Cancel
                                </button>
                                <button onClick={confirmModeration} disabled={isModerating || !modReason.trim()} className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 font-semibold rounded-lg disabled:opacity-50">
                                    {isModerating ? 'Saving...' : 'Confirm'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}