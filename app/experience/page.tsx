import type { Metadata } from "next";

import { ExperienceSection } from "@/components/sections/experience";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site";
import { spacing, typography } from "@/styles/design-system";

export const metadata: Metadata = {
  title: "Experience",
  description: `Professional experience and security leadership background for ${siteConfig.name}.`,
};

export default function ExperiencePage() {
  return (
    <section className={`container ${spacing.section}`}>
      <Reveal className={spacing.sectionHeader}>
        <Badge className="w-fit">Experience</Badge>
        <h1 className={typography.pageTitle}>Professional experience.</h1>
        <p className={typography.pageDescription}>
          Deloitte roles across application security leadership, secure SDLC, penetration testing,
          DevSecOps delivery, and measurable security outcomes.
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <ExperienceSection />
      </Reveal>
    </section>
  );
}
