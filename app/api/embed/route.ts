import { embed } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { books, bookEmbeddings } from "@/database/schema";
import { eq } from "drizzle-orm";

// Initialize database connection
const client = postgres(process.env.DATABASE_URL!, {
  prepare: false,
});

const db = drizzle(client);

export async function GET(request: Request) {
  try {
    console.log("Starting embedding process...");

    // Get all books from the database
    const allBooks = await db.select().from(books);

    // Get all book IDs that already have embeddings
    const existingEmbeddings = await db
      .select({
        bookId: bookEmbeddings.bookId,
      })
      .from(bookEmbeddings);

    const existingEmbeddingIds = new Set(
      existingEmbeddings.map((e) => e.bookId)
    );

    // Filter books that don't have embeddings yet
    const booksToEmbed = allBooks.filter(
      (book) => !existingEmbeddingIds.has(book.id)
    );

    console.log(
      `Found ${booksToEmbed.length} books that need embeddings out of ${allBooks.length} total books`
    );

    let embeddedCount = 0;

    // Create embeddings for each book
    for (const book of booksToEmbed) {
      // Create content to embed: title, author, genre, description, and summary
      const contentToEmbed = `Title: ${book.title}. Author: ${book.author}. Genre: ${book.genre}. Description: ${book.description}. Summary: ${book.summary}`;

      // Generate embedding using Google's embedding model
      const { embedding, usage } = await embed({
        model: google.textEmbeddingModel("text-embedding-004", {
          taskType: "SEMANTIC_SIMILARITY",
        }),
        value: contentToEmbed,
      });

      // Store embedding in the database
      await db.insert(bookEmbeddings).values({
        bookId: book.id,
        embedding: embedding,
      });

      embeddedCount++;
      console.log(
        `Created embedding for book: ${book.title} (${embeddedCount}/${booksToEmbed.length})`
      );
    }

    return NextResponse.json({
      success: true,
      message: `Created embeddings for ${embeddedCount} books`,
    });
  } catch (error) {
    console.error("Error creating embeddings:", error);
    return NextResponse.json(
      { success: false, message: "Error creating embeddings", error },
      { status: 500 }
    );
  } finally {
    // Close the database connection
    await client.end();
  }
}
