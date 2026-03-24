import { typography } from "@/styles/design-system";

export function AwardsSection() {
  return (
    <div className="text-container space-y-10">
      <div className="space-y-4">
        <h2 className={typography.sectionTitle}>Recognition</h2>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <p className={typography.panelLabel}>Awards</p>
          <p className="text-sm font-medium text-slate-900">Deloitte</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-violet-600" />
              <p className={typography.cardText}>Outstanding Performance Award (Top 1%)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-violet-600" />
              <p className={typography.cardText}>
                Remaining awards (total 9 across delivery and performance)
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className={typography.panelLabel}>Community</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-violet-600" />
              <p className={typography.cardText}>
                NULLCON Speaker - presented applied security concepts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
