export const siteConfig = {
  name: "Pratik Vaibhav",
  description:
    "Application Security engineer focused on offensive testing, security automation, and building systems that surface real software risk.",
  bio: "I work at the intersection of application behavior, offensive security, and engineering systems. My focus is understanding how modern software fails under adversarial conditions and building tooling that helps teams detect and fix those failures earlier.",
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
    { href: "/research", label: "Research" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
