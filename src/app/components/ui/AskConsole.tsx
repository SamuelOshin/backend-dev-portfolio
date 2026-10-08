"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, CornerDownLeft } from "lucide-react";
import { getIndex, MIN_SCORE, type Hit } from "@/lib/retrieval";

const SUGGESTIONS = [
  "How did you get RAG under 1.5s?",
  "How do you cut LLM costs?",
  "Have you built AI agents?",
  "What have you built for clients?",
];

type Phase = "idle" | "retrieving" | "answering" | "done";

export function AskConsole() {
  const [query, setQuery] = useState("");
  const [asked, setAsked] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [hits, setHits] = useState<Hit[]>([]);
  const [answer, setAnswer] = useState("");
  const [latency, setLatency] = useState(0);
  const runId = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the newest streamed tokens in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [answer, phase]);

  const run = useCallback((q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    const id = ++runId.current;
    if (timer.current) clearInterval(timer.current);

    setAsked(trimmed);
    setQuery("");
    setAnswer("");
    setHits([]);
    setPhase("retrieving");

    const index = getIndex();
    const t0 = performance.now();
    const results = index.search(trimmed, 3);
    setLatency(performance.now() - t0);

    const grounded = results.filter((h) => h.score >= MIN_SCORE);
    const full = grounded.length
      ? grounded.map((h, i) => `${h.chunk.text} [${i + 1}]`).join("\n\n")
      : "Nothing in the index scores above threshold for that. A grounded system should say so instead of guessing. Try asking about RAG, agents, latency, costs or payments.";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Short pause so the retrieval step is visible before generation starts.
    setTimeout(
      () => {
        if (id !== runId.current) return;
        setHits(grounded);
        setPhase("answering");
        if (reduced) {
          setAnswer(full);
          setPhase("done");
          return;
        }
        let pos = 0;
        timer.current = setInterval(() => {
          if (id !== runId.current) return;
          pos = Math.min(full.length, pos + 4);
          setAnswer(full.slice(0, pos));
          if (pos >= full.length) {
            if (timer.current) clearInterval(timer.current);
            setPhase("done");
          }
        }, 14);
      },
      reduced ? 0 : 420
    );
  }, []);

  useEffect(() => {
    const t = setTimeout(() => run(SUGGESTIONS[0]), 900);
    return () => {
      clearTimeout(t);
      if (timer.current) clearInterval(timer.current);
    };
  }, [run]);

  const top = hits[0]?.score ?? 1;
  const busy = phase === "retrieving" || phase === "answering";

  return (
    <div className="relative rounded-2xl border border-white/10 bg-[color:var(--ink)]/90 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-[color:var(--signal)] opacity-60 ${busy ? "animate-ping" : ""}`} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--signal)]" />
          </span>
          <span className="font-mono text-xs text-white/70 truncate">ask-my-portfolio</span>
        </div>
        <span className="font-mono text-[10px] text-white/40 shrink-0">bm25 · in-browser · no llm</span>
      </div>

      {/* Transcript */}
      <div ref={scrollRef} className="px-4 pt-4 pb-3 h-[300px] sm:h-[320px] overflow-y-auto [scrollbar-width:thin] font-mono text-[12.5px] leading-relaxed" aria-live="polite">
        {asked && (
          <div className="flex gap-2 text-white">
            <span className="text-[color:var(--signal)] select-none">›</span>
            <span>{asked}</span>
          </div>
        )}

        {phase !== "idle" && (
          <div className="mt-3 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-white/40">
              <span>retrieve · top-k=3</span>
              <span>{phase === "retrieving" ? "searching…" : `${latency.toFixed(2)} ms`}</span>
            </div>
            <ul className="mt-2 space-y-1.5">
              {phase === "retrieving" &&
                [0, 1, 2].map((i) => <li key={i} className="h-4 rounded bg-white/[0.04] animate-pulse" />)}
              {phase !== "retrieving" && hits.length === 0 && (
                <li className="text-white/40 text-[11px]">no chunk above threshold ({MIN_SCORE})</li>
              )}
              {hits.map((h, i) => (
                <li key={h.chunk.id} className="flex items-center gap-2 text-[11px]">
                  <span className="text-white/40 w-4">[{i + 1}]</span>
                  <span className="text-white/70 truncate flex-1">{h.chunk.source}</span>
                  <span className="hidden sm:block h-1 w-14 rounded-full bg-white/[0.06] overflow-hidden">
                    <span
                      className="block h-full bg-[color:var(--signal)]"
                      style={{ width: `${Math.max(12, (h.score / top) * 100)}%` }}
                    />
                  </span>
                  <span className="text-white/50 w-9 text-right tabular-nums">{h.score.toFixed(1)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {answer && (
          <p className="mt-3 whitespace-pre-line font-sans text-[13.5px] leading-relaxed text-white/80">
            {answer}
            {phase === "answering" && <span className="caret ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] bg-[color:var(--signal)]" />}
          </p>
        )}
      </div>

      {/* Suggestions */}
      <div className="flex gap-1.5 overflow-x-auto px-4 pb-3 [scrollbar-width:none]">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => run(s)}
            className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/60 transition-colors hover:border-[color:var(--signal)]/50 hover:text-white cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(query);
        }}
        className="flex items-center gap-2 border-t border-white/[0.07] px-3 py-2.5"
      >
        <label htmlFor="ask" className="sr-only">
          Ask a question about Samuel's work
        </label>
        <input
          id="ask"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about RAG, agents, latency, costs…"
          autoComplete="off"
          className="flex-1 min-w-0 bg-transparent px-1 py-1.5 text-sm text-white placeholder:text-white/30 focus:outline-none"
        />
        <span className="hidden sm:flex items-center gap-1 font-mono text-[10px] text-white/30">
          <CornerDownLeft size={11} /> enter
        </span>
        <button
          type="submit"
          aria-label="Ask"
          disabled={!query.trim()}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--signal)] text-[color:var(--accent-foreground)] transition-opacity disabled:opacity-30 cursor-pointer disabled:cursor-default"
        >
          <ArrowUp size={15} />
        </button>
      </form>
    </div>
  );
}
