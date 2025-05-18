import React from 'react';
import Image from 'next/image';
import BookCover from './BookCover';
import Link from 'next/link';
import { darkenColor } from '@/lib/utils';
import DueDate from './DueDate';

interface Props {
  id: string;
  coverUrl: string;
  coverColor: string;
  title: string;
  genre: string;
  dueDate: string;
  createdAt: Date;
}

const BorrowedBook = ({
  id,
  coverColor,
  coverUrl,
  title,
  genre,
  dueDate,
  createdAt,
}: Props) => {
  return (
    <li className="bg-dark-500 p-5 pt-0 m-0 rounded-2xl relative">
      <Link href={`/books/${id}`} className="space-y-5">
        <div
          className="px-6 py-12 flex justify-center items-center rounded-md w-60"
          style={{
            backgroundColor: darkenColor(coverColor, 60), // Darken the coverColor
          }}
        >
          <BookCover coverColor={coverColor} coverImage={coverUrl} />
        </div>
        <div className="">
          <p className="book-title w-60">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>
        <div className="mt-3 w-full space-y-2">
          <div className="flex gap-1 items-center">
            <Image
              src="/icons/book-borrowed-date.svg"
              alt="borrowed date"
              width={18}
              height={18}
            />
            <p className="text-light-100 text-base">Borrowed on Dec 31</p>
          </div>
          <div className="flex justify-between">
            <DueDate createdAt={createdAt} dueDate={dueDate} />

            <div className="rounded-sm bg-[#8B384870] w-7 h-7 flex justify-center items-center">
              {/* TODO: Write receipt downloading logic */}
              <Image
                src="/icons/receipt.svg"
                alt="borrowed date"
                width={18}
                height={18}
              />
            </div>
          </div>
        </div>
      </Link>
      {/* <Image
        src="/icons/caution-alert.svg"
        alt="caution"
        width={29}
        height={29}
        className="absolute -top-0.5 -left-0.5"
      /> */}
    </li>
  );
};

export default BorrowedBook;