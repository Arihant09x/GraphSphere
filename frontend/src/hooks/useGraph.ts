"use client";

import { useQuery } from "@tanstack/react-query";

import { developerApi } from "@/api/developer.api";
import { graphApi } from "@/api/graph.api";
import { projectApi } from "@/api/project.api";
import { searchApi } from "@/api/search.api";
import { technologyApi } from "@/api/technology.api";
import { queryKeys } from "@/lib/queryKeys";
import type { NodeType, Recommendation } from "@/types/api";

// ---------- Recommendations ----------

type FlattenedRecommendation = Recommendation & {
  id: string;
  name: string;
  type: NodeType;
  reason?: string;
  score?: number;
};

export const useRecommendations = (id: string | null) =>
  useQuery<FlattenedRecommendation[]>({
    queryKey: queryKeys.recommendations(id ?? ""),
    queryFn: async () => {
      const recommendations = await graphApi.recommendations(id!);

      return recommendations.map((recommendation) => ({
        ...recommendation,
        id: String(recommendation.id),
        name: String(recommendation.name),
        type: String(recommendation.type).toLowerCase() as NodeType,
        reason:
          recommendation.reason != null
            ? String(recommendation.reason)
            : undefined,
        score:
          recommendation.score != null
            ? Number(recommendation.score)
            : undefined,
      }));
    },
    enabled: Boolean(id),
  });

// ---------- Other hooks ----------

export const useSearch = (q: string) =>
  useQuery({
    queryKey: queryKeys.search(q),
    queryFn: () => searchApi.search(q),
    enabled: q.trim().length >= 2,
    staleTime: 30_000,
  });

export const useEntity = (type: string | null, id: string | null) =>
  useQuery({
    queryKey: queryKeys.entity(type ?? "node", id ?? ""),
    queryFn: () =>
      type === "developer"
        ? developerApi.get(id!)
        : type === "project"
          ? projectApi.get(id!)
          : technologyApi.get(id!),
    enabled: Boolean(type && id),
  });

export const useNetwork = (id: string | null) =>
  useQuery({
    queryKey: queryKeys.network(id ?? ""),
    queryFn: () => developerApi.network(id!),
    enabled: Boolean(id),
  });

export const useGraphDeveloper = (id: string | null) =>
  useQuery({
    queryKey: queryKeys.developerGraph(id ?? ""),
    queryFn: () => developerApi.get(id!),
    enabled: Boolean(id),
  });

export const useGraphTechnology = (id: string | null) =>
  useQuery({
    queryKey: queryKeys.technologyGraph(id ?? ""),
    queryFn: () => technologyApi.get(id!),
    enabled: Boolean(id),
  });
