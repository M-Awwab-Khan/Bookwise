"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import { Book, BookRequests } from "@/types";

interface AccountRequest {
  fullName: string;
  email: string;
}

export const fetchRecentBooks = async (): Promise<Book[]> => {
  try {
    const recentBooks = await db
      .select()
      .from(books)
      .orderBy(desc(books.createdAt))
      .limit(4);

    return recentBooks;
  } catch (error) {
    console.error("Error fetching recent books:", error);
    return [];
  }
};

export const fetchBookRequests = async (): Promise<BookRequests[]> => {
  try {
    const bookRequests = await db
      .select({
        id: borrowRecords.id,
        bookId: books.id,
        userId: users.id,
        status: borrowRecords.status,
        createdAt: borrowRecords.createdAt,
        borrowedDate: borrowRecords.borrowDate,
        returnDate: borrowRecords.returnDate,
        dueDate: borrowRecords.dueDate,

        bookInfo: {
          id: books.id,
          title: books.title,
          coverUrl: books.coverUrl,
          coverColor: books.coverColor,
          genre: books.genre,
        },
        userInfo: {
          name: users.fullname,
          email: users.email,
        },
      })
      .from(borrowRecords)
      .orderBy(desc(borrowRecords.createdAt))
      .limit(3)
      .innerJoin(books, eq(borrowRecords.bookId, books.id))
      .innerJoin(users, eq(borrowRecords.userId, users.id));

    return bookRequests;
  } catch (error) {
    console.error("Error fetching book requests:", error);
    return [];
  }
};

export const fetchAccountRequests = async (): Promise<AccountRequest[]> => {
  try {
    const accountRequests = await db
      .select({
        fullName: users.fullname,
        email: users.email,
      })
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(6);

    return accountRequests;
  } catch (error) {
    console.error("Error fetching account requests:", error);
    return [];
  }
};

export const fetchDashboardData = async () => {
  try {
    const [recentBooks, bookRequests, accountRequests] = await Promise.all([
      fetchRecentBooks(),
      fetchBookRequests(),
      fetchAccountRequests(),
    ]);

    return {
      recentBooks,
      bookRequests,
      accountRequests,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      recentBooks: [],
      bookRequests: [],
      accountRequests: [],
    };
  }
};
