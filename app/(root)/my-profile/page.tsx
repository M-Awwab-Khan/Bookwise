import { auth } from "@/auth";
import YouMightLikeBooks from "@/components/BookGrid";
import BorrowedBooksList from "@/components/BorrowedBooksList";
import UserProfile from "@/components/UserProfile";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { getUser } from "@/lib/actions/auth";
import { User } from "@/types";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const MyProfile = async () => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      redirect("/sign-in");
      return null; // Ensure no further execution
    }

    const [userInfo] = await Promise.all([getUser(session.user.id)]);

    if (!userInfo) {
      redirect("/");
      return null; // Ensure no further execution
    }

    return (
      <>
        <div className="flex flex-col min-[870px]:flex-row gap-8 md:gap-12 w-full overflow-hidden">
          {/* User Profile - left side */}
          <div className="flex-shrink-0 w-full min-[870px]:w-auto min-[870px]:max-w-[450px]">
            <UserProfile {...userInfo} fullName={userInfo.fullname} />
          </div>

          {/* Borrowed books - right side */}
          <div className="flex-1 min-w-0">
            <BorrowedBooksList />
          </div>
        </div>
        <YouMightLikeBooks userId={userInfo.id} />
      </>
    );
  } catch (error) {
    console.error("Error loading profile:", error);
    redirect("/error"); // Redirect to a generic error page
    return null; // Ensure no further execution
  }
};

export default MyProfile;
