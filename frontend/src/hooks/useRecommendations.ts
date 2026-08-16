import { useQuery } from "@tanstack/react-query";
import { graphApi } from "@/api/graph.api";
import { queryKeys } from "@/lib/queryKeys";

export const useRecommendations = (id: string) =>
  useQuery({
    queryKey: queryKeys.recommendations(id),
    queryFn: () => graphApi.recommendations(id),
    enabled: !!id,
  });
