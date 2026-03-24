export const siteConfig = {
  name: "Pratik Vaibhav",
  description: "Application Security Engineer",
  bio: "6+ years securing enterprise and government systems across application, infrastructure, and DevSecOps environments.",
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
