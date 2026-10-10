"use client";

// Ruleset builder for blog posts: toggle branch rules, see which attacks get
// blocked, and copy the matching GitHub API payload.

import React, { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

type RuleId = "force" | "delete" | "pr" | "signed";

const RULES: { id: RuleId; name: string; plain: string; cost: string; api: Record<string, unknown> }[] = [
  {
    id: "force",
    name: "Block force pushes",
    plain: "Nobody can rewrite or erase the branch's history. New commits can only be added on top.",
    cost: "Almost none. You rarely need to force-push a shared branch.",
    api: { type: "non_fast_forward" },
  },
  {
    id: "delete",
    name: "Restrict deletions",
    plain: "The branch can't be deleted.",
    cost: "None for main. You'd only notice if you tried to delete it.",
    api: { type: "deletion" },
  },
  {
    id: "pr",
    name: "Require a pull request before merging",
    plain: "Changes can't be pushed straight to the branch. They have to go through a pull request first.",
    cost: "Every change needs a pull request, including yours. Great for teams, slower when you work alone.",
    api: {
      type: "pull_request",
      parameters: {
        required_approving_review_count: 0,
        dismiss_stale_reviews_on_push: false,
        require_code_owner_review: false,
        require_last_push_approval: false,
        required_review_thread_resolution: false,
      },
    },
  },
  {
    id: "signed",
    name: "Require signed commits",
    plain: "Every commit must carry a digital signature from a key only you hold. GitHub rejects unsigned ones.",
    cost: "You set up commit signing once (about 10 minutes). Until then, your own pushes are rejected too.",
    api: { type: "required_signatures" },
  },
];

const ATTACKS: { name: string; blockedBy: RuleId[]; note: string }[] = [
  { name: "Worm force-pushes a rewritten main", blockedBy: ["force", "pr"], note: "This is exactly what hit me." },
  { name: "Worm deletes the branch", blockedBy: ["delete"], note: "A cheap way to destroy work." },
  { name: "Worm pushes a new commit straight to main", blockedBy: ["pr", "signed"], note: "No rewrite needed, just a new commit on top." },
  { name: "A commit appears under your name that you didn't make", blockedBy: ["signed"], note: "Without your signing key, the attacker can't sign as you." },
];

export function RulesetBuilder() {
  const [on, setOn] = useState<Record<RuleId, boolean>>({ force: true, delete: true, pr: false, signed: false });
  const [scope, setScope] = useState<"default" | "all">("default");
  const [copied, setCopied] = useState(false);

  const blocked = ATTACKS.filter((a) => a.blockedBy.some((r) => on[r])).length;
  const payload = useMemo(
    () =>
      JSON.stringify(
        {
          name: "protect-branches",
          target: "branch",
          enforcement: "active",
          conditions: { ref_name: { include: [scope === "all" ? "~ALL" : "~DEFAULT_BRANCH"], exclude: [] } },
          rules: RULES.filter((r) => on[r.id]).map((r) => r.api),
        },
        null,
        2
      ),
    [on, scope]
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the JSON is still selectable.
    }
  };

  return (
    <div className="not-prose my-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--signal)]">Try it · build a ruleset</div>
      <p className="mt-3 text-[15px] leading-relaxed text-white/75">
        Switch rules on and off and watch which attacks they stop. The two already switched on are the ones I&apos;d give
        every repo.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-white/50">Protect:</span>
        {(
          [
            ["default", "main branch only"],
            ["all", "every branch"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={scope === id}
            onClick={() => setScope(id)}
            className={`rounded-full border px-3 py-1 transition-colors cursor-pointer ${
              scope === id ? "border-white bg-white text-zinc-950" : "border-white/15 text-white/70 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-2">
        {RULES.map((r) => (
          <label
            key={r.id}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors ${
              on[r.id] ? "border-[color:var(--signal)]/40 bg-[color:var(--signal)]/[0.05]" : "border-white/10 bg-black/20"
            }`}
          >
            <input
              type="checkbox"
              checked={on[r.id]}
              onChange={() => setOn((s) => ({ ...s, [r.id]: !s[r.id] }))}
              className="mt-1 h-4 w-4 accent-[color:var(--signal)]"
            />
            <span>
              <span className="block text-[15px] font-medium text-white">{r.name}</span>
              <span className="mt-0.5 block text-sm leading-relaxed text-white/65">{r.plain}</span>
              <span className="mt-1 block text-xs leading-relaxed text-white/45">Trade-off: {r.cost}</span>
            </span>
          </label>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold text-white">What gets through?</span>
          <span className="font-mono text-sm text-white/55">
            {blocked}/{ATTACKS.length} blocked
          </span>
        </div>
        <ul className="mt-2 space-y-1.5" aria-live="polite">
          {ATTACKS.map((a) => {
            const stop = a.blockedBy.some((r) => on[r]);
            return (
              <li
                key={a.name}
                className={`flex items-start justify-between gap-3 rounded-lg border px-3 py-2 text-sm ${
                  stop ? "border-[color:var(--signal)]/25 text-white/80" : "border-red-400/30 bg-red-400/[0.04] text-white/80"
                }`}
              >
                <span>
                  {a.name}
                  <span className="block text-xs text-white/45">{a.note}</span>
                </span>
                <span className={`shrink-0 font-mono text-xs ${stop ? "text-[color:var(--signal)]" : "text-red-300"}`}>
                  {stop ? "BLOCKED" : "GETS THROUGH"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <details className="mt-5 rounded-xl border border-white/10 bg-black/20">
        <summary className="cursor-pointer px-4 py-3 text-sm text-white/70 hover:text-white">
          For developers: create this ruleset with one command
        </summary>
        <div className="border-t border-white/[0.06] p-4 text-sm text-white/70">
          <p>
            Save this as <code className="text-[color:var(--signal)]">ruleset.json</code>, then run{" "}
            <code className="break-all text-[color:var(--signal)]">gh api --method POST repos/OWNER/REPO/rulesets --input ruleset.json</code>{" "}
            with your own OWNER/REPO.
          </p>
          <div className="relative mt-3">
            <pre className="max-h-64 overflow-auto rounded-lg border border-white/10 bg-[#0d1117] p-3 font-mono text-xs text-white/85">{payload}</pre>
            <button
              type="button"
              onClick={copy}
              className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-white/15 bg-zinc-900 px-2 py-1 text-xs text-white/70 hover:text-white cursor-pointer"
            >
              {copied ? <Check size={12} className="text-[color:var(--signal)]" /> : <Copy size={12} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </details>
    </div>
  );
}
