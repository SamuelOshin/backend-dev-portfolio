"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function GlowButton({
    children,
    href,
    icon,
    variant = "solid",
    download
}: { children: React.ReactNode; href: string; icon?: React.ReactNode; variant?: "solid" | "outline"; download?: boolean; }) {
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
                        "bg-transparent border-[color:var(--accent)]/40 text-white hover:bg-[color:var(--accent)]/10 hover:text-white" :
                        "bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:bg-[color:var(--accent)]/90"
                }>

                <span className="mr-2 inline-flex items-center justify-center">{icon}</span>
                {children}
            </Button>
        </motion.a>
    );
}
