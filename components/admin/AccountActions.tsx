"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ApproveDialog } from "./ApproveAccountDialog";
import { DenyDialog } from "./RejectAccountDialog";
import { updateAccountRequestStatus } from "@/lib/actions/admin";

const AccountActions = ({ user }) => {
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [denyDialogOpen, setDenyDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleApprove = (userId: string) => {
    setSelectedUserId(userId);
    setApproveDialogOpen(true);
  };

  const handleDeny = (userId: string) => {
    setSelectedUserId(userId);
    setDenyDialogOpen(true);
  };

  const handleApproveConfirm = async () => {
    if (selectedUserId) {
      // Handle the approval logic here
      console.log("Approving user:", selectedUserId);
      await updateAccountRequestStatus(selectedUserId, "APPROVED");
      setApproveDialogOpen(false);
    }
  };

  const handleDenyConfirm = async () => {
    if (selectedUserId) {
      // Handle the denial logic here
      console.log("Denying user:", selectedUserId);
      await updateAccountRequestStatus(selectedUserId, "REJECTED");
      setDenyDialogOpen(false);
    }
  };
  return (
    <div className="flex items-center gap-3">
      <Button
        size="sm"
        variant="secondary"
        className="bg-[#ECFDF3] text-[#027A48] text-md font-semibold"
        onClick={() => {
          handleApprove(user.id);
        }}
      >
        Approve Account
      </Button>
      <Button size="sm" variant={"ghost"} onClick={() => handleDeny(user.id)}>
        <Image
          src="/icons/admin/trash.svg"
          alt="reject"
          width={20}
          height={20}
        />
      </Button>
      <ApproveDialog
        open={approveDialogOpen}
        onOpenChange={setApproveDialogOpen}
        onConfirm={handleApproveConfirm}
      />
      <DenyDialog
        open={denyDialogOpen}
        onOpenChange={setDenyDialogOpen}
        onConfirm={handleDenyConfirm}
      />
    </div>
  );
};

export default AccountActions;
