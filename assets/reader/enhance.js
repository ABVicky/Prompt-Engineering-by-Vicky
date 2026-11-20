/* Prompt Engineering: Zero to Pro · Content enhancements, search palette, lightbox
   (c) 2026 Vicky Prasad Mahato - abvicky.in */
(function () {
  "use strict";
  const PE = (window.PE = window.PE || {});

  /* ---------- Icons (24px stroke icons) ---------- */
  const ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a6.6 6.6 0 0 0 9.7 9.7z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronRight: '<path d="m9 6 6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    zoom: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
    focus: '<path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/><circle cx="12" cy="12" r="3"/>',
    type: '<path d="M4 7V5h16v2M9 19h6M12 5v14"/>',
    home: '<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/>',
    alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3M17 6l3 3M15 8l2 2"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21.5h11.6a2 2 0 0 0 1.7-3L14 9V3"/><path d="M7 15h10"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    pencil: '<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    play: '<path d="M7 4v16l13-8z"/>',
    hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>'
  };
  PE.icon = (name) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  PE.hydrateIcons = (root) => (root || document).querySelectorAll("[data-icon]").forEach((el) => { el.innerHTML = PE.icon(el.dataset.icon); });

  /* ---------- Helpers ---------- */
  PE.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const escText = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  PE.store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  PE.dirOf = (p) => { const i = p.lastIndexOf("/"); return i < 0 ? "" : p.slice(0, i); };
  PE.resolvePath = (base, rel) => {
    const out = [];
    for (const part of (base ? base.split("/") : []).concat(rel.split("/"))) {
      if (!part || part === ".") continue;
      if (part === "..") out.pop(); else out.push(part);
    }
    return out.join("/");
  };
  PE.slugify = (t) => t.trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, "").replace(/\s/g, "-");
  PE.cleanInline = (t) => t.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "").trim();
  PE.stripMd = (md) => md.replace(/```[\s\S]*?```/g, (m) => m.replace(/```\w*/g, " "))
    .replace(/<[^>]+>/g, " ").replace(/!\[[^\]]*\]\([^)]*\)/g, " ").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|~]+/g, " ").replace(/-{2,}/g, " ").replace(/\s+/g, " ").trim();
  const EMOJI_RE = /^\s*(?:\p{Extended_Pictographic}️?(?:‍\p{Extended_Pictographic}️?)*\s*)+/u;
  function stripLeadingEmoji(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
      if (!n.nodeValue.trim()) continue;
      n.nodeValue = n.nodeValue.replace(EMOJI_RE, "");
      return;
    }
  }
  function firstTextNode(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) if (n.nodeValue.trim()) return n;
    return null;
  }

  /* ---------- Content transforms ---------- */
  const CALLOUTS = [
    [/^💡/u, "tip", "Tip", "bulb"], [/^⚠/u, "warn", "Watch out", "alert"], [/^🔑/u, "key", "Key idea", "key"],
    [/^🧪/u, "try", "Try it", "flask"], [/^🧠/u, "deep", "Deep dive", "layers"], [/^🛡/u, "sec", "Security", "shield"]
  ];
  const SECTIONS = [
    [/learning objectives/i, "objectives", "target"], [/key takeaways/i, "takeaways", "star"],
    [/exercise/i, "exercises", "pencil"], [/quick quiz/i, "quiz", "help"]
  ];
  const LANGS = { python: "Python", py: "Python", bash: "Terminal", sh: "Terminal", json: "JSON", xml: "Prompt · XML", yaml: "YAML", yml: "YAML",
    jinja: "Jinja template", markdown: "Markdown", md: "Markdown", js: "JavaScript", javascript: "JavaScript", ts: "TypeScript", html: "HTML", css: "CSS", sql: "SQL" };

  function makeCallout(el, type, label, icon) {
    stripLeadingEmoji(el);
    el.classList.add("callout", type);
    el.insertAdjacentHTML("afterbegin", `<div class="callout-title">${PE.icon(icon)}${label}</div>`);
  }

  function promptHTML(raw) {
    return escText(raw)
      .replace(/\{\{[^}\n]+\}\}/g, (m) => `<span class="tok-var">${m}</span>`)
      .replace(/&lt;\/?[a-zA-Z_][\w.-]*(?:\s[^&\n]*?)?\/?&gt;/g, (m) => `<span class="tok-tag">${m}</span>`);
  }

  async function copyText(text, btn) {
    const label = btn.querySelector("span");
    try { await navigator.clipboard.writeText(text); label.textContent = "Copied"; }
    catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); label.textContent = "Copied"; } catch (err) { label.textContent = "Press ⌘/Ctrl+C"; }
      ta.remove();
    }
    setTimeout(() => (label.textContent = "Copy"), 1600);
  }

  PE.enhance = function (box, path) {
    const base = PE.dirOf(path);

    // 1. Remove title, stage line and copyright footer (the reader shows its own).
    const h1 = box.querySelector("h1");
    if (h1) h1.remove();
    const first = box.firstElementChild;
    if (first && first.tagName === "BLOCKQUOTE" && /Stage \d|⏱|Author:/.test(first.textContent)) first.remove();
    box.querySelectorAll("blockquote").forEach((bq) => { if (/©\s*20\d\d/.test(bq.textContent)) bq.remove(); });
    while (box.lastElementChild && box.lastElementChild.tagName === "HR") box.lastElementChild.remove();

    // 2. Headings: GitHub-style ids, number badges, anchors.
    const seen = {};
    box.querySelectorAll("h2, h3, h4").forEach((h) => {
      let s = PE.slugify(h.textContent);
      if (seen[s] != null) { seen[s] += 1; s = `${s}-${seen[s]}`; } else seen[s] = 0;
      h.id = s;
      if (h.tagName === "H2") {
        const tn = firstTextNode(h);
        const m = tn && tn.nodeValue.match(/^\s*(\d+)\.\s+/);
        if (m) { tn.nodeValue = tn.nodeValue.slice(m[0].length); h.insertAdjacentHTML("afterbegin", `<span class="h-num">${m[1]}</span>`); }
      }
      if (h.tagName !== "H4") h.insertAdjacentHTML("beforeend", `<a class="h-anchor" href="#/${path}#${s}" data-anchor="${s}" aria-label="Link to this section">#</a>`);
    });

    // 3. Section cards (objectives, takeaways, exercises, quiz).
    box.querySelectorAll(":scope > h2").forEach((h) => {
      const hit = SECTIONS.find(([re]) => re.test(h.textContent));
      if (!hit) return;
      const card = document.createElement("section");
      card.className = `sec-card ${hit[1]}`;
      h.before(card);
      let next = h.nextElementSibling;
      card.appendChild(h);
      while (next && next.tagName !== "H2" && next.tagName !== "HR") { const n = next.nextElementSibling; card.appendChild(next); next = n; }
      stripLeadingEmoji(h);
      h.insertAdjacentHTML("afterbegin", `<span class="sec-ico">${PE.icon(hit[2])}</span>`);
    });

    // 4. Callouts from blockquotes and emoji-led paragraphs.
    box.querySelectorAll("blockquote").forEach((bq) => {
      const hit = CALLOUTS.find(([re]) => re.test(bq.textContent.trim()));
      if (hit) makeCallout(bq, hit[1], hit[2], hit[3]); else bq.classList.add("callout", "note");
    });
    box.querySelectorAll("p").forEach((p) => {
      if (p.closest(".callout, details, td, li")) return;
      const t = p.textContent.trim();
      const hit = CALLOUTS.find(([re]) => re.test(t));
      if (hit && /^(💡|🧪|⚠)/u.test(t)) {
        const div = document.createElement("div");
        p.before(div); div.appendChild(p); makeCallout(div, hit[1], hit[2], hit[3]);
        return;
      }
      const ba = t.startsWith("❌") ? "bad" : t.startsWith("✅") ? "good" : "";
      if (!ba) return;
      const next = p.nextElementSibling;
      if (next && next.tagName === "PRE") {
        next.dataset.variant = ba;
        next.dataset.label = t.replace(EMOJI_RE, "").replace(/[*_]/g, "").trim();
        p.remove();
      } else { stripLeadingEmoji(p); p.classList.add("ba", ba); }
    });

    // 5. Code blocks and diagrams.
    box.querySelectorAll("pre > code").forEach((code) => {
      const pre = code.parentElement;
      const lang = ((code.className.match(/language-([\w-]+)/) || [])[1] || "").toLowerCase();
      const raw = code.textContent.replace(/\n$/, "");
      if (lang === "mermaid") {
        const fig = document.createElement("figure");
        fig.className = "diagram";
        fig.innerHTML = `<div class="mermaid"></div><button class="zoom-btn" type="button" aria-label="Enlarge diagram">${PE.icon("zoom")}</button>`;
        const m = fig.firstElementChild; m.dataset.src = raw; m.textContent = raw;
        pre.replaceWith(fig);
        return;
      }
      const boxy = /[├└┌│┐─]/.test(raw);
      const isPrompt = (lang === "text" || lang === "") && !boxy;
      let label = LANGS[lang] || (boxy ? "Diagram" : lang === "text" ? (/^(cost|1 token)/m.test(raw) ? "Formula" : "Prompt") : lang ? lang.toUpperCase() : "Text");
      const variant = pre.dataset.variant || "";
      if (variant) label = `${variant === "bad" ? "✗" : "✓"} ${pre.dataset.label || (variant === "bad" ? "Weak prompt" : "Strong prompt")}`;
      if (isPrompt) code.innerHTML = promptHTML(raw);
      else if (window.hljs && lang && hljs.getLanguage(lang)) { try { hljs.highlightElement(code); } catch (e) { /* plain */ } }
      const wrap = document.createElement("div");
      wrap.className = `code${variant ? " " + variant : ""}${isPrompt || lang === "xml" ? " prompt" : ""}`;
      wrap.innerHTML = `<div class="code-head"><span class="dots"><i></i><i></i><i></i></span><span class="code-label">${PE.esc(label)}</span><button class="code-copy" type="button">${PE.icon("copy")}<span>Copy</span></button></div>`;
      pre.replaceWith(wrap);
      wrap.appendChild(pre);
      wrap.querySelector(".code-copy").addEventListener("click", (e) => copyText(raw, e.currentTarget));
    });

    // 6. Tables, images, links, checklists.
    box.querySelectorAll("table").forEach((t) => { const w = document.createElement("div"); w.className = "table-wrap"; t.before(w); w.appendChild(t); });
    box.querySelectorAll("img[src]").forEach((img) => {
      const src = img.getAttribute("src");
      if (!/^(https?:|data:)/i.test(src)) img.setAttribute("src", PE.resolvePath(base, src));
      img.loading = "lazy"; img.decoding = "async";
      const p = img.parentElement;
      if (p && p.tagName === "P" && p.childNodes.length === 1) {
        const fig = document.createElement("figure");
        fig.className = "figure";
        p.replaceWith(fig);
        fig.appendChild(img);
        fig.insertAdjacentHTML("beforeend", `<button class="zoom-btn" type="button" aria-label="Enlarge image">${PE.icon("zoom")}</button>${img.alt ? `<figcaption>${PE.esc(img.alt)}</figcaption>` : ""}`);
      }
    });
    box.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (/^(https?:|mailto:)/i.test(href)) { a.target = "_blank"; a.rel = "noopener"; a.classList.add("ext"); return; }
      if (href.startsWith("#/")) return;
      if (href.startsWith("#")) { a.dataset.anchor = href.slice(1); a.setAttribute("href", `#/${path}${href}`); return; }
      const m = href.match(/^([^#]+\.md)(#.*)?$/i);
      if (m) a.setAttribute("href", `#/${PE.resolvePath(base, m[1])}${m[2] || ""}`);
    });
    box.querySelectorAll('input[type="checkbox"]').forEach((cb, i) => {
      const key = `pe-chk:${path}:${i}`;
      cb.disabled = false;
      cb.checked = !!PE.store.get(key, false);
      const li = cb.closest("li");
      if (li) li.classList.toggle("checked", cb.checked);
      cb.addEventListener("change", () => { PE.store.set(key, cb.checked); if (li) li.classList.toggle("checked", cb.checked); });
    });
  };

  /* ---------- Mermaid ---------- */
  PE.renderMermaid = async function (reset) {
    if (!window.mermaid) return;
    const cs = getComputedStyle(document.documentElement);
    const getVal = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
    const dark = PE.isDark();

    const bgPrimary = getVal("--bg-primary", dark ? "#17191F" : "#F5F4F9");
    const bgSurface = getVal("--bg-surface", dark ? "#22252D" : "#FFFFFF");
    const colorPrimary = getVal("--color-primary", "#F3B552");
    const colorSecondary = getVal("--color-secondary", dark ? "#6AA6E3" : "#407EBF");
    const textPrimary = getVal("--text-primary", dark ? "#F4F1EA" : "#34363D");
    const textSecondary = getVal("--text-secondary", dark ? "#A8A9B0" : "#777982");
    const borderColor = getVal("--border-color", dark ? "#393D47" : "#E8E6E1");
    const highlight = getVal("--highlight", dark ? "#3B3021" : "#FFF2D9");

    const v = {
      darkMode: dark,
      background: bgSurface,
      // Nodes: highlight fill, mustard border, primary text
      primaryColor: highlight,
      primaryTextColor: textPrimary,
      primaryBorderColor: colorPrimary,
      mainBkg: highlight,
      nodeBorder: colorPrimary,
      textColor: textPrimary,
      // Lines: text-secondary
      lineColor: textSecondary,
      // Clusters: bg-primary
      clusterBkg: bgPrimary,
      clusterBorder: borderColor,
      // Edge labels: surface
      edgeLabelBackground: bgSurface,
      // Actors / Sequence
      actorBkg: highlight,
      actorBorder: colorPrimary,
      actorTextColor: textPrimary,
      actorLineColor: textSecondary,
      signalColor: textPrimary,
      signalTextColor: textPrimary,
      // Notes
      noteBkgColor: highlight,
      noteTextColor: textPrimary,
      noteBorderColor: colorPrimary,
      // Pie
      pieSectionTextColor: "#17191F",
      pieLegendTextColor: textPrimary,
      pieStrokeColor: bgSurface,
      pieOuterStrokeColor: borderColor,
      // Mindmap root & branches
      git0: textPrimary,
      gitBranchLabel0: bgPrimary
    };

    const pieColors = ["#F3B552", "#6AA6E3", "#E6C98F", "#A8A9B0", "#407EBF", "#C9C7C2", "#E8A33F", "#9FC3EA"];
    pieColors.forEach((c, i) => { v[`pie${i + 1}`] = c; });

    // Mindmap: cScale0-11 to mid-tones with cScaleLabel #17191F
    const cScales = [
      "#F3B552", "#6AA6E3", "#E6C98F", "#9FC3EA",
      "#E5A33F", "#82B7EC", "#F6D28B", "#A8A9B0",
      "#D4932E", "#5B96D6", "#F9E4B7", "#B8B9C0"
    ];
    cScales.forEach((c, i) => {
      v[`cScale${i}`] = c;
      v[`cScaleLabel${i}`] = "#17191F";
    });

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "base",
      themeVariables: v,
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      flowchart: { htmlLabels: true, curve: "basis", padding: 14 },
      mindmap: { padding: 12 }
    });
    const nodes = [...document.querySelectorAll("#view .mermaid")];
    if (!nodes.length) return;
    if (reset) nodes.forEach((n) => { n.removeAttribute("data-processed"); n.innerHTML = ""; n.textContent = n.dataset.src; });
    try { await mermaid.run({ nodes }); } catch (e) { console.warn("Diagram render issue:", e); }
  };

  /* ---------- On-this-page ---------- */
  let tocObserver = null;
  PE.buildToc = function (box, path, metaHTML) {
    const toc = document.getElementById("toc");
    if (tocObserver) tocObserver.disconnect();
    const hs = [...box.querySelectorAll("h2, h3")];
    if (hs.length < 2) { toc.innerHTML = metaHTML ? `<div class="toc-meta">${metaHTML}</div>` : ""; return; }
    const label = (h) => [...h.childNodes].filter((n) => !(n.nodeType === 1 && n.matches(".h-num, .h-anchor, .sec-ico"))).map((n) => n.textContent).join("").trim();
    toc.innerHTML = `<div class="toc-title">${PE.icon("list")}On this page</div><nav class="toc-list">` +
      hs.map((h) => `<a class="${h.tagName.toLowerCase()}" data-anchor="${h.id}" href="#/${path}#${h.id}">${PE.esc(label(h))}</a>`).join("") +
      `</nav>${metaHTML ? `<div class="toc-meta">${metaHTML}</div>` : ""}`;
    const links = new Map([...toc.querySelectorAll("a")].map((a) => [a.dataset.anchor, a]));
    tocObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.remove("active"));
        const l = links.get(en.target.id);
        if (l) { l.classList.add("active"); l.scrollIntoView({ block: "nearest" }); }
      });
    }, { rootMargin: "-80px 0px -70% 0px" });
    hs.forEach((h) => tocObserver.observe(h));
  };

  /* ---------- Search palette ---------- */
  let index = null, items = [], active = 0;
  function buildIndex() {
    const files = window.COURSE_FILES || {};
    index = [];
    for (const it of PE.ORDER || []) {
      const md = files[it.p];
      if (md == null) continue;
      const heads = [];
      let fence = false;
      for (const line of md.split("\n")) {
        if (/^\s*(```|~~~)/.test(line)) { fence = !fence; continue; }
        const m = !fence && line.match(/^(#{2,3})\s+(.+)$/);
        if (m) { const text = PE.cleanInline(m[2]); heads.push({ text, slug: PE.slugify(text), lower: text.toLowerCase() }); }
      }
      const text = PE.stripMd(md);
      index.push({ it, heads, text, lower: text.toLowerCase() });
    }
  }
  const mark = (s, q) => PE.esc(s).replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), (m) => `<mark>${m}</mark>`);
  function row(href, ico, title, sub) {
    return `<a class="pal-item" href="${href}" role="option"><span class="pal-ico">${ico}</span><span class="pal-body"><b>${title}</b>${sub ? `<small>${sub}</small>` : ""}</span>${PE.icon("chevronRight")}</a>`;
  }
  function search(qRaw) {
    const res = document.getElementById("pal-results");
    const q = qRaw.trim().toLowerCase();
    let html = "";
    if (!q) {
      html = `<div class="pal-group">Jump to</div>` + (PE.ORDER || []).map((it) => row(`#/${it.p}`, it.i, PE.esc(`${it.n === "i" ? "" : it.n + " · "}${it.t}`), PE.esc(it.d || ""))).join("");
    } else {
      const sec = [], pages = [];
      for (const d of index) {
        for (const h of d.heads) if (h.lower.includes(q)) sec.push({ d, h, score: h.lower.startsWith(q) ? 2 : 1 });
        let pos = d.lower.indexOf(q), count = 0;
        const firstPos = pos;
        while (pos >= 0 && count < 99) { count++; pos = d.lower.indexOf(q, pos + q.length); }
        if (count || d.it.t.toLowerCase().includes(q)) pages.push({ d, count, firstPos, score: count + (d.it.t.toLowerCase().includes(q) ? 500 : 0) });
      }
      sec.sort((a, b) => b.score - a.score);
      pages.sort((a, b) => b.score - a.score);
      if (sec.length) html += `<div class="pal-group">Sections</div>` + sec.slice(0, 8).map(({ d, h }) => row(`#/${d.it.p}#${h.slug}`, PE.icon("hash"), mark(h.text, q), PE.esc(`${d.it.n === "i" ? "" : d.it.n + " · "}${d.it.t}`))).join("");
      if (pages.length) html += `<div class="pal-group">Pages</div>` + pages.slice(0, 10).map(({ d, count, firstPos }) => {
        const s = Math.max(0, firstPos - 50);
        const snip = firstPos >= 0 ? (s ? "…" : "") + d.text.slice(s, firstPos + 90) + "…" : d.it.d || "";
        return row(`#/${d.it.p}`, d.it.i, PE.esc(`${d.it.t}`) + ` <span style="color:var(--text-3);font-weight:500">· ${count} match${count === 1 ? "" : "es"}</span>`, mark(snip, q));
      }).join("");
      if (!html) html = `<div class="pal-empty">No results for “${PE.esc(qRaw)}”. Try another word, like “JSON”, “RAG” or “injection”.</div>`;
    }
    res.innerHTML = html;
    items = [...res.querySelectorAll(".pal-item")];
    active = 0;
    setActive(0);
  }
  function setActive(i) {
    if (!items.length) return;
    active = (i + items.length) % items.length;
    items.forEach((el, k) => el.classList.toggle("active", k === active));
    items[active].scrollIntoView({ block: "nearest" });
  }
  PE.palette = {
    open() {
      if (!index) buildIndex();
      const pal = document.getElementById("palette"), input = document.getElementById("pal-input");
      pal.hidden = false;
      input.value = "";
      input.focus();
      search("");
    },
    close() { document.getElementById("palette").hidden = true; },
    isOpen() { return !document.getElementById("palette").hidden; },
    init() {
      const pal = document.getElementById("palette"), input = document.getElementById("pal-input");
      input.addEventListener("input", () => search(input.value));
      input.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
        else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
        else if (e.key === "Enter" && items[active]) { e.preventDefault(); location.hash = items[active].getAttribute("href"); PE.palette.close(); }
        else if (e.key === "Escape") PE.palette.close();
      });
      pal.addEventListener("click", (e) => {
        if (e.target.closest(".pal-item")) PE.palette.close();
        else if (e.target.closest("[data-close]")) PE.palette.close();
      });
    }
  };

  /* ---------- Lightbox ---------- */
  PE.lightbox = {
    open(fig) {
      const stage = document.getElementById("lightbox-stage");
      const img = fig.querySelector("img"), svg = fig.querySelector(".mermaid svg");
      if (img) stage.innerHTML = `<img src="${img.getAttribute("src")}" alt="${PE.esc(img.alt || "")}">`;
      else if (svg) stage.innerHTML = `<div class="lb-diagram">${svg.outerHTML}</div>`;
      else return;
      document.getElementById("lightbox").hidden = false;
    },
    close() { document.getElementById("lightbox").hidden = true; document.getElementById("lightbox-stage").innerHTML = ""; },
    isOpen() { return !document.getElementById("lightbox").hidden; }
  };
})();