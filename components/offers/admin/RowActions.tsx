import { cn } from "@/lib/utils";
import { Eye, Trash2, Check, Clock, X, Ban } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

interface Props {
  offerId: string;
  currentStatus: string;
  onModerateClick: (id: string, action: 'approved' | 'rejected' | 'pending' | 'suspended' | 'delete') => void;
}

export default function RowActions({ offerId, currentStatus, onModerateClick }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "cursor-pointer p-2 rounded-xl transition-colors",
          open ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
        )}
      >
        <BsThreeDots size={20} />
      </button>

      {open && (
        <div className="absolute right-10 top-0 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden flex flex-col">

          <Link
            href={`/offers/${offerId}`}
            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 font-semibold text-gray-700 transition-colors"
          >
            <Eye size={18} />
            View Details
          </Link>

          <div className="h-px bg-gray-100 w-full" />

          {/* Moderation Tools inside the Dropdown */}
          {currentStatus !== 'approved' && currentStatus !== 'active' && (
            <button
              onClick={() => {
                onModerateClick(offerId, 'approved');
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 hover:bg-green-50 font-semibold text-green-700 transition-colors"
            >
              <Check size={18} />
              Approve
            </button>
          )}

          {currentStatus !== 'pending' && (
            <button
              onClick={() => {
                onModerateClick(offerId, 'pending');
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 hover:bg-orange-50 font-semibold text-orange-600 transition-colors"
            >
              <Clock size={18} />
              Mark Pending
            </button>
          )}

          {currentStatus !== 'rejected' && currentStatus !== 'block' && (
            <button
              onClick={() => {
                onModerateClick(offerId, 'rejected');
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 font-semibold text-red-600 transition-colors"
            >
              <X size={18} />
              Reject
            </button>
          )}

          {currentStatus !== 'suspended' && (
            <button
              onClick={() => {
                onModerateClick(offerId, 'suspended');
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 hover:bg-amber-50 font-semibold text-amber-600 transition-colors"
            >
              <Ban size={18} />
              Suspend
            </button>
          )}

          <div className="h-px bg-gray-100 w-full" />

          <button
            onClick={() => {
              setOpen(false);
              onModerateClick(offerId, 'delete');
            }}
            className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 font-semibold text-red-600 transition-colors"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}