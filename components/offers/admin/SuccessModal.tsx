import type { ActionType } from "./ConfirmationModal";

type SuccessModalProps = {
  isOpen: boolean;
  action: ActionType | null;
  onBack: () => void;
};

type SuccessIconProps = {
  color: string;
};

function SuccessIcon({ color }: SuccessIconProps) {
  return (
    <div className="relative w-[110px] h-[100px] flex items-center justify-center shrink-0">
      <img
        src={color === "#00a651" ? "/Successs.png" : "/reject.png"}
        alt={color === "#00a651" ? "Success" : "Reject"}
        className="w-24 h-24 object-contain"
      />
    </div>
  );
}

export default function SuccessModal({
  isOpen,
  action,
  onBack,
}: SuccessModalProps) {
  if (!isOpen || !action) return null;

  const isApprove = action === "approved";
  const isSuspend = action === "suspended";
  const color = isApprove ? "#00a651" : isSuspend ? "#f97316" : "#e30613";
  const hoverColor = isApprove ? "#009045" : isSuspend ? "#ea580c" : "#c20510";
  
  let message = "Ad rejected successfully.";
  if (isApprove) message = "Ad approved successfully and now live.";
  if (isSuspend) message = "Ad suspended successfully.";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onBack}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-[340px] p-8 flex flex-col items-center text-center"
        onClick={(event) => event.stopPropagation()}
      >
        <SuccessIcon color={color} />

        <h2 className="text-lg font-bold text-slate-900 mt-5 mb-2">Success!</h2>
        <p className="text-gray-400 text-sm mb-6">{message}</p>

        <button
          onClick={onBack}
          className="w-full text-white font-bold py-3 rounded-lg transition-colors"
          style={{ backgroundColor: color }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = hoverColor;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = color;
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
