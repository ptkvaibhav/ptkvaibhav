export const typography = {
  sectionLabel: "text-xs font-semibold uppercase tracking-[0.22em] text-violet-700",
  sectionTitle: "text-[1.75rem] font-bold leading-[1.15] tracking-tight text-slate-900 md:text-[2rem]",
  sectionDescription: "max-w-[700px] text-base leading-[1.6] text-slate-600",
  pageTitle: "text-[2.25rem] font-bold leading-[1.08] tracking-tight text-slate-900",
  pageDescription: "text-base leading-[1.6] text-slate-700",
  cardTitle: "text-[1.375rem] font-semibold tracking-tight text-slate-900",
  cardText: "text-base leading-[1.6] text-slate-600",
  panelLabel: "text-sm uppercase tracking-[0.16em] text-slate-500",
  statValue: "text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl",
  statLabel: "text-xs uppercase tracking-wide text-slate-500",
} as const;

export const spacing = {
  section: "py-20",
  sectionHeader: "mb-12 space-y-4",
  card: "p-6",
  cardLarge: "p-8",
} as const;
