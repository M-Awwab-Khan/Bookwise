import TableWrapper from "@/components/admin/TableWrapper";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import type { AccountRequests } from "@/types";
import React from "react";

const AccountRequests = async () => {
  let allRequests = null;

  try {
    allRequests = (await db
      .select({
        id: users.id,
        info: {
          name: users.fullname,
          email: users.email,
        },
        universityId: users.universityId,
        status: users.status,
        dateJoined: users.createdAt,
        universityCard: users.universityCard,
      })
      .from(users)) as AccountRequests[];
  } catch (error) {
    return null;
  }

  return (
    <div>
      <TableWrapper data={allRequests} type="AccountRequests" />
    </div>
  );
};

export default AccountRequests;
