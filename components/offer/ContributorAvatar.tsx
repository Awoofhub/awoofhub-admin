import Image from 'next/image';

const AVATAR_COLORS = [
    'bg-orange-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500',
    'bg-pink-500', 'bg-teal-500', 'bg-red-500', 'bg-indigo-500',
];

function avatarColorFor(name: string) {
    const index = name.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
}

function getInitials(name?: string) {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    const initials = parts.length >= 2
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`
        : parts[0].slice(0, 2);
    return initials.toUpperCase();
}

interface ContributorAvatarProps {
    name?: string;
    profileImageUrl?: string | null;
    size?: number; 
    className?: string; 
    textClassName?: string;
}

export default function ContributorAvatar({
    name,
    profileImageUrl,
    size = 28,
    className = '',
    textClassName = 'text-xs',
}: ContributorAvatarProps) {
    if (profileImageUrl) {
        return (
            <Image
                src={profileImageUrl}
                alt=""
                width={size}
                height={size}
                className={`rounded-full shrink-0 object-cover ${className}`}
            />
        );
    }

    return (
        <div
            className={`rounded-full flex items-center justify-center text-white font-bold shrink-0 ${avatarColorFor(name ?? '?')} ${className} ${textClassName}`}
        >
            {getInitials(name)}
        </div>
    );
}