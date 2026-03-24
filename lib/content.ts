import type { ResearchPost } from "@/types/research";

export const professionalExperience = {
  company: "Deloitte & Touche AERS India Private Limited",
  brand: "Deloitte",
  location: "Bangalore, Karnataka",
  logo: "/logos/deloitte.svg",
  summary:
    "Lead Solution Advisor with 6+ years of expertise in application security, DevSecOps, and penetration testing, leading product security work for Deloitte's Health Interactive Product serving US State Government clients.",
  roles: [
    {
      title: "Lead Solution Advisor",
      period: "Jun 2025 - Present",
      metrics: [
        "33% posture improvement",
        "23 critical flaws identified",
        "40% faster review cycles",
        "14-member team led",
      ],
      focus: [
        "Lead the Product Security Team for Deloitte's Health Interactive Product serving US State Government clients across application, database, container, and infrastructure layers.",
        "Engineered shift-left application security programs that improved overall security posture by 33%.",
        "Developed an AI-driven Burp Suite extension using Deloitte Sidekick and Burp Montoya APIs that identified 23 critical flaws.",
        "Direct a 14-member team across six US-based client systems and improved security review cycles by 40%.",
        "Own technical hiring for Application Security and Advisor roles, including interviews and candidate evaluation.",
      ],
    },
    {
      title: "Advisory Solution Advisor",
      period: "Jul 2023 - Jun 2025",
      metrics: [
        "15% billing reduction",
        "$1M resource savings",
        "40% faster reviews",
        "65% fewer false positives",
      ],
      focus: [
        "Implemented a streamlined SAST process by deploying Fortify SSC with development-environment integration.",
        "Reduced resource billing by 15 percent, review time by 40 percent, and false positives by 65 percent.",
        "Created Application Security Standards and a Secure Development checklist used across the Cyber Security practice.",
        "Investigated a security breach in a high-risk US Government application and remediated a Sensitive Information Disclosure issue.",
      ],
    },
    {
      title: "Advisory Associate Solution Advisor",
      period: "Jul 2021 - Jun 2023",
      metrics: ["5 critical vulnerabilities uncovered"],
      focus: [
        "Performed manual penetration testing on US State Government applications and uncovered five critical vulnerabilities.",
        "Validated high-impact findings including SOQL Injection, Cross-Site Scripting, and Session Hijacking.",
        "Synthesized security strategies for healthcare, engineering, and government departments during RFP planning.",
      ],
    },
    {
      title: "Advisory Analyst",
      period: "Jun 2019 - Jun 2021",
      metrics: ["Automated testing for critical Deloitte applications"],
      focus: [
        "Conducted automated application security testing for critical Deloitte applications including deloitte.com.",
        "Worked with Fortify WebInspect and Static Code Analyzer to surface and triage application risk.",
      ],
    },
  ],
} as const;

export const awards = [
  {
    title: "Outstanding Performance Award",
    highlight: "Top 1%",
    description:
      "Recognized within Deloitte's top one percent for sustained delivery impact and leadership in application security work.",
  },
  {
    title: "Deloitte awards",
    highlight: "9 awards",
    description:
      "Received nine Deloitte awards across delivery quality, ownership, security execution, and team contribution.",
  },
  {
    title: "NULLCON speaker",
    highlight: "Speaker",
    description:
      "Presented applied security ideas and practitioner experience in a public conference setting.",
  },
] as const;

export const researchPosts: ResearchPost[] = [
  {
    slug: "adversarial-behavior-in-modern-applications",
    title: "Adversarial behavior in modern applications",
    excerpt:
      "A practical framework for analyzing how modern web systems expose weak assumptions under adversarial pressure. The article explores patterns observed while building automated vulnerability discovery tooling.",
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
      "Security tooling often fails because it ignores developer workflows. This piece explores lessons learned while building automation systems for vulnerability triage and signal reduction.",
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
      "A closer look at what makes offensive automation trustworthy: preserving context, surfacing evidence, and deciding when an automated workflow should go deeper versus when it should stop.",
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
