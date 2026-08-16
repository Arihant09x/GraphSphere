"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, X } from "lucide-react";

import { SearchResults } from "@/components/search/SearchResults";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/useSearch";
import { cn } from "@/lib/utils";

function useDebouncedValue(value: string, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search graph...",
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const debouncedValue = useDebouncedValue(value, 350);
  const searchQuery = useSearch(debouncedValue);

  const handleChange = (next: string) => {
    onChange(next);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          placeholder={placeholder}
          className="h-11 rounded-xl border-white/10 bg-slate-900/80 pl-9 pr-9 text-sm text-white placeholder:text-slate-400"
        />
        {value ? (
          <button
            type="button"
            onClick={() => handleChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {debouncedValue.trim().length >= 2 ? (
        <div className="mt-3 rounded-xl border border-white/10 bg-slate-950/80 p-3">
          {searchQuery.isLoading ? (
            <div className="flex items-center justify-center gap-2 py-4 text-sm text-slate-300">
              <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
              Searching graph...
            </div>
          ) : (
            <SearchResults
              results={searchQuery.data}
              isLoading={searchQuery.isLoading}
              isError={searchQuery.isError}
              onSelect={() => {
                handleChange("");
              }}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
