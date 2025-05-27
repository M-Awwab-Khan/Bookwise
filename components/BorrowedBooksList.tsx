import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import React from "react";
import BorrowedBooksClient from "./BorrowedBooksClient";

const BorrowedBooksList = async () => {
  const session = await auth();

  if (!session || !session.user?.id) return;

  const borrowedBooks = await db
    .select()
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, session.user.id));

  if (borrowedBooks.length < 1) return;

  return <BorrowedBooksClient borrowedBooks={borrowedBooks} />;
};

export default BorrowedBooksList;
