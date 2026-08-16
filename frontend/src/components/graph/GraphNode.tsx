import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import type { GraphEntity, NodeType } from "@/types/api";

export function GraphNode({
  node,
  active,
}: {
  node: GraphEntity;
  active?: boolean;
}) {
  const colorMap: Record<NodeType | string, string> = {
    developer: "bg-cyan-400/15 text-cyan-100 border-cyan-400/40",
    project: "bg-indigo-400/15 text-indigo-100 border-indigo-400/40",
    technology: "bg-emerald-400/15 text-emerald-100 border-emerald-400/40",
    company: "bg-amber-400/15 text-amber-100 border-amber-400/40",
    skill: "bg-pink-400/15 text-pink-100 border-pink-400/40",
    repository: "bg-violet-400/15 text-violet-100 border-violet-400/40",
    topic: "bg-orange-400/15 text-orange-100 border-orange-400/40",
  };

  return (
    <div
      className={`rounded-xl border px-3 py-2 shadow-lg ${colorMap[node.type ?? "developer"] ?? "bg-slate-500/15 text-slate-100 border-slate-400/40"} ${active ? "ring-2 ring-cyan-300" : ""}`}
    >
      <div className="text-sm font-semibold">{node.name}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">
        {node.type ?? "node"}
      </div>
    </div>
  );
}
