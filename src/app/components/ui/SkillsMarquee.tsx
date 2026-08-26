"use client";

import React from "react";
import { motion } from "framer-motion";

export function SkillsMarquee({
  skills,
}: {
  skills: { name: string; icon: React.ReactNode; color: string }[];
}) {
  const duplicated = [...skills, ...skills, ...skills];

  return (
    <div className="relative overflow-hidden py-4">
      {/* Left and right fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

      {/* Scrolling track */}
      <div
        className="flex gap-4 sm:gap-6 will-change-transform"
        style={{
          width: "max-content",
          animation: "marquee-scroll 35s linear infinite",
        }}
      >
        {duplicated.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 border border-white/10">
              {skill.icon}
            </div>
            <span className="text-xs sm:text-sm font-mono font-medium text-white/75 whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
