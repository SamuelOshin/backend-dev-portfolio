"use client";

import React, { useMemo } from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { SkillsMarquee } from "../ui/SkillsMarquee";

export function SkillsSection() {
    const skills = useMemo(
        () => [
            {
                name: "Python",
                icon: <img src="/icons/python.svg" alt="Python" className="w-6 h-6 object-contain" />,
                color: "#3776ab"
            },
            {
                name: "FastAPI",
                icon: <img src="/icons/fastapi.svg" alt="FastAPI" className="w-6 h-6 object-contain" />,
                color: "#009688"
            },
            {
                name: "PostgreSQL",
                icon: <img src="/icons/postgresql.svg" alt="PostgreSQL" className="w-6 h-6 object-contain" />,
                color: "#336791"
            },
            {
                name: "Redis",
                icon: <img src="/icons/redis.svg" alt="Redis" className="w-6 h-6 object-contain" />,
                color: "#dc382d"
            },
            {
                name: "Docker",
                icon: <img src="/icons/docker.svg" alt="Docker" className="w-6 h-6 object-contain" />,
                color: "#2496ed"
            },
            {
                name: "Django",
                icon: <img src="/icons/django.svg" alt="Django" className="w-6 h-6 z-10 hidden dark:block object-contain" />,
                color: "#092e20"
            },
            {
                name: "Celery",
                icon: <img src="/icons/celery.svg" alt="Celery" className="w-6 h-6 object-contain" />,
                color: "#37b24d"
            },
            {
                name: "LangChain",
                icon: <img src="/icons/langchain.svg" alt="LangChain" className="w-6 h-6 hidden dark:block object-contain" />,
                color: "#1c3c3c"
            },
            {
                name: "RabbitMQ",
                icon: <img src="/icons/rabbitmq.svg" alt="RabbitMQ" className="w-6 h-6 object-contain" />,
                color: "#ff6600"
            },
            {
                name: "Kafka",
                icon: <img src="/icons/kafka.svg" alt="Kafka" className="w-6 h-6 hidden dark:block object-contain" />,
                color: "#231f20"
            },
            {
                name: "Git",
                icon: <img src="/icons/git.svg" alt="Git" className="w-6 h-6 object-contain" />,
                color: "#f05032"
            }
        ],
        []
    );

    return (
        <section id="skills" className="relative mt-32 sm:mt-40">
            <SectionHeader kicker="Core Technologies" title="Building with modern tools" />
            <SkillsMarquee skills={skills} />
        </section>
    );
}
