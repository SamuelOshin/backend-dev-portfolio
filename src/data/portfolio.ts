// Single source of truth for portfolio content. Sections, the in-browser
// retrieval demo and the pipeline explorer all read from here.

export const profile = {
  name: "Samuel Oshin",
  role: "AI Engineer",
  email: "samuelt.oshin@gmail.com",
  location: "Lagos, Nigeria · Remote",
  github: "https://github.com/SamuelOshin",
  linkedin: "https://linkedin.com/in/samuel-oshin-2903611a5/",
  whatsapp: "https://wa.me/2349075904952",
  // Source: resume/cv.html (see the regenerate command at the top of that file).
  resume: "/Samuel_Oshin_AI_Backend_Engineer.pdf",
};

export const headlineMetrics = [
  { value: "<1.5s", label: "Hybrid RAG latency", context: "pgvector + FTS in parallel" },
  { value: "80%", label: "LLM billing cut", context: "Gemini prefix-cache anchoring" },
  { value: "16×", label: "Endpoint speedup", context: "156s → 9.6s via asyncio" },
  { value: "Top 5%", label: "of 10,000+ engineers", context: "2× HNG finalist" },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export type ProjectCategory = "ai" | "distributed" | "tools";

export interface Project {
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  architecture: string;
  description: string;
  metric: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  pypiUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "CR8US Intelligence",
    category: "ai",
    categoryLabel: "Generative AI & RAG Platform",
    architecture: "FastAPI -> Celery Workers -> pgvector (FTS + Cosine) -> Gemini Prefix Caching",
    description:
      "Production-grade generative AI pre-production platform for Nollywood film intelligence featuring sub-1.5s hybrid RAG search, dynamic XML prompt caching, and SSE streaming.",
    metric: "< 1.5s Hybrid RAG Latency",
    tags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Gemini", "Celery", "Redis", "Paystack"],
    liveUrl: "https://app.cr8us.africa",
    featured: true,
  },
  {
    title: "Legal Watch Dog",
    category: "distributed",
    categoryLabel: "Distributed Regulatory Intelligence",
    architecture: "FastAPI -> Celery Pipeline -> Redis Locks (SKIP LOCKED) -> MinIO + PostgreSQL",
    description:
      "Distributed 4-stage regulatory monitoring platform tracking 1,000+ daily regulatory changes with automated semantic diff detection and SHA-256 deduplication.",
    metric: "1,000+ Daily Processed Updates",
    tags: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL", "OpenAI", "MinIO", "Docker"],
    liveUrl: "http://legalwatch.dog/",
    featured: true,
  },
  {
    title: "Code Review Agent (A2A)",
    category: "ai",
    categoryLabel: "Agentic Infrastructure",
    architecture: "A2A Protocol -> Google Gemini 2.0 -> GitHub MCP -> Async Webhook Bus",
    description:
      "Autonomous code review agent leveraging Agent-to-Agent protocol and GitHub MCP for real-time security vulnerability detection, AST code analysis, and automated PR review feedback.",
    metric: "< 800ms Review Cycles",
    tags: ["Python", "FastAPI", "A2A Protocol", "Google Gemini 2.0", "GitHub MCP", "Docker"],
    githubUrl: "https://github.com/SamuelOshin/code_reviewer_agent_a2a",
    featured: true,
  },
  {
    title: "Distributed Wallet Service System",
    category: "distributed",
    categoryLabel: "Financial Architecture",
    architecture: "FastAPI -> Atomic DB Transactions -> Redis Locks -> Paystack Webhook Engine",
    description:
      "Zero-fund-loss financial transaction system with atomic ledger balance mutations, idempotent Paystack webhook processing, automated failed transfer recovery, and API key auth.",
    metric: "Zero Fund Loss Ledger",
    tags: ["FastAPI", "PostgreSQL", "Redis", "Paystack", "JWT", "OAuth 2.0", "Docker"],
    githubUrl: "https://github.com/SamuelOshin/wallet-service-system",
    featured: true,
  },
  {
    title: "Hybrid RAG AI Service",
    category: "ai",
    categoryLabel: "Vector Search & Retrieval",
    architecture: "FastAPI -> LangChain Chunking -> ChromaDB Vector Store -> OpenRouter LLM",
    description:
      "Contextual semantic retrieval service with asynchronous document parsing (PDF/DOCX), intelligent chunking, OpenRouter embedding pipelines, and vector similarity search.",
    metric: "25% Higher Retrieval Precision",
    tags: ["Python", "FastAPI", "LangChain", "ChromaDB", "OpenRouter", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/SamuelOshin/rag-ai-service",
  },
  {
    title: "Project Nudge — AI Action Engine",
    category: "ai",
    categoryLabel: "Multimodal Action & Intent Engine",
    architecture: "FastAPI + SQLModel -> arq + Redis Worker -> OpenRouter LLMs -> Expo Client",
    description:
      "Intent extraction and context-aware action engine turning raw saved content into structured next actions with non-intrusive follow-up notification escalations.",
    metric: "Contextual Intent Scheduling",
    tags: ["Python", "FastAPI", "SQLModel", "arq", "Redis", "OpenRouter", "React Native"],
    githubUrl: "https://github.com/SamuelOshin/project_nudge",
  },
  {
    title: "Intelligent Profile Query System",
    category: "tools",
    categoryLabel: "Search & Query Engine",
    architecture: "FastAPI -> Deterministic Rule-Based NL Tokenizer -> Dynamic SQLAlchemy Query Builder",
    description:
      "High-speed natural language query parser transforming unstructured human language queries into compound relational SQL filters with zero LLM inference latency.",
    metric: "Zero-Latency Rule-Based NL",
    tags: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Query Parsing", "Docker"],
    githubUrl: "https://github.com/SamuelOshin/inteligent_query_system",
  },
  {
    title: "CodeBEGen AI Backend Generator",
    category: "tools",
    categoryLabel: "Developer Tooling",
    architecture: "FastAPI -> Multi-Model Orchestration (Qwen / LLaMA / Mistral) -> SSE Stream Bus",
    description:
      "AI-powered backend generation engine that synthesizes production-ready FastAPI services, schema migrations, and route handlers with real-time streaming progress.",
    metric: "Multi-Model Generation Pipeline",
    tags: ["Python", "FastAPI", "LLaMA 3", "Qwen", "Redis", "PostgreSQL", "WebSockets"],
    githubUrl: "https://github.com/SamuelOshin/codebegen_be",
    pypiUrl: "https://pypi.org/project/codebegen/",
  },
];

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export interface Experience {
  role: string;
  company: string;
  period: string;
  summary: string;
  metrics: string[];
  details: string[];
  tech: string[];
}

export const experiences: Experience[] = [
  {
    role: "Lead Backend Engineer (Contract)",
    company: "CR8US",
    period: "Feb 2026 — Present",
    summary:
      "Sole backend engineer architecting and scaling CR8US Intelligence: a generative AI pre-production platform for the Nollywood film industry.",
    metrics: ["< 1.5s Hybrid RAG Latency", "80% Token Billing Reduction", "Dual-Mode Token Rotation"],
    details: [
      "Engineered the entire AI-powered backend from scratch using FastAPI, SQLModel, and Celery, deploying a production-ready API serving both guest and authenticated tiers.",
      "Designed a real-time Hybrid RAG pipeline combining pgvector cosine similarity and PostgreSQL Full-Text Search (FTS) executed in parallel via asyncio, reducing query latency under 1.5 seconds.",
      "Optimized LLM token latency and API billing by 80% using Gemini Prefix Cache-Anchoring, strategically injecting dynamic XML-structured RAG contexts into static system prompts.",
      "Built a transient guest session model, replacing cookie-based sessions with in-memory state via SSE yields and implementing secure guest-to-user session migrations on login.",
      "Hardened authentication security by implementing Dual-Mode Token Rotation (supporting JSON payloads and secure HttpOnly cookies) and reducing OAuth access token lifetimes to a standard 30 minutes.",
      "Developed a secure credit and subscription system integrated with a Paystack transaction ledger to prevent unauthorized balance modifications.",
      "Created a highly resilient Celery dataset ingestion pipeline featuring three-stage CSV encoding detection (UTF-8-sig/CP1252), in-memory embedding reuse, and buffered bulk upserts with row-by-row transactional fallbacks.",
    ],
    tech: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL (pgvector)", "Gemini", "OAuth 2.0", "Paystack", "Docker"],
  },
  {
    role: "Backend Engineer",
    company: "Emerj LLC",
    period: "Dec 2025 — Present",
    summary:
      "Architecting Legal Watch Dog: an AI-powered regulatory monitoring platform processing 1,000+ global regulatory updates daily with a high-performance distributed pipeline.",
    metrics: ["1,000+ Daily Processed Updates", "40% Review Time Saved", "30% Storage Cost Reduction"],
    details: [
      "Defined complete system architecture by authoring the Technical Requirements Document (TRD) and designing the ERD for multi-tenant scalability.",
      "Engineered a high-performance 4-stage distributed pipeline for real-time web scraping and semantic analysis using FastAPI, Celery, and Redis.",
      "Implemented robust concurrency control through Redis distributed locks and SQLAlchemy transactional integrity (FOR UPDATE SKIP LOCKED).",
      "Reduced manual document review time by approximately 40% with AI-driven semantic change detection leveraging LLMs (OpenRouter/OpenAI/Gemini).",
      "Optimized storage and processing costs by 30% with custom SHA-256 content deduplication and MinIO high-availability storage.",
      "Engineered secure authentication with JWT flows and multi-provider OAuth (Google, Microsoft, Apple) integrations.",
    ],
    tech: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL", "OpenAI", "MinIO", "Docker"],
  },
  {
    role: "Backend Python Engineer Intern — 2× Finalist",
    company: "HNG Internship",
    period: "Jan — Apr 2025 · Oct — Dec 2025",
    summary:
      "Awarded Mentor's Choice: Best Backend Intern (HNG13). Ranked Top 5% of 10,000+ developers (HNG12). Built production-grade payment, RAG, and notification systems.",
    metrics: ["16x Endpoint Latency Reduction", "Zero-Fund-Loss Ledger", "99.5% Delivery at 1,000+/min"],
    details: [
      "Achieved zero fund loss for the Wallet Service with atomic transactions, idempotent webhooks, and background recovery jobs using Redis.",
      "Improved retrieval precision by ~25% for internal RAG pipeline with advanced document chunking, OpenRouter embeddings, and hybrid vector search in Pinecone.",
      "Scaled notification throughput to 1,000+/min with 99.5% delivery rate using RabbitMQ, circuit breakers, and dead-letter queues.",
      "Reduced data endpoint latency by 16x (156s down to 9.6s) by refactoring to asyncio parallelism and bulk SQL updates (ON DUPLICATE KEY UPDATE).",
      "Built 'PRRover', an AI tool using A2A protocol and Google Gemini 2.0 for automated security reviews with sub-second code analysis.",
    ],
    tech: ["Python", "FastAPI", "Redis", "RabbitMQ", "Pinecone", "Google Gemini", "Celery", "Docker"],
  },
  {
    role: "IT Support Officer (NYSC)",
    company: "Coleman Technical Industries",
    period: "Aug 2024 — May 2025",
    summary:
      "Improved system uptime by 25% by automating Oracle and Odoo ERP backups using custom Python scripts with scheduled cron jobs and error-handling.",
    metrics: ["25% System Uptime Boost", "100+ Resolved Tickets"],
    details: [
      "Reduced downtime incidents by 20% by resolving 100+ user support tickets through systematic troubleshooting and Group Policy implementations.",
      "Automated ERP backup processes for Oracle and Odoo systems using Python scripts with cron job scheduling.",
      "Documented Standard Operating Procedures (SOPs) for Odoo application role rights and access management.",
      "Implemented automation for adding new staff to Active Directory using Python scripts.",
    ],
    tech: ["Python", "Oracle", "Odoo", "Active Directory"],
  },
  {
    role: "Software Developer",
    company: "WML-Integrated Solutions @ PZ Cussons",
    period: "Nov 2023 — Apr 2024",
    summary:
      "Reduced IT issue resolution time by 40% by developing a custom Django-based ticketing system with automated workflows and real-time notifications.",
    metrics: ["40% Faster Issue Resolution", "15+ Network Outages Prevented"],
    details: [
      "Built a custom Django-based ticketing system with automated workflows, reducing IT issue resolution time by 40%.",
      "Prevented 15+ potential network outages by building internal Python monitoring tools with proactive alerting and data logging.",
    ],
    tech: ["Python", "Django", "PostgreSQL"],
  },
];

// ---------------------------------------------------------------------------
// Capabilities
// ---------------------------------------------------------------------------

export const capabilities = [
  {
    id: "llm",
    title: "LLM Systems & Retrieval",
    blurb: "Hybrid RAG, prompt-cache economics, grounded generation, streaming UX.",
    skills: ["pgvector", "Hybrid search (vector + FTS)", "LangChain", "Gemini", "OpenAI / OpenRouter", "Pinecone", "ChromaDB", "Prefix caching", "SSE streaming"],
  },
  {
    id: "agents",
    title: "Agents & Tooling",
    blurb: "Agents that call real tools, review real code, and fail safely.",
    skills: ["A2A Protocol", "MCP", "Tool calling", "Multi-model orchestration", "Qwen / LLaMA / Mistral", "AST analysis"],
  },
  {
    id: "backend",
    title: "Backend Foundations",
    blurb: "Async Python, typed APIs, and auth that holds up in production.",
    skills: ["Python 3.12+", "FastAPI", "asyncio", "SQLModel", "SQLAlchemy", "Django", "OAuth 2.0 / JWT", "WebSockets"],
  },
  {
    id: "infra",
    title: "Data & Distributed Infra",
    blurb: "Queues, locks, ledgers: the parts that keep AI features alive at scale.",
    skills: ["PostgreSQL", "Redis", "Celery", "arq", "RabbitMQ", "Kafka", "MinIO / S3", "Docker", "Idempotent webhooks"],
  },
];

// ---------------------------------------------------------------------------
// Pipelines: real architectures, decomposed into stages for the explorer.
// ---------------------------------------------------------------------------

export interface PipelineStage {
  id: string;
  label: string;
  tech: string;
  detail: string;
  // When set, the stage is rendered as parallel branches.
  branches?: { label: string; tech: string }[];
}

export interface Pipeline {
  id: string;
  name: string;
  project: string;
  headline: string;
  metric: { value: string; label: string };
  stages: PipelineStage[];
  decision: { title: string; body: string };
}

export const pipelines: Pipeline[] = [
  {
    id: "rag",
    name: "Hybrid RAG serving",
    project: "CR8US Intelligence",
    headline: "Query to streamed, grounded answer in under 1.5 seconds.",
    metric: { value: "<1.5s", label: "end-to-end retrieval latency" },
    stages: [
      {
        id: "ingress",
        label: "Session ingress",
        tech: "FastAPI · SSE",
        detail:
          "Guest and authenticated tiers share one path. Guest state lives in memory and is yielded over SSE, then migrated to the user on login, with no cookie session to leak.",
      },
      {
        id: "retrieve",
        label: "Parallel retrieval",
        tech: "asyncio.gather",
        detail:
          "Semantic and lexical search run concurrently instead of in sequence. Vector search catches paraphrase; full-text search catches exact names and titles that embeddings blur.",
        branches: [
          { label: "pgvector cosine", tech: "semantic" },
          { label: "Postgres FTS", tech: "lexical" },
        ],
      },
      {
        id: "context",
        label: "Context assembly",
        tech: "XML-structured context",
        detail:
          "Retrieved chunks are serialised as XML blocks and appended after a static system prompt, so the expensive prefix never changes between requests.",
      },
      {
        id: "generate",
        label: "Cached generation",
        tech: "Gemini · prefix cache",
        detail:
          "Because the prefix is stable, Gemini serves it from cache. Only the dynamic tail is billed at full rate, which cut token billing by 80%.",
      },
      {
        id: "stream",
        label: "Token stream",
        tech: "Server-Sent Events",
        detail: "Tokens stream to the client as they arrive, so time-to-first-token is what users feel, not total generation time.",
      },
    ],
    decision: {
      title: "Why hybrid over pure vector search",
      body: "Film data is full of proper nouns: actors, titles, studios. Embeddings blur them; FTS doesn't. Running both in parallel bought recall without paying for it in latency.",
    },
  },
  {
    id: "ingest",
    name: "Resilient dataset ingestion",
    project: "CR8US Intelligence",
    headline: "Messy real-world CSVs in, clean embeddings out, nothing silently dropped.",
    metric: { value: "3-stage", label: "encoding detection with row-level fallback" },
    stages: [
      {
        id: "upload",
        label: "Upload & enqueue",
        tech: "FastAPI → Celery",
        detail: "Uploads return immediately; ingestion runs on Celery workers so a 50k-row file never blocks an API worker.",
      },
      {
        id: "decode",
        label: "Encoding detection",
        tech: "UTF-8-sig → CP1252",
        detail: "Three-stage detection handles BOM-prefixed exports and legacy Windows encodings that break naive parsers.",
      },
      {
        id: "embed",
        label: "Embed with reuse",
        tech: "in-memory cache",
        detail: "Identical text is embedded once per batch. Duplicate rows reuse the vector instead of paying for another embedding call.",
      },
      {
        id: "upsert",
        label: "Buffered bulk upsert",
        tech: "PostgreSQL",
        detail: "Rows are flushed in buffered batches. If a batch fails, it retries row-by-row in its own transaction so one bad row can't sink the file.",
      },
    ],
    decision: {
      title: "Why row-by-row fallback",
      body: "Bulk inserts are fast until one malformed row aborts the whole transaction. Falling back per-row keeps the fast path fast and isolates the failure to the row that caused it.",
    },
  },
  {
    id: "watchdog",
    name: "Regulatory change detection",
    project: "Legal Watch Dog",
    headline: "1,000+ regulatory updates a day, deduplicated and semantically diffed.",
    metric: { value: "1,000+", label: "updates processed daily" },
    stages: [
      {
        id: "claim",
        label: "Job claim",
        tech: "Redis lock · SKIP LOCKED",
        detail: "Workers claim sources with FOR UPDATE SKIP LOCKED plus Redis distributed locks, so scaling workers horizontally never double-processes a source.",
      },
      {
        id: "scrape",
        label: "Scrape",
        tech: "Celery workers",
        detail: "Regulatory sources are fetched by a distributed Celery pipeline running continuously across the source catalogue.",
      },
      {
        id: "dedupe",
        label: "Content dedupe",
        tech: "SHA-256 · MinIO",
        detail: "Snapshots are content-hashed. Unchanged pages are never stored or analysed twice, which cut storage and processing cost by 30%.",
      },
      {
        id: "diff",
        label: "Semantic diff",
        tech: "LLM · OpenAI / Gemini",
        detail: "When content does change, an LLM classifies what actually changed and whether it matters, which cut manual review time by about 40%.",
      },
    ],
    decision: {
      title: "Why hash before you think",
      body: "LLM calls are the most expensive stage. Putting a cheap SHA-256 gate in front means the model only sees pages that actually changed.",
    },
  },
  {
    id: "ledger",
    name: "Zero-loss payment ledger",
    project: "Distributed Wallet Service",
    headline: "Every webhook processed exactly once. Every failed transfer recovered.",
    metric: { value: "0", label: "funds lost" },
    stages: [
      {
        id: "webhook",
        label: "Webhook intake",
        tech: "Paystack",
        detail: "Webhooks are verified and keyed by reference, so retries and duplicate deliveries from the provider are no-ops.",
      },
      {
        id: "lock",
        label: "Account lock",
        tech: "Redis",
        detail: "A distributed lock serialises concurrent mutations to the same wallet across API instances.",
      },
      {
        id: "commit",
        label: "Atomic mutation",
        tech: "PostgreSQL transaction",
        detail: "Balance change and ledger entry commit together or not at all. There is no window where money exists in one and not the other.",
      },
      {
        id: "recover",
        label: "Recovery worker",
        tech: "background jobs",
        detail: "Failed transfers are picked up and reconciled automatically instead of waiting for someone to notice.",
      },
    ],
    decision: {
      title: "Why idempotency first",
      body: "Payment providers deliver at-least-once. Designing for duplicates up front is cheaper than reconciling double credits after the fact.",
    },
  },
];

// ---------------------------------------------------------------------------
// Client builds: products shipped for clients, design through deployment.
// ---------------------------------------------------------------------------

export type BuildRole = "Design" | "Frontend" | "Backend" | "Deploy";

export interface ClientBuild {
  name: string;
  kind: string;
  summary: string;
  highlights: string[];
  stack: string[];
  roles: BuildRole[];
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  feature?: boolean;
}

export const clientBuilds: ClientBuild[] = [
  {
    name: "Nook",
    kind: "E-commerce · furniture & decor, Lagos",
    summary:
      "A full storefront and owner's back office: catalogue with four product types, cart, checkout, accounts, wishlist, reviews and an admin for orders and stock.",
    highlights: [
      "Order transactions guard against overselling races and duplicate submits; prices are recalculated server-side",
      "Admin with order history, restock-on-cancel and product editing for simple, variable and grouped items",
      "Playwright end-to-end suite with WCAG 2.1 AA checks, plus transactional email with a retry cron",
    ],
    stack: ["Next.js 16", "Supabase Postgres", "Drizzle", "Supabase Auth", "Tailwind v4", "Playwright"],
    roles: ["Design", "Frontend", "Backend", "Deploy"],
    year: "2026",
    liveUrl: "https://nook-shop.vercel.app/",
    image: "/clients/nook.png",
    feature: true,
  },
  {
    name: "TRIS",
    kind: "Enterprise · risk & internal-control auditing",
    summary:
      "Trust & Risk Intelligence System: flags risky payments with explainable, deterministic rules and walks reviewers from exception to evidence-backed closure.",
    highlights: [
      "Seven detection rules with every score contribution recorded, and an append-only audit trail enforced by Postgres triggers",
      "Five roles with separation of duties: investigators can't verify or close their own cases",
      "Point-in-time reconstruction, a policy sandbox over historical data, and a 127-test regression suite",
    ],
    stack: ["Next.js 16", "FastAPI", "SQLModel", "PostgreSQL 16", "Alembic", "Argon2id"],
    roles: ["Design", "Frontend", "Backend", "Deploy"],
    year: "2025–26",
    liveUrl: "https://tris-sigma.vercel.app/",
    githubUrl: "https://github.com/SamuelOshin/tris-dashboard",
    image: "/clients/tris.png",
    feature: true,
  },
  {
    name: "ConnectHub",
    kind: "Consumer · dating & matchmaking",
    summary: "Dating app with verified profiles, location-aware discovery, matching and real-time chat.",
    highlights: ["Geospatial matching on PostGIS", "Background jobs on arq + Redis"],
    stack: ["Next.js", "React Query", "FastAPI", "PostGIS", "Supabase", "arq"],
    roles: ["Design", "Frontend", "Backend", "Deploy"],
    year: "2026",
    liveUrl: "https://connecthub-tawny.vercel.app/",
    githubUrl: "https://github.com/SamuelOshin/connecthub",
    image: "/clients/connecthub.png",
  },
  {
    name: "Prison Gihon Global Services",
    kind: "Real estate · land sales, Nigeria",
    summary: "Listings site for verified land plots in Lagos, Abuja, Epe and Ibadan, with filtered search and inspection booking.",
    highlights: ["Admin publishing dashboard", "Built as a re-skinnable template for other agencies"],
    stack: ["Next.js 15", "TypeScript", "Tailwind", "Framer Motion"],
    roles: ["Design", "Frontend", "Backend", "Deploy"],
    year: "2026",
    liveUrl: "https://prison-gihon-global-service.vercel.app/",
    githubUrl: "https://github.com/SamuelOshin/real-estate-web",
    image: "/clients/gihon.png",
  },
  {
    name: "LingoMeet",
    kind: "Real-time AI · bilingual video calls",
    summary: "Browser video calls with live English ↔ French translation of each speaker, shown with a per-line latency badge.",
    highlights: ["Peer-to-peer WebRTC rooms", "Speech-to-text, then Gemini 2.5 Flash translation"],
    stack: ["WebRTC", "Web Speech API", "Node.js", "OpenRouter", "Docker"],
    roles: ["Design", "Frontend", "Backend"],
    year: "2026",
    githubUrl: "https://github.com/SamuelOshin/Syncra",
  },
];
