import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProfileLoading = () => {
  return (
    <div className="flex flex-col md:pt-10 min-[870px]:flex-row gap-8 md:gap-12">
      {/* User Profile Skeleton - left side */}
      <div className="space-y-9 w-full md:min-w-[450px] max-w-[700px] h-fit p-10 pt-24 bg-gradient-to-b from-[#232839] to-[#12141D] rounded-[20px] relative">
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

      {/* Borrowed Books Skeleton - right side */}
      <div className="flex-1">
        {/* Title skeleton */}
        <Skeleton className="w-48 h-10 mb-6 mt-6" />

        {/* Books grid skeleton */}
        <div className="flex flex-wrap gap-8 mt-6">
          {/* Generate 3 borrowed book skeletons */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-dark-500 p-5 pt-0 m-0 rounded-2xl relative"
            >
              {/* Book cover section */}
              <div className="px-6 py-12 flex justify-center items-center rounded-md w-60 bg-gray-600/30">
                <Skeleton className="w-28 h-40 rounded-sm" />
              </div>

              {/* Book info */}
              <div className="mt-5 space-y-2">
                <Skeleton className="w-52 h-5" />
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
  );
};

export default ProfileLoading;
