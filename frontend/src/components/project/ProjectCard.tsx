import { FolderOpen, Gauge, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/types/project";

export function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect?: (project: Project) => void;
}) {
  return (
    <Card
      className="h-full cursor-pointer border-white/10 bg-slate-950/60 hover:border-indigo-400/40"
      onClick={() => onSelect?.(project)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base text-white">{project.name}</CardTitle>
          <Badge variant="secondary" className="capitalize">
            Project
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-slate-300">
        <p className="line-clamp-3 text-slate-400">
          {project.description ??
            "Active product initiative with cross-functional engineering support."}
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Gauge className="h-4 w-4 text-indigo-400" />
          <span>{project.status ?? "Active"}</span>
          {project.year ? <span>• {project.year}</span> : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {(project.technologies ?? []).slice(0, 4).map((technology) => (
            <Badge
              key={technology.id}
              variant="outline"
              className="text-[10px]"
            >
              {technology.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
