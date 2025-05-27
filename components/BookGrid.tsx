import { Button } from "@/components/ui/button";
import BookCard2 from "./BookCard2";
import { getRecommendedBooks } from "@/lib/actions/book";
import { Book } from "@/types";

export default async function YouMightLikeBooks({
  userId,
}: {
  userId: string;
}) {
  const [recommendations] = await Promise.all([getRecommendedBooks(userId)]);
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-bebas-neue text-4xl text-light-100 my-6">
          You Might Like
        </h2>
        <p className="text-light-100 max-w-2xl mx-auto">
          Discover your next favorite read with our personalized recommendations
          based on your reading history and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {recommendations.map((book: Book, index: number) => (
          <BookCard2 key={book.id} book={book} userId={userId} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Button
          variant="outline"
          size="lg"
          className="bg-dark-300 text-light-100 border-dark-100 hover:bg-dark-600"
        >
          View More Recommendations
        </Button>
      </div>
    </section>
  );
}
