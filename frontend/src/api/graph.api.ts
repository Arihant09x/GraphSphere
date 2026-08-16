import api from "@/api/axios";
import type { GraphPath, Recommendation } from "@/types/api";

type RecommendationsResponse = {
  data: {
    recommendations: Array<{
      recommendation: Recommendation;
    }>;
  };
};

export const graphApi = {
  path: async (fromId: string, toId: string): Promise<GraphPath> =>
    (
      await api.get<{ data: GraphPath }>("/graph/path", {
        params: { fromId, toId },
      })
    ).data.data,

  recommendations: async (id: string): Promise<Recommendation[]> => {
    const response = await api.get<RecommendationsResponse>(
      `/graph/recommendations/${id}`,
    );

    return response.data.data.recommendations.map(
      (item) => item.recommendation,
    );
  },
};
