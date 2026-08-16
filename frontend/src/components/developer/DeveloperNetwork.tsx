import { Network } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GraphEntity } from "@/types/api";

export function DeveloperNetwork({
  nodes,
  isLoading,
}: {
  nodes: Array<{ developer: GraphEntity; distance: number }>;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return <div className="h-28 animate-pulse rounded-2xl bg-slate-800/70" />;
  }

  return (
    <Card className="border-white/10 bg-slate-950/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Network className="h-4 w-4 text-cyan-400" />
          Network connections
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {nodes.length ? (
          nodes.map(({ developer, distance }) => (
            <div
              key={developer.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-300"
            >
              <span>{developer.name}</span>
              <span className="text-xs text-cyan-300">
                {distance} hop{distance === 1 ? "" : "s"}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">
            No direct network connections found.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
