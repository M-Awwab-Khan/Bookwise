import { auth } from '@/auth';
import BorrowedBooksList from '@/components/BorrowedBooksList';
import UserProfile from '@/components/UserProfile';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react';

const MyProfile = async () => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      redirect('/sign-in');
      return null; // Ensure no further execution
    }

    const [userInfo] = await db
      .select({
        fullName: users.fullname,
        email: users.email,
        universityId: users.universityId,
        universityCard: users.universityCard,
        status: users.status,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, session?.user?.id))
      .limit(1);

    if (!userInfo) {
      redirect('/');
      return null; // Ensure no further execution
    }

    return (
      <div className="flex flex-col md:pt-10 md:flex-row gap-8 md:gap-20">
        {/* User Profile */}
        <UserProfile {...userInfo} />

        {/* Borrowed books */}
        <BorrowedBooksList />
      </div>
    );
  } catch (error) {
    console.error('Error loading profile:', error);
    redirect('/error'); // Redirect to a generic error page
    return null; // Ensure no further execution
  }
};

export default MyProfile;
