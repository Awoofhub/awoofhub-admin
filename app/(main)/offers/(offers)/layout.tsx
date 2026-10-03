import { OffersPaginationProvider } from "@/providers/offers-pagination-provider";
import { ReactNode } from "react";

export default function OffersLayout({children}: {children: ReactNode}){
 return (
    <OffersPaginationProvider>
        {children}
    </OffersPaginationProvider>
 )
} 