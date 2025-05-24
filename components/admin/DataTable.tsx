"use client";

import {
  ColumnDef,
  flexRender,
  Row,
  Table as TableType,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AccountRequests, BookRequests, TableBook, TableUser } from "@/types";

interface DataTableProps<
  TData extends TableBook | TableUser | AccountRequests | BookRequests,
  TValue
> {
  columns: ColumnDef<TData, TValue>[];
  table: TableType<TData>;
}

export function DataTable<
  TData extends TableBook | TableUser | AccountRequests | BookRequests,
  TValue
>({ columns, table }: DataTableProps<TData, TValue>) {
  // const handleClick = (row: Row<TData>) => {
  //   if ("info" in row.original && "title" in row.original.info) {
  //     window.location.href = `/admin/books/${row.original.id}`;
  //   }
  // };
  return (
    <div className="rounded-md">
      <Table>
        <TableHeader className="bg-light-300 text-dark-300 text-sm tracking-tight">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="border-none" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (header.column.id === "id") {
                  return null;
                }
                return (
                  <TableHead key={header.id} className="px-2.5 py-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-light-300 font-medium text-sm"
                data-state={row.getIsSelected() && "selected"}
                // onClick={() => handleClick(row)}
              >
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.id === "id") {
                    return null;
                  }
                  return (
                    <TableCell key={cell.id} className="px-2.5 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
