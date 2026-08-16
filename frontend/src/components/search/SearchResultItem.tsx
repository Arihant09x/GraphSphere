import { ChevronRight, Cpu, Folder, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { GraphEntity } from "@/types/api";

export function SearchResultItem({
  item,
  onSelect,
}: {
  item: GraphEntity;
  onSelect: (item: GraphEntity) => void;
}) {
  const properties =
    item.properties &&
    typeof item.properties === "object" &&
    !Array.isArray(item.properties)
      ? (item.properties as Record<string, unknown>)
      : {};
  const type = String(item.type ?? properties.type ?? "node").toLowerCase();
  const displayName = String(item.name ?? properties.name ?? "Untitled");
  const subtypeText =
    typeof item.headline === "string"
      ? item.headline
      : typeof item.category === "string"
        ? item.category
        : typeof item.description === "string"
          ? item.description
          : typeof properties.headline === "string"
            ? properties.headline
            : typeof properties.category === "string"
              ? properties.category
              : type;

  const Icon =
    type === "developer"
      ? User
      : type === "project"
        ? Folder
        : type === "technology"
          ? Cpu
          : Folder;

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-100 dark:hover:bg-white/5"
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg",
          type === "developer"
            ? "bg-cyan-400/10 text-cyan-400"
            : type === "project"
              ? "bg-indigo-400/10 text-indigo-400"
              : "bg-emerald-400/10 text-emerald-400",
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-900 dark:text-white">
          {displayName}
        </p>
        <p className="truncate text-xs text-slate-500">{subtypeText}</p>
      </div>

      <Badge
        variant="outline"
        className="hidden text-[10px] capitalize sm:inline-flex"
      >
        {type}
      </Badge>
      <ChevronRight className="h-4 w-4 text-slate-400" />
    </button>
  );
}
