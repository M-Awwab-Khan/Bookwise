"use client";

import React, { useEffect, useRef, useState } from "react";
import BorrowedBook from "./BorrowedBook";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface BorrowedBooksClientProps {
  borrowedBooks: Array<{
    borrow_records: { createdAt: Date; dueDate: string };
    books: {
      id: string;
      coverUrl: string;
      coverColor: string;
      title: string;
      genre: string;
    };
  }>;
}

const BorrowedBooksClient = ({ borrowedBooks }: BorrowedBooksClientProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slidesToShow, setSlidesToShow] = useState(2);

  useEffect(() => {
    const calculateSlidesToShow = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      // Account for carousel padding/margins and navigation buttons
      const availableWidth = containerWidth; // Reserve space for navigation buttons
      const bookWidth = 260; // Approximate width of each book card (240px + padding)
      const gap = 16; // Gap between slides

      const calculatedSlides = Math.floor(availableWidth / (bookWidth + gap));
      setSlidesToShow(Math.max(1, calculatedSlides)); // Ensure at least 1 slide
    };

    // Calculate on mount
    calculateSlidesToShow();

    // Set up resize observer
    const resizeObserver = new ResizeObserver(() => {
      calculateSlidesToShow();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Calculate basis percentage based on slides to show
  const basisPercentage = `${100 / slidesToShow}%`;
  console.log("Slides to show:", slidesToShow);

  return (
    <div ref={containerRef} className="w-full relative">
      <h2 className="font-bebas-neue text-4xl text-light-100 my-6">
        Borrowed Books
      </h2>

      <Carousel
        opts={{
          align: "start",
          slidesToScroll: Math.min(slidesToShow, borrowedBooks.length),
        }}
        className="w-full"
      >
        <CarouselContent>
          {borrowedBooks.map(
            ({
              borrow_records: { createdAt, dueDate },
              books: { id, coverUrl, coverColor, title, genre },
            }) => (
              <CarouselItem
                key={id}
                className="pl-2 md:pl-4 min-w-0"
                style={{ flexBasis: basisPercentage }}
              >
                <div className="w-full overflow-hidden flex justify-center">
                  <BorrowedBook
                    id={id}
                    coverColor={coverColor}
                    coverUrl={coverUrl}
                    title={title}
                    genre={genre}
                    createdAt={createdAt as Date}
                    dueDate={dueDate}
                  />
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        {borrowedBooks.length > slidesToShow && (
          <>
            <CarouselPrevious className="bg-transparent border-0 text-primary left-[5px]" />
            <CarouselNext className="bg-transparent border-0 text-primary -right-[9px]" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default BorrowedBooksClient;
