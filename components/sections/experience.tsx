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
    <div
      className="grid gap-10 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-14"
      ref={containerRef}
    >
      <div className="hidden lg:block">
        <div className="sticky top-28 flex flex-col items-center">
          <Image
            src={professionalExperience.logo}
            alt={`${professionalExperience.brand} logo`}
            width={150}
            height={36}
            className="h-10 w-auto"
          />
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <Image
            src={professionalExperience.logo}
            alt={`${professionalExperience.brand} logo`}
            width={150}
            height={36}
            className="h-10 w-auto lg:hidden"
          />
          <p className={typography.panelLabel}>{professionalExperience.brand}</p>
        </div>

        <div className="relative border-l border-slate-200 pl-8">
          {professionalExperience.roles.map((role) => (
            <article
              key={`${role.title}-${role.period}`}
              data-experience-role
              className="relative space-y-4 pb-10 last:pb-0"
            >
              <span className="absolute -left-[2.05rem] top-[0.5rem] h-3 w-3 rounded-full bg-violet-600 ring-4 ring-[#f8f7ff]" />

              <div className="space-y-2">
                <h3 className="text-[1.7rem] font-semibold tracking-tight text-slate-900 md:text-[1.9rem]">
                  {role.title}
                </h3>
                <p className={typography.panelLabel}>{role.period}</p>
              </div>

              <ul className="space-y-2 pl-5 text-sm leading-7 text-slate-600 marker:text-violet-600">
                {role.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
