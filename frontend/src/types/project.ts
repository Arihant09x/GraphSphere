import { GraphEntity } from "./api";

export interface Project extends GraphEntity {
  description?: string;
  status?: string;
  year?: number;
  developers: Array<{ id: string; name: string; headline?: string }>;
  technologies: Array<{ id: string; name: string; category?: string }>;
}
