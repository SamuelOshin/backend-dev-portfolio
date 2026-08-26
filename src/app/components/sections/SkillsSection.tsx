"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Database, Network } from "lucide-react";
import { SkillsMarquee } from "../ui/SkillsMarquee";

export function SkillsSection() {
  const skillCategories = useMemo(
    () => [
      {
        title: "AI & LLM Infrastructure",
        icon: <Brain className="text-blue-400" size={20} />,
        highlight: "Hybrid RAG pipelines, prefix cache-anchoring, and sub-second context injection.",
        skills: ["pgvector", "LangChain", "Gemini 2.0", "OpenAI / OpenRouter", "Pinecone", "ChromaDB", "A2A Protocol", "Semantic Search"],
      },
      {
        title: "High-Performance Backend",
        icon: <Cpu className="text-indigo-400" size={20} />,
        highlight: "Non-blocking asyncio concurrency, type-safe APIs, and dual-mode token security.",
        skills: ["Python 3.12+", "FastAPI", "SQLModel", "SQLAlchemy", "Django", "Asyncio", "SSE / WebSockets", "OAuth 2.0 & JWT"],
      },
      {
        title: "Databases & Caching",
        icon: <Database className="text-emerald-400" size={20} />,
        highlight: "Distributed locks, atomic ledgers, and zero-fund-loss transactional pipelines.",
        skills: ["PostgreSQL", "Redis", "MySQL", "MinIO S3", "Database Sharding", "FTS Indexing", "Transactions (ACID)"],
      },
      {
        title: "Distributed Systems & Cloud",
        icon: <Network className="text-sky-400" size={20} />,
        highlight: "Fault-tolerant worker pools, dead-letter queues, and container orchestration.",
        skills: ["Celery", "RabbitMQ", "Kafka", "Docker", "Circuit Breakers", "Idempotent Webhooks", "Git / CI/CD"],
      },
    ],
    []
  );

  const marqueeSkills = useMemo(
    () => [
      { name: "Python", icon: <img src="/icons/python.svg" alt="Python" className="w-5 h-5 object-contain" />, color: "#3776ab" },
      { name: "FastAPI", icon: <img src="/icons/fastapi.svg" alt="FastAPI" className="w-5 h-5 object-contain" />, color: "#009688" },
      { name: "PostgreSQL", icon: <img src="/icons/postgresql.svg" alt="PostgreSQL" className="w-5 h-5 object-contain" />, color: "#336791" },
      { name: "Redis", icon: <img src="/icons/redis.svg" alt="Redis" className="w-5 h-5 object-contain" />, color: "#dc382d" },
      { name: "Docker", icon: <img src="/icons/docker.svg" alt="Docker" className="w-5 h-5 object-contain" />, color: "#2496ed" },
      { name: "Celery", icon: <img src="/icons/celery.svg" alt="Celery" className="w-5 h-5 object-contain" />, color: "#37b24d" },
      { name: "RabbitMQ", icon: <img src="/icons/rabbitmq.svg" alt="RabbitMQ" className="w-5 h-5 object-contain" />, color: "#ff6600" },
      { name: "LangChain", icon: <img src="/icons/langchain.svg" alt="LangChain" className="w-5 h-5 object-contain" />, color: "#1c3c3c" },
      { name: "Kafka", icon: <img src="/icons/kafka.svg" alt="Kafka" className="w-5 h-5 object-contain" />, color: "#231f20" },
      { name: "Django", icon: <img src="/icons/django.svg" alt="Django" className="w-5 h-5 object-contain" />, color: "#092e20" },
      { name: "Git", icon: <img src="/icons/git.svg" alt="Git" className="w-5 h-5 object-contain" />, color: "#f05032" },
    ],
    []
  );

  return (
    <section id="skills" className="relative mt-28 sm:mt-36 scroll-mt-24 w-full">
      <div className="flex flex-col mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Technical Capabilities &amp; Architecture
        </h2>
        <p className="mt-2 text-sm sm:text-base text-white/60 max-w-2xl">
          Engineered across 4 key backend pillars: from vector embeddings and LLM pipelines to high-throughput message brokers.
        </p>
      </div>

      {/* Categorized 4-Pillar Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bezel-shell"
          >
            <div className="bezel-core h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{cat.title}</h3>
                </div>

                <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-4">
                  {cat.highlight}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs font-mono font-medium text-white/80 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ambient Tech Strip */}
      <div className="mt-8">
        <SkillsMarquee skills={marqueeSkills} />
      </div>
    </section>
  );
}
