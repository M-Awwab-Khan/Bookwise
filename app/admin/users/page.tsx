import TableWrapper from "@/components/admin/TableWrapper";
import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";
import { TableUser } from "@/types";
import { eq, sql } from "drizzle-orm";
import React from "react";

const Users = async () => {
  const allUsers = (await db
    .select({
      id: users.id,
      info: {
        name: users.fullname,
        email: users.email,
      },
      universityId: users.universityId,
      role: users.role,
      dateJoined: users.createdAt,
      universityCard: users.universityCard,
      booksBorrowed:
        sql<number>`COALESCE(COUNT(${borrowRecords.id}), 0)::int`.as(
          "booksBorrowed"
        ),
    })
    .from(users)
    .leftJoin(borrowRecords, eq(borrowRecords.userId, users.id))
    .groupBy(users.id)) as TableUser[];

  return (
    <div>
      <TableWrapper data={allUsers} type="Users" />
    </div>
  );
};

export default Users;
