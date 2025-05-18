import { auth } from '@/auth';
import { db } from '@/database/drizzle';
import { books, borrowRecords } from '@/database/schema';
import { eq } from 'drizzle-orm';
import React from 'react';
import BorrowedBook from './BorrowedBook';

const BorrowedBooksList = async () => {
  const session = await auth();

  if (!session || !session.user?.id) return;

  const borrowedBooks = await db
    .select()
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, session.user.id));

  if (borrowedBooks.length < 1) return;

  return (
    <div>
      <h2 className="font-bebas-neue text-4xl text-light-100 my-6">
        Borrowed Books
      </h2>

      <div className="flex flex-wrap gap-8 mt-6">
        {borrowedBooks.map(
          ({
            borrow_records: { createdAt, dueDate },
            books: { id, coverUrl, coverColor, title, genre },
          }) => (
            <BorrowedBook
              key={id}
              id={id}
              coverColor={coverColor}
              coverUrl={coverUrl}
              title={title}
              genre={genre}
              createdAt={createdAt as Date}
              dueDate={dueDate}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default BorrowedBooksList;