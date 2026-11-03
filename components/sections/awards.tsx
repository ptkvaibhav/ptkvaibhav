import { Stamp } from "@/components/dossier/stamp";
import { SectionHeader } from "@/components/ui/section-header";

const items = [
  {
    seal: "Speaker",
    issuer: "NULLCON 2025 · Goa",
    title: "Smart Automation using Artificial Intelligence",
    body: "Conference talk on using AI agent workflows to automate repetitive penetration testing, vulnerability triage, and normalisation of scanner findings.",
    rotate: -10,
  },
  {
    seal: "Top 1%",
    issuer: "Deloitte",
    title: "Outstanding Performance Award",
    body: "For delivering cybersecurity programs for US government healthcare systems, building secure SDLC pipelines, and leading incident triage.",
    rotate: 7,
  },
  {
    seal: "Applause",
    issuer: "Deloitte · multiple",
    title: "Applause Awards",
    body: "Recognised for security automation, mentoring a 14-person team, and cutting false-positive noise across engagements.",
    rotate: -6,
  },
];

export function AwardsSection() {
  return (
    <>
      <SectionHeader index="04" eyebrow="Commendations" title="Awards & talks" note="mom is very proud" />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="paper relative flex flex-col p-2">
            {/* certificate double border */}
            <div className="flex flex-1 flex-col border-2 border-double border-foreground/40 p-5 md:p-6" style={{ borderWidth: 5 }}>
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Certificate of</p>
              <p className="text-center font-typewriter text-lg text-foreground">commendation</p>
              <div className="my-5 flex justify-center">
                <Stamp rotate={item.rotate} className="px-3 py-1.5 text-2xl">
                  {item.seal}
                </Stamp>
              </div>
              <h3 className="text-center text-lg font-semibold leading-snug text-foreground">{item.title}</h3>
              <p className="mt-1 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">{item.issuer}</p>
              <p className="mt-4 text-center text-sm leading-relaxed text-foreground/80">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
