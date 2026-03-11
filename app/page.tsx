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
      <section className="relative container py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
        <div className="grid gap-16 md:gap-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6 md:space-y-8">
            <Reveal delay={0}>
              <Badge variant="accent" className="w-fit">
                Cybersecurity Engineer
              </Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="max-w-xl md:max-w-2xl">
                <h1 className="text-4xl font-semibold leading-tight tracking-tight drop-shadow-[0_10px_30px_rgba(56,189,248,0.15)] sm:text-5xl lg:text-5xl">
                  {siteConfig.description}
                </h1>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-lg leading-8 text-zinc-400">{siteConfig.bio}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-2">
                <Button asChild size="lg" className="group">
                  <Link href="/projects">
                    View projects
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">Start a conversation</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="space-y-6">
              <Card className="surface-grid p-6 md:p-8 border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-[0_20px_80px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1">
                <div className="space-y-6">
                  <CardHeader className="space-y-3">
                    <Badge className="w-fit">At a glance</Badge>
                    <CardTitle className="text-2xl">Security Workbench</CardTitle>
                  </CardHeader>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-sm text-zinc-400">
                    <p>$ scanning application surface...</p>
                    <p className="text-emerald-400">{"\u2713"} endpoint discovery complete</p>
                    <p className="text-emerald-400">{"\u2713"} dependency graph analyzed</p>
                    <p className="text-yellow-400">! unusual response pattern detected</p>
                  </div>
                  {activity.length ? (
                    <>
                      <div className="pt-6 border-t border-white/10" />
                      <div className="space-y-2 text-sm">
                        <p className="text-xs uppercase tracking-wider text-zinc-500">
                          Recent activity
                        </p>

                        {activity.slice(0, 3).map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-zinc-400"
                          >
                            <span>{item.message}</span>
                            <span className="text-xs text-zinc-500">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                  <p className="text-xs uppercase tracking-wider text-zinc-500">Core areas</p>
                  <div className="space-y-4">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 md:p-5 transition hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                      <p className="text-sm font-medium text-zinc-200">Application Security</p>
                      <p className="mt-2 text-sm text-zinc-400">
                        Design reviews, secure SDLC, adversarial analysis, and behavior-driven
                        testing of modern applications.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 md:p-5 transition hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                      <p className="text-sm font-medium text-zinc-200">Offensive Security</p>
                      <p className="mt-2 text-sm text-zinc-400">
                        Finding weak assumptions, validating exploitability, and turning findings
                        into evidence teams can act on.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 md:p-5 transition hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                      <p className="text-sm font-medium text-zinc-200">Security Automation</p>
                      <p className="mt-2 text-sm text-zinc-400">
                        Building tools, parsers, and systems that improve signal quality and
                        reduce friction for engineering teams.
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-sm font-medium text-zinc-200">Open source</p>
                    <p className="mt-2 text-sm text-zinc-400">
                      Active projects and tooling experiments around application security and
                      offensive testing.
                    </p>
                    <Button asChild variant="secondary" size="sm" className="mt-4">
                      <Link href="https://github.com/ptkvaibhav">View GitHub</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
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
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
              Featured Projects
            </p>
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
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
              Research Preview
            </p>
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
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                  Contact CTA
                </p>
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
