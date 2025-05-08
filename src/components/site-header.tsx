"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "./avatar-menu";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
export function SiteHeader() {
  const pathname = usePathname();

  const routeTitleMap: Record<string, string> = {
    "/": "Dashboard",
    "/users": "Users",
    "/products": "Products",
    "/settings": "Settings",
    "/orders": "Orders",
    // Add more as needed
  };

  const currentTitle = routeTitleMap[pathname] ?? "Page";

  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear bg-[#123524] text-white">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{currentTitle}</h1>
        <NavUser
          user={{
            name: "",
            email: "",
            avatar: "",
          }}
        />
      </div>
    </header>
  );
}
