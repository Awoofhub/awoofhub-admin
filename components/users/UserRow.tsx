import { User } from '@/types/user';
import { formatDateTime } from '@/utils/formatDateTime';
import { Eye, ShieldAlert, CheckCircle2, Ban } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Props {
    user: User;
    onModerateClick: (id: string, action: 'suspended' | 'banned' | 'active') => void;
}

export default function UserRow({ user, onModerateClick }: Props) {
    const router = useRouter();

    const handleRowClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.action-cell')) return;
        router.push(`/users/${user.id}`);
    };

    const statusColors: Record<string, string> = {
        active: "bg-green-50 text-green-700 border-green-200",
        suspended: "bg-orange-50 text-orange-700 border-orange-200",
        banned: "bg-red-50 text-red-700 border-red-200",
    };

    return (
        <tr onClick={handleRowClick} className="cursor-pointer hover:bg-gray-50 transition-colors border-y border-gray-200 text-sm">
            <td className="px-3 py-4 flex items-center gap-3">
                {user.profileImageUrl ? (
                    <Image src={user.profileImageUrl} alt={user.name} width={40} height={40} className="rounded-full object-cover w-10 h-10" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold uppercase">{user.name.charAt(0)}</div>
                )}
                <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                </div>
            </td>
            <td className="px-3 py-4 capitalize font-medium text-gray-600">{user.role}</td>
            <td className="px-3 py-4 text-gray-500">{formatDateTime(user.createdAt)}</td>
            <td className="px-3 py-4 action-cell">
                <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-full border text-xs font-bold capitalize ${statusColors[user.status] || "bg-gray-50 text-gray-600"}`}>
                        {user.status || 'Active'}
                    </div>

                    <div className="flex gap-1">
                        {user.status !== 'active' && (
                            <button onClick={() => onModerateClick(user.id, 'active')} className="p-1 bg-green-100 hover:bg-green-200 text-green-700 rounded" title="Activate"><CheckCircle2 className="w-4 h-4" /></button>
                        )}
                        {user.status !== 'suspended' && (
                            <button onClick={() => onModerateClick(user.id, 'suspended')} className="p-1 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded" title="Suspend"><ShieldAlert className="w-4 h-4" /></button>
                        )}
                        {user.status !== 'banned' && (
                            <button onClick={() => onModerateClick(user.id, 'banned')} className="p-1 bg-red-100 hover:bg-red-200 text-red-700 rounded" title="Ban"><Ban className="w-4 h-4" /></button>
                        )}
                    </div>
                </div>
            </td>
            <td className="px-3 py-4 text-center action-cell">
                <button onClick={() => router.push(`/users/${user.id}`)} className="p-2 text-gray-500 hover:text-primary transition-colors"><Eye className="w-4 h-4" /></button>
            </td>
        </tr>
    );
}