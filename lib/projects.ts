import "server-only";

import { cache } from "react";

import { getGithubProjects } from "@/lib/github";
import type { Project } from "@/types/project";

const staticProjects: Project[] = [
  {
    slug: "clinkz",
    title: "Clinkz",
    excerpt:
      "An autonomous penetration testing platform exploring agent loops, tool orchestration, and evidence-driven reporting.",
    description:
      "Clinkz is a multi-stage offensive security project built around autonomous recon, crawl, exploit validation, and reporting workflows. It is where I experiment with agentic pentesting systems, Dockerized toolchains, and evidence-first offensive automation.",
    problem:
      "Modern penetration testing workflows are fragmented across scanners, crawlers, note taking, and manual exploit validation. That fragmentation makes it hard to preserve context, correlate evidence, and turn raw tooling output into operator-grade findings.",
    architecture: {
      inputs: [
        "Seed URLs, application scope definitions, and operator-provided testing constraints",
        "HTTP responses, discovered routes, crawler telemetry, and tool output artifacts",
        "Authentication context and target-specific configuration for controlled testing",
      ],
      processing: [
        "Recon and crawl orchestration that expands the attack surface while preserving scope",
        "Agent loops that coordinate enumeration, validation, and evidence collection steps",
        "Normalization pipelines that correlate scanner output, HTTP traces, and exploit proof",
      ],
      outputs: [
        "Structured findings with evidence trails and reproducible validation artifacts",
        "Operator-readable reports summarizing attack paths, assumptions, and impact",
        "Testing state that can be resumed and extended instead of restarted from scratch",
      ],
    },
    components: [
      "Scope ingestion and target modeling",
      "Crawler and endpoint classification engine",
      "Tool orchestration and agent loop control",
      "Evidence normalization and finding correlation pipeline",
      "Reporting layer for operator-facing output",
    ],
    securityImpact: [
      "Improves depth of application testing by preserving context across recon, validation, and reporting stages.",
      "Reduces false confidence by attaching concrete evidence to findings instead of relying on raw scanner output alone.",
      "Supports more explainable offensive automation, making it easier for security teams to trust and action the results.",
    ],
    futureWork: [
      "Stateful authentication flows for more reliable testing of modern session-heavy applications.",
      "Deeper exploit verification logic to distinguish theoretical findings from reproducible weaknesses.",
      "Better evidence graphs and replayable workflows for collaborative security reviews.",
    ],
    tags: ["Python", "Docker", "LLM", "Security Automation", "Pentesting"],
    github: "https://github.com/ptkvaibhav/clinkz",
    featured: true,
    status: "Active development",
  },
  {
    slug: "burp-to-fortify-parser",
    title: "Burp to Fortify Parser",
    excerpt:
      "A bridge between Burp findings and Fortify-aligned review workflows for cleaner vulnerability intake.",
    description:
      "Burp to Fortify Parser converts Burp output into a structure that fits Fortify-oriented review pipelines, reducing manual re-entry and improving the handoff between testing output and remediation workflows.",
    problem:
      "Dynamic testing results often arrive in formats that do not align with enterprise remediation tooling. That creates manual translation work, inconsistent severity mapping, and loss of evidence between the tester and the engineering workflow.",
    architecture: {
      inputs: [
        "Burp Suite exports containing issue data, request-response pairs, and target metadata",
        "Fortify-aligned field mappings and severity/category normalization rules",
        "Parser configuration for project-specific workflows and downstream output expectations",
      ],
      processing: [
        "Parsing of Burp findings into structured records with stable issue identifiers",
        "Normalization of issue classes, evidence snippets, and metadata to match Fortify-style intake",
        "Deduplication and transformation logic that prepares data for downstream review pipelines",
      ],
      outputs: [
        "Transformed findings formatted for Fortify-oriented ingestion and review",
        "Cleaner vulnerability records with preserved technical evidence",
        "Reduced analyst overhead during triage, assignment, and remediation tracking",
      ],
    },
    components: [
      "Burp export parser",
      "Issue normalization and taxonomy mapping engine",
      "Evidence extraction and formatting logic",
      "Deduplication and record transformation pipeline",
      "Output adapters for Fortify-style workflows",
    ],
    securityImpact: [
      "Preserves fidelity of DAST findings so engineering teams see the evidence that matters.",
      "Reduces manual handling errors that happen when vulnerabilities are re-entered into separate systems.",
      "Improves signal quality in AppSec workflows by standardizing issue metadata before triage.",
    ],
    futureWork: [
      "Expanded support for additional export formats and scanner sources.",
      "Project-specific mapping rules for richer metadata and severity translation.",
      "Automated validation tests against representative finding corpora to reduce parser regressions.",
    ],
    tags: ["Burp Suite", "Fortify", "AppSec Workflow"],
    github: "https://github.com/ptkvaibhav/Burp_to_Fortify_Parser",
    featured: true,
    status: "Maintained",
  },
  {
    slug: "burp-fortify-ssc-parser-plugin",
    title: "Burp Fortify SSC Parser Plugin",
    excerpt:
      "A Java parser plugin that helps enterprise AppSec teams move Burp Suite evidence into Fortify SSC workflows with cleaner triage context.",
    description:
      "A Fortify SSC parser plugin for ingesting and normalizing Burp Suite findings so application security teams can preserve request evidence, reduce manual re-entry, and improve remediation handoff quality.",
    problem:
      "Burp findings often sit outside the enterprise vulnerability management workflow, forcing analysts to manually translate evidence and weakening remediation traceability.",
    architecture: {
      inputs: ["Burp Suite issue exports", "Fortify SSC parser configuration"],
      processing: ["Finding normalization", "Evidence mapping", "Severity and metadata translation"],
      outputs: ["Fortify SSC-ready vulnerability records", "Triage-friendly evidence"],
    },
    components: ["Parser plugin", "Finding mapper", "Evidence formatter"],
    securityImpact: [
      "Improves DAST evidence fidelity inside enterprise remediation workflows.",
      "Reduces analyst time spent translating scanner output into tracking systems.",
    ],
    futureWork: ["Additional scanner mappings", "Expanded test fixtures for parser regression coverage"],
    tags: ["Java", "Burp Suite", "Fortify SSC", "DAST", "AppSec Workflow"],
    github: "https://github.com/ptkvaibhav/burp-fortify-ssc-parser-plugin",
    featured: true,
    status: "Enterprise tooling",
  },
  {
    slug: "nyx",
    title: "nyx",
    excerpt:
      "A safety-first local file intelligence tool that fingerprints directories, identifies duplicates, and supports defensible cleanup decisions.",
    description:
      "nyx audits local directories with SHA-256 fingerprinting and duplicate detection so users can understand file sprawl before deleting or reorganizing data.",
    problem:
      "Local file cleanup is risky when users cannot quickly tell which files are duplicates, stale, or important enough to keep.",
    architecture: {
      inputs: ["Local directory paths", "File metadata", "SHA-256 fingerprints"],
      processing: ["Directory traversal", "Content hashing", "Duplicate grouping"],
      outputs: ["File intelligence summaries", "Duplicate candidates", "Cleanup evidence"],
    },
    components: ["Scanner", "Hashing pipeline", "Duplicate detector", "Report output"],
    securityImpact: [
      "Encourages evidence-based file cleanup rather than destructive guesswork.",
      "Uses local-first analysis to avoid exposing private file contents to external services.",
    ],
    futureWork: ["Interactive review mode", "Safer quarantine workflows"],
    tags: ["TypeScript", "Automation", "Backup System", "File Intelligence"],
    github: "https://github.com/ptkvaibhav/nyx",
    featured: true,
    status: "Active build",
  },
  {
    slug: "invoker",
    title: "Invoker",
    excerpt:
      "An AI-assisted vulnerability scanning project focused on better signal discovery and triage quality.",
    description:
      "Invoker is an exploratory security project around AI-assisted vulnerability analysis and scanning workflows. It reflects my interest in using automation to increase analyst depth without amplifying noise.",
    problem:
      "Scanner-heavy vulnerability programs tend to suffer from poor prioritization and noisy results. Analysts spend time revalidating weak signals instead of focusing on findings that actually change risk posture.",
    architecture: {
      inputs: [
        "Target definitions, scan configurations, and raw vulnerability scanner output",
        "HTTP traces, response metadata, and contextual evidence captured during analysis",
        "Heuristics or model-assisted enrichment signals used to rank and classify findings",
      ],
      processing: [
        "Signal aggregation that combines scanner output with contextual application behavior",
        "Model-assisted or heuristic scoring used to prioritize deeper investigation paths",
        "Correlation logic that groups related findings and reduces duplicate analyst effort",
      ],
      outputs: [
        "Prioritized vulnerability candidates with clearer evidence and rationale",
        "Triage-friendly summaries that highlight what deserves manual analyst attention",
        "A more structured view of scanner signal quality across targets and runs",
      ],
    },
    components: [
      "Scanner orchestration and result ingestion",
      "Signal enrichment and ranking logic",
      "Correlation and deduplication pipeline",
      "Model-assisted triage layer",
      "Analyst-facing output summaries",
    ],
    securityImpact: [
      "Helps analysts focus on findings with stronger evidence and better exploitability signals.",
      "Reduces noise in scanning workflows by combining automated detection with contextual reasoning.",
      "Explores how AI-assisted security workflows can improve judgment rather than just increase output volume.",
    ],
    futureWork: [
      "Richer exploitability features derived from application behavior and replayable traces.",
      "Evaluation loops for measuring ranking quality against analyst decisions.",
      "Safer integration patterns for model-assisted reasoning inside real security workflows.",
    ],
    tags: ["Python", "AI Security", "Vulnerability Triage"],
    github: "https://github.com/ptkvaibhav/invoker",
    featured: true,
    status: "Exploratory build",
  },
];

function mergeProjectWithFallback(project: Project): Project {
  const fallback = staticProjects.find((staticProject) => staticProject.slug === project.slug);

  if (!fallback) {
    return project;
  }

  return {
    ...fallback,
    ...project,
    title: fallback.title,
    excerpt: fallback.excerpt || project.excerpt,
    description: fallback.description,
    problem: project.problem || fallback.problem,
    architecture: {
      inputs: project.architecture?.inputs?.length
        ? project.architecture.inputs
        : fallback.architecture.inputs,
      processing: project.architecture?.processing?.length
        ? project.architecture.processing
        : fallback.architecture.processing,
      outputs: project.architecture?.outputs?.length
        ? project.architecture.outputs
        : fallback.architecture.outputs,
    },
    components: project.components.length ? project.components : fallback.components,
    securityImpact: project.securityImpact.length
      ? project.securityImpact
      : fallback.securityImpact,
    futureWork: project.futureWork.length ? project.futureWork : fallback.futureWork,
    tags: project.tags.length
      ? Array.from(new Set([...fallback.tags, ...project.tags]))
      : fallback.tags,
    status: fallback.status || project.status,
    downloadUrl: project.downloadUrl,
  };
}

function getProjectSortScore(project: Project) {
  const updatedAt = project.lastUpdated ? new Date(project.lastUpdated).getTime() : 0;
  return Number.isNaN(updatedAt) ? 0 : updatedAt;
}

function sortProjects(projects: Project[]) {
  return [...projects].sort((left, right) => {
    if (left.featured !== right.featured) {
      return Number(right.featured) - Number(left.featured);
    }

    const updatedDifference = getProjectSortScore(right) - getProjectSortScore(left);
    if (updatedDifference !== 0) {
      return updatedDifference;
    }

    const starsDifference = (right.stars || 0) - (left.stars || 0);
    if (starsDifference !== 0) {
      return starsDifference;
    }

    return left.title.localeCompare(right.title);
  });
}

export const getProjects = cache(async (): Promise<Project[]> => {
  try {
    const githubProjects = await getGithubProjects();

    if (!githubProjects.length) {
      return sortProjects(staticProjects);
    }

    return sortProjects(githubProjects.map(mergeProjectWithFallback));
  } catch {
    return sortProjects(staticProjects);
  }
});

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, 6);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}
