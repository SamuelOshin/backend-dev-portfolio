"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Check, RotateCcw, Share2, Trophy } from "lucide-react";

// Personal best per game, kept only in this visitor's browser.
export function useBestScore(key: string, higherIsBetter = true) {
  const storageKey = `arcade:best:${key}`;
  const [best, setBest] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw !== null) setBest(Number(raw));
    } catch {
      // Storage can be unavailable (private mode, blocked site data).
    }
  }, [storageKey]);

  // Records a score and reports whether it beat the previous best.
  const submit = useCallback(
    (score: number) => {
      const isBest = best === null || (higherIsBetter ? score > best : score < best);
      if (isBest) {
        setBest(score);
        try {
          window.localStorage.setItem(storageKey, String(score));
        } catch {
          // Ignore: the score just won't persist.
        }
      }
      return isBest;
    },
    [best, higherIsBetter, storageKey]
  );

  return { best, submit };
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function ResultPanel({
  headline,
  detail,
  takeaway,
  isBest,
  shareText,
  onRestart,
}: {
  headline: string;
  detail: React.ReactNode;
  takeaway: string;
  isBest: boolean;
  shareText: string;
  onRestart: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const text = `${shareText} ${window.location.origin}/#arcade`;
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Share sheet dismissed or clipboard blocked: nothing to do.
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center" role="status">
      {isBest && (
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--signal)]/40 bg-[color:var(--signal)]/10 px-3 py-1 font-mono text-[11px] text-[color:var(--signal)]">
          <Trophy size={12} /> New personal best
        </span>
      )}
      <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">{headline}</div>
      <div className="mt-2 text-sm text-white/60">{detail}</div>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">{takeaway}</p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-[color:var(--signal)] cursor-pointer"
        >
          <RotateCcw size={14} /> Play again
        </button>
        <button
          type="button"
          onClick={share}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/30 hover:text-white cursor-pointer"
        >
          {copied ? <Check size={14} className="text-[color:var(--signal)]" /> : <Share2 size={14} />}
          {copied ? "Copied" : "Share score"}
        </button>
      </div>
    </div>
  );
}

export function StartPanel({
  title,
  rules,
  best,
  bestLabel,
  onStart,
}: {
  title: string;
  rules: React.ReactNode[];
  best: number | null;
  bestLabel: (n: number) => string;
  onStart: () => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">
      <div className="text-2xl font-semibold tracking-tight text-white">{title}</div>
      <ul className="mt-5 max-w-md space-y-2 text-left text-sm text-white/65">
        {rules.map((r, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[color:var(--signal)]" />
            <span>{r}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onStart}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--signal)] px-6 py-2.5 text-sm font-medium text-[color:var(--accent-foreground)] transition-opacity hover:opacity-90 cursor-pointer"
      >
        Start
      </button>
      {best !== null && <div className="mt-3 font-mono text-[11px] text-white/40">Your best: {bestLabel(best)}</div>}
    </div>
  );
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-white/15 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-white/70">{children}</kbd>
  );
}
