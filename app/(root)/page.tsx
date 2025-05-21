import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import { Book } from "@/types";
import { getLatestBooks, getHighlyRatedBooks, getMostBorrowedBooks } from "@/lib/actions/book";

export default async function Home() {
  const session = await auth();

  const [latestBooks, highlyRatedBooks, mostBorrowedBooks] = await Promise.all([
    getLatestBooks(7),
    getHighlyRatedBooks(7),
    getMostBorrowedBooks(7),
  ])
  return (
    <div>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id || ""} />
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
      <BookList
        title="Highly Rated Books"
        books={highlyRatedBooks}
        containerClassName="mt-28"
      />
      <BookList
        title="Most Borrowed Books"
        books={mostBorrowedBooks}
        containerClassName="mt-28"
      />
    </div>
  );
}
