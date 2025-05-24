"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";

export const fetchBookById = async (id: string) => {
  try {
    const res = await db.select().from(books).where(eq(books.id, id)).limit(1);

    if (res.length > 0) {
      return res[0];
    }

    return null;
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    return null;
  }
};
