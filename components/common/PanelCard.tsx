interface PanelCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function PanelCard({ children, className = "" }: PanelCardProps) {
  return (
    <div className={`bg-white rounded-xl p-4 sm:p-5 ${className}`}>
      {children}
    </div>
  );
}