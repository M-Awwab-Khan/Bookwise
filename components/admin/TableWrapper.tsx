"use client";

import React, { useMemo, useState } from "react";
import ColumnSorter from "./ColumnSorter";
import { Button } from "../ui/button";
import Link from "next/link";
import { DataTable } from "./DataTable";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  AccountsColumns,
  bookRequestsColumns,
  booksColumns,
  usersColumns,
} from "./Columns";
import { AccountRequests, BookRequests, TableBook, TableUser } from "@/types";
import { useSearchStore } from "@/store/searchStore";
interface TableProps<T> {
  data: T[];
  type: "Books" | "Users" | "AccountRequests" | "BookRequests";
}

const TableWrapper = <
  T extends TableBook | TableUser | AccountRequests | BookRequests
>({
  data,
  type,
}: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const query = useSearchStore((state) => state.query);

  // Filter books based on the query
  const filteredData = useMemo(() => {
    return data.filter((each) => {
      const params =
        type === "Users"
          ? `${(each as TableUser).info.name} ${(each as TableUser).info.email}`
          : type === "AccountRequests"
          ? `${(each as AccountRequests).dateJoined}`
          : type === "BookRequests"
          ? `${(each as BookRequests).userInfo.name} ${
              (each as BookRequests).userInfo.email
            } ${(each as BookRequests).bookInfo.title} ${
              (each as BookRequests).bookInfo.id
            }`
          : `${(each as TableBook).info.title} ${(each as TableBook).author} ${
              (each as TableBook).genre
            }`;

      return params.toLowerCase().includes(query?.toLowerCase());
    });
  }, [data, query]);

  const table = useReactTable({
    data: filteredData, // Use filtered books
    columns: (type === "Users"
      ? usersColumns
      : type === "Books"
      ? booksColumns
      : type === "AccountRequests"
      ? AccountsColumns
      : bookRequestsColumns) as ColumnDef<T, any>[],
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between mb-5 gap-2">
        <h2 className="text-xl font-semibold">
          {type === "AccountRequests" ? (
            "Account Registration Requests"
          ) : type === "BookRequests" ? (
            "Borrow Book Requests"
          ) : (
            <>
              <span>All </span>
              {type}
            </>
          )}
        </h2>

        <div className="space-x-5">
          <ColumnSorter type={type} table={table} />
          {type === "Books" && (
            <Button
              className="bg-primary-admin hover:bg-primary-admin/75"
              asChild
            >
              <Link href="/admin/books/new" className="text-white ">
                + Create a New Book
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="w-full">
        <DataTable table={table} columns={table.getAllColumns()} />
        {filteredData.length > 10 && (
          <div className="flex items-center justify-end space-x-2 py-4 ">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TableWrapper;
