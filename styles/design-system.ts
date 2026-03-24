export const typography = {
  sectionLabel: "text-xs font-medium uppercase tracking-[0.2em] text-emerald-400",
  sectionTitle: "text-3xl font-semibold tracking-tight text-white md:text-4xl",
  sectionDescription: "max-w-2xl text-base leading-8 text-stone-300/90",
  pageTitle: "text-4xl font-semibold tracking-tight text-white md:text-6xl",
  pageDescription: "max-w-2xl text-lg leading-8 text-stone-300/90",
  cardTitle: "text-xl font-semibold tracking-tight text-white",
  cardText: "text-sm leading-7 text-stone-300/90",
  panelLabel: "text-sm uppercase tracking-[0.16em] text-zinc-500",
  statValue: "text-2xl font-semibold tracking-tight text-white md:text-3xl",
  statLabel: "text-xs uppercase tracking-wide text-zinc-500",
} as const;

export const spacing = {
  section: "py-24 md:py-32",
  sectionHeader: "mb-12 space-y-4",
  card: "p-6",
  cardLarge: "p-8",
} as const;
