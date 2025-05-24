import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/EmptyState";
import BookCard from "@/components/BookCard";
import { fetchBooksPages, searchBooks } from "@/lib/actions/book";
import SearchBook from "@/components/Search";
import CustomPagination from "@/components/CustomPagination";

export default async function SearchPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const [{ data: booksData }, totalPages] = await Promise.all([
    searchBooks(query, currentPage),
    fetchBooksPages(query),
  ]);

  return (
    <>
      <div className="library">
        <SearchBook />
        {query && (
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Search Result for <span className="text-primary">{query}</span>
            </h2>
            <Select>
              <SelectTrigger className="w-[180px] bg-[#22263a] text-white">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fiction">Fiction</SelectItem>
                <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {query && booksData.length === 0 ? (
          <EmptyState searchTerm={query} />
        ) : (
          <>
            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {booksData.map((book) => (
                <BookCard key={book.id} {...book} size="medium" />
              ))}
            </div>

            <CustomPagination totalPages={totalPages} />
          </>
        )}
      </div>
    </>
  );
}
