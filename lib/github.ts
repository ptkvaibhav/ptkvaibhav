import "server-only";

import type { GithubActivity, GithubProfileStats } from "@/types/github";
import type { Project } from "@/types/project";

const GITHUB_USERNAME = "ptkvaibhav";
const TARGET_REPOS = ["clinkz", "burp-to-fortify-parser", "invoker"] as const;
const TARGET_REPO_SET = new Set<string>(TARGET_REPOS);
const REVALIDATE_SECONDS = 3600;

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
  fork: boolean;
};

type GitHubReadme = {
  html_url: string | null;
  content?: string;
  encoding?: string;
};

type GitHubUser = {
  public_repos: number;
};

type GitHubSearchResult = {
  total_count: number;
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

async function fetchGithub(url: string) {
  return fetch(url, {
    headers: getGithubHeaders(),
    next: { revalidate: REVALIDATE_SECONDS },
  });
}

async function fetchGithubJson<T>(url: string) {
  const response = await fetchGithub(url);

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
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

function parseLastPage(linkHeader: string | null) {
  if (!linkHeader) {
    return null;
  }

  const match = linkHeader.match(/[?&]page=(\d+)>;\s*rel="last"/);
  if (!match) {
    return null;
  }

  const page = Number(match[1]);
  return Number.isNaN(page) ? null : page;
}

function getDateKey(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10);
}

function getContributionStreakFromEvents(events: GitHubEvent[]) {
  const activityDays = [
    ...new Set(
      events
        .map((event) => getDateKey(event.created_at))
        .filter((value): value is string => Boolean(value))
    ),
  ].sort((left, right) => new Date(right).getTime() - new Date(left).getTime());

  if (!activityDays.length) {
    return 0;
  }

  let streak = 1;

  for (let index = 1; index < activityDays.length; index += 1) {
    const previous = new Date(activityDays[index - 1]);
    const current = new Date(activityDays[index]);
    const difference = previous.getTime() - current.getTime();

    if (difference === 86_400_000) {
      streak += 1;
      continue;
    }

    break;
  }

  return streak;
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
    const response = await fetchGithub(`https://api.github.com/repos/${owner}/${repo}/readme`);

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

async function getGithubRepositories() {
  return fetchGithubJson<GitHubRepo[]>(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
  );
}

async function getRepoCommitCount(repoName: string) {
  const response = await fetchGithub(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/commits?author=${GITHUB_USERNAME}&per_page=1`
  );

  if (!response.ok) {
    return 0;
  }

  const lastPage = parseLastPage(response.headers.get("link"));

  if (lastPage) {
    return lastPage;
  }

  const commits = (await response.json()) as unknown[];
  return Array.isArray(commits) ? commits.length : 0;
}

export async function getGithubProjects(): Promise<Project[]> {
  try {
    const repositories = await getGithubRepositories();
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
    const events = await fetchGithubJson<GitHubEvent[]>(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public`
    );

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

export async function getGithubProfileStats(): Promise<GithubProfileStats | null> {
  try {
    const [user, repositories, pullRequests, events] = await Promise.all([
      fetchGithubJson<GitHubUser>(`https://api.github.com/users/${GITHUB_USERNAME}`),
      getGithubRepositories(),
      fetchGithubJson<GitHubSearchResult>(
        `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr&per_page=1`
      ),
      fetchGithubJson<GitHubEvent[]>(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`),
    ]);

    const commitCounts = await Promise.allSettled(
      repositories.map((repo) => getRepoCommitCount(repo.name))
    );

    const totalCommits = commitCounts.reduce((total, result) => {
      if (result.status !== "fulfilled") {
        return total;
      }

      return total + result.value;
    }, 0);

    return {
      totalCommits,
      totalRepositories: user.public_repos || repositories.length,
      stars: repositories.reduce((total, repo) => total + repo.stargazers_count, 0),
      pullRequests: pullRequests.total_count,
      contributionStreak: getContributionStreakFromEvents(events),
    };
  } catch {
    return null;
  }
}
