import { ExternalLink, MapPin, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Developer } from "@/types/developer";

export function DeveloperDetails({
  developer,
}: {
  developer: Developer | null | undefined;
}) {
  if (!developer) {
    return null;
  }

  return (
    <Card className="border-white/10 bg-slate-950/60">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3 text-white">
          <span>{developer.name}</span>
          <Badge variant="outline">Developer</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-slate-300">
        <p>
          {developer.headline ??
            "Senior engineer exploring product and platform opportunities."}
        </p>

        <div className="flex items-center gap-2 text-slate-300">
          <MapPin className="h-4 w-4 text-cyan-400" />
          <span>{developer.location ?? "Remote"}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {(developer.skills ?? []).map((skill) => (
            <Badge key={skill.id} variant="secondary" className="capitalize">
              {skill.name}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Projects
          </p>
          <div className="flex flex-wrap gap-2">
            {(developer.projects ?? []).map((project) => (
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
