"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, History } from "lucide-react";
import { ExpandableCard } from "../ui/ExpandableCard";
import { TimelineRail } from "../ui/TimelineRail";

const INITIAL_EXP_COUNT = 3;

export function ExperienceSection() {
  const [showAll, setShowAll] = useState(false);

  const experiences = useMemo(
    () => [
      {
        role: "Lead Backend Engineer (Contract)",
        company: "CR8US (Remote)",
        period: "Feb 2026 - Present",
        summary:
          "Serving as the sole backend engineer architecting and scaling CR8US Intelligence: a generative AI pre-production platform for the Nollywood film industry.",
        metrics: [
          "< 1.5s Hybrid RAG Latency",
          "80% Token Billing Reduction",
          "Dual-Mode Token Rotation",
        ],
        details: [
          "Engineered the entire AI-powered backend from scratch using FastAPI, SQLModel, and Celery, deploying a production-ready API serving both guest and authenticated tiers.",
          "Designed a real-time Hybrid RAG pipeline combining pgvector cosine similarity and PostgreSQL Full-Text Search (FTS) executed in parallel via asyncio, reducing query latency under 1.5 seconds.",
          "Optimized LLM token latency and API billing by 80% using Gemini Prefix Cache-Anchoring, strategically injecting dynamic XML-structured RAG contexts into static system prompts.",
          "Built a transient guest session model, replacing cookie-based sessions with in-memory state via SSE yields and implementing secure guest-to-user session migrations on login.",
          "Hardened authentication security by implementing Dual-Mode Token Rotation (supporting JSON payloads and secure HttpOnly cookies) and reducing OAuth access token lifetimes to a standard 30 minutes.",
          "Developed a secure credit and subscription system integrated with a Paystack transaction ledger to prevent unauthorized balance modifications.",
          "Created a highly resilient Celery dataset ingestion pipeline featuring three-stage CSV encoding detection (UTF-8-sig/CP1252), in-memory embedding reuse, and buffered bulk upserts with row-by-row transactional fallbacks."
        ],
        tech: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL (pgvector)", "Gemini", "OAuth 2.0", "Paystack", "Docker"]
      },
      {
        role: "Backend Engineer",
        company: "Emerj LLC (Remote)",
        period: "Dec 2025 - Present",
        summary:
          "Architecting Legal Watch Dog: an AI-powered regulatory monitoring platform processing 1,000+ global regulatory updates daily with a high-performance distributed pipeline.",
        metrics: [
          "1,000+ Daily Processed Updates",
          "40% Review Time Saved",
          "30% Storage Cost Reduction",
        ],
        details: [
          "Defined complete system architecture by authoring the Technical Requirements Document (TRD) and designing the ERD for multi-tenant scalability.",
          "Engineered a high-performance 4-stage distributed pipeline for real-time web scraping and semantic analysis using FastAPI, Celery, and Redis.",
          "Implemented robust concurrency control through Redis distributed locks and SQLAlchemy transactional integrity (FOR UPDATE SKIP LOCKED).",
          "Reduced manual document review time by approximately 40% with AI-driven semantic change detection leveraging LLMs (OpenRouter/OpenAI/Gemini).",
          "Optimized storage and processing costs by 30% with custom SHA-256 content deduplication and MinIO high-availability storage.",
          "Engineered secure authentication with JWT flows and multi-provider OAuth (Google, Microsoft, Apple) integrations."
        ],
        tech: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL", "OpenAI", "MinIO", "Docker"]
      },
      {
        role: "Backend Python Engineer Intern",
        company: "HNG Internship (Remote) - 2x Finalist",
        period: "Oct 2025 - Dec 2025 & Jan - Apr 2025",
        summary:
          "Awarded Mentor's Choice: Best Backend Intern (HNG13). Ranked Top 5% of 10,000+ developers (HNG12). Built production-grade payment, RAG, and notification systems.",
        metrics: [
          "16x Endpoint Latency Reduction",
          "Zero-Fund-Loss Ledger",
          "99.5% Delivery at 1,000+/min",
        ],
        details: [
          "Achieved zero fund loss for the Wallet Service with atomic transactions, idempotent webhooks, and background recovery jobs using Redis.",
          "Improved retrieval precision by ~25% for internal RAG pipeline with advanced document chunking, OpenRouter embeddings, and hybrid vector search in Pinecone.",
          "Scaled notification throughput to 1,000+/min with 99.5% delivery rate using RabbitMQ, circuit breakers, and dead-letter queues.",
          "Reduced data endpoint latency by 16x (156s down to 9.6s) by refactoring to asyncio parallelism and bulk SQL updates (ON DUPLICATE KEY UPDATE).",
          "Built 'PRRover', an AI tool using A2A protocol and Google Gemini 2.0 for automated security reviews with sub-second code analysis."
        ],
        tech: ["Python", "FastAPI", "Redis", "RabbitMQ", "Pinecone", "Google Gemini", "Celery", "Docker"]
      },
      {
        role: "IT Support Officer (NYSC)",
        company: "Coleman Technical Industries",
        period: "Aug 2024 - May 2025",
        summary:
          "Improved system uptime by 25% by automating Oracle and Odoo ERP backups using custom Python scripts with scheduled cron jobs and error-handling.",
        metrics: [
          "25% System Uptime Boost",
          "100+ Resolved Tickets",
        ],
        details: [
          "Reduced downtime incidents by 20% by resolving 100+ user support tickets through systematic troubleshooting and Group Policy implementations.",
          "Automated ERP backup processes for Oracle and Odoo systems using Python scripts with cron job scheduling.",
          "Documented Standard Operating Procedures (SOPs) for Odoo application role rights and access management.",
          "Implemented automation for adding new staff to Active Directory using Python scripts."
        ],
        tech: ["Python", "Oracle", "Odoo", "Active Directory"]
      },
      {
        role: "Software Developer",
        company: "WML-Integrated Solutions @ PZ Cussons",
        period: "Nov 2023 - Apr 2024",
        summary:
          "Reduced IT issue resolution time by 40% by developing a custom Django-based ticketing system with automated workflows and real-time notifications.",
        metrics: [
          "40% Faster Issue Resolution",
          "15+ Network Outages Prevented",
        ],
        details: [
          "Built a custom Django-based ticketing system with automated workflows, reducing IT issue resolution time by 40%.",
          "Prevented 15+ potential network outages by building internal Python monitoring tools with proactive alerting and data logging."
        ],
        tech: ["Python", "Django", "PostgreSQL"]
      }
    ],
    []
  );

  const displayedExperiences = showAll ? experiences : experiences.slice(0, INITIAL_EXP_COUNT);

  return (
    <section id="experience" className="relative mt-28 sm:mt-36 scroll-mt-24 w-full">
      <div className="flex flex-col mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Where I have engineered impact
        </h2>
        <p className="mt-2 text-sm sm:text-base text-white/60 max-w-2xl">
          Architecting resilient AI infrastructure, low-latency RAG systems, and distributed transaction pipelines.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-8 max-w-7xl mx-auto w-full">
        {/* Timeline visualization - Sticky on desktop */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-28">
            <TimelineRail />
          </div>
        </div>

        {/* Experience Cards */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          <AnimatePresence>
            {displayedExperiences.map((exp, i) => (
              <ExpandableCard key={exp.company + i} {...exp} />
            ))}
          </AnimatePresence>

          {/* Progressive Disclosure Toggle */}
          {experiences.length > INITIAL_EXP_COUNT && (
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <History size={14} className="text-blue-400" />
                <span>
                  {showAll
                    ? "Show Recent Experience"
                    : `View Earlier Engineering History (+${experiences.length - INITIAL_EXP_COUNT} roles)`}
                </span>
                {showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
