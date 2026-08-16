"use client";

import { LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function UserMenu() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-300 md:flex">
        <User className="h-4 w-4 text-cyan-400" />
        <span>{user?.name ?? "Explorer"}</span>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => {
          logout();
          router.push("/login");
        }}
        aria-label="Logout"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
