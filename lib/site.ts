export const siteConfig = {
  name: "Pratik Vaibhav",
  description:
    "Cybersecurity Engineer specializing in Application Security and Offensive Security. I design and build systems that analyze software behavior, uncover vulnerabilities, and improve the security of modern applications.",
  bio: "I am a Cybersecurity Engineer specializing in Application Security, Offensive Security, and security automation. My work focuses on understanding how modern software systems behave under adversarial conditions and building tools that help uncover vulnerabilities before attackers do.",
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
    { href: "/projects", label: "Projects" },
    { href: "/research", label: "Research" },
    { href: "/contact", label: "Contact" },
    { href: "/resume", label: "Resume" },
  ],
} as const;

