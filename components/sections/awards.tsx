import { typography } from "@/styles/design-system";

export function AwardsSection() {
  return (
    <div className="text-container space-y-6">
      <div className="space-y-3">
        <h2 className={typography.sectionTitle}>Recognition</h2>
        <p className={typography.panelLabel}>Deloitte</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-violet-600" />
          <p className={typography.cardText}>Outstanding Performance Award (Top percentile)</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-violet-600" />
          <p className={typography.cardText}>
            Additional internal awards (total: 9 across performance and delivery)
          </p>
        </div>
      </div>
    </div>
  );
}
