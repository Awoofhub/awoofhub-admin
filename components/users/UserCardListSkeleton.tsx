import PanelCard from "../common/PanelCard";

export default function UserCardListSkeleton() {
    return (
        <PanelCard>
        <div className="h-4 w-32 bg-gray-100 rounded animate-pulse mb-4" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-3">
            <div className="w-12 h-12 rounded-lg bg-gray-100 animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse" />
              <div className="h-2.5 w-1/2 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </PanelCard>
    );}