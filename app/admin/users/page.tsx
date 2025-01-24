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
import { fetchUsers } from "@/lib/actions/admin";
import { format } from "date-fns";

export default async function UsersTable() {
  const usersData = await fetchUsers();
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
            {usersData.map((user) => (
              <TableRow key={user.id} className="h-[70px]">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                      <AvatarFallback>
                        {user.fullname
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{user.fullname}</span>
                      <span className="text-sm text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{format(user.dateJoined, "yyyy-MM-dd")}</TableCell>
                <TableCell>
                  <RoleSwitcher user={user} />
                </TableCell>
                <TableCell>{user.booksBorrowed}</TableCell>
                <TableCell>{user.university_id}</TableCell>
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
