"use client";

import * as React from "react";
import { Trash2, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RoleSwitcher from "@/components/admin/RoleSwitcher";

// This would typically come from your database
const users = [
  {
    id: 1,
    name: "Darrell Steward",
    email: "darrellsteward@gmail.com",
    dateJoined: "Dec 19 2023",
    role: "User",
    booksBorrowed: 10,
    universityId: "90224423789",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Marc Atanson",
    email: "marcatanson@gmail.com",
    dateJoined: "Dec 19 2023",
    role: "Admin",
    booksBorrowed: 32,
    universityId: "90224423789",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Susan Drake",
    email: "contact@susandrake.co",
    dateJoined: "Dec 19 2023",
    role: "User",
    booksBorrowed: 13,
    universityId: "90224423789",
    avatar: "/placeholder.svg",
  },
];

export default function UsersTable() {
  const [tableUsers, setTableUsers] = React.useState(users);

  const updateUserRole = (userId: number, newRole: string) => {
    setTableUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <div className="space-y-4 bg-background rounded-lg p-6">
      <h2 className="text-xl font-semibold">All Users</h2>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-light-300 h-[50px]">
              <TableHead>Name</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Books Borrowed</TableHead>
              <TableHead>University ID No</TableHead>
              <TableHead>University ID Card</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableUsers.map((user) => (
              <TableRow key={user.id} className="h-[70px]">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.dateJoined}</TableCell>
                <TableCell>
                  <RoleSwitcher user={user} updateUserRole={updateUserRole} />
                </TableCell>
                <TableCell>{user.booksBorrowed}</TableCell>
                <TableCell>{user.universityId}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    View ID Card
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-rose-600 hover:text-rose-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
