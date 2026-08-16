export const queryKeys = {
  auth: ["auth"] as const,
  search: (q: string) => ["search", q] as const,
  entity: (type: string, id: string) => [type, id] as const,
  network: (id: string) => ["network", id] as const,
  recommendations: (id: string) => ["recommendations", id] as const,
  path: (from: string, to: string) => ["path", from, to] as const,
  developer: (id: string) => ["developer", id] as const,
  project: (id: string) => ["project", id] as const,
  technology: (id: string) => ["technology", id] as const,
  developerGraph: (id: string) => ["developerGraph", id] as const,
  technologyGraph: (id: string) => ["technologyGraph", id] as const,
} as const;
