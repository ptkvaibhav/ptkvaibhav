import "server-only";

import type { GithubActivity } from "@/types/github";
import type { Project } from "@/types/project";

const GITHUB_USERNAME = "ptkvaibhav";
const TARGET_REPOS = ["clinkz", "burp-to-fortify-parser", "invoker"] as const;
const TARGET_REPO_SET = new Set<string>(TARGET_REPOS);

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  archived: boolean;
};

type GitHubReadme = {
  html_url: string | null;
  content?: string;
  encoding?: string;
};

type GitHubEvent = {
  type: string;
  repo: {
    name: string;
  };
  payload?: {
    ref_type?: string;
  };
  created_at: string;
};

function getGithubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function normalizeRepoName(name: string) {
  return name.trim().toLowerCase().replace(/[_\s]+/g, "-");
}

function formatTopic(topic: string) {
  return topic
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getLatestActivity(updatedAt: string, pushedAt: string) {
  const updatedTime = new Date(updatedAt).getTime();
  const pushedTime = new Date(pushedAt).getTime();

  if (Number.isNaN(updatedTime)) {
    return pushedAt;
  }

  if (Number.isNaN(pushedTime)) {
    return updatedAt;
  }

  return pushedTime > updatedTime ? pushedAt : updatedAt;
}

function mapGithubEventToActivity(event: GitHubEvent): GithubActivity | null {
  const repository = event.repo.name;
  const repoUrl = `https://github.com/${repository}`;

  if (event.type === "PushEvent") {
    return {
      type: event.type,
      repo: repository,
      message: `Pushed commits to ${repository}`,
      url: repoUrl,
      createdAt: event.created_at,
    };
  }

  if (event.type === "CreateEvent") {
    const isRepositoryCreation = event.payload?.ref_type === "repository";

    return {
      type: event.type,
      repo: repository,
      message: isRepositoryCreation
        ? `Created repository ${repository}`
        : `Created ${event.payload?.ref_type || "resource"} in ${repository}`,
      url: repoUrl,
      createdAt: event.created_at,
    };
  }

  if (event.type === "ReleaseEvent") {
    return {
      type: event.type,
      repo: repository,
      message: `Published release in ${repository}`,
      url: repoUrl,
      createdAt: event.created_at,
    };
  }

  return null;
}

export async function getRepoReadme(owner: string, repo: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: getGithubHeaders(),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub README request failed with status ${response.status}.`);
    }

    const readme = (await response.json()) as GitHubReadme;
    return readme.html_url || undefined;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : `Unable to fetch README for ${owner}/${repo}.`
    );
  }
}

async function mapRepoToProject(repo: GitHubRepo): Promise<Project> {
  const normalizedName = normalizeRepoName(repo.name);
  const description = repo.description?.trim() || "Repository synced from GitHub.";
  const readmeUrl = await getRepoReadme(GITHUB_USERNAME, repo.name);
  const topics = Array.isArray(repo.topics) ? repo.topics.map(formatTopic) : [];

  return {
    slug: normalizedName,
    title: repo.name,
    excerpt: description,
    description,
    problem: "",
    architecture: {
      inputs: [],
      processing: [],
      outputs: [],
    },
    components: [],
    securityImpact: [],
    futureWork: [],
    tags: topics,
    github: repo.html_url,
    liveUrl: repo.homepage?.trim() || undefined,
    featured: true,
    status: repo.archived ? "Archived" : "Synced from GitHub",
    language: repo.language || undefined,
    readmeUrl,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    lastUpdated: getLatestActivity(repo.updated_at, repo.pushed_at),
  };
}

export async function getGithubProjects(): Promise<Project[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
      {
        headers: getGithubHeaders(),
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}.`);
    }

    const repositories = (await response.json()) as GitHubRepo[];
    const matchedRepos = repositories.filter((repo) =>
      TARGET_REPO_SET.has(normalizeRepoName(repo.name))
    );

    if (matchedRepos.length !== TARGET_REPOS.length) {
      throw new Error("One or more target repositories were not returned by GitHub.");
    }

    return Promise.all(
      TARGET_REPOS.map(async (targetRepo) => {
        const matchedRepo = matchedRepos.find(
          (repo) => normalizeRepoName(repo.name) === targetRepo
        );

        if (!matchedRepo) {
          throw new Error(`Missing repository data for ${targetRepo}.`);
        }

        return mapRepoToProject(matchedRepo);
      })
    );
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unable to fetch GitHub project data."
    );
  }
}

export async function getGithubActivity(): Promise<GithubActivity[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
      {
        headers: getGithubHeaders(),
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub activity request failed with status ${response.status}.`);
    }

    const events = (await response.json()) as GitHubEvent[];

    return events
      .filter((event) =>
        event.type === "PushEvent" ||
        event.type === "CreateEvent" ||
        event.type === "ReleaseEvent"
      )
      .map(mapGithubEventToActivity)
      .filter((activity): activity is GithubActivity => activity !== null)
      .slice(0, 5);
  } catch {
    return [];
  }
}
