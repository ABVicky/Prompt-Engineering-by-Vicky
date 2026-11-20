# 🧭 Module 16 — Domain Playbooks

> 🌟 Stage 4 · Pro · ⏱️ ~4 hours

Think of general prompt principles like a sturdy multi-tool pocket knife. It can open a package, tighten a loose screw, or slice an apple on a hike.

However, if you take that same pocket knife into a surgical theater or an aircraft maintenance hangar, it is completely inadequate. A surgeon needs an ultra-sharp scalpel; an aerospace engineer needs a calibrated digital torque wrench.

Prompt engineering works the exact same way. While the foundational principles (clarity, context, structure, examples) remain universal, every industry has its own specialized workflows, jargon, edge cases, and safety risks. 

In this module, you will find ready-to-use playbooks for eleven professions, from software engineering and marketing to education, HR, and high-stakes fields like legal and healthcare administration.

> 👔 **Non-Tech Lens · Start With Your Own Job:**
> You don't need to read all eleven playbooks. Jump to the one closest to your work (writing, marketing, teaching, business, support, HR or personal productivity), copy one template, and use it on a real task this week. Every template here works in an ordinary chat app.

> 💻 **Tech Lens · Templates Become Product Features:**
> If you build tools for other teams, each playbook is a starting spec. Turn a template into a parameterized prompt (Module 15), add a small test set for it (Module 13), and you have a reliable feature instead of a one-off chat.

---

## 🎯 Learning Objectives

By the end of this module, you will be able to:
- Apply field-tested prompting strategies across **software development, marketing, data analysis, teaching, business strategy, and operations**.
- Adapt generic templates into domain-specific workflows in under two minutes.
- Recognize domain-specific failure modes like "package hallucination" in code or unauthorized legal advice.
- Build a personal, reusable prompt library for your specific day job.

---

## 1. 💻 Software Development Playbook

### What Works
- **Supply full context:** Language version, frameworks, existing code snippets, and complete stack traces.
- **Set clear acceptance criteria:** Unit tests that must pass, time complexity constraints, and existing public APIs that must not change.
- **Ask for plans before code:** On complex architecture changes, ask the model to outline its approach in bullet points before generating lines of code.
- **Debugging:** State the expected behavior, actual behavior, minimal reproduction steps, and what you have already tried.

### Pitfalls to Watch For
- **Package Hallucination:** Models occasionally invent non-existent npm or pip packages. Always verify that a recommended library actually exists.
- **Security Vulnerabilities:** Check generated code for SQL injection, unescaped user inputs, and missing authentication checks.

```text
Context: Python 3.12, FastAPI, SQLAlchemy 2.0, PostgreSQL. Follow PEP 8 and existing project conventions.

Task: Add a paginated endpoint GET /api/v1/customers/{id}/invoices.

Requirements:
- Pagination parameters: limit (default 20, max 100), offset (default 0).
- Return HTTP 404 if the customer ID does not exist.
- Use the existing get_db session dependency.
- Return response validated against our InvoiceSummary Pydantic model.
- Include pytest test cases covering: standard success, empty results, and non-existent customer ID.

<existing_models>
{{code_snippet}}
</existing_models>

First, outline your technical approach in 3 bullet points. Then provide the implementation code and tests.
```

---

## 2. ✍️ Writing, Editing & Communications

### What Works
- Provide **voice samples** so the model mirrors your natural sentence rhythm, vocabulary, and humor.
- Break writing into stages: Outline → Rough Draft → Targeted Edit.
- Tell the model what words to avoid (corporate clichés, exaggerated hype).

❌ **Weak**
```text
Write a blog post about artificial intelligence in marketing.
```

✅ **Strong**
```text
You are my writing collaborator. Here are two sample paragraphs I wrote last week so you can analyze my voice:
<my_voice>
Most tools promise to save you 10 hours a week, but they end up creating 15 hours of extra configuration busywork. I don't want a complex dashboard; I just want my team to get their weekly reports out before 5:00 PM on Friday without pulling their hair out.
</my_voice>

Write an 800-word article on "How small marketing teams can use AI without getting overwhelmed".

Requirements:
- Structure: Start with an everyday workplace scenario, introduce 3 practical steps with H2 headings, provide a short checklist, and finish with a 1-sentence punchy takeaway.
- Voice: Match my sample—conversational, grounded, slightly self-deprecating, short sentences.
- Strict Rule: Do not use empty buzzwords, corporate jargon, or breathless superlatives.
- Mark any factual claim that requires a real citation with [CHECK SOURCE].
```

---

## 3. 📣 Marketing & Sales Playbook

```text
You are a direct-response copywriter for a B2B SaaS startup in Bengaluru.

Product: An automated GST invoice reconciliation tool that saves accounts teams 12 hours every month.
Target Audience: Finance heads and Chartered Accountants at mid-sized Indian companies (₹10 Cr to ₹50 Cr revenue).

Draft 4 distinct outreach email subject lines and a 75-word body for cold email outreach.
Each variation must test a different psychological hook:
1. Pain point (wasting weekends on manual reconciliation)
2. Social proof (trusted by 120+ accounting teams)
3. Time savings (get 12 hours back each month)
4. Direct Curiosity

Tone: Peer-to-peer, professional, zero corporate fluff. Include one clear call to action offering a 10-minute demo.
```

---

## 4. 📈 Data Analysis & SQL Playbook

Language models are exceptional at writing Python, pandas, and SQL code, but mediocre at doing mental math across thousands of rows. Always instruct the model to write code that you can execute:

```text
You are a senior data analyst.

Here is our PostgreSQL table schema:
<schema>
CREATE TABLE customer_orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    city VARCHAR(50),
    order_value_inr NUMERIC(10,2),
    delivery_status VARCHAR(20)
);
</schema>

Write a clean, optimized SQL query that calculates:
1. Total monthly revenue for Mumbai, Delhi, and Bengaluru in 2025.
2. The month-over-month growth rate for each city.

Include helpful SQL comments explaining any window functions used, and describe 2 edge cases (like months with zero orders) that the query handles safely.
```

---

## 5. 🔬 Research & Accelerated Learning

Use the **Feynman Technique** to learn complex subjects rapidly:

```text
Act as a patient Socratic tutor. 
I want to master how Vector Databases work under the hood.

Here is how we will work together:
1. Explain the single foundational concept using an everyday physical analogy (like an organized library or physical map).
2. Ask me 2 conceptual questions to check my understanding.
3. Wait for my response. Do not move forward until I answer your questions.
4. If my answer has a gap, guide me to the correct realization with a follow-up hint rather than giving the answer away.
```

---

## 6. 🎓 Education & Teaching Playbook

```text
You are an experienced Grade 9 Science teacher in India following the CBSE curriculum.

Create a 40-minute interactive lesson plan on "Newton's Third Law of Motion (Action and Reaction)".

Structure:
1. The Hook (5 mins): A relatable demonstration using a simple balloon or skateboard.
2. Conceptual Explanation (10 mins): Clear explanation using everyday Indian examples (like walking, rowing a boat on a river, or swimming).
3. Group Activity (15 mins): Hands-on challenge students can do in pairs using common classroom items.
4. Exit Ticket (10 mins): 3 short conceptual questions (1 easy, 1 medium, 1 tricky misconception) with answer keys for the teacher.
```

---

## 7. 💼 Business, Operations & Strategy

```text
Act as a seasoned management consultant.

Review our proposal to expand our quick-commerce delivery service from Bengaluru into Tier-2 cities (Jaipur, Indore, and Lucknow).

Analyze this move across 4 dimensions:
1. Unit Economics: Order density vs delivery rider cost.
2. Supply Chain: Sourcing local perishables vs centralized warehousing.
3. Customer Behavior: Price sensitivity and COD (Cash on Delivery) rates.
4. The Top 3 Operational Risks: For each risk, state one practical mitigation.

End with a clear decision rubric: What 3 milestone metrics must our pilot store hit in the first 90 days before approving full city expansion?
```

---

## 8. 🎧 Customer Support Playbook

```text
You are a empathetic customer care lead for an Indian travel booking portal.

Draft a response to this customer complaint:
<complaint>
"My flight from Pune to Delhi was cancelled 3 hours before departure. Your app said my refund of ₹6,200 was processed, but my bank statement shows nothing after 4 days. I had to buy an emergency ticket for ₹14,000 on another airline. I want my refund and compensation immediately."
</complaint>

<policy>
- Airline cancellations trigger automatic refund initiation within 24 hours.
- Bank processing times: UPI refunds reflect in 24-48 hours; credit card refunds take 5-7 working days.
- Consequential damages (booking replacement flights on other airlines) are not covered by platform policy.
</policy>

Requirements:
- Empathize sincerely with the stressful disruption without making illegal legal admissions.
- Clearly explain the bank settlement timeline for their credit card payment.
- Provide their ARN (Acquirer Reference Number) tracking steps so they can trace the funds with their bank.
- Keep the tone calm, respectful, and reassuring. Max 140 words.
```

---

## 9. 👥 HR & Talent Acquisition

```text
Write an inclusive, bias-free job description for a "Senior Product Operations Manager" based in our Bengaluru office.

Guidelines:
- Avoid gender-coded adjectives (replace aggressive words like "ninja", "rockstar", or "ruthless" with "collaborative", "structured", and "analytical").
- Divide requirements strictly into "Must-Haves" (max 5 measurable skills) and "Nice-to-Haves" (max 3 skills).
- Do not list arbitrary degree requirements if practical work experience suffices.
- Include a transparent compensation range (₹24L to ₹30L CTC) and highlight our hybrid schedule (2 days in-office, 3 days remote).
```

---

## 10. ⚖️ High-Stakes Domains: Legal, Medical, Financial

In high-stakes domains, AI should **assist, summarize, and organize**, but must **never replace qualified human judgment**.

| Safe & High-Value AI Tasks | Dangerous Tasks (Do NOT Do) |
|---|---|
| Explaining legal clauses in plain language | Generating signed contracts without human lawyer review |
| Summarizing medical research studies | Diagnosing patient symptoms or prescribing dosages |
| Extracting financial ratios from annual reports | Autonomous stock trading or tax filings without human CPA verification |

```text
Explain the clause below from a commercial office lease agreement in plain English.
1. What exact obligations does this clause place on the tenant?
2. What are the financial penalties if the lease is terminated early?
3. Suggest 3 specific clarification questions I should ask our real estate lawyer before signing.

Notice: Provide this analysis as educational information to prepare for my legal consultation, not as formal legal advice.

<clause>
{{lease_clause_text}}
</clause>
```

---

## 11. 🗂️ Personal Productivity Playbook

```text
You are an executive productivity coach.

Here is my raw list of tasks and commitments for this week:
<tasks>
- Prepare quarterly board deck (due Thursday 2 PM)
- Review 4 candidate resumes for operations role
- Fix bug #481 in checkout flow
- 1-on-1 meetings with 5 team members
- Submit GST expense receipts to accounting
- Dentist appointment (Tuesday 4 PM)
</tasks>

Organize these tasks using the Eisenhower Matrix:
1. Urgent & Important (Do first)
2. Important, Not Urgent (Schedule deep-work blocks)
3. Urgent, Not Important (Delegate or automate)
4. Neither (Eliminate or postpone)

Propose a realistic Monday-to-Friday time-blocked schedule with 45-minute buffer blocks for unexpected emergencies.
```

---

## 💡 Common Mistakes & How to Spot Them

| Mistake | What goes wrong | The Fix |
|---|---|---|
| The Unverified Citation | Asking an AI for legal precedents or academic medical papers. It invents author names and dates. | Provide the source documents directly or verify all case citations in an official law database. |
| The Trust-Me Math Problem | Letting an LLM calculate complex compounding interest or financial ratios in its head. | Instruct the model to write a Python script or Excel formula to compute the numbers. |
| The Over-Promising Support Bot | A customer support bot promises a full cash refund that violates company policy. | Ground the bot strictly in policy documentation with explicit negative constraints. |

---

## 🧪 Try It Now

Choose the playbook above that most closely matches your day job. 

Copy the prompt template, fill in your real-world details (replacing the placeholders), and run it in your favorite chat app. Compare the output against what you normally write from scratch.

---

## 🔑 Key Takeaways

- Domain prompting combines universal prompt principles with industry-specific vocabulary and constraints.
- In software and data analysis, force models to **write and run code** rather than doing calculations internally.
- In writing, provide **2 to 3 paragraphs of your own writing** as few-shot voice samples to eliminate robotic prose.
- For high-stakes fields (legal, health, finance), use AI to **draft, summarize, and spot questions**, but keep qualified humans in control of final decisions.

---

## 🏋️ Exercises

### Exercise 16.1: Build Your Personal Workplace Prompt Template
Select one repetitive writing or analytical task you perform at work every week (e.g. writing weekly status updates, triaging customer tickets, or analyzing vendor quotes).

Build a reusable prompt template containing:
1. A clear role and task definition.
2. At least two dynamic `{{variables}}` for the parts that change each week.
3. Format, length, and tone boundaries.
4. A quality constraint stating what must be avoided.

<details>
<summary>View Sample Template for a Weekly Team Status Report</summary>

```text
You are an operations project manager at {{company_name}}.

Draft our weekly executive project update email for leadership based on the bulleted team notes below.

Context:
- Project: {{project_name}}
- Week ending: {{date}}

<team_notes>
{{raw_notes}}
</team_notes>

Requirements:
- Structure into 3 sections with bold headings:
  1. 🎯 Highlights & Milestones Completed This Week
  2. ⚠️ Blockers & Risks (include owner for each)
  3. 📅 Next Week's Priorities
- Tone: Crisp, factual, and solutions-oriented. No filler sentences or corporate hype.
- Length: Under 200 words.
```

</details>

---

## ✅ Quick Quiz

1. Why should you ask an AI model to write Python or SQL code when doing data analysis, rather than asking it to calculate sums directly?
   - A) Because Python code uses fewer tokens than English.
   - B) Because SQL is easier for humans to read than English.
   - C) Because language models can hallucinate math calculations, but executing verified code guarantees arithmetic precision.
2. In high-stakes domains like medicine or law, what is the proper role of an AI model?
   - A) An assistant that drafts summaries, highlights key issues, and prepares questions for qualified human experts.
   - B) Autonomous decision-maker that replaces doctors and lawyers.
   - C) An automated judge that signs off on legal filings.
3. How can you most effectively teach an AI model to write in your unique personal voice?
   - A) Tell it to write like a genius.
   - B) Paste 2 or 3 sample paragraphs of your own previous writing into the prompt as few-shot voice examples.
   - C) Set temperature to 2.0.

<details>
<summary>View Answers</summary>

1. **C** — LLMs predict tokens probabilistically; executing deterministic code eliminates arithmetic calculation mistakes.
2. **A** — AI models should serve as research and drafting accelerators, keeping licensed professionals in the loop for final judgment.
3. **B** — Few-shot voice samples communicate rhythm, vocabulary, and sentence length far better than abstract adjectives.

</details>

---

> Author: **Vicky** ([abvicky.in](https://abvicky.in)) · Platform built by [Manikarnika Technologies](https://www.manikarnikatechnologies.in/) · © 2026 All rights reserved.
> ⬅️ [Module 15](15-production-promptops.md) · ➡️ [Module 17 — Becoming a Pro](17-becoming-a-pro.md)
