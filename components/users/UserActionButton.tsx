import { useState } from "react";
import { User } from "@/types/user";

import SuspendUserModal from "@/components/modals/user/SuspendUserModal";
import BanUserModal from "@/components/modals/user/BanUserModal";
import ReactivateUserModal from "@/components/modals/user/ReactivateUserModal";

interface Props {
  user: User;
}

export default function UserActionButton({ user }: Props) {
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [banOpen, setBanOpen] = useState(false);
  const [reactivateOpen, setReactivateOpen] = useState(false);

  return (
    <>
    <div className="flex flex-col xs:flex-row gap-3 ">
      {user.status === "banned" ? (
        <>
        <button
            onClick={() => setReactivateOpen(true)}
            className="flex-1 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Reactivate Account
          </button>
          
          <button
            disabled
            className="flex-1 py-2.5 bg-gray-100 text-gray-400 text-sm font-semibold rounded-lg cursor-not-allowed"
          >
            suspend Account
          </button>

          
        </>
      ) : user.status === "suspended" ? (
        <>
          <button
            onClick={() => setBanOpen(true)}
            className="flex-1 py-2.5 border border-red-600 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors"
          >
            Ban Account
          </button>

          <button
            onClick={() => setReactivateOpen(true)}
            className="flex-1 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Reactivate Account
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setBanOpen(true)}
            className="flex-1 py-2.5 border border-red-600 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors"
          >
            Ban Account
          </button>

          <div className="flex-1">
            <button
              onClick={() => setSuspendOpen(true)}
              className="w-full bg-[#ff5722] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[#e64a19] transition-colors"
            >
              Suspend Account
            </button>
          </div>
        </>
      )}
    </div>
    <BanUserModal
        userId={user.id}
        isOpen={banOpen}
        onClose={() => setBanOpen(false)}
      />

      <SuspendUserModal
        userId={user.id}
        isOpen={suspendOpen}
        onClose={() => setSuspendOpen(false)}
      />

      <ReactivateUserModal
        userId={user.id}
        isOpen={reactivateOpen}
        onClose={() => setReactivateOpen(false)}
      />
    </>
  );
}
