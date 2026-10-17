'use client';

import Loading from '@/components/loading/Loading';
import ReportsPage from '@/components/reports/ReportsPage';
import { Suspense } from 'react';

type FilterParams = {
    tab?: string;
};

interface FilterProps {
    searchParams: Promise<FilterParams>;
}

export default function Page({ searchParams }: FilterProps) {
    return (
        <Suspense fallback={<Loading />}>
            <ReportsPage searchParams={searchParams} />
        </Suspense>
    )
}
