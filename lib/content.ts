export const professionalExperience = {
  company: "Deloitte & Touche AERS India Private Limited",
  brand: "Deloitte",
  location: "Bangalore, Karnataka",
  logo: "/logos/deloitte.svg",
  summary:
    "Application security, DevSecOps, penetration testing, and security program delivery across enterprise and government systems.",
  roles: [
    {
      title: "Lead Solution Advisor",
      company: "Deloitte",
      period: "Jun 2025 - Present",
      metrics: ["33% posture improvement", "14-member team led"],
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

export const awards = [
  {
    title: "Outstanding Performance Award",
    highlight: "Top 1%",
    description:
      "Excellence in delivering and managing cybersecurity programs for US government systems.",
  },
  {
    title: "Applause Awards",
    highlight: "Multiple awards",
    description:
      "Recognized for security program implementation, automation, and delivery impact across multiple engagements.",
  },
  {
    title: "NULLCON speaker",
    highlight: "NULLCON 2025",
    description:
      "Speaker at NULLCON 2025 - 'Smart Automation using Artificial Intelligence', focusing on using AI to automate repetitive security workflows.",
  },
] as const;
