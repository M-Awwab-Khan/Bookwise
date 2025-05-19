"use server";

import { bookEmbeddings, books } from "@/database/schema";
import { db } from "@/database/drizzle";
import { embed } from "ai";
import { google } from "@ai-sdk/google";
import { BookParams } from "@/types";
import { eq } from "drizzle-orm";

export const createBook = async (params: BookParams) => {
  const {
    title,
    description,
    author,
    genre,
    rating,
    totalCopies,
    coverUrl,
    coverColor,
    videoUrl,
    summary,
  } = params;
  const { embedding, usage } = await embed({
    model: google.textEmbeddingModel("text-embedding-004", {
      taskType: "SEMANTIC_SIMILARITY",
    }),
    value: `Title: ${title}. Author: ${author}. Genre: ${genre}. Description: ${description}. Summary: ${summary}`,
  });
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    if (newBook.length > 0) {
      await db
        .insert(bookEmbeddings)
        .values({
          bookId: newBook[0].id,
          embedding: embedding,
        })
        .returning();
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};

export const updateBook = async (params: BookParams, id: string) => {
  const {
    title,
    description,
    author,
    genre,
    rating,
    totalCopies,
    coverUrl,
    coverColor,
    videoUrl,
    summary,
  } = params;
  const { embedding, usage } = await embed({
    model: google.textEmbeddingModel("text-embedding-004", {
      taskType: "SEMANTIC_SIMILARITY",
    }),
    value: `Title: ${title}. Author: ${author}. Genre: ${genre}. Description: ${description}. Summary: ${summary}`,
  });
  try {
    const updatedBook = await db
      .update(books)
      .set({
        ...params,
        availableCopies: params.totalCopies,
      })
      .where(eq(books.id, id))
      .returning();

    if (updatedBook.length > 0) {
      await db
        .update(bookEmbeddings)
        .set({
          embedding: embedding,
        })
        .where(eq(bookEmbeddings.bookId, updatedBook[0].id))
        .returning();
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while updating the book",
    };
  }
};
