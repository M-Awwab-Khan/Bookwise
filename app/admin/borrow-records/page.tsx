import TableWrapper from "@/components/admin/TableWrapper";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import React from "react";
import { eq } from "drizzle-orm";
import { BookRequests } from "@/types";

const AllBookRequests = async () => {
  let bookRequests = null;

  try {
    bookRequests = (await db
      .select({
        id: borrowRecords.id, // Use borrowRecords ID
        bookInfo: {
          coverUrl: books.coverUrl,
          coverColor: books.coverColor,
          title: books.title,
          id: books.id,
        },
        userInfo: {
          name: users.fullname,
          email: users.email,
        },
        status: borrowRecords.status,
        borrowedDate: borrowRecords.borrowDate,
        returnDate: borrowRecords.returnDate,
        dueDate: borrowRecords.dueDate,
      })
      .from(borrowRecords)
      .innerJoin(users, eq(borrowRecords.userId, users.id)) // Join users table
      .innerJoin(books, eq(borrowRecords.bookId, books.id))) as BookRequests[]; // Join books table
  } catch (error) {
    console.log("Error fetching book requests:", error);
    return null;
  }

  return (
    <div>
      <TableWrapper data={bookRequests} type="BookRequests" />
    </div>
  );
};

export default AllBookRequests;
