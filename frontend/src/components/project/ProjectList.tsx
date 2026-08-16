import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/project/ProjectCard";

export function ProjectList({
  projects,
  isLoading,
  isError,
  onSelect,
}: {
  projects: Project[];
  isLoading?: boolean;
  isError?: boolean;
  onSelect?: (project: Project) => void;
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
    return <ErrorState message="Could not load projects." />;
  }

  if (!projects.length) {
    return (
      <EmptyState
        title="No projects found"
        description="Projects will appear here when your workspace has data."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onSelect={onSelect} />
      ))}
    </div>
  );
}
