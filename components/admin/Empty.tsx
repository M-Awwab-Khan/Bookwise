import React from "react";
import Image from "next/image";

const Empty = ({
  type,
}: {
  type: "latestBooks" | "bookRequests" | "accounts";
}) => {
  return (
    <div className="mb-16">
      <div className="space-y-5 w-fit mx-auto">
        <Image
          src={
            type === "latestBooks" || type === "bookRequests"
              ? "/icons/admin/no-book.svg"
              : "/icons/admin/no-account.svg"
          }
          alt="No book"
          width={193}
          height={144}
          className="mx-auto my-5"
        />

        <div className="text-center space-y-1.5">
          <h4 className="font-semibold text-base text-dark-400">
            No Pending{" "}
            {type === "bookRequests"
              ? "Book Requests"
              : type === "latestBooks"
              ? "Book"
              : "Account Requests"}
          </h4>
          <p className="text-sm text-gray-400">
            {type === "bookRequests"
              ? "There are no borrow book requests awaiting your review at this time."
              : type === "latestBooks"
              ? "There are no added book at this time."
              : "There are currently no account requests awaiting approval."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Empty;
