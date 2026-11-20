# 🧭 Module 16 — Domain Playbooks

> 🌟 Stage 4 · Pro · ⏱️ ~4 hours

Ready-to-use strategies and prompts for the domains where prompt engineering is used most. Each playbook gives: **what works**, **pitfalls**, and **templates**.

> 👔 **Non-Tech Track Playbooks:**
> Jump directly to **Section 2 (Writing)**, **Section 3 (Marketing & Sales)**, **Section 7 (Business & Strategy)**, **Section 8 (Customer Support)**, **Section 9 (HR)**, and **Section 11 (Productivity)**. These focus on immediate workplace productivity without writing a line of code.

> 💻 **Tech Track Playbooks:**
> Focus on **Section 1 (Software Development)**, **Section 4 (Data Analysis & SQL)**, and **Section 5 (Technical Research & Architecture)**. These cover code generation, debugging stack traces, Pydantic data schemas, query optimization, and technical RFC reviews.

## 🎯 Learning Objectives

- Apply course techniques to **coding, writing, marketing, data analysis, research, education, business, customer support, HR, legal/medical/finance (with caution), and personal productivity**
- Adapt templates quickly to new domains

---

## 💻 1. Software Development

**What works**
- Give **context**: language/version, framework, conventions, relevant files, error messages and stack traces in full.
- State **acceptance criteria**: tests to pass, performance limits, what must not change.
- Ask for **plans before code** on bigger tasks; review the plan.
- Ask for **tests** alongside code; run them.
- For debugging: expected vs actual behavior, minimal reproduction, what you've tried.

**Pitfalls:** invented APIs/packages (verify they exist — "package hallucination" can be a security risk), outdated library versions, insecure code (SQL injection, missing validation), huge unreviewed diffs.

```text
Context: Python 3.12, FastAPI, SQLAlchemy 2.0, Postgres. Follow PEP 8 and the
existing patterns in the code below.

Task: Add an endpoint GET /users/{id}/orders that returns the user's orders
paginated (limit/offset, default 20, max 100), newest first.

Requirements:
- 404 if the user doesn't exist
- Use the existing get_db dependency
- Pydantic response models
- Include pytest tests for: happy path, pagination bounds, unknown user

<existing_code>
...
</existing_code>

First outline your approach in 3–5 bullets, then provide the code and tests.
```

**Debugging template**
```text
I'm getting this error:
<error>{{full stack trace}}</error>
Relevant code:
<code>{{code}}</code>
Expected: {{expected}}. Actual: {{actual}}. Already tried: {{attempts}}.
Explain the root cause, then give the minimal fix.
```

**Code review template**
```text
Review this diff as a senior engineer. Prioritize: security > correctness >
performance > readability. For each issue: severity, line, problem, fix.
Don't comment on formatting handled by our linter.
<diff>{{diff}}</diff>
```

Other uses: writing regex/SQL (always ask for explanation + test examples), converting code between languages, writing documentation, generating commit messages, explaining legacy code.

---

## ✍️ 2. Writing & Content

**What works:** define audience, purpose, voice (with a sample), structure, length; iterate in stages (outline → draft → edit).

**Pitfalls:** generic "AI voice" (overuse of words like *delve*, *tapestry*, *in today's fast-paced world*), invented facts/quotes, flattening your voice.

```text
You are my writing partner. Here are 3 paragraphs I've written, to learn my voice:
<my_writing>{{samples}}</my_writing>

Write an 800-word blog post on "{{topic}}" for {{audience}}.
Structure: a hook from a personal anecdote placeholder [ANECDOTE], 3 sections
with H2 headings, a practical checklist, and a one-line takeaway.
Voice: match my samples — short sentences, light humour, no clichés.
Avoid: "in today's world", "delve", "unlock", "game-changer".
Mark any factual claim that needs a source with [CHECK].
```

**Editing prompt**
```text
Edit for clarity and concision. Keep my voice and all facts. Show changes as a
list: original → revised → reason. Then give the full revised text.
```

---

## 📣 3. Marketing & Sales

```text
Act as a direct-response copywriter. Product: {{product}}. Audience: {{persona,
pains, desires, objections}}. Channel: {{Instagram ad / landing page / email}}.

Write 5 variations of {{headline + 2-line body + CTA}}, each using a different
angle: (1) pain, (2) aspiration, (3) social proof, (4) urgency, (5) curiosity.
Constraints: no false claims, no superlatives we can't prove, under 40 words each.
Then rank them for this audience and explain the top pick in 2 sentences.
```

Other uses: customer personas, SEO briefs (keyword intent, outline, FAQs), email sequences, A/B test ideas, competitor messaging analysis (from provided material), sales call prep.

---

## 📈 4. Data Analysis

**What works:** describe the dataset schema (columns, types, sample rows), the business question, and let the model **write code** (Python/pandas/SQL) rather than compute numbers in its head. Use tools with code execution where available.

```text
You are a data analyst. Dataset: sales.csv with columns
order_id (int), order_date (YYYY-MM-DD), region (str), product (str),
units (int), unit_price_inr (float). Sample rows:
<sample>{{5 rows}}</sample>

Question: Which region's revenue grew fastest quarter-over-quarter in 2025,
and which products drove it?

1. State your analysis plan.
2. Write pandas code to answer it (with comments).
3. Describe the charts you'd make and why.
4. List assumptions and data-quality checks.
```

**SQL template**
```text
Given this schema:
<schema>{{CREATE TABLE statements}}</schema>
Write a {{Postgres}} query that {{question}}. Explain each clause briefly.
Then give 2 test cases with expected results to validate the query.
```

**Pitfall:** models may report numbers they didn't actually compute. Always execute code and verify.

---

## 🔬 5. Research & Learning

```text
I want to understand {{topic}} deeply in 2 weeks.
1. Map the topic: core concepts, prerequisites, common misconceptions.
2. Create a 14-day plan (1 h/day) with an objective per day.
3. For day 1, teach me with an explanation, an analogy, a worked example,
   and 3 questions to test me. Wait for my answers before continuing.
```

**Feynman/Socratic tutor**
```text
Act as a Socratic tutor. I'll explain {{concept}} in my own words; ask probing
questions to find gaps. Don't give answers directly unless I'm stuck twice.
```

**Literature/source summarization**
```text
Summarize the paper below: problem, method, key results (with numbers),
limitations, and how it compares to prior work it cites. Quote the
abstract sentence that best states the contribution.
<paper>{{text}}</paper>
```

> ⚠️ Never trust model-generated **citations** without checking. Use search tools or provide the sources.

---

## 🎓 6. Education (for teachers)

```text
You are an experienced {{subject}} teacher for {{grade}} following {{CBSE/ICSE/
state board/IB}}. Create a 40-minute lesson plan on {{topic}}:
- Learning objectives (Bloom's levels)
- Hook activity (5 min)
- Explanation with one local, real-life example
- Group activity (15 min) with instructions
- Exit ticket: 3 questions (easy, medium, hard) with answers
- Differentiation tips for advanced and struggling students
```

Other uses: rubrics, question banks with varying difficulty, feedback on student writing (with teacher review), parent communication drafts, simplifying texts to different reading levels.

---

## 💼 7. Business & Strategy

```text
Act as a strategy consultant. Analyze {{business situation}} using:
1. SWOT
2. Porter's Five Forces (only where relevant)
3. Top 3 strategic options with pros, cons, cost, risk, time-to-impact
4. Recommendation and the 3 metrics to track in the first 90 days
State assumptions explicitly. Mark anything that needs data validation.
```

Other uses: meeting summaries & action items, OKRs, SOPs, project plans, decision memos ("write the case for and against"), pitch deck outlines, financial model explanations (verify calculations in a spreadsheet).

---

## 🎧 8. Customer Support

- RAG over help-center articles + policies (Module 09)
- Routing by intent and urgency (Module 08)
- Tone: empathetic, concise, solution-first
- Escalation rules & human handoff (Module 07)

```text
Draft a reply to the customer using only <policy> and <order_info>.
Structure: acknowledge (1 sentence) → solution/next steps (numbered) →
what we'll do and by when → friendly close. Max 120 words.
If the policy doesn't allow what they ask, explain kindly and offer the
closest alternative.
```

---

## 👥 9. HR & Recruiting

- Job descriptions with inclusive language
- Interview question banks per competency with scoring rubrics
- Onboarding plans
- ⚠️ **Don't** use LLMs to make or rank final hiring decisions about individuals; test for bias (Module 14).

```text
Write an inclusive job description for {{role}}. Separate "must have" (max 5)
from "nice to have". Avoid gender-coded words and unnecessary degree
requirements. Include salary range {{range}} and a 2-sentence culture note.
```

---

## ⚖️🩺💰 10. High-Stakes Domains: Legal, Medical, Financial

LLMs can **draft, explain, summarize, and organize**, but outputs must be reviewed by qualified professionals.

| Do | Don't |
|---|---|
| Summarize documents with citations to sections/pages | Treat output as legal/medical/financial advice |
| Explain concepts in plain language | Let the model decide diagnoses, verdicts, or investments |
| Draft checklists and questions to ask a professional | Rely on model knowledge for current laws, dosages, tax rates |
| Ground answers in provided, current sources | Share sensitive data with non-compliant tools |

```text
Explain this clause from my rental agreement in plain language, list what it
obliges me to do, and suggest 3 questions I should ask a lawyer.
Note anything unusual compared to typical rental agreements.
<clause>{{clause}}</clause>
```

---

## 🗂️ 11. Personal Productivity

```text
Here's my task list and calendar for this week:
<tasks>{{tasks}}</tasks> <calendar>{{events}}</calendar>
Prioritize using an Eisenhower matrix, then propose a time-blocked plan for
each day with buffers. Flag anything that won't fit and suggest what to drop
or delegate.
```

Other uses: email triage & drafts, decision-making (pros/cons/regret minimization), learning plans, travel planning, budgeting explanations, meal plans.

---

## 🔑 Key Takeaways

- The same core moves apply everywhere: **context, criteria, structure, examples, verification**.
- Code & data: make the model **write and run code**, don't trust mental math.
- Writing: give **voice samples** and banned clichés.
- High-stakes domains: **assist and draft; humans decide**.

---

## 🏋️ Exercise 16.1 — Adapt a Template

Pick your own profession. Write one high-quality, reusable prompt template with `{{variables}}` that you'd use weekly. Run it on 3 real inputs and refine it once.

<details>
<summary>✅ Self-check rubric</summary>

- [ ] Clear role and task
- [ ] Context variables for the parts that change
- [ ] Explicit output format and length
- [ ] Constraints & what to avoid (with reasons)
- [ ] Verification step or uncertainty handling
- [ ] Tested on 3 inputs; one improvement made based on a failure

</details>

---

> © 2026 [Manikarnika Technologies](https://www.manikarnikatechnologies.in/) · All rights reserved.
> ⬅️ [Module 15](15-production-promptops.md) · ➡️ [Module 17 — Becoming a Pro](17-becoming-a-pro.md)
