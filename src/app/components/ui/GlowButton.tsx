"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlowButtonProps {
  children: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  download?: boolean;
  target?: string;
  rel?: string;
}

export function GlowButton({
  children,
  href,
  icon,
  variant = "solid",
  download,
  target,
  rel,
}: GlowButtonProps) {
  const isSolid = variant === "solid";
  const isOutline = variant === "outline";

  return (
    <motion.a
      href={href}
      download={download ? "" : undefined}
      target={target}
      rel={rel}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group relative inline-flex items-center gap-3 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 ${
        isSolid
          ? "bg-[color:var(--accent)] text-zinc-950 shadow-[0_10px_25px_-5px_rgba(59,130,246,0.5)] hover:bg-white"
          : isOutline
          ? "bg-white/[0.04] text-white border border-white/15 hover:border-white/30 hover:bg-white/[0.08]"
          : "text-white/80 hover:text-white hover:bg-white/5"
      }`}
    >
      <span>{children}</span>
      {icon && (
        <span
          className={`flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full transition-transform duration-300 ${
            isSolid
              ? "bg-zinc-950/15 text-zinc-950 group-hover:bg-zinc-950/10 group-hover:translate-x-0.5"
              : "bg-white/10 text-white group-hover:bg-white/20 group-hover:translate-x-0.5"
          }`}
        >
          {icon}
        </span>
      )}
    </motion.a>
  );
}
