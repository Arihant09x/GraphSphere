import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Technology } from "@/types/technology";

export function TechnologyDetails({
  technology,
}: {
  technology: Technology | null | undefined;
}) {
  if (!technology) {
    return null;
  }

  return (
    <Card className="border-white/10 bg-slate-950/60">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3 text-white">
          <span>{technology.name}</span>
          <Badge variant="outline">{technology.category ?? "Technology"}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-slate-300">
        <div className="flex flex-wrap gap-2">
          {(technology.developers ?? []).map((developer) => (
            <Badge
              key={developer.id}
              variant="secondary"
              className="capitalize"
            >
              {developer.name}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Projects
          </p>
          <div className="flex flex-wrap gap-2">
            {(technology.projects ?? []).map((project) => (
              <Badge key={project.id} variant="outline" className="text-[10px]">
                {project.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
