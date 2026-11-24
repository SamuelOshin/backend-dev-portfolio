"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { headlineMetrics, profile } from "@/data/portfolio";
import { useRoleVariant } from "@/lib/use-role-variant";

const ease = [0.16, 1, 0.3, 1] as const;

const spec = [
  { k: "Focus", v: "LLM retrieval, agents, inference cost" },
  { k: "Stack", v: "Python · FastAPI · Postgres + pgvector" },
  { k: "Infra", v: "Celery · Redis · Docker" },
  { k: "Based", v: profile.location },
];

export function HeroSection() {
  const variant = useRoleVariant();

  return (
    <section id="home" className="relative pt-32 sm:pt-44 pb-8 scroll-mt-24">
      {/* Top rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45"
      >
        <span className="inline-flex items-center gap-2 text-white/70">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--signal)] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--signal)]" />
          </span>
          {variant.status}
        </span>
        <span>{profile.name} · {variant.role}</span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease }}
        className="mt-10 sm:mt-14 text-[2.9rem] leading-[0.98] sm:text-7xl lg:text-[6.5rem] font-semibold tracking-[-0.045em] text-white"
      >
        I build AI systems
        <br className="hidden sm:block" /> that hold up{" "}
        <span className="font-display italic font-normal tracking-[-0.02em] text-[color:var(--signal)]">in production.</span>
      </motion.h1>

      {/* Intro + spec sheet */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-white/[0.08] pt-10"
      >
        <div className="lg:col-span-7">
          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-white/65">
            I build LLM systems end to end: hybrid retrieval, cache-aware generation and tool-using agents, plus the
            queues, locks and ledgers underneath that keep them fast, cheap and correct. For clients, I also ship
            complete products from design to deployment.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={variant.cta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-[color:var(--signal)]"
            >
              {variant.cta.label}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={variant.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              Résumé
              <ArrowUpRight size={14} />
            </a>
            <a
              href="#ask"
              className="group inline-flex items-center gap-1.5 px-2 py-2.5 text-sm text-white/50 transition-colors hover:text-white"
            >
              or ask my portfolio
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        <dl className="lg:col-span-4 lg:col-start-9 divide-y divide-white/[0.06] text-sm">
          {spec.map((s) => (
            <div key={s.k} className="flex items-baseline gap-4 py-2.5 first:pt-0">
              <dt className="w-14 shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">{s.k}</dt>
              <dd className="text-white/75">{s.v}</dd>
            </div>
          ))}
        </dl>
      </motion.div>

      {/* Metrics */}
      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-y-10 border-t border-white/[0.08]"
      >
        {headlineMetrics.map((m, i) => (
          <div
            key={m.label}
            className={`pt-7 pr-6 ${i % 2 === 1 ? "pl-6 border-l border-white/[0.08]" : ""} ${
              i > 0 ? "lg:pl-6 lg:border-l lg:border-white/[0.08]" : ""
            }`}
          >
            <dt className="sr-only">{m.label}</dt>
            <dd className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-white tabular-nums">{m.value}</dd>
            <dd className="mt-2 text-sm text-white/70">{m.label}</dd>
            <dd className="mt-0.5 font-mono text-[11px] text-white/35">{m.context}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
