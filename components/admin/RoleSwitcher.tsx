import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  user: { id: number; role: string };
  updateUserRole: (userId: number, newRole: string) => void;
};
const RoleSwitcher = ({ user, updateUserRole }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`w-20 justify-center ${
            user.role === "Admin" ? "text-green-600" : "text-rose-600"
          }`}
        >
          {user.role}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => updateUserRole(user.id, "User")}>
          User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateUserRole(user.id, "Admin")}>
          Admin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSwitcher;
