import { Card, CardContent } from "./ui/card";
import { BookOpen, Clock, Star, User } from "lucide-react";
import { FaBookReader } from "react-icons/fa";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Book } from "@/types";
import { darkenColor } from "@/lib/utils";
import BookCover from "./BookCover";
import Link from "next/link";
import { hasUserBorrowedBook, generateReceipt } from "@/lib/actions/book";
import { toast } from "@/hooks/use-toast";
import BorrowBook from "./BorrowBook";
import DownloadReciept from "./DownloadReciept";
import { getUser } from "@/lib/actions/auth";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : star - 0.5 <= rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "text-gray-500"
          }`}
        />
      ))}
      <span className="text-sm text-light-100 ml-1">{rating}</span>
    </div>
  );
};

const BorrowButton = async ({
  book,
  userId,
}: {
  book: Book;
  userId?: string;
}) => {
  const [hasBorrowed, user] = await Promise.all([
    hasUserBorrowedBook(userId as string, book.id),
    getUser(userId as string),
  ]);

  const handleDownloadReceipt = async () => {
    if (!hasBorrowed?.record) return;

    try {
      const buffer = await generateReceipt(hasBorrowed.record);

      // Create a blob from the PDF buffer
      const blob = new Blob([buffer], { type: "application/pdf" });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = `receipt-${hasBorrowed.record.id}.pdf`;

      // Trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Receipt Downloaded",
        description: "Your receipt has been downloaded successfully",
      });
    } catch (error) {
      console.error("Failed to download receipt:", error);
      toast({
        title: "Error",
        description: "Failed to download receipt",
        variant: "destructive",
      });
    }
  };

  const borrowingEligibility = {
    isEligible: book.availableCopies > 0 && user?.status === "APPROVED",
    message:
      book.availableCopies <= 0
        ? "Book is not available"
        : "You are not eligible to borrow this book",
  };

  // Otherwise show borrow button
  return (
    <>
      {userId && !hasBorrowed.hasBorrowed && (
        <BorrowBook
          userId={userId}
          bookId={book.id}
          borrowingEligibility={borrowingEligibility}
        />
      )}
      {hasBorrowed.hasBorrowed && (
        <DownloadReciept borrowRecord={hasBorrowed.record} />
      )}
    </>
  );
};

const BookCard2 = ({ book, userId }: { book: Book; userId?: string }) => {
  return (
    <Card
      key={book.id}
      className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-dark-300 border-dark-100"
    >
      <CardContent className="p-0">
        <div className="relative">
          <div
            className="px-6 py-12 flex justify-center items-center rounded-md w-full"
            style={{
              backgroundColor: darkenColor(book.coverColor, 60),
            }}
          >
            <BookCover
              coverColor={book.coverColor}
              coverImage={book.coverUrl}
            />
          </div>
          <div className="absolute top-3 right-3">
            <Badge
              variant={book.availableCopies > 1 ? "default" : "secondary"}
              className={
                book.availableCopies > 1
                  ? "bg-green-800 text-light-100"
                  : "bg-red-800 text-light-100"
              }
            >
              {book.availableCopies > 1 ? "Available" : "Checked Out"}
            </Badge>
          </div>
          <div className="absolute top-3 left-3">
            <Badge
              variant="outline"
              className="bg-primary text-dark border-primary"
            >
              {book.genre}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-3">
            <h3 className="font-bold text-lg text-white mb-1 line-clamp-2">
              {book.title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-light-100 mb-2">
              <User className="w-4 h-4" />
              <span>{book.author}</span>
            </div>
            <StarRating rating={book.rating} />
          </div>

          <p className="text-light-100 text-sm mb-4 line-clamp-3">
            {book.description}
          </p>

          <div className="flex items-center justify-between text-xs text-light-500 mb-4">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>300 pages</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>1 month</span>
            </div>
          </div>

          <div className="flex gap-2 justify-between items-center">
            <BorrowButton book={book} userId={userId} />
            <Button
              variant="outline"
              className="py-2 px-4 min-h-14 mt-4 bg-dark-600 text-light-100 border-dark-100 hover:bg-dark-500 hover:text-light-100"
              asChild
            >
              <Link href={`/books/${book.id}`}>
                <FaBookReader />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard2;
