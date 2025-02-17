"use client";

import { RootState } from "@/app/redux/Store";
import { Coins } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function UserCreds() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex items-centergap-2">
      <Image src="/coins.png" alt="Coins" width={20} height={20} className="object-contain" />
      {user?.freeCredits}
    </div>
  );
}
