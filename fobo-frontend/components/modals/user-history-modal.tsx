"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { UserHistory } from "@/app/admin/users/user-history";

export function UserHistoryModal({ open, setOpen, user }: any) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg rounded-xl p-0 overflow-hidden">

        {/* Header */}
        <DialogHeader className="p-4 border-b bg-gray-50">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Ride History – {user.name}
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <UserHistory userId={user.id} user={user} />

        </div>

      </DialogContent>
    </Dialog>
  );
}
