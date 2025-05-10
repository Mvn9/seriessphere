
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Tv, LayoutDashboard, Sparkles, Users, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Watchlists", icon: LayoutDashboard },
  { href: "/recommendations", label: "Recommendations", icon: Sparkles },
  { href: "/clubs", label: "Clubs", icon: Users },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary hover:text-primary/90 group-data-[collapsible=icon]:hidden">
          <Tv className="h-6 w-6" />
          <span>Series Sphere</span>
        </Link>
         <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary hover:text-primary/90 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center hidden">
           <Tv className="h-6 w-6" />
         </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                  )}
                  tooltip={{ children: item.label, side: "right", className: "bg-card text-card-foreground border shadow-md" }}
                >
                  <a>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="w-full justify-start"
              tooltip={{ children: "Settings", side: "right", className: "bg-card text-card-foreground border shadow-md" }}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="w-full justify-start"
              tooltip={{ children: "Log Out", side: "right", className: "bg-card text-card-foreground border shadow-md" }}
            >
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
