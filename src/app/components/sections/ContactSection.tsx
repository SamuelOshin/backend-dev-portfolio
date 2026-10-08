"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, CheckCircle, AlertCircle, Loader2, Linkedin, Github, ArrowRight, ArrowUpRight, Copy, Check } from "lucide-react";
import { profile } from "@/data/portfolio";
import EmailService, { ContactFormData } from "@/lib/email-service";

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors.length > 0) {
      setFormErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setFormErrors([]);

    try {
      if (!EmailService.isConfigured()) {
        setFormErrors(["Email service is temporarily unavailable. Please email directly at samuelt.oshin@gmail.com"]);
        setSubmitStatus("error");
        setIsSubmitting(false);
        return;
      }

      const sanitizedData = EmailService.sanitizeFormData(formData);
      const validation = EmailService.validateFormData(sanitizedData);

      if (!validation.isValid) {
        setFormErrors(validation.errors);
        setSubmitStatus("error");
        setIsSubmitting(false);
        return;
      }

      const result = await EmailService.sendContactForm(sanitizedData);

      if (result.success) {
        setSubmitStatus("success");
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
          setSubmitStatus("idle");
        }, 3000);
      } else {
        setFormErrors([result.message]);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormErrors(["An unexpected error occurred. Please reach out directly to samuelt.oshin@gmail.com"]);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="contact" className="relative mt-32 sm:mt-44 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
          <div className="lg:col-span-6">
            <span className="eyebrow">07 · Contact</span>
            <h2 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-[-0.035em] text-white leading-[1.02]">
              Have an AI system that needs to{" "}
              <span className="font-display italic font-normal text-[color:var(--signal)]">actually work?</span>
            </h2>
            <p className="mt-6 max-w-md text-white/60 leading-relaxed">
              I&apos;m open to full-time AI engineering roles, and I take on client products from design to launch. I usually reply within 24 hours.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-[color:var(--signal)]"
              >
                {profile.email}
                <ArrowUpRight size={15} />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2.5 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white cursor-pointer"
              >
                {copied ? <Check size={14} className="text-[color:var(--signal)]" /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="mt-8 flex gap-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white" aria-label="GitHub profile">
                <Github size={16} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white" aria-label="LinkedIn profile">
                <Linkedin size={16} />
              </a>
              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white" aria-label="WhatsApp">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/[0.08] bg-white/[0.015] p-6 sm:p-8 space-y-6">
              {formErrors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 flex flex-col gap-1.5 text-xs text-red-400"
                  role="alert"
                >
                  {formErrors.map((error, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-[color:var(--signal)]/30 bg-[color:var(--signal)]/10 p-4 flex items-center gap-3 text-sm text-[color:var(--signal)]"
                  role="status"
                >
                  <CheckCircle size={18} />
                  <span>Message received. I&apos;ll get back to you shortly.</span>
                </motion.div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-wider text-white/45">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} disabled={isSubmitting} placeholder="Ada Lovelace" required className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white placeholder:text-white/25 focus:border-[color:var(--signal)] focus:outline-none focus:ring-0 transition-colors disabled:opacity-50" />
                </div>
                <div>
                  <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-wider text-white/45">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} disabled={isSubmitting} placeholder="ada@company.com" required className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white placeholder:text-white/25 focus:border-[color:var(--signal)] focus:outline-none focus:ring-0 transition-colors disabled:opacity-50" />
                </div>
              </div>
                <div>
                  <label htmlFor="subject" className="font-mono text-[11px] uppercase tracking-wider text-white/45">Subject</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} disabled={isSubmitting} placeholder="AI engineering role / project" required className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white placeholder:text-white/25 focus:border-[color:var(--signal)] focus:outline-none focus:ring-0 transition-colors disabled:opacity-50" />
                </div>
                <div>
                  <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-wider text-white/45">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} disabled={isSubmitting} placeholder="What are you building, and where could I help?" required rows={4} className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white placeholder:text-white/25 focus:border-[color:var(--signal)] focus:outline-none focus:ring-0 transition-colors disabled:opacity-50 resize-none" />
                </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[color:var(--signal)] px-6 py-3 text-sm font-medium text-[color:var(--accent-foreground)] transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <span>Send message</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="mt-32 border-t border-white/[0.08] py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/40">
        <p>© {new Date().getFullYear()} {profile.name} · AI Engineer</p>
        <p className="font-mono text-[11px]">Built with Next.js · the retrieval demo runs client-side</p>
      </footer>
    </>
  );
}
