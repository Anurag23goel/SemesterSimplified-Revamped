"use client";
import { RootState } from "@/app/redux/Store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function NavItem({
  icon,
  label,
  active,
  team,
}: {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  team?: boolean;
}) {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <>
      {label === "Home" ? (
        <>
          <Link
            href={`/user/${user?._id}`}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
              active
                ? "bg-indigo-100 text-indigo-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {icon && <span className="mr-3">{icon}</span>}
            <span
              className={
                team
                  ? "text-lg font-semibold text-gray-500"
                  : "text-lg font-semibold"
              }
            >
              {label}
            </span>
          </Link>
        </>
      ) : (
        <>
          <Link
            href={`/user/${user?._id}/${label}`}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
              active
                ? "bg-indigo-100 text-indigo-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {icon && <span className="mr-3">{icon}</span>}
            <span
              className={
                team
                  ? "text-lg font-semibold text-gray-500"
                  : "text-lg font-semibold"
              }
            >
              {label}
            </span>
          </Link>
        </>
      )}
    </>
  );
}
