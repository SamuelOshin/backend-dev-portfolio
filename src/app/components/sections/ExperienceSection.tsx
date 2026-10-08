"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { experiences } from "@/data/portfolio";

export function ExperienceSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="relative mt-32 sm:mt-44 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">04 · Experience</span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white">
              Where the <span className="font-display italic font-normal">work</span> happened.
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              From IT automation to owning the full AI backend of a production platform as its sole engineer.
            </p>
          </div>
        </div>

        <ol className="lg:col-span-8 border-t border-white/[0.08]">
          {experiences.map((exp, i) => {
            const isOpen = open === i;
            return (
              <li key={exp.company + exp.role} className="border-b border-white/[0.08]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group w-full text-left py-6 grid grid-cols-12 gap-3 items-start cursor-pointer"
                >
                  <span className="col-span-12 sm:col-span-3 font-mono text-xs text-white/40 pt-1">{exp.period}</span>
                  <span className="col-span-11 sm:col-span-8">
                    <span className="block text-lg font-medium text-white group-hover:text-[color:var(--signal)] transition-colors">
                      {exp.role}
                    </span>
                    <span className="block text-sm text-white/50">{exp.company}</span>
                  </span>
                  <span className="col-span-1 flex justify-end pt-1.5">
                    <Plus size={16} className={`text-white/40 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="sm:ml-[25%] pb-7">
                        <p className="text-white/70 leading-relaxed">{exp.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {exp.metrics.map((m) => (
                            <span key={m} className="rounded-full border border-[color:var(--signal)]/30 bg-[color:var(--signal)]/[0.06] px-2.5 py-1 font-mono text-[11px] text-[color:var(--signal)]">
                              {m}
                            </span>
                          ))}
                        </div>
                        <ul className="mt-5 space-y-2.5">
                          {exp.details.map((d) => (
                            <li key={d} className="relative pl-4 text-sm leading-relaxed text-white/60 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-white/30">
                              {d}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 font-mono text-[11px] text-white/35">{exp.tech.join(" · ")}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
