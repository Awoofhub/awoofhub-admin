"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface UsersPaginationContextType {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const UsersPaginationContext = createContext<UsersPaginationContextType>({ page: 1, setPage: () => { }});

export function UsersPaginationProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(1);
  return (
    <UsersPaginationContext.Provider value={{page, setPage}}>
      {children}
    </UsersPaginationContext.Provider>
  );
}
