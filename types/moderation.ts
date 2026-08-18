import { User } from "./user";

export interface CreateModerationData {
    targetType: 'user' | 'offer' | 'comment',
    targetId: string,
    actionType: 'warning' | 'suspend' | 'block' | 'delete' | 'activate',
    reason?: string,
    endsAt?: string,
    reportId?: string
};

export interface Moderation {
    id: string,
    targetType: 'user' | 'offer' | 'comment',
    targetId: string,
    actionType: 'warning' | 'suspend' | 'block' | 'delete' | 'activate',
    reason: string,
    reportId: string,
    endsAt: string,
    admin: User,
    isActive: boolean,
    createdAt: string
};
