import type { Metadata } from "next";
import { GeistMono, GeistSans } from "geist/font";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const defaultTitle = "Pratik Vaibhav | Application Security Engineer";
const defaultDescription =
  "Cybersecurity engineer specializing in application security, offensive security, and security automation.";
const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pratik Vaibhav",
  url: "https://ptkvaibhav.dev",
  jobTitle: "Cybersecurity Engineer",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializedPersonStructuredData }}
        />
      </head>
      <body
        className={cn(
          GeistSans.className,
          GeistMono.variable,
          "min-h-screen bg-background text-foreground"
        )}
      >
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[size:36px_36px] opacity-[0.18]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-emerald-500/10 to-transparent blur-3xl" />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
