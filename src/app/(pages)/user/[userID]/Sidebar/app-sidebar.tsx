"use client";
import * as React from "react";
import {
  Bell,
  BookOpen,
  Inbox,
  LifeBuoy,
  Search,
  Send,
  Settings2,
  UserPlus,
  UsersIcon,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Search",
      url: "search",
      icon: Search,
    },
    {
      title: "Uploads",
      url: "uploads",
      icon: BookOpen,
    },
    {
      title: "My Account",
      url: "account",
      icon: Settings2,
    },
  ],
  socials: [
    {
      name: "Inbox",
      url: "inbox",
      icon: Inbox,
    },
    {
      name: "Community",
      url: "community",
      icon: UsersIcon,
    },
    {
      name: "Notifications",
      url: "notifications",
      icon: Bell,
    },
    {
      name: "Connections",
      url: "connections",
      icon: UserPlus,
    },
  ],
  navSecondary: [
    {
      title: "About Us",
      url: "about-us",
      icon: LifeBuoy,
    },
    {
      title: "Support",
      url: "support-us",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "feedback",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-12 border border-black items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Image
              src={"/mainlogo.jpeg"}
              alt="logo"
              width={1000}
              height={1000}
              className="h-full w-full rounded-md"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-lg">
              Semester Simplified
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.socials} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
