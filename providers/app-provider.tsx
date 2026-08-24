'use client';
import { Toast } from '@/components/toast/Toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import ReactQueryProvider from './react-query-provider';

export default function AppProvider({ children }: { children: ReactNode }) {
    return (
        <>
            <Toast />
            <ReactQueryProvider>
                <ReactQueryDevtools initialIsOpen={false} />
                    {children}
            </ReactQueryProvider>
        </>
    );
} 