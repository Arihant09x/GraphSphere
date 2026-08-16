import { Briefcase, MapPin, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Developer } from "@/types/developer";

export function DeveloperCard({
  developer,
  onSelect,
}: {
  developer: Developer;
  onSelect?: (developer: Developer) => void;
}) {
  return (
    <Card
      className="h-full cursor-pointer border-white/10 bg-slate-950/60 hover:border-cyan-400/40"
      onClick={() => onSelect?.(developer)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base text-white">
            {developer.name}
          </CardTitle>
          <Badge variant="secondary" className="capitalize">
            Developer
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-cyan-400" />
          <span>{developer.headline ?? "Engineering lead"}</span>
        </div>

        {developer.location ? (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-cyan-400" />
            <span>{developer.location}</span>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {(developer.skills ?? []).slice(0, 4).map((skill) => (
            <Badge
              key={skill.id}
              variant="outline"
              className="text-[10px] uppercase tracking-wide"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
