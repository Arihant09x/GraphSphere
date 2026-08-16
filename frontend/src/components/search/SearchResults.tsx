import { Loader2 } from "lucide-react";

import { SearchResultItem } from "@/components/search/SearchResultItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import type { GraphEntity } from "@/types/api";

export function SearchResults({
  results,
  isLoading,
  isError,
  onSelect,
}: {
  results: GraphEntity[] | undefined;
  isLoading?: boolean;
  isError?: boolean;
  onSelect: (item: GraphEntity) => void;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-300">
        <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
        Searching graph...
      </div>
    );
  }

  if (isError) {
    return <ErrorState message="Search is unavailable right now." />;
  }

  if (!results || !results.length) {
    return (
      <EmptyState
        title="No matches"
        description="Try a different search term to explore the graph."
      />
    );
  }

  return (
    <div className="space-y-2">
      {results.map((result) => (
        <SearchResultItem key={result.id} item={result} onSelect={onSelect} />
      ))}
    </div>
  );
}
