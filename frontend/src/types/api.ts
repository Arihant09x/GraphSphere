export type NodeType =
  | "developer"
  | "project"
  | "technology"
  | "company"
  | "skill"
  | "repository"
  | "topic";
export interface GraphEntity {
  id: string;
  name: string;
  type?: NodeType;
  [key: string]: unknown;
}
export interface Paginated<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}
export type Recommendation = {
  id: string;
  name: string;
  type: NodeType;
  reason?: string;
  score?: number;
};
export interface GraphPath {
  nodes: Array<GraphEntity & { labels?: string[] }>;
  relationships: Array<{ type: string; properties?: Record<string, unknown> }>;
  distance: number;
}
