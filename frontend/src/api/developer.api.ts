import api from "@/api/axios";
import type { GraphEntity, Paginated } from "@/types/api";

export const developerApi = {
  list: async () =>
    (await api.get<{ data: Paginated<GraphEntity> }>("/developers")).data.data,
  get: async (id: string) =>
    (await api.get<{ data: GraphEntity }>(`/developers/${id}`)).data.data,
  network: async (id: string) =>
    (
      await api.get<{
        data: {
          nodes: GraphEntity[];
          edges: Array<{
            id: string;
            source: string;
            target: string;
            type: string;
            properties?: Record<string, unknown>;
          }>;
        };
      }>(`/developers/${id}/network`)
    ).data.data,
};
