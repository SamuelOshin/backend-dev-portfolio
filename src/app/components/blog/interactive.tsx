"use client";

// Small interactive pieces used inside blog posts (MDX). Each wraps itself in
// `not-prose` so the article typography doesn't restyle it.

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Copy, Eye, EyeOff, RotateCcw, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`not-prose my-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 ${className}`}>{children}</div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--signal)]">{children}</div>;
}

// ---------------------------------------------------------------------------
// Jargon buster: tap a term to see a plain-English meaning and an analogy.
// ---------------------------------------------------------------------------

export function Glossary({ terms }: { terms: { term: string; plain: string; analogy: string }[] }) {
  const [open, setOpen] = useState(terms[0]?.term);
  const current = terms.find((t) => t.term === open);
  return (
    <Card>
      <Eyebrow>Jargon buster · tap a word</Eyebrow>
      <div className="mt-4 flex flex-wrap gap-2">
        {terms.map((t) => (
          <button
            key={t.term}
            type="button"
            onClick={() => setOpen(t.term)}
            aria-pressed={open === t.term}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors cursor-pointer ${
              open === t.term ? "border-[color:var(--signal)]/60 bg-[color:var(--signal)]/10 text-white" : "border-white/15 text-white/65 hover:text-white"
            }`}
          >
            {t.term}
          </button>
        ))}
      </div>
      {current && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2" aria-live="polite">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/45">What it means</div>
            <p className="mt-2 text-[15px] leading-relaxed text-white/85">{current.plain}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/45">Think of it like</div>
            <p className="mt-2 text-[15px] leading-relaxed text-white/85">{current.analogy}</p>
          </div>
        </div>
      )}
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Spot the hidden code: a config file whose payload sits far off-screen.
// ---------------------------------------------------------------------------

export function HiddenCode() {
  const scroller = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const [found, setFound] = useState(false);

  const onScroll = () => {
    const el = scroller.current;
    if (el && el.scrollLeft > el.scrollWidth - el.clientWidth - 260) setFound(true);
  };

  // Scroll after the re-render (so the width is final), then snap to the end in
  // case the smooth scroll is cut short.
  useEffect(() => {
    const el = scroller.current;
    if (!revealed || !el) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: el.scrollWidth, behavior: smooth ? "smooth" : "auto" });
    const t = setTimeout(() => {
      el.scrollLeft = el.scrollWidth;
    }, 700);
    return () => clearTimeout(t);
  }, [revealed]);

  const reveal = () => {
    setRevealed(true);
    setShowTabs(true);
    setFound(true);
  };

  const reset = () => {
    setRevealed(false);
    setShowTabs(false);
    setFound(false);
    scroller.current?.scrollTo({ left: 0 });
  };

  const gap = showTabs ? "→".repeat(160) : " ".repeat(160);

  return (
    <Card>
      <Eyebrow>Try it · spot the hidden code</Eyebrow>
      <p className="mt-3 text-[15px] leading-relaxed text-white/75">
        This is a settings file from a normal web project. It looks harmless. Can you find what&apos;s wrong with it?
        Scroll the code sideways, or press the button.
      </p>
      <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2 font-mono text-xs text-white/45">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2">postcss.config.mjs</span>
        </div>
        <div ref={scroller} onScroll={onScroll} className="overflow-x-auto p-4 font-mono text-[13px] leading-7" tabIndex={0} aria-label="Code, scrollable sideways">
          <pre className="m-0 whitespace-pre text-white/80">
            <span className="text-white/40">1</span>  const config = {"{"}{"\n"}
            <span className="text-white/40">2</span>    plugins: {"{"} tailwindcss: {"{"}{"}"} {"}"},{"\n"}
            <span className="text-white/40">3</span>  {"}"};{"\n"}
            <span className="text-white/40">4</span>{"\n"}
            <span className="text-white/40">5</span>  export default config;
            <span className={showTabs ? "text-red-400/40" : ""}>{gap}</span>
            <span className="rounded bg-red-500/20 px-2 py-1 text-red-300 ring-1 ring-red-400/50">
              {"/* hidden malicious code: about 30,000 characters, runs every time the app starts */"}
            </span>
          </pre>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {!revealed ? (
          <button type="button" onClick={reveal} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-[color:var(--signal)] cursor-pointer">
            <Eye size={14} /> Reveal it
          </button>
        ) : (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 hover:text-white cursor-pointer">
            <RotateCcw size={14} /> Hide it again
          </button>
        )}
        <button type="button" onClick={() => setShowTabs((s) => !s)} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 hover:text-white cursor-pointer">
          {showTabs ? <EyeOff size={14} /> : <Eye size={14} />} {showTabs ? "Hide invisible characters" : "Show invisible characters"}
        </button>
      </div>
      {found && (
        <p className="mt-4 rounded-xl border border-[color:var(--signal)]/30 bg-[color:var(--signal)]/[0.06] p-4 text-[15px] leading-relaxed text-white/85" aria-live="polite">
          <b className="text-white">Found it.</b> After the last real line come hundreds of invisible tab characters, then the
          malicious code. Your editor only shows the first screen-width of each line, so the file looks clean. The trick needs
          nothing clever. It just relies on nobody scrolling right.
        </p>
      )}
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Quiz: one question, pick an answer, get an explanation.
// ---------------------------------------------------------------------------

export function Quiz({
  question,
  options,
}: {
  question: string;
  options: { text: string; correct?: boolean; explain: string }[];
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <Card>
      <Eyebrow>Quick quiz</Eyebrow>
      <p className="mt-3 text-lg font-semibold text-white">{question}</p>
      <div className="mt-4 space-y-2">
        {options.map((o, i) => {
          const isPicked = picked === i;
          const show = picked !== null;
          let style = "border-white/12 hover:border-white/30";
          if (show && o.correct) style = "border-[color:var(--signal)]/60 bg-[color:var(--signal)]/[0.07]";
          else if (show && isPicked) style = "border-red-400/50 bg-red-400/[0.06]";
          else if (show) style = "border-white/[0.06] opacity-60";
          return (
            <button
              key={o.text}
              type="button"
              disabled={show}
              onClick={() => setPicked(i)}
              className={`w-full rounded-xl border p-3.5 text-left text-[15px] text-white/85 transition-colors cursor-pointer disabled:cursor-default ${style}`}
            >
              {o.text}
              {show && (isPicked || o.correct) && (
                <span className={`mt-2 block text-sm leading-relaxed ${o.correct ? "text-[color:var(--signal)]" : "text-red-300"}`}>
                  {o.correct ? "✓ " : "✗ "}
                  {o.explain}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <button type="button" onClick={() => setPicked(null)} className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white cursor-pointer">
          <RotateCcw size={13} /> Try again
        </button>
      )}
    </Card>
  );
}

// ---------------------------------------------------------------------------
// "Am I infected?" self-check.
// ---------------------------------------------------------------------------

type Answer = "yes" | "no" | "unsure";

const CHECK_QUESTIONS: { id: string; q: string; hint: string; weight: "exposure" | "sign" }[] = [
  { id: "ran", q: "Have you ever downloaded and run a project someone sent you?", hint: "A job test, a freelance gig, a \"can you fix this bug\" repo, a crypto or trading bot.", weight: "exposure" },
  { id: "tasks", q: "Has VS Code (or Cursor) ever asked to \"allow automatic tasks\", and you said yes?", hint: "It's a small pop-up when you open a folder. Many people click Allow without reading.", weight: "exposure" },
  { id: "files", q: "Is there an api.js you didn't write, or a strange file in public/fonts/ ending in .llf or .lkf?", hint: "Run the first two commands below if you're not sure.", weight: "sign" },
  { id: "scripts", q: "Does your package.json have \"node api.js &&\" at the start of dev, build or start?", hint: "Open package.json and look at the \"scripts\" section.", weight: "sign" },
  { id: "pushes", q: "Have you seen commits, branches or pushes you don't remember making?", hint: "GitHub repo → Activity tab shows force pushes. Emails about pushes count too.", weight: "sign" },
  { id: "config", q: "Does postcss.config (or another config file) have a very long last line?", hint: "Click at the end of the last line and press End. If the cursor flies far right, look closer.", weight: "sign" },
];

export function InfectionCheck() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const answered = Object.keys(answers).length;
  const done = answered === CHECK_QUESTIONS.length;

  const result = useMemo(() => {
    const signs = CHECK_QUESTIONS.filter((q) => q.weight === "sign" && answers[q.id] === "yes").length;
    const exposure = CHECK_QUESTIONS.filter((q) => q.weight === "exposure" && answers[q.id] === "yes").length;
    const unsure = Object.values(answers).filter((a) => a === "unsure").length;
    if (signs > 0) return { level: "infected" as const };
    if (exposure > 0 || unsure > 0) return { level: "check" as const };
    return { level: "clear" as const };
  }, [answers]);

  const RESULTS = {
    infected: {
      icon: <ShieldAlert size={22} className="text-red-400" />,
      title: "Treat your account as compromised",
      body: "You've seen at least one direct sign of this attack. Don't run any of your projects yet. Go straight to the lock-it-down checklist below and work through it in order, from your phone or another device.",
      href: "#lock-it-down",
      cta: "Go to: Lock it down",
      tone: "border-red-400/40 bg-red-400/[0.06]",
    },
    check: {
      icon: <ShieldQuestion size={22} className="text-amber-300" />,
      title: "You've been exposed. Check before you relax",
      body: "No direct signs yet, but you've done something this attack relies on, or you weren't sure. Run the four checks below. They only read your files and change nothing.",
      href: "#check-yourself",
      cta: "Go to: The four checks",
      tone: "border-amber-300/40 bg-amber-300/[0.05]",
    },
    clear: {
      icon: <ShieldCheck size={22} className="text-[color:var(--signal)]" />,
      title: "Looks clear. Now make it hard to happen",
      body: "Nothing points to an infection. The best next step is the 10-minute guard checklist, so a future attack can't spread through your repos.",
      href: "#guard-your-repos",
      cta: "Go to: Guard your repos",
      tone: "border-[color:var(--signal)]/40 bg-[color:var(--signal)]/[0.06]",
    },
  } as const;

  return (
    <Card>
      <Eyebrow>Self-check · 6 questions · 1 minute</Eyebrow>
      <p className="mt-3 text-lg font-semibold text-white">Am I affected?</p>
      <ol className="mt-4 space-y-3">
        {CHECK_QUESTIONS.map((q, i) => (
          <li key={q.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="text-[15px] font-medium text-white/90">
              {i + 1}. {q.q}
            </div>
            <div className="mt-1 text-sm text-white/50">{q.hint}</div>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={`Answer question ${i + 1}`}>
              {(["yes", "no", "unsure"] as Answer[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-pressed={answers[q.id] === a}
                  onClick={() => setAnswers((s) => ({ ...s, [q.id]: a }))}
                  className={`rounded-full border px-3.5 py-1 text-sm capitalize transition-colors cursor-pointer ${
                    answers[q.id] === a ? "border-white bg-white text-zinc-950" : "border-white/15 text-white/70 hover:text-white"
                  }`}
                >
                  {a === "unsure" ? "Not sure" : a}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-5" aria-live="polite">
        {!done ? (
          <div className="text-sm text-white/45">
            {answered}/{CHECK_QUESTIONS.length} answered
          </div>
        ) : (
          <div className={`rounded-xl border p-5 ${RESULTS[result.level].tone}`}>
            <div className="flex items-center gap-2.5 text-lg font-semibold text-white">
              {RESULTS[result.level].icon} {RESULTS[result.level].title}
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-white/80">{RESULTS[result.level].body}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a href={RESULTS[result.level].href} className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 no-underline hover:bg-[color:var(--signal)]">
                {RESULTS[result.level].cta} →
              </a>
              <button type="button" onClick={() => setAnswers({})} className="text-sm text-white/55 hover:text-white cursor-pointer">
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Command card: one command, what it does, what to look for, copy button.
// ---------------------------------------------------------------------------

export function Command({
  step,
  title,
  command,
  does,
  lookFor,
}: {
  step: number;
  title: string;
  command: string;
  does: string;
  lookFor: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the command is still selectable.
    }
  };
  return (
    <div className="not-prose my-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-[color:var(--signal)]">Check {step}</span>
        <span className="text-[15px] font-semibold text-white">{title}</span>
      </div>
      <div className="mt-3 flex items-stretch overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
        <code className="flex-1 overflow-x-auto whitespace-pre px-4 py-3 font-mono text-[13px] text-white/90">{command}</code>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy command"
          className="flex shrink-0 items-center gap-1.5 border-l border-white/10 px-3 text-xs text-white/60 hover:bg-white/5 hover:text-white cursor-pointer"
        >
          {copied ? <Check size={14} className="text-[color:var(--signal)]" /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-white/45">What it does</dt>
          <dd className="mt-0.5 leading-relaxed text-white/80">{does}</dd>
        </div>
        <div>
          <dt className="text-white/45">What to look for</dt>
          <dd className="mt-0.5 leading-relaxed text-white/80">{lookFor}</dd>
        </div>
      </dl>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Checklist with progress, remembered in this browser.
// ---------------------------------------------------------------------------

export function Checklist({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: { title: string; how: string; why: string }[];
}) {
  const storageKey = `blog-checklist:${id}`;
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false));
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved) && saved.length === items.length) setDone(saved);
      }
    } catch {
      // Storage unavailable: progress just won't persist.
    }
  }, [storageKey, items.length]);

  const toggle = (i: number) => {
    setDone((d) => {
      const next = d.map((v, j) => (j === i ? !v : v));
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Ignore.
      }
      return next;
    });
  };

  const count = done.filter(Boolean).length;
  return (
    <Card>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="text-lg font-semibold text-white">{title}</span>
        <span className="font-mono text-sm text-white/55">
          {count}/{items.length} done
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-[color:var(--signal)] transition-[width] duration-300" style={{ width: `${(count / items.length) * 100}%` }} />
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item, i) => (
          <li key={item.title} className={`rounded-xl border transition-colors ${done[i] ? "border-[color:var(--signal)]/30 bg-[color:var(--signal)]/[0.04]" : "border-white/10 bg-black/20"}`}>
            <div className="flex items-start gap-3 p-3.5">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={done[i]}
                aria-label={`Mark "${item.title}" as ${done[i] ? "not done" : "done"}`}
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border cursor-pointer ${
                  done[i] ? "border-[color:var(--signal)] bg-[color:var(--signal)] text-zinc-950" : "border-white/30 hover:border-white/60"
                }`}
              >
                {done[i] && <Check size={13} strokeWidth={3} />}
              </button>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex flex-1 items-start justify-between gap-3 text-left cursor-pointer"
              >
                <span className={`text-[15px] ${done[i] ? "text-white/55 line-through" : "text-white/90"}`}>{item.title}</span>
                <ChevronDown size={16} className={`mt-0.5 shrink-0 text-white/40 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
            </div>
            {open === i && (
              <div className="space-y-2 border-t border-white/[0.06] px-4 py-3 pl-12 text-sm leading-relaxed">
                <p className="text-white/80">
                  <span className="text-white/45">How: </span>
                  {item.how}
                </p>
                <p className="text-white/65">
                  <span className="text-white/45">Why: </span>
                  {item.why}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
      {count === items.length && (
        <p className="mt-4 text-sm text-[color:var(--signal)]" aria-live="polite">
          All done. Your progress is saved in this browser.
        </p>
      )}
    </Card>
  );
}
