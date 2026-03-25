import { typography } from "@/styles/design-system";

export function AwardsSection() {
  return (
    <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
      <div className="space-y-4">
        <h2 className={typography.sectionTitle}>Awards</h2>
      </div>

      <div className="space-y-10">
        <div className="space-y-5">
          <p className={typography.panelLabel}>Deloitte</p>
          <div className="h-px w-full bg-slate-200" />
          <ul className="space-y-2 pl-5 text-sm leading-7 text-slate-600 marker:text-violet-600">
            <li>Outstanding Performance Award (Top 1%)</li>
            <li>Additional internal awards (total: 9 across delivery and performance)</li>
          </ul>
        </div>

        <div className="space-y-5">
          <p className={typography.panelLabel}>Community</p>
          <div className="h-px w-full bg-slate-200" />
          <ul className="space-y-2 pl-5 text-sm leading-7 text-slate-600 marker:text-violet-600">
            <li>NULLCON Speaker - presented applied security concepts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
