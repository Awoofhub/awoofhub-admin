
export interface HelpAndSupport {
    id: string;
    email: string;
    name: string;
    category: string;
    message: string;
    status: 'open' | 'inProgress' | 'resolved' | 'closed';
    createdAt: string;
    updatedAt: string;
}
