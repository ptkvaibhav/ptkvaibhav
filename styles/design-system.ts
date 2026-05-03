export const typography = {
  sectionLabel: "text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700",
  sectionTitle: "text-[2.2rem] font-black leading-[1.02] tracking-[-0.04em] text-slate-950 md:text-[3rem]",
  sectionDescription: "max-w-[700px] text-sm leading-6 text-slate-600 md:text-[0.95rem]",
  pageTitle: "text-[2.5rem] font-extrabold leading-[1.02] tracking-tight text-slate-900 md:text-[2.9rem]",
  pageDescription: "text-sm leading-6 text-slate-700 md:text-[0.95rem]",
  cardTitle: "text-[1.375rem] font-semibold tracking-tight text-slate-900",
  cardText: "text-sm leading-6 text-slate-600 md:text-[0.95rem]",
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
