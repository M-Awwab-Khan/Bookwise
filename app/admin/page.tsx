import React from "react";
import Image from "next/image";
import Link from "next/link";

const AdminDashboard = () => {
  return (
    <div className="flex-1 space-y-8 pt-6">
      {/* stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex flex-col justify-between rounded-lg border bg-card p-6 h-[130px]">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-muted-foreground">
              Borrowed Books
            </h3>
            <span className="text-sm flex items-center justify-center gap-1 text-red-500 font-bold">
              <Image
                src="/icons/admin/caret-down.svg"
                alt="up"
                width={15}
                height={15}
              />
              2
            </span>
          </div>
          <p className="text-3xl font-bold">145</p>
        </div>
        <div className="flex flex-col justify-between rounded-lg border bg-card p-6 h-[130px]">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-muted-foreground">
              Total Users
            </h3>
            <span className="text-sm flex items-center justify-center gap-1 text-green-500 font-bold">
              <Image
                src="/icons/admin/caret-up.svg"
                alt="up"
                width={15}
                height={15}
              />
              10
            </span>
          </div>
          <p className="text-3xl font-bold">283</p>
        </div>
        <div className="flex flex-col justify-between rounded-lg border bg-card p-6 h-[130px]">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-muted-foreground">
              Total Books
            </h3>
            <span className="text-sm flex items-center justify-center gap-1 text-red-500 font-bold">
              <Image
                src="/icons/admin/caret-down.svg"
                alt="up"
                width={15}
                height={15}
              />
              2
            </span>
          </div>
          <p className="text-3xl font-bold">120</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Column 1: Borrow requests and Account requests */}
        <div className="space-y-4">
          {/* borrow requests */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center justify-between p-6">
              <h3 className="font-semibold text-xl">Borrow Requests</h3>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                View all
              </a>
            </div>
            <div className="space-y-4 p-6 pt-0">
              {[
                {
                  title: "Inside Evil: Inside Evil Series, Book 1",
                  author: "Rachel Hong",
                  genre: "Strategic Fantasy",
                  date: "12/04/24",
                  user: "Daniel Steward",
                },
                {
                  title: "Jayne Castle - People in Glass Houses",
                  author: "Rachel Hong",
                  genre: "Strategic Fantasy",
                  date: "12/01/24",
                  user: "Daniel Steward",
                },
              ].map((book) => (
                <div
                  key={book.title}
                  className="flex items-start gap-4 bg-light-300 rounded-lg p-4"
                >
                  <div className="h-16 w-12 bg-muted rounded">
                    <Image
                      src="https://placehold.co/64x96"
                      alt={book.title}
                      width={64}
                      height={96}
                      className="rounded object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium leading-none">{book.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      By {book.author} • {book.genre}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                        {book.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {book.date}
                      </span>
                    </div>
                  </div>
                  <button className="rounded-full h-6 w-6 border border-input">
                    ⋮
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* account requests */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center justify-between p-6">
              <h3 className="font-semibold text-xl">Account Requests</h3>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                View all
              </a>
            </div>
            <div className="p-6 pt-0">
              <div className="grid gap-6 grid-cols-3">
                {[
                  {
                    name: "Marc Atanson",
                    email: "marcatanson@gmail.com",
                    initials: "MA",
                  },
                  {
                    name: "Susan Drake",
                    email: "susan@outlook.com",
                    initials: "SD",
                  },
                  {
                    name: "Ronald Richards",
                    email: "ronald.richards@gmail.com",
                    initials: "RR",
                  },
                ].map((user) => (
                  <div
                    key={user.name}
                    className="flex flex-col text-center items-center gap-4 bg-light-300 rounded-lg p-4"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold">
                      {user.initials}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium leading-none">
                        {user.name}
                      </h4>
                      <p className="text-sm text-muted-foreground truncate max-w-[130px]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Recently added books */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between p-6 pb-0">
            <h3 className="font-semibold text-xl">Recently Added Books</h3>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              View all
            </a>
          </div>
          <div className="space-y-5 p-6 pt-0">
            <Link href="/admin/books/new">
              <div className="add-new-book_btn">
                <div className="">
                  <Image
                    src="/icons/admin/plus.svg"
                    alt="add book"
                    height={20}
                    width={20}
                  />
                </div>
                <p className="font-semibold text-lg text-dark-400">
                  Add New Book
                </p>
              </div>
            </Link>
            {[
              {
                title: "Inside Evil: Inside Evil Series, Book 1",
                author: "Rachel Hong",
                genre: "Strategic Fantasy",
                date: "12/04/24",
                user: "Daniel Steward",
              },
              {
                title: "Jayne Castle - People in Glass Houses",
                author: "Rachel Hong",
                genre: "Strategic Fantasy",
                date: "12/01/24",
                user: "Daniel Steward",
              },
            ].map((book) => (
              <div key={book.title} className="flex items-start gap-4">
                <div className="h-16 w-12 bg-muted rounded">
                  <Image
                    src="https://placehold.co/64x96"
                    alt={book.title}
                    width={64}
                    height={96}
                    className="rounded object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium leading-none">{book.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    By {book.author} • {book.genre}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                      {book.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {book.date}
                    </span>
                  </div>
                </div>
                <button className="rounded-full h-6 w-6 border border-input">
                  ⋮
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
