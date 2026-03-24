import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
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
        <h1 className={typography.pageTitle}>Security engineering driven by curiosity and evidence.</h1>
        <p className={typography.pageDescription}>{siteConfig.bio}</p>
        <div className="space-y-6 text-base leading-8 text-zinc-300">
          <p>
            My path into security has always been anchored in how software behaves under pressure.
            I care less about memorizing vulnerability names and more about understanding the weak
            assumptions that let risk surface in real systems.
          </p>
          <p>
            That is why my work naturally sits between application security, offensive testing, and
            engineering systems. I enjoy going deep on product behavior, validating what matters,
            and building tools or workflows that help teams move from noisy findings to clear
            action.
          </p>
          <p>
            My philosophy is straightforward: security should improve judgment, not add ceremony.
            The best work combines technical depth, usable processes, and enough curiosity to keep
            asking how a system fails before an attacker answers that question first.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
