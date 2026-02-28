"use client";

import React from "react";
import { motion } from "framer-motion";

export function SectionHeader({ kicker, title }: { kicker: string; title: string; }) {
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
        </motion.div>
    );
}
