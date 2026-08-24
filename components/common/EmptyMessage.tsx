// components/ui/EmptyState.tsx
interface EmptyStateProps {
  message: string;
}

export default function EmptyMessage({ message }: EmptyStateProps) {
  return <p className="text-sm text-gray-400 py-6 text-center">{message}</p>;
}