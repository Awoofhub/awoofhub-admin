import { Offer } from "./offer";

export interface Comment {
    id: string,
    comment: string,
    user: {
        id: string,
        name: string,
        username:string,
        profileImageUrl: string,
    },
    offer: Offer
    createdAt: string;
}; 

