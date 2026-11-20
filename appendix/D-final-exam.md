# 🎓 Appendix D — Final Exam

> 40 multiple-choice questions + 5 practical tasks covering all 18 modules.
> **Passing score:** 32/40 (80%). Time yourself: 60 minutes for the MCQs.
> Answers and explanations are hidden at the end of each section.

> 👔 **Non-Tech Track Focus:** Questions 1–20 (Foundations & Core Techniques), Questions 31–40 (Domains, Safety & Evaluation), and Practical Tasks 1 & 4.
> 💻 **Tech Track Focus:** All 40 questions (including structured JSON, function calling, RAG architectures, and PromptOps) and all 5 practical tasks.

---

## Part 1 — Foundations (Modules 01–04)

**1.** During pre-training, an LLM learns to:
A) Retrieve facts from a database  B) Predict the next token  C) Follow user instructions  D) Execute code

**2.** Roughly how many tokens are in 300 English words?
A) 100  B) 225  C) 400  D) 1,200

**3.** For consistent data extraction, the best temperature is:
A) 0–0.3  B) 0.7  C) 1.0  D) 1.5

**4.** Why do LLMs struggle to count letters in a word?
A) They see tokens, not characters  B) No math ability  C) Temperature too high  D) Context window too small

**5.** Which prompt block most often has the biggest impact?
A) Role  B) Context  C) Emoji  D) Sign-off

**6.** What's the main purpose of delimiters like `<document>` tags?
A) Decoration  B) Reduce tokens  C) Separate instructions from data  D) Increase temperature

**7.** "Don't use jargon" is weaker than "Use everyday words" because:
A) It's longer  B) Models ignore the word "don't" entirely  C) It uses more tokens  D) Negative instructions don't specify the desired behavior

**8.** Few-shot examples should be:
A) Diverse, correct and representative  B) Identical in structure and topic  C) All edge cases  D) As long as possible

**9.** Prefilling the assistant's response with `{` mainly helps to:
A) Increase creativity  B) Force JSON output to start immediately  C) Lower cost  D) Avoid tool calls

**10.** "You are the world's greatest physicist" primarily:
A) Adds physics knowledge  B) Guarantees accuracy  C) May shift tone, but adds no knowledge  D) Disables hallucinations

<details>
<summary>✅ Answers Part 1</summary>

1-B · 2-C (300 × 1.33 ≈ 400) · 3-A · 4-A · 5-B · 6-C · 7-D · 8-A · 9-B · 10-C

</details>

---

## Part 2 — Intermediate (Modules 05–09)

**11.** Chain-of-thought reasoning should be placed:
A) After the answer  B) In the system prompt only  C) It doesn't matter  D) Before the answer

**12.** Self-consistency requires:
A) Multiple samples and a vote  B) Temperature 0 and one sample  C) A vector database  D) Fine-tuning

**13.** Step-back prompting means:
A) Undoing the previous message  B) Asking a general principle question first  C) Reducing temperature  D) Removing examples

**14.** With reasoning ("thinking") models, you should usually:
A) Add "think step by step" everywhere  B) Use temperature 2  C) Give goals, constraints and success criteria  D) Provide 50 examples

**15.** The most reliable way to get schema-valid JSON is:
A) Asking politely  B) High temperature  C) Longer prompts  D) Native structured outputs / forced tool schemas + validation

**16.** Why place an `"evidence"` field before `"label"` in a JSON schema?
A) The label is then conditioned on evidence  B) Alphabetical order  C) Parsers require it  D) It reduces tokens

**17.** Where should rules that apply to every turn of a chatbot go?
A) The user message  B) The system prompt  C) The assistant prefill  D) A stop sequence

**18.** Which pattern classifies inputs and sends them to specialized prompts?
A) Evaluator-optimizer  B) Self-consistency  C) Routing  D) Prefill

**19.** For long documents, place the question:
A) Before the document  B) In the middle  C) In a separate API call only  D) After the document

**20.** Most RAG failures are caused by:
A) Retrieval problems  B) The LLM's grammar  C) Temperature  D) Too few tokens in the answer

<details>
<summary>✅ Answers Part 2</summary>

11-D · 12-A · 13-B · 14-C · 15-D · 16-A · 17-B · 18-C · 19-D · 20-A

</details>

---

## Part 3 — Advanced (Modules 10–14)

**21.** In tool use, who executes the function?
A) The model  B) Your application code  C) The vector DB  D) The tokenizer

**22.** A good tool description includes:
A) Only the name  B) The API key  C) When to use it, parameter formats, and what it returns  D) Marketing copy

**23.** The best first guardrail for an agent that can delete files:
A) Higher temperature  B) More examples  C) Longer system prompt  D) Human approval for destructive actions

**24.** MCP standardizes:
A) How apps expose tools/resources/prompts to LLM clients  B) Tokenization  C) Image generation  D) Model training

**25.** For image-generation prompts, you should write:
A) Instructions to a programmer  B) A visual description: subject, style, composition, lighting  C) JSON only  D) A single keyword

**26.** Output tokens are usually:
A) Free  B) Cheaper than input tokens  C) More expensive than input tokens  D) Priced the same everywhere

**27.** A 429 error means:
A) Bad request  B) Auth failure  C) Content filtered  D) Rate limited — retry with backoff

**28.** To benefit from prompt caching, put:
A) Static content first  B) Dynamic content first  C) Timestamps at the top  D) Random IDs in the system prompt

**29.** LLM-as-judge position bias is mitigated by:
A) Using temperature 1  B) Swapping the order and checking consistency  C) Longer answers  D) Removing the rubric

**30.** Every bug found in production should become:
A) A new system prompt  B) A fine-tuning run  C) A test case in the eval set  D) Nothing

**31.** A healthy eval set includes:
A) Only typical cases  B) Only adversarial cases  C) Only cases the prompt passes  D) Typical, edge and adversarial cases

**32.** Indirect prompt injection comes from:
A) Content the model processes, like web pages or emails  B) The developer  C) The tokenizer  D) Temperature

**33.** Why can't injection be fully solved by prompts?
A) Prompts are too short  B) Instructions and data share the same text channel  C) Models can't read XML  D) It's illegal

**34.** Rendering model-generated external images can cause:
A) Faster loading  B) Lower cost  C) Data exfiltration via URLs  D) Better accuracy

**35.** Which is NOT a hallucination-reduction technique?
A) Grounding in sources  B) Permission to say "I don't know"  C) Quote-then-answer  D) Raising temperature to 1.5

<details>
<summary>✅ Answers Part 3</summary>

21-B · 22-C · 23-D · 24-A · 25-B · 26-C · 27-D · 28-A · 29-B · 30-C · 31-D · 32-A · 33-B · 34-C · 35-D

</details>

---

## Part 4 — Pro (Modules 15–17)

**36.** Why pin the model version together with the prompt version?
A) Behavior depends on both  B) Billing  C) Legal requirement  D) Faster responses

**37.** Safe model migration order:
A) Switch 100% immediately  B) Offline eval → shadow → canary → full rollout  C) Canary → offline eval  D) Fine-tune first

**38.** For data analysis, the model should ideally:
A) Compute numbers mentally  B) Guess trends  C) Write and run code, then report verified results  D) Avoid charts

**39.** In high-stakes domains (legal/medical/financial), LLMs should:
A) Make final decisions  B) Never be used  C) Be used without review  D) Assist and draft; qualified humans decide

**40.** The strongest portfolio evidence is:
A) Measured before/after eval results with write-up  B) A flashy demo  C) A list of tools used  D) Number of prompts written

<details>
<summary>✅ Answers Part 4</summary>

36-A · 37-B · 38-C · 39-D · 40-A

</details>

---

## Part 5 — Practical Tasks (graded by rubric)

**P1. Prompt makeover (Modules 02–04).** Rewrite *"write about our new app"* into a complete prompt for a launch email.

**P2. Extraction (Module 06).** Write a prompt + JSON schema to extract event details (name, date, venue, price, organizer) from posters' text, with null handling.

**P3. System prompt (Module 07).** Write a system prompt for a college-admissions FAQ bot with escalation rules.

**P4. Evaluation (Module 13).** Design 10 test cases and the grading method for P2.

**P5. Security (Module 14).** Threat-model an assistant that reads a user's inbox and drafts replies. List 5 mitigations.

<details>
<summary>✅ Rubric (each task scored /10)</summary>

| Criterion | Points |
|---|---|
| Clear task & context | 2 |
| Specific constraints with reasons | 2 |
| Explicit output format | 2 |
| Edge cases / uncertainty handled | 2 |
| Safety / verification considered | 2 |

**P5 reference mitigations:** treat email bodies as untrusted data; drafts only, never auto-send (a human approves each one); no access to unrelated tools; don't render external images/links in drafts; log and flag emails containing instruction-like text; redact sensitive data in logs.

Score ≥ 40/50 on Part 5 + ≥ 32/40 on MCQs = **🏆 Course Complete with Distinction**.

</details>

---

> Author: **Vicky** ([abvicky.in](https://abvicky.in)) · Platform built by [Manikarnika Technologies](https://www.manikarnikatechnologies.in/) · © 2026 All rights reserved.
