'use client';

import { useParams, useRouter } from 'next/navigation';
import { useUserById } from '@/features/user/useUserById';
import { useModerateUser } from '@/features/user/useModerateUser';
import { formatDateTime } from '@/utils/formatDateTime';
import { CheckCircle2, Ban, ShieldAlert, UserIcon, MapPin, Globe } from 'lucide-react';
import Image from 'next/image';

export default function UserDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { data: user, isLoading } = useUserById({ id: params.id as string });
    const { mutate: moderateUser, isPending } = useModerateUser();

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading user details...</div>;
    if (!user) return <div className="p-8 text-center text-red-500">Failed to load user.</div>;

    const handleAction = (status: 'active' | 'suspended' | 'banned') => {
        if (confirm(`Change user status to ${status}?`)) moderateUser({ id: user.id, status });
    };

    return (
        <section className="w-full bg-white flex flex-col h-[90dvh] md:h-[88dvh] overflow-hidden">
            <div className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 mx-auto w-full max-w-250 flex flex-col h-full">
                
                <div className="mb-6 shrink-0 flex justify-between items-center">
                    <button onClick={() => router.back()} className="text-primary hover:underline font-semibold text-sm">← Back to Users</button>
                    <div className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-700">
                        Status: {user.status || 'Active'}
                    </div>
                </div>

                <div className="flex-1 overflow-auto pr-2 space-y-6">
                    {/* Header Profile */}
                    <div className="bg-gray-50 rounded-xl p-6 flex items-center gap-6">
                        {user.profileImageUrl ? (
                            <Image src={user.profileImageUrl} alt={user.name} width={100} height={100} className="rounded-full object-cover w-24 h-24 shadow-sm" />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold uppercase">{user.name.charAt(0)}</div>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
                            <p className="text-gray-500 mb-2">{user.email}</p>
                            <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-bold capitalize shadow-sm text-gray-700">{user.role}</span>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Profile Details</h2>
                            {user.bio && <div><p className="text-xs text-gray-500 font-bold uppercase mb-1">Bio</p><p className="text-sm text-gray-800">{user.bio}</p></div>}
                            <div className="flex items-center gap-2 text-sm text-gray-700"><MapPin className="w-4 h-4 text-gray-400" /> {user.address || 'No address provided'}</div>
                            <div className="flex items-center gap-2 text-sm text-gray-700"><Globe className="w-4 h-4 text-gray-400" /> {user.website || 'No website provided'}</div>
                            <div className="flex items-center gap-2 text-sm text-gray-700"><UserIcon className="w-4 h-4 text-gray-400" /> Joined {formatDateTime(user.createdAt)}</div>
                        </div>

                        {/* Moderation Box */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-amber-900 mb-4">Admin Controls</h2>
                            <div className="flex flex-col gap-3">
                                <button onClick={() => handleAction('active')} disabled={isPending || user.status === 'active'} className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors">
                                    <CheckCircle2 className="w-5 h-5" /> Mark Active
                                </button>
                                <button onClick={() => handleAction('suspended')} disabled={isPending || user.status === 'suspended'} className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors">
                                    <ShieldAlert className="w-5 h-5" /> Suspend User
                                </button>
                                <button onClick={() => handleAction('banned')} disabled={isPending || user.status === 'banned'} className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors">
                                    <Ban className="w-5 h-5" /> Ban User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}