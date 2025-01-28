"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { and, eq, ilike, or } from "drizzle-orm";
import dayjs from "dayjs";
import { renderToBuffer } from "@react-pdf/renderer";
import { ReceiptTemplate } from "@/components/ReceiptTemplate";

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
      .where(
        and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.status, "BORROWED")
        )
      );

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

export const hasUserBorrowedBook = async (userId: string, bookId: string) => {
  try {
    const borrowedBook = await db
      .select()
      .from(borrowRecords)
      .where(
        and(eq(borrowRecords.userId, userId), eq(borrowRecords.bookId, bookId))
      )
      .limit(1);

    if (borrowedBook.length > 0) {
      return { record: borrowedBook[0], hasBorrowed: true };
    } else {
      return { record: null, hasBorrowed: false };
    }
  } catch (error) {
    console.log(error);
    return { record: null, hasBorrowed: false };
  }
};

export async function generateReceipt(borrowRecord: any) {
  try {
    // In a real app, you would fetch this data from your database
    const bookDetails = (
      await db
        .select()
        .from(books)
        .where(eq(books.id, borrowRecord.bookId))
        .limit(1)
    )[0];
    const borrowData = {
      receiptId: borrowRecord.id,
      bookTitle: bookDetails.title,
      author: bookDetails.author,
      genre: bookDetails.genre,
      borrowDate: new Date(borrowRecord.borrowDate),
      dueDate: new Date(borrowRecord.dueDate),
      duration: 7,
    };

    const buffer = await renderToBuffer(ReceiptTemplate(borrowData));

    return buffer;
  } catch (error) {
    console.error("Failed to generate receipt:", error);
    throw new Error("Failed to generate receipt");
  }
}

export const searchBooks = async (query: string) => {
  try {
    const booksData = await db
      .select()
      .from(books)
      .where(
        or(
          ilike(books.title, `%${query}%`),
          ilike(books.author, `%${query}%`),
          ilike(books.genre, `%${query}%`)
        )
      );

    return {
      success: true,
      data: JSON.parse(JSON.stringify(booksData)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while searching for books",
    };
  }
};
