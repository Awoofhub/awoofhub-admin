import { User } from "./user";

export interface CreateModerationData {
    targetType: 'user' | 'offer' | 'comment',
    targetId: string,
    actionType: 'warning' | 'suspend' | 'block' | 'delete' | 'restore',
    reason?: string,
    endsAt?: string,
    reportId?: string
};

export interface Moderation {
    id: string,
    targetType: 'user' | 'offer' | 'comment',
    targetId: string,
    actionType: 'warning' | 'suspend' | 'block' | 'delete' | 'restore',
    reason: string,
    reportId: string,
    endsAt: string,
    admin: User,
    isActive: boolean,
    createdAt: string
};
