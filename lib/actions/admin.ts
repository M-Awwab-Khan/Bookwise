"use server";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const fetchUsers = async () => {
  const usersData = await db
    .select({
      id: users.id,
      fullname: users.fullname,
      email: users.email,
      dateJoined: users.createdAt,
      role: users.role,
      university_id: users.universityId,
      university_card: users.universityCard,
      booksBorrowed: sql<number>`COUNT(${borrowRecords.id})`,
    })
    .from(users)
    .leftJoin(borrowRecords, eq(users.id, borrowRecords.userId))
    .groupBy(users.id);
  return usersData;
};

type ROLE = "USER" | "ADMIN";

export const updateUserRole = async (userId: string, role: ROLE) => {
  await db.update(users).set({ role }).where(eq(users.id, userId));
  revalidatePath("/admin/users");
};

export const fetchBooks = async () => {
  const booksData = await db.select().from(books);
  return booksData;
};

export const fetchBorrowRecordsWithBooks = async () => {
  const borrowRecordsData = await db
    .select({
      id: borrowRecords.id,
      userId: borrowRecords.userId,
      bookId: borrowRecords.bookId,
      borrowedAt: borrowRecords.borrowDate,
      returnedAt: borrowRecords.returnDate,
      dueDate: borrowRecords.dueDate,
      status: borrowRecords.status,
      bookTitle: books.title,
      coverUrl: books.coverUrl,
      color: books.coverColor,
      userName: users.fullname,
      userEmail: users.email,
    })
    .from(borrowRecords)
    .leftJoin(books, eq(borrowRecords.bookId, books.id))
    .leftJoin(users, eq(borrowRecords.userId, users.id));
  return borrowRecordsData;
};

type status = "BORROWED" | "LATE RETURN" | "RETURNED";

export const updateBorrowStatus = async (
  borrowRecordId: string,
  status: status
) => {
  if (status === "BORROWED") {
    await db
      .update(borrowRecords)
      .set({ status, returnDate: null })
      .where(eq(borrowRecords.id, borrowRecordId));
  }
  if (status === "RETURNED" || status === "LATE RETURN") {
    await db
      .update(borrowRecords)
      .set({ status, returnDate: new Date().toISOString() })
      .where(eq(borrowRecords.id, borrowRecordId));
  }

  revalidatePath("/admin/borrow-records");
  return {
    success: true,
    message: `Borrow record status updated to ${status}`,
  };
};

export const fetchAccountRequests = async () => {
  const accountRequests = await db
    .select({
      id: users.id,
      fullname: users.fullname,
      email: users.email,
      universityId: users.universityId,
      universityCard: users.universityCard,
      dateJoined: users.createdAt,
    })
    .from(users)
    .where(eq(users.status, "PENDING"));
  return accountRequests;
};

type accountRequestStatus = "APPROVED" | "PENDING" | "REJECTED";
export const updateAccountRequestStatus = async (
  userId: string,
  status: accountRequestStatus
) => {
  await db.update(users).set({ status }).where(eq(users.id, userId));
  revalidatePath("/admin/account-requests");
};
