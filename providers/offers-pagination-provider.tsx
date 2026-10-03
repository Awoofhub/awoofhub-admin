"use client";

import {createContext,  useState, ReactNode} from "react";

export const OffersPaginationContext = createContext()

export function OffersPaginationProvider({children}:{children: ReactNode}) {
    const [page, setPage] = useState(1);
    return (
        <OffersPaginationContext.Provider value={{page, setPage}}>
            {children}
        </OffersPaginationContext.Provider>
    )
}