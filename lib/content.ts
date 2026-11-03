export type RoleExperience = {
  title: string;
  company: string;
  brand: string;
  logo: string;
  location: string;
  period: string;
  metrics: string[];
  focus: string[];
};

export const professionalExperience = {
  roles: [
    {
      title: "Senior Product Security Engineer (PSIRT)",
      company: "Guidewire Software",
      brand: "Guidewire",
      logo: "/logos/guidewire.svg",
      location: "Bangalore, Karnataka",
      period: "May 2026 - Present",
      metrics: ["100+ Incidents Handled", "33% Response Time Reduction", "Secret Invalidation 70d ➔ 38d"],
      focus: [
        "Spearheaded Product Security Incident Response (PSIRT) operations across 100+ critical security incidents, streamlining cross-functional triage workflows to accelerate mean time to resolution (MTTR) by 33%.",
        "Orchestrated enterprise-wide TruffleHog secret leak incident response lifecycle, reducing secret invalidation and credential revocation timelines from 70 to 38 days (45% reduction in exposure window).",
        "Architected autonomous AI-powered PSIRT automation tooling, engineering custom Claude AI skills and a specialized CVE detection and response framework agent to automate vulnerability identification, exploit verification, and developer remediation workflows.",
        "Led root-cause investigations, post-mortem security reviews, and patch governance across distributed cloud services.",
      ],
    },
    {
      title: "Lead Solution Advisor",
      company: "Deloitte",
      brand: "Deloitte",
      logo: "/logos/deloitte.svg",
      location: "Bangalore, Karnataka",
      period: "Jun 2025 - May 2026",
      metrics: ["33% posture improvement", "14-member team led", "Top 1% Performance Rating"],
      focus: [
        "Led product security for US government healthcare systems",
        "Improved security posture by 33%",
        "Built AI-assisted testing workflows using Burp Suite",
        "Managed and mentored a 14-member AppSec team",
        "Owned end-to-end application security strategy across 3 enterprise systems.",
        "Acted as primary security decision-maker for product architecture and risk acceptance.",
        "Led incident response and vulnerability triage for production systems.",
      ],
    },
    {
      title: "Advisory Solution Advisor",
      company: "Deloitte",
      brand: "Deloitte",
      logo: "/logos/deloitte.svg",
      location: "Bangalore, Karnataka",
      period: "Jul 2023 - Jun 2025",
      metrics: ["False positives reduced to near-zero"],
      focus: [
        "Implemented SAST pipelines using Fortify SSC",
        "Reduced false positives from ~30% (300/1000 findings) to near-zero by correlating SAST, DAST, and SCA outputs for accurate risk prioritization.",
        "Built application security standards and checklists",
        "Investigated high-risk vulnerabilities in government systems",
      ],
    },
    {
      title: "Advisory Associate Solution Advisor",
      company: "Deloitte",
      brand: "Deloitte",
      logo: "/logos/deloitte.svg",
      location: "Bangalore, Karnataka",
      period: "Jul 2021 - Jun 2023",
      metrics: ["Critical vulnerabilities identified"],
      focus: [
        "Performed manual penetration testing on US government applications",
        "Identified critical vulnerabilities including SQLi and XSS",
        "Contributed to security strategy during RFP engagements",
      ],
    },
    {
      title: "Advisory Analyst",
      company: "Deloitte",
      brand: "Deloitte",
      logo: "/logos/deloitte.svg",
      location: "Bangalore, Karnataka",
      period: "Jun 2019 - Jun 2021",
      metrics: ["Enterprise application security testing"],
      focus: [
        "Conducted application security testing across enterprise systems",
        "Worked with Fortify WebInspect and SCA tools",
        "Assisted in vulnerability triage and remediation",
      ],
    },
  ],
} as const;
