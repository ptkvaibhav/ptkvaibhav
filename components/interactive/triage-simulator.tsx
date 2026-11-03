"use client";

import * as React from "react";
import { ShieldCheck, ShieldAlert, Sparkles, Filter, CheckCircle2, AlertTriangle, ArrowRight, Activity } from "lucide-react";
import { useSound } from "@/components/providers/sound-provider";
import { cn } from "@/lib/utils";

type Finding = {
  id: string;
  cve: string;
  type: string;
  source: "SAST" | "DAST" | "SCA";
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  isFalsePositive: boolean;
  reachability: "REACHABLE" | "UNREACHABLE_CODE" | "SANITIZED_BY_FRAMEWORK";
  details: string;
};

const SAMPLE_FINDINGS: Finding[] = [
  {
    id: "F-01",
    cve: "CVE-2024-21413",
    type: "SQL Injection in User Search",
    source: "SAST",
    severity: "CRITICAL",
    isFalsePositive: false,
    reachability: "REACHABLE",
    details: "Unparameterized query concatenated directly with input in legacy reporting handler.",
  },
  {
    id: "F-02",
    cve: "CWE-79",
    type: "Cross-Site Scripting (DOM XSS)",
    source: "SAST",
    severity: "HIGH",
    isFalsePositive: true,
    reachability: "SANITIZED_BY_FRAMEWORK",
    details: "Flagged raw variable interpolation, but DOMPurify and React auto-escaping render it inert.",
  },
  {
    id: "F-03",
    cve: "CVE-2023-44487",
    type: "HTTP/2 Rapid Reset DoS",
    source: "DAST",
    severity: "HIGH",
    isFalsePositive: false,
    reachability: "REACHABLE",
    details: "Reverse proxy lacked stream concurrency cap. Confirmed by active fuzzing probe.",
  },
  {
    id: "F-04",
    cve: "CWE-89",
    type: "Blind SQL Injection in Auth Header",
    source: "DAST",
    severity: "HIGH",
    isFalsePositive: true,
    reachability: "UNREACHABLE_CODE",
    details: "DAST scanner timed out on heavy payload; backend uses strict prepared statements.",
  },
  {
    id: "F-05",
    cve: "CVE-2024-3094",
    type: "Vulnerable Sub-dependency (XZ)",
    source: "SCA",
    severity: "CRITICAL",
    isFalsePositive: true,
    reachability: "UNREACHABLE_CODE",
    details: "Detected in dev-dependency build container, not packaged into production artifact.",
  },
  {
    id: "F-06",
    cve: "CWE-287",
    type: "Broken Object-Level Authorization (BOLA)",
    source: "DAST",
    severity: "CRITICAL",
    isFalsePositive: false,
    reachability: "REACHABLE",
    details: "Tenant ID parameter manipulation allowed unauthorized record retrieval.",
  },
];

export function TriageSimulator() {
  const [isCorrelatedMode, setIsCorrelatedMode] = React.useState(true);
  const [selectedSeverity, setSelectedSeverity] = React.useState<string>("ALL");
  const { playSound } = useSound();

  const handleToggleMode = (mode: boolean) => {
    playSound("toggle");
    setIsCorrelatedMode(mode);
  };

  const displayedFindings = SAMPLE_FINDINGS.filter((f) => {
    if (isCorrelatedMode && f.isFalsePositive) return false;
    if (selectedSeverity !== "ALL" && f.severity !== selectedSeverity) return false;
    return true;
  });

  const totalRaw = SAMPLE_FINDINGS.length;
  const totalVerified = SAMPLE_FINDINGS.filter((f) => !f.isFalsePositive).length;
  const falsePositiveCount = SAMPLE_FINDINGS.filter((f) => f.isFalsePositive).length;

  return (
    <div className="surface w-full space-y-6 p-5 sm:p-8">
      {/* Header & Impact Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <Activity className="h-3.5 w-3.5" />
            <span>Interactive AppSec Triage Engine</span>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            False-Positive Reduction &amp; AST Correlation
          </h3>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Simulate how correlating SAST (code syntax), DAST (live behavioral payload), and SCA (dependency reachability) eliminates 30% noisy false positives.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center rounded-2xl bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 shrink-0">
          <button
            onClick={() => handleToggleMode(false)}
            className={cn(
              "rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
              !isCorrelatedMode
                ? "bg-rose-500 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            Raw Scanner Noise
          </button>
          <button
            onClick={() => handleToggleMode(true)}
            className={cn(
              "rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
              isCorrelatedMode
                ? "bg-emerald-500 text-slate-950 shadow-md font-black"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Correlated Pipeline
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Findings</p>
          <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
            {isCorrelatedMode ? totalVerified : totalRaw}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {isCorrelatedMode ? "Actionable & Verified" : "Raw unfiltered output"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">False Positive Rate</p>
          <p className={cn("mt-1 text-2xl font-black", isCorrelatedMode ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500")}>
            {isCorrelatedMode ? "0% (0 Noise)" : "30% (300/1000 noisy)"}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {isCorrelatedMode ? "AST correlation filter" : "Wasting engineering cycles"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Dev Time Saved</p>
          <p className="mt-1 text-2xl font-black text-cyan-600 dark:text-cyan-400">
            {isCorrelatedMode ? "40+ hrs / sprint" : "0 hrs (bogged down)"}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Focus on true exploits</p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Remediation Precision</p>
          <p className="mt-1 text-2xl font-black text-purple-600 dark:text-purple-400">
            {isCorrelatedMode ? "100% High Confidence" : "Low (Dev friction)"}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Verified attack surface</p>
        </div>
      </div>

      {/* Interactive Findings List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Live Vulnerability Findings Queue ({displayedFindings.length})
          </span>
          <div className="flex items-center gap-1.5 text-xs">
            {["ALL", "CRITICAL", "HIGH"].map((sev) => (
              <button
                key={sev}
                onClick={() => {
                  setSelectedSeverity(sev);
                  playSound("click");
                }}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer",
                  selectedSeverity === sev
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-2.5">
          {displayedFindings.map((finding) => (
            <div
              key={finding.id}
              className={cn(
                "group relative rounded-2xl border p-4 transition-all duration-200 font-mono text-xs",
                finding.isFalsePositive
                  ? "border-rose-300/70 bg-rose-50/40 dark:border-rose-900/40 dark:bg-rose-950/20"
                  : "border-emerald-300/70 bg-emerald-50/30 dark:border-emerald-900/40 dark:bg-emerald-950/20"
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-bold">
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[10px] font-black",
                      finding.severity === "CRITICAL"
                        ? "bg-rose-600 text-white"
                        : "bg-amber-500 text-slate-950"
                    )}
                  >
                    {finding.severity}
                  </span>
                  <span className="text-slate-900 dark:text-white">{finding.type}</span>
                  <span className="text-slate-400 font-normal">({finding.cve})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                    SRC: {finding.source}
                  </span>
                  {finding.isFalsePositive ? (
                    <span className="inline-flex items-center gap-1 rounded-md border border-rose-400/50 bg-rose-100 dark:bg-rose-950/60 px-2 py-0.5 text-[10px] font-bold text-rose-700 dark:text-rose-400">
                      <AlertTriangle className="h-3 w-3" />
                      NOISY FALSE POSITIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-md border border-emerald-400/50 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      VERIFIED EXPLOITABLE
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-2 text-slate-600 dark:text-slate-400 font-sans text-xs leading-relaxed">
                {finding.details}
              </p>

              <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Reachability: <strong className="text-slate-700 dark:text-slate-300">{finding.reachability}</strong></span>
                <span>Triage Status: {finding.isFalsePositive ? "Filtered (Saved 4h dev investigation)" : "High Priority Fix Assigned"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

