"use client";

import React, { useMemo } from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { ExpandableCard } from "../ui/ExpandableCard";
import { TimelineRail } from "../ui/TimelineRail";

export function ExperienceSection() {
    const experiences = useMemo(
        () => [
            {
                role: "Backend Engineer",
                company: "Emerj LLC (Remote)",
                period: "Dec 2025 – Present",
                summary:
                    "Architecting Legal Watch Dog — an AI-powered regulatory monitoring platform processing 1,000+ global regulatory updates daily with a high-performance distributed pipeline.",
                details: [
                    "Defined complete system architecture by authoring the Technical Requirements Document (TRD) and designing the ERD for multi-tenant scalability.",
                    "Engineered a high-performance 4-stage distributed pipeline for real-time web scraping and semantic analysis using FastAPI, Celery, and Redis.",
                    "Implemented robust concurrency control through Redis distributed locks and SQLAlchemy transactional integrity (FOR UPDATE SKIP LOCKED).",
                    "Reduced manual document review time by ~40% with AI-driven semantic change detection leveraging LLMs (OpenRouter/OpenAI/Gemini).",
                    "Optimized storage and processing costs by 30% with custom SHA-256 content deduplication and MinIO high-availability storage.",
                    "Engineered secure authentication with JWT flows and multi-provider OAuth (Google, Microsoft, Apple) integrations."
                ],
                tech: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL", "OpenAI", "MinIO", "Docker"]
            },
            {
                role: "Backend Python Engineer Intern",
                company: "HNG Internship (Remote) — 2× Finalist",
                period: "Oct 2025 – Dec 2025 (HNG13) & Jan – Apr 2025 (HNG12)",
                summary:
                    "Awarded Mentor's Choice — Best Backend Intern (HNG13). Ranked Top 5% of 10,000+ developers (HNG12). Built production-grade payment, RAG, and notification systems.",
                details: [
                    "Achieved zero fund loss for the Wallet Service with atomic transactions, idempotent webhooks, and background recovery jobs using Redis.",
                    "Improved retrieval precision by ~25% for internal RAG pipeline with advanced document chunking, OpenRouter embeddings, and hybrid vector search in Pinecone.",
                    "Scaled notification throughput to 1,000+/min with 99.5% delivery rate using RabbitMQ, circuit breakers, and dead-letter queues.",
                    "Reduced data endpoint latency by 16× (156s → 9.6s) by refactoring to asyncio parallelism and bulk SQL updates (ON DUPLICATE KEY UPDATE).",
                    "Built 'PRRover', an AI tool using A2A protocol and Google Gemini 2.0 for automated security reviews with sub-second code analysis."
                ],
                tech: ["Python", "FastAPI", "Redis", "RabbitMQ", "Pinecone", "Google Gemini", "Celery", "Docker"]
            },
            {
                role: "IT Support Officer (NYSC)",
                company: "Coleman Technical Industries",
                period: "Aug 2024 – May 2025",
                summary:
                    "Improved system uptime by 25% by automating Oracle/Odoo ERP backups using custom Python scripts with scheduled cron jobs and error-handling.",
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
                period: "Nov 2023 – Apr 2024",
                summary:
                    "Reduced IT issue resolution time by 40% by developing a custom Django-based ticketing system with automated workflows and real-time notifications.",
                details: [
                    "Built a custom Django-based ticketing system with automated workflows, reducing IT issue resolution time by 40%.",
                    "Prevented 15+ potential network outages by building internal Python monitoring tools with proactive alerting and data logging."
                ],
                tech: ["Python", "Django", "PostgreSQL"]
            }
        ],
        []
    );

    return (
        <section id="about" className="relative mt-32 sm:mt-40 scroll-mt-24 w-full">
            <SectionHeader kicker="Experience" title="Where I've made an impact" />

            <div className="mt-16 sm:mt-24 grid gap-12 sm:gap-16 lg:grid-cols-12 lg:gap-8 max-w-7xl mx-auto w-full">
                {/* Timeline visualization - hidden on mobile, visible on lg screens */}
                <div className="hidden lg:block lg:col-span-3 xl:col-span-4 relative">
                    <div className="sticky top-32">
                        <TimelineRail />
                    </div>
                </div>

                {/* Experience Cards */}
                <div className="lg:col-span-9 xl:col-span-8 flex flex-col gap-6 sm:gap-8 w-full">
                    {experiences.map((exp, i) => (
                        <ExpandableCard key={i} {...exp} />
                    ))}
                </div>
            </div>
        </section>
    );
}
