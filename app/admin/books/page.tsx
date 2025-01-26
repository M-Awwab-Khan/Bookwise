import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { fetchBooks } from "@/lib/actions/admin";
import BookCover from "@/components/BookCover";

const Page = async () => {
  const booksData = await fetchBooks();
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Create a New Book
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-light-300 h-[50px]">
              <TableHead>Book Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Date Issued</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {booksData.map((book) => (
              <TableRow key={book.id} className="h-[70px]">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <BookCover
                      coverColor={book.coverColor}
                      coverImage={book.coverUrl}
                      variant="small"
                    />
                    <div className="flex flex-col">
                      <span>{book.title}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{format(book.createdAt, "yyyy-MM-dd")}</TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Button variant={"ghost"} asChild>
                      <Link
                        href={`/admin/books/${book.id}`}
                        className="text-primary-admin"
                      >
                        <ExternalLink size={16} />
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link
                        href={`/admin/books/${book.id}/delete`}
                        className="text-red"
                      >
                        <Trash2 size={16} />
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default Page;
