"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface OffersPaginationContextType {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}

export const OffersPaginationContext = createContext<OffersPaginationContextType>({ page: 1, setPage: () => { }});

export function OffersPaginationProvider({ children }: { children: ReactNode }) {
    const [page, setPage] = useState(1);
    return (
        <OffersPaginationContext.Provider value={{ page, setPage }}>
            {children}
        </OffersPaginationContext.Provider>
    )
}