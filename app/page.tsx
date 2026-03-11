import Link from "next/link";
import { ArrowRight, Search, Shield, Wrench } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { GitHubActivity } from "@/components/sections/github-activity";
import { GitHubStats } from "@/components/sections/github-stats";
import { ProjectCard } from "@/components/sections/project-card";
import { ResearchCard } from "@/components/sections/research-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { collaborationAreas, expertiseAreas } from "@/lib/content";
import { getGithubActivity } from "@/lib/github";
import { getFeaturedProjects } from "@/lib/projects";
import { getAllResearchPosts } from "@/lib/research";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

export default async function HomePage() {
  const [projects, posts, activity] = await Promise.all([
    getFeaturedProjects(),
    Promise.resolve(getAllResearchPosts()),
    getGithubActivity(),
  ]);

  return (
    <div className="pb-16">
      <section className="container py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="space-y-8">
            <Badge variant="accent" className="w-fit">
              Cybersecurity Engineer
            </Badge>
            <div className="space-y-6">
              <h1 className="max-w-4xl font-serif text-5xl tracking-tight text-white sm:text-6xl lg:text-7xl">
                {siteConfig.description}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-400">{siteConfig.bio}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/projects">
                  View projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Start a conversation</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="surface-grid h-full p-6">
              <CardHeader className="space-y-3">
                <Badge className="w-fit">At a glance</Badge>
                <CardTitle className="text-3xl">What I focus on</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-medium text-zinc-200">Application Security</p>
                    <p className="mt-2 text-sm text-zinc-400">
                      Design reviews, secure SDLC, adversarial analysis, and behavior-driven
                      testing of modern applications.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-medium text-zinc-200">Offensive Security</p>
                    <p className="mt-2 text-sm text-zinc-400">
                      Finding weak assumptions, validating exploitability, and turning findings
                      into evidence teams can act on.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-medium text-zinc-200">Security Automation</p>
                    <p className="mt-2 text-sm text-zinc-400">
                      Building tools, parsers, and systems that improve signal quality and reduce
                      friction for engineering teams.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="container py-10">
        <Reveal>
          <GitHubStats />
        </Reveal>
      </section>

      {activity.length ? (
        <section className="container py-10">
          <Reveal>
            <GitHubActivity activities={activity} />
          </Reveal>
        </section>
      ) : null}

      <section className="container py-10">
        <Reveal className="mb-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Expertise</p>
          <h2 className="font-serif text-3xl tracking-tight text-white md:text-4xl">
            Security work across product, platform, and tooling.
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {expertiseAreas.map((area, index) => (
            <Reveal key={area.title} delay={index * 0.06}>
              <Card className="h-full p-6">
                <CardHeader className="space-y-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-emerald-300">
                    {index === 0 ? (
                      <Shield className="h-5 w-5" />
                    ) : index === 1 ? (
                      <Search className="h-5 w-5" />
                    ) : (
                      <Wrench className="h-5 w-5" />
                    )}
                  </div>
                  <CardTitle>{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-7 text-zinc-400">{area.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container py-10">
        <Reveal className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Featured Projects</p>
            <h2 className="font-serif text-3xl tracking-tight text-white md:text-4xl">
              Selected builds and research-driven systems.
            </h2>
          </div>
          <Button asChild variant="ghost">
            <Link href="/projects">All projects</Link>
          </Button>
        </Reveal>
        <div className="grid gap-5 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <ProjectCard project={project} compact />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container py-10">
        <Reveal className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Research Preview</p>
            <h2 className="font-serif text-3xl tracking-tight text-white md:text-4xl">
              Notes on software behavior, security tooling, and offensive automation.
            </h2>
          </div>
          <Button asChild variant="ghost">
            <Link href="/research">Research &amp; blog</Link>
          </Button>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-2">
          {posts.slice(0, 2).map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.06}>
              <ResearchCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container py-10">
        <Reveal className="mb-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Collaboration</p>
          <h2 className="font-serif text-3xl tracking-tight text-white md:text-4xl">
            Best fits for collaboration and security work.
          </h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {collaborationAreas.map((item, index) => (
            <Reveal key={item} delay={index * 0.05}>
              <Card className="p-5">
                <CardContent className="flex items-start gap-4">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <p className="text-base leading-7 text-zinc-300">{item}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container py-10">
        <Reveal>
          <Card className="surface-grid overflow-hidden p-8 md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Contact CTA</p>
                <h2 className="font-serif text-3xl tracking-tight text-white md:text-5xl">
                  Looking for application security depth with a builder mindset?
                </h2>
                <p className="text-lg leading-8 text-zinc-400">
                  If you are hiring, collaborating, or exploring research-led security tooling,
                  I am open to the conversation.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">Get in touch</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/resume">View resume</Link>
                </Button>
              </div>
            </div>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
