import { Award, Mic, Star } from "lucide-react";

import { SectionHeader } from "@/components/ui/section-header";

const items = [
  {
    icon: Mic,
    kicker: "NULLCON 2025 · Goa",
    title: "Smart Automation using Artificial Intelligence",
    body: "Conference talk on using AI agent workflows to automate repetitive penetration testing, vulnerability triage, and normalisation of scanner findings.",
  },
  {
    icon: Star,
    kicker: "Deloitte · Top 1%",
    title: "Outstanding Performance Award",
    body: "For delivering cybersecurity programs for US government healthcare systems, building secure SDLC pipelines, and leading incident triage.",
  },
  {
    icon: Award,
    kicker: "Deloitte · Multiple",
    title: "Applause Awards",
    body: "Recognised for security automation, mentoring a 14-person team, and cutting false-positive noise across engagements.",
  },
];

export function AwardsSection() {
  return (
    <>
      <SectionHeader
        index="05"
        eyebrow="Recognition"
        title="Awards and speaking."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(({ icon: Icon, kicker, title, body }) => (
          <article key={title} className="surface flex flex-col p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{kicker}</p>
            <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </article>
        ))}
      </div>
    </>
  );
}
