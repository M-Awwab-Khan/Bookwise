"use client";
import React from "react";
import { BookmarkButton } from "./BookmarkButton";
import { updateBookmarkStatus } from "@/lib/actions/book";

const BookmarkWrapper = ({
  bookId,
  userId,
  bookmarkStatus,
}: {
  bookId: string;
  userId: string;
  bookmarkStatus: boolean;
}) => {
  return (
    <div className="absolute top-10 right-10 z-100 scale-[2.0]">
      <BookmarkButton
        initialState={bookmarkStatus}
        onChange={async () => {
          await updateBookmarkStatus(bookId, userId);
        }}
      />
    </div>
  );
};

export default BookmarkWrapper;
