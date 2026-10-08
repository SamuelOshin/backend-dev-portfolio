"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AskConsole } from "../ui/AskConsole";
import { headlineMetrics, profile } from "@/data/portfolio";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section id="home" className="relative pt-32 sm:pt-40 pb-8 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="lg:col-span-6 lg:pt-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--signal)]" />
            Open to AI engineering roles · {profile.location}
          </div>

          <h1 className="mt-7 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem] font-semibold tracking-[-0.035em] text-white">
            I build AI systems that hold up{" "}
            <span className="font-display italic font-normal tracking-[-0.01em] text-[color:var(--signal)]">in production.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-white/60">
            I&apos;m Samuel Oshin, an AI product engineer. I ship whole products, from the retrieval pipeline and
            the agents to the storefront your customers click: design, frontend, backend and the queues, locks and
            ledgers that keep it fast, cheap and correct at scale.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#systems"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-[color:var(--signal)]"
            >
              See the systems
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              Résumé
              <ArrowUpRight size={14} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2 py-2.5 text-sm text-white/50 transition-colors hover:text-white"
            >
              GitHub
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="lg:col-span-6 relative"
        >
          <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[color:var(--signal)]/[0.07] blur-3xl" />
          <AskConsole />
          <p className="mt-3 px-1 text-xs text-white/40">
            A real retriever, not a mock. It ranks chunks of this site with BM25 and answers only from what it finds.
          </p>
        </motion.div>
      </div>

      {/* Metrics strip */}
      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="mt-20 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]"
      >
        {headlineMetrics.map((m) => (
          <div key={m.label} className="bg-background p-5 sm:p-7">
            <dt className="sr-only">{m.label}</dt>
            <dd className="text-3xl sm:text-4xl font-semibold tracking-tight text-white tabular-nums">{m.value}</dd>
            <dd className="mt-1.5 text-sm text-white/70">{m.label}</dd>
            <dd className="mt-0.5 font-mono text-[11px] text-white/35">{m.context}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
