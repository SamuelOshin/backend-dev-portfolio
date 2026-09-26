"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, Database, ExternalLink } from "lucide-react";

interface Project {
    title: string;
    image: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    apiUrl?: string;
    category: string;
}

const FILTERS = ["All", "AI & LLM", "APIs & Systems", "Full-Stack"] as const;

export function ProjectGrid({ projects }: { projects: Project[] }) {
    const [activeFilter, setActiveFilter] = useState<string>("All");

    const filtered = useMemo(() => {
        if (activeFilter === "All") return projects;
        return projects.filter((p) => p.category === activeFilter);
    }, [activeFilter, projects]);

    return (
        <div className="mt-10">
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 mb-8">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                            activeFilter === f
                                ? "bg-[color:var(--accent)] text-[color:var(--accent-foreground)] border-[color:var(--accent)]"
                                : "bg-white/5 text-white/70 border-white/10 hover:border-white/25 hover:text-white"
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Project grid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                layout
            >
                <AnimatePresence mode="popLayout">
                    {filtered.map((p) => (
                        <motion.article
                            key={p.title}
                            layout
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.35 }}
                            className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden group hover:border-[color:var(--accent)]/30 transition-colors"
                        >
                            <div className="relative w-full h-48 sm:h-52 overflow-hidden">
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                {/* Bottom accent line */}
                                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[color:var(--accent)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="flex-1 p-5 flex flex-col">
                                <div className="flex items-center justify-between gap-3 mb-3">
                                    <h3 className="text-base font-medium tracking-[-0.01em] group-hover:text-[color:var(--accent)] transition-colors line-clamp-2">
                                        {p.title}
                                    </h3>
                                    <ArrowRight size={14} className="text-white/40 group-hover:text-[color:var(--accent)] transition-colors flex-shrink-0" />
                                </div>

                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {p.tags.slice(0, 4).map((tag) => (
                                        <Badge
                                            key={tag}
                                            className="bg-white/5 text-white/75 border-white/10 text-[11px] px-2 py-0.5"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                    {p.tags.length > 4 && (
                                        <Badge className="bg-white/5 text-white/50 border-white/10 text-[11px] px-2 py-0.5">
                                            +{p.tags.length - 4}
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {p.githubUrl && (
                                        <a
                                            href={p.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] transition-all"
                                        >
                                            <Github size={14} />
                                            Code
                                        </a>
                                    )}
                                    {p.apiUrl && (
                                        <a
                                            href={p.apiUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-blue-500/15 border border-blue-500/30 rounded-lg hover:bg-blue-500/25 transition-all"
                                        >
                                            <Database size={14} />
                                            API Docs
                                        </a>
                                    )}
                                    {p.liveUrl && (
                                        <a
                                            href={p.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-[color:var(--accent)]/15 border border-[color:var(--accent)]/30 rounded-lg hover:bg-[color:var(--accent)]/25 transition-all"
                                        >
                                            <ExternalLink size={14} />
                                            Live
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
