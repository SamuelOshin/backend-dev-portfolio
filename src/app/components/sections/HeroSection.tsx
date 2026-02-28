"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Github, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Typewriter } from "../ui/Typewriter";
import { GlowButton } from "../ui/GlowButton";

export function HeroSection() {
    const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);
    const badgeTitles = ["Python Backend Engineer", "AI/LLM Infrastructure", "Distributed Systems"];

    // Cycle through badge titles every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBadgeIndex((prev) => (prev + 1) % badgeTitles.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [badgeTitles.length]);

    return (
        <section id="home" className="relative grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 pt-8 sm:pt-9 lg:pt-10 min-h-[60vh] md:min-h-[50vh] lg:min-h-[55vh]">
            {/* Left copy */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="col-span-1 md:col-span-6 flex flex-col justify-center md:justify-start"
                style={{ contain: 'layout style' }}
            >

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-4 flex flex-wrap items-center gap-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <motion.div
                            key={currentBadgeIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="relative"
                        >
                            <Badge
                                variant="secondary"
                                className="/! bg-white/5 text-white/80 backdrop-blur-sm border border-white/20 shadow-lg"
                                style={{
                                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                {badgeTitles[currentBadgeIndex]}
                            </Badge>
                            {/* Animated glow border */}
                            <motion.div
                                className="absolute inset-0 rounded-full opacity-60"
                                style={{
                                    background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
                                    filter: 'blur(8px)',
                                }}
                                animate={{
                                    opacity: [0.3, 0.8, 0.3],
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Badge className="/! bg-[color:var(--accent)]/20 text-[color:var(--accent)] border-[color:var(--accent)]/40">
                            AI Backends • Scalability
                        </Badge>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="relative"
                    style={{
                        minHeight: '100px', // Reduced from 120px
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <h1 className="text-3xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight tracking-[-0.03em] w-full">
                        <Typewriter text="Building resilient AI backends and distributed systems." speed={80} />
                    </h1>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-3 lg:mt-4 max-w-2xl text-sm sm:text-base text-white/70">
                    Award-winning Python Backend Engineer (2× HNG Finalist, Top 1–5% of 10,000+).
                    Specializing in RAG pipelines, vector search, and event-driven architectures.
                    16× performance gains. Zero-fund-loss transaction systems. Production-grade AI backends.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="mt-3 flex flex-wrap items-center gap-4">
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
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="mt-6 flex items-center gap-4 text-white/60">
                    <motion.a
                        className="hover:text-[color:var(--accent)] transition-colors"
                        href="mailto:samuelt.oshin@gmail.com"
                        aria-label="Email"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 1.2 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <Mail size={20} />
                    </motion.a>
                    <motion.a
                        className="hover:text-[color:var(--accent)] transition-colors"
                        href="https://github.com/SamuelOshin"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 1.3 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <Github size={20} />
                    </motion.a>
                    <motion.a
                        className="hover:text-[color:var(--accent)] transition-colors"
                        href="https://linkedin.com/in/samuel-oshin-2903611a5/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 1.4 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <Linkedin size={20} />
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Right visual */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="col-span-1 md:col-span-6 relative flex items-center justify-center md:justify-end"
                style={{ contain: 'layout style' }}
            >

                <motion.div
                    className="relative aspect-[4/3] w-full max-w-sm md:max-w-md lg:max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[color:var(--accent)]/20 via-transparent to-white/5"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}

                >
                    <motion.img
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/headshotbychatgpt-1758178525713.png"
                        alt="Portrait"
                        className="h-full w-full object-cover object-[center_15%] mix-blend-luminosity opacity-90 grayscale contrast-125"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                    />

                    {/* Duotone overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_10%,_color:var(--accent)/35,_transparent_45%),linear-gradient(to_top_right,_#000000_10%,_transparent_40%)]" />
                    {/* Floating glow */}
                    <motion.div
                        aria-hidden
                        className="absolute -inset-8 rounded-[36px]"
                        style={{ background: "radial-gradient(600px 240px at 20% 90%, var(--accent)/20, transparent 60%)" }}
                        animate={{ opacity: [0.4, 0.8, 0.4], y: [0, -8, 0] }}
                        transition={{ duration: 6, repeat: Infinity }} />

                </motion.div>
            </motion.div>
        </section>
    );
}
