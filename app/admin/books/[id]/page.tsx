import BookCard from "@/components/BookCard";
import BookCover from "@/components/BookCover";
import BookVideo from "@/components/BookVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { darkenColor } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    if (!id) {
      console.error("Book ID is missing.");
      return redirect("/admin/books");
    }

    const res = await db.select().from(books).where(eq(books.id, id)).limit(1);

    if (res.length === 0) {
      console.error(`No book found with ID: ${id}`);
      return redirect("/admin/books");
    }

    const book = res[0];

    return (
      <>
        <Button className="back-btn" asChild>
          <Link href="/admin/books">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Link>
        </Button>

        <div className="space-y-9">
          <div className="flex flex-wrap gap-9">
            <div
              className="px-6 py-12 flex justify-center items-center rounded-md w-60 h-56"
              style={{
                backgroundColor: darkenColor(book.coverColor, 30), // Darken the coverColor
              }}
            >
              <BookCover
                className="w-32 h-44"
                coverColor={book.coverColor}
                coverImage={book.coverUrl}
              />
            </div>
            <section className="space-y-4">
              <p className="text-lg text-[#64748B] flex flex-row items-center gap-3">
                <span>Created at:</span>

                <span className="flex flex-wrap items-center gap-1.5">
                  <Image
                    src="/icons/admin/calendar.svg"
                    alt="created date"
                    width={20}
                    height={20}
                  />
                  <span className="text-dark-200">{book.createdAt}</span>
                </span>
              </p>
              <h2 className="font-semibold text-2xl text-dark-400">
                {book.title}
              </h2>
              <h4 className="text-lg font-semibold text-dark-200">
                By {book.author}
              </h4>
              <p className="text-base text-[#64748B]">{book.genre}</p>

              <Link
                href={`/admin/books/update/${book.id}`}
                className="flex flex-wrap justify-center gap-1.5 bg-primary-admin py-2.5 md:py-3 px-8 rounded-md w-full md:w-[422px]"
              >
                <Image
                  src="/icons/admin/edit-book.svg"
                  alt="Edit book"
                  width={16}
                  height={16}
                />
                <span className="text-white font-bold text-sm">Edit Book</span>
              </Link>
            </section>
          </div>

          <div className="flex flex-wrap flex-col-reverse justify-between md:flex-row gap-10">
            <section className="space-y-4 flex-1">
              <h4 className="font-semibold text-base text-dark-400">Summary</h4>

              <div className="text-base text-[#64748B] space-y-4">
                {book.summary.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </section>

            <section className="md:w-4/12 space-y-4">
              <h4 className="font-semibold text-base text-dark-400">Video</h4>
              <BookVideo videoUrl={book.videoUrl} />
            </section>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("An error occurred while fetching the book:", error);
    return redirect("/admin/books");
  }
};

export default page;
