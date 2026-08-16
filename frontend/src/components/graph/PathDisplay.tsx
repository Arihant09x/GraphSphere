import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GraphPath } from "@/types/api";

export function PathDisplay({ path }: { path: GraphPath | null | undefined }) {
  if (!path) {
    return null;
  }

  return (
    <Card className="border-white/10 bg-slate-950/60">
      <CardHeader>
        <CardTitle className="text-white">Shortest path</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
          {path.nodes.map((node, index) => (
            <div
              key={`${node.id}-${index}`}
              className="flex items-center gap-2"
            >
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-xs text-cyan-200">
                {node.name}
              </span>
              {index < path.nodes.length - 1 ? (
                <ArrowRight className="h-4 w-4 text-slate-400" />
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs uppercase tracking-wide text-slate-400">
          Distance: {path.distance}
        </p>
      </CardContent>
    </Card>
  );
}
