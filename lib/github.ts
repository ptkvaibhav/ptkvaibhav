import "server-only";

import type { Project } from "@/types/project";

const GITHUB_USERNAME = "ptkvaibhav";
const REVALIDATE_SECONDS = 3600;
const MAX_FEATURED_REPOS = 4;
const EXCLUDED_REPOS = new Set(["ptkvaibhav"]);

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
  default_branch: string;
};

type GitHubReadme = {
  html_url: string | null;
  content?: string;
  encoding?: string;
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

function decodeReadmeContent(content?: string, encoding?: string) {
  if (!content || encoding !== "base64") {
    return undefined;
  }

  try {
    return Buffer.from(content, "base64").toString("utf8");
  } catch {
    return undefined;
  }
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "")
    .trim();
}

function extractReadmeSummary(markdown?: string) {
  if (!markdown) {
    return undefined;
  }

  const withoutCodeBlocks = markdown.replace(/```[\s\S]*?```/g, "");
  const lines = withoutCodeBlocks
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !line.startsWith("#"))
    .filter((line) => !line.startsWith("!"))
    .filter((line) => !line.startsWith("[!["));

  const paragraphs: string[] = [];
  let currentParagraph: string[] = [];

  for (const line of withoutCodeBlocks.split("\n")) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      if (currentParagraph.length) {
        paragraphs.push(stripMarkdown(currentParagraph.join(" ")));
        currentParagraph = [];
      }
      continue;
    }

    if (
      trimmedLine.startsWith("#") ||
      trimmedLine.startsWith("!") ||
      trimmedLine.startsWith("[![")
    ) {
      continue;
    }

    currentParagraph.push(trimmedLine);
  }

  if (currentParagraph.length) {
    paragraphs.push(stripMarkdown(currentParagraph.join(" ")));
  }

  return paragraphs.find((paragraph) => paragraph.length > 60) || lines[0];
}

export async function getRepoReadme(owner: string, repo: string) {
  try {
    const response = await fetchGithub(`https://api.github.com/repos/${owner}/${repo}/readme`);

    if (!response.ok) {
      throw new Error(`GitHub README request failed with status ${response.status}.`);
    }

    const readme = (await response.json()) as GitHubReadme;
    return {
      htmlUrl: readme.html_url || undefined,
      content: decodeReadmeContent(readme.content, readme.encoding),
    };
  } catch {
    return {
      htmlUrl: undefined,
      content: undefined,
    };
  }
}

function getRepositoryScore(repo: GitHubRepo) {
  const updatedAt = new Date(getLatestActivity(repo.updated_at, repo.pushed_at)).getTime();
  const ageInDays = Number.isNaN(updatedAt)
    ? 365
    : Math.max(0, (Date.now() - updatedAt) / 86_400_000);
  const freshnessScore = Math.max(0, 120 - ageInDays);
  const popularityScore = repo.stargazers_count * 12 + repo.forks_count * 8;
  const metadataScore = (repo.description ? 18 : 0) + repo.topics.length * 3;
  const ownershipScore = repo.fork ? -80 : 0;

  return freshnessScore + popularityScore + metadataScore + ownershipScore;
}

async function mapRepoToProject(repo: GitHubRepo, featured = true): Promise<Project> {
  const normalizedName = normalizeRepoName(repo.name);
  const readme = await getRepoReadme(GITHUB_USERNAME, repo.name);
  const readmeSummary = extractReadmeSummary(readme.content);
  const summary =
    normalizedName === "clinkz"
      ? readmeSummary || repo.description?.trim() || repo.name
      : repo.description?.trim() || repo.name;
  const topics = Array.isArray(repo.topics) ? repo.topics.map(formatTopic) : [];

  return {
    slug: normalizedName,
    title: repo.name,
    excerpt: summary,
    description: "",
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
    featured,
    status: repo.archived ? "Archived" : "Synced from GitHub",
    language: repo.language || undefined,
    readmeUrl: readme.htmlUrl,
    downloadUrl: `${repo.html_url}/archive/refs/heads/${repo.default_branch || "main"}.zip`,
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

export async function getGithubProjects(): Promise<Project[]> {
  try {
    const repositories = await getGithubRepositories();
    const visibleRepos = repositories
      .filter((repo) => !repo.archived && !EXCLUDED_REPOS.has(normalizeRepoName(repo.name)))
      .sort((left, right) => getRepositoryScore(right) - getRepositoryScore(left))
      .slice(0, MAX_FEATURED_REPOS);

    return Promise.all(
      visibleRepos.map((repo, index) => mapRepoToProject(repo, index < MAX_FEATURED_REPOS))
    );
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unable to fetch GitHub project data."
    );
  }
}

