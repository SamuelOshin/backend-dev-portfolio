"use client";

import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { ResultPanel, StartPanel, useBestScore } from "./shared";

// Order prompt blocks so the static ones form a cacheable prefix.

interface Block {
  id: string;
  label: string;
  tokens: number;
  dynamic: boolean;
  hint: string;
}

const BLOCKS: Block[] = [
  { id: "time", label: "Current time", tokens: 20, dynamic: true, hint: "different every request" },
  { id: "system", label: "System prompt", tokens: 1200, dynamic: false, hint: "same every request" },
  { id: "question", label: "User question", tokens: 60, dynamic: true, hint: "different every request" },
  { id: "tools", label: "Tool definitions", tokens: 900, dynamic: false, hint: "same every request" },
  { id: "context", label: "Retrieved RAG context", tokens: 600, dynamic: true, hint: "depends on the question" },
  { id: "style", label: "Style guide", tokens: 400, dynamic: false, hint: "same every request" },
  { id: "examples", label: "Few-shot examples", tokens: 1500, dynamic: false, hint: "same every request" },
];

// In this game, cached tokens cost 10% of the normal price.
const CACHED_RATE = 0.1;
const TOTAL = BLOCKS.reduce((s, b) => s + b.tokens, 0);

function evaluate(order: Block[]) {
  let prefix = 0;
  for (const b of order) {
    if (b.dynamic) break;
    prefix += 1;
  }
  const cachedTokens = order.slice(0, prefix).reduce((s, b) => s + b.tokens, 0);
  const billed = cachedTokens * CACHED_RATE + (TOTAL - cachedTokens);
  return { prefix, cachedTokens, billed: Math.round(billed), saved: Math.round((1 - billed / TOTAL) * 100) };
}

const OPTIMAL = evaluate([...BLOCKS].sort((a, b) => Number(a.dynamic) - Number(b.dynamic))).saved;

export function CacheGame() {
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [order, setOrder] = useState<Block[]>(BLOCKS);
  const [moves, setMoves] = useState(0);
  const [dragId, setDragId] = useState<string | null>(null);
  const [isBest, setIsBest] = useState(false);
  const { best, submit } = useBestScore("cache");
  const stats = useMemo(() => evaluate(order), [order]);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length || from === to) return;
    setOrder((o) => {
      const next = [...o];
      const [b] = next.splice(from, 1);
      next.splice(to, 0, b);
      return next;
    });
    setMoves((m) => m + 1);
  };

  const start = () => {
    setOrder(BLOCKS);
    setMoves(0);
    setIsBest(false);
    setPhase("playing");
  };

  const ship = () => {
    setIsBest(submit(stats.saved));
    setPhase("over");
  };

  if (phase === "ready") {
    return (
      <StartPanel
        title="Cache hit"
        rules={[
          <>An LLM provider caches the <b className="text-white">start</b> of your prompt if it&apos;s identical between requests. Cached tokens are 90% cheaper here.</>,
          <>Caching stops at the first block that changes. One dynamic block near the top ruins it.</>,
          <>Reorder the prompt to cut the bill as far as possible, then ship it.</>,
        ]}
        best={best}
        bestLabel={(n) => `${n}% saved`}
        onStart={start}
      />
    );
  }

  if (phase === "over") {
    const optimal = stats.saved >= OPTIMAL;
    return (
      <ResultPanel
        headline={`${stats.saved}% cheaper`}
        detail={optimal ? `Optimal ordering in ${moves} moves` : `The best possible is ${OPTIMAL}%${best !== null ? ` · your best ${best}%` : ""}`}
        takeaway="This is the trick behind the 80% cut in LLM billing on CR8US Intelligence: keep everything static at the front, append the RAG context last, and the provider serves the prefix from cache."
        isBest={isBest}
        shareText={`I cut LLM costs by ${stats.saved}% in Samuel Oshin's prompt-caching puzzle. Can you hit ${OPTIMAL}%?`}
        onRestart={start}
      />
    );
  }

  return (
    <div className="flex h-full flex-col p-4 sm:p-6">
      {/* Meter */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">Bill per request</div>
          <div className="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-white">
            {stats.saved}% <span className="text-base font-normal text-white/50">cheaper</span>
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-white/45">
          <div>
            billed <span className="text-white/80">{stats.billed.toLocaleString()}</span> of {TOTAL.toLocaleString()} tokens
          </div>
          <div>{moves} moves</div>
        </div>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-[color:var(--signal)] transition-[width] duration-300" style={{ width: `${(stats.saved / OPTIMAL) * 100}%` }} />
      </div>

      {/* Prompt blocks */}
      <ol className="mt-4 space-y-1.5" aria-label="Prompt blocks, top of prompt first">
        {order.map((b, i) => {
          const cached = i < stats.prefix;
          return (
            <React.Fragment key={b.id}>
              <li
                draggable
                onDragStart={() => setDragId(b.id)}
                onDragEnd={() => setDragId(null)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragId) move(order.findIndex((x) => x.id === dragId), i);
                  setDragId(null);
                }}
                className={`flex items-center gap-2 rounded-lg border px-2 py-2 text-sm transition-colors ${
                  cached
                    ? "border-[color:var(--signal)]/50 bg-[color:var(--signal)]/[0.08]"
                    : "border-white/10 bg-white/[0.02]"
                } ${dragId === b.id ? "opacity-40" : ""}`}
              >
                <GripVertical size={14} className="shrink-0 cursor-grab text-white/30" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-white">{b.label}</span>
                    <span className={`font-mono text-[10px] ${b.dynamic ? "text-amber-300" : "text-white/40"}`}>{b.hint}</span>
                  </span>
                </span>
                <span className="hidden sm:block font-mono text-[10px] text-white/40 tabular-nums">{b.tokens} tok</span>
                {cached && <span className="font-mono text-[10px] text-[color:var(--signal)]">cached</span>}
                <span className="flex shrink-0 flex-col">
                  <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} aria-label={`Move ${b.label} up`} className="rounded p-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-default">
                    <ChevronUp size={14} />
                  </button>
                  <button type="button" onClick={() => move(i, i + 1)} disabled={i === order.length - 1} aria-label={`Move ${b.label} down`} className="rounded p-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-default">
                    <ChevronDown size={14} />
                  </button>
                </span>
              </li>
              {i === stats.prefix - 1 && i < order.length - 1 && (
                <li aria-hidden className="flex items-center gap-2 px-1 font-mono text-[10px] text-[color:var(--signal)]">
                  <span className="h-px flex-1 bg-[color:var(--signal)]/40" /> cache breakpoint <span className="h-px flex-1 bg-[color:var(--signal)]/40" />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>

      <div className="mt-auto pt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-white/40">Drag rows, or use the arrows.</span>
        <button
          type="button"
          onClick={ship}
          className="rounded-full bg-[color:var(--signal)] px-5 py-2 text-sm font-medium text-[color:var(--accent-foreground)] transition-opacity hover:opacity-90 cursor-pointer"
        >
          Ship it
        </button>
      </div>
    </div>
  );
}
