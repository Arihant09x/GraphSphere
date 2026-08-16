"use client";

import { useQuery } from "@tanstack/react-query";

import { technologyApi } from "@/api/technology.api";
import { queryKeys } from "@/lib/queryKeys";

export function useGraphTechnology(id: string | null) {
  return useQuery({
    queryKey: queryKeys.technologyGraph(id ?? ""),
    queryFn: () => technologyApi.get(id!),
    enabled: Boolean(id),
  });
}
