"use client";
import React, { useEffect } from "react";
import { Rating, RatingButton } from "@/components/ui/rating";
import { db } from "@/database/drizzle";
import { useSession } from "next-auth/react";
import { interactions } from "@/database/schema";
import { updateRating } from "@/lib/actions/book";
import { useToast } from "@/hooks/use-toast";

const RatingWrapper = ({
  bookId,
  averageRating,
  userRating,
}: {
  bookId: string;
  averageRating: number;
  userRating: number;
}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id as string;
  const { toast } = useToast();
  return (
    <div className="flex items-center gap-2">
      <Rating
        defaultValue={Math.floor(userRating)}
        onChange={(_, v) => {
          updateRating(v, userId, bookId)
            .then((res) => {
              if (res.success) {
                toast({
                  title: "Rating updated",
                  description: "Your rating has been updated successfully.",
                  variant: "default",
                });
              } else {
                toast({
                  title: "Error",
                  description: "There was an error updating your rating.",
                  variant: "destructive",
                });
              }
            })
            .catch((error) => {
              console.error("Error updating rating:", error);
              toast({
                title: "Error",
                description: "There was an error updating your rating.",
                variant: "destructive",
              });
            });
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingButton key={index} />
        ))}
      </Rating>
      ({Number(averageRating).toFixed(2)} / 5)
    </div>
  );
};

export default RatingWrapper;
