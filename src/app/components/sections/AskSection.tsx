"use client";

import React from "react";
import { AskConsole } from "../ui/AskConsole";

const steps = [
  { n: "01", t: "Tokenise", d: "Your question is lowercased, split and stripped of stopwords, then expanded with a few synonyms." },
  { n: "02", t: "Rank", d: "BM25 scores every chunk of this site, in your browser, in under a millisecond." },
  { n: "03", t: "Ground", d: "Only chunks above a score threshold are used. No match, no made-up answer." },
];

export function AskSection() {
  return (
    <section id="ask" className="relative mt-32 sm:mt-44 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
        <div className="lg:col-span-5">
          <span className="eyebrow">Try it · Ask my portfolio</span>
          <h2 className="mt-4 text-3xl sm:text-[2.75rem] font-semibold tracking-[-0.03em] text-white">
            Skip the scrolling. <span className="font-display italic font-normal whitespace-nowrap">Just ask.</span>
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            A real retriever, not a mock. It ranks chunks of this site and answers only from what it finds, with
            citations. Type <span className="font-mono text-white/80">play</span> to open the arcade.
          </p>

          <ol className="mt-8 space-y-4">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-mono text-[11px] text-[color:var(--signal)] pt-1">{s.n}</span>
                <div>
                  <div className="text-sm font-medium text-white">{s.t}</div>
                  <div className="mt-0.5 text-sm text-white/50 leading-relaxed">{s.d}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-7 relative">
          <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[color:var(--signal)]/[0.06] blur-3xl" />
          <AskConsole />
        </div>
      </div>
    </section>
  );
}
