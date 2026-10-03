import { UsersPaginationProvider } from "@/providers/users-pagination-provider";
import { ReactNode } from "react";

export default function UsersLayout({children}: {children: ReactNode}){
 return (
    <UsersPaginationProvider>
        {children}
    </UsersPaginationProvider>
 )
} 