"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateUserRole } from "@/lib/actions/admin";

type Props = {
  user: { id: number; role: string };
};
const RoleSwitcher = ({ user }: Props) => {
  const getRoleStyles = (role: string) => {
    if (role === "ADMIN") {
      return { backgroundColor: "#ECFDF3", color: "#027A48" };
    } else {
      return { backgroundColor: "#FDF2FA", color: "#C11574" };
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span
          className={`w-20 justify-center px-2 py-1 rounded-full text-center text-xs font-semibold cursor-pointer`}
          style={getRoleStyles(user.role)}
        >
          {user.role}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => updateUserRole(user.id, "USER")}>
          User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateUserRole(user.id, "ADMIN")}>
          Admin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSwitcher;
