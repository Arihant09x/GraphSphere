"use client";

import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  BrainCircuit,
  Cpu,
  FolderCode,
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Explorer",
    href: "/explorer",
    tab: null,
    icon: LayoutDashboard,
  },
  {
    name: "Developers",
    href: "/explorer?tab=developers",
    tab: "developers",
    icon: Users,
  },
  {
    name: "Projects",
    href: "/explorer?tab=projects",
    tab: "projects",
    icon: FolderCode,
  },
  {
    name: "Technologies",
    href: "/explorer?tab=technologies",
    tab: "technologies",
    icon: Cpu,
  },
];

export function Sidebar({
  className,
  close,
}: {
  className?: string;
  close?: () => void;
}) {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const activeTab = params.get("tab");

  const isCurrent = (tab: string | null) => {
    if (pathname !== "/explorer") {
      return false;
    }

    return tab === activeTab;
  };

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-slate-950 text-slate-400",
        className,
      )}
    >
      <div className="flex h-16 items-center px-6">
        <Link
          href="/explorer"
          onClick={close}
          className="flex items-center gap-2 text-white"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 text-slate-950">
            <BrainCircuit size={20} />
          </div>

          <span className="text-xl font-bold tracking-tight">GraphSphere</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = isCurrent(item.tab);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={close}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "hover:bg-white/5 hover:text-white",
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 shrink-0 transition-colors",
                    active ? "text-cyan-400" : "group-hover:text-white",
                  )}
                />

                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="mb-4 px-3">
          <p className="truncate text-sm font-medium text-white">
            {user?.name ?? "Explorer"}
          </p>

          <p className="truncate text-xs text-slate-500">
            {user?.email ?? "No email"}
          </p>
        </div>

        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-slate-400 hover:bg-white/5 hover:text-white"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun size={18} className="mr-3" />
            ) : (
              <Moon size={18} className="mr-3" />
            )}

            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-slate-400 hover:bg-white/5 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
