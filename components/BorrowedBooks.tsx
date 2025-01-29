"use client";
import React from "react";
import BookCover from "./BookCover";
import { format } from "date-fns";
import Image from "next/image";

const BorrowedBooks = ({ borrowedBooks }) => {
  const calculateDaysLeft = (dueDate: Date) => {
    return Math.ceil(
      (new Date(dueDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
  };

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {borrowedBooks.map((book) => (
        <div key={book.id} className="border-0">
          <div className="p-4 text-white borrowed-book">
            <div className="flex flex-col gap-4">
              <div
                className="borrowed-book_cover"
                style={{ backgroundColor: `${book.color}4D` }} // 4D is the hex code for 30% opacity
              >
                <BookCover
                  coverColor={book.color}
                  coverImage={book.cover}
                  variant="medium"
                />
              </div>
              <div className="flex flex-col gap-2 justify-between">
                <div className="mb-2">
                  <h3 className="font-semibold text-lg">
                    {book.title} - By {book.author}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400 italic">
                    {book.genre}
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="flex items-center gap-2 text-sm text-gray-400">
                    <Image
                      src="/icons/book-2.svg"
                      width={16}
                      height={16}
                      alt="book"
                    />
                    Borrowed on {format(book.borrowDate, "PPP")}
                  </span>
                  {book.returnDate && book.returnDate < book.borrowDate + 7 ? (
                    <span className="flex items-center gap-2 text-sm text-gray-400">
                      <Image
                        src="/icons/tick.svg"
                        width={16}
                        height={16}
                        alt="returned"
                      />
                      Returned on {format(book.returnDate, "PPP")}
                    </span>
                  ) : calculateDaysLeft(book.dueDate) > 0 ? (
                    <span className="flex items-center gap-2 text-sm text-gray-400">
                      <Image
                        src="/icons/calendar.svg"
                        width={16}
                        height={16}
                        alt="calendar"
                      />
                      {calculateDaysLeft(book.dueDate)} days left to due
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-sm text-red-500">
                      <Image
                        src="/icons/warning.svg"
                        width={16}
                        height={16}
                        alt="warning"
                      />
                      Overdue return
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BorrowedBooks;
