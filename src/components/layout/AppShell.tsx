
import { Outlet } from "react-router-dom";
import { MainNav } from "./MainNav";
import { Toaster } from "@/components/ui/toaster";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AppShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <ScrollArea className="flex-1">
        <Outlet />
      </ScrollArea>
      <Toaster />
    </div>
  );
}
