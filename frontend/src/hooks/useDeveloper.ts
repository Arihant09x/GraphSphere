import { useQuery } from "@tanstack/react-query";
import { developerApi } from "@/api/developer.api";
import { queryKeys } from "@/lib/queryKeys";

export const useDevelopers = () =>
  useQuery({
    queryKey: ["developers"],
    queryFn: () => developerApi.list(),
  });

export const useDeveloper = (id: string) =>
  useQuery({
    queryKey: queryKeys.developer(id),
    queryFn: () => developerApi.get(id),
    enabled: !!id,
  });

export const useDeveloperNetwork = (id: string) =>
  useQuery({
    queryKey: queryKeys.network(id),
    queryFn: () => developerApi.network(id),
    enabled: !!id,
  });
