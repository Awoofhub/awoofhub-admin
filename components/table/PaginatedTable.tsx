import PaginationButtons from "../button/PaginationButtons";
import Table, { Column } from "./Table";

interface PaginatedTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: (item: T) => string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRowClick?: (item: T) => void;
}


export default function PaginatedTable<T>({
  data,
  columns,
  rowKey,
  currentPage,
  totalPages,
  onPageChange,
  onRowClick,
}: PaginatedTableProps<T>) {
  return (
    <>
      <div className="overflow-x-auto min-h-[455px] rounded-lg">
        <Table
          data={data}
          columns={columns}
          rowKey={rowKey}
          onRowClick={onRowClick}
        />
      </div>

      <PaginationButtons currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
}