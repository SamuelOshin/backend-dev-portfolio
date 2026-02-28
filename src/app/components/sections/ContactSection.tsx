"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlowButton } from "../ui/GlowButton";
import { Mail, MessageCircle, CheckCircle, AlertCircle, Loader2, Linkedin, Github, ArrowRight } from "lucide-react";
import EmailService, { ContactFormData } from "@/lib/email-service";

export function ContactSection() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (formErrors.length > 0) {
            setFormErrors([]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setFormErrors([]);

        try {
            if (!EmailService.isConfigured()) {
                setFormErrors(['Email service is not configured. Please contact the administrator.']);
                setSubmitStatus('error');
                setIsSubmitting(false);
                return;
            }

            const sanitizedData = EmailService.sanitizeFormData(formData);
            const validation = EmailService.validateFormData(sanitizedData);

            if (!validation.isValid) {
                setFormErrors(validation.errors);
                setSubmitStatus('error');
                setIsSubmitting(false);
                return;
            }

            const result = await EmailService.sendContactForm(sanitizedData);

            if (result.success) {
                setSubmitStatus('success');
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

    return (
        <>
            <section id="contact" className="relative mt-32 sm:mt-40 pt-20 border-t border-white/5">
                <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[color:var(--accent)]/30 to-transparent" />

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="text-[11px] uppercase tracking-[0.22em] text-white/50 mb-2">
                                Get In Touch
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.02em] mb-6">
                                Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent)]/60">remarkable</span>
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
                                Looking for a backend engineer who treats infrastructure like a product? I'm currently open for new opportunities.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-16">
                                <GlowButton href="mailto:samuelt.oshin@gmail.com" icon={<Mail size={18} />}>
                                    samuelt.oshin@gmail.com
                                </GlowButton>
                            </div>

                            <div className="space-y-6">
                                <div className="text-sm font-medium text-white/40 uppercase tracking-widest">Connect</div>
                                <div className="flex gap-4">
                                    <a
                                        href="https://github.com/SamuelOshin"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)]/10 hover:text-[color:var(--accent)]"
                                    >
                                        <Github size={20} />
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/samuel-oshin-88574121a"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)]/10 hover:text-[color:var(--accent)]"
                                    >
                                        <Linkedin size={20} />
                                    </a>
                                    <a
                                        href="https://wa.me/2348148812613"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)]/10 hover:text-[color:var(--accent)]"
                                    >
                                        <MessageCircle size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Added Stats to Contact section */}
                        <motion.div
                            className="mt-16 grid grid-cols-2 gap-8 pt-10 border-t border-white/10"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">20+</div>
                                <div className="text-xs font-medium uppercase tracking-wider text-white/40">Projects</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">2+</div>
                                <div className="text-xs font-medium uppercase tracking-wider text-white/40">Years Exp</div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-white/5 to-transparent blur-xl" />
                        <form onSubmit={handleSubmit} className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl">
                            <div className="space-y-4">
                                {formErrors.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 flex flex-col gap-2"
                                    >
                                        {formErrors.map((error, index) => (
                                            <div key={index} className="flex items-start gap-2 text-red-400 text-sm">
                                                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                                <span>{error}</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-400"
                                    >
                                        <CheckCircle size={20} />
                                        <span className="font-medium">Message sent successfully! I'll be in touch soon.</span>
                                    </motion.div>
                                )}

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-white/50">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/20 focus:border-[color:var(--accent)] focus:bg-white/10 focus:outline-none transition-all disabled:opacity-50"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-white/50">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            disabled={isSubmitting}
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/20 focus:border-[color:var(--accent)] focus:bg-white/10 focus:outline-none transition-all disabled:opacity-50"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-xs font-medium uppercase tracking-wider text-white/50">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/20 focus:border-[color:var(--accent)] focus:bg-white/10 focus:outline-none transition-all disabled:opacity-50"
                                        placeholder="How can I help you?"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-white/50">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                        rows={4}
                                        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/20 focus:border-[color:var(--accent)] focus:bg-white/10 focus:outline-none transition-all disabled:opacity-50"
                                        placeholder="Tell me about your project..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group relative w-full flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[color:var(--accent)] px-8 py-4 font-semibold text-[color:var(--accent-foreground)] transition hover:bg-[color:var(--accent)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                                        <div className="relative h-full w-8 bg-white/20" />
                                    </div>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-32 border-t border-white/10 py-12 text-center text-sm text-white/40">
                <p>© {new Date().getFullYear()} Samuel Oshin. Built with Next.js, Framer Motion & Tailwind CSS.</p>
                <p>Inspired by the best. Designed for the web.</p>
            </footer>
        </>
    );
}
