import { typography } from "@/styles/design-system";

export function AwardsSection() {
  return (
    <div className="mx-auto max-w-3xl space-y-12 text-center">
      <div className="space-y-4">
        <h2 className={typography.sectionTitle}>Awards</h2>
      </div>

      <div className="space-y-10">
        <div className="space-y-5">
          <p className={typography.panelLabel}>Deloitte Awards</p>
          <div className="mx-auto max-w-2xl space-y-3 text-left">
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-violet-600" />
              <p className={typography.cardText}>Outstanding Performance Award (Top 1%)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-violet-600" />
              <p className={typography.cardText}>
                Additional internal awards (total: 9 across delivery and performance)
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <p className={typography.panelLabel}>Industry Contribution</p>
          <div className="mx-auto max-w-2xl space-y-3 text-left">
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
