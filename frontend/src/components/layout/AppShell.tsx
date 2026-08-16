"use client";

import { useState } from "react";

import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { UserMenu } from "@/components/layout/UserMenu";
import { useAuth } from "@/hooks/useAuth";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-[#070b14] text-slate-100">
      <Sidebar className="hidden w-64 shrink-0 border-r border-white/10 lg:flex" />
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          title="Explorer"
          onMenuClick={() => setMobileOpen(true)}
          userName={user?.name ?? "Explorer"}
          search={<GlobalSearch onSelect={() => {}} className="w-full" />}
        />

        <div className="flex items-center justify-end border-b border-white/10 bg-slate-950/40 p-3 lg:hidden">
          <UserMenu />
        </div>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default AppShell;
