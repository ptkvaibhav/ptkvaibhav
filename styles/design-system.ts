export const typography = {
  sectionLabel: "eyebrow",
  sectionTitle: "text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-4xl md:text-[2.75rem]",
  sectionDescription: "max-w-2xl text-base leading-relaxed text-muted-foreground",
  pageTitle: "text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl",
  pageDescription: "text-base leading-relaxed text-muted-foreground",
  cardTitle: "text-lg font-semibold tracking-tight text-foreground",
  cardText: "text-sm leading-relaxed text-muted-foreground",
  panelLabel: "font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground",
  statValue: "text-2xl font-bold tracking-tight text-foreground md:text-3xl",
  statLabel: "text-xs text-muted-foreground",
} as const;

export const spacing = {
  section: "py-20",
  sectionHeader: "mb-10 space-y-4 md:mb-14",
  card: "p-5 md:p-6",
  cardLarge: "p-6 md:p-8",
} as const;
