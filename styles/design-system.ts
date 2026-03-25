export const typography = {
  sectionLabel: "text-xs font-semibold uppercase tracking-[0.22em] text-violet-700",
  sectionTitle:
    "text-[2.5rem] font-bold leading-[1.08] tracking-tight text-violet-700 md:text-[3.25rem]",
  sectionDescription: "text-base leading-8 text-slate-600",
  pageTitle: "text-[3.5rem] font-bold leading-[1.02] tracking-tight text-slate-900 md:text-[4.75rem]",
  pageDescription: "text-lg leading-8 text-slate-700",
  cardTitle: "text-xl font-semibold tracking-tight text-slate-900",
  cardText: "text-sm leading-7 text-slate-600",
  panelLabel: "text-sm uppercase tracking-[0.16em] text-slate-500",
  statValue: "text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl",
  statLabel: "text-xs uppercase tracking-wide text-slate-500",
} as const;

export const spacing = {
  section: "py-24 md:py-32",
  sectionHeader: "mb-12 space-y-4",
  card: "p-6",
  cardLarge: "p-8",
} as const;
