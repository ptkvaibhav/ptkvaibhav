import { typography } from "@/styles/design-system";

const awardGroups = [
  {
    source: "Deloitte",
    items: [
      {
        title: "Outstanding Performance Award",
        badge: "Top 1%",
        description:
          "Recognized for high-impact cybersecurity delivery across US government systems, security program execution, and measurable delivery ownership.",
      },
      {
        title: "Applause Awards",
        badge: "Delivery impact",
        description:
          "Awarded for security program implementation, automation, stakeholder management, and consistent execution across multiple AppSec engagements.",
      },
    ],
  },
  {
    source: "Community",
    items: [
      {
        title: "NULLCON 2025 Speaker",
        badge: "AI security automation",
        description:
          "Presented Smart Automation using Artificial Intelligence, focused on reducing repetitive security workflow effort through practical AI-assisted automation.",
      },
    ],
  },
] as const;

export function AwardsSection() {
  return (
    <div className="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
      <div className="space-y-4">
        <h2 className={typography.sectionTitle}>Awards</h2>
        <p className={typography.sectionDescription}>
          Recognition tied to measurable delivery, leadership, and security community work.
        </p>
      </div>

      <div className="space-y-5">
        {awardGroups.map((group) => (
          <section
            key={group.source}
            className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_46px_rgba(15,23,42,0.08)] backdrop-blur"
          >
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-cyan-800">
              {group.source}
            </p>
            <div className="space-y-4">
              {group.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-200/80 bg-white/76 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-xl font-black tracking-tight text-slate-950">
                      {item.title}
                    </h3>
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-800">
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
