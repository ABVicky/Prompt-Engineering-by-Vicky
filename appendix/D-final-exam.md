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
A) No math ability  B) They see tokens, not characters  C) Temperature too high  D) Context window too small

**5.** Which prompt block most often has the biggest impact?
A) Role  B) Emoji  C) Context  D) Sign-off

**6.** What's the main purpose of delimiters like `<document>` tags?
A) Decoration  B) Separate instructions from data  C) Reduce tokens  D) Increase temperature

**7.** "Don't use jargon" is weaker than "Use everyday words" because:
A) It's longer  B) Negative instructions don't specify the desired behavior  C) Models ignore the word "don't" entirely  D) It uses more tokens

**8.** Few-shot examples should be:
A) Identical in structure and topic  B) Diverse, correct and representative  C) All edge cases  D) As long as possible

**9.** Prefilling the assistant's response with `{` mainly helps to:
A) Increase creativity  B) Force JSON output to start immediately  C) Lower cost  D) Avoid tool calls

**10.** "You are the world's greatest physicist" primarily:
A) Adds physics knowledge  B) Guarantees accuracy  C) May shift tone, but adds no knowledge  D) Disables hallucinations

<details>
<summary>✅ Answers Part 1</summary>

1-B · 2-C (300 × 1.33 ≈ 400) · 3-A · 4-B · 5-C · 6-B · 7-B · 8-B · 9-B · 10-C

</details>

---

## Part 2 — Intermediate (Modules 05–09)

**11.** Chain-of-thought reasoning should be placed:
A) After the answer  B) Before the answer  C) In the system prompt only  D) It doesn't matter

**12.** Self-consistency requires:
A) Temperature 0 and one sample  B) Multiple samples and a vote  C) A vector database  D) Fine-tuning

**13.** Step-back prompting means:
A) Undoing the previous message  B) Asking a general principle question first  C) Reducing temperature  D) Removing examples

**14.** With reasoning ("thinking") models, you should usually:
A) Add "think step by step" everywhere  B) Give goals, constraints and success criteria  C) Use temperature 2  D) Provide 50 examples

**15.** The most reliable way to get schema-valid JSON is:
A) Asking politely  B) Native structured outputs / forced tool schemas + validation  C) High temperature  D) Longer prompts

**16.** Why place an `"evidence"` field before `"label"` in a JSON schema?
A) Alphabetical order  B) The label is then conditioned on evidence  C) Parsers require it  D) It reduces tokens

**17.** Where should rules that apply to every turn of a chatbot go?
A) The user message  B) The system prompt  C) The assistant prefill  D) A stop sequence

**18.** Which pattern classifies inputs and sends them to specialized prompts?
A) Routing  B) Evaluator-optimizer  C) Self-consistency  D) Prefill

**19.** For long documents, place the question:
A) Before the document  B) After the document  C) In the middle  D) In a separate API call only

**20.** Most RAG failures are caused by:
A) The LLM's grammar  B) Retrieval problems  C) Temperature  D) Too few tokens in the answer

<details>
<summary>✅ Answers Part 2</summary>

11-B · 12-B · 13-B · 14-B · 15-B · 16-B · 17-B · 18-A · 19-B · 20-B

</details>

---

## Part 3 — Advanced (Modules 10–14)

**21.** In tool use, who executes the function?
A) The model  B) Your application code  C) The vector DB  D) The tokenizer

**22.** A good tool description includes:
A) Only the name  B) When to use it, parameter formats, and what it returns  C) The API key  D) Marketing copy

**23.** The best first guardrail for an agent that can delete files:
A) Higher temperature  B) Human approval for destructive actions  C) More examples  D) Longer system prompt

**24.** MCP standardizes:
A) Tokenization  B) How apps expose tools/resources/prompts to LLM clients  C) Image generation  D) Model training

**25.** For image-generation prompts, you should write:
A) Instructions to a programmer  B) A visual description: subject, style, composition, lighting  C) JSON only  D) A single keyword

**26.** Output tokens are usually:
A) Free  B) Cheaper than input tokens  C) More expensive than input tokens  D) Priced the same everywhere

**27.** A 429 error means:
A) Bad request  B) Rate limited — retry with backoff  C) Auth failure  D) Content filtered

**28.** To benefit from prompt caching, put:
A) Dynamic content first  B) Static content first  C) Timestamps at the top  D) Random IDs in the system prompt

**29.** LLM-as-judge position bias is mitigated by:
A) Using temperature 1  B) Swapping the order and checking consistency  C) Longer answers  D) Removing the rubric

**30.** Every bug found in production should become:
A) A new system prompt  B) A test case in the eval set  C) A fine-tuning run  D) Nothing

**31.** A healthy eval set includes:
A) Only typical cases  B) Typical, edge and adversarial cases  C) Only adversarial cases  D) Only cases the prompt passes

**32.** Indirect prompt injection comes from:
A) The developer  B) Content the model processes, like web pages or emails  C) The tokenizer  D) Temperature

**33.** Why can't injection be fully solved by prompts?
A) Prompts are too short  B) Instructions and data share the same text channel  C) Models can't read XML  D) It's illegal

**34.** Rendering model-generated external images can cause:
A) Faster loading  B) Data exfiltration via URLs  C) Lower cost  D) Better accuracy

**35.** Which is NOT a hallucination-reduction technique?
A) Grounding in sources  B) Permission to say "I don't know"  C) Raising temperature to 1.5  D) Quote-then-answer

<details>
<summary>✅ Answers Part 3</summary>

21-B · 22-B · 23-B · 24-B · 25-B · 26-C · 27-B · 28-B · 29-B · 30-B · 31-B · 32-B · 33-B · 34-B · 35-C

</details>

---

## Part 4 — Pro (Modules 15–17)

**36.** Why pin the model version together with the prompt version?
A) Billing  B) Behavior depends on both  C) Legal requirement  D) Faster responses

**37.** Safe model migration order:
A) Switch 100% immediately  B) Offline eval → shadow → canary → full rollout  C) Canary → offline eval  D) Fine-tune first

**38.** For data analysis, the model should ideally:
A) Compute numbers mentally  B) Write and run code, then report verified results  C) Guess trends  D) Avoid charts

**39.** In high-stakes domains (legal/medical/financial), LLMs should:
A) Make final decisions  B) Assist and draft; qualified humans decide  C) Never be used  D) Be used without review

**40.** The strongest portfolio evidence is:
A) A flashy demo  B) Measured before/after eval results with write-up  C) A list of tools used  D) Number of prompts written

<details>
<summary>✅ Answers Part 4</summary>

36-B · 37-B · 38-B · 39-B · 40-B

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

**P5 reference mitigations:** treat email bodies as untrusted data; drafts only — never auto-send (human approval); no access to unrelated tools; don't render external images/links in drafts; log and flag emails containing instruction-like text; redact sensitive data in logs.

Score ≥ 40/50 on Part 5 + ≥ 32/40 on MCQs = **🏆 Course Complete with Distinction**.

</details>

---

> © 2026 [Manikarnika Technologies](https://www.manikarnikatechnologies.in/) · All rights reserved.
