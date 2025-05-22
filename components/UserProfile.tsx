import React from "react";
import Profile from "./Profile";
import Image from "next/image";
import { User } from "@/types";

const UserProfile = ({
  fullName,
  email,
  universityId,
  universityCard,
  status,
  role,
}: User) => {
  return (
    <div className="space-y-9 w-full md:min-w-[450px] max-w-[700px] h-fit p-10 pt-24 bg-gradient-to-b from-[#232839] to-[#12141D] rounded-[20px] relative">
      <Image
        src="/icons/clip.svg"
        alt="clip"
        width={59}
        height={88}
        className="absolute -top-4 left-1/2 -translate-x-1/2"
      />
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-7 items-center text-light-100">
          <Image
            src="/images/profile.svg"
            alt="profile"
            width={99}
            height={99}
            className=""
          />
          <div className="space-y-2.5">
            <div className="flex gap-0.5">
              <Image
                src={
                  status === "APPROVED"
                    ? "/icons/success.svg"
                    : "/icons/alert.svg"
                }
                alt="status"
                width={13}
                height={13}
              />
              {/* Show status by role */}
              <small className="text-sm">
                {status === "APPROVED" ? "Verfied " : "Unverified "}
                {role && role[0] + role?.slice(1)?.toLowerCase()}
              </small>
            </div>
            <section className="space-y-2">
              <h4 className="text-white font-semibold text-2xl">
                {/* Pick only the first and last name */}
                {fullName.split(" ").slice(0, 2).join(" ")}
              </h4>
              <p className="text-lg">{email}</p>
            </section>
          </div>
        </div>

        <section className="space-y-1.5 text-white">
          <h4 className="text-light-100 text-lg">University</h4>
          <p className="font-semibold text-2xl">TechyForge</p>
        </section>
        <section className="space-y-1.5 text-white">
          <h4 className="text-light-100 text-lg">Student ID</h4>
          <p className="font-semibold text-2xl">{universityId}</p>
        </section>
      </div>
      <Profile universityCard={universityCard} />
    </div>
  );
};

export default UserProfile;
