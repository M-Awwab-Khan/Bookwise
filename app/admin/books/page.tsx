import TableWrapper from "@/components/admin/TableWrapper";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { TableBook } from "@/types";
import React from "react";

const Books = async () => {
  let allBooks: TableBook[] = [];

  try {
    // Fetch all books from DB
    allBooks = (await db
      .select({
        id: books.id,
        info: {
          title: books.title,
          coverUrl: books.coverUrl,
          coverColor: books.coverColor,
        },
        author: books.author,
        genre: books.genre,
        createdAt: books.createdAt,
      })
      .from(books)) as TableBook[];
  } catch (error) {
    console.error("Error fetching books:", error);
  }

  return <TableWrapper data={allBooks} type="Books" />;
};

export default Books;
