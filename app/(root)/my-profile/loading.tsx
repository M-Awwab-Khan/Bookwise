import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProfileLoading = () => {
  return (
    <>
      {/* Main profile section - matches the flex layout */}
      <div className="flex flex-col min-[870px]:flex-row gap-8 md:gap-12 w-full overflow-hidden">
        {/* User Profile Skeleton - left side */}
        <div className="flex-shrink-0 w-full min-[870px]:w-auto min-[870px]:max-w-[450px]">
          <div className="space-y-9 w-full h-fit p-10 pt-24 bg-gradient-to-b from-[#232839] to-[#12141D] rounded-[20px] relative">
            {/* Clip icon skeleton */}
            <Skeleton className="absolute -top-4 left-1/2 -translate-x-1/2 w-[59px] h-[88px]" />

            <div className="space-y-8">
              {/* Profile section */}
              <div className="flex flex-col md:flex-row gap-7 items-center text-light-100">
                {/* Profile image skeleton */}
                <Skeleton className="w-[99px] h-[99px] rounded-full" />

                <div className="space-y-2.5">
                  {/* Status indicator */}
                  <div className="flex gap-0.5 items-center">
                    <Skeleton className="w-[13px] h-[13px] rounded-full" />
                    <Skeleton className="w-20 h-3" />
                  </div>

                  {/* Name and email */}
                  <section className="space-y-2">
                    <Skeleton className="w-40 h-7" />
                    <Skeleton className="w-48 h-5" />
                  </section>
                </div>
              </div>

              {/* University section */}
              <section className="space-y-1.5">
                <Skeleton className="w-20 h-5" />
                <Skeleton className="w-32 h-7" />
              </section>

              {/* Student ID section */}
              <section className="space-y-1.5">
                <Skeleton className="w-24 h-5" />
                <Skeleton className="w-28 h-7" />
              </section>
            </div>

            {/* University card skeleton */}
            <Skeleton className="w-full h-[287px] rounded-sm" />
          </div>
        </div>

        {/* Borrowed Books Skeleton - right side */}
        <div className="flex-1 min-w-0">
          <div className="w-full relative">
            {/* Borrowed Books Title */}
            <Skeleton className="w-48 h-10 mb-6" />

            {/* Carousel container skeleton */}
            <div className="w-full">
              <div className="flex gap-4 overflow-hidden">
                {/* Generate 2-3 borrowed book skeletons in carousel style */}
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-dark-500 p-5 pt-0 m-0 rounded-2xl relative flex-shrink-0 w-[240px]"
                  >
                    {/* Book cover section */}
                    <div className="px-6 py-12 flex justify-center items-center rounded-md w-full bg-gray-600/30">
                      <Skeleton className="w-28 h-40 rounded-sm" />
                    </div>

                    {/* Book info */}
                    <div className="mt-5 space-y-2">
                      <Skeleton className="w-full h-5" />
                      <Skeleton className="w-32 h-4" />
                    </div>

                    {/* Book details */}
                    <div className="mt-3 w-full space-y-2">
                      <div className="flex gap-1 items-center">
                        <Skeleton className="w-[18px] h-[18px] rounded-sm" />
                        <Skeleton className="w-36 h-4" />
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-1">
                          <Skeleton className="w-[18px] h-[18px] rounded-sm" />
                          <Skeleton className="w-28 h-4" />
                        </div>
                        <Skeleton className="w-7 h-7 rounded-sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You Might Like Section Skeleton - matches YouMightLikeBooks component */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {/* Title skeleton */}
          <Skeleton className="w-48 h-10 mx-auto mb-6" />
          {/* Description skeleton */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4 mx-auto" />
          </div>
        </div>

        {/* Books grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Generate 6 book card skeletons */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-dark-300 border-dark-100 rounded-lg"
            >
              {/* Book cover area */}
              <div className="relative">
                <div className="px-6 py-12 flex justify-center items-center rounded-md w-full bg-gray-600/30">
                  <Skeleton className="w-28 h-40 rounded-sm" />
                </div>
                {/* Badge skeletons */}
                <Skeleton className="absolute top-3 right-3 w-20 h-6 rounded-full" />
                <Skeleton className="absolute top-3 left-3 w-16 h-6 rounded-full" />
              </div>

              {/* Book content */}
              <div className="p-6">
                <div className="mb-3">
                  <Skeleton className="w-full h-6 mb-2" />
                  <div className="flex items-center gap-1 mb-2">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="w-32 h-4" />
                  </div>
                  {/* Star rating skeleton */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Skeleton key={starIndex} className="w-4 h-4" />
                    ))}
                    <Skeleton className="w-8 h-4 ml-1" />
                  </div>
                </div>

                <Skeleton className="w-full h-16 mb-4" />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="w-16 h-4" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="w-12 h-4" />
                  </div>
                </div>

                {/* Button skeletons */}
                <div className="flex gap-2">
                  <Skeleton className="flex-1 h-9" />
                  <Skeleton className="w-20 h-9" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More button skeleton */}
        <div className="text-center mt-12">
          <Skeleton className="w-48 h-11 mx-auto" />
        </div>
      </section>
    </>
  );
};

export default ProfileLoading;
