"use server";

import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const accountApproval = async (id: string) => {
  try {
    await db
      .update(users)
      .set({
        status: "APPROVED",
      })
      .where(eq(users.id, id));

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while approving account",
    };
  }
};
export const cancelAccountApproval = async (id: string) => {
  try {
    await db
      .update(users)
      .set({
        status: "REJECTED",
      })
      .where(eq(users.id, id));

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while cancelling the account approval",
    };
  }
};
