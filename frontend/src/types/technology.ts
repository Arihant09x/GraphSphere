import { GraphEntity } from "./api";

export interface Technology extends GraphEntity {
  category?: string;
  projects: Array<{ id: string; name: string }>;
  developers: Array<{ id: string; name: string }>;
}
