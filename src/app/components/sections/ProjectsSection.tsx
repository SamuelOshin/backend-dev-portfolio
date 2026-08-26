"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Terminal,
  Sparkles,
  Search,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp,
  X,
  Cpu,
  Layers,
} from "lucide-react";

type ProjectCategory = "all" | "ai" | "distributed" | "tools";
type ViewMode = "grid" | "table";

interface Project {
  title: string;
  category: "ai" | "distributed" | "tools";
  categoryLabel: string;
  architecture: string;
  description: string;
  metric: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  apiUrl?: string;
  pypiUrl?: string;
  featured?: boolean;
}

const INITIAL_DISPLAY_COUNT = 6;

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isExpanded, setIsExpanded] = useState(false);

  const projects: Project[] = useMemo(
    () => [
      {
        title: "Proovia - AI Content Detector",
        category: "ai",
        categoryLabel: "AI & Computer Vision",
        architecture: "FastAPI -> PyTorch ResNet-18 -> Batched Tensor Inference",
        description:
          "Production-grade AI image & synthetic content detection API processing multi-format inputs with sub-second inference times.",
        metric: "Sub-second Vision Inference",
        tags: ["Python", "FastAPI", "HuggingFace", "PyTorch", "ResNet-18", "Docker"],
        liveUrl: "https://proovia.cloud/landing",
        featured: true,
      },
      {
        title: "Code Review Agent (A2A)",
        category: "ai",
        categoryLabel: "Agentic Infrastructure",
        architecture: "A2A Protocol -> Google Gemini 2.0 -> Async Webhook Bus",
        description:
          "Autonomous code review agent leveraging Agent-to-Agent protocol for real-time security vulnerability detection and AST code analysis.",
        metric: "< 800ms Review Cycles",
        tags: ["Python", "A2A Protocol", "Google Gemini 2.0", "Webhooks", "Docker"],
        githubUrl: "https://github.com/SamuelOshin/code_reviewer_agent_a2a",
        featured: true,
      },
      {
        title: "Distributed Wallet Service",
        category: "distributed",
        categoryLabel: "Financial Architecture",
        architecture: "FastAPI -> Redis Lock -> PostgreSQL ACID Transaction Ledger",
        description:
          "Zero-fund-loss financial transaction system with atomic database operations, idempotent Paystack webhooks, and Celery crash-recovery workers.",
        metric: "Zero Fund Loss Ledger",
        tags: ["FastAPI", "Redis", "PostgreSQL", "Paystack", "JWT", "OAuth 2.0"],
        githubUrl: "https://github.com/SamuelOshin/hng12-stage2-wallet",
        featured: true,
      },
      {
        title: "Hybrid RAG AI Service",
        category: "ai",
        categoryLabel: "Vector Search & Retrieval",
        architecture: "pgvector Cosine Search + ChromaDB -> LangChain Pipeline",
        description:
          "Contextual semantic retrieval engine with document chunking, OpenRouter embeddings, and parallel full-text search fallbacks.",
        metric: "25% Higher Retrieval Precision",
        tags: ["Python", "FastAPI", "LangChain", "ChromaDB", "pgvector", "Docker"],
        githubUrl: "https://github.com/SamuelOshin/hng12-stage2-rag-ai-service",
      },
      {
        title: "SSL Certificate Health Agent",
        category: "tools",
        categoryLabel: "API & Monitoring",
        architecture: "JSON-RPC Daemon -> OpenSSL Wrapper -> Telex Webhooks",
        description:
          "Automated SSL certificate lifecycle monitoring tool alerting DevOps teams ahead of certificate expirations and cipher misconfigurations.",
        metric: "Proactive Outage Prevention",
        tags: ["Python", "A2A", "Google Gemini", "JSON-RPC", "Telex.im"],
        githubUrl: "https://github.com/SamuelOshin/ssl-checker-telex-integration",
        liveUrl: "https://ssl-checker.telex.im",
      },
      {
        title: "Country Currency & Exchange API",
        category: "tools",
        categoryLabel: "High-Throughput API",
        architecture: "FastAPI -> httpx Async Client -> Redis In-Memory Cache",
        description:
          "High-concurrency global financial exchange rate engine with layered in-memory caching and 16x lower latency under heavy load.",
        metric: "16x Latency Reduction",
        tags: ["Python", "FastAPI", "MySQL", "httpx", "Redis Caching"],
        githubUrl: "https://github.com/SamuelOshin/hng12-stage1-country-api",
      },
      {
        title: "CodeBEGen CLI",
        category: "ai",
        categoryLabel: "Developer Tooling",
        architecture: "Python CLI -> AST Generator -> Google Gemini LLM Core",
        description:
          "Published Python package generating production-ready backend boilerplate, schema migrations, and route handlers directly in terminal.",
        metric: "Published on PyPI",
        tags: ["Python", "CLI Tooling", "Google Gemini", "PyPI", "AST Generation"],
        githubUrl: "https://github.com/SamuelOshin/BE-GenAI",
        pypiUrl: "https://pypi.org/project/codebegen/",
      },
      {
        title: "Network Downtime Alerts Monitor",
        category: "distributed",
        categoryLabel: "Infrastructure Health",
        architecture: "Async Socket Poller -> PostgreSQL -> Real-time Socket Bus",
        description:
          "Proactive infrastructure monitoring pipeline tracking uptime across internal subnets with automatic incident creation and alerting.",
        metric: "15+ Outages Prevented",
        tags: ["Python", "FastAPI", "React", "PostgreSQL", "Socket Streaming"],
        githubUrl: "https://github.com/SamuelOshin/network-downtime-monitor",
      },
      {
        title: "MockBox Mocking Engine",
        category: "tools",
        categoryLabel: "Full-Stack System",
        architecture: "FastAPI Backend -> Claude API -> Next.js Edge UI",
        description:
          "Synthetic API schema mock generator creating production-faithful response fixtures for frontend and integration testing.",
        metric: "Instant Mock APIs",
        tags: ["FastAPI", "Next.js", "TypeScript", "Anthropic Claude", "Supabase"],
        githubUrl: "https://github.com/Tobi09-17/mockbox",
        liveUrl: "https://mockbox.vercel.app/",
      },
    ],
    []
  );

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: projects.length,
      ai: projects.filter((p) => p.category === "ai").length,
      distributed: projects.filter((p) => p.category === "distributed").length,
      tools: projects.filter((p) => p.category === "tools").length,
    };
  }, [projects]);

  // Filtered list based on category & search
  const filteredProjects = useMemo(() => {
    let result = projects;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.architecture.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [projects, activeCategory, searchQuery]);

  // Paginated visible list for Bento Grid view
  const visibleProjects = useMemo(() => {
    if (viewMode === "table" || isExpanded || searchQuery.trim() || activeCategory !== "all") {
      return filteredProjects;
    }
    return filteredProjects.slice(0, INITIAL_DISPLAY_COUNT);
  }, [filteredProjects, viewMode, isExpanded, searchQuery, activeCategory]);

  const hasMore =
    viewMode === "grid" &&
    !searchQuery.trim() &&
    activeCategory === "all" &&
    filteredProjects.length > INITIAL_DISPLAY_COUNT;

  return (
    <section id="projects" className="relative mt-28 sm:mt-36 scroll-mt-24 w-full">
      {/* Header & Controls */}
      <div className="flex flex-col gap-6 mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-3">
              <Layers size={12} />
              Production Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Engineered Systems &amp; Projects
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/60 max-w-xl">
              Real architectures: RAG pipelines, distributed locks, financial ledgers, and developer CLI tools.
            </p>
          </div>

          {/* View Mode Switcher (Grid vs Compact Terminal Table) */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-950 border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white/10 text-white shadow-sm border border-white/10"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
              title="Visual Bento Grid"
            >
              <LayoutGrid size={14} />
              <span>Bento</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white/10 text-white shadow-sm border border-white/10"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
              title="Compact Technical Matrix Table"
            >
              <List size={14} />
              <span>Compact Index</span>
            </button>
          </div>
        </div>

        {/* Filter Bar: Category Tabs + Quick Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Category Tabs with Item Count Badges */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-zinc-950/80 border border-white/10">
            {(
              [
                { id: "all", label: "All Systems", count: categoryCounts.all },
                { id: "ai", label: "AI & RAG", count: categoryCounts.ai },
                { id: "distributed", label: "Distributed", count: categoryCounts.distributed },
                { id: "tools", label: "APIs & Tools", count: categoryCounts.tools },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id);
                  setIsExpanded(false);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-white/15 text-white font-semibold shadow-sm border border-white/15"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    activeCategory === tab.id
                      ? "bg-blue-500 text-white font-bold"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack or architecture..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-zinc-950/80 border border-white/10 text-xs text-white placeholder:text-white/30 focus:border-blue-400 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-0.5 rounded cursor-pointer"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result Status when searching */}
      {searchQuery && (
        <div className="mb-6 flex items-center justify-between text-xs text-white/60 font-mono">
          <span>
            Found {filteredProjects.length} matching {filteredProjects.length === 1 ? "project" : "projects"}
          </span>
          <button
            onClick={() => setSearchQuery("")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* VIEW 1: BENTO VISUAL GRID */}
      {viewMode === "grid" && (
        <>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {visibleProjects.map((project, idx) => (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className={`bezel-shell flex flex-col justify-between ${
                    project.featured && activeCategory === "all" && !searchQuery
                      ? "md:col-span-2 lg:col-span-1"
                      : ""
                  }`}
                >
                  <div className="bezel-core h-full flex flex-col justify-between p-6">
                    <div>
                      {/* Category & Metric Header */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-[11px] font-mono text-blue-400 font-medium px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                          {project.categoryLabel}
                        </span>

                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                          <Sparkles size={11} />
                          {project.metric}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-lg font-bold tracking-tight text-white mb-2">
                        {project.title}
                      </h3>

                      {/* Architecture Schema Preview */}
                      <div className="my-3 px-3 py-2 rounded-lg bg-black/50 border border-white/5 font-mono text-[11px] text-white/70 overflow-x-auto">
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1">
                          <Terminal size={10} className="text-blue-400" />
                          Architecture Flow
                        </div>
                        <div className="text-blue-300 truncate">{project.architecture}</div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-white/65 leading-relaxed mb-5">
                        {project.description}
                      </p>
                    </div>

                    {/* Footer: Tags & Actions */}
                    <div>
                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3 mb-5 border-t border-white/5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] font-mono text-white/60 bg-white/[0.03] border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Direct Links */}
                      <div className="flex items-center gap-2 pt-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white/80 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/25 transition-all min-h-[40px]"
                          >
                            <Github size={14} />
                            <span>Source</span>
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-950 bg-[color:var(--accent)] hover:bg-white transition-all min-h-[40px]"
                          >
                            <ExternalLink size={14} />
                            <span>Live Demo</span>
                          </a>
                        )}

                        {project.pypiUrl && (
                          <a
                            href={project.pypiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 transition-all min-h-[40px]"
                          >
                            <Terminal size={14} />
                            <span>PyPI</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Progressive Disclosure Expand / Collapse Button */}
          {hasMore && (
            <div className="mt-10 flex flex-col items-center justify-center gap-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer shadow-lg"
              >
                <span>
                  {isExpanded
                    ? "Show Top Highlights"
                    : `Explore All Systems (+${filteredProjects.length - INITIAL_DISPLAY_COUNT} more)`}
                </span>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <div className="text-[11px] font-mono text-white/40">
                Showing {isExpanded ? filteredProjects.length : visibleProjects.length} of {filteredProjects.length} engineered architectures
              </div>
            </div>
          )}
        </>
      )}

      {/* VIEW 2: COMPACT TECHNICAL MATRIX TABLE (Instant dense scan for recruiters) */}
      {viewMode === "table" && (
        <div className="bezel-shell overflow-hidden">
          <div className="bezel-core p-0 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono uppercase tracking-wider text-white/50">
                  <th className="py-3.5 px-4 font-semibold">System / Project</th>
                  <th className="py-3.5 px-4 font-semibold hidden md:table-cell">Architecture Flow</th>
                  <th className="py-3.5 px-4 font-semibold">Key Metric</th>
                  <th className="py-3.5 px-4 font-semibold hidden lg:table-cell">Stack</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Links</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProjects.map((p) => (
                  <tr
                    key={p.title}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    {/* Project Title & Category */}
                    <td className="py-4 px-4 align-top">
                      <div className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">
                        {p.title}
                      </div>
                      <div className="text-[10px] font-mono text-white/40 mt-0.5">
                        {p.categoryLabel}
                      </div>
                      <div className="text-xs text-white/60 mt-1.5 line-clamp-2 md:hidden">
                        {p.description}
                      </div>
                    </td>

                    {/* Architecture Flow */}
                    <td className="py-4 px-4 align-top hidden md:table-cell">
                      <div className="font-mono text-[11px] text-blue-300/90 max-w-xs">
                        {p.architecture}
                      </div>
                      <div className="text-xs text-white/60 mt-1 max-w-sm">
                        {p.description}
                      </div>
                    </td>

                    {/* Key Metric */}
                    <td className="py-4 px-4 align-top whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-400 font-medium px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        <Sparkles size={10} />
                        {p.metric}
                      </span>
                    </td>

                    {/* Stack */}
                    <td className="py-4 px-4 align-top hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {p.tags.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded text-[9px] font-mono text-white/60 bg-white/[0.03] border border-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/15 text-white/80 hover:text-white transition-all inline-flex items-center justify-center"
                            title="View Source on GitHub"
                          >
                            <Github size={14} />
                          </a>
                        )}
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-[color:var(--accent)] text-zinc-950 hover:bg-white transition-all inline-flex items-center justify-center font-semibold"
                            title="View Live Demo"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        {p.pypiUrl && (
                          <a
                            href={p.pypiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 transition-all inline-flex items-center justify-center"
                            title="View on PyPI"
                          >
                            <Terminal size={14} />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
