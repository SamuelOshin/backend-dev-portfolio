"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";
import { getIndex, type Chunk } from "@/lib/retrieval";
import { ResultPanel, StartPanel, useBestScore } from "./shared";

// Pick the 3 most relevant snippets for a question, then compare with BM25.

const QUESTIONS = [
  "How did you get RAG under 1.5 seconds?",
  "How do you cut LLM token costs?",
  "How do you stop workers processing the same job twice?",
  "How do you make sure payments never lose money?",
  "How do you handle messy CSV uploads?",
  "What e-commerce work have you done for clients?",
  "Have you built AI agents?",
];
const ROUNDS = 3;
const ROUND_SECONDS = 25;
const PICKS = 3;

interface Round {
  question: string;
  options: Chunk[];
  answer: { id: string; score: number }[];
  latencyMs: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRound(question: string): Round {
  const index = getIndex();
  const t0 = performance.now();
  // The profile blurb matches almost everything, so it's left out of the game.
  const ranked = index.search(question, 12).filter((h) => h.chunk.id !== "profile");
  const latencyMs = performance.now() - t0;
  const top = ranked.slice(0, PICKS);
  // Distractors: chunks the retriever ranks low or not at all for this question.
  const near = new Set(ranked.map((h) => h.chunk.id));
  const distractors = shuffle(index.chunks.filter((c) => !near.has(c.id) && c.id !== "profile")).slice(0, 6 - top.length);
  return {
    question,
    options: shuffle([...top.map((h) => h.chunk), ...distractors]),
    answer: top.map((h) => ({ id: h.chunk.id, score: h.score })),
    latencyMs,
  };
}

function excerpt(text: string, max = 150) {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export function RetrieverGame() {
  const [phase, setPhase] = useState<"ready" | "picking" | "reveal" | "over">("ready");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [roundIdx, setRoundIdx] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [results, setResults] = useState<{ matched: number; points: number }[]>([]);
  const [isBest, setIsBest] = useState(false);
  const { best, submit } = useBestScore("retriever");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const round = rounds[roundIdx];
  const answerIds = useMemo(() => new Set(round?.answer.map((a) => a.id) ?? []), [round]);

  const stopTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  const lockIn = useCallback(
    (picks: string[], secondsLeft: number) => {
      stopTimer();
      const matched = picks.filter((id) => answerIds.has(id)).length;
      const points = matched * 100 + (matched > 0 ? Math.round(secondsLeft) * 4 : 0);
      setResults((r) => [...r, { matched, points }]);
      setPhase("reveal");
    },
    [answerIds]
  );

  const startRound = useCallback(() => {
    setPicked([]);
    setTimeLeft(ROUND_SECONDS);
    setPhase("picking");
    stopTimer();
    timer.current = setInterval(() => setTimeLeft((t) => Math.max(0, t - 0.1)), 100);
  }, []);

  // Time's up: lock in whatever is picked.
  useEffect(() => {
    if (phase === "picking" && timeLeft <= 0) lockIn(picked, 0);
  }, [phase, timeLeft, picked, lockIn]);

  useEffect(() => stopTimer, []);

  const start = () => {
    setRounds(shuffle(QUESTIONS).slice(0, ROUNDS).map(buildRound));
    setRoundIdx(0);
    setResults([]);
    setIsBest(false);
    startRound();
  };

  const next = () => {
    if (roundIdx + 1 >= ROUNDS) {
      const total = results.reduce((s, r) => s + r.points, 0);
      setIsBest(submit(total));
      setPhase("over");
      return;
    }
    setRoundIdx((i) => i + 1);
    startRound();
  };

  const toggle = (id: string) => {
    if (phase !== "picking") return;
    setPicked((p) => {
      if (p.includes(id)) return p.filter((x) => x !== id);
      if (p.length >= PICKS) return p;
      const nextPicks = [...p, id];
      return nextPicks;
    });
  };

  if (phase === "ready") {
    return (
      <StartPanel
        title="Beat the retriever"
        rules={[
          <>You get a question and 6 snippets from this site.</>,
          <>Pick the <b className="text-white">3 most relevant</b> before the {ROUND_SECONDS}s timer runs out.</>,
          <>Then the site&apos;s own BM25 search engine shows its top 3. Match it to score, and answer faster for bonus points.</>,
          <>{ROUNDS} rounds.</>,
        ]}
        best={best}
        bestLabel={(n) => `${n} points`}
        onStart={start}
      />
    );
  }

  if (phase === "over") {
    const total = results.reduce((s, r) => s + r.points, 0);
    const matched = results.reduce((s, r) => s + r.matched, 0);
    const avgMs = rounds.reduce((s, r) => s + r.latencyMs, 0) / rounds.length;
    return (
      <ResultPanel
        headline={`${total} points`}
        detail={`You matched the retriever on ${matched} of ${ROUNDS * PICKS} picks${best !== null ? ` · best ${best}` : ""}`}
        takeaway={`The retriever answered each round in about ${avgMs.toFixed(2)} ms. In production I pair keyword search like this with pgvector embeddings and run both in parallel, because each one catches what the other misses.`}
        isBest={isBest}
        shareText={`I scored ${total} against the retriever on Samuel Oshin's portfolio. Can you out-rank BM25?`}
        onRestart={start}
      />
    );
  }

  const reveal = phase === "reveal";
  const rankOf = (id: string) => round.answer.findIndex((a) => a.id === id);
  const result = results[roundIdx];

  return (
    <div className="flex h-full flex-col p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 font-mono text-xs text-white/50">
        <span>
          round {roundIdx + 1}/{ROUNDS}
        </span>
        {reveal ? (
          <span className={result.matched >= 2 ? "text-[color:var(--signal)]" : "text-white/70"}>
            matched {result.matched}/{PICKS} · +{result.points}
          </span>
        ) : (
          <span className="tabular-nums">
            {picked.length}/{PICKS} picked · {timeLeft.toFixed(1)}s
          </span>
        )}
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-[color:var(--signal)]" style={{ width: `${(reveal ? 0 : timeLeft / ROUND_SECONDS) * 100}%` }} />
      </div>

      <p className="mt-4 text-lg sm:text-xl font-medium tracking-tight text-white">“{round.question}”</p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {round.options.map((c) => {
          const isPicked = picked.includes(c.id);
          const rank = rankOf(c.id);
          const correct = rank !== -1;
          let style = "border-white/10 bg-white/[0.02] hover:border-white/25";
          if (!reveal && isPicked) style = "border-white/70 bg-white/[0.06]";
          if (reveal && correct) style = "border-[color:var(--signal)]/60 bg-[color:var(--signal)]/[0.07]";
          if (reveal && !correct && isPicked) style = "border-red-400/50 bg-red-400/[0.05]";
          if (reveal && !correct && !isPicked) style = "border-white/[0.06] bg-transparent opacity-50";
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggle(c.id)}
              aria-pressed={isPicked}
              disabled={reveal}
              className={`relative rounded-xl border p-3 text-left text-[13px] leading-relaxed text-white/75 transition-colors cursor-pointer disabled:cursor-default ${style}`}
            >
              <span className="flex items-start gap-2">
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                    isPicked ? "border-white bg-white text-zinc-950" : "border-white/30"
                  }`}
                >
                  {isPicked && <Check size={11} strokeWidth={3} />}
                </span>
                <span>{excerpt(c.text)}</span>
              </span>
              {reveal && correct && (
                <span className="mt-2 block font-mono text-[10px] text-[color:var(--signal)]">
                  BM25 rank #{rank + 1} · score {round.answer[rank].score.toFixed(1)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-4 flex items-center justify-end gap-4">
        {reveal && result.matched < PICKS && (
          <p className="mr-auto text-xs leading-relaxed text-white/45">
            Disagree with the retriever? Keyword search can miss meaning, which is why production systems add embeddings.
          </p>
        )}
        {reveal ? (
          <button
            type="button"
            onClick={next}
            className="rounded-full bg-white px-5 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-[color:var(--signal)] cursor-pointer"
          >
            {roundIdx + 1 >= ROUNDS ? "See results" : "Next round"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => lockIn(picked, timeLeft)}
            disabled={picked.length !== PICKS}
            className="rounded-full bg-[color:var(--signal)] px-5 py-2 text-sm font-medium text-[color:var(--accent-foreground)] transition-opacity disabled:opacity-30 cursor-pointer disabled:cursor-default"
          >
            Lock in
          </button>
        )}
      </div>
    </div>
  );
}
