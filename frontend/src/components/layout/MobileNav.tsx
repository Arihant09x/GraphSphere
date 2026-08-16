"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cpu, FolderCode, LayoutDashboard, Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const items = [
  { href: "/explorer", label: "Explorer", icon: LayoutDashboard },
  { href: "/explorer?view=developers", label: "Developers", icon: Users },
  { href: "/explorer?view=projects", label: "Projects", icon: FolderCode },
  { href: "/explorer?view=technologies", label: "Technologies", icon: Cpu },
];

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm lg:hidden">
      <div className="h-full w-72 border-r border-white/10 bg-slate-950 p-4">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-semibold text-white">GraphSphere</span>
          <Button type="button" variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="space-y-2">
          {items.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white",
                pathname === "/explorer" && href === "/explorer"
                  ? "bg-white/10 text-white"
                  : "",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
