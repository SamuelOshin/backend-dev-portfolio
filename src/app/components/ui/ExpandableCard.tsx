"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

interface ExpandableCardProps {
  role: string;
  company: string;
  period: string;
  summary: string;
  metrics?: string[];
  details: string[];
  tech: string[];
}

export function ExpandableCard({
  role,
  company,
  period,
  summary,
  metrics,
  details,
  tech,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bezel-shell"
    >
      <div className="bezel-core">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-mono text-white/50">{period}</span>
              <span className="text-white/20">/</span>
              <span className="text-xs font-medium text-blue-400">{company}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">{role}</h3>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
            aria-expanded={open}
          >
            <span>{open ? "Hide Architecture" : "View Architecture"}</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${open ? "rotate-180 text-blue-400" : ""}`}
            />
          </button>
        </div>

        {/* Summary Description */}
        <p className="mt-3 text-sm text-white/70 leading-relaxed">{summary}</p>

        {/* Highlighted Key Metrics (Always Visible) */}
        {metrics && metrics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {metrics.map((m, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-blue-500/10 border border-blue-500/20 text-blue-300"
              >
                <Sparkles size={11} className="text-blue-400" />
                {m}
              </span>
            ))}
          </div>
        )}

        {/* Expandable Technical Deep-Dive */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-white/40">
                  Engineered Solutions &amp; System Details
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-white/70">
                  {details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1 shrink-0">▸</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech Stack Pills */}
        <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full text-[11px] font-mono text-white/60 bg-white/[0.04] border border-white/10 hover:border-white/20 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
