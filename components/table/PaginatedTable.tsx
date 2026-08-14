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
  title?: string; 
}

export default function PaginatedTable<T>({
  data,
  columns,
  rowKey,
  currentPage,
  totalPages,
  onPageChange,
  onRowClick,
  title,
}: PaginatedTableProps<T>) {
  return (
    <div className="bg-white px-4 py-6 rounded-2xl">
      {title && (
        <h2 className="font-bold text-black text-lg mb-4">{title}</h2>
      )}

      <div className="overflow-x-auto">
        <Table
          data={data}
          columns={columns}
          rowKey={rowKey}
          onRowClick={onRowClick}
        />
      </div>

      <PaginationButtons currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}