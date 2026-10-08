"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Package } from "lucide-react";
import { projects, type Project, type ProjectCategory } from "@/data/portfolio";

const FILTERS: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI & RAG" },
  { id: "distributed", label: "Distributed" },
  { id: "tools", label: "Tools" },
];

function ProjectLinks({ p, compact = false }: { p: Project; compact?: boolean }) {
  const cls = "inline-flex items-center gap-1 text-xs text-white/55 transition-colors hover:text-[color:var(--signal)]";
  return (
    <div className={`flex items-center ${compact ? "gap-3" : "gap-4"}`}>
      {p.liveUrl && (
        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${p.title} live site`}>
          Live <ArrowUpRight size={12} />
        </a>
      )}
      {p.githubUrl && (
        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${p.title} source on GitHub`}>
          <Github size={12} /> {!compact && "Source"}
        </a>
      )}
      {p.pypiUrl && (
        <a href={p.pypiUrl} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${p.title} on PyPI`}>
          <Package size={12} /> {!compact && "PyPI"}
        </a>
      )}
    </div>
  );
}

function FeaturedCard({ p, i }: { p: Project; i: number }) {
  const steps = p.architecture.split("->").map((s) => s.trim());
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
      className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.015] p-6 sm:p-7 transition-colors hover:border-white/20"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-white/40">{p.categoryLabel}</div>
          <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-white">{p.title}</h3>
        </div>
        <ProjectLinks p={p} compact />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-white/60">{p.description}</p>

      {/* Architecture as a flow */}
      <div className="mt-6 flex flex-wrap items-center gap-1.5">
        {steps.map((s, j) => (
          <React.Fragment key={s}>
            <span className="rounded-md border border-white/10 bg-[color:var(--ink)] px-2 py-1 font-mono text-[10.5px] text-white/70">{s}</span>
            {j < steps.length - 1 && <span className="text-white/25 text-xs">→</span>}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-auto pt-6 flex items-end justify-between gap-4">
        <div className="font-mono text-sm text-[color:var(--signal)]">{p.metric}</div>
        <div className="hidden sm:block text-[11px] text-white/35 text-right">{p.tags.slice(0, 4).join(" · ")}</div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const featured = projects.filter((p) => p.featured);
  const rest = useMemo(
    () => projects.filter((p) => !p.featured && (filter === "all" || p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="relative mt-32 sm:mt-44 scroll-mt-24">
      <div className="max-w-2xl">
        <span className="eyebrow">02 · Selected work</span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white">
          Shipped, <span className="font-display italic font-normal">and in use.</span>
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        {featured.map((p, i) => (
          <FeaturedCard key={p.title} p={p} i={i} />
        ))}
      </div>

      {/* Index of everything else */}
      <div className="mt-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <h3 className="text-sm font-medium text-white/80">More projects</h3>
          <div className="flex gap-1" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-full px-3 py-1 text-xs transition-colors cursor-pointer ${
                  filter === f.id ? "bg-white text-zinc-950" : "text-white/55 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <ul>
          {rest.length === 0 && <li className="py-8 text-sm text-white/40">Nothing else in this category. The featured work above covers it.</li>}
          {rest.map((p) => (
            <li key={p.title} className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 border-b border-white/[0.06] py-5">
              <div className="md:col-span-4">
                <div className="text-white font-medium">{p.title}</div>
                <div className="mt-0.5 text-xs text-white/40">{p.categoryLabel}</div>
              </div>
              <p className="md:col-span-5 text-sm leading-relaxed text-white/55">{p.description}</p>
              <div className="md:col-span-3 flex md:flex-col md:items-end justify-between gap-2">
                <span className="font-mono text-xs text-white/70">{p.metric}</span>
                <ProjectLinks p={p} />
              </div>
            </li>
          ))}
        </ul>
        <a
          href={`https://github.com/SamuelOshin`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors"
        >
          Everything else is on GitHub <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
