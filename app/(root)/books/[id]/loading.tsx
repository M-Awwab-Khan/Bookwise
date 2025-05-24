import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      {/* BookOverview skeleton */}
      <section className="relative book-overview">
        <div className="flex flex-1 flex-col gap-5">
          {/* Title skeleton */}
          <Skeleton className="h-12 w-3/4" />

          {/* Book info skeleton */}
          <div className="book-info">
            {/* Rating skeleton */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-5 w-5 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Author skeleton */}
            <Skeleton className="h-4 w-48" />

            {/* Genre skeleton */}
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Book copies skeleton */}
          <div className="book-copies">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-36" />
          </div>

          {/* Description skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Borrow button skeleton */}
          <Skeleton className="h-12 w-40" />
        </div>

        {/* Book cover skeleton */}
        <div className="relative flex flex-1 justify-center">
          <div className="relative">
            <Skeleton className="book-cover_wide z-10" />
            <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
              <Skeleton className="book-cover_wide" />
            </div>
          </div>
        </div>

        {/* Bookmark button skeleton */}
        <div className="absolute right-5 top-5">
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </section>

      <div className="book-details flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-[55%]">
          {/* Video section skeleton */}
          <section className="flex flex-col gap-7">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="aspect-video w-full rounded-xl" />
          </section>

          {/* Summary section skeleton */}
          <section className="mt-10 flex-col gap-7">
            <Skeleton className="h-8 w-24 mb-7" />
            <div className="space-y-5">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
              <Skeleton className="h-6 w-2/3" />
            </div>
          </section>
        </div>

        {/* Similar books section skeleton */}
        <section className="w-full md:w-[45%]">
          <Skeleton className="h-8 w-48 mb-6" />

          <ul className="book-list">
            {[...Array(5)].map((_, i) => (
              <li key={i}>
                <Skeleton className="book-cover_regular" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default Loading;
