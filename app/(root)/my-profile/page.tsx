import Image from "next/image";
import { User2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UniversityCard from "@/components/UniversityCard";
import { fetchBorrowedBooks } from "@/lib/actions/book";
import BorrowedBooks from "@/components/BorrowedBooks";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }
  const user = (
    await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user?.id))
      .limit(1)
  )[0];
  const borrowedBooks = (await fetchBorrowedBooks(user.id)).data;
  return (
    <div className="min-h-screen p-8">
      <div className="grid gap-8 grid-cols-[40%_60%]">
        {/* Profile Section */}
        <div className="space-y-6">
          <Card className="bg-[#22263a] border-0 text-white">
            <CardContent className="p-6 flex flex-col gap-6">
              <div className="flex flex-row items-center space-x-5">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>
                    <User2 className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <span className="flex rounded-full w-[200px] py-0.5 text-sm gap-1 items-center">
                    <Image
                      alt="verfied"
                      src="/icons/verified.svg"
                      width={15}
                      height={15}
                    />{" "}
                    Verified Student
                  </span>
                  <div className="flex flex-col text-left">
                    <h2 className="text-xl font-semibold">{user.fullname}</h2>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-4 mb-6">
                <div>
                  <h3 className="text-md text-gray-400">University</h3>
                  <p className="font-medium text-lg">JS Mastery Pro</p>
                </div>
                <div>
                  <h3 className="text-md text-gray-400">Student ID</h3>
                  <p className="font-medium text-lg">{user.university_id}</p>
                </div>
              </div>

              {/* ID Card */}
              <UniversityCard path={user.university_card} />
            </CardContent>
          </Card>
        </div>

        {/* Borrowed Books Section */}
        <div>
          <h2 className="mb-6 text-xl font-semibold text-white">
            Borrowed books
          </h2>
          <BorrowedBooks borrowedBooks={borrowedBooks} />
        </div>
      </div>
    </div>
  );
}
