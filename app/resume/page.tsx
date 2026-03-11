import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume and background for ${siteConfig.name}.`,
};

const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";

export default function ResumePage() {
  return (
    <section className="container py-20 md:py-24">
      <Reveal className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <Badge variant="accent" className="w-fit">
            Resume
          </Badge>
          <h1 className="font-serif text-5xl tracking-tight text-white md:text-6xl">
            Resume, credentials, and a printable overview.
          </h1>
          <p className="text-lg leading-8 text-zinc-400">
            View the embedded PDF below or open the resume directly for downloading and sharing.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={resumePath} target="_blank" rel="noreferrer">
              Open PDF
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href={resumePath} download>
              Download
              <Download className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <Card className="overflow-hidden p-2">
          <iframe
            title={`${siteConfig.name} resume`}
            src={resumePath}
            className="h-[80vh] w-full rounded-[1.25rem] border-0 bg-white"
          />
        </Card>
      </Reveal>
    </section>
  );
}
