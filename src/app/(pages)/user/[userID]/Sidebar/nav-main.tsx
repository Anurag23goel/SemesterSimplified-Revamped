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
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/Store";

export function NavMain({
  items,
}: {
  items: { title: string; url: string; icon: LucideIcon }[];
}) {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="mt-2">
        <div className="flex flex-col w-full gap-1">
          <span className="text-black text-2xl font-fancy font-semibold">
            My Space
          </span>
          <span className="bg-black h-[3px] w-full"></span>
        </div>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={`/user/${user?._id}/${item.url}`}>
                <item.icon />
                <span className="truncate text-lg">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
