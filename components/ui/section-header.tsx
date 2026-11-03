import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  note?: string;
  action?: React.ReactNode;
  className?: string;
};

/** Section heading styled like a file divider: "SECTION 02 —— EXHIBITS". */
export function SectionHeader({ index, eyebrow, title, description, note, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-10 md:mb-14", className)}>
      <div className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        <span className="label-tape">Section {index}</span>
        <span aria-hidden className="h-px flex-1 border-t border-dashed border-foreground/30" />
        <span>{eyebrow}</span>
      </div>
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="relative max-w-3xl">
          <h2 className="font-display text-[2.6rem] font-extrabold uppercase leading-[0.92] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {title}
          </h2>
          {note ? (
            <p className="mt-3 font-hand text-2xl leading-none text-blueink md:absolute md:-right-4 md:top-0 md:mt-0 md:translate-x-full md:-rotate-6 md:whitespace-nowrap">
              {note}
            </p>
          ) : null}
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}
