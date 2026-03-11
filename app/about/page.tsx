import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}`,
};

export const dynamic = "force-static";

const principles = [
  "Understand application behavior before assuming the vulnerability class.",
  "Build workflows that engineers can actually live with.",
  "Treat automation as a way to improve judgment, not replace it.",
  "Keep one foot in real delivery environments and one in experimentation.",
];

export default function AboutPage() {
  return (
    <section className="container py-20 md:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="space-y-6">
          <Badge variant="accent" className="w-fit">
            About
          </Badge>
          <div className="space-y-5">
            <h1 className="font-serif text-5xl tracking-tight text-white md:text-6xl">
              Security engineering driven by curiosity and evidence.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-zinc-400">{siteConfig.bio}</p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <Card className="p-8">
            <CardHeader className="space-y-4">
              <CardTitle>How I approach the work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-base leading-8 text-zinc-400">
                I am most engaged when security work demands both technical depth and systems
                thinking. That usually means understanding how software behaves under pressure,
                validating what matters, and designing better paths for teams to act on that
                information.
              </p>
              <div className="grid gap-4">
                {principles.map((principle) => (
                  <div
                    key={principle}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-base leading-7 text-zinc-300"
                  >
                    {principle}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
