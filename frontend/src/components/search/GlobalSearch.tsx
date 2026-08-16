"use client";
import { useState } from "react";
import {
  Search as SearchIcon,
  X,
  User,
  Folder,
  Cpu,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { GraphEntity } from "@/types/api";

interface GlobalSearchProps {
  onSelect: (entity: GraphEntity) => void;
  className?: string;
}

export function GlobalSearch({ onSelect, className }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: results, isLoading, isError } = useSearch(query);

  const handleSelect = (entity: GraphEntity) => {
    onSelect(entity);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search developers, projects, technologies..."
          className="h-10 w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-white/10 dark:bg-slate-900"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && query.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-slate-900"
          >
            {isLoading ? (
              <div className="flex items-center justify-center p-8 text-sm text-slate-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-cyan-400" />
                Searching graph...
              </div>
            ) : isError ? (
              <div className="p-4 text-center text-sm text-rose-500">
                Unable to search right now.
              </div>
            ) : results && results.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto">
                {results.map((item) => (
                  <SearchResultItem
                    key={item.id}
                    item={item}
                    onClick={() => handleSelect(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-sm text-slate-500">
                No matching nodes found.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SearchResultItem({
  item,
  onClick,
}: {
  item: GraphEntity;
  onClick: () => void;
}) {
  const properties =
    item.properties &&
    typeof item.properties === "object" &&
    !Array.isArray(item.properties)
      ? (item.properties as Record<string, unknown>)
      : {};
  const type = String(item.type ?? properties.type ?? "node").toLowerCase();
  const displayName = String(item.name ?? properties.name ?? "Untitled");
  const iconMap: Record<string, typeof User> = {
    developer: User,
    project: Folder,
    technology: Cpu,
  };
  const Icon = iconMap[type] ?? SearchIcon;

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-slate-100 dark:hover:bg-white/5"
    >
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg",
          type === "developer"
            ? "bg-cyan-400/10 text-cyan-400"
            : type === "project"
              ? "bg-indigo-400/10 text-indigo-400"
              : "bg-emerald-400/10 text-emerald-400",
        )}
      >
        <Icon size={16} />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="font-medium text-slate-900 dark:text-white truncate">
          {displayName}
        </p>
        <p className="text-xs text-slate-500 truncate">
          {typeof item.headline === "string"
            ? item.headline
            : typeof item.category === "string"
              ? item.category
              : typeof item.description === "string"
                ? item.description
                : String(type || "")}
        </p>
      </div>
      <Badge variant="outline" className="ml-2 capitalize text-[10px]">
        {type}
      </Badge>
      <ChevronRight size={14} className="ml-2 text-slate-400" />
    </button>
  );
}
