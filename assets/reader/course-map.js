/* Course structure for the browser reader.
   Add a new module here (and run build.py) to make it appear in the reader.
   (c) 2026 Manikarnika Technologies - manikarnikatechnologies.in */
window.PE_MAP = {
  title: "Prompt Engineering",
  subtitle: "Zero to Pro",
  author: "Vicky",
  authorFullName: "Vicky Prasad Mahato",
  authorSite: "https://abvicky.in",
  authorLinkedIn: "https://www.linkedin.com/in/abvicky/",
  authorGitHub: "https://github.com/ABVicky",
  avatar: "https://avatars.githubusercontent.com/u/103195071?v=4",
  platformBuilder: "Manikarnika Technologies",
  platformLogo: "https://www.manikarnikatechnologies.in/_next/image?url=%2Ficon_logo.png&w=96&q=75",
  platformLogoLocal: "assets/manikarnika-logo.png",
  platformSite: "https://www.manikarnikatechnologies.in/",
  platformSiteLabel: "manikarnikatechnologies.in",
  copyright: "Manikarnika Technologies",
  copyrightUrl: "https://www.manikarnikatechnologies.in/",
  site: "https://www.manikarnikatechnologies.in/",
  siteLabel: "manikarnikatechnologies.in",
  about: { p: "README.md", n: "i", t: "About this course", i: "📘", d: "Overview, curriculum, how to read, copyright." },
  stages: [
    {
      id: "s1", label: "Stage 1", name: "Foundations",
      d: "How LLMs work and how to write clear, complete prompts.",
      items: [
        { p: "modules/00-welcome.md", n: "00", t: "Welcome & How to Use This Course", i: "🚀", time: "30 min", d: "Roadmap, practice lab setup, study plans and the pro mindset." },
        { p: "modules/01-how-llms-work.md", n: "01", t: "How Large Language Models Work", i: "🧠", time: "2 h", d: "Tokens, context windows, attention, temperature and limits." },
        { p: "modules/02-anatomy-of-a-prompt.md", n: "02", t: "Anatomy of a Prompt", i: "🧩", time: "1.5 h", d: "Role, task, context, input, examples and format." },
        { p: "modules/03-core-principles.md", n: "03", t: "Core Principles", i: "📏", time: "2 h", d: "The 12 principles behind every effective prompt." },
        { p: "modules/04-zero-few-shot-and-roles.md", n: "04", t: "Zero-Shot, Few-Shot & Roles", i: "🎭", time: "2 h", d: "Examples, personas, prefilling and output priming." }
      ]
    },
    {
      id: "s2", label: "Stage 2", name: "Intermediate",
      d: "Reasoning, structure, system prompts, chains and context.",
      items: [
        { p: "modules/05-reasoning-techniques.md", n: "05", t: "Reasoning Techniques", i: "🧮", time: "3 h", d: "Chain-of-thought, self-consistency, ToT and reasoning models." },
        { p: "modules/06-structured-output.md", n: "06", t: "Structured Output", i: "🧱", time: "2 h", d: "Reliable JSON, schemas, XML tags, tables and validation." },
        { p: "modules/07-system-prompts-and-conversation.md", n: "07", t: "System Prompts & Conversations", i: "🗣️", time: "2 h", d: "Personas, memory, edge cases and escalation." },
        { p: "modules/08-prompt-chaining-workflows.md", n: "08", t: "Prompt Chaining & Workflows", i: "🔗", time: "2.5 h", d: "Sequential, routing, parallel and evaluator patterns." },
        { p: "modules/09-context-engineering-rag.md", n: "09", t: "Context Engineering & RAG", i: "📚", time: "3 h", d: "Long context, retrieval, grounding and citations." }
      ]
    },
    {
      id: "s3", label: "Stage 3", name: "Advanced",
      d: "Agents, multimodal, APIs, evaluation and security.",
      items: [
        { p: "modules/10-tool-use-and-agents.md", n: "10", t: "Tool Use & Agents", i: "🤖", time: "3.5 h", d: "Function calling, agent loops, MCP and guardrails." },
        { p: "modules/11-multimodal-and-image-prompting.md", n: "11", t: "Multimodal & Image Prompting", i: "🖼️", time: "2.5 h", d: "Vision, image, audio and video generation prompts." },
        { p: "modules/12-parameters-apis-and-cost.md", n: "12", t: "Parameters, APIs & Cost", i: "⚙️", time: "2.5 h", d: "Sampling settings, SDKs, streaming, cost and latency." },
        { p: "modules/13-evaluation-and-testing.md", n: "13", t: "Evaluation & Testing", i: "📊", time: "3 h", d: "Test sets, graders, LLM-as-judge and metrics." },
        { p: "modules/14-safety-security-ethics.md", n: "14", t: "Safety, Security & Ethics", i: "🛡️", time: "3 h", d: "Prompt injection, jailbreaks, hallucinations, responsible AI." }
      ]
    },
    {
      id: "s4", label: "Stage 4", name: "Pro",
      d: "Production practice, domain playbooks and your career.",
      items: [
        { p: "modules/15-production-promptops.md", n: "15", t: "Production PromptOps", i: "🏭", time: "3 h", d: "Versioning, templates, observability and migrations." },
        { p: "modules/16-domain-playbooks.md", n: "16", t: "Domain Playbooks", i: "🧭", time: "4 h", d: "Code, writing, marketing, data, research, education and more." },
        { p: "modules/17-becoming-a-pro.md", n: "17", t: "Becoming a Pro", i: "🌟", time: "2.5 h", d: "Meta-prompting, optimization, portfolio and interviews." }
      ]
    },
    {
      id: "ref", label: "Reference", name: "Appendices",
      d: "Cheat sheet, templates, glossary, exam and projects.",
      items: [
        { p: "appendix/A-cheat-sheet.md", n: "A", t: "Cheat Sheet", i: "📋", time: "ref", d: "The one-page checklist, technique picker and anti-patterns." },
        { p: "appendix/B-prompt-library.md", n: "B", t: "Prompt Library", i: "🧰", time: "ref", d: "60 ready-to-use templates across 10 categories." },
        { p: "appendix/C-glossary.md", n: "C", t: "Glossary", i: "📖", time: "ref", d: "90+ terms from A to Z, linked to modules." },
        { p: "appendix/D-final-exam.md", n: "D", t: "Final Exam", i: "🎓", time: "1 h", d: "40 questions and 5 practical tasks with answers." },
        { p: "appendix/E-capstone-projects.md", n: "E", t: "Capstone Projects", i: "🏆", time: "project", d: "Six portfolio projects with levels and success criteria." },
        { p: "appendix/F-troubleshooting.md", n: "F", t: "Troubleshooting", i: "🩺", time: "ref", d: "Symptom, cause and fix for common prompt problems." },
        { p: "appendix/G-resources.md", n: "G", t: "Resources & Papers", i: "🔗", time: "ref", d: "Official guides, landmark papers, tools and practice plan." }
      ]
    }
  ]
};