"use client";

import * as React from "react";
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check, ShieldAlert, Sparkles, CornerDownLeft } from "lucide-react";
import { useSound } from "@/components/providers/sound-provider";
import { cn } from "@/lib/utils";

type CommandOutput = {
  command: string;
  timestamp: string;
  output: React.ReactNode;
};

const INITIAL_WELCOME = (
  <div className="space-y-2 text-slate-300">
    <p className="text-emerald-400 font-bold">
      [+] PTK-SEC Engine v4.2.0 initialized (AppSec &amp; DevSecOps Suite)
    </p>
    <p className="text-slate-400 text-xs">
      Type a command or click a quick action pill below to inspect security telemetry, run simulated triage, or explore flagship tooling.
    </p>
    <p className="text-cyan-400 text-xs">
      💡 Suggested: <span className="font-mono text-emerald-300 font-semibold">scan --live</span> &bull; <span className="font-mono text-cyan-300 font-semibold">whoami</span> &bull; <span className="font-mono text-amber-300 font-semibold">triage</span> &bull; <span className="font-mono text-purple-300 font-semibold">projects</span>
    </p>
  </div>
);

const QUICK_COMMANDS = [
  { cmd: "scan --live", label: "🛡️ Live Scan", color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30 hover:bg-emerald-900/40" },
  { cmd: "whoami", label: "👤 Whoami", color: "border-cyan-500/40 text-cyan-400 bg-cyan-950/30 hover:bg-cyan-900/40" },
  { cmd: "triage", label: "⚡ Triage FP", color: "border-amber-500/40 text-amber-400 bg-amber-950/30 hover:bg-amber-900/40" },
  { cmd: "projects", label: "🚀 Projects", color: "border-purple-500/40 text-purple-400 bg-purple-950/30 hover:bg-purple-900/40" },
  { cmd: "skills", label: "🛠️ Skills", color: "border-blue-500/40 text-blue-400 bg-blue-950/30 hover:bg-blue-900/40" },
  { cmd: "nullcon", label: "🎤 NULLCON Talk", color: "border-rose-500/40 text-rose-400 bg-rose-950/30 hover:bg-rose-900/40" },
  { cmd: "help", label: "❓ Help", color: "border-slate-500/40 text-slate-300 bg-slate-800/40 hover:bg-slate-700/40" },
];

export function SecurityTerminal() {
  const [input, setInput] = React.useState("");
  const [history, setHistory] = React.useState<CommandOutput[]>([]);
  const [cmdIndex, setCmdIndex] = React.useState<number>(-1);
  const [pastCommands, setPastCommands] = React.useState<string[]>([]);
  const [isScanning, setIsScanning] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const terminalEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { playSound } = useSound();

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [history, isScanning]);

  const executeCommand = (cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    playSound("click");
    setPastCommands((prev) => [...prev, rawCmd]);
    setCmdIndex(-1);

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const normalized = rawCmd.toLowerCase();

    let resultNode: React.ReactNode = null;

    if (normalized === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (normalized === "help") {
      resultNode = (
        <div className="space-y-2 py-1 text-slate-300">
          <p className="text-cyan-400 font-semibold">Available Terminal Commands:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 font-mono text-xs">
            <div><span className="text-emerald-400">whoami</span> — Identity, leadership &amp; focus</div>
            <div><span className="text-emerald-400">scan --live</span> — Run live AST vulnerability scan</div>
            <div><span className="text-emerald-400">triage</span> — Deloitte FP reduction simulation</div>
            <div><span className="text-emerald-400">skills</span> — Full AppSec &amp; DevSecOps stack</div>
            <div><span className="text-emerald-400">projects</span> — Flagship security tools &amp; repos</div>
            <div><span className="text-emerald-400">nullcon</span> — NULLCON 2025 speaker overview</div>
            <div><span className="text-emerald-400">resume</span> — Get direct resume download link</div>
            <div><span className="text-emerald-400">contact</span> — Get direct email &amp; socials</div>
            <div><span className="text-emerald-400">clear</span> — Wipe terminal output</div>
          </div>
        </div>
      );
    } else if (normalized === "whoami") {
      resultNode = (
        <div className="space-y-2 py-1 text-slate-300">
          <p className="text-emerald-300 font-bold">Pratik Vaibhav</p>
          <p className="text-xs text-slate-400">
            <span className="text-cyan-400">Current Role:</span> Senior Product Security Engineer (PSIRT) @ Guidewire Software
          </p>
          <p className="text-xs text-slate-400">
            <span className="text-cyan-400">Prior Role:</span> Lead Solution Advisor @ Deloitte (Top 1% Outstanding Performance)
          </p>
          <p className="text-xs text-slate-400">
            <span className="text-cyan-400">Key Track Record:</span> 100+ PSIRT Incidents Handled &bull; 33% MTTR Reduction &bull; TruffleHog Secret Invalidation 70d ➔ 38d &bull; Autonomous Claude CVE Agents
          </p>
          <p className="text-xs text-slate-400">
            <span className="text-cyan-400">Philosophy:</span> &ldquo;I build secure systems and prove where they break, turning raw scanner noise and incident chaos into high-confidence engineering decisions.&rdquo;
          </p>
        </div>
      );
    } else if (normalized === "scan" || normalized === "scan --live") {
      setIsScanning(true);
      playSound("scan");
      setTimeout(() => {
        setIsScanning(false);
        playSound("success");
        setHistory((prev) => [
          ...prev,
          {
            command: rawCmd,
            timestamp: now,
            output: (
              <div className="space-y-2 py-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>TARGET: ptkvaibhav.dev (Next.js 15, Vercel Edge, Strict CSP, Rate Limited)</span>
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-slate-950/80 p-3 font-mono text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>[+] SAST Static Analysis:</span> <span className="text-emerald-400">0 High/Critical</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>[+] DAST Endpoint Fuzzing:</span> <span className="text-emerald-400">Sanitized (DOMPurify + Zod)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>[+] Dependency SCA (CycloneDX):</span> <span className="text-emerald-400">0 Known Vulnerabilities</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>[+] Security Headers:</span> <span className="text-cyan-400">HSTS + CSP + X-Frame: DENY (A+ Grade)</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800 text-emerald-300 font-semibold">
                    &gt;&gt; VERDICT: System hardened. Zero unauthorized attack vectors detected.
                  </div>
                </div>
              </div>
            ),
          },
        ]);
      }, 1400);
      setInput("");
      return;
    } else if (normalized === "triage" || normalized === "triage --deloitte") {
      resultNode = (
        <div className="space-y-2 py-1 font-mono text-xs">
          <p className="text-amber-300 font-semibold">[!] DELOITTE FALSE-POSITIVE REDUCTION BENCHMARK:</p>
          <div className="grid grid-cols-2 gap-2 text-slate-300 bg-slate-950/70 p-3 rounded-lg border border-amber-500/30">
            <div>
              <p className="text-rose-400 font-bold">Raw Scanner Output:</p>
              <p className="text-slate-400">Total Findings: ~1,000</p>
              <p className="text-slate-400">False Positive Rate: ~30% (300 noisy flags)</p>
              <p className="text-slate-400">Dev Time Wasted: 40+ hrs/sprint</p>
            </div>
            <div className="border-l border-slate-800 pl-3">
              <p className="text-emerald-400 font-bold">Pratik&apos;s Correlated Pipeline:</p>
              <p className="text-slate-400">SAST + DAST + SCA Correlated</p>
              <p className="text-emerald-300 font-bold">False Positives: ~0% (Verified Reachability)</p>
              <p className="text-slate-400">True Criticals Remediation: 100%</p>
            </div>
          </div>
        </div>
      );
    } else if (normalized === "skills") {
      resultNode = (
        <div className="space-y-2 py-1 font-mono text-xs">
          <p className="text-cyan-400 font-semibold">[+] Technical Capabilities &amp; Arsenal:</p>
          <div className="space-y-1 text-slate-300">
            <p><span className="text-purple-400">AppSec &amp; SDLC:</span> SAST, DAST, SCA, Threat Modeling, Architecture Reviews, Triage</p>
            <p><span className="text-emerald-400">Offensive:</span> Web &amp; API Pentesting, Authz/Authn bypass, Exploit Reproduction</p>
            <p><span className="text-blue-400">Tools:</span> Burp Suite, Fortify SSC, WebInspect, Checkmarx, Snyk, Prisma Cloud, Nessus</p>
            <p><span className="text-amber-400">Cloud &amp; DevOps:</span> OpenShift, Docker, Linux, GitHub Actions, Rate Limiting, CSP</p>
            <p><span className="text-rose-400">AI &amp; Automation:</span> Agentic Testing, Scanner Orchestration, Custom Parsers</p>
          </div>
        </div>
      );
    } else if (normalized === "projects") {
      resultNode = (
        <div className="space-y-2 py-1 font-mono text-xs">
          <p className="text-purple-400 font-semibold">[+] Flagship Security Repositories:</p>
          <div className="space-y-1.5 text-slate-300">
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <p className="text-emerald-300 font-bold">1. Clinkz (Flagship Security Tool)</p>
              <p className="text-slate-400 text-[11px]">Correlates CVEs, bug bounty writeups, and exploit research to automate recon, fuzzing, and proof-of-concept validation.</p>
            </div>
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <p className="text-cyan-300 font-bold">2. Security Automation &amp; Recon Suite</p>
              <p className="text-slate-400 text-[11px]">Fast vulnerability triage and AST correlation pipeline for DevSecOps workflows.</p>
            </div>
          </div>
        </div>
      );
    } else if (normalized === "nullcon") {
      resultNode = (
        <div className="space-y-2 py-1 font-mono text-xs">
          <div className="flex items-center gap-2 text-rose-400 font-bold">
            <Sparkles className="h-4 w-4" />
            <span>NULLCON 2025 International Security Conference Speaker</span>
          </div>
          <p className="text-slate-300">
            Topic: <span className="text-white font-semibold">&ldquo;Smart Automation using Artificial Intelligence&rdquo;</span>
          </p>
          <p className="text-slate-400 text-[11px]">
            Presented actionable frameworks for utilizing AI agents to automate repetitive reconnaissance, vulnerability correlation, and finding verification.
          </p>
        </div>
      );
    } else if (normalized === "resume") {
      resultNode = (
        <div className="py-1 font-mono text-xs text-slate-300">
          <p className="text-cyan-400 font-semibold">[+] Resume Download:</p>
          <p className="mt-1">
            <a
              href="/resume/Pratik_Vaibhav_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              👉 Click here to download Pratik_Vaibhav_Resume.pdf
            </a>
          </p>
        </div>
      );
    } else if (normalized === "contact") {
      resultNode = (
        <div className="space-y-1 py-1 font-mono text-xs text-slate-300">
          <p className="text-cyan-400 font-semibold">[+] Contact &amp; Channels:</p>
          <p>&bull; Email / Inquiry: Scroll to contact form or use <a href="#contact" className="text-emerald-400 underline">#contact</a></p>
          <p>&bull; GitHub: <a href="https://github.com/ptkvaibhav" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">github.com/ptkvaibhav</a></p>
          <p>&bull; LinkedIn: <a href="https://www.linkedin.com/in/ptkvaibhav/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">linkedin.com/in/ptkvaibhav</a></p>
        </div>
      );
    } else {
      resultNode = (
        <p className="text-rose-400 font-mono text-xs">
          zsh: command not found: {rawCmd}. Type <span className="text-emerald-400 font-bold">help</span> or click a quick command.
        </p>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: rawCmd,
        timestamp: now,
        output: resultNode,
      },
    ]);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playSound("terminal-key");
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastCommands.length === 0) return;
      const nextIndex = cmdIndex + 1 < pastCommands.length ? cmdIndex + 1 : cmdIndex;
      setCmdIndex(nextIndex);
      setInput(pastCommands[pastCommands.length - 1 - nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex > 0) {
        const nextIndex = cmdIndex - 1;
        setCmdIndex(nextIndex);
        setInput(pastCommands[pastCommands.length - 1 - nextIndex]);
      } else if (cmdIndex === 0) {
        setCmdIndex(-1);
        setInput("");
      }
    }
  };

  const handleCopyHistory = () => {
    const text = history.map((h) => `$ ${h.command}`).join("\n");
    navigator.clipboard.writeText(text || "ptk-security-terminal");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-[#0b0d13] font-mono text-slate-200 shadow-xl dark:border-white/10">
      {/* Top Window Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-4 py-3 select-none">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 hover:opacity-100 transition-opacity" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 hover:opacity-100 transition-opacity" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 hover:opacity-100 transition-opacity" />
          </div>
          <span className="ml-2 flex min-w-0 items-center gap-1.5 text-xs font-semibold text-slate-400">
            <TerminalIcon className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
            <span className="truncate">ptk@security-workstation: ~</span>
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            APPSEC ACTIVE
          </span>
          <button
            onClick={handleCopyHistory}
            aria-label="Copy terminal commands"
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={() => {
              setHistory([]);
              playSound("click");
            }}
            aria-label="Reset terminal"
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Action Chips Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-b border-slate-800/40 bg-slate-900/40 scrollbar-none text-xs">
        <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">Quick run:</span>
        {QUICK_COMMANDS.map((item) => (
          <button
            key={item.cmd}
            onClick={() => executeCommand(item.cmd)}
            className={cn(
              "shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-medium transition-all duration-150 flex items-center gap-1 cursor-pointer",
              item.color
            )}
          >
            <Play className="h-2.5 w-2.5 opacity-70" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Terminal Screen Body */}
      <div className="p-4 overflow-y-auto max-h-[360px] min-h-[260px] text-xs break-words leading-relaxed space-y-3 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {INITIAL_WELCOME}

        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400 font-bold">➜</span>
              <span className="text-cyan-400 font-semibold">~</span>
              <span className="text-white font-bold">{item.command}</span>
              <span className="text-[10px] text-slate-600 ml-auto">{item.timestamp}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}

        {isScanning && (
          <div className="pl-4 py-2 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs">
              <span className="animate-spin inline-block h-3 w-3 border-2 border-cyan-400 border-t-transparent rounded-full" />
              <span>Scanning endpoints, analyzing SAST/DAST AST rules and evaluating exploit surface...</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full w-2/3 animate-pulse" />
            </div>
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompt Footer */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-800/80 bg-slate-950/90 px-4 py-2.5">
        <span className="text-emerald-400 font-bold select-none">➜</span>
        <span className="text-cyan-400 font-semibold select-none">~</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help'…"
          className="min-w-0 flex-1 bg-transparent font-mono text-base text-white placeholder-slate-600 focus:outline-none sm:text-xs"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
        />
        <button
          type="submit"
          aria-label="Send command"
          className="rounded-md bg-slate-800 px-2 py-1 text-[11px] font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Run</span>
          <CornerDownLeft className="h-3 w-3" />
        </button>
      </form>
    </div>
  );
}

