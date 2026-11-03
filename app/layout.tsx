import "./globals.css";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CommandPalette } from "@/components/interactive/command-palette";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DossierCursor } from "@/components/dossier/cursor";
import { EasterEggs } from "@/components/dossier/easter-eggs";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const defaultTitle = "Pratik Vaibhav | Senior Product Security Engineer (PSIRT)";
const defaultDescription =
  "Senior Product Security Engineer (PSIRT) at Guidewire Software. Specializing in security incident response, TruffleHog secret governance, DevSecOps automation, and offensive testing.";
const themeInitScript = `try{var t=localStorage.getItem("ptk-theme");if(t==="system"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.classList.add(t==="dark"?"dark":"light")}catch(e){document.documentElement.classList.add("light")}`;

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pratik Vaibhav",
  url: siteConfig.url,
  jobTitle: "Senior Product Security Engineer",
  sameAs: [
    "https://github.com/ptkvaibhav",
    "https://www.linkedin.com/in/ptkvaibhav/",
    "https://x.com/ptkvaibhav",
  ],
};
const serializedPersonStructuredData = JSON.stringify(personStructuredData).replace(
  /</g,
  "\\u003c"
);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e3dccb" },
    { media: "(prefers-color-scheme: dark)", color: "#110f0d" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <head>
        {/* Apply the saved theme before paint to avoid a flash. */}
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: serializedPersonStructuredData }}
        />
      </head>
      <body
        className={cn("min-h-screen bg-background font-sans text-foreground")}
      >
        <ThemeProvider defaultTheme="light" storageKey="ptk-theme">
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="relative z-[1] flex-1">{children}</main>
            <SiteFooter />
            <CommandPalette />
            <EasterEggs />
            <DossierCursor />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
