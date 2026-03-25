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
          <div className="mt-6 h-[560px] w-px bg-slate-200" />
        </div>
      </div>

      <div className="space-y-10">
        <div className="space-y-3 lg:hidden">
          <Image
            src={professionalExperience.logo}
            alt={`${professionalExperience.brand} logo`}
            width={150}
            height={36}
            className="h-10 w-auto"
          />
          <p className={typography.panelLabel}>{professionalExperience.brand}</p>
        </div>

        {professionalExperience.roles.map((role) => (
          <article
            key={`${role.title}-${role.period}`}
            data-experience-role
            className="space-y-4 border-t border-slate-200 pt-8 first:border-t-0 first:pt-0"
          >
            <div className="space-y-2">
              <h3 className="text-[1.55rem] font-semibold tracking-tight text-slate-900">
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
  );
}
