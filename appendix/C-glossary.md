# 📖 Appendix C — Glossary

> Every term used in the course, A–Z. The module number shows where it's covered in depth.

> 👔 **Non-Tech Focus Terms:** Prompt, Persona, Few-Shot, Delimiter, Hallucination, Grounding, Custom Instructions, Temperature, and Document Q&A.
> 💻 **Tech Focus Terms:** Embeddings, Attention, Autoregressive logits, KV-Cache, JSON Schema, Function Calling, ReAct loop, MCP, Cosine Similarity, and G-Eval.

| Term | Definition | Module |
|---|---|---|
| **Agent** | An LLM that uses tools in a loop, deciding its own next steps toward a goal | 10 |
| **Alignment** | Training a model to behave according to human intentions and values (helpful, honest, harmless) | 01 |
| **APE** | Automatic Prompt Engineer — LLM-generated candidate prompts selected by score | 17 |
| **API** | Application Programming Interface — how your code calls a model | 12 |
| **Assistant message** | A message with the `assistant` role: the model's reply (or a prefill you write) | 02 |
| **Attention** | Mechanism letting each token weigh the relevance of every other token | 01 |
| **Autoregressive** | Generating one token at a time, each conditioned on previous tokens | 01 |
| **Base model** | Pre-trained model without instruction tuning; continues text rather than following instructions | 01 |
| **Batch API** | Asynchronous bulk processing, usually discounted | 12 |
| **BM25** | Classic keyword-ranking algorithm used in search, often combined with vectors (hybrid search) | 09 |
| **Chain-of-Thought (CoT)** | Prompting the model to reason step by step before answering | 05 |
| **Chain-of-Verification (CoVe)** | Draft → plan verification questions → answer them → revise | 05 |
| **Chunking** | Splitting documents into passages for embedding and retrieval | 09 |
| **Context engineering** | Designing what information enters the context window, in what form and order | 09 |
| **Context window** | Maximum tokens (input + output) a model can process in one call | 01 |
| **Contextual chunking** | Prepending document/section context to each chunk before embedding | 09 |
| **Delimiter** | Marker separating instructions from data (XML tags, triple quotes, headings) | 02 |
| **Distillation** | Training a smaller model to imitate a larger one | 15 |
| **DSPy** | Framework that programs LLM pipelines declaratively and optimizes prompts against metrics | 17 |
| **Embedding** | Vector of numbers representing meaning of text; similar meanings → nearby vectors | 01, 09 |
| **Eval / evaluation set** | Collection of test inputs with expected outputs or rubrics | 13 |
| **Evaluator-optimizer** | Workflow where one prompt generates and another critiques in a loop | 08 |
| **Excessive agency** | Security risk where an AI system has more permissions than needed | 14 |
| **Few-shot** | Prompting with a few input→output examples | 04 |
| **Fine-tuning** | Further training a model on your data to change its behavior | 09, 15 |
| **Function calling** | See *tool use* | 10 |
| **Grounding** | Basing answers on provided sources rather than model memory | 09 |
| **Guardrails** | Controls that constrain inputs, outputs, or actions of an AI system | 10, 14 |
| **Hallucination** | Confident output that is false or unsupported | 01, 14 |
| **HyDE** | Hypothetical Document Embeddings — embed a generated hypothetical answer to improve retrieval | 09 |
| **Hybrid search** | Combining vector (semantic) and keyword search | 09 |
| **In-context learning** | Learning a pattern from examples in the prompt without changing weights | 04 |
| **Indirect prompt injection** | Malicious instructions hidden in content the model processes | 14 |
| **Instruction tuning (SFT)** | Supervised fine-tuning on instruction→response pairs | 01 |
| **Jailbreak** | Technique to bypass a model's safety training | 14 |
| **JSON mode / Structured outputs** | API features that constrain output to valid JSON or a schema | 06 |
| **Least privilege** | Granting only the minimum access needed | 14 |
| **Least-to-most prompting** | Decompose into sub-problems, solve simplest first | 05 |
| **LLM** | Large Language Model | 01 |
| **LLM-as-judge** | Using an LLM to grade outputs against a rubric | 13 |
| **Lost in the middle** | Tendency to under-use information in the middle of long contexts | 09 |
| **max_tokens** | Parameter capping output length | 12 |
| **MCP** | Model Context Protocol — open standard for connecting LLM apps to tools and data | 10 |
| **Meta-prompting** | Using LLMs to write, critique or improve prompts | 17 |
| **Multimodal** | Handling multiple data types: text, images, audio, video | 11 |
| **Negative prompt** | In image generation, what the image should not contain | 11 |
| **Orchestrator-workers** | A planner LLM dispatches sub-tasks to worker calls | 08 |
| **OPRO** | Optimization by PROmpting — LLM iteratively proposes better prompts from scored history | 17 |
| **Parameters (model)** | The learned weights of a neural network (billions in LLMs) | 01 |
| **Parameters (generation)** | Settings like temperature, top-p, max tokens | 12 |
| **Persona** | Character and voice assigned to an assistant | 07 |
| **Prefill** | Writing the beginning of the assistant's response to steer it | 04 |
| **Pre-training** | Initial training on vast text to predict the next token | 01 |
| **Prompt** | Input text (and other content) given to a model | 02 |
| **Prompt caching** | Reusing processed prompt prefixes for cheaper, faster calls | 09, 12 |
| **Prompt chaining** | Linking several prompts, each output feeding the next | 08 |
| **Prompt injection** | Input that hijacks a model's instructions | 14 |
| **Prompt leaking** | Extracting a hidden system prompt | 14 |
| **PromptOps** | Practices for managing prompts in production: versioning, testing, monitoring | 15 |
| **RAG** | Retrieval-Augmented Generation — retrieve relevant documents and include them in the prompt | 09 |
| **ReAct** | Reason + Act — interleaving reasoning with tool actions | 10 |
| **Reasoning model** | Model trained to "think" internally before answering | 05 |
| **Red-teaming** | Deliberately attacking a system to find weaknesses | 14 |
| **Regression testing** | Re-running all tests after a change to catch new failures | 13 |
| **Reranker** | Model that reorders retrieved results by relevance | 09 |
| **RLHF / RLAIF** | Reinforcement Learning from Human / AI Feedback — preference tuning | 01 |
| **Role prompting** | Assigning an identity or expertise to the model | 04 |
| **Routing** | Classifying inputs and sending them to specialized prompts or models | 08 |
| **Seed** | Value for reproducible sampling (where supported) | 11, 12 |
| **Self-consistency** | Sampling several reasoning paths and voting on the answer | 05 |
| **Spotlighting** | Transforming untrusted input to mark it clearly as data | 14 |
| **Step-back prompting** | Asking a general/principle question before the specific one | 05 |
| **Stop sequence** | String that ends generation | 12 |
| **Streaming** | Receiving output tokens as they're generated | 12 |
| **Sycophancy** | Tendency to agree with or flatter the user | 01, 03 |
| **System prompt** | Persistent instructions setting the model's role and rules | 07 |
| **Temperature** | Parameter controlling randomness of sampling | 01, 12 |
| **Token** | Basic unit of text a model processes (≈ ¾ of an English word) | 01 |
| **Tokenizer** | Algorithm splitting text into tokens | 01 |
| **Tool use** | Model outputs structured requests for your code to execute functions | 10 |
| **Top-k** | Sample only from the k most likely tokens | 01 |
| **Top-p (nucleus)** | Sample from the smallest set of tokens whose probability sums to p | 01 |
| **Transformer** | Neural network architecture based on attention, underlying modern LLMs | 01 |
| **Tree of Thoughts (ToT)** | Exploring and evaluating multiple reasoning branches | 05 |
| **Vector database** | Database optimized for similarity search over embeddings | 09 |
| **Zero-shot** | Prompting with instructions only, no examples | 04 |

---

> Author: **Vicky** ([abvicky.in](https://abvicky.in)) · Platform built by [Manikarnika Technologies](https://www.manikarnikatechnologies.in/) · © 2026 All rights reserved.
