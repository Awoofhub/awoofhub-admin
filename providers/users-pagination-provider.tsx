"use client";
import { createContext, useState, ReactNode } from "react";

export const UsersPaginationContext = createContext();

export function UsersPaginationProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(1);
  return (
    <UsersPaginationContext.Provider value={{page, setPage}}>
      {children}
    </UsersPaginationContext.Provider>
  );
}
