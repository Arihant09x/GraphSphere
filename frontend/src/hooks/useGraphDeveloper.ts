"use client";

import { useQuery } from "@tanstack/react-query";

import { developerApi } from "@/api/developer.api";
import { queryKeys } from "@/lib/queryKeys";

export function useGraphDeveloper(id: string | null) {
  return useQuery({
    queryKey: queryKeys.developerGraph(id ?? ""),
    queryFn: () => developerApi.get(id!),
    enabled: Boolean(id),
  });
}
