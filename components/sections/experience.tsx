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
    <div className="mx-auto max-w-3xl space-y-10 text-center" ref={containerRef}>
      <div className="flex justify-center">
        <Image
          src={professionalExperience.logo}
          alt={`${professionalExperience.brand} logo`}
          width={150}
          height={36}
          className="h-10 w-auto"
        />
      </div>

      <div className="space-y-2">
        <p className={typography.panelLabel}>{professionalExperience.brand}</p>
      </div>

      <div className="border-t border-slate-200 pt-10">
        {professionalExperience.roles.map((role) => (
          <article
            key={`${role.title}-${role.period}`}
            data-experience-role
            className="space-y-5 py-8 first:pt-0 last:pb-0"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{role.title}</h3>
              <p className={typography.panelLabel}>{role.period}</p>
            </div>

            <div className="mx-auto max-w-2xl space-y-3 text-left">
              {role.focus.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-violet-600" />
                  <p className={typography.cardText}>{item}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
