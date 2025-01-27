import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AccountActions from "@/components/admin/AccountActions";
import { fetchAccountRequests } from "@/lib/actions/admin";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function AccountRequestsPage() {
  const requests = await fetchAccountRequests();
  return (
    <div className="space-y-4 p-8 bg-white rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Account Requests</h2>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Oldest to Recent
        </Button>
      </div>
      <div className="rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-light-300 h-[50px]">
              <TableHead>Name</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead>University ID</TableHead>
              <TableHead>University ID Card</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((user) => (
              <TableRow key={user.id} className="h-[70px]">
                <TableCell>
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
                <TableCell>
                  <span className="font-medium">
                    {format(user.dateJoined!, "dd/MM/yyyy")}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{user.universityId}</span>
                </TableCell>
                <TableCell>
                  <Link
                    href={`https://ik.imagekit.io/awwabbookwise${user.universityCard}`}
                    target="_blank"
                  >
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View ID Card
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <AccountActions user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
