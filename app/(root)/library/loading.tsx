import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="library">
      {/* Search section skeleton */}
      <div className="mb-12 text-center">
        <Skeleton className="h-4 w-80 mx-auto mb-4" />
        <div className="space-y-2 mb-10">
          <Skeleton className="h-12 w-96 mx-auto" />
          <Skeleton className="h-12 w-80 mx-auto" />
        </div>
        <div className="relative mx-auto max-w-xl">
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>

      {/* Search results header skeleton (optional, shown when there's a query) */}
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-10 w-[180px]" />
      </div>

      {/* Book grid skeleton */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="flex flex-col">
            {/* Book cover skeleton */}
            <Skeleton className="book-cover_medium mb-4" />
            {/* Book title skeleton */}
            <Skeleton className="h-4 w-full mb-2" />
            {/* Book genre skeleton */}
            <Skeleton className="h-3 w-3/4" />
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-10 rounded-sm" />
          <Skeleton className="h-10 w-10 rounded-sm" />
          <Skeleton className="h-10 w-10 rounded-sm" />
          <Skeleton className="h-8 w-6" />
          <Skeleton className="h-10 w-10 rounded-sm" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
