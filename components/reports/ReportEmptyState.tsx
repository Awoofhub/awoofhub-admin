import { Flag } from "lucide-react"

export default function ReportEmptyState() {
  return (
    <div className="flex flex-col items-center py-30 min-h-screen px-8 text-center w-full ">
      <Flag 
        className="w-[40px] h-[40px] xs:w-[44px] xs:h-[44px] mb-4 text-primary" 
      />
      <h2 className="text-base xs:text-xl font-bold text-gray-900 mb-2">
        No Report yet
      </h2>
      <p className="text-sm text-muted">
        Nothing here yet, come back.
      </p>
    </div>
  )
}
