"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { pipelines } from "@/data/portfolio";

const AUTO_ADVANCE_MS = 3200;

export function SystemsSection() {
  const [pipelineIdx, setPipelineIdx] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const pipeline = pipelines[pipelineIdx];
  const stage = pipeline.stages[stageIdx];

  useEffect(() => {
    if (!autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setStageIdx((i) => (i + 1) % pipeline.stages.length), AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [autoplay, pipeline.stages.length]);

  const selectPipeline = (i: number) => {
    setPipelineIdx(i);
    setStageIdx(0);
    setAutoplay(true);
  };

  const selectStage = (i: number) => {
    setStageIdx(i);
    setAutoplay(false);
  };

  return (
    <section id="systems" className="relative mt-32 sm:mt-44 scroll-mt-24">
      <div className="max-w-2xl">
        <span className="eyebrow">01 · Systems</span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white">
          Architecture, <span className="font-display italic font-normal">not just demos.</span>
        </h2>
        <p className="mt-4 text-white/60 leading-relaxed">
          Four production pipelines I designed and run. Pick one and step through it stage by stage. Each step shows
          what it does and the trade-off behind it.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pipeline picker */}
        <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0 [scrollbar-width:none]" role="tablist" aria-label="Pipelines">
          {pipelines.map((p, i) => {
            const active = i === pipelineIdx;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={active}
                onClick={() => selectPipeline(i)}
                className={`group shrink-0 w-64 lg:w-full text-left rounded-xl border px-4 py-4 transition-all cursor-pointer ${
                  active
                    ? "border-[color:var(--signal)]/40 bg-[color:var(--signal)]/[0.06]"
                    : "border-white/[0.08] bg-white/[0.015] hover:border-white/20"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`font-medium ${active ? "text-white" : "text-white/75"}`}>{p.name}</span>
                  <span className="font-mono text-[10px] text-white/35">0{i + 1}</span>
                </div>
                <div className="mt-1 text-xs text-white/45">{p.project}</div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className={`font-mono text-lg ${active ? "text-[color:var(--signal)]" : "text-white/70"}`}>{p.metric.value}</span>
                  <span className="text-[11px] text-white/40 leading-tight">{p.metric.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explorer */}
        <div className="lg:col-span-8 rounded-2xl border border-white/[0.08] bg-[color:var(--ink)]/70 p-5 sm:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={pipeline.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-lg sm:text-xl text-white tracking-tight">{pipeline.headline}</p>

              {/* Flow */}
              <ol className="mt-8 flex flex-col md:flex-row md:items-stretch gap-2 md:gap-0">
                {pipeline.stages.map((s, i) => {
                  const active = i === stageIdx;
                  const passed = i < stageIdx;
                  return (
                    <React.Fragment key={s.id}>
                      <li className="md:flex-1 md:min-w-0">
                        <button
                          onClick={() => selectStage(i)}
                          aria-current={active ? "step" : undefined}
                          className={`h-full w-full text-left rounded-xl border px-3 py-3 transition-all cursor-pointer ${
                            active
                              ? "border-[color:var(--signal)]/60 bg-[color:var(--signal)]/[0.08] shadow-[0_0_0_4px_oklch(0.9_0.19_125/0.06)]"
                              : passed
                              ? "border-white/15 bg-white/[0.03]"
                              : "border-white/[0.08] bg-transparent hover:border-white/20"
                          }`}
                        >
                          <div className="font-mono text-[10px] text-white/35">{String(i + 1).padStart(2, "0")}</div>
                          <div className={`mt-1 text-[13px] font-medium leading-snug ${active ? "text-white" : "text-white/75"}`}>{s.label}</div>
                          {s.branches ? (
                            <div className="mt-2 flex md:flex-col gap-1">
                              {s.branches.map((b) => (
                                <span key={b.label} className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-white/60 truncate">
                                  ∥ {b.label}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="mt-1 font-mono text-[10px] text-white/40 truncate">{s.tech}</div>
                          )}
                        </button>
                      </li>
                      {i < pipeline.stages.length - 1 && (
                        <li aria-hidden className="relative hidden md:block w-5 shrink-0 self-center">
                          <div className={`h-px w-full ${passed || active ? "bg-[color:var(--signal)]/50" : "bg-white/15"}`} />
                          {active && (
                            <span className="packet absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-[color:var(--signal)] shadow-[0_0_8px_var(--signal)]" />
                          )}
                        </li>
                      )}
                    </React.Fragment>
                  );
                })}
              </ol>

              {/* Stage detail */}
              <div className="mt-6 min-h-[132px] rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-white font-medium">{stage.label}</span>
                      <span className="font-mono text-[11px] text-[color:var(--signal)]">{stage.tech}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{stage.detail}</p>
                  </motion.div>
                </AnimatePresence>
                {/* progress */}
                <div className="mt-4 flex gap-1">
                  {pipeline.stages.map((s, i) => (
                    <span key={s.id} className={`h-0.5 flex-1 rounded-full ${i <= stageIdx ? "bg-[color:var(--signal)]/70" : "bg-white/10"}`} />
                  ))}
                </div>
              </div>

              {/* Design decision */}
              <div className="mt-4 border-l-2 border-[color:var(--signal)]/60 pl-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-white/40">Design decision</div>
                <div className="mt-1 text-white">{pipeline.decision.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{pipeline.decision.body}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
