"use client";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchBook = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="mb-12 text-center">
      <p className="library-subtitle">DISCOVER YOUR NEXT GREAT READ:</p>
      <h1 className="library-title">
        Explore and Search for
        <br />
        <span className="text-[#C8A573]">Any Book</span> In Our Library
      </h1>
      <div className="relative mx-auto max-w-xl mt-10">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Thriller Mystery"
          onChange={(e) => handleSearch(e.target.value)}
          className="h-12 bg-[#22263a] pl-10 text-white placeholder:text-gray-400 border-0"
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>
    </div>
  );
};

export default SearchBook;
