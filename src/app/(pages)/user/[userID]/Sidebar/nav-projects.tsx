"use client";
import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/Store";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="">
        <div className="flex flex-col w-full gap-1">
          <span className="text-black text-2xl font-fancy font-semibold">
            Socials
          </span>
          <span className="bg-black h-[3px] rounded-full w-full"></span>
        </div>
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={`/user/${user?._id}/${item.url}`}>
                <item.icon />
                <span className="truncate text-lg">{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
