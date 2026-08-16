import { Loader2 } from "lucide-react";

import { DeveloperCard } from "@/components/developer/DeveloperCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import type { Developer } from "@/types/developer";

export function DeveloperList({
  developers,
  isLoading,
  isError,
  onSelect,
}: {
  developers: Developer[];
  isLoading?: boolean;
  isError?: boolean;
  onSelect?: (developer: Developer) => void;
}) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-40 animate-pulse rounded-2xl bg-slate-800/70"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return <ErrorState message="Could not load developers." />;
  }

  if (!developers.length) {
    return (
      <EmptyState
        title="No developers found"
        description="Try a broader search or add another workspace connection."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {developers.map((developer) => (
        <DeveloperCard
          key={developer.id}
          developer={developer}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
