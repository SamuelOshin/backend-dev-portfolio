"use client";

import React from "react";
import { motion } from "framer-motion";
import { capabilities } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="relative mt-32 sm:mt-44 scroll-mt-24">
      <div className="max-w-2xl">
        <span className="eyebrow">05 · Capabilities</span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white">
          The full stack of an <span className="font-display italic font-normal">AI product.</span>
        </h2>
        <p className="mt-4 text-white/60 leading-relaxed">
          Models are one layer. Retrieval, orchestration, data and infrastructure decide whether a model ships.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
        {capabilities.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="bg-background p-6 sm:p-8"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-[color:var(--signal)]">L{capabilities.length - i}</span>
              <h3 className="text-lg font-medium text-white">{c.title}</h3>
            </div>
            <p className="mt-2 text-sm text-white/55">{c.blurb}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {c.skills.map((s) => (
                <li key={s} className="rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-white/70">
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
