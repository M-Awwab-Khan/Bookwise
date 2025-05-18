"use client";
import React, { useEffect } from "react";
import { Rating, RatingButton } from "@/components/ui/rating";
import { db } from "@/database/drizzle";
import { useSession } from "next-auth/react";
import { interactions } from "@/database/schema";
import { updateRating } from "@/lib/actions/book";

const RatingWrapper = ({
  bookId,
  currentRating,
}: {
  bookId: string;
  currentRating: number;
}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id as string;
  return (
    <div className="flex items-center gap-2">
      <Rating
        defaultValue={Math.floor(currentRating)}
        onChange={(_, v) => updateRating(v, userId, bookId)}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingButton key={index} />
        ))}
      </Rating>
      ({currentRating} / 5)
    </div>
  );
};

export default RatingWrapper;
