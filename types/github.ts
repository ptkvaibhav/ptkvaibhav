export interface GithubActivity {
  type: string;
  repo: string;
  message: string;
  url: string;
  createdAt: string;
}

export interface GithubProfileStats {
  totalCommits: number;
  totalRepositories: number;
  stars: number;
  pullRequests: number;
  contributionStreak: number;
}
