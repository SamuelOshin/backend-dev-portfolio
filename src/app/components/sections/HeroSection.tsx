"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Terminal, Cpu, Database, Zap, ShieldCheck, CheckCircle2, Copy, Check } from "lucide-react";
import { GlowButton } from "../ui/GlowButton";

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("samuelt.oshin@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 min-h-[90dvh] flex flex-col justify-center">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[color:var(--accent)]/15 via-transparent to-transparent blur-3xl opacity-60" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: High-Impact Typography & Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Status Beacon Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for AI Enginerring / Backend Roles
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            Architecting resilient <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300">AI backends</span> and distributed systems.
          </h1>

          {/* Value Prop Subtext */}
          <p className="mt-5 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
            Python Backend Engineer specializing in high-throughput RAG pipelines, pgvector search, and event-driven async architectures with 16x latency reductions.
          </p>

          {/* CTA Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <GlowButton href="#projects" icon={<ArrowRight size={16} />}>
              Explore Work
            </GlowButton>
            <GlowButton
              variant="outline"
              href="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Samuel Oshin_Junior_Python_Backend_Developer-1758178066590.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              icon={<Download size={16} />}
            >
              Download Resume
            </GlowButton>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 sm:gap-8 w-full max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">16x</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Endpoint Speedup</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">80%</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Token Cost Cut</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">Top 5%</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">10k+ Engineers</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Live Backend Telemetry & Architecture Double-Bezel Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          {/* Double-Bezel Shell */}
          <div className="bezel-shell">
            <div className="bezel-core p-0 overflow-hidden bg-zinc-950/90">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-white/40 ml-2">sys-telemetry.sh</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    HTTP/2 200 OK
                  </span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs space-y-4">
                {/* Active Service */}
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/5">
                  <div className="space-y-1">
                    <div className="text-[11px] text-white/40 uppercase">Active Node</div>
                    <div className="text-white font-semibold flex items-center gap-1.5">
                      <Cpu size={14} className="text-blue-400" />
                      CR8US AI Core (FastAPI)
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-[11px] text-white/40 uppercase">Uptime</div>
                    <div className="text-emerald-400">99.98%</div>
                  </div>
                </div>

                {/* Pipeline Metrics */}
                <div className="space-y-2">
                  <div className="text-[11px] text-white/40 uppercase tracking-wider">Pipeline Performance</div>
                  
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-white/70 flex items-center gap-1.5">
                        <Database size={12} className="text-indigo-400" />
                        pgvector + FTS Hybrid Search
                      </span>
                      <span className="text-emerald-400 font-semibold">&lt; 1.45s</span>
                    </div>

                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-white/70 flex items-center gap-1.5">
                        <Zap size={12} className="text-amber-400" />
                        Gemini Dynamic Prefix Cache
                      </span>
                      <span className="text-blue-400 font-semibold">80% cost saved</span>
                    </div>

                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-white/70 flex items-center gap-1.5">
                        <ShieldCheck size={12} className="text-purple-400" />
                        Dual-Mode Token Rotation
                      </span>
                      <span className="text-white/90">Zero-Fund Loss</span>
                    </div>
                  </div>
                </div>

                {/* Live Async Queue Feed */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] text-white/40 uppercase tracking-wider">Queue Broker</div>
                  <div className="flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300">
                    <span>Celery + Redis Worker #04</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      1,000+ jobs/min
                    </span>
                  </div>
                </div>

                {/* Interactive Contact / Ping Bar */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <div className="text-[11px] text-white/50 truncate">
                    contact: <span className="text-white/80">samuelt.oshin@gmail.com</span>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white/80 text-[11px] border border-white/10 transition-colors shrink-0"
                  >
                    {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
