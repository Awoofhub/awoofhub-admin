"use client";

import { useUser } from "@/features/user/useUser";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import HomeLoadingSkeleton from "../loading/HomeLoadingSkeleton";

type ProtectedProps = {
    children: ReactNode;
};

export default function Protected({ children }: ProtectedProps) {
    const router = useRouter();
    const pathname = usePathname();
    const user = useUser();

    const REQUIRED_ROLE = "admin";

    useEffect(() => {
        if (!user.isLoading && user.data?.role !== REQUIRED_ROLE) {
            router.replace(`/login?redirect=${pathname}`);
        }
    }, [user.data, user.isLoading, pathname, router]);

    if (user.isLoading) {
        return <HomeLoadingSkeleton />;
    }

    if (user.data?.role !== REQUIRED_ROLE) {
        return null;
    }

    return <>{children}</>;
}
