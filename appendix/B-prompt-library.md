# 📚 Appendix B — Prompt Pattern Library (60 Templates)

> Copy, fill the `{{variables}}`, test, adapt. Each template follows the principles from this guide.

> 👔 **Non-Tech Track Favorites:** Writing & Editing (#7–12), Summarizing & Extracting (#13–18), Analysis & Strategy (#19–24), Business & Marketing (#37–42), Personal Productivity (#55–60).
> 💻 **Tech Track Favorites:** Code Generation & Review (#25–30), Data & SQL (#31–36), Meta-Prompting (#49–54), and Structured Schema Extraction (#13, #17).

**Contents:** [Thinking & Learning](#-thinking--learning) · [Writing](#-writing--editing) · [Summarizing & Extracting](#-summarizing--extracting) · [Analysis & Decisions](#-analysis--decisions) · [Code](#-code) · [Data](#-data) · [Business & Marketing](#-business--marketing) · [Education](#-education) · [Meta-Prompts](#-meta-prompts) · [Personal](#-personal-productivity)

---

## 🧠 Thinking & Learning

**1. Explain like I'm…**
```text
Explain {{concept}} to {{audience, e.g. a 12-year-old / a CFO / a nurse}}.
Use one analogy from {{their world}}, avoid jargon, under {{N}} words.
End with one question to check understanding.
```

**2. Deep-dive tutor**
```text
Teach me {{topic}} in layers: (1) one-sentence summary, (2) one paragraph,
(3) detailed explanation with an example, (4) common misconceptions,
(5) 3 practice questions with hidden answers.
```

**3. Socratic coach**
```text
I'm trying to understand {{topic}}. Don't explain directly. Ask me one
question at a time to lead me to the insight. If I'm wrong, ask a simpler
question. Start now.
```

**4. Compare & contrast**
```text
Compare {{A}} and {{B}} in a table on: {{criteria list}}. Then explain when to
choose each in 2 sentences, and one common mistake people make choosing.
```

**5. Mental models**
```text
Which 3 mental models best help analyze {{situation}}? For each: what it is,
how it applies here, and what it suggests I do.
```

**6. Steelman**
```text
Present the strongest possible argument FOR {{position}} and then the
strongest argument AGAINST it, as their best advocates would. Then list
the key factual questions that would settle the debate.
```

---

## ✍️ Writing & Editing

**7. Draft in my voice**
```text
<my_samples>{{2–3 samples of my writing}}</my_samples>
Write a {{type}} about {{topic}} for {{audience}} in my voice. {{length}}.
Avoid clichés and these words: {{banned}}.
```

**8. Tighten**
```text
Cut this text by {{30}}% without losing any key information or changing my
tone. Return only the revised text.
<text>{{text}}</text>
```

**9. Tone shifter**
```text
Rewrite this message to be {{more diplomatic / more direct / warmer}}
while keeping the same request and facts.
<message>{{message}}</message>
```

**10. Headline generator**
```text
Write 10 headlines for {{article summary}}, for {{platform}}. Use 5 different
angles (curiosity, benefit, number, how-to, contrarian), 2 each. Max 65 chars.
Mark your top 2 with ⭐ and explain why.
```

**11. Email reply**
```text
Draft a reply to the email below. My goal: {{goal}}. Key points to include:
{{points}}. Tone: {{tone}}. Max {{N}} words. Don't commit to anything not listed.
<email>{{email}}</email>
```

**12. Proofread with explanations**
```text
Proofread the text. List each change as: original → corrected (rule).
Don't change style, only errors. Then give the corrected text.
<text>{{text}}</text>
```

**13. Outline first**
```text
Create a detailed outline for a {{length}} {{piece}} on {{topic}} for
{{audience}}: H2/H3 headings, key point per section, and where examples or
data are needed. Wait for my approval before drafting.
```

**14. Storytelling**
```text
Write a {{genre}} short story (~{{N}} words) about {{premise}}. POV: {{pov}}.
Include: a vivid opening image, a turning point, and an ending that
{{surprises / resolves / leaves open}}. Show, don't tell.
```

---

## 📄 Summarizing & Extracting

**15. Executive summary**
```text
Summarize for a busy executive: 1 headline sentence, 3 key points with
numbers, 1 risk, 1 recommended action. Max 120 words. Use only the document.
<document>{{doc}}</document>
```

**16. Meeting notes → actions**
```text
From the transcript, extract JSON:
{"decisions": [], "action_items": [{"owner": "", "task": "", "due": ""}],
 "open_questions": []}
Use "UNASSIGNED" if no owner. Only include items explicitly discussed.
<transcript>{{transcript}}</transcript>
```

**17. Structured extraction**
```text
Extract these fields as JSON: {{schema}}. Use null when missing. Don't infer.
<text>{{text}}</text>
```

**18. Quote-grounded Q&A**
```text
<documents>{{docs}}</documents>
Find quotes relevant to the question and put them in <quotes>. Then answer in
<answer> using only those quotes, citing [doc #]. If not answerable, say so.
Question: {{question}}
```

**19. Multi-document synthesis**
```text
Synthesize the documents: where do they agree, where do they disagree, and
what does none of them address? Cite each point.
<documents>{{docs}}</documents>
```

**20. Progressive summary**
```text
Summarize at three levels: (1) 1 sentence, (2) 1 paragraph, (3) bullet list of
every key point with supporting details.
<text>{{text}}</text>
```

---

## 🔎 Analysis & Decisions

**21. Decision matrix**
```text
Help me decide between {{options}}. Criteria and weights: {{criteria}}.
Score each option 1–5 per criterion with a one-line justification, compute
weighted totals in a table, then note what would change the decision.
```

**22. Pre-mortem**
```text
It's 12 months from now and {{project}} has failed. Write the 7 most likely
reasons it failed, ranked by likelihood × impact, each with an early warning
sign and a preventive action.
```

**23. SWOT**
```text
Do a SWOT analysis of {{business/product}} given: {{context}}. 3–5 items per
quadrant, each specific to this situation (no generic items). Then 3 strategic
moves that use strengths to capture opportunities.
```

**24. Root cause (5 Whys)**
```text
Problem: {{problem}}. Apply the 5 Whys, branching where there are multiple
plausible causes. Mark which causes need data to confirm. Suggest a fix for
the most likely root cause.
```

**25. Critique my plan**
```text
Be a tough but fair reviewer. Identify the 5 biggest weaknesses in my plan,
ranked by severity, each with a concrete fix. No reassurance.
<plan>{{plan}}</plan>
```

**26. Scenario planning**
```text
Create best-case, base-case and worst-case scenarios for {{situation}} over
{{timeframe}}: key assumptions, signals to watch, and my best move in each.
```

**27. Fact-check helper**
```text
List every factual claim in the text. For each: what kind of source could
verify it, and your confidence it's accurate (high/med/low) with reason.
Don't state verdicts as certain.
<text>{{text}}</text>
```

---

## 💻 Code

**28. Implement feature**
```text
Context: {{language/version, framework, conventions}}
Task: {{feature}}
Acceptance criteria: {{criteria}}
Constraints: {{don't change X, no new deps}}
<relevant_code>{{code}}</relevant_code>
Outline the approach first, then code, then tests.
```

**29. Debug**
```text
Error: <error>{{stack trace}}</error>
Code: <code>{{code}}</code>
Expected {{x}}, got {{y}}. Tried: {{attempts}}.
Explain the root cause, then the minimal fix.
```

**30. Code review**
```text
Review as a senior engineer: security > correctness > performance >
readability. For each issue: severity, line, problem, fix.
<diff>{{diff}}</diff>
```

**31. Explain code**
```text
Explain this code to a {{junior developer}}: purpose, step-by-step flow,
non-obvious parts, potential bugs or edge cases.
<code>{{code}}</code>
```

**32. Write tests**
```text
Write {{pytest/jest}} tests for this function covering: normal cases, edge
cases (empty, null, max size), and error cases. Explain any case you think
reveals a bug.
<code>{{code}}</code>
```

**33. Refactor**
```text
Refactor for readability and maintainability without changing behavior.
List each change and why. Keep the public interface identical.
<code>{{code}}</code>
```

**34. Regex builder**
```text
Write a regex ({{flavor}}) that matches {{description}}. Explain each part,
then give 5 strings that should match and 5 that shouldn't.
```

**35. Convert code**
```text
Convert this {{source language}} code to idiomatic {{target language}}.
Note any behavior differences (e.g., integer division, null handling).
<code>{{code}}</code>
```

**36. Documentation**
```text
Write a README for this project: one-line description, features, install,
quick start, configuration table, examples, troubleshooting, license.
<code_and_notes>{{info}}</code_and_notes>
```

---

## 📊 Data

**37. Analysis plan + code**
```text
Dataset columns: {{schema}}. Sample: {{rows}}. Question: {{question}}.
Give: analysis plan, pandas code with comments, chart suggestions, caveats.
```

**38. SQL writer**
```text
Schema: <schema>{{DDL}}</schema>
Write a {{dialect}} query to {{question}}. Explain each clause and give 2 test
cases with expected output.
```

**39. Data cleaning**
```text
Here's a sample of messy data: {{sample}}. Identify all data-quality issues
(types, duplicates, formats, outliers, missing) and write code to fix each.
```

**40. Insight narrative**
```text
Turn these metrics into a 150-word narrative for {{audience}}: what changed,
why it likely changed (label as hypothesis), and what to do next.
<metrics>{{metrics}}</metrics>
```

**41. Spreadsheet formula**
```text
Write a {{Excel/Google Sheets}} formula that {{goal}}. Data is in {{ranges}}.
Explain it and give an example result.
```

---

## 💼 Business & Marketing

**42. Customer persona**
```text
Create 3 customer personas for {{product}} from this research: {{notes}}.
For each: name, demographics, goals, pains, objections, channels, a quote.
```

**43. Ad copy variations**
```text
Write 5 {{platform}} ads for {{product}} targeting {{persona}}, each a
different angle (pain, aspiration, proof, urgency, curiosity). Headline ≤ 40
chars, body ≤ 125 chars, CTA. No unverifiable claims.
```

**44. Landing page**
```text
Write landing page copy for {{product}}: hero headline + subhead, 3 benefits,
how it works (3 steps), social proof placeholders, FAQ (5), final CTA.
Audience: {{audience}}. Voice: {{voice}}.
```

**45. SEO brief**
```text
Create an SEO content brief for the keyword "{{keyword}}": search intent,
target reader, outline (H2/H3), questions to answer, related terms, word count.
```

**46. Sales email sequence**
```text
Write a 4-email cold outreach sequence for {{offer}} to {{role}} at
{{company type}}. Each < 100 words, personal, one clear CTA, different value
angle each time. Include subject lines.
```

**47. Customer support reply**
```text
Reply using only <policy> and <order>. Acknowledge → solution steps → timeline
→ close. Max 120 words. Empathetic, no blame.
<policy>{{policy}}</policy><order>{{order}}</order><message>{{msg}}</message>
```

**48. Job description**
```text
Write an inclusive JD for {{role}}: mission, responsibilities (5–7), must-haves
(≤5), nice-to-haves, salary {{range}}, benefits. Avoid gender-coded language.
```

**49. Interview questions**
```text
Create 8 behavioral interview questions for {{competency}} for a {{role}},
each with what a strong / average / weak answer looks like.
```

---

## 🎓 Education

**50. Lesson plan**
```text
Create a {{duration}} lesson plan on {{topic}} for {{grade/board}}: objectives,
hook, explanation, activity, assessment, differentiation.
```

**51. Quiz generator**
```text
Create {{N}} multiple-choice questions on {{topic}} at {{difficulty}}: 4
options each, one correct, plausible distractors, answer key with explanations.
```

**52. Rubric**
```text
Create a 4-level rubric (Excellent/Good/Developing/Beginning) for {{assignment}}
with criteria: {{criteria}}. Describe observable evidence for each cell.
```

**53. Feedback on student work**
```text
Give feedback on this {{essay}} for a {{grade}} student: 2 specific strengths,
2 priority improvements with examples of how, 1 encouraging closing line.
<work>{{text}}</work>
```

---

## 🧙 Meta-Prompts

**54. Prompt generator**
```text
Write a production-quality prompt for: {{task}}. Include role, task, context,
{{variables}}, constraints with reasons, output format, edge-case handling.
Then list 5 test inputs including 2 edge cases.
```

**55. Prompt critic**
```text
Score this prompt 1–5 on clarity, specificity, context, structure, format,
robustness, safety. Fix each weakness and output the improved prompt.
<prompt>{{prompt}}</prompt>
```

**56. Clarify-first**
```text
Before doing the task below, ask me up to 5 questions whose answers would most
improve your output. Wait for my answers.
Task: {{task}}
```

**57. LLM-as-judge**
```text
Grade the response against the rubric. Reason first, then score.
<rubric>{{rubric}}</rubric><response>{{response}}</response>
Output JSON: {"reasoning": "", "score": 1-5}
```

**58. Test-case generator**
```text
Generate {{N}} diverse test inputs for this prompt: 60% typical, 25% edge
cases, 15% adversarial. Output JSONL with fields input, expected_behavior, tag.
<prompt>{{prompt}}</prompt>
```

---

## 🗂️ Personal Productivity

**59. Weekly planner**
```text
Tasks: {{tasks}}. Fixed events: {{events}}. Energy peaks: {{times}}.
Prioritize (Eisenhower), then time-block my week with buffers. Flag what won't
fit and suggest what to drop or delegate.
```

**60. Learning roadmap**
```text
Create a {{weeks}}-week roadmap to learn {{skill}} from {{level}} to {{goal}},
{{hours}}/week. Weekly objectives, resources types, a mini-project per week,
and how to measure progress.
```

---

> Author: **Vicky** ([abvicky.in](https://abvicky.in)) · Platform built by [Manikarnika Technologies](https://www.manikarnikatechnologies.in/) · © 2026 All rights reserved.
