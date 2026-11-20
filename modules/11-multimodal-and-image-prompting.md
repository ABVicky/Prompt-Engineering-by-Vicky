# 🖼️ Module 11 — Multimodal & Image-Generation Prompting

> 🟣 Stage 3 · Advanced · ⏱️ ~2.5 hours

## 🎯 Learning Objectives

- Prompt **vision models** to analyze images, screenshots, charts, and documents
- Write effective prompts for **image generation** (subject, style, composition, lighting, negative prompts)
- Prompt **audio** (speech-to-text, text-to-speech, music) and **video** models
- Understand responsible use: likeness, copyright, and disclosure

---

## Part A — Vision (Image *Understanding*)

### 1. What vision models can do

| Task | Example prompt |
|---|---|
| Describe | "Describe this photo for a visually impaired reader in 3 sentences." |
| Extract (OCR+) | "Extract all line items from this receipt as JSON." |
| Chart reading | "What trend does this chart show? Give the approximate peak value and month." |
| UI review | "List usability issues in this app screenshot, ordered by severity." |
| Compare | "Spot every difference between image 1 and image 2." |
| Diagnose (non-medical) | "What's likely wrong with this plant based on the leaves?" |
| Code from image | "Convert this hand-drawn wireframe into HTML + Tailwind." |

### 2. Vision prompting tips

1. **Put the image before the question** (often works better) and refer to it explicitly: "In the image above…"
2. **Label multiple images**: "Image 1: before. Image 2: after."
3. **Ask for observation before interpretation**: "First list what you see, then explain what it means."
4. **Request structure** for extraction (JSON schema, Module 06).
5. **Crop/zoom** small text; use adequate resolution — tiny text is a common failure.
6. **Verify counts and fine details** — models can miscount objects or misread small numbers.

```python
# Sending an image (Anthropic SDK, base64)
import base64, anthropic
img = base64.standard_b64encode(open("receipt.jpg", "rb").read()).decode()
resp = anthropic.Anthropic().messages.create(
    model="claude-sonnet-5-5", max_tokens=800,
    messages=[{"role": "user", "content": [
        {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": img}},
        {"type": "text", "text": "Extract merchant, date, line items and total as JSON. Use null if unreadable."},
    ]}],
)
print(resp.content[0].text)
```

### 3. Documents & PDFs
Many models accept PDFs directly (text + page images). Prompt them like long-context documents: ask for page citations, quote-then-answer, and tables as JSON/markdown.

---

## Part B — Image *Generation*

Text-to-image models (e.g., Midjourney, DALL·E / GPT image models, Imagen, Stable Diffusion/SDXL/Flux, Firefly, Ideogram) respond to a different kind of prompt: **visual description**, not instructions.

### 4. The image prompt formula

```text
[Subject] + [Action/Details] + [Setting] + [Style/Medium] + [Composition/Camera] + [Lighting] + [Color/Mood] + [Quality/Technical]
```

| Component | Examples |
|---|---|
| **Subject** | "an elderly tea seller", "a red vintage scooter" |
| **Details/action** | "pouring chai from a height, steam rising" |
| **Setting** | "busy Kolkata street at dawn" |
| **Style/medium** | photorealistic, watercolor, 3D render, flat vector, ukiyo-e, pixel art, isometric |
| **Composition/camera** | close-up, wide shot, bird's-eye, rule of thirds, 35mm lens, shallow depth of field |
| **Lighting** | golden hour, soft diffused, neon rim light, studio softbox |
| **Color/mood** | warm earthy palette, moody teal-orange, pastel, high contrast |
| **Technical** | aspect ratio 16:9, high detail, minimal background |

❌ `a tea seller`
✅ `Photorealistic close-up of an elderly tea seller pouring chai from a height, steam rising, on a busy Kolkata street at dawn, golden-hour backlight, shallow depth of field, 50mm lens, warm earthy tones, 3:2 aspect ratio`

### 5. Style & control techniques

| Technique | How |
|---|---|
| **Negative prompts** | Many diffusion tools accept a separate negative prompt: `blurry, extra fingers, watermark, text`. For models without it, describe what you want instead. |
| **Weights** | Some tools support emphasis (e.g., `(neon:1.3)` in SD UIs, `::2` in Midjourney). |
| **Reference images** | Image-to-image, style references, character references for consistency. |
| **Seeds** | Fix the seed to reproduce / vary one element at a time. |
| **Iterate** | Change one attribute per iteration; keep a prompt log. |
| **Text in images** | Put exact text in quotes: `a sign that reads "OPEN 24/7"`; newer models handle this much better. |
| **Editing / inpainting** | Describe only the change: "replace the sky with a stormy sunset; keep everything else identical." |

### 6. Using an LLM to write image prompts

```text
You are an expert prompt writer for text-to-image models.
Turn my idea into 3 detailed prompts in different styles (photo, watercolor,
3D render). Each ≤ 60 words, covering subject, setting, composition, lighting,
mood. Idea: "a robot teaching kids in a village school"
```

---

## Part C — Audio & Video

### 7. Speech-to-text (transcription)
Provide a **vocabulary/context prompt** to improve accuracy on names and jargon: *"Speakers: Vicky Prasad Mahato, Dr. Iyer. Terms: RAG, LangChain, pgvector."* Ask for speaker labels and timestamps if supported.

### 8. Text-to-speech & voice agents
- Write for the ear: short sentences, no tables/URLs/emojis, spell out numbers when needed.
- Many TTS systems accept **style instructions** ("calm, warm, slightly slow") or markup (SSML) for pauses and emphasis.
- Voice-agent system prompts: keep turns short, confirm critical details back ("That's 4 people at 8 pm, correct?").

### 9. Music & sound generation
Describe **genre, mood, tempo (BPM), instruments, structure, duration**: *"Lo-fi hip-hop, 80 BPM, mellow Rhodes piano, vinyl crackle, soft drums, 2 minutes, calm study mood."*

### 10. Video generation
Add **motion and camera**: subject + action + setting + camera movement (slow dolly-in, drone shot, handheld) + duration + style + lighting. Keep one main action per shot; generate shots separately and edit together.

```text
A slow dolly-in on a ceramic cup of masala chai on a wooden table by a rainy
window, steam curling upward, soft morning light, cozy mood, cinematic, 6 seconds.
```

---

## 11. Responsible Multimodal Use

- 🚫 Don't generate deceptive images of real people (deepfakes) or impersonate real brands.
- © Avoid prompts that copy living artists' signature styles for commercial work; check each tool's licensing terms.
- 🏷️ Disclose AI-generated media where required or expected; many tools add provenance metadata (C2PA) or watermarks.
- 🔒 Don't upload sensitive images (IDs, medical scans, private photos) to tools without checking data policies.

---

## 🔑 Key Takeaways

- **Vision:** image first, refer explicitly, observe then interpret, structure extraction, verify fine details.
- **Image generation:** describe the picture — subject, setting, style, composition, lighting, mood, technical.
- Iterate **one attribute at a time**; use seeds, references and negative prompts.
- **Audio/video:** write for the ear; describe motion and camera; one action per shot.
- Use multimodal AI **responsibly**.

---

## 🏋️ Exercises

**11.1 — Image prompt.** Write a prompt for a website hero image for a "Prompt Engineering Bootcamp".

<details>
<summary>✅ Sample solution</summary>

`Modern flat-vector illustration of a diverse group of young learners at laptops, glowing speech bubbles flowing from the screens forming a neural-network pattern, deep indigo to violet gradient background with cyan and pink accents, clean minimal composition with empty space on the left for headline text, soft glow lighting, 16:9, crisp vector style, no text`

</details>

**11.2 — Vision extraction.** Write a prompt to extract a table from a photo of a printed timetable.

<details>
<summary>✅ Sample solution</summary>

"The image shows a printed class timetable. First, describe its layout (rows = ?, columns = ?). Then output it as a markdown table, preserving every cell exactly. Mark unreadable cells as `[?]`. Don't infer missing values."

</details>

---

## ✅ Quick Quiz

1. Should image-generation prompts be written as instructions or descriptions?
2. What is a negative prompt?
3. Give two tips for improving transcription accuracy.
4. Why fix a seed when iterating on images?

<details>
<summary>Show answers</summary>

1. **Descriptions** of the desired picture.
2. A list of things the image should *not* contain (supported by many diffusion tools).
3. Provide names/jargon in a context prompt; use good audio quality; request speaker labels.
4. To isolate the effect of a single prompt change.

</details>

---

> © 2026 **Vicky Prasad Mahato** · [abvicky.in](https://abvicky.in)
> ⬅️ [Module 10](10-tool-use-and-agents.md) · ➡️ [Module 12 — Model Parameters, APIs & Cost](12-parameters-apis-and-cost.md)
