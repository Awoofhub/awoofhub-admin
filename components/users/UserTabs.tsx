import React from "react";

interface Props {
  activeTab: "activity" | "history";

  onChange: (tab: "activity" | "history") => void;
}

export default function UserTabs({ activeTab, onChange }: Props) {
  return (
    <div className="flex gap-2 bg-gray-100/50 p-2 rounded-xl mb-6">
      <button
        type="button"
        onClick={() => onChange("activity")}
        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === "activity" ? "bg-white text-black text-sm xs:text-base lg:text-lg font-semibold" : "text-muted text-xs xs:text-sm lg:text-base font-medium"}`}
      >
        Activity
      </button>
      <button
        type="button"
        onClick={() => onChange("history")}
        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors  ${activeTab === "history" ? "bg-white text-black text-sm xs:text-base lg:text-lg font-semibold" : "text-muted text-xs xs:text-sm lg:text-base font-medium"}`}
      >
        Admin History
      </button>
    </div>
  );
}
