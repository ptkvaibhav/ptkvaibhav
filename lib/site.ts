export const siteConfig = {
  name: "Pratik Vaibhav",
  description:
    "I build and break applications to understand how they fail, then design systems that catch those failures early.",
  bio: "I work across application security, offensive testing, and engineering systems. Most of my time goes into validating real software risk, building better security workflows, and helping teams fix the issues that matter sooner.",
  email: "ptkvaibhav@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  social: {
    github: "https://github.com/ptkvaibhav",
    linkedin: "https://www.linkedin.com/in/ptkvaibhav/",
    x: "https://x.com/ptkvaibhav",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
