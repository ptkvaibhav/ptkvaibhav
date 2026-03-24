"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { professionalExperience } from "@/lib/content";
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
    <div ref={containerRef} className="grid gap-10 md:grid-cols-[120px_1fr] md:gap-12">
      <div className="flex items-start">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <Image
            src={professionalExperience.logo}
            alt={`${professionalExperience.brand} logo`}
            width={140}
            height={34}
            className="h-8 w-auto"
          />
        </div>
      </div>

      <div className="border-l-2 border-slate-200 pl-6">
        {professionalExperience.roles.map((role) => (
          <article
            key={`${role.title}-${role.period}`}
            data-experience-role
            className="relative mb-8 last:mb-0"
          >
            <span className="absolute -left-[33px] top-[6px] h-2 w-2 rounded-full bg-violet-600" />

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                  {role.title}
                </h3>
                <p className={typography.panelLabel}>{role.period}</p>
              </div>

              <div className="space-y-3">
                {role.focus.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-violet-600" />
                    <p className={typography.cardText}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
