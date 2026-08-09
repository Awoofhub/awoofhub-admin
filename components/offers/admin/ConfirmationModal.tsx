export type ActionType = "approved" | "rejected" | "suspended";

type ModalIconProps = {
  color: string;
};

function ModalIcon({ color }: ModalIconProps) {
  return (
    <div className="relative w-[110px] h-[100px] flex items-center justify-center shrink-0">
      <img
        src={color === "#00a651" ? "/Successs.png" : "/reject.png"}
        alt={color === "#00a651" ? "Success" : "Warning"}
        className="w-24 h-24 object-contain"
      />
    </div>
  );
}

type ConfirmationModalProps = {
  isOpen: boolean;
  action: ActionType | null;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationModal({
  isOpen,
  action,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!isOpen || !action) return null;

  const isApprove = action === "approved";
  const isSuspend = action === "suspended";
  const color = isApprove ? "#00a651" : isSuspend ? "#f97316" : "#e30613";
  const hoverColor = isApprove ? "#009045" : isSuspend ? "#ea580c" : "#c20510";
  const label = isApprove ? "approve" : isSuspend ? "suspend" : "reject";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-[500px] p-8 flex flex-col items-center text-center"
        onClick={(event) => event.stopPropagation()}
      >
        <ModalIcon color={color} />

        <h2 className="text-lg font-bold text-slate-900 mt-5 mb-6 leading-snug">
          Confirm that you are about to {label} this offer
        </h2>

        <button
          onClick={onConfirm}
          className="w-full text-white font-bold py-3 rounded-lg transition-colors mb-3"
          style={{ backgroundColor: color }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = hoverColor;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = color;
          }}
        >
          {isApprove ? "Approve Now" : "Reject Now"}
        </button>

        <button
          onClick={onCancel}
          className="w-full text-gray-700 font-medium py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
