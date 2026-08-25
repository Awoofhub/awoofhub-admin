'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useHelpAndSupport } from "@/features/help-and-support/useHelpAndSupport";
import { useState } from "react";
import PaginatedTable from "../table/PaginatedTable";
import { HelpAndSupportColumns } from "./HelpAndSupportColumns";
import HelpAndSupportModal from "../modals/help-and-support/HelpAndSupportModal";
import HelpAndSupportService from '@/services/help-and-support-service';
import { HelpAndSupport } from '@/types/help-and-support';

interface Props {
    search?: string,
}

export default function HelpAndSupportTable({ search }: Props) {
    const [page, setPage] = useState(1);
    const [selectedTicket, setSelectedTicket] = useState<HelpAndSupport | null>(null);
    const limit = 4;

    const { data, isFetched, isFetching } = useHelpAndSupport({
        search: search ?? "",
        category: "",
        status: "",
        submittedAt: "",
        page,
        limit,
    });

    const queryClient = useQueryClient();

    const { mutate: submit, isPending } = useMutation({
        mutationFn: (payload: { id: string; status: HelpAndSupport['status'] }) =>
            HelpAndSupportService.updateStatus(payload.id, payload.status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['helpAndSupport'] });
        },
    });

    const handleRowClick = (ticket: HelpAndSupport) => {
        setSelectedTicket(ticket);
        if (ticket.status === 'open') {
            submit({ id: ticket.id, status: 'inProgress' });
        }
    };

    return (
        <div>
            <PaginatedTable
                response={data}
                columns={HelpAndSupportColumns}
                limit={limit}
                rowKey={(data) => data.id}
                currentPage={page}
                onPageChange={setPage}
                onRowClick={handleRowClick}
                isFetching={isFetching}
                isFetched={isFetched}
            />

            <HelpAndSupportModal
                ticket={selectedTicket}
                isOpen={selectedTicket !== null}
                isPending={isPending}
                onResolve={() => selectedTicket && submit({ id: selectedTicket.id, status: 'resolved' })}
                onCloseTicket={() => selectedTicket && submit({ id: selectedTicket.id, status: 'closed' })}
                onClose={() => setSelectedTicket(null)}
            />
        </div>
    );
}