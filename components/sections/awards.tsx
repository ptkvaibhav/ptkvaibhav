import { typography } from "@/styles/design-system";

export function AwardsSection() {
  return (
    <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
      <div className="space-y-4">
        <h2 className={typography.sectionTitle}>Awards</h2>
      </div>

      <div className="space-y-14">
        <div className="space-y-6">
          <p className={typography.panelLabel}>Deloitte</p>
          <div className="h-px w-full bg-slate-200" />
          <ul className="space-y-2 pl-5 text-sm leading-6 text-slate-600 marker:text-violet-600">
            <li>Outstanding Performance Award (Top 1%)</li>
            <li>
              Excellence in delivering and managing cybersecurity programs for US government
              systems
            </li>
            <li>Applause Awards</li>
            <li>
              Recognized for security program implementation, automation, and delivery impact
              across multiple engagements
            </li>
          </ul>
        </div>

        <div className="space-y-6 border-t border-slate-200 pt-10">
          <p className={typography.panelLabel}>Community</p>
          <div className="h-px w-full bg-slate-200" />
          <ul className="space-y-2 pl-5 text-sm leading-6 text-slate-600 marker:text-violet-600">
            <li>
              Speaker at NULLCON 2025 - &ldquo;Smart Automation using Artificial
              Intelligence&rdquo;, focusing on using AI to automate repetitive security
              workflows
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
