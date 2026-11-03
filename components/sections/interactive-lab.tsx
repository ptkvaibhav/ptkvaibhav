"use client";

import * as React from "react";
import { Terminal as TerminalIcon, Sliders } from "lucide-react";

import { SecurityTerminal } from "@/components/interactive/terminal";
import { TriageSimulator } from "@/components/interactive/triage-simulator";
import { useSound } from "@/components/providers/sound-provider";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "terminal", label: "Terminal", short: "Terminal", icon: TerminalIcon },
  { id: "simulator", label: "Triage benchmark", short: "Benchmark", icon: Sliders },
] as const;

export function InteractiveLabSection() {
  const [activeTab, setActiveTab] = React.useState<"terminal" | "simulator">("terminal");
  const { playSound } = useSound();

  return (
    <>
      <SectionHeader
        index="04"
        eyebrow="Lab"
        title="Poke around."
        description="A small terminal with my background baked in, plus a simulation of how correlating SAST, DAST and SCA results cuts false positives."
        action={
          <div role="tablist" className="inline-flex w-full rounded-full border border-border bg-card p-1 md:w-auto">
            {tabs.map(({ id, label, short, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                onClick={() => {
                  playSound("click");
                  setActiveTab(id);
                }}
                className={cn(
                  "flex h-9 flex-1 items-center justify-center gap-2 rounded-full px-4 text-sm transition-colors md:flex-none",
                  activeTab === id
                    ? "bg-foreground font-medium text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="sm:hidden">{short}</span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        }
      />

      {activeTab === "terminal" ? <SecurityTerminal /> : <TriageSimulator />}
    </>
  );
}
