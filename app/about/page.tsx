import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { AwardsSection } from "@/components/sections/awards";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site";
import { spacing, typography } from "@/styles/design-system";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}`,
};

export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <section className={`container ${spacing.section}`}>
      <Reveal className="max-w-3xl space-y-6">
        <Badge className="w-fit">About</Badge>
        <h1 className={typography.pageTitle}>How I got here, and how I approach security work.</h1>
        <p className={typography.pageDescription}>
          I work in application security because I care about how systems actually fail, not just
          how they look on paper.
        </p>
        <div className="space-y-6 text-base leading-8 text-stone-300/85">
          <p>
            My path into security started with testing real systems and seeing how often risk gets
            hidden behind process, tooling noise, or assumptions that nobody has challenged yet.
            That shaped the kind of work I enjoy most: understanding application behavior under
            pressure and turning that understanding into something teams can act on.
          </p>
          <p>
            Over time that pulled me into application security, secure SDLC work, offensive
            validation, and internal tooling. I am most useful when I can help distinguish real
            issues from weak signals, improve the quality of vulnerability triage, and give
            engineering teams clearer evidence for what needs to be fixed first.
          </p>
          <p>
            My approach is straightforward: security should improve decisions. That means going
            beyond generic findings, validating risk in context, and building programs or workflows
            that reduce false positives instead of creating more review overhead.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="mt-16">
        <AwardsSection />
      </Reveal>
    </section>
  );
}
