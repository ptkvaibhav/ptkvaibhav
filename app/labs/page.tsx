import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Labs",
  description: "Interactive security experiments and sandbox environments by Pratik Vaibhav.",
};

const labs = [
  {
    title: "XSS Lab",
    description:
      "A controlled environment for exploring reflected, stored, and DOM-based cross-site scripting behavior.",
  },
  {
    title: "SQL Injection Lab",
    description:
      "A practical sandbox focused on injection primitives, payload behavior, and defensive testing workflows.",
  },
  {
    title: "Prompt Injection Lab",
    description:
      "An experiment space for adversarial prompt patterns, unsafe tool access, and model workflow abuse cases.",
  },
];

export default function LabsPage() {
  return (
    <section className="container py-20 md:py-24">
      <Reveal className="mb-10 space-y-6">
        <Badge variant="accent" className="w-fit">
          Labs
        </Badge>
        <div className="max-w-3xl space-y-4">
          <h1 className="font-serif text-5xl tracking-tight text-white md:text-6xl">
            Interactive experiments for offensive security and application behavior.
          </h1>
          <p className="text-lg leading-8 text-zinc-400">
            This section is being prepared for guided security experiments, exploit learning, and
            small adversarial test environments.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {labs.map((lab, index) => (
          <Reveal key={lab.title} delay={index * 0.05}>
            <Card className="h-full p-6">
              <CardHeader className="space-y-4">
                <Badge className="w-fit">Coming Soon</Badge>
                <CardTitle>{lab.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-7 text-zinc-400">{lab.description}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
