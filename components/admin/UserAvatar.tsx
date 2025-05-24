"use client";

import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { generateBgColor, getInitials } from "@/lib/utils";

const UserAvatar = ({
  name,
  containerStyle,
}: {
  name: string;
  containerStyle?: string;
}) => {
  const bgColor = generateBgColor(name);

  return (
    <Avatar className={containerStyle}>
      <AvatarFallback className={`font-semibold ${bgColor}`}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
