"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, interactions } from "@/database/schema";
import { and, eq, ilike, or, sql } from "drizzle-orm";
import dayjs from "dayjs";
import { renderToBuffer } from "@react-pdf/renderer";
import { ReceiptTemplate } from "@/components/ReceiptTemplate";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // needs insert permissions
);

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

const ITEMS_PER_PAGE = 12;
export const searchBooks = async (query: string, currentPage: number) => {
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
      )
      .limit(ITEMS_PER_PAGE)
      .offset((currentPage - 1) * ITEMS_PER_PAGE);

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

export const fetchBooksPages = async (query: string) => {
  try {
    const count = await db
      .select({ count: sql<number>`count(*)` })
      .from(books)
      .where(
        or(
          ilike(books.title, `%${query}%`),
          ilike(books.author, `%${query}%`),
          ilike(books.genre, `%${query}%`)
        )
      );

    return Math.ceil(Number(count[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const updateRating = async (
  value: number,
  userId: string,
  bookId: string
) => {
  try {
    // Update the rating in the database
    // First check if the user has already rated this book
    const existingRating = await db
      .select()
      .from(interactions)
      .where(
        and(
          eq(interactions.userId, userId),
          eq(interactions.bookId, bookId),
          eq(interactions.type, "RATE")
        )
      )
      .limit(1);

    if (existingRating.length > 0) {
      // If rating exists, update it
      await db
        .update(interactions)
        .set({ rating: value })
        .where(
          and(
            eq(interactions.userId, userId),
            eq(interactions.bookId, bookId),
            eq(interactions.type, "RATE")
          )
        );
    } else {
      // If no rating exists, insert a new one
      await db.insert(interactions).values({
        userId,
        bookId,
        type: "RATE",
        rating: value,
      });
    }
    revalidatePath(`/books/${bookId}`);
  } catch (error) {
    console.log("Error updating rating:", error);
  }
  return {
    success: true,
    message: "Rating updated successfully",
  };
};

export const getSimilarBooks = async (bookId: string, limitCount: number) => {
  const { data, error } = await supabase.rpc("get_similar_books", {
    p_book_id: bookId,
    limit_count: Number(limitCount),
  });

  if (error) {
    console.error("Error fetching similar books:", error);
    return [];
  }
  return data;
};
