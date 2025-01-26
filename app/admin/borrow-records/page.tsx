import * as React from "react";
import Image from "next/image";
import { FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

// Sample data
const borrowRequests = [
  {
    id: 1,
    book: {
      title: "The Great Reclamation",
      cover: "/placeholder.svg?height=80&width=60",
    },
    user: {
      name: "Darrell Steward",
      email: "darrell@gmail.com",
      avatar: "/placeholder.svg",
    },
    status: "Borrowed",
    borrowedDate: "Dec 19 2023",
    returnDate: "Dec 29 2023",
    dueDate: "Dec 31 2023",
  },
  {
    id: 2,
    book: {
      title: "Inside Evil: Inside Evil Series",
      cover: "/placeholder.svg?height=80&width=60",
    },
    user: {
      name: "Marc Atanson",
      email: "marcatanson@gmail.com",
      avatar: "/placeholder.svg",
    },
    status: "Late Return",
    borrowedDate: "Dec 21 2024",
    returnDate: "Jan 17 2024",
    dueDate: "Jan 12 2024",
  },
  {
    id: 3,
    book: {
      title: "Jayne Castle - People in Glass Houses",
      cover: "/placeholder.svg?height=80&width=60",
    },
    user: {
      name: "Susan Drake",
      email: "contact@susandrake.co",
      avatar: "/placeholder.svg",
    },
    status: "Returned",
    borrowedDate: "Dec 21 2023",
    returnDate: "Jan 15 2023",
    dueDate: "Jan 25 2023",
  },
];

export default async function BorrowRecordsPage() {
  const borrowRecords = await fetchBorrowRecordsWithBooks();

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
                      // onClick={() => updateStatus(request.id, "Borrowed")}
                      >
                        Borrowed
                      </DropdownMenuItem>
                      <DropdownMenuItem
                      // onClick={() => updateStatus(request.id, "Returned")}
                      >
                        Returned
                      </DropdownMenuItem>
                      <DropdownMenuItem
                      // onClick={() => updateStatus(request.id, "Late Return")}
                      >
                        Late Return
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
