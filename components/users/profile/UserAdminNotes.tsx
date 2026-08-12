// components/users/UserAdminNotes.tsx
"use client";

import { useState } from "react";
import HeaderIconTitleCount from "../../common/HeaderIconTitleCount";
import TextareaField from "@/components/common/TextAreaField";

interface UserAdminNotesProps {
  initialNote?: string;
  onSave: (note: string) => void;
  isSaving?: boolean;
}

export default function UserAdminNotes({
  initialNote = "",
  onSave,
  isSaving = false,
}: UserAdminNotesProps) {
  const [note, setNote] = useState(initialNote);

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5">
      <HeaderIconTitleCount label="Internal Admin Notes" />

      <TextareaField
        value={note}
        onChange={setNote}
        placeholder="Add an internal note about this user..."
        height="h-24"
      />

      <button
        onClick={() => onSave(note)}
        disabled={isSaving || !note.trim()}
        className="mt-3 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-primary/90"
      >
        {isSaving ? "Saving..." : "Save Note"}
      </button>
    </div>
  );
}
