# Writing SEO-Optimized Blog Posts: A Guide for Humans & AI Agents

This repository uses an MDX-based static blog architecture. Every markdown file placed in `content/blog/*.mdx` is automatically pre-rendered into an SEO-optimized HTML page at build time. 

This guide serves as a strict standard for both **Human Authors** and **AI Agents** to ensure maximum search engine visibility and rich LLM parse-ability.

---

## 1. The Critical Frontmatter

Every `.mdx` file **must** begin with a YAML frontmatter block. This metadata directly powers the generated `<title>`, `<meta description>`, JSON-LD structured data schemas, Open Graph sharing cards, and the XML sitemap.

```yaml
---
title: "The Ultimate Guide to Python Asyncio in 2026"
description: "A comprehensive look at building high-performance asynchronous backends in Python using the latest asyncio features, task groups, and FastAPI."
date: "2026-03-15"
tags: ["Python", "Asyncio", "Backend", "Performance"]
published: true
image: "/blog/python-asyncio-cover.png"
---
```

### Frontmatter SEO Rules
- **`title`**: Keep under 60 characters. Must contain the primary target keyword. Do not end with a period.
- **`description`**: Keep between 120-155 characters. This is the search engine snippet. Make it actionable and keyword-rich.
- **`tags`**: Extract 3 to 5 core topical entities. Capitalize them properly (e.g., "Python", not "python").
- **`image`**: Always include a custom 1200x630 Open Graph cover image saved in `public/blog/`. Avoid generic paths.

---

## 2. Semantic Document Structure

Search engines and LLMs use headings to understand topical hierarchy. Never skip heading levels (e.g., do not jump from H2 to H4).

- **H1**: Handled automatically by the page template using your frontmatter `title`. **Do not use `# Heading 1` in the MDX body.**
- **H2 (`##`)**: Use for major sections of the article. These will automatically generate anchor links for easy sharing.
- **H3 (`###`)**: Use for sub-topics within an H2 section.
- **H4 (`####`)**: Rarely needed, but use for granular lists or minor points within an H3.

### Introduction Strategy (The First 100 Words)
The introduction must immediately answer the search intent.
- State the problem clearly.
- Include the primary keyword naturally in the first paragraph.
- State exactly what the reader will learn.

---

## 3. Rich Media & Code Blocks

### Authoring Code Blocks
Since this is an engineering blog, code snippets are critical content. They are syntax-highlighted using `rehype-pretty-code`.
- **Always specify the language** (e.g., ````python```` or ````tsx````).
- Add comments explaining *why* the code works, not just *what* it does.

```python
# ❌ BAD: Lacks context
def get_user(id):
    return db.query(User).filter(id=id)

# ✅ GOOD: Explains the pattern 
# We use async sessions here to prevent blocking the FastAPI event loop during I/O
async def get_user_by_id(db: AsyncSession, user_id: int) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()
```

### Images
Images should break up large walls of text. Provide highly descriptive `alt` text for screen readers and Google Image search.
```markdown
![Architecture diagram showing a FastAPI backend connecting to a Pinecone vector database](/blog/fastapi-vector-db-arch.png)
```

---

## 4. Internal & External Linking (The Web Graph)

Links establish authority and topical clusters. Search engines rely heavily on them.

- **Internal Links**: Always link to other related articles on `samueloshin.dev`. Use descriptive anchor text.
  - *Bad:* "Read more [here](/blog/rag-pipelines)."
  - *Good:* "For a deeper dive, see our guide on [building production RAG pipelines](/blog/building-rag-pipelines-at-scale)."
- **External Links**: Link to authoritative sources (official documentation, research papers, credible engineering blogs).

---

## 5. Readability & UI Formatting

To ensure the content looks premium via the Tailwind Typography plugin:
- **Short Paragraphs**: Keep paragraphs to 2-4 sentences max.
- **Bullet Lists**: Use lists to break down complex steps. They render beautifully and are favored for Google "Featured Snippets".
- **Bold Text (`**text**`)**: Use bolding to emphasize key terms, metric numbers, or critical takeaways to help skimmers.
- **Blockquotes (`>`)**: Use quotes for "Pro Tips", "Warnings", or key insights. They are styled with an elegant accent border on the blog.

> **Pro Tip**: Always run a final pass asking: "If a user only skims the headings and bold text, will they still understand the core value of this post?"

---

## AI Agent Directives 🤖

When an AI Agent is tasked with writing or editing a post in this repository:
1. **Tone**: Voice should be authoritative but accessible. Write like a senior Python engineer explaining a concept to a mid-level peer. No fluffy intros ("In today's fast-paced digital landscape..."). Cut straight to technical value.
2. **Formatting**: Strictly adhere to the frontmatter schema. Provide concrete code examples.
3. **Crawlability Prep**: Ensure paragraphs are dense with semantically related keywords (LSI keywords) without keyword stuffing.
4. **Verification**: Always double-check that markdown formatting (especially nested lists and code blocks) is syntactically valid before saving the `.mdx` file.
