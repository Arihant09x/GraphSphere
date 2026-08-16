import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GraphEntity } from "@/types/api";

export function NodeDetailsPanel({
  node,
}: {
  node: GraphEntity | null | undefined;
}) {
  if (!node) {
    return null;
  }

  return (
    <Card className="border-white/10 bg-slate-950/60">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3 text-white">
          <span>{node.name}</span>
          <Badge variant="outline" className="capitalize">
            {node.type ?? "node"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-slate-300">
        <p>{node.type ? `Type: ${node.type}` : "Graph entity"}</p>
      </CardContent>
    </Card>
  );
}
