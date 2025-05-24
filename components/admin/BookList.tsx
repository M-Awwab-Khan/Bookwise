import Link from "next/link";
import Image from "next/image";
import BookCover from "@/components/BookCover";
import { Book, BookRequests } from "@/types";
import UserAvatar from "./UserAvatar";
import { cn } from "@/lib/utils";
import Empty from "./Empty";

const BookList = ({
  type,
  books,
}: {
  type: "latestBooks" | "bookRequests";
  books: Book[] | BookRequests[];
}) => {
  const sortedBooks = books.map((book) => {
    if (type === "bookRequests") {
      return {
        id: book.id,
        title: (book as BookRequests).bookInfo.title,
        author: (book as BookRequests).bookInfo.author,
        coverUrl: (book as BookRequests).bookInfo.coverUrl,
        coverColor: (book as BookRequests).bookInfo.coverColor,
        genre: (book as BookRequests).bookInfo.genre,
        date: (book as BookRequests).borrowedDate,
        name: (book as BookRequests).userInfo.name,
      };
    } else {
      return {
        id: book.id,
        title: (book as Book).title,
        author: (book as Book).author,
        coverUrl: (book as Book).coverUrl,
        coverColor: (book as Book).coverColor,
        genre: (book as Book).genre,
        date: (book as Book).createdAt,
      };
    }
  });

  return (
    <>
      {type === "latestBooks" && (
        <Link
          href="/admin/books/new"
          className="rounded-lg bg-light-300 px-4 py-3.5 flex gap-3.5 items-center mb-2"
        >
          <div className="bg-white rounded-full p-3">
            <Image
              src="/icons/admin/add.svg"
              alt="Add new book"
              width={24}
              height={24}
            />
          </div>
          <h5 className="text-lg font-medium tracking-tighter text-dark-400 mt-2 self-center">
            Add New Book
          </h5>
        </Link>
      )}
      <div
        className={cn(
          "overflow-auto scrollbar-thin scrollbar-thumb-primary-admin scrollbar-track-gray-200",
          type === "bookRequests"
            ? "space-y-3 max-h-[350px]"
            : "space-y-3 max-h-[505px]"
        )}
      >
        {sortedBooks.length > 0 ? (
          sortedBooks.map((book, index) => (
            <div
              key={book.id || index}
              className={cn(
                "flex gap-3.5 items-center p-3.5 rounded-lg hover:bg-primary-admin/5 transition-all duration-200",

                type === "bookRequests" ? "bg-light-300" : "bg-white"
              )}
            >
              <BookCover
                variant="wide"
                className="z-10 w-14 h-[76px]"
                coverColor={book.coverColor}
                coverImage={book.coverUrl}
              />
              <div>
                <h5 className="font-semibold text-base text-dark-400 tracking-tight">
                  {book.title}
                </h5>
                <p className="text-gray-400 text-sm flex items-center gap-2 mb-1.5 mt-0.5 flex-wrap">
                  <span>By {book.author}</span>
                  <span className="w-1 h-1 bg-[#8C8E98] rounded-full"></span>
                  <span>{book.genre}</span>
                </p>
                <div className=" text-xs text-dark-200 flex gap-3 items-center">
                  {type === "bookRequests" && (
                    <div className="flex gap-0.5 items-center">
                      <UserAvatar
                        name={book.name as string}
                        containerStyle="w-6 h-6 text-xs"
                      />

                      <span>
                        {(book.name as string).split(" ").slice(0, 2).join(" ")}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-0.5 items-center">
                    <Image
                      src="/icons/admin/calendar.svg"
                      alt="created date"
                      width={16}
                      height={16}
                    />
                    <span>
                      {book.date &&
                        new Date(book.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Empty type={type} />
        )}
      </div>
    </>
  );
};

export default BookList;
