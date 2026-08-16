import { GraphEntity } from "./api";

export interface Developer extends GraphEntity {
  email: string;
  location?: string;
  experienceYears?: number;
  headline?: string;
  skills: Array<{ id: string; name: string }>;
  projects: Array<{ id: string; name: string; slug?: string }>;
}
