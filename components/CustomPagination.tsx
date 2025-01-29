"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

const CustomPagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    // Previous button
    items.push(
      <PaginationItem
        key="prev"
        className="bg-dark-300 rounded-sm text-light-100"
      >
        <PaginationPrevious
          href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
          aria-disabled={currentPage === 1}
        />
      </PaginationItem>
    );

    // Calculate range of pages to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      items.push(
        <PaginationItem
          key={1}
          className="bg-dark-300 rounded-sm text-light-100"
        >
          <PaginationLink href={createPageURL(1)}>{1}</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem
            key="ellipsis1"
            className="bg-dark-300 rounded-sm text-light-100"
          >
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Page numbers
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem
          key={page}
          className={`${
            currentPage === page
              ? "bg-primary text-dark-300"
              : "bg-dark-300 text-light-100"
          } rounded-sm`}
        >
          <PaginationLink
            href={createPageURL(page)}
            isActive={currentPage === page}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem
            key="ellipsis2"
            className="bg-dark-300 rounded-sm text-light-100"
          >
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem
          key={totalPages}
          className="bg-dark-300 rounded-sm text-light-100"
        >
          <PaginationLink href={createPageURL(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem
        key="next"
        className="bg-dark-300 rounded-sm text-light-100"
      >
        <PaginationNext
          href={currentPage < totalPages ? createPageURL(currentPage + 1) : "#"}
          aria-disabled={currentPage === totalPages}
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <Pagination className="mt-6">
      <PaginationContent>{renderPaginationItems()}</PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
