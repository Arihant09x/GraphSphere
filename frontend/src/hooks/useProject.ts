import { useQuery } from "@tanstack/react-query";
import { projectApi } from "@/api/project.api";
import { queryKeys } from "@/lib/queryKeys";

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: () => projectApi.list(),
  });

export const useProject = (id: string) =>
  useQuery({
    queryKey: queryKeys.project(id),
    queryFn: () => projectApi.get(id),
    enabled: !!id,
  });
