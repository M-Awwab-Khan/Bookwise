"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import { UserNav } from "./UserNav";
import { useSession } from "next-auth/react";

const Header = ({ session }: { session: Session }) => {
  console.log(session);
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
        {session?.user?.role === "ADMIN" && (
          <li>
            <Link
              href="/admin"
              className={cn(
                "text-base cursor-pointer capitalize",
                pathname === "/about" ? "text-light-200" : "text-light-100"
              )}
            >
              Admin
            </Link>
          </li>
        )}
        <li>
          <UserNav session={session} />
        </li>
      </ul>
    </header>
  );
};

export default Header;
