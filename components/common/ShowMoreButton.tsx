// components/ui/ShowMoreButton.tsx
interface ShowMoreButtonProps {
  onClick: () => void;
  visible?: boolean;
}

export default function ShowMoreButton({ onClick, visible = true }: ShowMoreButtonProps) {
  if (!visible) return null;

  return (
    <div className="flex justify-center mt-2">
    <button
      className="text-primary text-sm font-bold mt-2 hover:underline"
      onClick={onClick}
    >
      Show more
    </button>
    </div>
  );
}