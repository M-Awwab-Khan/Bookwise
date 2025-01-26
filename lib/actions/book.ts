"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};

export const fetchBorrowedBooks = async (userId: string) => {
  try {
    const bookDetails = await db
      .select({
        id: borrowRecords.id,
        bookId: books.id,
        title: books.title,
        author: books.author,
        cover: books.coverUrl,
        color: books.coverColor,
        genre: books.genre,
        dueDate: borrowRecords.dueDate,
        status: borrowRecords.status,
        returnDate: borrowRecords.returnDate,
        borrowDate: borrowRecords.borrowDate,
      })
      .from(borrowRecords)
      .innerJoin(books, eq(borrowRecords.bookId, books.id))
      .where(eq(borrowRecords.userId, userId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(bookDetails)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while fetching borrowed books",
    };
  }
};
