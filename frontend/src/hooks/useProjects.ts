"use client";

import { useQuery } from "@tanstack/react-query";
import { projectApi } from "@/api/project.api";
import { queryKeys } from "@/lib/queryKeys";
import type { Project } from "@/types/project";
import { unwrapEntities } from "./unwrap"; // or copy the helper here

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await projectApi.list();
      return unwrapEntities<Project>(response);
    },
  });
}

export function useProjectById(id: string | null) {
  return useQuery({
    queryKey: queryKeys.project(id ?? ""),
    queryFn: () => projectApi.get(id!),
    enabled: Boolean(id),
  });
}
