"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { SkillsMarquee } from "../ui/SkillsMarquee";

const CATEGORIES = [
    { id: "all", label: "All" },
    { id: "backend", label: "Backend & Async" },
    { id: "ai", label: "AI & LLM" },
    { id: "data", label: "Databases & Caching" },
    { id: "infra", label: "Infrastructure" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

interface Skill {
    name: string;
    icon: string;
    color: string;
    category: CategoryId[];
}

const ALL_SKILLS: Skill[] = [
    { name: "Python", icon: "/icons/python.svg", color: "#3776ab", category: ["backend"] },
    { name: "FastAPI", icon: "/icons/fastapi.svg", color: "#009688", category: ["backend"] },
    { name: "Django", icon: "/icons/django.svg", color: "#092e20", category: ["backend"] },
    { name: "Celery", icon: "/icons/celery.svg", color: "#37b24d", category: ["backend"] },
    { name: "Asyncio", icon: "/icons/python.svg", color: "#3776ab", category: ["backend"] },
    { name: "SQLAlchemy", icon: "/icons/python.svg", color: "#d71f00", category: ["backend", "data"] },
    { name: "SQLModel", icon: "/icons/python.svg", color: "#009688", category: ["backend", "data"] },
    { name: "LangChain", icon: "/icons/langchain.svg", color: "#1c3c3c", category: ["ai"] },
    { name: "OpenAI API", icon: "/icons/python.svg", color: "#412991", category: ["ai"] },
    { name: "Gemini API", icon: "/icons/python.svg", color: "#4285f4", category: ["ai"] },
    { name: "Pinecone", icon: "/icons/python.svg", color: "#000000", category: ["ai", "data"] },
    { name: "pgvector", icon: "/icons/postgresql.svg", color: "#336791", category: ["ai", "data"] },
    { name: "A2A Protocol", icon: "/icons/python.svg", color: "#4285f4", category: ["ai"] },
    { name: "PostgreSQL", icon: "/icons/postgresql.svg", color: "#336791", category: ["data"] },
    { name: "Redis", icon: "/icons/redis.svg", color: "#dc382d", category: ["data"] },
    { name: "Docker", icon: "/icons/docker.svg", color: "#2496ed", category: ["infra"] },
    { name: "RabbitMQ", icon: "/icons/rabbitmq.svg", color: "#ff6600", category: ["infra"] },
    { name: "Kafka", icon: "/icons/kafka.svg", color: "#231f20", category: ["infra"] },
    { name: "MinIO", icon: "/icons/python.svg", color: "#c72e49", category: ["infra"] },
    { name: "Git", icon: "/icons/git.svg", color: "#f05032", category: ["infra"] },
    { name: "OAuth 2.0", icon: "/icons/python.svg", color: "#eb5424", category: ["backend"] },
    { name: "Paystack", icon: "/icons/python.svg", color: "#00c3f7", category: ["backend"] },
];

export function SkillsSection() {
    const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

    const filteredSkills = useMemo(() => {
        if (activeCategory === "all") return ALL_SKILLS;
        return ALL_SKILLS.filter((s) => s.category.includes(activeCategory));
    }, [activeCategory]);

    // Marquee data uses a subset with actual icon files
    const marqueeSkills = useMemo(
        () =>
            ALL_SKILLS.filter((s) => !s.icon.endsWith("python.svg") || s.name === "Python").map((s) => ({
                name: s.name,
                icon: <img src={s.icon} alt={s.name} className="w-6 h-6 object-contain" />,
                color: s.color,
            })),
        []
    );

    return (
        <section id="skills" className="relative mt-32 sm:mt-40">
            <SectionHeader kicker="Core Technologies" title="Building with modern tools" />

            {/* Category filter pills */}
            <div className="mt-10 flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                            activeCategory === cat.id
                                ? "bg-[color:var(--accent)] text-[color:var(--accent-foreground)] border-[color:var(--accent)]"
                                : "bg-white/5 text-white/70 border-white/10 hover:border-white/25 hover:text-white"
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Skills grid */}
            <motion.div
                className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                layout
            >
                <AnimatePresence mode="popLayout">
                    {filteredSkills.map((skill) => (
                        <motion.div
                            key={skill.name}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.25 }}
                            className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/[0.08]"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className="w-5 h-5 object-contain"
                                />
                            </div>
                            <span className="text-sm font-medium text-white/80 group-hover:text-white truncate">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Ambient marquee strip */}
            <div className="mt-12 opacity-60">
                <SkillsMarquee skills={marqueeSkills} />
            </div>
        </section>
    );
}
