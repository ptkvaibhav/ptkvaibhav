import { cn } from "@/lib/utils";
import { typography } from "@/styles/design-system";

type SectionHeaderProps = {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export function SectionHeader({ index, eyebrow, title, description, action, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="max-w-2xl space-y-4">
        <p className="eyebrow">
          {index ? <span className="text-muted-foreground">{index}</span> : null}
          {index ? <span aria-hidden className="h-px w-6 bg-primary/50" /> : null}
          {eyebrow}
        </p>
        <h2 className={typography.sectionTitle}>{title}</h2>
        {description ? <p className={typography.sectionDescription}>{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
