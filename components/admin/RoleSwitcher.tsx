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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`w-20 justify-center ${
            user.role === "ADMIN" ? "text-green-600" : "text-rose-600"
          }`}
        >
          {user.role}
        </Button>
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
