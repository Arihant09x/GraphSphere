import { Cpu, Database } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Technology } from "@/types/technology";

export function TechnologyCard({
  technology,
  onSelect,
}: {
  technology: Technology;
  onSelect?: (technology: Technology) => void;
}) {
  return (
    <Card
      className="h-full cursor-pointer border-white/10 bg-slate-950/60 hover:border-emerald-400/40"
      onClick={() => onSelect?.(technology)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base text-white">
            {technology.name}
          </CardTitle>
          <Badge variant="secondary" className="capitalize">
            {technology.category ?? "technology"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-emerald-400" />
          <span>{technology.category ?? "Platform"}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {(technology.projects ?? []).slice(0, 3).map((project) => (
            <Badge key={project.id} variant="outline" className="text-[10px]">
              {project.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
