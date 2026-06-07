import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Bell, Search } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Props {
  role: "Patient" | "Physiotherapist";
  userName: string;
  nav: NavItem[];
  children: ReactNode;
}

export function DashboardShell({ role, userName, nav, children }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex w-full bg-background">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="px-6 py-6 flex items-center gap-2">
          <div className="size-9 rounded-xl bg-[image:var(--gradient-hero)] grid place-items-center text-primary-foreground">
            <Activity className="size-5" />
          </div>
          <div>
            <p className="font-display font-bold text-sidebar-foreground leading-tight">
              TeleFisioRehab
            </p>
            <p className="text-[11px] text-muted-foreground">Home Rehab Platform</p>
          </div>
        </div>

        <div className="px-3 mt-2">
          <p className="px-3 text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            {role} Menu
          </p>
          <nav className="flex flex-col gap-1">
            {nav.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-[var(--shadow-soft)]"
                      : "text-sidebar-foreground hover:bg-sidebar-accent",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-xl bg-[image:var(--gradient-soft)] p-4 border border-sidebar-border">
            <p className="text-xs font-semibold text-sidebar-foreground">Switch role</p>
            <div className="mt-2 flex gap-2">
              <Link
                to="/patient"
                className="text-xs rounded-md px-2 py-1 bg-card text-card-foreground border"
              >
                Patient
              </Link>
              <Link
                to="/therapist"
                className="text-xs rounded-md px-2 py-1 bg-card text-card-foreground border"
              >
                Therapist
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-4 md:px-8 border-b border-border bg-card/60 backdrop-blur flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search exercises, patients…"
                className="w-full h-10 pl-9 pr-3 rounded-lg bg-muted text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="size-10 rounded-lg grid place-items-center bg-muted hover:bg-secondary transition-colors relative">
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-2 rounded-full bg-accent" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l">
              <div className="size-9 rounded-full bg-[image:var(--gradient-hero)] grid place-items-center text-primary-foreground text-sm font-semibold">
                {userName.charAt(0)}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold leading-tight">{userName}</p>
                <p className="text-[11px] text-muted-foreground">{role}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
