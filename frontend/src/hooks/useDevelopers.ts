"use client";

import { useQuery } from "@tanstack/react-query";
import { developerApi } from "@/api/developer.api";
import { queryKeys } from "@/lib/queryKeys";
import type { Developer } from "@/types/developer";

// Reusable unwrapper for any entity type
function unwrapEntities<T>(response: unknown): T[] {
  if (Array.isArray(response)) {
    return response.map((item) => {
      if (item && typeof item === "object" && "item" in item) {
        return (item as { item: T }).item;
      }
      return item as T;
    });
  }
  if (response && typeof response === "object" && "data" in response) {
    const data = (response as { data?: unknown }).data;
    if (Array.isArray(data)) return unwrapEntities<T>(data);
  }
  if (response && typeof response === "object" && "items" in response) {
    const items = (response as { items?: unknown }).items;
    if (Array.isArray(items)) return unwrapEntities<T>(items);
  }
  return [];
}

export function useDevelopers() {
  return useQuery({
    queryKey: ["developers"],
    queryFn: async () => {
      const response = await developerApi.list();
      return unwrapEntities<Developer>(response);
    },
  });
}

export function useDeveloperById(id: string | null) {
  return useQuery({
    queryKey: queryKeys.developer(id ?? ""),
    queryFn: () => developerApi.get(id!),
    enabled: Boolean(id),
  });
}
