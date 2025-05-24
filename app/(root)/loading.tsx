import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      {/* BookOverview Skeleton */}
      <section className="relative book-overview">
        <div className="flex flex-1 flex-col gap-5">
          {/* Title Skeleton */}
          <Skeleton className="h-16 w-3/4 md:h-20" />

          {/* Book Info Skeleton */}
          <div className="book-info">
            <Skeleton className="h-6 w-48" /> {/* Rating */}
            <Skeleton className="h-6 w-64" /> {/* Author */}
            <Skeleton className="h-6 w-56" /> {/* Category */}
          </div>

          {/* Book Copies Skeleton */}
          <div className="book-copies">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-36" />
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Borrow Button Skeleton */}
          <Skeleton className="h-14 w-48" />
        </div>

        {/* Book Cover Skeleton */}
        <div className="relative flex flex-1 justify-center">
          <div className="relative">
            <Skeleton className="xs:w-[296px] w-[256px] xs:h-[404px] h-[354px] z-10" />
            <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
              <Skeleton className="xs:w-[296px] w-[256px] xs:h-[404px] h-[354px]" />
            </div>
          </div>
        </div>

        {/* Bookmark Skeleton */}
        <div className="absolute top-10 right-10 z-100 scale-[2.0]">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </section>

      {/* BookList Skeletons */}
      {["Latest Books", "Highly Rated Books", "Most Borrowed Books"].map(
        (title, index) => (
          <section key={title} className="mt-28">
            {/* Title Skeleton */}
            <Skeleton className="h-10 w-64 font-bebas-neue" />

            {/* Carousel Skeleton */}
            <div className="relative mt-4">
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0 basis-1/5">
                    {/* Book Cover Skeleton */}
                    <Skeleton className="xs:w-[174px] w-[114px] xs:h-[239px] h-[169px]" />

                    {/* Book Info Skeleton */}
                    <div className="mt-4 xs:max-w-40 max-w-28">
                      <Skeleton className="h-5 w-full mb-2" /> {/* Title */}
                      <Skeleton className="h-4 w-3/4" /> {/* Genre */}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons Skeleton */}
              <Skeleton className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full" />
              <Skeleton className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full" />
            </div>
          </section>
        )
      )}
    </div>
  );
}
