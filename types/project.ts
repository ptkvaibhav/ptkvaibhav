export interface Project {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  tags: string[];
  github: string;
  featured: boolean;
  status: string;
  liveUrl?: string;
  language?: string;
  readmeUrl?: string;
  stars?: number;
  forks?: number;
  lastUpdated?: string;
}

export interface SupabaseProjectRow {
  slug: string;
  name: string;
  excerpt: string;
  description: string;
  repository_url: string;
  live_url: string | null;
  featured: boolean;
  status: string;
  tags: string[];
}
