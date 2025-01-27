import * as React from "react";
import { FileText } from "lucide-react";
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
import { fetchBorrowRecordsWithBooks } from "@/lib/actions/admin";
import { format } from "date-fns";
import BookCover from "@/components/BookCover";
import BorrowStatusSwitcher from "@/components/admin/BorrowStatusSwitcher";

export default async function BorrowRecordsPage() {
  const borrowRecords = await fetchBorrowRecordsWithBooks();

  return (
    <div className="space-y-4 p-8 bg-white rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Borrow Book Requests</h2>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Oldest to Recent
        </Button>
      </div>
      <div className="rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-light-300 h-[50px]">
              <TableHead>Book</TableHead>
              <TableHead>User Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Borrowed date</TableHead>
              <TableHead>Return date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {borrowRecords.map((record) => (
              <TableRow key={record.id} className="h-[70px]">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <BookCover
                      coverColor={record.color}
                      coverImage={record.coverUrl}
                      variant="extraSmall"
                    />
                    <span className="font-medium">{record.bookTitle}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      {/* <AvatarImage src={record.} /> */}
                      <AvatarFallback>
                        {record.userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{record.userName}</span>
                      <span className="text-sm text-muted-foreground">
                        {record.userEmail}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <BorrowStatusSwitcher record={record} />
                </TableCell>
                <TableCell>{format(record.borrowedAt, "MM-dd-yyyy")}</TableCell>
                <TableCell>
                  {record.returnedAt
                    ? format(record.returnedAt, "MM-dd-yyyy")
                    : "-"}
                </TableCell>
                <TableCell>{format(record.dueDate, "MM-dd-yyyy")}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                  >
                    <FileText className="h-4 w-4" />
                    Generate
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
