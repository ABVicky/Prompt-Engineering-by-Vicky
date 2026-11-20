# 🖼️ Module 11 — Multimodal & Image-Generation Prompting

> 🟣 Stage 3 · Advanced · ⏱️ ~2.5 hours

Imagine two very different creative tasks:

In the first, a friend snaps a blurry photo of a dashboard warning light on their car and asks: *"What does this icon mean, and is it safe to drive home?"* Your job is to inspect the visual details, decipher the symbol, and give practical advice.

In the second, you are directing a commercial photoshoot for a new artisan coffee brand. You don't just tell the photographer: *"Take a picture of coffee."* You describe the exact scene: *"A close-up shot of hot filter coffee being poured into a traditional brass dabarah, morning sunlight cutting through kitchen steam, warm amber tones, 50mm lens with soft background blur."*

The first task is **Vision (Image Understanding)**: teaching an AI to look at an image and extract meaning. 

The second task is **Image Generation**: painting a complete visual world using words.

Modern AI models do both. In this module, you will learn how to extract data from screenshots, receipts, and whiteboard sketches, and how to craft rich text-to-image prompts for tools like Midjourney, DALL-E, and Flux.

---

## 🎯 Learning Objectives

By the end of this module, you will be able to:
- Prompt vision models to accurately transcribe receipts, analyze charts, and convert UI sketches into clean code.
- Apply the **8-part Image Prompt Formula** to produce stunning, predictable image generations.
- Use negative prompts, camera angles, and lighting descriptors to steer image aesthetics.
- Write prompts for audio transcription, text-to-speech voice engines, and AI video generators.
- Follow ethical guidelines regarding synthetic media, deepfakes, and copyright.

---

## Part A — Vision: Image Understanding

Vision models don't just recognize cats and dogs; they act as analytical assistants that inspect documents, user interfaces, diagrams, and physical environments.

| Practical Task | How to prompt the vision model |
|---|---|
| **Receipt / Invoice OCR** | *"Extract every line item, tax rate, and the final total as a clean JSON object."* |
| **Chart Interpretation** | *"Look at this bar chart. State the fastest growing quarter and calculate the percentage increase between Q1 and Q4."* |
| **UI / UX Audit** | *"Review this mobile checkout screenshot. List 3 usability issues that could confuse an elderly user."* |
| **Code from Wireframe** | *"Convert this hand-drawn whiteboard sketch into responsive HTML and Tailwind CSS classes."* |
| **Physical Troubleshooting** | *"Based on the pattern of yellowing leaves on this money plant, identify the two most likely care mistakes."* |

---

## 1. The Rules of High-Accuracy Vision Prompts

Vision models process images by dividing them into visual patches (visual tokens). Small details can get lost if you don't steer the model's focus:

1. **Observe Before Concluding:**
   Force the model to list what it visually sees *before* making an interpretation:
   ```text
   Look at this chest X-ray report.
   Step 1: List all printed headings, bold values, and doctor notes in <observations>.
   Step 2: Summarize the conclusions in plain language in <summary>.
   ```
2. **Crop or Zoom Fine Details:**
   If you have a receipt with tiny 6-point font, crop the photo to focus on the line items before uploading. Blurry or low-resolution text causes high hallucination rates in vision OCR.
3. **Reference Specific Locations:**
   Direct the model's eye: *"Look at the top-right quadrant of the schematic"*, or *"Read the handwritten notes in blue pen at the bottom of the page"*.

```python
# Sending an image via Python (Anthropic Messages API)
import base64
import anthropic

client = anthropic.Anthropic()

with open("sample_receipt.jpg", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read()).decode("utf-8")

response = client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=1000,
    messages=[{
        "role": "user",
        "content": [
            {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": "image/jpeg",
                    "data": encoded_string,
                },
            },
            {
                "type": "text",
                "text": "Extract merchant name, date, invoice total, and items into JSON. Use null if unreadable."
            }
        ],
    }]
)
print(response.content[0].text)
```

---

## Part B — Image Generation

While text models follow conversational instructions, text-to-image models (like Midjourney, DALL-E 3, Flux, and Stable Diffusion) respond to **rich visual descriptions**. 

Telling an image generator *"Make it look nice"* does nothing. You must describe what the camera sees.

### 2. The 8-Part Image Prompt Formula

```text
[Subject] + [Action / Details] + [Setting] + [Style / Medium] + [Composition / Lens] + [Lighting] + [Color Palette] + [Technical Parameters]
```

| Element | What it specifies | Example |
|---|---|---|
| **1. Subject** | The central focus | "An elderly artisan woodworker" |
| **2. Action & Details** | What is happening? | "Carving an intricate floral pattern into a teak panel, wood shavings curling" |
| **3. Setting** | Where does it take place? | "A dusty sunlit workshop in Saharanpur" |
| **4. Style / Medium** | Artistic format | 35mm documentary photography, watercolor, 3D clay render, minimal flat vector |
| **5. Composition** | Camera angle and lens | Eye-level close-up, 85mm portrait lens, shallow depth of field with creamy bokeh |
| **6. Lighting** | Direction and quality of light | Golden-hour window side-lighting, dust motes glowing in sunbeams |
| **7. Color Palette** | Color temperature and mood | Warm walnut browns, muted ochre, earthy terracotta tones |
| **8. Technical** | Aspect ratio and render flags | `--ar 16:9 --v 6.1` (or tool equivalent) |

### Before and After: The Formula in Action

❌ **Weak**
```text
An Indian craftsman working on wood.
```

✅ **Strong**
```text
A documentary-style close-up photograph of an elderly Indian craftsman hand-carving intricate floral jali patterns into dark teak wood in a rustic Saharanpur workshop. Golden afternoon sunlight streams through a side window, illuminating floating sawdust particles. Captured on a 50mm f/1.8 lens, shallow depth of field, warm amber and earthy brown tones, highly detailed wood texture, 16:9 aspect ratio.
```

---

## 3. Controlling Style & Consistency

1. **Negative Prompts:**
   In tools that support negative prompts (like Stable Diffusion or Midjourney `--no`), list what must be avoided:
   `--no text, watermarks, oversaturated colors, cartoon, extra limbs, plastic skin`
2. **Aspect Ratio Control:**
   Always dictate the visual frame for your use case:
   - `--ar 16:9` for website hero banners and presentations.
   - `--ar 9:16` for Instagram Reels, YouTube Shorts, or mobile wallpapers.
   - `--ar 1:1` for profile avatars and product tiles.
3. **Using Text Models as Image Prompt Generators:**
   You don't have to dream up photographic lighting terms yourself. Ask an LLM to expand your concept:
   ```text
   You are an expert art director. 
   Turn my simple idea into 3 detailed Midjourney prompts using the 8-part formula (one photorealistic, one modern vector illustration, one cinematic 3D render).
   
   Idea: "A team of researchers looking at a glowing hologram of a smart city in Bengaluru."
   ```

---

## Part C — Audio & Video Prompting

Multimodal AI has expanded rapidly into sound, music, and moving video.

### 4. Speech-to-Text (Transcription)
When using models like Whisper to transcribe audio, feed an initial **context vocabulary prompt** containing technical terms, attendee names, and regional slang to stop phonetic misspellings:
*"Transcript context: Discussion between Vicky, Priya, and Dr. Murthy regarding RAG pipelines, FastAPI endpoints, and Bengaluru office logistics."*

### 5. Text-to-Speech (TTS) Voice Prompting
Writing for voice requires writing for the human ear:
- Use short sentences with clear rhythm.
- Avoid URLs, parenthetical acronyms, and emojis—they sound bizarre when read aloud.
- Use phonetic spelling for uncommon names: *"Vicky (pronounced VICK-ee)"*.

### 6. Video Generation (Prompting for Motion)
In video generation tools (like Runway Gen-3, Luma, Pika, or Sora), the most important addition is **camera movement and physical motion**:
```text
A slow, smooth cinematic drone shot descending over a tea plantation in Munnar at sunrise. 
Morning mist drifts through emerald green terraced hills. 
Gentle, steady forward camera movement, 4k cinematic lighting, 6 seconds.
```

---

## 7. Responsible Multimodal Use & Ethics

1. **Never Create Deceptive Likenesses:** Do not generate fake videos or photos of real private individuals, public officials, or coworkers.
2. **Disclose Synthetic Media:** Label AI-generated graphics, especially when used in news, financial reports, or marketing testimonials.
3. **Protect Private Visuals:** Never upload sensitive documents (passports, medical scans, internal architecture whiteboards) to public image tools without verifying data retention policies.

---

## 💡 Common Mistakes & How to Spot Them

| Mistake | What goes wrong | The Fix |
|---|---|---|
| The Word-Soup Image Prompt | Piling on buzzwords: *"hyperrealistic 8k octane render trending on artstation masterpiece"*. | Modern models ignore buzzword fluff. Replace them with specific lighting, medium, and lens choices. |
| Tiny Uncropped Text | Uploading a full-page photo of a tiny receipt and expecting perfect OCR. | Crop closely around the relevant table or text block before sending. |
| Expecting Paragraphs in Images | Asking an image model to write a 50-word paragraph on a sign. | Image generators handle 1 to 4 clear words well (e.g. `a sign reading "FRESH CHAI"`). Keep in-image text very brief. |

---

## 🧪 Try It Now

Take a picture of any physical object on your desk (your keyboard, a mug, a notebook with handwritten scribbles) and upload it to ChatGPT, Claude, or Gemini with this prompt:

```text
Look at this photo carefully.
1. Transcribe any handwritten or printed text visible in the image.
2. Describe the material, lighting, and physical condition of the main object.
3. Suggest two creative ways to photograph this same object for a modern lifestyle catalog.
```

Notice how the model blends literal OCR with contextual visual analysis.

---

## 🔑 Key Takeaways

- Vision prompts excel when you ask the model to **observe visual details first before interpreting their meaning**.
- Great image generation prompts follow the **8-part formula**: Subject, Details, Setting, Medium, Camera, Lighting, Color, and Technical aspect ratio.
- Stop using empty buzzwords like "hyperrealistic 8k"; specify tangible physical details like lens focal length and light direction.
- In transcription tools, supply a **context prompt** containing proper nouns to prevent phonetic spelling errors.
- Always practice ethical media creation and disclose AI-generated visuals.

---

## 🏋️ Exercises

### Exercise 11.1: Craft a Website Hero Image Prompt
Write a complete prompt for a modern tech website hero banner featuring an AI research lab in Hyderabad. Use the 8-part formula.

<details>
<summary>View Solution & Explanation</summary>

**A strong prompt:**

```text
Wide-angle documentary photograph of two young software engineers collaborating at a standing desk in a modern tech office in Hyderabad. One engineer is pointing at a clean dual-monitor setup displaying lines of Python code, while warm sunlight filters through a large floor-to-ceiling glass window. 
Modern industrial interior with exposed brick and indoor plants, captured on a 35mm lens, natural daylight with soft fill, warm charcoal and mustard accents, clean composition leaving the left third open for headline text, realistic skin textures, 16:9 aspect ratio, --ar 16:9.
```

*Explanation:* This specifies the exact subject, natural action, architectural setting, camera lens (35mm), lighting, color accents, and deliberately leaves empty negative space on the left for website copy.

</details>

---

## ✅ Quick Quiz

1. How do image generation prompts differ fundamentally from conversational LLM prompts?
   - A) Image prompts must be written in Python.
   - B) Image prompts describe visual scenes (subject, lens, lighting, medium) rather than conversational commands.
   - C) Image prompts cannot exceed 5 words.
2. What is the most effective way to prevent a vision model from hallucinating numbers when reading an invoice?
   - A) Upload a low-resolution thumbnail.
   - B) Force the model to list verbatim quotes and line items in an observation step before calculating totals.
   - C) Ask the model if it feels confident.
3. Why should you supply a context prompt when using speech-to-text models like Whisper?
   - A) To make the audio louder.
   - B) To prime the model's vocabulary with correct spellings of technical jargon, company names, and regional proper nouns.
   - C) To translate the audio to Latin.

<details>
<summary>View Answers</summary>

1. **B** — Diffusion models respond to descriptive physical parameters (camera, light, texture) rather than back-and-forth dialogue.
2. **B** — Forcing the model to quote visible text directly anchors its attention layers on verified pixels.
3. **B** — Providing proper nouns in a context prompt resolves phonetic ambiguity during transcription.

</details>

---

> Author: **Vicky** ([abvicky.in](https://abvicky.in)) · Platform built by [Manikarnika Technologies](https://www.manikarnikatechnologies.in/) · © 2026 All rights reserved.
> ⬅️ [Module 10](10-tool-use-and-agents.md) · ➡️ [Module 12 — Model Parameters, APIs & Cost](12-parameters-apis-and-cost.md)
