'use client';

import { useHelpAndSupport } from "@/features/help-and-support/useHelpAndSupport";
import { useUpdateHelpAndSupportStatus } from "@/features/help-and-support/useUpdateHelpAndSupportStatus";
import { HelpAndSupport } from '@/types/help-and-support';
import { useState } from "react";
import HelpAndSupportModal from "../modals/help-and-support/HelpAndSupportModal";
import PaginatedTable from "../table/PaginatedTable";
import { HelpAndSupportColumns } from "./HelpAndSupportColumns";
import HelpAndSupportEmptyState from "./HelpAndSupportEmptyState";

interface Props {
    search?: string,
}

export default function HelpAndSupportTable({ search }: Props) {
    const [page, setPage] = useState(1);
    const [isOpen, setOpen] = useState(false);
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

    const { updateHelpAndSupport } = useUpdateHelpAndSupportStatus({
        id:  selectedTicket?.id ?? '',
    })


    const handleRowClick = (ticket: HelpAndSupport) => {
        setSelectedTicket(ticket);
        setOpen(true);

        if (ticket.status === 'open') {
            updateHelpAndSupport({ status: 'inProgress' });
        }
    };

    return (
        <div>
            {isFetched && isFetching && !data ? (<HelpAndSupportEmptyState />) :
            <PaginatedTable
                response={data}
                columns={HelpAndSupportColumns}
                limit={limit}
                rowKey={(data) => data.id}
                currentPage={page}
                onPageChange={setPage}
                onRowClick={(handleRowClick)}
                isFetching={isFetching}
                isFetched={isFetched}
            /> }

            {selectedTicket && (
                <HelpAndSupportModal
                    data={selectedTicket}
                    isOpen={isOpen}
                    onClose={() => setOpen(false)}
                />
            )}
        </div>
    );
}