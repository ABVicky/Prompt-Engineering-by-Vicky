# 🩺 Appendix F — Troubleshooting Guide

> Symptom → likely cause → fix. Find your problem, apply the fix, re-test.

---

## 📝 Output Quality

| Symptom | Likely cause | Fix |
|---|---|---|
| Generic, bland answer | Missing context, audience, purpose | Add who/why/constraints; give an example |
| Too long | No length limit; verbose examples | "Max 100 words / 3 bullets"; shorter examples; lower `max_tokens` |
| Too short / superficial | No depth requested | "Detailed, with examples and edge cases"; ask for sections |
| Wrong tone | Tone not specified or prompt style mismatched | Describe tone with contrasts; give a sample; write the prompt in that tone |
| "AI-sounding" clichés | Default style | Ban specific phrases; give voice samples |
| Repetitive phrasing | Long generation, low diversity | Raise temperature slightly; frequency penalty; ask for varied structure |
| Starts with "Sure! Here's…" | No format constraint | "Begin directly with…"; prefill; strip in code |
| Ignores one instruction | Too many rules; buried instruction | Number & prioritize rules; put critical ones at the end; split into a chain |
| Follows examples too literally | Examples too similar | Diversify; "examples show format only" |
| Different answer every time | Temperature too high; ambiguous prompt | Lower temperature; more specific prompt; structured output |
| Agrees with my wrong assumption | Leading question / sycophancy | Ask neutrally; request critique and counterarguments |
| Refuses a legitimate request | Ambiguous intent; missing context | Explain the legitimate purpose and context; rephrase neutrally |

## 🧠 Accuracy & Reasoning

| Symptom | Likely cause | Fix |
|---|---|---|
| Made-up facts / citations | No grounding; pressure to answer | Provide sources; allow "I don't know"; quote-first; verify citations |
| Wrong math | Mental arithmetic | Step-by-step; code execution / calculator tool |
| Wrong multi-step logic | No thinking room | CoT; decomposition; reasoning model |
| Outdated info | Knowledge cutoff | Provide current data; search tool; include today's date |
| Misread a long document | Lost in the middle; question placed first | Docs first, question last; quote extraction; RAG |
| Confuses multiple documents | No labels | Wrap each in tags with source/index metadata |

## 🧱 Format & Parsing

| Symptom | Likely cause | Fix |
|---|---|---|
| Invalid JSON | Free-form generation | Structured outputs / tool schema; prefill `{`; validate & retry |
| JSON wrapped in code fences | Default markdown habit | "Raw JSON only"; strip fences in code |
| Wrong labels ("Positive" vs "positive") | No enum | Enums in schema; exact label list; normalize in code |
| Cut off mid-sentence | `max_tokens` reached | Raise limit; check `stop_reason`; ask for shorter output |
| Markdown appears in plain-text UI | Prompt written in markdown | "Plain text only"; write prompt in prose; strip in code |

## 🔗 RAG & Agents

| Symptom | Likely cause | Fix |
|---|---|---|
| "I don't know" though answer exists | Retrieval miss | Log retrieved chunks; hybrid search; query rewrite; bigger k; better chunking |
| Answers from outside knowledge | Weak grounding | "Only use documents"; quote-first; lower temperature |
| Agent loops forever | No stopping rule | Max steps; clear done criteria; detect repeated calls |
| Wrong tool chosen | Vague tool descriptions; overlapping tools | Clarify "use when / not when"; merge tools |
| Bad tool arguments | Unclear parameter docs | Describe formats with examples; enums; return helpful errors |
| Agent followed instructions from a web page | Indirect injection | Untrusted-data labels; least privilege; approvals; quarantine pattern |

## ⚙️ API & Operations

| Symptom | Likely cause | Fix |
|---|---|---|
| 401/403 | Bad key / permissions | Check env var, key scope, org/project |
| 400 | Invalid parameters / too long | Read error message; check model name, token limits, message format |
| 429 | Rate limit | Backoff with jitter; request limit increase; batch |
| 5xx / overloaded | Provider issue | Retry; fallback model/provider |
| Slow responses | Long outputs; big model; long prompts | Stream; smaller model; shorter output; caching; parallelize |
| Costs exploding | Long histories; big model everywhere; verbose outputs | Summarize history; route to smaller models; cache; cap output |
| Quality dropped after model update | Model behavior changed | Run eval suite; adapt prompt; pin model versions |

---

## 🧭 Universal Debugging Procedure

1. **Reproduce** with the exact prompt, model and parameters (check your logs).
2. **Isolate** — is it the prompt, the context/data, the model, or your code?
3. **Ask the model**: *"Which part of my instructions was unclear or conflicting?"*
4. **Change one thing**, re-run on the full test set.
5. **Add the case** to your eval set so it never regresses.

---

> © 2026 **Vicky Prasad Mahato** · [abvicky.in](https://abvicky.in)
