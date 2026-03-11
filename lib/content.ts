import type { ResearchPost } from "@/types/research";

export const expertiseAreas = [
  {
    title: "Application Security",
    description:
      "Threat modeling, secure SDLC, SAST, DAST, API security, code review, and offensive validation focused on product behavior.",
  },
  {
    title: "Offensive Security",
    description:
      "Manual testing, attack-surface exploration, exploit validation, and adversarial thinking applied to modern web applications.",
  },
  {
    title: "Security Engineering",
    description:
      "Automation, parsers, pipelines, extensions, and internal tooling that reduce noise and improve operational security outcomes.",
  },
];

export const collaborationAreas = [
  "Product security program design for engineering teams",
  "Application security reviews and offensive validation",
  "Security automation and internal tooling for AppSec workflows",
  "Research-driven experiments around agentic pentesting systems",
];

export const researchPosts: ResearchPost[] = [
  {
    slug: "adversarial-behavior-in-modern-applications",
    title: "Adversarial behavior in modern applications",
    excerpt:
      "A practical way to think about how web applications reveal their weak points once you observe them under pressure.",
    publishedAt: "2026-02-14",
    readTime: "6 min read",
    tags: ["Application Security", "Research"],
    content: [
      "Modern applications rarely fail in one obvious place. They leak intent through interactions between endpoints, state transitions, caching layers, and authorization assumptions.",
      "My research interest is less about isolated vulnerability classes and more about behavior: how a system responds when you push it beyond the happy path, how quickly it becomes inconsistent, and how much evidence that behavior leaves behind.",
      "That mindset shapes both my testing work and my tooling. The more we can capture application behavior with structure, the better we can design systems that surface risky patterns before they become incidents.",
    ],
  },
  {
    slug: "designing-security-tooling-that-developers-will-actually-use",
    title: "Designing security tooling that developers will actually use",
    excerpt:
      "Security tooling only matters if it survives the reality of engineering teams, deadlines, and noisy pipelines.",
    publishedAt: "2026-01-09",
    readTime: "5 min read",
    tags: ["Security Engineering", "DevSecOps"],
    content: [
      "A large part of security engineering is deciding what not to make developers deal with. A workflow that adds friction without adding clarity will be bypassed, ignored, or resented.",
      "That is why I care about parsers, signal quality, and automation surfaces. Good tooling should compress the distance between an issue, the evidence that proves it, and the action that fixes it.",
      "This is also why I keep building small systems around existing scanners and review tools. The gap is often not detection. The gap is usability.",
    ],
  },
  {
    slug: "toward-more-reliable-offensive-automation",
    title: "Toward more reliable offensive automation",
    excerpt:
      "Automation in offensive security gets interesting when the goal shifts from volume to better judgment.",
    publishedAt: "2025-12-01",
    readTime: "7 min read",
    tags: ["Offensive Security", "Automation"],
    content: [
      "I am interested in offensive automation that does more than run tools in sequence. The useful problem is how to preserve context, accumulate evidence, and decide when to go deeper versus when to stop.",
      "That is part of the reason I am building agentic systems like Clinkz. The objective is not novelty. The objective is a testing workflow that behaves more like a thoughtful operator and less like a firehose.",
      "The closer we get to structured, explainable offensive automation, the more valuable these systems become inside real security programs.",
    ],
  },
];
