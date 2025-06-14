"use client"; // Mark as Client Component
import { usePathname } from "next/navigation"; // Import usePathname hook from next/navigation
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/Store";
import Link from "next/link";

export default function NavItem({
  icon,
  label,
  team,
  urllink,
}: {
  icon?: React.ReactNode;
  label: string;
  team?: boolean;
  urllink?: string;
}) {
  const { user } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname(); // Get the current path using usePathname

  const activeLink = urllink ? pathname.includes(urllink) : false;

  return (
    <Link
      href={`/user/${user?._id}/${urllink}`} // Build the dynamic URL
      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
        activeLink
          ? "bg-indigo-100 text-indigo-600" // Active link styling
          : "text-gray-700 hover:bg-gray-100" // Default styling
      }`}
    >
      {icon && <span className="mr-3">{icon}</span>}
      <span
        className={
          team ? "text-lg font-semibold text-gray-500" : "text-lg font-semibold"
        }
      >
        {label}
      </span>
    </Link>
  );
}
