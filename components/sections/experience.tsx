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
        <p className={typography.panelLabel}>Deloitte</p>
        <Image
          src={professionalExperience.logo}
          alt={`${professionalExperience.brand} logo`}
          width={164}
          height={40}
          className="h-10 w-auto opacity-100"
        />
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
                "-ml-4 rounded-2xl px-4 py-3 transition duration-200",
                index === 0
                  ? "bg-white/80 shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
                  : "hover:bg-white/65 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
              )}
            >
              <div className="space-y-2">
                <h3
                  className={
                    index === 0
                      ? "text-[1.6rem] font-bold tracking-tight text-slate-950 md:text-[1.75rem]"
                      : "text-[1.45rem] font-semibold tracking-tight text-slate-900 md:text-[1.55rem]"
                  }
                >
                  {role.title}
                </h3>
                <p className={typography.panelLabel}>{role.period}</p>
              </div>

              <ul className="mt-4 space-y-2 pl-5 text-sm leading-6 text-slate-600 marker:text-cyan-700">
                {role.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
