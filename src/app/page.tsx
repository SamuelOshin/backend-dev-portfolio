"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Download, Mail, Github, Linkedin, Code, Database, ExternalLink, MessageCircle, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import EmailService, { ContactFormData } from "@/lib/email-service";

// Type definitions
interface Experience {
  role: string;
  company: string;
  period: string;
  summary: string;
  details: string[];
  tech: string[];
}


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

  // Contact form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Cycle through badge titles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBadgeIndex((prev) => (prev + 1) % badgeTitles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [badgeTitles.length]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (formErrors.length > 0) {
      setFormErrors([]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setFormErrors([]);

    try {
      // Check if EmailJS is configured
      if (!EmailService.isConfigured()) {
        setFormErrors(['Email service is not configured. Please contact the administrator.']);
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      // Sanitize form data
      const sanitizedData = EmailService.sanitizeFormData(formData);

      // Validate form data
      const validation = EmailService.validateFormData(sanitizedData);

      if (!validation.isValid) {
        setFormErrors(validation.errors);
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      // Send email using EmailJS
      const result = await EmailService.sendContactForm(sanitizedData);

      if (result.success) {
        setSubmitStatus('success');

        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setFormErrors([result.message]);
        setSubmitStatus('error');
      }

    } catch (error) {
      console.error('Form submission error:', error);
      setFormErrors(['An unexpected error occurred. Please try again or contact me directly at samuelt.oshin@gmail.com']);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
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
      "https://i.postimg.cc/hjHxDtdY/image.png",
      tags: ["FullStack", "Python", "FastAPI", "RESTAPI", "NextJS", "TypeScript", "Antropric LLM", "Supabase"],
      githubUrl: "https://github.com/SamuelOshin/MockBox",
      liveUrl: "https://mock-box.vercel.app",
      apiUrl: "https://mockbox-yspt.onrender.com/docs"
    },
    {
      title: "XlideLand",
      image:
      "https://i.postimg.cc/9fQHx8sh/image.png",
      tags: ["Fullstack", "PostgreSQL", "DjangoREST", "NeonDB", "OAuth", "ReactJS"],
      githubUrl: "https://github.com/SamuelOshin/XlideLand",
      liveUrl: "https://xlideland.vercel.app",
      apiUrl: "https://xlideland-realestate.onrender.com/api/docs/"
    },
    {
      title: "CodeBEGen",
      image:
      "https://images.unsplash.com/photo-1690683789978-3cf73960d650?q=80&w=1209&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["FastAPI", "Redis", "Celery"],
      githubUrl: "https://github.com/codebege_be",
      liveUrl: "https://codebegen-be.onrender.com/docs"
    },
    {
    title: "Church Administrative System Application",
    image:
    "https://i.postimg.cc/Ss848Xw2/image.png",
    tags: ["DjangoMVT", "PostgresSQL", "Fullstack", "Monolith"],
    githubUrl: "https://github.com/SamuelOshin/CCC-Admin-App",
    liveUrl: "#"
    },
    {
    title: "Network Downtime Alerts(Telex)",
    image:
    "https://i.postimg.cc/Z5BwJX2H/image.png",
    tags: ["OpenSource", "Python", "Django", "Telex Integration"],
    githubUrl: "https://github.com/telexintegrations/telex_network_alerts",
    liveUrl: "#"
    }],

    []
  );

  return (
    <motion.main
      className="relative mx-auto max-w-7xl px-6 sm:px-8 overflow-x-hidden"
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
            {experiences.map((exp: Experience, idx: number) =>
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
        <ProjectCarousel projects={projects} />
      </section>

      {/* Get in Touch */}
      <section id="contact" className="relative mt-24 sm:mt-32">
        <SectionHeader kicker="Let's Connect" title="Get in touch" />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info & Methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white/90">Ready to start a conversation?</h3>
              <p className="text-lg text-white/70 leading-relaxed">
                I'm always excited to discuss new opportunities, collaborate on innovative projects,
                or share insights about backend development and system architecture.
              </p>
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <div className="text-sm font-medium text-green-400">Available for new projects</div>
                <div className="text-xs text-white/60">Typically responds within 24 hours</div>
              </div>
            </motion.div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white/90">Connect with me</h4>

              {/* Email */}
              <motion.a
                href="mailto:samuelt.oshin@gmail.com"
                className="group relative overflow-hidden flex items-center gap-4 p-6 bg-gradient-to-r from-white/5 to-white/10 border border-white/10 rounded-2xl hover:border-[color:var(--accent)]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[color:var(--accent)]/10"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-[color:var(--accent)]/20 rounded-xl group-hover:bg-[color:var(--accent)]/30 transition-colors duration-300">
                  <Mail className="w-6 h-6 text-[color:var(--accent)]" />
                </div>
                <div className="relative z-10 flex-1">
                  <div className="text-base font-medium text-white/90 group-hover:text-white">Email</div>
                  <div className="text-sm text-white/60">samuelt.oshin@gmail.com</div>
                  <div className="text-xs text-[color:var(--accent)] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Send me a message →</div>
                </div>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://linkedin.com/in/samuel-oshin-2903611a5/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden flex items-center gap-4 p-6 bg-gradient-to-r from-blue-500/5 to-blue-500/10 border border-blue-500/20 rounded-2xl hover:border-blue-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors duration-300">
                  <Linkedin className="w-6 h-6 text-blue-400" />
                </div>
                <div className="relative z-10 flex-1">
                  <div className="text-base font-medium text-white/90 group-hover:text-white">LinkedIn</div>
                  <div className="text-sm text-white/60">Professional networking</div>
                  <div className="text-xs text-blue-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Let's connect →</div>
                </div>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href="https://wa.link/xuf3ul"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden flex items-center gap-4 p-6 bg-gradient-to-r from-green-500/5 to-green-500/10 border border-green-500/20 rounded-2xl hover:border-green-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors duration-300">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                </div>
                <div className="relative z-10 flex-1">
                  <div className="text-base font-medium text-white/90 group-hover:text-white">WhatsApp</div>
                  <div className="text-sm text-white/60">Quick conversations</div>
                  <div className="text-xs text-green-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Start chatting →</div>
                </div>
              </motion.a>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[color:var(--accent)]">15+</div>
                <div className="text-xs text-white/60">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[color:var(--accent)]">1+</div>
                <div className="text-xs text-white/60">Years Exp</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[color:var(--accent)]">24h</div>
                <div className="text-xs text-white/60">Response</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative p-8 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-3xl backdrop-blur-xl">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[color:var(--accent)]/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <h3 id="contact-form-title" className="text-2xl font-semibold text-white/90 mb-2">Send me a message</h3>
                <p className="text-white/60 mb-8">Fill out the form below and I'll get back to you soon.</p>

                <form className="space-y-6" role="form" aria-labelledby="contact-form-title" onSubmit={handleSubmit}>
                  {/* Error Messages */}
                  {formErrors.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-medium text-red-400">Please fix the following errors:</span>
                      </div>
                      <ul className="text-sm text-red-300 space-y-1">
                        {formErrors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">Message sent successfully!</span>
                      </div>
                      <p className="text-sm text-green-300 mt-1">Your message has been sent successfully! I'll get back to you within 24 hours.</p>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <label htmlFor="contact-name" className="block text-sm font-medium text-white/80 mb-2">Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[color:var(--accent)]/50 focus:ring-2 focus:ring-[color:var(--accent)]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Your name"
                        aria-describedby="name-help"
                      />
                      <span id="name-help" className="sr-only">Enter your full name</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <label htmlFor="contact-email" className="block text-sm font-medium text-white/80 mb-2">Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[color:var(--accent)]/50 focus:ring-2 focus:ring-[color:var(--accent)]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="your@email.com"
                        aria-describedby="email-help"
                      />
                      <span id="email-help" className="sr-only">Enter your email address for contact</span>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-white/80 mb-2">Subject</label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[color:var(--accent)]/50 focus:ring-2 focus:ring-[color:var(--accent)]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="What's this about?"
                      aria-describedby="subject-help"
                    />
                    <span id="subject-help" className="sr-only">Brief description of your message topic</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <label htmlFor="contact-message" className="block text-sm font-medium text-white/80 mb-2">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[color:var(--accent)]/50 focus:ring-2 focus:ring-[color:var(--accent)]/20 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Tell me about your project or idea..."
                      aria-describedby="message-help"
                    ></textarea>
                    <span id="message-help" className="sr-only">Detailed message about your inquiry or project</span>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent)]/80 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[color:var(--accent)]/25 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                    aria-describedby="submit-help"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                  <span id="submit-help" className="sr-only">Submit your contact form to send a message</span>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[color:var(--accent)]/10 to-transparent border border-[color:var(--accent)]/20 rounded-full text-[color:var(--accent)] text-sm font-medium">
            <div className="w-2 h-2 bg-[color:var(--accent)] rounded-full animate-pulse"></div>
            Open to exciting backend development opportunities
          </div>
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
    <div className="mt-24 flex items-center justify-center py-20 px-2 sm:px-4">
      <div className="relative max-w-4xl mx-auto w-full">
        {/* Central hub */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32 items-center justify-center rounded-full border-2 border-[color:var(--accent)]/40 bg-gradient-to-br from-[color:var(--accent)]/20 to-[color:var(--accent)]/5 backdrop-blur-xl mx-auto"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-[color:var(--accent)]/10"
          >
            <Code size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[color:var(--accent)]" />
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
        </motion.div>        {/* Skills arranged in circle */}
        {skills.map((skill, index) => {
          const angle = (index * 360) / skills.length;
          
          // Responsive radius values for better breathing space
          const getRadius = () => ({
            mobile: 140,   // Increased from 120*0.75 = 90
            tablet: 160,   // Increased from 120*0.9 = 108  
            desktop: 180   // Increased from 120*1.0 = 120
          });
          
          const radius = getRadius();
          const x = Math.cos((angle - 90) * (Math.PI / 180));
          const y = Math.sin((angle - 90) * (Math.PI / 180));

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
              className="absolute group cursor-pointer skill-responsive"
              style={{
                // Base mobile positioning
                '--x-multiplier': x.toString(),
                '--y-multiplier': y.toString(),
                left: `calc(50% + ${x * radius.mobile}px - 24px)`,
                top: `calc(50% + ${y * radius.mobile}px - 24px)`,
              } as React.CSSProperties & Record<string, string>}
              title={skill.name}
            >
              {/* Skill icon container */}
              <div className="relative">
                <motion.div
                  className="flex h-12 w-12 sm:h-16 sm:w-16 lg:h-18 lg:w-18 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10"
                  whileHover={{
                    boxShadow: `0 0 20px ${skill.color}40, 0 0 40px ${skill.color}20`
                  }}
                >
                  <span style={{ color: skill.color }} className="text-lg sm:text-xl lg:text-2xl">
                    {skill.icon}
                  </span>
                </motion.div>

                {/* Skill name tooltip */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm border border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ zIndex: 30 }}
                >
                  {skill.name}
                </div>

                {/* Subtle connecting line to center - positioned in middle of icon */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 0.4 }}
                  transition={{ duration: 0.3 }}
                  className="absolute h-px bg-gradient-to-r from-white/20 via-white/40 to-transparent"
                  style={{
                    width: `${radius.mobile * 0.5}px`, // Shorter line length
                    left: x > 0 ? `${-radius.mobile * 0.5 + 24}px` : '24px', // Position from center of icon
                    top: '50%',
                    transformOrigin: x > 0 ? 'right' : 'left',
                    transform: `rotate(${angle}deg) translateY(-50%)`,
                  }}
                />

                {/* Enhanced floating particles effect */}
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

        {/* Outer decorative ring - scaled inward for better proportion */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute left-1/2 top-1/2 h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Perfect circle using SVG */}
          <svg className="h-full w-full" viewBox="0 0 100 100">
            {/* Static circle */}
            <circle
              cx="50"
              cy="50"
              r="49"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.5"
            />
            {/* Animated rotating accent */}
            <motion.circle
              cx="50"
              cy="50"
              r="49"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.5"
              strokeOpacity="0.3"
              strokeDasharray="20 80"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50% 50%" }}
            />
          </svg>
        </motion.div>

        {/* Background glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute left-1/2 top-1/2 h-80 w-80 sm:h-96 sm:w-96 lg:h-[500px] lg:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
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

function ProjectCarousel({
  projects
}: {projects: {title: string;image: string;tags: string[];githubUrl?: string;liveUrl?: string;apiUrl?: string;}[];}) {
  return (
    <div className="mt-10 relative px-0 sm:px-0">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {projects.map((p, i) => (
            <CarouselItem key={p.title + i} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <motion.article
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="h-full flex flex-col rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden group cursor-pointer"
              >
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
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  />

                  <motion.div
                    className="pointer-events-none absolute inset-x-0 -bottom-1 h-1 bg-[radial-gradient(60%_100%_at_50%_120%,_var(--accent),_transparent)] opacity-60"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                  />
                </motion.div>

                <div className="flex-1 p-6 flex flex-col">
                  <motion.div
                    className="flex items-center justify-between gap-3 mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  >
                    <h3 className="text-lg font-medium tracking-[-0.01em] group-hover:text-[color:var(--accent)] transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={16} className="text-white/60 group-hover:text-[color:var(--accent)] transition-colors flex-shrink-0" />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.4 }}
                  >
                    {p.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.1 + 0.5 + tagIndex * 0.05 }}
                      >
                        <Badge className="bg-white/5 text-white/75 border-white/10 hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] text-xs">
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto"
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
                        className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 py-1 sm:px-3 sm:py-2 text-[10px] sm:text-sm font-medium text-white/80 bg-white/5 border border-white/10 rounded-md sm:rounded-lg hover:bg-white/10 hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] transition-all duration-200 whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={12} className="sm:w-4 sm:h-4" />
                        Code
                      </motion.a>
                    )}
                    {p.apiUrl && (
                      <motion.a
                        href={p.apiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 py-1 sm:px-3 sm:py-2 text-[10px] sm:text-sm font-medium text-white/80 bg-blue-500/20 border border-blue-500/40 rounded-md sm:rounded-lg hover:bg-blue-500/30 hover:border-blue-500/60 transition-all duration-200 whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Database size={12} className="sm:w-4 sm:h-4" />
                        API Docs
                      </motion.a>
                    )}
                    {p.liveUrl && (
                      <motion.a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 py-1 sm:px-3 sm:py-2 text-[10px] sm:text-sm font-medium text-white/80 bg-[color:var(--accent)]/20 border border-[color:var(--accent)]/40 rounded-md sm:rounded-lg hover:bg-[color:var(--accent)]/30 hover:border-[color:var(--accent)]/60 transition-all duration-200 whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={12} className="sm:w-4 sm:h-4" />
                        Live Demo
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </motion.article>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex left-2 bg-white/5 border-white/10 hover:bg-white/10 hover:border-[color:var(--accent)]/40 text-white" />
        <CarouselNext className="hidden sm:flex right-2 bg-white/5 border-white/10 hover:border-[color:var(--accent)]/40 text-white" />
      </Carousel>

      {/* Mobile Navigation Dots */}
      <div className="flex justify-center gap-2 mt-6 sm:hidden">
        {projects.map((_, index) => (
          <button
            key={index}
            className="w-2 h-2 rounded-full bg-white/30 hover:bg-[color:var(--accent)] transition-colors"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}