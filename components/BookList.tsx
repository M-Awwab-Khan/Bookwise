import React from "react";
import BookCard from "./BookCard";
import { Book } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName }: Props) => {
  if (books.length < 2) return;
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <div className="relative mt-4">
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 5,
          }}
        >
          <CarouselContent>
            {books.map((book) => (
              <CarouselItem key={book.title} className="basis-1/5">
                <BookCard {...book} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-transparent border-0 text-primary" />
          <CarouselNext className="bg-transparent border-0 text-primary" />

        </Carousel>
      </div>
    </section>
  );
};

export default BookList;
