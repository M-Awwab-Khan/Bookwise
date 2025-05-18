import React from "react";
import Image from "next/image";
import BookCover from "./BookCover";
import BorrowBook from "./BorrowBook";
import { db } from "@/database/drizzle";
import { interactions, users } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import { hasUserBorrowedBook } from "@/lib/actions/book";
import DownloadReciept from "./DownloadReciept";
import RatingWrapper from "./RatingWrapper";

interface Props extends Book {
  userId: string;
}
const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  id,
  userId,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user?.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is not available"
        : "You are not eligible to borrow this book",
  };
  const hasBorrowed = await hasUserBorrowedBook(userId, id);

  const ratings = await db
    .select()
    .from(interactions)
    .where(and(eq(interactions.bookId, id), eq(interactions.type, "RATE")));

  // Calculate average rating if there are any ratings
  const averageRating =
    ratings.length > 0
      ? ratings.reduce(
          (sum, interaction) => sum + (interaction.rating || 0),
          0
        ) / ratings.length
      : 0;

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          {/* rating */}
          <RatingWrapper bookId={id} currentRating={averageRating} />
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
        </div>
        <div className="book-copies">
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>
          <p>
            Available Books: <span>{availableCopies}</span>
          </p>
        </div>
        <p className="book-description">{description}</p>
        {user && !hasBorrowed.hasBorrowed && (
          <BorrowBook
            userId={userId}
            bookId={id}
            borrowingEligibility={borrowingEligibility}
          />
        )}
        {hasBorrowed.hasBorrowed && (
          <DownloadReciept borrowRecord={hasBorrowed.record} />
        )}
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
