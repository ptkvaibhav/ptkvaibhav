export interface Project {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  problem: string;
  architecture: {
    inputs: string[];
    processing: string[];
    outputs: string[];
  };
  components: string[];
  securityImpact: string[];
  futureWork: string[];
  tags: string[];
  github: string;
  featured: boolean;
  status: string;
  liveUrl?: string;
  language?: string;
  readmeUrl?: string;
  downloadUrl?: string;
  stars?: number;
  forks?: number;
  lastUpdated?: string;
}
