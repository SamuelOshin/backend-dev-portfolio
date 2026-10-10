"use client";

import React, { useEffect, useState } from "react";
import { PipelineGame } from "../games/PipelineGame";
import { RetrieverGame } from "../games/RetrieverGame";
import { CacheGame } from "../games/CacheGame";

const GAMES = [
  { id: "pipeline", title: "Keep the pipeline alive", blurb: "Route traffic before it times out", length: "45s", Component: PipelineGame },
  { id: "retriever", title: "Beat the retriever", blurb: "Out-rank the site's search engine", length: "3 rounds", Component: RetrieverGame },
  { id: "cache", title: "Cache hit", blurb: "Cut the LLM bill by reordering a prompt", length: "puzzle", Component: CacheGame },
] as const;

type GameId = (typeof GAMES)[number]["id"];

// Other parts of the page (the Ask console's `play` command) open a game with this event.
export const OPEN_ARCADE_EVENT = "arcade:open";

export function ArcadeSection() {
  const [active, setActive] = useState<GameId>("pipeline");

  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<GameId | undefined>).detail;
      if (id && GAMES.some((g) => g.id === id)) setActive(id);
    };
    window.addEventListener(OPEN_ARCADE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_ARCADE_EVENT, onOpen);
  }, []);

  const game = GAMES.find((g) => g.id === active)!;

  return (
    <section id="arcade" className="relative mt-32 sm:mt-44 scroll-mt-24">
      <div className="max-w-2xl">
        <span className="eyebrow">Side quest · Arcade</span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white">
          Take a <span className="font-display italic font-normal">break.</span>
        </h2>
        <p className="mt-4 text-white/60 leading-relaxed">
          Three tiny games built on the problems I solve at work: routing load, ranking search results and paying
          less for LLM calls. Each takes under a minute.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0 [scrollbar-width:none]" role="tablist" aria-label="Games">
          {GAMES.map((g, i) => {
            const on = g.id === active;
            return (
              <button
                key={g.id}
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={on}
                aria-controls="arcade-panel"
                onClick={() => setActive(g.id)}
                className={`shrink-0 w-60 lg:w-full rounded-xl border px-4 py-4 text-left transition-colors cursor-pointer ${
                  on ? "border-[color:var(--signal)]/40 bg-[color:var(--signal)]/[0.06]" : "border-white/[0.08] bg-white/[0.015] hover:border-white/20"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`font-medium ${on ? "text-white" : "text-white/75"}`}>{g.title}</span>
                  <span className="font-mono text-[10px] text-white/35">0{i + 1}</span>
                </div>
                <div className="mt-1 text-xs text-white/45">{g.blurb}</div>
                <div className={`mt-3 font-mono text-[11px] ${on ? "text-[color:var(--signal)]" : "text-white/40"}`}>{g.length}</div>
              </button>
            );
          })}
        </div>

        <div
          id="arcade-panel"
          role="tabpanel"
          aria-labelledby={`tab-${game.id}`}
          className="lg:col-span-8 min-h-[520px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[color:var(--ink)]/70"
        >
          {/* Remounting resets the game when switching tabs. */}
          <game.Component key={game.id} />
        </div>
      </div>
    </section>
  );
}
