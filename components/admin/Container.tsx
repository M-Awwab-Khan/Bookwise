import Link from "next/link";
import { ReactNode } from "react";

export const Container = ({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: ReactNode;
}) => {
  return (
    <div className="bg-white p-4 rounded-xl space-y-3.5 shadow- shadow-slate-500">
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-semibold text-dark-400">{title}</h5>
        <Link
          className="font-semibold text-sm text-primary-admin px-2 py-3 rounded-md bg-light-300"
          href={`/admin/${href}`}
        >
          View all
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};
