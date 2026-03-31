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
    <div className="experience-layout" ref={containerRef}>
      <div className="experience-brand">
        <Image
          src={professionalExperience.logo}
          alt={`${professionalExperience.brand} logo`}
          width={140}
          height={34}
          className="h-9 w-auto"
        />
        <p className={typography.panelLabel}>{professionalExperience.brand}</p>
      </div>

      <div className="timeline">
        {professionalExperience.roles.map((role) => (
          <article
            key={`${role.title}-${role.period}`}
            data-experience-role
            className="role"
          >
            <div className="space-y-2">
              <h3 className="text-[1.45rem] font-semibold tracking-tight text-slate-900 md:text-[1.6rem]">
                {role.title}
              </h3>
              <p className={typography.panelLabel}>{role.period}</p>
            </div>

            <ul className="mt-4 space-y-2 pl-5 text-sm leading-7 text-slate-600 marker:text-violet-600">
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
