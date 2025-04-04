import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import {
  BellIcon,
  MessageCircleIcon,
  UserRoundIcon,
  LogOutIcon,
  ChevronDownIcon,
  MenuIcon,
  XIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

export function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { title: "儀表板", titleEn: "Dashboard", path: "/dashboard" },
    { title: "旅客管理", titleEn: "Guests", path: "/guests" },
    { title: "訂房記錄", titleEn: "Bookings", path: "/bookings" },
    { title: "行銷活動", titleEn: "Marketing", path: "/marketing" },
    { title: "報表分析", titleEn: "Reports", path: "/reports" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </Button>
          )}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded-xl p-1.5">
              <img 
                src="/lovable-uploads/0a2d2d46-ff14-4cc1-85bf-51c1b314de18.png" 
                alt="Stay Savvy Logo" 
                className="w-8 h-8"
              />
            </div>
            <span className="hidden md:inline-block font-bold text-lg">Stay Savvy</span>
          </NavLink>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative transition-colors hover:text-foreground text-base font-medium ${
                  isActive
                    ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:w-full after:translate-y-1 after:rounded-full after:bg-primary"
                    : "text-muted-foreground"
                }`
              }
            >
              <span className="flex flex-col items-center text-xs md:text-sm">
                <span>{item.title}</span>
                <span className="text-xs opacity-60">{item.titleEn}</span>
              </span>
            </NavLink>
          ))}
        </nav>

        {isMobile && mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-input z-50 md:hidden animate-fade-in">
            <nav className="container py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-4 my-1 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent/50"
                    }`
                  }
                >
                  <div className="flex justify-between">
                    <span>{item.title}</span>
                    <span className="text-xs opacity-60 self-center">{item.titleEn}</span>
                  </div>
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Notifications">
            <BellIcon className="h-5 w-5" />
            <Badge className="absolute top-0 right-0 h-4 w-4 p-0 flex items-center justify-center" variant="destructive">
              3
            </Badge>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Messages">
            <MessageCircleIcon className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full flex items-center gap-2 pl-2 pr-4 h-9">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block text-sm">櫃台人員</span>
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>櫃台人員</span>
                  <span className="text-xs text-muted-foreground">Front Desk</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserRoundIcon className="mr-2 h-4 w-4" />
                <span>個人資料</span>
                <span className="ml-auto text-xs text-muted-foreground">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>登出</span>
                <span className="ml-auto text-xs text-muted-foreground">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
