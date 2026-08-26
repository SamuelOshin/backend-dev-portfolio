"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlowButton } from "../ui/GlowButton";
import { Mail, MessageCircle, CheckCircle, AlertCircle, Loader2, Linkedin, Github, ArrowRight, Sparkles } from "lucide-react";
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
      <section id="contact" className="relative mt-28 sm:mt-36 pt-16 border-t border-white/10 scroll-mt-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">
                <Sparkles size={12} />
                Get in Touch
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
                Let us build high-performance systems together
              </h2>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8">
                Looking for a backend engineer who designs infrastructure with precision, low latency, and zero fund loss? Open for contract and full-time opportunities.
              </p>

              {/* Direct Email Action */}
              <div className="mb-8">
                <GlowButton href="mailto:samuelt.oshin@gmail.com" icon={<Mail size={16} />}>
                  samuelt.oshin@gmail.com
                </GlowButton>
              </div>

              {/* Social Link Hub */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-white/50">Verified Profiles</div>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/SamuelOshin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition-all hover:border-blue-400/40 hover:bg-white/10 hover:text-white"
                    aria-label="GitHub Profile"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/in/samuel-oshin-2903611a5/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition-all hover:border-blue-400/40 hover:bg-white/10 hover:text-white"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="https://wa.me/2348148812613"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition-all hover:border-blue-400/40 hover:bg-white/10 hover:text-white"
                    aria-label="WhatsApp Contact"
                  >
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-white font-mono">20+</div>
                <div className="text-xs font-mono text-white/50 uppercase">Projects Shipped</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">&lt; 24h</div>
                <div className="text-xs font-mono text-white/50 uppercase">Response Time</div>
              </div>
            </div>
          </div>

          {/* Right Column: Double-Bezel Contact Form */}
          <div className="lg:col-span-7">
            <div className="bezel-shell">
              <div className="bezel-core p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formErrors.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex flex-col gap-1.5 text-xs text-red-400"
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
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-400 text-xs sm:text-sm font-medium"
                    >
                      <CheckCircle size={18} />
                      <span>Message received successfully. I will get back to you shortly.</span>
                    </motion.div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-white/60">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[color:var(--accent)] focus:bg-white/10 focus:outline-none transition-all disabled:opacity-50"
                        placeholder="Ada Lovelace"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-white/60">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[color:var(--accent)] focus:bg-white/10 focus:outline-none transition-all disabled:opacity-50"
                        placeholder="ada@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-mono uppercase tracking-wider text-white/60">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[color:var(--accent)] focus:bg-white/10 focus:outline-none transition-all disabled:opacity-50"
                      placeholder="Backend Architecture / Project Inquiry"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-white/60">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      rows={4}
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[color:var(--accent)] focus:bg-white/10 focus:outline-none transition-all disabled:opacity-50"
                      placeholder="Tell me about your system requirements, timeline, and goals..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[color:var(--accent)] px-6 py-3.5 text-xs sm:text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-[0_10px_25px_-5px_rgba(59,130,246,0.5)]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-28 border-t border-white/10 py-10 text-center text-xs text-white/50">
        <p>© {new Date().getFullYear()} Samuel Oshin. Python Backend &amp; AI Infrastructure Engineer.</p>
        <p className="mt-1 font-mono text-[11px] text-white/35">Built with Next.js, Framer Motion, and Tailwind CSS.</p>
      </footer>
    </>
  );
}
