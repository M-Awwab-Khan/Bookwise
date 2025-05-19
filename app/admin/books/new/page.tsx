import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookForm from "@/components/admin/forms/BookForm";
import { ArrowLeft } from "lucide-react";

const Page = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  );
};
export default Page;
