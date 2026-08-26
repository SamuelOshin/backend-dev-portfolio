"use client";

import React from "react";
import { motion } from "framer-motion";

const milestones = [
  { label: "2026", sub: "Lead Backend Engineer @ CR8US", current: true },
  { label: "2025", sub: "Emerj LLC & 2x HNG Finalist", current: false },
  { label: "2024", sub: "NYSC & ERP Automation", current: false },
  { label: "2023", sub: "Django & IT Systems", current: false },
];

export function TimelineRail() {
  return (
    <div className="bezel-shell">
      <div className="bezel-core p-6">
        <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-6 text-center">
          Career Milestones
        </div>

        <div className="flex flex-col space-y-8 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[17px] top-3 bottom-3 w-px bg-white/10" />

          {milestones.map((n, i) => (
            <div key={i} className="flex items-start gap-4 relative z-10">
              {/* Node Indicator */}
              <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center border transition-all ${
                    n.current
                      ? "bg-blue-500/20 border-blue-400 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                      : "bg-zinc-900 border-white/15 text-white/50"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold">{n.label.slice(2)}</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-white">{n.label}</span>
                  {n.current && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Active
                    </span>
                  )}
                </div>
                <div className="text-xs text-white/60 leading-tight">{n.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-white/5 text-center">
          <p className="text-xs text-white/40 leading-relaxed font-mono">
            Continuous engineering impact across production systems.
          </p>
        </div>
      </div>
    </div>
  );
}
