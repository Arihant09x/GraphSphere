"use client";

import { useQuery } from "@tanstack/react-query";
import { technologyApi } from "@/api/technology.api";
import { queryKeys } from "@/lib/queryKeys";
import type { Technology } from "@/types/technology";
import { unwrapEntities } from "./unwrap";

export function useTechnologies() {
  return useQuery({
    queryKey: ["technologies"],
    queryFn: async () => {
      const response = await technologyApi.list();
      return unwrapEntities<Technology>(response);
    },
  });
}

export function useTechnologyById(id: string | null) {
  return useQuery({
    queryKey: queryKeys.technology(id ?? ""),
    queryFn: () => technologyApi.get(id!),
    enabled: Boolean(id),
  });
}
