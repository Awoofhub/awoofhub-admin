import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function PaginationButtons({ totalPages, currentPage, onPageChange }: PaginationProps) {

  const btnClass = "p-2 cursor-pointer rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors";

  return (
    <div className="flex justify-between px-2 pt-2  items-center gap-6 text-sm text-gray-700 font-medium select-none">

      <div className="flex gap-2 items-center">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={btnClass}
          title="First page"
        >
          <ChevronsLeft size={18} />
        </button>
        <span className="text-base font-baloo font-medium text-gray-500 mr-auto">Showing {currentPage} of {totalPages}</span>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={btnClass}
          title="Last page"
        >
          <ChevronsRight size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1">

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={btnClass}
          title="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={btnClass}
          title="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};