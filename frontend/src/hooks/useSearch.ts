import { useQuery } from "@tanstack/react-query";
import { searchApi } from "@/api/search.api";
import { queryKeys } from "@/lib/queryKeys";
import type { GraphEntity, NodeType } from "@/types/api";

// Helper to extract entity array from any response shape
function unwrapGraphEntities(response: unknown): GraphEntity[] {
  if (Array.isArray(response)) {
    return response.map((item) => {
      if (item && typeof item === "object" && "item" in item) {
        return (item as { item: GraphEntity }).item;
      }
      return item as GraphEntity;
    });
  }

  if (response && typeof response === "object" && "data" in response) {
    const data = (response as { data?: unknown }).data;
    if (Array.isArray(data)) {
      return unwrapGraphEntities(data);
    }
  }

  if (response && typeof response === "object" && "items" in response) {
    const items = (response as { items?: unknown }).items;
    if (Array.isArray(items)) {
      return unwrapGraphEntities(items);
    }
  }

  return [];
}

function normalizeEntity(value: unknown): GraphEntity | null {
  if (!value || typeof value !== "object") return null;

  const entity = value as Record<string, unknown>;
  const properties =
    entity.properties &&
    typeof entity.properties === "object" &&
    !Array.isArray(entity.properties)
      ? (entity.properties as Record<string, unknown>)
      : entity;

  const typeValue = String(
    properties.type ??
      entity.type ??
      properties.label ??
      entity.label ??
      "node",
  ).toLowerCase();
  const normalizedType =
    typeValue === "developer" ||
    typeValue === "project" ||
    typeValue === "technology"
      ? (typeValue as NodeType)
      : undefined;

  const normalized: GraphEntity = {
    ...(properties as Record<string, unknown>),
    ...(entity as Record<string, unknown>),
    id: String(properties.id ?? entity.id ?? ""),
    name: String(
      properties.name ??
        entity.name ??
        properties.label ??
        entity.label ??
        "Untitled",
    ),
    type: normalizedType,
    properties,
  };

  return normalized;
}

export const useSearch = (q: string) =>
  useQuery({
    queryKey: queryKeys.search(q),
    queryFn: async () => {
      const response = await searchApi.search(q);
      const items = unwrapGraphEntities(response);
      return items
        .map((item) => normalizeEntity(item))
        .filter(Boolean) as GraphEntity[];
    },
    enabled: q.length >= 2,
  });
