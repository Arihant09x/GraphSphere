import api from "@/api/axios"; import type { GraphEntity } from "@/types/api";
export const searchApi = { search: async (q: string) => (await api.get<{ data: GraphEntity[] }>("/search", { params: { q } })).data.data };
