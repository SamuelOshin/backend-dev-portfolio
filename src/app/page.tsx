"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Download, Mail, Github, Linkedin, Code, Database, Globe, Cpu, GitBranch, Package, Palette, Settings, ExternalLink, MessageCircle } from "lucide-react";


// Typewriter Component with Layout Stability
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

  return (
    <div className="relative">
      {/* Invisible placeholder to reserve space */}
      <span
        className="invisible absolute inset-0"
        aria-hidden="true"
        style={{
          visibility: 'hidden',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}
      >
        {text}
      </span>
      {/* Animated text */}
      <span
        className="relative"
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}
      >
        {displayText}
        {/* Cursor */}
        <span
          className="inline-block w-0.5 h-[1em] bg-[color:var(--accent)] ml-1 animate-pulse"
          style={{
            animation: currentIndex < text.length ? 'pulse 1s infinite' : 'none'
          }}
        />
      </span>
    </div>
  );
};

export default function Home() {
  // Badge cycling state
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);
  const badgeTitles = ["Backend Engineer", "Fullstack Developer", "Python Developer"];

  // Cycle through badge titles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBadgeIndex((prev) => (prev + 1) % badgeTitles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [badgeTitles.length]);
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
      title: "MockBox",
      image:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1640&auto=format&fit=crop",
      tags: ["Python", "FastAPI", "RESTAPI", "NextJS", "TypeScript", "Antropric LLM", "Supabase"],
      githubUrl: "https://github.com/SamuelOshin/MockBox",
      liveUrl: "https://mock-box.vercel.app"
    },
    {
      title: "XlideLand",
      image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1640&auto=format&fit=crop",
      tags: ["PostgreSQL", "DjangoREST", "NeonDB", "OAuth"],
      githubUrl: "https://github.com/SamuelOshin/XlideLand",
      liveUrl: "https://xlideland.vercel.app"
    },
    {
      title: "CodeBEGen",
      image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1640&auto=format&fit=crop",
      tags: ["FastAPI", "Redis", "Celery"],
      githubUrl: "https://github.com/codebege_be",
      liveUrl: "https://codebegen-be.onrender.com/docs"
    }],

    []
  );

  return (
    <motion.main
      className="relative mx-auto max-w-7xl px-6 sm:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
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
                Performance • Reliability
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
              <Typewriter text="Architecting dependable systems with elegant APIs." speed={80} />
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-3 lg:mt-4 max-w-2xl text-sm sm:text-base text-white/70">
            I design resilient services, shape data models, and ship
            observability-first platforms. Clean contracts. Predictable latency.
            Zero drama deploys.
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

      {/* Experience Timeline */}
      <section id="about" className="relative mt-24 sm:mt-32">
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
      <section id="skills" className="relative mt-32 sm:mt-40">
        <SectionHeader kicker="Core Technologies" title="Building with modern tools" />
        <SkillsWheel skills={skills} />
      </section>

      {/* Projects */}
      <section id="projects" className="relative mt-24 sm:mt-32">
        <SectionHeader kicker="Selected Work" title="Pragmatic builds with measurable outcomes" />
        <MasonryGrid projects={projects} />
      </section>

      {/* Get in Touch */}
      <section id="contact" className="relative mt-24 sm:mt-32">
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
              💡 <strong>Currently available for:</strong> Backend development contracts, and full-time opportunities
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative mt-28 mb-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
        <div className="text-sm text-white/60 text-center sm:text-left">© {new Date().getFullYear()} Samuel Oshin</div>
        <div className="flex items-center justify-center sm:justify-end">
          <Badge className="/! bg-[color:var(--accent)]/20 text-[color:var(--accent)] border-[color:var(--accent)]/40 text-center">Available for contracts</Badge>
        </div>
      </footer>
    </motion.main>);

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
    <motion.div
      className="max-w-3xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="text-[11px] uppercase tracking-[0.22em] text-white/50"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {kicker}
      </motion.div>
      <motion.h2
        className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.02em]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
      </motion.h2>
    </motion.div>);

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
        "bg-transparent border-[color:var(--accent)]/40 text-white hover:bg-[color:var(--accent)]/10 hover:text-white" :
        "bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:bg-[color:var(--accent)]/90"
        }>

        <span className="mr-2 inline-flex items-center justify-center">{icon}</span>
        {children}
      </Button>
    </motion.a>);

}

function TimelineRail() {
  return (
    <div className="relative rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-8 backdrop-blur">
      <div className="flex flex-col items-center space-y-12">
        {/* Timeline items */}
        {[
        // { label: "2022", sub: "Started Learning" },
        // { label: "2020", sub: "Nova" },
        // { label: "2022", sub: "Vertis" },
        { label: "Now", sub: "Impact" }].
        map((n, i) =>
        <div key={i} className="flex flex-col items-center space-y-4 relative">
            {/* Timeline point with connecting line */}
            <div className="relative flex flex-col items-center">
              {/* Connecting line from previous item (except for first item) */}
              {i > 0 && (
                <div className="absolute -top-8 left-1/2 w-[2px] h-8 -translate-x-1/2 bg-white/10" />
              )}

              {/* Timeline point */}
              <div className="relative flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-[color:var(--accent)] shadow-[0_0_0_10px_rgba(0,0,0,0.4)]" />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-[color:var(--accent)]/30 blur-sm" />
              </div>

              {/* Connecting line to next item (except for last item) */}
              {i < 3 && (
                <div className="absolute top-6 left-1/2 w-[2px] h-8 -translate-x-1/2 bg-white/10" />
              )}
            </div>

            {/* Content */}
            <div className="text-center space-y-1 min-w-[120px]">
              <div className="text-sm font-medium text-white/90">{n.label}</div>
              <div className="text-xs text-white/60">{n.sub}</div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom description */}
      <div className="mt-12 text-center">
        <p className="text-sm text-white/60 leading-relaxed">
          Evolving systems with clarity and empathy.
        </p>
      </div>
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
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="mb-0 flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden group cursor-pointer">

          <motion.div
            className="relative w-full h-48 sm:h-56 lg:h-60 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={p.image}
              alt={p.title}
              className="h-full w-full object-cover transition-transform duration-500"
              whileHover={{ scale: 1.1 }}
            />
            <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent !w-full !h-full" />

            <motion.div
              className="pointer-events-none absolute inset-x-0 -bottom-1 h-1 bg-[radial-gradient(60%_100%_at_50%_120%,_var(--accent),_transparent)] opacity-60"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
            />
          </motion.div>
          <motion.div
            className="p-4 flex flex-col gap-3 flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
          >
            <motion.div
              className="flex items-center justify-between gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
            >
              <h3 className="text-lg font-medium tracking-[-0.01em] group-hover:text-[color:var(--accent)] transition-colors">{p.title}</h3>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={16} className="text-white/60 group-hover:text-[color:var(--accent)] transition-colors" />
              </motion.div>
            </motion.div>
            <motion.div
              className="mt-3 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 + 0.4 }}
            >
              {p.tags.map((tag, tagIndex) =>
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 + 0.5 + tagIndex * 0.05 }}
            >
              <Badge
                className="/! bg-white/5 text-white/75 border-white/10 hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)]">
                {tag}
              </Badge>
            </motion.div>
            )}
            </motion.div>
            <motion.div
              className="mt-4 flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 + 0.6 }}
            >
              {p.githubUrl && (
                <motion.a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/80 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={16} />
                  Code
                </motion.a>
              )}
              {p.liveUrl && (
                <motion.a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/80 bg-[color:var(--accent)]/20 border border-[color:var(--accent)]/40 rounded-lg hover:bg-[color:var(--accent)]/30 hover:border-[color:var(--accent)]/60 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={16} />
                  Live Demo
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </motion.article>
      )}
    </div>);

}