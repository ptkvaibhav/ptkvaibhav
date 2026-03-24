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
        <h1 className={typography.pageTitle}>Security engineering focused on real systems.</h1>
        <p className={typography.pageDescription}>
          I work in application security with a focus on how systems behave under real conditions.
        </p>
        <div className="space-y-6 text-base leading-8 text-stone-300/85">
          <p>
            Over the past 6+ years, I&apos;ve worked across application security, DevSecOps, and
            penetration testing in environments where security decisions have real impact —
            particularly in US government-facing systems.
          </p>
          <p>
            My work is less about identifying issues and more about validating risk. I focus on
            understanding how a system can fail, whether a vulnerability is actually exploitable,
            and how teams can fix issues without slowing down development.
          </p>
          <p>
            I&apos;ve led security efforts across large applications, built internal tooling to
            reduce false positives, and helped teams move from reactive testing to structured
            security programs.
          </p>
          <div className="space-y-3">
            <p>I&apos;m particularly interested in:</p>
            <ul className="space-y-2">
              <li>- Application behavior under attack</li>
              <li>- Reducing noise in vulnerability management</li>
              <li>- Building systems that improve security decision-making</li>
            </ul>
          </div>
          <p>Security, to me, is about clarity — understanding what matters, and acting on it.</p>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="mt-16">
        <AwardsSection />
      </Reveal>
    </section>
  );
}
