import api from "@/api/axios"; import type { GraphEntity, Paginated } from "@/types/api";
export const projectApi = { list: async () => (await api.get<{ data: Paginated<GraphEntity> }>("/projects")).data.data, get: async (id: string) => (await api.get<{ data: GraphEntity }>(`/projects/${id}`)).data.data };
