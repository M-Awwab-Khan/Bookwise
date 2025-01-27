"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateBorrowStatus } from "@/lib/actions/admin";

const BorrowStatusSwitcher = ({ record }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "BORROWED":
        return { color: "#6941C6", backgroundColor: "#F9F5FF" };
      case "LATE RETURN":
        return { color: "#C01048", backgroundColor: "#FFF1F3" };
      case "RETURNED":
        return { color: "#026AA2", backgroundColor: "#F0F9FF" };
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span
          className={`w-28 justify-center rounded-full px-4 py-1 text-center font-semibold cursor-pointer`}
          style={getStatusColor(record.status)}
        >
          {record.status.charAt(0).toUpperCase() +
            record.status.slice(1).toLowerCase()}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => updateBorrowStatus(record.id, "BORROWED")}
        >
          Borrowed
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateBorrowStatus(record.id, "RETURNED")}
        >
          Returned
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateBorrowStatus(record.id, "LATE RETURN")}
        >
          Late Return
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BorrowStatusSwitcher;
