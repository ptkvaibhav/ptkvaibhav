export const typography = {
  sectionLabel: "text-xs uppercase tracking-widest text-emerald-400",
  sectionTitle: "text-3xl font-semibold tracking-tight text-white md:text-4xl",
  sectionDescription: "max-w-2xl text-zinc-400 md:leading-8",
  pageTitle: "font-serif text-4xl tracking-tight text-white md:text-5xl",
  pageDescription: "max-w-2xl text-lg leading-8 text-zinc-400",
  cardTitle: "font-sans text-lg font-semibold text-zinc-200",
  cardText: "text-sm leading-7 text-zinc-400",
  panelLabel: "text-sm uppercase tracking-wide text-zinc-500",
  statValue: "text-2xl font-semibold tracking-tight text-white md:text-3xl",
  statLabel: "text-xs uppercase tracking-wide text-zinc-500",
} as const;

export const spacing = {
  section: "py-24 md:py-32",
  sectionHeader: "mb-10 space-y-4",
  card: "p-6",
  cardLarge: "p-8",
} as const;
