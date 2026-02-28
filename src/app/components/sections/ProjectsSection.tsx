"use client";

import React, { useMemo } from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { ProjectCarousel } from "../ui/ProjectCarousel";

export function ProjectsSection() {
    const projects = useMemo(
        () => [
            {
                title: "Proovia - AI Content Detector",
                image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
                tags: ["Python", "FastAPI", "Huggingface", "Resnet-18", "Image Detection"],
                liveUrl: "https://proovia.cloud/landing",
            },
            {
                title: "Code Review Agent (A2A)",
                image: "https://opengraph.githubassets.com/b2e1751f0a990da5dc9eba6cdb0fa53db6409ffd97448295a11ca4f9c071acb1/SamuelOshin/code_reviewer_agent_a2a",
                tags: ["Python", "A2A Protocol", "Google Gemini", "Webhooks", "Docker"],
                githubUrl: "https://github.com/SamuelOshin/code_reviewer_agent_a2a",
            },
            {
                title: "Wallet Service System",
                image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
                tags: ["Python", "FastAPI", "Redis", "JWT", "OAuth", "Paystack", "PostgreSQL"],
                githubUrl: "https://github.com/SamuelOshin/hng12-stage2-wallet",
            },
            {
                title: "RAG AI Service",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
                tags: ["Python", "FastAPI", "LangChain", "ChromaDB", "Docker"],
                githubUrl: "https://github.com/SamuelOshin/hng12-stage2-rag-ai-service",
            },
            {
                title: "SSL Certificate Checker Agent",
                image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200&auto=format&fit=crop",
                tags: ["Python", "A2A", "Google Gemini", "JSON-RPC", "Telex"],
                githubUrl: "https://github.com/SamuelOshin/ssl-checker-telex-integration",
                liveUrl: "https://ssl-checker.telex.im",
            },
            {
                title: "Country Currency & Exchange API",
                image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop",
                tags: ["Python", "FastAPI", "MySQL", "httpx", "Redis"],
                githubUrl: "https://github.com/SamuelOshin/hng12-stage1-country-api",
            },
            {
                title: "MockBox",
                image: "https://i.postimg.cc/hjHxDtdY/image.png",
                tags: ["FullStack", "Python", "FastAPI", "NextJS", "TypeScript", "Antropric LLM", "Supabase"],
                githubUrl: "https://github.com/Tobi09-17/mockbox",
                liveUrl: "https://mockbox.vercel.app/",
            },
            {
                title: "XlideLand - Slide Generator Tool",
                image: "https://i.postimg.cc/9fQHx8sh/image.png",
                tags: ["FullStack", "Python", "Django", "LLaMA 3 8b", "Marz UI", "React JS"],
                githubUrl: "https://github.com/SamuelOshin/slide_generator",
                liveUrl: "https://samueloshin.github.io/slide_generator/",
            },
            {
                title: "CodeBEGen",
                image: "https://images.unsplash.com/photo-1690683789978-3cf73960d650?q=80&w=1209&auto=format&fit=crop",
                tags: ["A2A", "Code Generation", "Gemini", "Python", "CLI"],
                githubUrl: "https://github.com/SamuelOshin/BE-GenAI",
                liveUrl: "https://pypi.org/project/codebegen/",
            },
            {
                title: "Church Admin App",
                image: "https://i.postimg.cc/Ss848Xw2/image.png",
                tags: ["FullStack", "C#", "Blazor", "SQL Server", "Radzen"],
                githubUrl: "https://github.com/SamuelOshin/ChurchAdminApp",
                liveUrl: "https://churchadmin.com/",
            },
            {
                title: "Network Downtime Alerts",
                image: "https://i.postimg.cc/Z5BwJX2H/image.png",
                tags: ["Python", "FastAPI", "React", "PostgreSQL"],
                githubUrl: "https://github.com/SamuelOshin/network-downtime-monitor"
            }
        ],
        []
    );

    return (
        <section id="projects" className="relative mt-32 sm:mt-40">
            <SectionHeader kicker="Featured Work" title="Projects & contributions" />
            <ProjectCarousel projects={projects} />
        </section>
    );
}
