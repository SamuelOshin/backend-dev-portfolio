"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";
import { Kbd, ResultPanel, StartPanel, useBestScore } from "./shared";

// Route incoming requests to workers before they time out.

type Kind = "std" | "llm" | "repeat";

interface Req {
  id: number;
  kind: Kind;
  age: number;
}

interface Job {
  id: number;
  kind: Kind;
  remaining: number;
  total: number;
}

interface World {
  t: number;
  queue: Req[];
  workers: Job[][];
  nextSpawn: number;
  served: number;
  dropped: number;
  cacheHits: number;
  nextId: number;
  toast: { text: string; tone: "good" | "bad"; until: number } | null;
  shake: number | null;
}

const DURATION = 45;
const TTL = 6;
const QUEUE_MAX = 8;
const WORKER_SLOTS = 2;
const WORK_TIME: Record<Kind, number> = { std: 1.6, llm: 3.8, repeat: 1.6 };
const KIND_LABEL: Record<Kind, string> = { std: "API", llm: "LLM", repeat: "Repeat" };
const KIND_STYLE: Record<Kind, string> = {
  std: "border-sky-400/40 bg-sky-400/10 text-sky-300",
  llm: "border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-300",
  repeat: "border-[color:var(--signal)]/50 bg-[color:var(--signal)]/10 text-[color:var(--signal)]",
};

function freshWorld(): World {
  return {
    t: 0,
    queue: [],
    workers: [[], [], []],
    nextSpawn: 0.4,
    served: 0,
    dropped: 0,
    cacheHits: 0,
    nextId: 1,
    toast: null,
    shake: null,
  };
}

function pickKind(): Kind {
  const r = Math.random();
  return r < 0.58 ? "std" : r < 0.8 ? "llm" : "repeat";
}

export function PipelineGame() {
  const [phase, setPhase] = useState<"ready" | "playing" | "over">("ready");
  const [, setFrame] = useState(0);
  const world = useRef<World>(freshWorld());
  // A fixed-rate timer instead of requestAnimationFrame: some embedded browsers
  // and battery savers throttle animation frames, which would stall the round.
  const loop = useRef<ReturnType<typeof setInterval> | null>(null);
  const last = useRef(0);
  const [isBest, setIsBest] = useState(false);
  const { best, submit } = useBestScore("pipeline");

  const toast = (text: string, tone: "good" | "bad") => {
    world.current.toast = { text, tone, until: world.current.t + 1.1 };
  };

  const end = useCallback(() => {
    if (loop.current) clearInterval(loop.current);
    loop.current = null;
    setIsBest(submit(world.current.served));
    setPhase("over");
  }, [submit]);

  const step = useCallback(
    () => {
      const now = performance.now();
      const w = world.current;
      const dt = Math.min(0.1, (now - last.current) / 1000);
      last.current = now;
      w.t += dt;

      // Spawn faster as the round goes on.
      w.nextSpawn -= dt;
      if (w.nextSpawn <= 0) {
        const progress = w.t / DURATION;
        w.nextSpawn = 1.15 - 0.7 * progress + Math.random() * 0.25;
        if (w.queue.length >= QUEUE_MAX) {
          w.dropped += 1;
          toast("Queue overflow: request dropped", "bad");
        } else {
          w.queue.push({ id: w.nextId++, kind: pickKind(), age: 0 });
        }
      }

      // Age the queue; expired requests time out.
      for (const r of w.queue) r.age += dt;
      const expired = w.queue.filter((r) => r.age >= TTL).length;
      if (expired) {
        w.queue = w.queue.filter((r) => r.age < TTL);
        w.dropped += expired;
        toast(expired > 1 ? `${expired} requests timed out` : "Request timed out", "bad");
      }

      // Workers make progress.
      for (const jobs of w.workers) {
        for (const j of jobs) j.remaining -= dt;
        const done = jobs.filter((j) => j.remaining <= 0).length;
        if (done) w.served += done;
      }
      w.workers = w.workers.map((jobs) => jobs.filter((j) => j.remaining > 0));
      if (w.toast && w.t > w.toast.until) w.toast = null;

      setFrame((f) => f + 1);
      if (w.t >= DURATION) {
        end();
      }
    },
    [end]
  );

  const start = () => {
    world.current = freshWorld();
    setIsBest(false);
    setPhase("playing");
    last.current = performance.now();
    if (loop.current) clearInterval(loop.current);
    loop.current = setInterval(step, 33);
  };

  useEffect(() => () => {
    if (loop.current) clearInterval(loop.current);
  }, []);

  const route = useCallback((i: number) => {
    const w = world.current;
    const head = w.queue[0];
    if (!head) return;
    if (w.workers[i].length >= WORKER_SLOTS) {
      w.shake = i;
      setTimeout(() => {
        if (world.current.shake === i) world.current.shake = null;
      }, 300);
      toast(`Worker ${i + 1} is full`, "bad");
      return;
    }
    w.queue.shift();
    const total = WORK_TIME[head.kind];
    w.workers[i].push({ id: head.id, kind: head.kind, remaining: total, total });
  }, []);

  const serveFromCache = useCallback(() => {
    const w = world.current;
    const head = w.queue[0];
    if (!head) return;
    if (head.kind !== "repeat") {
      toast("Cache miss: only repeat requests are cached", "bad");
      return;
    }
    w.queue.shift();
    w.served += 1;
    w.cacheHits += 1;
    toast("Cache hit: served instantly", "good");
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.key === "1" || e.key === "2" || e.key === "3") {
        e.preventDefault();
        route(Number(e.key) - 1);
      } else if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        serveFromCache();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, route, serveFromCache]);

  const w = world.current;

  if (phase === "ready") {
    return (
      <StartPanel
        title="Keep the pipeline alive"
        rules={[
          <>Requests arrive in a queue. Send the <b className="text-white">next</b> one to a worker before it times out (6s).</>,
          <>Each worker handles 2 jobs at once. <span className="text-fuchsia-300">LLM</span> calls take longer.</>,
          <><span className="text-[color:var(--signal)]">Repeat</span> requests can be served instantly from cache.</>,
          <>Tap a worker or press <Kbd>1</Kbd> <Kbd>2</Kbd> <Kbd>3</Kbd>. Cache with <Kbd>C</Kbd>. You have 45 seconds.</>,
        ]}
        best={best}
        bestLabel={(n) => `${n} requests served`}
        onStart={start}
      />
    );
  }

  if (phase === "over") {
    return (
      <ResultPanel
        headline={`${w.served} requests served`}
        detail={`${w.dropped} dropped · ${w.cacheHits} cache hits${best !== null ? ` · best ${best}` : ""}`}
        takeaway="Routing by hand gets hard fast. In production the infrastructure does it: worker queues, Redis locks, dead-letter queues and caching. One notification service I built handles 1,000+ messages a minute at 99.5% delivery."
        isBest={isBest}
        shareText={`I served ${w.served} requests in Samuel Oshin's pipeline game. Beat that:`}
        onRestart={start}
      />
    );
  }

  const timeLeft = Math.max(0, DURATION - w.t);
  const head = w.queue[0];

  return (
    <div className="flex h-full flex-col p-4 sm:p-6 select-none">
      {/* HUD */}
      <div className="flex items-center justify-between gap-4 font-mono text-xs">
        <div className="flex gap-4">
          <span className="text-white/80">served <b className="text-[color:var(--signal)]">{w.served}</b></span>
          <span className="text-white/50">dropped <b className="text-red-400">{w.dropped}</b></span>
          <span className="hidden sm:inline text-white/50">cache <b className="text-white/80">{w.cacheHits}</b></span>
        </div>
        <span className="tabular-nums text-white/60">{timeLeft.toFixed(1)}s</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-[color:var(--signal)]" style={{ width: `${(timeLeft / DURATION) * 100}%` }} />
      </div>

      {/* Queue */}
      <div className="mt-5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">Queue {w.queue.length}/{QUEUE_MAX}</span>
        <span className={`font-mono text-[11px] transition-opacity ${w.toast ? "opacity-100" : "opacity-0"} ${w.toast?.tone === "good" ? "text-[color:var(--signal)]" : "text-red-400"}`} aria-live="polite">
          {w.toast?.text ?? "."}
        </span>
      </div>
      <div className="mt-2 flex min-h-[64px] gap-1.5 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-2">
        {w.queue.length === 0 && <span className="m-auto font-mono text-[11px] text-white/30">waiting for traffic…</span>}
        {w.queue.map((r, i) => (
          <div
            key={r.id}
            className={`relative flex w-[52px] sm:w-[64px] shrink-0 flex-col items-center justify-center rounded-lg border px-1 py-1.5 font-mono text-[10px] ${KIND_STYLE[r.kind]} ${i === 0 ? "ring-2 ring-white/70" : "opacity-80"}`}
          >
            {i === 0 && <span className="absolute -top-2 rounded bg-white px-1 text-[8px] font-bold text-zinc-950">NEXT</span>}
            <span>{KIND_LABEL[r.kind]}</span>
            <span className="mt-1 h-1 w-full overflow-hidden rounded-full bg-black/40">
              <span
                className={`block h-full ${r.age / TTL > 0.66 ? "bg-red-400" : "bg-current"}`}
                style={{ width: `${(1 - r.age / TTL) * 100}%` }}
              />
            </span>
          </div>
        ))}
      </div>

      {/* Workers + cache */}
      <div className="mt-4 grid flex-1 grid-cols-4 gap-2 sm:gap-3">
        {w.workers.map((jobs, i) => {
          const load = jobs.length / WORKER_SLOTS;
          return (
            <button
              key={i}
              type="button"
              onClick={() => route(i)}
              disabled={!head}
              aria-label={`Send next request to worker ${i + 1}`}
              className={`flex flex-col rounded-xl border p-2 sm:p-3 text-left transition-colors cursor-pointer disabled:cursor-default ${
                load >= 1 ? "border-red-400/50 bg-red-400/[0.06]" : load > 0 ? "border-amber-300/40 bg-amber-300/[0.04]" : "border-white/10 bg-white/[0.02] hover:border-white/30"
              } ${w.shake === i ? "animate-pulse" : ""}`}
            >
              <span className="flex items-center justify-between font-mono text-[10px] text-white/50">
                <span>W{i + 1}</span>
                <Kbd>{i + 1}</Kbd>
              </span>
              <span className="mt-2 flex flex-1 flex-col justify-center gap-1.5">
                {Array.from({ length: WORKER_SLOTS }).map((_, s) => {
                  const job = jobs[s];
                  return (
                    <span key={s} className="h-5 overflow-hidden rounded-md border border-white/[0.06] bg-black/30">
                      {job && (
                        <span
                          className={`block h-full ${job.kind === "llm" ? "bg-fuchsia-400/50" : job.kind === "repeat" ? "bg-[color:var(--signal)]/50" : "bg-sky-400/50"}`}
                          style={{ width: `${(1 - job.remaining / job.total) * 100}%` }}
                        />
                      )}
                    </span>
                  );
                })}
              </span>
              <span className={`mt-2 font-mono text-[10px] ${load >= 1 ? "text-red-400" : load > 0 ? "text-amber-300" : "text-white/35"}`}>
                {load >= 1 ? "full" : load > 0 ? "busy" : "idle"}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={serveFromCache}
          disabled={!head}
          aria-label="Serve next request from cache"
          className={`flex flex-col items-center justify-center gap-1 rounded-xl border p-2 font-mono text-[10px] transition-colors cursor-pointer disabled:cursor-default ${
            head?.kind === "repeat"
              ? "border-[color:var(--signal)]/60 bg-[color:var(--signal)]/10 text-[color:var(--signal)]"
              : "border-white/10 bg-white/[0.02] text-white/40"
          }`}
        >
          <Zap size={16} />
          <span>Cache</span>
          <Kbd>C</Kbd>
        </button>
      </div>
    </div>
  );
}
