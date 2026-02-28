"use client";

import React from "react";
import { motion } from "framer-motion";

export function TimelineRail() {
    return (
        <div className="relative rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-8 backdrop-blur">
            <div className="flex flex-col items-center space-y-12">
                {/* Timeline items */}
                {[
                    { label: "2023", sub: "First Dev Role" },
                    { label: "2024", sub: "NYSC + Open Source" },
                    { label: "2025", sub: "2× HNG Finalist" },
                    { label: "Now", sub: "Emerj LLC (AI)" }
                ].map((n, i) =>
                    <div key={i} className="flex flex-col items-center space-y-4 relative">
                        {/* Timeline point with connecting line */}
                        <div className="relative flex flex-col items-center">
                            {/* Connecting line from previous item (except for first item) */}
                            {i > 0 && (
                                <div className="absolute -top-8 left-1/2 w-[2px] h-8 -translate-x-1/2 bg-white/10" />
                            )}

                            {/* Timeline point */}
                            <div className="relative flex items-center justify-center">
                                <div className="h-4 w-4 rounded-full bg-[color:var(--accent)] shadow-[0_0_0_10px_rgba(0,0,0,0.4)]" />
                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-full bg-[color:var(--accent)]/30 blur-sm" />
                            </div>

                            {/* Connecting line to next item (except for last item) */}
                            {i < 3 && (
                                <div className="absolute top-6 left-1/2 w-[2px] h-8 -translate-x-1/2 bg-white/10" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="text-center space-y-1 min-w-[120px]">
                            <div className="text-sm font-medium text-white/90">{n.label}</div>
                            <div className="text-xs text-white/60">{n.sub}</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom description */}
            <div className="mt-12 text-center">
                <p className="text-sm text-white/60 leading-relaxed">
                    From first code to AI-powered backends — building with purpose.
                </p>
            </div>
        </div>
    );
}
