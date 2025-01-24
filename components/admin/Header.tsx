import { Search } from "lucide-react";
import { Session } from "next-auth";
import React from "react";
import { Input } from "../ui/input";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-dark-400 font-semibold text-2xl">
          {session?.user?.name}
        </h2>
        <p className="text-base-text-slate-500">
          Monitor all of your users and books here
        </p>
      </div>
      <div className="relative w-[400px]">
        <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users, books by title, author, or genre"
          className="w-full rounded-md border border-input pl-12 text-sm bg-background h-14"
        />
      </div>
    </header>
  );
};

export default Header;
