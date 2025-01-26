"use client";
import React from "react";
import { IKImage } from "imagekitio-next";
import { config } from "@/lib/config";

const UniversityCard = ({ path }: { path: string }) => {
  return (
    <IKImage
      path={path}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      alt="University ID Card"
      className="rounded-sm object-fill"
      width={400}
      height={200}
      loading="lazy"
      lqip={{ active: true }}
    />
  );
};

export default UniversityCard;
