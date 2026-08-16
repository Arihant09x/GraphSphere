import { Lightbulb } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Recommendation } from "@/types/api";

export function RecommendationList({
  recommendations,
}: {
  recommendations: Recommendation[] | undefined;
}) {
  if (!recommendations?.length) {
    return null;
  }

  return (
    <Card className="border-white/10 bg-slate-950/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Lightbulb className="h-4 w-4 text-amber-400" />
          Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="rounded-xl border border-white/10 bg-slate-900/80 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-white">
                {recommendation.name}
              </span>
              <Badge variant="secondary" className="capitalize text-[10px]">
                {recommendation.type}
              </Badge>
            </div>
            {recommendation.reason ? (
              <p className="mt-2 text-sm text-slate-300">
                {recommendation.reason}
              </p>
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
