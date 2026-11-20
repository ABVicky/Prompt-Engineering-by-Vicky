# 🔗 Appendix G — Resources, Papers & Practice Plan

> This guide is designed to be complete on its own. This appendix lists the primary sources behind its ideas, for when you want to go deeper or check a claim.

---

## 📘 Official Provider Guides (keep these bookmarked)

| Source | What you'll find |
|---|---|
| **Anthropic** — Prompt engineering docs, Claude Cookbooks, interactive prompt engineering tutorial | Clear/direct prompting, XML tags, prefill, chaining, long context, tool use, extended thinking |
| **OpenAI** — Prompt engineering guide, Cookbook, Structured Outputs & function calling docs | Strategies, JSON schemas, reasoning model guidance, evals |
| **Google** — Gemini API prompting strategies, Vertex AI prompt design docs, "Prompt Engineering" whitepaper | Prompt design, multimodal prompting, structured output |
| **Meta / Mistral / others** — model cards and prompting guides | Open-model chat templates and system prompts |
| **Model Context Protocol** — modelcontextprotocol.io | Spec, SDKs, server examples |
| **OWASP GenAI Security Project** — Top 10 for LLM Applications | LLM security risks & mitigations |
| **NIST AI RMF** | Responsible AI risk management |

> Search for these by name; URLs change, names don't.

---

## 📄 Landmark Papers (the "why" behind the techniques)

| Year | Paper | Technique | Module |
|---|---|---|---|
| 2017 | Vaswani et al., *Attention Is All You Need* | Transformer | 01 |
| 2020 | Brown et al., *Language Models are Few-Shot Learners* | Few-shot / in-context learning | 04 |
| 2020 | Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* | RAG | 09 |
| 2022 | Ouyang et al., *Training language models to follow instructions with human feedback* | RLHF / InstructGPT | 01 |
| 2022 | Bai et al., *Constitutional AI* | RLAIF | 01 |
| 2022 | Wei et al., *Chain-of-Thought Prompting Elicits Reasoning in LLMs* | CoT | 05 |
| 2022 | Kojima et al., *Large Language Models are Zero-Shot Reasoners* | "Let's think step by step" | 05 |
| 2022 | Wang et al., *Self-Consistency Improves Chain of Thought Reasoning* | Self-consistency | 05 |
| 2022 | Zhou et al., *Least-to-Most Prompting* | Decomposition | 05 |
| 2022 | Yao et al., *ReAct: Synergizing Reasoning and Acting* | ReAct agents | 10 |
| 2022 | Zhou et al., *Large Language Models Are Human-Level Prompt Engineers* | APE | 17 |
| 2022 | Gao et al., *PAL: Program-aided Language Models* | Program-of-thought | 05 |
| 2023 | Yao et al., *Tree of Thoughts* | ToT | 05 |
| 2023 | Zheng et al., *Take a Step Back* | Step-back prompting | 05 |
| 2023 | Dhuliawala et al., *Chain-of-Verification Reduces Hallucination* | CoVe | 05 |
| 2023 | Liu et al., *Lost in the Middle* | Long-context position effects | 09 |
| 2023 | Greshake et al., *Not what you've signed up for* | Indirect prompt injection | 14 |
| 2023 | Yang et al., *Large Language Models as Optimizers* | OPRO | 17 |
| 2023 | Khattab et al., *DSPy* | Programmatic prompt optimization | 17 |
| 2023 | Zheng et al., *Judging LLM-as-a-Judge with MT-Bench* | LLM-as-judge & biases | 13 |
| 2023 | Shinn et al., *Reflexion* | Self-reflection agents | 05 |
| 2024 | Schulhoff et al., *The Prompt Report: A Systematic Survey of Prompting Techniques* | Taxonomy of 50+ techniques | all |

---

## 🛠️ Tools by Category

| Category | Examples |
|---|---|
| Chat & playgrounds | Claude.ai / Anthropic Console, ChatGPT / OpenAI Playground, Google AI Studio |
| Local models | Ollama, LM Studio, llama.cpp, vLLM |
| Frameworks | LangChain, LlamaIndex, DSPy, Haystack, Semantic Kernel, provider Agent SDKs |
| Vector DBs | pgvector, Chroma, Qdrant, Weaviate, Pinecone, FAISS, Milvus |
| Evaluation | promptfoo, OpenAI Evals, DeepEval, Ragas, Braintrust |
| Observability | Langfuse, LangSmith, Arize Phoenix, Helicone, OpenTelemetry |
| Low-code automation | n8n, Make, Zapier, Flowise, Langflow, Dify |
| Image/video/audio | Midjourney, GPT image models, Imagen, Stable Diffusion/Flux, Firefly, Ideogram, Runway, Veo, Sora-style models, ElevenLabs, Whisper |
| Security | Prompt-injection classifiers, guardrail libraries (e.g., NeMo Guardrails, Guardrails AI), garak / PyRIT for red-teaming |

> Tools change quickly, so choose by the **pattern** you need (Modules 08–15), not by hype.

---

## 🗓️ Daily Practice Routine (15 minutes)

| Minute | Activity |
|---|---|
| 0–3 | Pick a real task from your day |
| 3–8 | Write a prompt using the R-T-C-I-E-F framework |
| 8–12 | Run it; critique the output against the cheat sheet |
| 12–15 | Improve one thing; log the change in your prompt journal |

Weekly: take one prompt you use often and build a 10-case mini eval for it.
Monthly: re-take the Final Exam (Appendix D) and one new capstone level.

---

## 🧾 Prompt Journal Template

```markdown
### {{date}} — {{task}}
**Model:** {{model}} · **Params:** temp {{t}}
**Prompt v1:** …
**Result:** what went well / wrong
**Change:** (one thing)
**Prompt v2:** …
**Result:** …
**Lesson:** …
```

---

> Author: **Vicky** ([abvicky.in](https://abvicky.in)) · Platform built by [Manikarnika Technologies](https://www.manikarnikatechnologies.in/) · © 2026 All rights reserved.
