"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { and, gte, lt, sql } from "drizzle-orm";

interface TotalReport {
  title: string;
  total: number;
  status: string;
  value: number;
}

export const fetchAdminStatistics = async (): Promise<TotalReport[]> => {
  try {
    const startOfThisWeek = new Date();
    startOfThisWeek.setDate(
      startOfThisWeek.getDate() - startOfThisWeek.getDay()
    );
    startOfThisWeek.setHours(0, 0, 0, 0);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

    // Fetch books data
    const [booksTotal, booksThisWeek, booksLastWeek] = await Promise.all([
      db.select({ total: sql<number>`COUNT(${books.id})` }).from(books),
      db
        .select({ total: sql<number>`COUNT(${books.id})` })
        .from(books)
        .where(gte(books.createdAt, startOfThisWeek.toISOString())),
      db
        .select({ total: sql<number>`COUNT(${books.id})` })
        .from(books)
        .where(
          and(
            gte(books.createdAt, startOfLastWeek.toISOString()),
            lt(books.createdAt, startOfThisWeek.toISOString())
          )
        ),
    ]);

    // Fetch users data
    const [usersTotal, usersThisWeek, usersLastWeek] = await Promise.all([
      db.select({ total: sql<number>`COUNT(${users.id})` }).from(users),
      db
        .select({ total: sql<number>`COUNT(${users.id})` })
        .from(users)
        .where(gte(users.createdAt, startOfThisWeek.toISOString())),
      db
        .select({ total: sql<number>`COUNT(${users.id})` })
        .from(users)
        .where(
          and(
            gte(users.createdAt, startOfLastWeek.toISOString()),
            lt(users.createdAt, startOfThisWeek.toISOString())
          )
        ),
    ]);

    // Fetch borrowed records data
    const [
      borrowedRecordsTotal,
      borrowedRecordsThisWeek,
      borrowedRecordsLastWeek,
    ] = await Promise.all([
      db
        .select({ total: sql<number>`COUNT(${borrowRecords.id})` })
        .from(borrowRecords),
      db
        .select({ total: sql<number>`COUNT(${borrowRecords.id})` })
        .from(borrowRecords)
        .where(gte(borrowRecords.createdAt, startOfThisWeek.toISOString())),
      db
        .select({ total: sql<number>`COUNT(${borrowRecords.id})` })
        .from(borrowRecords)
        .where(
          and(
            gte(borrowRecords.createdAt, startOfLastWeek.toISOString()),
            lt(borrowRecords.createdAt, startOfThisWeek.toISOString())
          )
        ),
    ]);

    // Format the totalReport
    const totalReport: TotalReport[] = [
      {
        title: "Books",
        total: booksTotal[0]?.total ?? 0,
        status:
          (booksThisWeek[0]?.total ?? 0) > (booksLastWeek[0]?.total ?? 0)
            ? "up"
            : "down",
        value: booksThisWeek[0]?.total ?? 0,
      },
      {
        title: "Users",
        total: usersTotal[0]?.total ?? 0,
        status:
          (usersThisWeek[0]?.total ?? 0) > (usersLastWeek[0]?.total ?? 0)
            ? "up"
            : "down",
        value: usersThisWeek[0]?.total ?? 0,
      },
      {
        title: "Borrow Records",
        total: borrowedRecordsTotal[0]?.total ?? 0,
        status:
          (borrowedRecordsThisWeek[0]?.total ?? 0) >
          (borrowedRecordsLastWeek[0]?.total ?? 0)
            ? "up"
            : "down",
        value: borrowedRecordsThisWeek[0]?.total ?? 0,
      },
    ];

    return totalReport;
  } catch (error) {
    console.error("Error fetching admin statistics:", error);
    return [];
  }
};
