import { Button } from "@/components/ui/button";
import Image from "next/image";

interface EmptyStateProps {
  searchTerm: string;
}

export function EmptyState({ searchTerm }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 w-full mx-auto text-center">
      <Image
        src={"/images/no-books.png"}
        width={200}
        height={200}
        alt="NO books found"
      />
      <h2 className="my-4 text-xl font-semibold text-white">
        No Results Found
      </h2>
      <p className="mb-6 text-center text-gray-400">
        We couldn't find any books matching your search.
        <br />
        Try using different keywords or check for typos.
      </p>
    </div>
  );
}
