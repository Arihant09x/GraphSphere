import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/types/project";

export function ProjectDetails({
  project,
}: {
  project: Project | null | undefined;
}) {
  if (!project) {
    return null;
  }

  return (
    <Card className="border-white/10 bg-slate-950/60">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3 text-white">
          <span>{project.name}</span>
          <Badge variant="outline">Project</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-slate-300">
        <p>
          {project.description ??
            "A product and engineering initiative within the graph."}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((technology) => (
            <Badge
              key={technology.id}
              variant="secondary"
              className="capitalize"
            >
              {technology.name}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Contributors
          </p>
          <div className="flex flex-wrap gap-2">
            {(project.developers ?? []).map((developer) => (
              <Badge
                key={developer.id}
                variant="outline"
                className="text-[10px]"
              >
                {developer.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
