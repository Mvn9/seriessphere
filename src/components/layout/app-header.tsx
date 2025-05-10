
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tv } from "lucide-react";
import Link from 'next/link';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary hover:text-primary/90">
        <Tv className="h-6 w-6" />
        <span>Series Sphere</span>
      </Link>
      {/* Future elements like UserMenu can be added here */}
    </header>
  );
}
