"use client";

import React from "react";
import { motion } from "framer-motion";

export function SkillsMarquee({ skills }: { skills: { name: string; icon: React.ReactNode; color: string }[] }) {
    // Duplicate the skills array to create a seamless loop
    const duplicated = [...skills, ...skills];

    return (
        <div className="mt-16 relative overflow-hidden py-8">
            {/* Left fade overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none bg-gradient-to-r from-[color:var(--background)] to-transparent" />
            {/* Right fade overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none bg-gradient-to-l from-[color:var(--background)] to-transparent" />

            {/* Scrolling track */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex gap-6 sm:gap-8"
                style={{
                    width: 'max-content',
                    animation: 'marquee-scroll 30s linear infinite',
                }}
            >
                {duplicated.map((skill, index) => (
                    <motion.div
                        key={`${skill.name}-${index}`}
                        whileHover={{ scale: 1.08, y: -4 }}
                        className="group flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl cursor-pointer transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]"
                        style={{
                            boxShadow: `0 0 0px transparent`,
                        }}
                    >
                        {/* Icon */}
                        <motion.div
                            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all duration-300 group-hover:border-white/20"
                            whileHover={{
                                boxShadow: `0 0 20px ${skill.color}40, 0 0 40px ${skill.color}20`,
                            }}
                        >
                            <span style={{ color: skill.color }} className="text-lg sm:text-xl">
                                {skill.icon}
                            </span>
                        </motion.div>

                        {/* Name */}
                        <span className="text-sm sm:text-base font-medium text-white/80 group-hover:text-white whitespace-nowrap transition-colors duration-300">
                            {skill.name}
                        </span>

                        {/* Subtle glow on hover */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: `radial-gradient(ellipse at center, ${skill.color}10 0%, transparent 70%)`,
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
