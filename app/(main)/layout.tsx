import Sidebar from "@/components/header/desktop/Sidebar";
import Header from "@/components/header/Header";
import Protected from "@/components/protected/Protected";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <Protected>
            <Sidebar />
            <div className="md:ml-[280px]">
                <Header />
                {children}
            </div>
        </Protected>
    )
} 