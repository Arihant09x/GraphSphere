"use client";

import { Menu, Search, UserCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header({
  title,
  onMenuClick,
  search,
  userName,
}: {
  title: string;
  onMenuClick?: () => void;
  search?: React.ReactNode;
  userName?: string;
}) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-slate-950/50 px-4 backdrop-blur-md lg:px-6">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Workspace
          </p>
          <h1 className="text-lg font-semibold text-white">{title}</h1>
        </div>
      </div>

      <div className="hidden flex-1 justify-center px-6 lg:flex">
        {search ? <div className="w-full max-w-xl">{search}</div> : null}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-300 sm:flex">
          <UserCircle2 className="h-4 w-4 text-cyan-400" />
          <span>{userName ?? "Explorer"}</span>
        </div>
      </div>
    </header>
  );
}
