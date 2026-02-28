"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function ExpandableCard({
    role,
    company,
    period,
    summary,
    details,
    tech
}: { role: string; company: string; period: string; summary: string; details: string[]; tech: string[]; }) {
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
        </motion.div>
    );
}
