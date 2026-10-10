"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { clientBuilds, type BuildRole, type ClientBuild } from "@/data/portfolio";

const ALL_ROLES: BuildRole[] = ["Design", "Frontend", "Backend", "Deploy"];

function hostOf(url: string) {
  return new URL(url).host;
}

function RoleTrack({ roles }: { roles: BuildRole[] }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Owned: ${roles.join(", ")}`}>
      {ALL_ROLES.map((r, i) => {
        const on = roles.includes(r);
        return (
          <React.Fragment key={r}>
            <span className={`font-mono text-[10px] ${on ? "text-white/75" : "text-white/20"}`}>{r}</span>
            {i < ALL_ROLES.length - 1 && <span className={`h-px w-3 ${on ? "bg-[color:var(--signal)]/60" : "bg-white/10"}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Links({ b }: { b: ClientBuild }) {
  return (
    <div className="flex items-center gap-4 text-xs">
      {b.liveUrl && (
        <a href={b.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white/70 hover:text-[color:var(--signal)] transition-colors">
          Visit live <ArrowUpRight size={12} />
        </a>
      )}
      {b.githubUrl && (
        <a href={b.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white/50 hover:text-white transition-colors" aria-label={`${b.name} source on GitHub`}>
          <Github size={12} /> Source
        </a>
      )}
    </div>
  );
}

// Screenshot inside a minimal browser frame.
function Shot({ b, priority = false }: { b: ClientBuild; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[color:var(--ink)]">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-3 py-2">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-white/15" />
          ))}
        </span>
        <span className="flex-1 truncate rounded bg-white/[0.04] px-2 py-0.5 text-center font-mono text-[10px] text-white/40">
          {b.liveUrl ? hostOf(b.liveUrl) : "localhost"}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {b.image ? (
          <Image
            src={b.image}
            alt={`${b.name} homepage`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <TranslationMock />
        )}
      </div>
    </div>
  );
}

// Stand-in visual for builds without a public deployment.
function TranslationMock() {
  const lines = [
    { who: "Manager · EN", text: "Can we move the delivery to Friday?", out: "Pouvons-nous déplacer la livraison à vendredi ?", ms: 412 },
    { who: "Staff · FR", text: "Oui, c'est possible avant midi.", out: "Yes, that's possible before noon.", ms: 388 },
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3 bg-[radial-gradient(ellipse_at_top,oklch(0.9_0.19_125/0.08),transparent_60%)] p-5">
      {lines.map((l) => (
        <div key={l.who} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
            <span>{l.who}</span>
            <span className="text-[color:var(--signal)]">{l.ms} ms</span>
          </div>
          <div className="mt-1 text-[13px] text-white/80">{l.text}</div>
          <div className="mt-0.5 text-[12px] italic text-white/45">→ {l.out}</div>
        </div>
      ))}
    </div>
  );
}

export function ClientBuildsSection() {
  const featured = clientBuilds.filter((b) => b.feature);
  const others = clientBuilds.filter((b) => !b.feature);

  return (
    <section id="clients" className="relative mt-32 sm:mt-44 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="eyebrow">03 · Client builds</span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white">
            Design to deployment, <span className="font-display italic font-normal">one owner.</span>
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            Working prototypes and demos I&apos;ve built for clients, from the first screen design through frontend,
            backend and deployment, so a client can test an idea with something real before committing to a full
            build.
          </p>
        </div>
        <RoleTrack roles={ALL_ROLES} />
      </div>

      {/* Featured: screenshot + detail */}
      <div className="mt-12 space-y-4">
        {featured.map((b, i) => (
          <motion.article
            key={b.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 rounded-2xl border border-white/[0.08] bg-white/[0.015] p-4 sm:p-6 lg:p-8"
          >
            <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <Shot b={b} priority={i === 0} />
            </div>
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/40">
                <span>
                  {b.kind} · {b.year}
                </span>
                {b.status && (
                  <span className="rounded-full border border-amber-300/40 px-2 py-0.5 normal-case tracking-normal text-amber-300">{b.status}</span>
                )}
              </div>
              <h3 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">{b.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{b.summary}</p>
              <ul className="mt-5 space-y-2">
                {b.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-white/70">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[color:var(--signal)]" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-5 font-mono text-[11px] text-white/40">{b.stack.join(" · ")}</div>
              <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-4">
                <RoleTrack roles={b.roles} />
                <Links b={b} />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* The rest */}
      <div className={`mt-4 grid grid-cols-1 gap-4 ${others.length % 2 === 0 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {others.map((b, i) => (
          <motion.article
            key={b.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.015] p-4 sm:p-5"
          >
            <Shot b={b} />
            <div className="mt-5 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider text-white/40">
              <span>{b.kind}</span>
              {b.status && (
                <span className="rounded-full border border-amber-300/40 px-2 py-0.5 normal-case tracking-normal text-amber-300">{b.status}</span>
              )}
            </div>
            <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-white">{b.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{b.summary}</p>
            <div className="mt-3 font-mono text-[11px] text-white/40">{b.stack.join(" · ")}</div>
            <div className="mt-auto pt-5 flex flex-wrap items-center justify-between gap-3">
              <RoleTrack roles={b.roles} />
              <Links b={b} />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
