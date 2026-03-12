import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Library, Settings } from "lucide-react";
import { SidebarNav } from "./sidebar-nav";
import { PlayerBar } from "@/components/player/player-bar";
import { QueueSidebar } from "@/components/player/queue-sidebar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <SidebarNav />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <QueueSidebar />
      </div>
      <PlayerBar />
      {/* Mobile bottom nav — only visible on small screens */}
      <MobileNav />
    </div>
  );
}

const MOBILE_NAV = [
  { to: "/", label: "Library", icon: Library },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function MobileNav() {
  return (
    <nav className="flex shrink-0 border-t border-border bg-card sm:hidden">
      {MOBILE_NAV.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            cn(
              "flex flex-1 flex-col items-center gap-0.5 py-2 text-xs transition-colors",
              isActive ? "text-primary" : "text-muted-foreground",
            )
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
