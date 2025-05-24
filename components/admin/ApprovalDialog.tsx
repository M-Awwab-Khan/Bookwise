"use client";

import React from "react";
import {
  accountApproval,
  cancelAccountApproval,
} from "@/lib/admin/actions/user";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ApprovalDialog = ({
  id,
  variant,
  setStatus,
}: {
  id: string;
  variant: "SUCCESS" | "DANGER";
  setStatus: (status: "APPROVED" | "REJECTED") => void;
}) => {
  const handleApproval = async () => {
    if (variant === "DANGER") {
      await cancelAccountApproval(id);
      setStatus("REJECTED");
    } else {
      await accountApproval(id);
      setStatus("APPROVED");
    }
  };

  return (
    <DialogContent>
      <DialogHeader className="space-y-5">
        <div
          className={cn(
            "p-4 w-fit h-fit rounded-full mx-auto",

            variant === "SUCCESS" ? "bg-green-400/10" : " bg-red-400/10"
          )}
        >
          <div
            className={cn(
              "p-6 rounded-full flex justify-center items-center w-fit h-fit",

              variant === "SUCCESS"
                ? "bg-green-400 shadow-green-400"
                : " bg-red-400 shadow-red-400"
            )}
          >
            <Image
              src={
                variant === "SUCCESS"
                  ? "/icons/admin/success-tick.svg"
                  : "/icons/admin/caution.svg"
              }
              alt="status"
              width={30}
              height={30}
            />
          </div>
        </div>
        <div className="space-y-2.5">
          <DialogTitle className="text-center font-semibold text-xl text-dark-400">
            {variant === "SUCCESS"
              ? "Approve Book Request"
              : "Deny Account Request"}
          </DialogTitle>
          <DialogDescription className="text-center text-base text-gray-400">
            {variant === "SUCCESS"
              ? "Approve the student's account request and grant access.A confirmation email will be sent upon approval."
              : "Denying this request will notify the student they're not eligible due to unsuccessful ID card verification."}
          </DialogDescription>
        </div>
        <DialogClose asChild>
          <Button
            className={cn(
              "text-light-300 rounded-xl px-3.5 py-8 font-bold text-base",
              variant === "SUCCESS" ? "bg-green-400" : "bg-red-400"
            )}
            onClick={handleApproval}
          >
            {variant === "SUCCESS"
              ? "Approve & Send Confirmation"
              : "Deny & Notify Student"}
          </Button>
        </DialogClose>
      </DialogHeader>
    </DialogContent>
  );
};

export default ApprovalDialog;
