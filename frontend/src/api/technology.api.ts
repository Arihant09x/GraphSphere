import api from "@/api/axios"; import type { GraphEntity, Paginated } from "@/types/api";
export const technologyApi = { list: async () => (await api.get<{ data: Paginated<GraphEntity> }>("/technologies")).data.data, get: async (id: string) => (await api.get<{ data: GraphEntity }>(`/technologies/${id}`)).data.data };
