import { auth } from "@/auth";
import BookCover from "@/components/BookCover";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { getSimilarBooks, viewBookInteraction } from "@/lib/actions/book";
import { Book } from "@/types";
import { eq, and, ne } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const similarBooks = await getSimilarBooks(id, 5);

  // Fetch book data by id
  const [bookDetails] = (await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1)

    .catch(() => [])) as Book[];

  if (!bookDetails) redirect("/404");

  viewBookInteraction(session?.user?.id as string, id);

  // Fetch similar books by genre
  // const similarBooks = await db
  //   .select({
  //     id: books.id,
  //     coverColor: books.coverColor,
  //     coverUrl: books.coverUrl,
  //   })
  //   .from(books)
  //   .where(
  //     and(eq(books.genre, bookDetails.genre), ne(books.id, bookDetails.id)) // Exclude current book
  //   )
  //   .limit(6);

  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book-details flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-[55%]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>

        {/* SIMILAR BOOKS */}
        <section className="w-full md:w-[45%]">
          <h3>More similar books</h3>

          <ul className="book-list">
            {similarBooks.map((book) => (
              <li key={book.id}>
                <Link href={`/books/${book.id}`}>
                  <BookCover
                    coverColor={book.cover_color}
                    coverImage={book.cover_url}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default Page;
