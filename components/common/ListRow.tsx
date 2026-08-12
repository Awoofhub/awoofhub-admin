// components/ui/ListRow.tsx — updated
interface ListRowProps {
  leading: React.ReactNode;
  title: string;
  subtitle: string;
  trailing?: React.ReactNode;
}

export default function ListRow({ leading, title, subtitle, trailing }: ListRowProps) {
  return (
    <div className="flex items-center gap-3 py-3 min-w-0">
      <div className="shrink-0">{leading}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-500 truncate">{subtitle}</p>
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}