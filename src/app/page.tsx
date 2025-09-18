"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Download, Mail, Github, Linkedin } from "lucide-react";

export default function Home() {
  // Data
  const experiences = useMemo(
    () => [
    {
      role: "Senior Backend Engineer",
      company: "Vertis Cloud",
      period: "2022 — Present",
      summary:
      "Led platform migration to event-driven microservices (Kafka + Go), reducing latency by 43% and infra cost by 28%.",
      details: [
      "Designed multi-tenant auth with fine-grained RBAC; 0 auth P1s in 12 months.",
      "Shipped observability stack with OpenTelemetry -> Tempo/Loki/Grafana.",
      "Drove SRE initiative: SLOs, error budgets, and incident runbooks."],

      tech: ["Go", "PostgreSQL", "Kafka", "Kubernetes", "gRPC"]
    },
    {
      role: "Backend Engineer",
      company: "Nova Fintech",
      period: "2020 — 2022",
      summary:
      "Built reconciliation pipelines moving 120M+ tx/day with verifiable data lineage and audit trails.",
      details: [
      "Introduced CQRS + outbox pattern; eliminated write races under peak load.",
      "Cut cold-start by 65% via connection pooling and module graph pruning."],

      tech: ["Node.js", "TypeScript", "Redis", "AWS", "Serverless"]
    },
    {
      role: "Software Engineer",
      company: "Arc Labs",
      period: "2018 — 2020",
      summary:
      "Implemented search relevance service with vector embeddings; +18% task success in UX studies.",
      details: [
      "Productionized feature flags and gradual rollout across 30+ services.",
      "Wrote internal SDKs improving DX and reducing boilerplate by ~35%."],

      tech: ["Python", "FastAPI", "Elasticsearch", "Docker"]
    }],

    []
  );

  const projects = useMemo(
    () => [
    {
      title: "Telemetry Mesh",
      image:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1640&auto=format&fit=crop",
      tags: ["OpenTelemetry", "Go", "gRPC"]
    },
    {
      title: "Ledger Engine",
      image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1640&auto=format&fit=crop",
      tags: ["PostgreSQL", "Kafka", "CQRS"]
    },
    {
      title: "Realtime Sync",
      image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1640&auto=format&fit=crop",
      tags: ["WebSocket", "Redis", "TypeScript"]
    },
    {
      title: "Policy-as-Code",
      image:
      "https://images.unsplash.com/photo-1488229297570-58520851e868?q=80&w=1640&auto=format&fit=crop",
      tags: ["OPA", "Kubernetes", "GitOps"]
    },
    {
      title: "Feature Flags",
      image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1640&auto=format&fit=crop",
      tags: ["Node.js", "DX", "SDK"]
    },
    {
      title: "Search Relevance",
      image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1640&auto=format&fit=crop",
      tags: ["Embeddings", "Elasticsearch", "Python"]
    }],

    []
  );

  return (
    <main className="relative mx-auto max-w-7xl px-6 sm:px-8">
      {/* Hero */}
      <section className="relative grid grid-cols-1 md:grid-cols-12 gap-10 pt-16 sm:pt-24">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="col-span-1 md:col-span-6 flex flex-col justify-center">

          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="/! bg-white/5 text-white/80 backdrop-blur-sm">
              Backend Developer
            </Badge>
            <Badge className="/! bg-[color:var(--accent)]/20 text-[color:var(--accent)] border-[color:var(--accent)]/40">
              Performance • Reliability
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold leading-tight tracking-[-0.03em]">
            Architecting dependable systems with elegant APIs.
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/70">
            I design resilient services, shape data models, and ship
            observability-first platforms. Clean contracts. Predictable latency.
            Zero drama deploys.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <GlowButton href="#projects" icon={<ArrowRight size={18} />}>
              View Projects
            </GlowButton>
            <GlowButton 
              variant="outline" 
              href="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Samuel Oshin_Junior_Python_Backend_Developer-1758178066590.pdf"
              icon={<Download size={18} />} 
              download
            >
              Download CV
            </GlowButton>
          </div>

          <div className="mt-8 flex items-center gap-4 text-white/60">
            <a className="hover:text-[color:var(--accent)] transition-colors" href="mailto:samuelt.oshin@gmail.com" aria-label="Email">
              <Mail size={20} />
            </a>
            <a className="hover:text-[color:var(--accent)] transition-colors" href="https://github.com/SamuelOshin" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a className="hover:text-[color:var(--accent)] transition-colors" href="https://linkedin.com/in/samuel-oshin-2903611a5/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="col-span-1 md:col-span-6 relative">

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[color:var(--accent)]/20 via-transparent to-white/5">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/headshotbychatgpt-1758178525713.png"
              alt="Portrait"
              className="h-full w-full object-cover mix-blend-luminosity opacity-90 grayscale contrast-125" />

            {/* Duotone overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_10%,_color:var(--accent)/35,_transparent_45%),linear-gradient(to_top_right,_#000000_10%,_transparent_40%)]" />
            {/* Floating glow */}
            <motion.div
              aria-hidden
              className="absolute -inset-8 rounded-[36px]"
              style={{ background: "radial-gradient(600px 240px at 20% 90%, var(--accent)/20, transparent 60%)" }}
              animate={{ opacity: [0.4, 0.8, 0.4], y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity }} />

          </div>
        </motion.div>
      </section>

      {/* Experience Timeline */}
      <section className="relative mt-24 sm:mt-32">
        <SectionHeader kicker="About / Experience" title="Impact through systems thinking" />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <TimelineRail />
          </div>
          <div className="lg:col-span-7 space-y-6">
            {experiences.map((exp, idx) =>
            <ExpandableCard key={idx} {...exp} />
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative mt-24 sm:mt-32">
        <SectionHeader kicker="Selected Work" title="Pragmatic builds with measurable outcomes" />
        <MasonryGrid projects={projects} />
      </section>

      {/* Footer */}
      <footer className="relative mt-28 mb-16 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
        <div className="text-sm text-white/60">© {new Date().getFullYear()} Backend Developer Portfolio</div>
        <div className="flex items-center gap-2">
          <Badge className="/! bg-[color:var(--accent)]/20 text-[color:var(--accent)] border-[color:var(--accent)]/40">Available for contracts</Badge>
        </div>
      </footer>
    </main>);

}

function SectionHeader({ kicker, title }: {kicker: string;title: string;}) {
  return (
    <div className="max-w-3xl">
      <div className="text-[11px] uppercase tracking-[0.22em] text-white/50">{kicker}</div>
      <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.02em]">
        {title}
      </h2>
    </div>);

}

function GlowButton({
  children,
  href,
  icon,
  variant = "solid",
  download
}: {children: React.ReactNode;href: string;icon?: React.ReactNode;variant?: "solid" | "outline";download?: boolean;}) {
  return (
    <motion.a
      href={href}
      download={download ? "" : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className="group relative inline-flex">

      <span
        className="pointer-events-none absolute -inset-px rounded-full opacity-60 blur-md transition duration-300 group-hover:opacity-90"
        style={{ background: "linear-gradient(90deg, var(--accent) 0%, transparent 60%)" }} />

      <Button
        variant={variant === "outline" ? "outline" : "default"}
        className={
        variant === "outline" ?
        "bg-transparent border-[color:var(--accent)]/40 text-white hover:bg-[color:var(--accent)]/10" :
        "bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:bg-[color:var(--accent)]/90"
        }>

        <span className="mr-2 inline-flex items-center justify-center">{icon}</span>
        {children}
      </Button>
    </motion.a>);

}

function TimelineRail() {
  return (
    <div className="relative rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 backdrop-blur">
      <div className="overflow-x-auto">
        <div className="min-w-[640px] md:min-w-0">
          <div className="relative flex items-center gap-0">
            <div className="h-[2px] w-full bg-white/10" />
            {/* decorative overlay gradient */}
            <div className="pointer-events-none absolute inset-x-0 h-[2px] bg-[linear-gradient(90deg,transparent,theme(colors.accent)/60%,transparent)] opacity-60" />
          </div>
          <div className="mt-4 grid grid-cols-4 items-start">
            {[
            { label: "2018", sub: "Arc Labs" },
            { label: "2020", sub: "Nova" },
            { label: "2022", sub: "Vertis" },
            { label: "Now", sub: "Impact" }].
            map((n, i) =>
            <div key={i} className="flex flex-col items-start">
                <div className="relative -mt-3 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-[color:var(--accent)] shadow-[0_0_0_6px_rgba(0,0,0,0.4)]" />
                </div>
                <div className="mt-2 text-xs text-white/60">{n.label}</div>
                <div className="text-sm text-white/80">{n.sub}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 text-sm text-white/60">Evolving systems with clarity and empathy.</div>
    </div>);

}

function ExpandableCard({
  role,
  company,
  period,
  summary,
  details,
  tech







}: {role: string;company: string;period: string;summary: string;details: string[];tech: string[];}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}>

      <Card
        className="group relative overflow-hidden border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-[color:var(--accent)]/30 hover:bg-white/[0.06]"
        onClick={() => setOpen((v) => !v)}>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-white/60">{period}</div>
            <h3 className="mt-1 text-xl font-semibold tracking-[-0.02em]">{role}</h3>
            <div className="text-sm text-white/70">{company}</div>
          </div>
          <span className="mt-1 inline-flex h-8 items-center gap-2 rounded-full border border-white/10 px-3 text-xs text-white/70 transition group-hover:border-[color:var(--accent)]/40 group-hover:text-[color:var(--accent)]">
            Details
            <ArrowRight size={14} className={`transition ${open ? "rotate-90" : ""}`} />
          </span>
        </div>
        <p className="mt-4 text-white/75">{summary}</p>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          className="overflow-hidden">

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
            {details.map((d, i) =>
            <li key={i}>{d}</li>
            )}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {tech.map((t) =>
            <Badge
              key={t}
              className="/! bg-[color:var(--accent)]/15 text-[color:var(--accent)] border-[color:var(--accent)]/30">

                {t}
              </Badge>
            )}
          </div>
        </motion.div>
        {/* Accent hover bar */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }} />

      </Card>
    </motion.div>);

}

function MasonryGrid({
  projects


}: {projects: {title: string;image: string;tags: string[];}[];}) {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
      {projects.map((p, i) =>
      <motion.article
        key={p.title + i}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: i * 0.05 }}
        className="mb-0 flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden">

          <div className="relative w-full h-48 sm:h-56 lg:h-60">
            <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
            <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent !w-full !h-full" />

            <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-1 bg-[radial-gradient(60%_100%_at_50%_120%,_var(--accent),_transparent)] opacity-60" />
          </div>
          <div className="p-4 flex flex-col gap-3 flex-1">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-medium tracking-[-0.01em]">{p.title}</h3>
              <ArrowRight size={16} className="text-white/60" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((tag) =>
            <Badge
              key={tag}
              className="/! bg-white/5 text-white/75 border-white/10 hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)]">

                  {tag}
                </Badge>
            )}
            </div>
          </div>
        </motion.article>
      )}
    </div>);

}