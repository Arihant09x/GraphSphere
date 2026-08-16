import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import type { Technology } from "@/types/technology";
import { TechnologyCard } from "@/components/technology/TechnologyCard";

export function TechnologyList({
  technologies,
  isLoading,
  isError,
  onSelect,
}: {
  technologies: Technology[];
  isLoading?: boolean;
  isError?: boolean;
  onSelect?: (technology: Technology) => void;
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
    return <ErrorState message="Could not load technologies." />;
  }

  if (!technologies.length) {
    return (
      <EmptyState
        title="No technologies found"
        description="This graph is empty for technologies right now."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {technologies.map((technology) => (
        <TechnologyCard
          key={technology.id}
          technology={technology}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
