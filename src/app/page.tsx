"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Download, Mail, Github, Linkedin, Code, Database, Globe, Cpu, GitBranch, Package, Palette, Settings, ExternalLink, MessageCircle } from "lucide-react";


// Typewriter Component
const Typewriter = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};

export default function Home() {
  // Data
  const experiences = useMemo(
    () => [
    {
      role: "Backend Engineer Intern(Finalist)",
      company: "HNG12 Internship",
      period: "February 2025 - April 2025",
      summary:
      "Designed 15+ REST endpoints for AI-powered backend generator, achieving 90%+ test coverage and integrating Anthropic LLM via custom prompts and API orchestration.",
      details: [
      "Engineered and deployed 10+ REST APIs with Python, Django, and FastAPI for LLM-integrated plications, enabling seamless data flows",
      "Optimized CI/CD pipelines and agile processes in remote cross-functional teams, boosting deployment speed by 25%..",
      "Integrated Anthropic LLM using custom prompts and API orchestration to enhance backend generation capabilities.",
      "Implemented Google OAuth2 for secure user authentication, authorization and development environment awareness."],

      tech: ["Python", "PostgreSQL", "Langchain", "Antropic LLM", "FastAPI", "Git Actions", "Celery", "Docker"]
    },
    {
      role: "IT Support Officer",
      company: "Coleman Technical Industries Limited",
      period: "2024 — 2025",
      summary:
      "Automated daily ERP backup processes for Oracle and Odoo systems using Python scripts.",
      details: [
      "Implemented security monitoring solutions, significantly reducing endpoint security incidents",
      "Resolved 100+ user support tickets through systematic troubleshooting, improving system uptime by 25%",
      "Responsible for documenting Standard of Operation (SOP) for the Odoo application role rights ",
      "Implemented Automation of adding new staff to the Active Directory using Python scripts"],

      tech: ["Problem Solving", "Python", "ERP", "Odoo", ""]
    },
    {
      role: "Software Developer & IT Support (SIWES) ",
      company: "Arc Labs",
      period: "2023 — 2024",
      summary:
      "Implemented search relevance service with vector embeddings; +18% task success in UX studies.",
      details: [
      "Productionized feature flags and gradual rollout across 30+ services.",
      "Wrote internal SDKs improving DX and reducing boilerplate by ~35%."],

      tech: ["Python", "FastAPI", "Elasticsearch", "Docker"]
    }],

    []
  );

  const skills = useMemo(
    () => [
      { 
        name: "Python", 
        icon: <img src="/icons/python.svg" alt="Python" className="w-6 h-6 object-contain" />, 
        color: "#3776ab" 
      },
      { 
        name: "AWS", 
        icon: <img src="/icons/aws.svg" alt="AWS" className="w-6 h-6 object-contain" />, 
        color: "#ff9900" 
      },
      { 
        name: "Docker", 
        icon: <img src="/icons/docker.svg" alt="Docker" className="w-6 h-6 object-contain" />, 
        color: "#2496ed" 
      },
      { 
        name: "Git", 
        icon: <img src="/icons/git.svg" alt="Git" className="w-6 h-6 object-contain" />, 
        color: "#f05032" 
      },
      { 
        name: "HTML5", 
        icon: <img src="/icons/html5.svg" alt="HTML5" className="w-6 h-6 object-contain" />, 
        color: "#e34f26" 
      },
      { 
        name: "Django", 
        icon: <img src="/icons/django.svg" alt="Django" className="w-6 h-6 object-contain" />, 
        color: "#092e20" 
      },
      { 
        name: "Redis", 
        icon: <img src="/icons/redis.svg" alt="Redis" className="w-6 h-6 object-contain" />, 
        color: "#dc382d" 
      },
      { 
        name: "Claude AI", 
        icon: <img src="/icons/claude.svg" alt="Claude AI" className="w-6 h-6 object-contain" />, 
        color: "#d97757" 
      },
      { 
        name: "Hugging Face", 
        icon: <img src="/icons/huggingface.svg" alt="Hugging Face" className="w-6 h-6 object-contain" />, 
        color: "#ff6b35" 
      },
      { 
        name: "LangChain", 
        icon: <img src="/icons/langchain.svg" alt="LangChain" className="w-6 h-6 object-contain" />, 
        color: "#1c3c3c" 
      },
      { 
        name: "Slack", 
        icon: <img src="/icons/slack.svg" alt="Slack" className="w-6 h-6 object-contain" />, 
        color: "#4a154b" 
      }
    ],
    []
  );

  const projects = useMemo(
    () => [
    {
      title: "Telemetry Mesh",
      image:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1640&auto=format&fit=crop",
      tags: ["OpenTelemetry", "Go", "gRPC"],
      githubUrl: "https://github.com/SamuelOshin/telemetry-mesh",
      liveUrl: "https://telemetry-mesh-demo.vercel.app"
    },
    {
      title: "Ledger Engine",
      image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1640&auto=format&fit=crop",
      tags: ["PostgreSQL", "Kafka", "CQRS"],
      githubUrl: "https://github.com/SamuelOshin/ledger-engine",
      liveUrl: "https://ledger-engine-demo.vercel.app"
    },
    {
      title: "Realtime Sync",
      image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1640&auto=format&fit=crop",
      tags: ["WebSocket", "Redis", "TypeScript"],
      githubUrl: "https://github.com/SamuelOshin/realtime-sync",
      liveUrl: "https://realtime-sync-demo.vercel.app"
    },
    {
      title: "Policy-as-Code",
      image:
      "https://images.unsplash.com/photo-1488229297570-58520851e868?q=80&w=1640&auto=format&fit=crop",
      tags: ["OPA", "Kubernetes", "GitOps"],
      githubUrl: "https://github.com/SamuelOshin/policy-as-code",
      liveUrl: "https://policy-as-code-demo.vercel.app"
    },
    {
      title: "Feature Flags",
      image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1640&auto=format&fit=crop",
      tags: ["Node.js", "DX", "SDK"],
      githubUrl: "https://github.com/SamuelOshin/feature-flags",
      liveUrl: "https://feature-flags-demo.vercel.app"
    },
    {
      title: "Search Relevance",
      image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1640&auto=format&fit=crop",
      tags: ["Embeddings", "Elasticsearch", "Python"],
      githubUrl: "https://github.com/SamuelOshin/search-relevance",
      liveUrl: "https://search-relevance-demo.vercel.app"
    }],

    []
  );

  return (
    <main className="relative mx-auto max-w-7xl px-6 sm:px-8">
      {/* Hero */}
      <section className="relative grid grid-cols-1 md:grid-cols-12 gap-10 pt-16 sm:pt-24">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="col-span-1 md:col-span-6 flex flex-col justify-center">

          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="/! bg-white/5 text-white/80 backdrop-blur-sm">
              Backend Engineer
            </Badge>
            <Badge className="/! bg-[color:var(--accent)]/20 text-[color:var(--accent)] border-[color:var(--accent)]/40">
              Performance • Reliability
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold leading-tight tracking-[-0.03em]">
            <Typewriter text="Architecting dependable systems with elegant APIs." speed={80} />
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/70">
            I design resilient services, shape data models, and ship
            observability-first platforms. Clean contracts. Predictable latency.
            Zero drama deploys.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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
          </div>

          <div className="mt-8 flex items-center gap-4 text-white/60">
            <a className="hover:text-[color:var(--accent)] transition-colors" href="mailto:samuelt.oshin@gmail.com" aria-label="Email">
              <Mail size={20} />
            </a>
            <a className="hover:text-[color:var(--accent)] transition-colors" href="https://github.com/SamuelOshin" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a className="hover:text-[color:var(--accent)] transition-colors" href="https://linkedin.com/in/samuel-oshin-2903611a5/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="col-span-1 md:col-span-6 relative">

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[color:var(--accent)]/20 via-transparent to-white/5">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/headshotbychatgpt-1758178525713.png"
              alt="Portrait"
              className="h-full w-full object-cover mix-blend-luminosity opacity-90 grayscale contrast-125" />

            {/* Duotone overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_10%,_color:var(--accent)/35,_transparent_45%),linear-gradient(to_top_right,_#000000_10%,_transparent_40%)]" />
            {/* Floating glow */}
            <motion.div
              aria-hidden
              className="absolute -inset-8 rounded-[36px]"
              style={{ background: "radial-gradient(600px 240px at 20% 90%, var(--accent)/20, transparent 60%)" }}
              animate={{ opacity: [0.4, 0.8, 0.4], y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity }} />

          </div>
        </motion.div>
      </section>

      {/* Experience Timeline */}
      <section className="relative mt-24 sm:mt-32">
        <SectionHeader kicker="About / Experience" title="Impact through systems thinking" />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <TimelineRail />
          </div>
          <div className="lg:col-span-7 space-y-6">
            {experiences.map((exp, idx) =>
            <ExpandableCard key={idx} {...exp} />
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative mt-32 sm:mt-40">
        <SectionHeader kicker="Core Technologies" title="Building with modern tools" />
        <SkillsWheel skills={skills} />
      </section>

      {/* Projects */}
      <section id="projects" className="relative mt-24 sm:mt-32">
        <SectionHeader kicker="Selected Work" title="Pragmatic builds with measurable outcomes" />
        <MasonryGrid projects={projects} />
      </section>

      {/* Get in Touch */}
      <section className="relative mt-24 sm:mt-32">
        <SectionHeader kicker="Let's Connect" title="Get in touch" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 max-w-2xl mx-auto text-center"
        >
          <p className="text-lg text-white/70 mb-8">
            I'm always interested in discussing new opportunities, interesting projects, or just having a chat about technology.
            Feel free to reach out through any of the channels below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Email */}
            <motion.a
              href="mailto:samuelt.oshin@gmail.com"
              className="group flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[color:var(--accent)]/40 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5 text-[color:var(--accent)] group-hover:text-[color:var(--accent)]/80" />
              <div className="text-left">
                <div className="text-sm font-medium text-white/90">Email</div>
                <div className="text-xs text-white/60">samuelt.oshin@gmail.com</div>
              </div>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://linkedin.com/in/samuel-oshin-2903611a5/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[color:var(--accent)]/40 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5 text-[color:var(--accent)] group-hover:text-[color:var(--accent)]/80" />
              <div className="text-left">
                <div className="text-sm font-medium text-white/90">LinkedIn</div>
                <div className="text-xs text-white/60">Let's connect professionally</div>
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.link/xuf3ul"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[color:var(--accent)]/40 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5 text-[color:var(--accent)] group-hover:text-[color:var(--accent)]/80" />
              <div className="text-left">
                <div className="text-sm font-medium text-white/90">WhatsApp</div>
                <div className="text-xs text-white/60">Quick chat & updates</div>
              </div>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 p-6 bg-gradient-to-r from-[color:var(--accent)]/10 to-transparent border border-[color:var(--accent)]/20 rounded-xl"
          >
            <p className="text-sm text-white/80">
              💡 <strong>Currently available for:</strong> Backend development contracts, consulting, and full-time opportunities
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative mt-28 mb-16 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
        <div className="text-sm text-white/60">© {new Date().getFullYear()} Backend Developer Portfolio</div>
        <div className="flex items-center gap-2">
          <Badge className="/! bg-[color:var(--accent)]/20 text-[color:var(--accent)] border-[color:var(--accent)]/40">Available for contracts</Badge>
        </div>
      </footer>
    </main>);

}

function SkillsWheel({ skills }: { skills: { name: string; icon: React.ReactNode; color: string }[] }) {
  return (
    <div className="mt-24 flex items-center justify-center py-20">
      <div className="relative max-w-4xl mx-auto">
        {/* Central hub */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[color:var(--accent)]/40 bg-gradient-to-br from-[color:var(--accent)]/20 to-[color:var(--accent)]/5 backdrop-blur-xl mx-auto"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--accent)]/10"
          >
            <Code size={28} className="text-[color:var(--accent)]" />
          </motion.div>
          
          {/* Central glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, var(--accent)/30 0%, transparent 70%)`
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Skills arranged in circle */}
        {skills.map((skill, index) => {
          const angle = (index * 360) / skills.length;
          const radius = 160; // Increased distance from center
          const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
          const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

          return (
            <motion.div
              key={skill.name}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.4 + (index * 0.1),
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.15,
                zIndex: 20
              }}
              className="absolute group cursor-pointer"
              style={{
                left: `calc(50% + ${x}px - 32px)`,
                top: `calc(50% + ${y}px - 32px)`,
              }}
              title={skill.name}
            >
              {/* Skill icon container */}
              <div className="relative">
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10"
                  whileHover={{
                    boxShadow: `0 0 20px ${skill.color}40, 0 0 40px ${skill.color}20`
                  }}
                >
                  <span style={{ color: skill.color }}>
                    {skill.icon}
                  </span>
                </motion.div>

                {/* Skill name tooltip */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ zIndex: 30 }}
                >
                  {skill.name}
                </div>

                {/* Connecting line to center */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.6 + (index * 0.05) 
                  }}
                  className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{
                    width: `${radius - 48}px`,
                    left: x > 0 ? '-160px' : '64px',
                    top: '50%',
                    transformOrigin: x > 0 ? 'right' : 'left',
                    transform: `rotate(${angle}deg) translateY(-50%)`,
                  }}
                />

                {/* Floating particles effect */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{
                    boxShadow: [
                      `0 0 0px ${skill.color}00`,
                      `0 0 20px ${skill.color}30`,
                      `0 0 0px ${skill.color}00`
                    ]
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Outer decorative ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-full w-full rounded-full border border-white/5">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="h-full w-full rounded-full border-t border-[color:var(--accent)]/20"
            />
          </div>
        </motion.div>

        {/* Background glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: `radial-gradient(circle, var(--accent)/10 0%, transparent 70%)`
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="h-full w-full rounded-full"
            style={{
              background: `radial-gradient(circle, var(--accent)/10 0%, transparent 70%)`
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function SectionHeader({ kicker, title }: {kicker: string;title: string;}) {
  return (
    <div className="max-w-3xl">
      <div className="text-[11px] uppercase tracking-[0.22em] text-white/50">{kicker}</div>
      <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.02em]">
        {title}
      </h2>
    </div>);

}

function GlowButton({
  children,
  href,
  icon,
  variant = "solid",
  download
}: {children: React.ReactNode;href: string;icon?: React.ReactNode;variant?: "solid" | "outline";download?: boolean;}) {
  return (
    <motion.a
      href={href}
      download={download ? "" : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className="group relative inline-flex">

      <span
        className="pointer-events-none absolute -inset-px rounded-full opacity-60 blur-md transition duration-300 group-hover:opacity-90"
        style={{ background: "linear-gradient(90deg, var(--accent) 0%, transparent 60%)" }} />

      <Button
        variant={variant === "outline" ? "outline" : "default"}
        className={
        variant === "outline" ?
        "bg-transparent border-[color:var(--accent)]/40 text-white hover:bg-[color:var(--accent)]/10" :
        "bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:bg-[color:var(--accent)]/90"
        }>

        <span className="mr-2 inline-flex items-center justify-center">{icon}</span>
        {children}
      </Button>
    </motion.a>);

}

function TimelineRail() {
  return (
    <div className="relative rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 backdrop-blur">
      <div className="overflow-x-auto">
        <div className="min-w-[640px] md:min-w-0">
          <div className="relative flex items-center gap-0">
            <div className="h-[2px] w-full bg-white/10" />
            {/* decorative overlay gradient */}
            <div className="pointer-events-none absolute inset-x-0 h-[2px] bg-[linear-gradient(90deg,transparent,theme(colors.accent)/60%,transparent)] opacity-60" />
          </div>
          <div className="mt-4 grid grid-cols-4 items-start">
            {[
            { label: "2018", sub: "Arc Labs" },
            { label: "2020", sub: "Nova" },
            { label: "2022", sub: "Vertis" },
            { label: "Now", sub: "Impact" }].
            map((n, i) =>
            <div key={i} className="flex flex-col items-start">
                <div className="relative -mt-3 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-[color:var(--accent)] shadow-[0_0_0_6px_rgba(0,0,0,0.4)]" />
                </div>
                <div className="mt-2 text-xs text-white/60">{n.label}</div>
                <div className="text-sm text-white/80">{n.sub}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 text-sm text-white/60">Evolving systems with clarity and empathy.</div>
    </div>);

}

function ExpandableCard({
  role,
  company,
  period,
  summary,
  details,
  tech







}: {role: string;company: string;period: string;summary: string;details: string[];tech: string[];}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}>

      <Card
        className="group relative overflow-hidden border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-[color:var(--accent)]/30 hover:bg-white/[0.06]"
        onClick={() => setOpen((v) => !v)}>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-white/60">{period}</div>
            <h3 className="mt-1 text-xl font-semibold tracking-[-0.02em]">{role}</h3>
            <div className="text-sm text-white/70">{company}</div>
          </div>
          <span className="mt-1 inline-flex h-8 items-center gap-2 rounded-full border border-white/10 px-3 text-xs text-white/70 transition group-hover:border-[color:var(--accent)]/40 group-hover:text-[color:var(--accent)]">
            Details
            <ArrowRight size={14} className={`transition ${open ? "rotate-90" : ""}`} />
          </span>
        </div>
        <p className="mt-4 text-white/75">{summary}</p>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          className="overflow-hidden">

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
            {details.map((d, i) =>
            <li key={i}>{d}</li>
            )}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {tech.map((t) =>
            <Badge
              key={t}
              className="/! bg-[color:var(--accent)]/15 text-[color:var(--accent)] border-[color:var(--accent)]/30">

                {t}
              </Badge>
            )}
          </div>
        </motion.div>
        {/* Accent hover bar */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }} />

      </Card>
    </motion.div>);

}

function MasonryGrid({
  projects


}: {projects: {title: string;image: string;tags: string[];githubUrl?: string;liveUrl?: string;}[];}) {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
      {projects.map((p, i) =>
      <motion.article
        key={p.title + i}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: i * 0.05 }}
        className="mb-0 flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden">

          <div className="relative w-full h-48 sm:h-56 lg:h-60">
            <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
            <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent !w-full !h-full" />

            <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-1 bg-[radial-gradient(60%_100%_at_50%_120%,_var(--accent),_transparent)] opacity-60" />
          </div>
          <div className="p-4 flex flex-col gap-3 flex-1">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-medium tracking-[-0.01em]">{p.title}</h3>
              <ArrowRight size={16} className="text-white/60" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((tag) =>
            <Badge
              key={tag}
              className="/! bg-white/5 text-white/75 border-white/10 hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)]">

                  {tag}
                </Badge>
            )}
            </div>
            <div className="mt-4 flex gap-3">
              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/80 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] transition-all duration-200"
                >
                  <Github size={16} />
                  Code
                </a>
              )}
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/80 bg-[color:var(--accent)]/20 border border-[color:var(--accent)]/40 rounded-lg hover:bg-[color:var(--accent)]/30 hover:border-[color:var(--accent)]/60 transition-all duration-200"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.article>
      )}
    </div>);

}