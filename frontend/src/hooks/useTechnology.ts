import { useQuery } from "@tanstack/react-query";
import { technologyApi } from "@/api/technology.api";
import { queryKeys } from "@/lib/queryKeys";

export const useTechnologies = () =>
  useQuery({
    queryKey: ["technologies"],
    queryFn: () => technologyApi.list(),
  });

export const useTechnology = (id: string) =>
  useQuery({
    queryKey: queryKeys.technology(id),
    queryFn: () => technologyApi.get(id),
    enabled: !!id,
  });
