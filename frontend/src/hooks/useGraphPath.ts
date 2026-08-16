import { useQuery } from "@tanstack/react-query";
import { graphApi } from "@/api/graph.api";
import { queryKeys } from "@/lib/queryKeys";

export const useGraphPath = (fromId: string, toId: string) =>
  useQuery({
    queryKey: queryKeys.path(fromId, toId),
    queryFn: () => graphApi.path(fromId, toId),
    enabled: !!fromId && !!toId,
  });
