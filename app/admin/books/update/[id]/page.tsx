import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { fetchBookById } from "@/lib/admin/actions/book-details";

const UpdateBook = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  if (!id) return null;

  const book = await fetchBookById(id);

  if (!book) return null;

  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/books">
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm type="update" book={book} />
      </section>
    </>
  );
};

export default UpdateBook;
