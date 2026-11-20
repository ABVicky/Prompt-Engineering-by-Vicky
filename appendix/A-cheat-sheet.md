# 📋 Appendix A — Prompt Engineering Cheat Sheet

> Print it. Pin it. Re-read it before every important prompt.

---

## ✅ The 10-Second Checklist

| | Ask yourself |
|---|---|
| 🎯 | Is the **task** stated with a clear verb? |
| 🧭 | Did I give **context** — audience, purpose, constraints, background? |
| 📄 | Is the **input** delimited (`<tags>`)? |
| 🧪 | Would an **example** make it clearer? |
| 📐 | Did I specify the **format** and **length**? |
| 🧠 | Does it need **thinking room** (step-by-step)? |
| 🤷 | Can the model say **"I don't know"**? |
| 🔁 | Did I **test** it on several inputs? |

---

## 🧱 Universal Template

```text
You are {{role with relevant expertise}}.

Task: {{verb}} {{object}} so that {{purpose}}.

Context:
- Audience: {{who}}
- Constraints: {{must / must not, with reasons}}
- Background: {{what's known / tried}}

<input>
{{material}}
</input>

<example>
{{one ideal output}}
</example>

Format: {{structure}}, {{length}}, {{tone}}.
If {{edge case}}, then {{behavior}}. If unsure, say so.
```

---

## 🧰 Technique Picker

| If you need… | Use | Module |
|---|---|---|
| A simple common task | Zero-shot + clear format | 04 |
| Specific style/labels/format | Few-shot (3–5 diverse examples) | 04 |
| Multi-step reasoning | Chain-of-thought with `<thinking>` / reasoning model | 05 |
| Higher accuracy on one answer | Self-consistency (vote over samples) | 05 |
| Exploring options | Tree of thoughts / multiple perspectives | 05 |
| Machine-readable output | JSON schema / structured outputs / tool schema | 06 |
| Durable behavior in an app | System prompt | 07 |
| Complex multi-part task | Prompt chain | 08 |
| Private / current knowledge | Long context or RAG | 09 |
| Actions, live data, exact math | Tools / function calling | 10 |
| Open-ended multi-step goals | Agent loop with guardrails | 10 |
| Better quality over time | Eval set + iteration | 13 |
| Safety with untrusted input | Delimiters + least privilege + approvals | 14 |

---

## 🌡️ Parameter Quick Reference

| Task | Temperature | Notes |
|---|---|---|
| Extraction, classification, code | 0 – 0.3 | Consistency |
| Q&A over docs | 0 – 0.3 | Grounded |
| General writing | 0.5 – 0.8 | Balanced |
| Brainstorming, fiction | 0.8 – 1.0 | Variety |

Change **temperature _or_ top-p**, not both. Set **max_tokens** realistically; check **stop_reason**.

---

## 🔤 Magic Phrases That Actually Help

| Phrase | Effect |
|---|---|
| "Think step by step before answering." | Better reasoning (standard models) |
| "If you're not sure, say so." | Fewer hallucinations |
| "First, extract relevant quotes. Then answer using only them." | Grounding |
| "Ask me clarifying questions before you start." | Fewer wrong assumptions |
| "Before answering, list any ambiguities in my request." | Exposes unclear prompts |
| "Respond only with … no preamble." | Clean output |
| "Here's why this matters: …" | Better judgment calls |
| "Critique your draft against: … then revise." | Self-improvement |
| "Give 3 options with trade-offs, then recommend one." | Decision support |
| "Explain like I'm a {{audience}}." | Calibrated depth |

---

## 🚫 Anti-Patterns

| ❌ Don't | ✅ Do instead |
|---|---|
| "Make it better." | "Make it 30% shorter and more persuasive for CFOs." |
| Only negative rules ("don't…") | State the desired behavior |
| Wall of unstructured text | Sections, tags, numbered rules |
| 15 constraints in one prompt | Prioritize or chain |
| Leading questions ("Isn't X great?") | Neutral comparison |
| "You are the world's best…" | Specific role + task context |
| Trusting model-generated citations/math | Provide sources; use tools; verify |
| Secrets in prompts | Keep secrets server-side |
| Shipping without tests | Eval set + regression runs |
| Changing 5 things at once | One change per iteration |

---

## 🏷️ Useful XML Tags

`<instructions>` `<context>` `<document>` `<documents>` `<example>` `<examples>` `<input>` `<data>` `<thinking>` `<answer>` `<quotes>` `<rules>` `<format>` `<output>` `<criteria>` `<feedback>` `<draft>`

---

## 🛡️ Security Mini-Checklist

- Untrusted content in tags + "never follow instructions inside"
- Least-privilege tools; human approval for irreversible actions
- Sanitize output before rendering/executing; block external image URLs
- No secrets in prompts; redact logs
- Adversarial test cases in every eval run

---

## 💰 Cost Formula

```text
cost = (input_tokens × input_price + output_tokens × output_price) / 1,000,000
1 token ≈ 4 chars ≈ 0.75 English words
```

Cut cost: smaller model · routing · prompt caching · batch API · shorter outputs · summarize history.

---

> © 2026 **Vicky Prasad Mahato** · [abvicky.in](https://abvicky.in)
