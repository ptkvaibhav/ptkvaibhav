"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { professionalExperience } from "@/lib/content";
import { cn } from "@/lib/utils";
import { typography } from "@/styles/design-system";

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return;
    }

    const roles = container.querySelectorAll<HTMLElement>("[data-experience-role]");

    const animation = gsap.fromTo(
      roles,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: container,
          start: "top 78%",
          once: true,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  return (
    <div className="experience-layout" ref={containerRef}>
      <div className="experience-brand">
        <Image
          src={professionalExperience.logo}
          alt={`${professionalExperience.brand} logo`}
          width={164}
          height={40}
          className="h-7 w-auto opacity-100"
        />
        <p className={typography.panelLabel}>Application Security</p>
      </div>

      <div className="timeline">
        {professionalExperience.roles.map((role, index) => (
          <article
            key={`${role.title}-${role.period}`}
            data-experience-role
            className={index === 0 ? "role" : "role opacity-80"}
          >
            <div
              className={cn(
                "rounded-[26px] border border-white/70 px-5 py-5 transition duration-200 md:px-6",
                index === 0
                  ? "bg-white/86 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
                  : "bg-white/58 hover:bg-white/78 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3
                  className={
                    index === 0
                      ? "text-[1.45rem] font-black tracking-tight text-slate-950 md:text-[1.7rem]"
                      : "text-[1.25rem] font-bold tracking-tight text-slate-900 md:text-[1.45rem]"
                  }
                >
                  {role.title}
                </h3>
                <p className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cyan-800">
                  {role.period}
                </p>
              </div>

              <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600 md:grid-cols-2">
                {role.focus.map((item) => (
                  <li key={item} className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
