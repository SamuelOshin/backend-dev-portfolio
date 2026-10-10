// Tiny BM25 retriever over the portfolio data. Runs entirely in the browser:
// no embeddings, no API calls. It powers the "Ask my portfolio" console.

import { capabilities, clientBuilds, experiences, pipelines, profile, projects } from "@/data/portfolio";

export interface Chunk {
  id: string;
  source: string;
  text: string;
}

export interface Hit {
  chunk: Chunk;
  score: number;
}

const STOPWORDS = new Set(
  "a an and are as at be by do does for from has have he his how i in is it its me my of on or so that the their them this to was what when where which who why with you your can did about tell samuel oshin s".split(
    " "
  )
);

// Light query expansion so natural phrasing hits the technical vocabulary.
const SYNONYMS: Record<string, string[]> = {
  rag: ["retrieval", "pgvector", "vector", "fts"],
  retrieval: ["rag", "search"],
  search: ["retrieval", "fts", "vector"],
  llm: ["gemini", "openai", "openrouter", "model"],
  ai: ["llm", "gemini", "rag", "agent"],
  agent: ["a2a", "mcp", "agentic"],
  agents: ["a2a", "mcp", "agentic", "agent"],
  cost: ["billing", "token", "cache", "storage"],
  cheaper: ["billing", "cost", "cache"],
  fast: ["latency", "speedup", "asyncio"],
  speed: ["latency", "speedup"],
  latency: ["fast", "speedup"],
  payments: ["paystack", "wallet", "ledger"],
  client: ["client", "build", "store", "design"],
  clients: ["client", "build", "design"],
  freelance: ["client", "build"],
  ecommerce: ["store", "storefront", "cart", "checkout", "nook"],
  shop: ["store", "storefront", "nook"],
  frontend: ["design", "next.js", "frontend"],
  design: ["frontend", "design"],
  website: ["client", "build", "next.js"],
  payment: ["paystack", "wallet", "ledger"],
  money: ["wallet", "ledger", "fund"],
  queue: ["celery", "rabbitmq", "redis", "arq"],
  scale: ["distributed", "throughput", "celery"],
  experience: ["engineer", "role"],
  work: ["engineer", "role", "built"],
  hire: ["available", "contact", "email"],
  contact: ["email", "reach"],
  cache: ["prefix", "caching"],
  caching: ["prefix", "cache"],
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/[\s\-/.]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function buildCorpus(): Chunk[] {
  const chunks: Chunk[] = [];

  chunks.push({
    id: "profile",
    source: "profile",
    text: `${profile.name} is an AI engineer based in ${profile.location}, and product engineer building production LLM systems (hybrid RAG, agents, distributed backends) and full products for clients, from design to deployment. Available for AI engineering roles. Reach him at ${profile.email}.`,
  });

  experiences.forEach((exp, i) => {
    chunks.push({ id: `exp-${i}`, source: `${exp.role} · ${exp.company}`, text: exp.summary });
    exp.details.forEach((d, j) => {
      chunks.push({ id: `exp-${i}-${j}`, source: `${exp.company}`, text: d });
    });
  });

  projects.forEach((p, i) => {
    chunks.push({
      id: `proj-${i}`,
      source: `project · ${p.title}`,
      text: `${p.title}: ${p.description} Architecture: ${p.architecture.replace(/->/g, "→")}. Stack: ${p.tags.join(", ")}.`,
    });
  });

  pipelines.forEach((pl) => {
    chunks.push({
      id: `pipe-${pl.id}`,
      source: `design note · ${pl.project}`,
      text: `${pl.decision.title}. ${pl.decision.body}`,
    });
  });

  clientBuilds.forEach((b, i) => {
    chunks.push({
      id: `client-${i}`,
      source: `client build · ${b.name}`,
      text: `${b.name} (${b.kind}), designed and built end to end for a client: ${b.summary} ${b.highlights.join(". ")}. Stack: ${b.stack.join(", ")}.`,
    });
  });

  capabilities.forEach((c) => {
    chunks.push({
      id: `cap-${c.id}`,
      source: `capabilities · ${c.title}`,
      text: `${c.title}: ${c.blurb} Tools: ${c.skills.join(", ")}.`,
    });
  });

  return chunks;
}

class BM25Index {
  private docs: { chunk: Chunk; tf: Map<string, number>; len: number }[];
  private df = new Map<string, number>();
  private avgLen: number;
  private k1 = 1.4;
  private b = 0.72;

  constructor(chunks: Chunk[]) {
    this.docs = chunks.map((chunk) => {
      const tokens = tokenize(`${chunk.source} ${chunk.text}`);
      const tf = new Map<string, number>();
      tokens.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1));
      tf.forEach((_, t) => this.df.set(t, (this.df.get(t) ?? 0) + 1));
      return { chunk, tf, len: tokens.length };
    });
    this.avgLen = this.docs.reduce((s, d) => s + d.len, 0) / this.docs.length;
  }

  get size() {
    return this.docs.length;
  }

  get chunks(): Chunk[] {
    return this.docs.map((d) => d.chunk);
  }

  search(query: string, k = 3): Hit[] {
    const base = tokenize(query);
    const terms = new Map<string, number>();
    base.forEach((t) => terms.set(t, 1));
    base.forEach((t) =>
      (SYNONYMS[t] ?? []).forEach((s) => {
        if (!terms.has(s)) terms.set(s, 0.45);
      })
    );

    const N = this.docs.length;
    const hits: Hit[] = [];
    for (const doc of this.docs) {
      let score = 0;
      terms.forEach((weight, term) => {
        const f = doc.tf.get(term);
        if (!f) return;
        const n = this.df.get(term) ?? 0;
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        score += weight * idf * ((f * (this.k1 + 1)) / (f + this.k1 * (1 - this.b + (this.b * doc.len) / this.avgLen)));
      });
      if (score > 0) hits.push({ chunk: doc.chunk, score });
    }
    return hits.sort((a, b) => b.score - a.score).slice(0, k);
  }
}

let index: BM25Index | null = null;

export function getIndex() {
  if (!index) index = new BM25Index(buildCorpus());
  return index;
}

// Below this, a hit is treated as noise and the console declines to answer.
export const MIN_SCORE = 2.2;
