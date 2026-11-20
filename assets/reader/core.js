/* Prompt Engineering: Zero to Pro · Reader core (navigation, pages, progress)
   (c) 2026 Manikarnika Technologies - manikarnikatechnologies.in */
(function () {
  "use strict";
  const PE = window.PE;
  const MAP = window.PE_MAP;
  const FILES = window.COURSE_FILES || {};
  const $ = (s) => document.querySelector(s);
  const esc = PE.esc;
  const view = $("#view");

  /* ---------- Course order ---------- */
  const STAGES = MAP.stages;
  const ABOUT = Object.assign({ stage: null }, MAP.about);
  const ORDER = [ABOUT].concat(STAGES.flatMap((s) => s.items.map((i) => Object.assign({ stage: s }, i))));
  const TRACKED = ORDER.filter((i) => i.stage);
  const MODULES = TRACKED.filter((i) => i.stage.id !== "ref");
  const find = (p) => ORDER.find((i) => i.p === p);
  PE.ORDER = ORDER;

  let done = new Set(PE.store.get("pe-progress", []).filter((p) => find(p)));
  const collapsed = new Set(PE.store.get("pe-collapsed", []));
  let current = null;
  let pendingScroll = null;

  const doneCount = (list) => list.filter((i) => done.has(i.p)).length;
  const label = (i) => (i.n === "i" ? i.t : `${i.n} · ${i.t}`);
  const nextUp = () => TRACKED.find((i) => !done.has(i.p)) || TRACKED[0];
  const initials = MAP.author.split(/\s+/).map((w) => w[0]).join("").toUpperCase();
  /* Author photo; if it can't load (e.g. offline) the initials underneath show instead. */
  const avatar = (size) => `<span class="avatar${size ? " " + size : ""}">` +
    (MAP.avatar ? `<img src="${esc(MAP.avatar)}" alt="${esc(MAP.author)}" referrerpolicy="no-referrer" onerror="this.remove()">` : "") +
    `<span aria-hidden="true">${initials}</span></span>`;

  /* ---------- Preferences ---------- */
  const root = document.documentElement;
  PE.isDark = () => root.getAttribute("data-theme") === "dark";
  const paintTheme = () => {
    const dark = PE.isDark();
    $("#theme-btn").innerHTML = PE.icon(dark ? "sun" : "moon");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#17191F" : "#F5F4F9");
  };
  $("#theme-btn").addEventListener("click", () => {
    root.classList.add("theme-anim");
    const next = PE.isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    PE.store.set("pe-theme", next);
    paintTheme();
    PE.renderMermaid(true);
    setTimeout(() => root.classList.remove("theme-anim"), 320);
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (localStorage.getItem("pe-theme") === null) {
      root.setAttribute("data-theme", e.matches ? "dark" : "light");
      paintTheme();
      PE.renderMermaid(true);
    }
  });
  const SIZES = { s: "Small", m: "Medium", l: "Large" };
  $("#size-btn").addEventListener("click", () => {
    const keys = Object.keys(SIZES);
    const cur = root.getAttribute("data-size") || "m";
    const next = keys[(keys.indexOf(cur) + 1) % keys.length];
    root.setAttribute("data-size", next);
    PE.store.set("pe-size", next);
    toast(`Text size: ${SIZES[next]}`);
  });
  const setFocus = (on) => { document.body.classList.toggle("focus", on); $("#focus-btn").classList.toggle("on", on); PE.store.set("pe-focus", on); };
  $("#focus-btn").addEventListener("click", () => { const on = !document.body.classList.contains("focus"); setFocus(on); toast(on ? "Focus mode on" : "Focus mode off"); });

  /* Audience preference: "all" | "non-tech" | "tech" */
  const curAudience = () => PE.store.get("pe-audience", "all");
  const setAudience = (aud, showToast = true) => {
    root.setAttribute("data-audience", aud);
    PE.store.set("pe-audience", aud);
    document.querySelectorAll(".lt-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.aud === aud);
    });
    const mobBtn = $("#lens-btn");
    if (mobBtn) {
      mobBtn.textContent = aud === "non-tech" ? "👔" : aud === "tech" ? "💻" : "🌟";
      mobBtn.title = `Audience track: ${aud === "non-tech" ? "Non-Tech" : aud === "tech" ? "Tech" : "All"}`;
    }
    document.querySelectorAll(".aud-choice-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.aud === aud);
      if (btn.classList.contains("btn")) {
        btn.classList.toggle("primary", btn.dataset.aud === aud);
        btn.classList.toggle("ghost", btn.dataset.aud !== aud);
      }
    });
    document.querySelectorAll(".track-card").forEach((card) => {
      const match = card.querySelector(`.aud-choice-btn[data-aud="${aud}"]`);
      card.classList.toggle("active", !!match);
    });
    if (showToast) {
      if (aud === "non-tech") toast("👔 Non-Tech Track active · Focusing on practical business & no-code prompts");
      else if (aud === "tech") toast("💻 Tech Track active · Focusing on code, schemas, APIs & architecture");
      else toast("🌟 Both Tracks active · Showing full comprehensive content");
    }
  };
  root.setAttribute("data-audience", curAudience());
  document.querySelectorAll(".lt-btn").forEach((btn) => {
    btn.addEventListener("click", () => setAudience(btn.dataset.aud));
  });
  const mobLensBtn = $("#lens-btn");
  if (mobLensBtn) {
    const AUD_ORDER = ["all", "non-tech", "tech"];
    mobLensBtn.addEventListener("click", () => {
      const cur = curAudience();
      const next = AUD_ORDER[(AUD_ORDER.indexOf(cur) + 1) % AUD_ORDER.length];
      setAudience(next);
    });
  }
  setAudience(curAudience(), false);

  let toastTimer = null;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------- Sidebar ---------- */
  function renderSidebar() {
    const n = doneCount(TRACKED), pct = Math.round((100 * n) / TRACKED.length), C = 2 * Math.PI * 22;
    const msg = n === TRACKED.length ? "Course complete! 🎉" : n ? "Keep going, great progress" : "Start with Module 00";
    $("#sidebar").innerHTML =
      `<div class="side-content" id="side-content">` +
      `<div class="side-progress"><div class="ring"><svg viewBox="0 0 52 52" aria-hidden="true">` +
      `<circle class="track" cx="26" cy="26" r="22"/><circle class="val" cx="26" cy="26" r="22" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - pct / 100)).toFixed(1)}"/></svg><span>${pct}%</span></div>` +
      `<div><b>${n} of ${TRACKED.length} complete</b><small>${msg}</small></div></div>` +
      `<a class="side-link" data-p="home" href="#/"><span class="si">${PE.icon("home")}</span>Home</a>` +
      `<a class="side-link" data-p="${ABOUT.p}" href="#/${ABOUT.p}"><span class="si">${PE.icon("info")}</span>${esc(ABOUT.t)}</a>` +
      STAGES.map((s) => {
        const c = collapsed.has(s.id);
        return `<section class="side-stage${c ? " collapsed" : ""}" data-stage="${s.id}">` +
          `<button class="side-stage-head" type="button" aria-expanded="${!c}"><span class="dot"></span><span class="label">${esc(s.label)} · ${esc(s.name)}</span><span class="count">${doneCount(s.items)}/${s.items.length}</span>${PE.icon("chevronDown")}</button>` +
          `<div class="side-items">${s.items.map((i) => `<a class="side-item" data-p="${i.p}" href="#/${i.p}"><span class="num"><span>${esc(i.n)}</span></span><span class="t">${esc(i.t)}</span></a>`).join("")}</div></section>`;
      }).join("") +
      `</div>` +
      `<div class="side-foot">${avatar("sm")}<span>Author: <a href="${MAP.authorSite || 'https://abvicky.in'}" target="_blank" rel="noopener"><strong>${esc(MAP.author)}</strong></a><br>Platform built by <a href="${MAP.platformSite || 'https://www.manikarnikatechnologies.in/'}" target="_blank" rel="noopener"><strong>${esc(MAP.platformBuilder || "Manikarnika Technologies")}</strong></a><br>© 2026 All rights reserved.</span></div>`;
    markSidebar();
  }
  function markSidebar() {
    document.querySelectorAll(".side-item, .side-link").forEach((a) => {
      a.classList.toggle("active", a.dataset.p === current);
      a.classList.toggle("done", done.has(a.dataset.p));
      if (a.dataset.p === current) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    const act = document.querySelector(".side-item.active");
    if (act) {
      const sec = act.closest(".side-stage");
      if (sec && sec.classList.contains("collapsed")) toggleStage(sec, false);
      const sb = $("#side-content") || $("#sidebar"), r = act.getBoundingClientRect(), sr = sb.getBoundingClientRect();
      if (r.top < sr.top + 60 || r.bottom > sr.bottom - 20) sb.scrollTop += r.top - sr.top - sr.height / 3;
    }
  }
  function toggleStage(sec, persist) {
    const c = sec.classList.toggle("collapsed");
    sec.querySelector(".side-stage-head").setAttribute("aria-expanded", String(!c));
    if (persist === false) return;
    if (c) collapsed.add(sec.dataset.stage); else collapsed.delete(sec.dataset.stage);
    PE.store.set("pe-collapsed", [...collapsed]);
  }

  /* ---------- Breadcrumbs ---------- */
  function renderCrumbs(item) {
    const c = $("#crumbs");
    if (!item) { c.innerHTML = `<span class="cur">Home</span>`; return; }
    c.style.cssText = "";
    c.innerHTML = `<a href="#/">Home</a><span class="sep">/</span>` +
      (item.stage ? `<span class="dot"></span><a href="#/" data-scroll-home="stage-${item.stage.id}">${esc(item.stage.label)} · ${esc(item.stage.name)}</a><span class="sep">/</span>` : "") +
      `<span class="cur">${esc(label(item))}</span>`;
  }

  /* ---------- Shared fragments ---------- */
  const footerHTML = () => `<footer class="site-footer"><span>Prompt Engineering: Zero to Pro · Author: <a href="${MAP.authorSite || 'https://abvicky.in'}" target="_blank" rel="noopener"><strong>${esc(MAP.author)}</strong></a></span><span>Platform built by <a href="${MAP.platformSite || 'https://www.manikarnikatechnologies.in/'}" target="_blank" rel="noopener"><strong>${esc(MAP.platformBuilder || "Manikarnika Technologies")}</strong></a> · © 2026 All rights reserved.</span></footer>`;
  const card = (i) => `<a class="mod-card${done.has(i.p) ? " done" : ""}" href="#/${i.p}">` +
    `<div class="mod-top"><span class="mod-icon">${i.i}</span><span class="mod-num">${esc(i.n)}</span></div>` +
    `<h3>${esc(i.t)}</h3><p>${esc(i.d)}</p>` +
    `<div class="mod-foot"><span>⏱ ${i.time === "ref" ? "Reference" : i.time === "project" ? "Project" : esc(i.time)}</span><span class="go">${done.has(i.p) ? "✓ Completed" : "Open →"}</span></div></a>`;

  /* ---------- Home ---------- */
  function renderHome() {
    renderSeq++;
    view.className = "view wide";
    const n = doneCount(TRACKED), pct = Math.round((100 * n) / TRACKED.length);
    const last = find(PE.store.get("pe-last", ""));
    const cont = last && last.stage && !done.has(last.p) ? last : nextUp();
    const features = [
      ["🧠", "Concepts made simple", "Plain-language explanations with diagrams and real examples."],
      ["❌➡️✅", "Prompt makeovers", "Side-by-side weak and strong prompts so you see exactly what changed."],
      ["🏋️", "Exercises with solutions", "Practice after every module, with worked answers you can reveal."],
      ["✅", "Quizzes and a final exam", "Check yourself after each module and finish with a 40-question exam."],
      ["🧰", "60 prompt templates", "Copy-ready patterns for writing, code, data, business and teaching."],
      ["🏆", "Capstone projects", "Six portfolio projects with levels and clear success criteria."]
    ];
    view.innerHTML =
      `<section class="home-hero"><div class="hero-text">` +
      `<span class="eyebrow">✦ Complete course · 2026 edition</span>` +
      `<h1>Prompt Engineering<br><span class="grad-text">Zero to Pro</span></h1>` +
      `<p class="lead">Learn to communicate with AI models so they reliably do what you want, from your very first prompt to tested, secure, production-ready systems.</p>` +
      `<div class="hero-actions"><a class="btn primary" href="#/${cont.p}">${PE.icon("play")}${n ? "Continue learning" : "Start the course"}</a>` +
      `<a class="btn ghost" href="#/appendix/A-cheat-sheet.md">${PE.icon("bulb")}Cheat sheet</a></div>` +
      `<div class="hero-by">${avatar()}<span>Author: <a href="${MAP.authorSite || 'https://abvicky.in'}" target="_blank" rel="noopener"><strong>${esc(MAP.author)}</strong></a><br>Platform built by <a href="${MAP.platformSite || 'https://www.manikarnikatechnologies.in/'}" target="_blank" rel="noopener"><strong>${esc(MAP.platformBuilder || "Manikarnika Technologies")}</strong></a></span></div>` +
      `</div><div class="hero-art"><img src="assets/cover.svg" alt="" width="640" height="520"></div></section>` +
      `<section class="stats-row">` +
      [["📚", "18", "modules in 4 stages"], ["🧰", "60", "prompt templates"], ["🎓", "40", "exam questions + 5 tasks"], ["⏱️", "~48 h", "of guided learning"]]
        .map(([ico, b, s]) => `<div class="stat-card"><span class="ico">${ico}</span><b>${b}</b><span>${s}</span></div>`).join("") +
      `</section>` +
      `<section class="continue-card"><span class="cc-icon">${cont.i}</span><div class="cc-body">` +
      `<small>${n ? `Continue where you left off · ${pct}% complete` : "Your first step"}</small><h3>${esc(label(cont))}</h3>` +
      `<div class="pbar"><span style="width:${Math.max(pct, 2)}%"></span></div></div>` +
      `<a class="btn primary" href="#/${cont.p}">${n ? "Resume" : "Start"} ${PE.icon("arrowRight")}</a></section>` +
      `<section class="tracks-banner">` +
      `<div class="tracks-header"><h2>Tailored for Two Audiences</h2><p>Whether you're automating business workflows or shipping production code, follow the track that fits your background.</p></div>` +
      `<div class="tracks-grid">` +
      `<div class="track-card ${curAudience() === "non-tech" ? "active" : ""}">` +
      `<div class="tc-badge">👔 Non-Tech Track</div>` +
      `<h3>For Business, Creators & Leaders</h3>` +
      `<p>For product managers, marketers, writers, founders, analysts, and everyday professionals. Master prompting in ChatGPT, Claude, and Gemini to automate reports, draft content, analyze data, and build custom GPTs without writing code.</p>` +
      `<ul class="tc-list"><li>✨ Plain-English mental models & analogies</li><li>📋 Copy-paste business prompt templates</li><li>💬 No-code chat, Projects & Custom Instructions</li></ul>` +
      `<button type="button" class="btn ${curAudience() === "non-tech" ? "primary" : "ghost"} aud-choice-btn" data-aud="non-tech">Set Non-Tech Track</button>` +
      `</div>` +
      `<div class="track-card ${curAudience() === "tech" ? "active" : ""}">` +
      `<div class="tc-badge">💻 Tech Track</div>` +
      `<h3>For Developers & Engineers</h3>` +
      `<p>For software engineers, data scientists, and ML architects. Build production LLM systems with structured output (JSON Schema/Pydantic), function calling, autonomous agent loops, RAG pipelines, automated evals, and prompt security.</p>` +
      `<ul class="tc-list"><li>⚙️ API payloads, SDKs (Python/Node) & tokens</li><li>🧱 Structured schemas & function calling</li><li>🛡️ Injection defense, Evals & PromptOps</li></ul>` +
      `<button type="button" class="btn ${curAudience() === "tech" ? "primary" : "ghost"} aud-choice-btn" data-aud="tech">Set Tech Track</button>` +
      `</div>` +
      `</div></section>` +
      `<section class="home-section"><h2 class="sec-title">Your learning path</h2><p class="sec-sub">Four stages from fundamentals to professional practice, plus a reference library you'll keep coming back to.</p>` +
      `<div class="path">${STAGES.map((s, k) => `<a class="path-step" href="#/" data-scroll="stage-${s.id}"><span class="ps-dot">${s.id === "ref" ? "★" : k + 1}</span>` +
        `<b>${esc(s.name)}</b><small>${esc(s.d)}</small><div class="pbar"><span style="width:${Math.round((100 * doneCount(s.items)) / s.items.length)}%"></span></div></a>`).join("")}</div></section>` +
      STAGES.map((s) => `<section class="stage-block" id="stage-${s.id}"><div class="stage-head"><div class="sh-text">` +
        `<span class="stage-pill">${esc(s.label)}</span><h2>${esc(s.name)}</h2><p>${esc(s.d)}</p></div>` +
        `<span class="sh-count">${doneCount(s.items)} of ${s.items.length} done</span></div>` +
        `<div class="card-grid">${s.items.map((i) => card(Object.assign({ stage: s }, i))).join("")}</div></section>`).join("") +
      `<section class="home-section"><h2 class="sec-title">What's inside every module</h2><p class="sec-sub">Everything you need in one place, so you never have to look elsewhere.</p>` +
      `<div class="feature-grid">${features.map(([i, b, s]) => `<div class="feature"><span class="f-ico">${i}</span><b>${b}</b><span>${s}</span></div>`).join("")}</div></section>` +
      `<section class="author-card">${avatar()}<div><h3>${esc(MAP.author)}</h3>` +
      `<p>Course author: <strong>${esc(MAP.author)}</strong> (<a href="${MAP.authorSite || 'https://abvicky.in'}" target="_blank" rel="noopener">${esc((MAP.authorSite || 'https://abvicky.in').replace('https://',''))}</a>)</p>` +
      `<p>Platform built by <a href="${MAP.platformSite || 'https://www.manikarnikatechnologies.in/'}" target="_blank" rel="noopener"><strong>${esc(MAP.platformBuilder || "Manikarnika Technologies")}</strong></a> (<a href="${MAP.platformSite || 'https://www.manikarnikatechnologies.in/'}" target="_blank" rel="noopener">${esc(MAP.platformSiteLabel || 'manikarnikatechnologies.in')}</a>)</p>` +
      `<p>© 2026 <a href="${MAP.platformSite || 'https://www.manikarnikatechnologies.in/'}" target="_blank" rel="noopener">${esc(MAP.platformBuilder || "Manikarnika Technologies")}</a> · All rights reserved. <a href="#/${ABOUT.p}">About this course →</a></p></div></section>` +
      footerHTML();
    view.querySelectorAll(".aud-choice-btn").forEach((btn) => {
      btn.addEventListener("click", () => setAudience(btn.dataset.aud));
    });
    document.title = "Prompt Engineering: Zero to Pro · by Vicky · Built by Manikarnika Technologies";
    $("#toc").innerHTML = "";
    if (pendingScroll) { const el = document.getElementById(pendingScroll); pendingScroll = null; if (el) { el.scrollIntoView(); return; } }
    window.scrollTo(0, 0);
  }

  /* ---------- Module / appendix page ---------- */
  async function getFile(p) {
    if (FILES[p] != null) return FILES[p];
    const r = await fetch(p);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.text();
  }

  let renderSeq = 0;
  async function renderDoc(item, anchor) {
    const seq = ++renderSeq;
    view.className = "view";
    let md;
    try { md = await getFile(item.p); }
    catch (e) {
      view.innerHTML = `<div class="md"><div class="callout warn"><div class="callout-title">${PE.icon("alert")}Couldn't load this page</div>` +
        `<p>The bundled content file <code>course-data.js</code> is missing or out of date. In the course folder run <code>python3 build.py</code>, then reload.</p></div></div>`;
      return;
    }
    if (seq !== renderSeq) return;
    const s = item.stage;
    const words = PE.stripMd(md).split(" ").length;
    const mins = Math.max(1, Math.round(words / 210));
    const pos = !s ? "Start here" : s.id === "ref" ? `Appendix ${item.n}` : `Module ${MODULES.indexOf(item) + 1} of ${MODULES.length}`;
    const study = item.time === "ref" ? "Reference" : item.time === "project" ? "Project" : item.time ? `Study time ${item.time}` : "Overview";
    const idx = ORDER.indexOf(item), prev = ORDER[idx - 1], next = ORDER[idx + 1];
    const isDone = done.has(item.p);
    const body = window.marked ? marked.parse(md, { gfm: true }) : `<div class="callout warn"><p>The Markdown renderer couldn't load (are you offline?). Showing plain text.</p></div><pre><code>${esc(md)}</code></pre>`;
    const pg = (i, dir) => i ? `<a class="${dir}" href="#/${i.p}"><span class="pg-ico">${i.i}</span><span class="pg-body"><small>${dir === "prev" ? "← Previous" : "Next →"}</small><b>${esc(label(i))}</b></span></a>` : "";

    view.innerHTML =
      `<article class="doc">` +
      `<header class="doc-hero"><div class="doc-hero-top"><a class="stage-pill" href="#/" ${s ? `data-scroll-home="stage-${s.id}"` : ""}>${s ? `${esc(s.label)} · ${esc(s.name)}` : "Overview"}</a><span class="pos">${pos}</span></div>` +
      `<div class="doc-hero-main"><div class="doc-icon">${item.i}${item.n !== "i" ? `<span>${esc(item.n)}</span>` : ""}</div><div><h1>${esc(item.t)}</h1><p>${esc(item.d)}</p></div></div>` +
      `<div class="doc-hero-chips"><span class="chip">${PE.icon("clock")}${esc(study)}</span><span class="chip">${PE.icon("book")}${mins} min read</span>` +
      `<span class="chip ok" id="done-chip"${isDone ? "" : " hidden"}>${PE.icon("check")}Completed</span></div></header>` +
      `<div class="md" id="md">${body}</div>` +
      (s ? `<section class="complete-card${isDone ? " done" : ""}" id="complete-card"><span class="cc-emoji">${isDone ? "🎉" : "🏁"}</span>` +
        `<div class="cc-body"><h3>${isDone ? "Nice work, this one's done!" : "Finished this page?"}</h3><p>${isDone ? "It's marked complete in your progress." : "Mark it complete to track your progress across the course."}</p></div>` +
        `<button class="btn${isDone ? " is-done" : ""}" id="complete-btn" type="button">${PE.icon("check")}${isDone ? "Completed" : "Mark as complete"}</button></section>` : "") +
      `<nav class="pager" aria-label="Previous and next">${pg(prev, "prev")}${pg(next, "next")}</nav>` +
      footerHTML() + `</article>`;

    const box = $("#md");
    PE.enhance(box, item.p);
    const sections = box.querySelectorAll("h2").length;
    PE.buildToc(box, item.p, `<b>${mins} min</b> read · <b>${sections}</b> sections${s ? `<br>${esc(s.label)} · ${esc(s.name)}` : ""}`);
    document.title = `${label(item)} · Prompt Engineering: Zero to Pro`;
    PE.store.set("pe-last", item.p);
    const btn = $("#complete-btn");
    if (btn) btn.addEventListener("click", () => toggleDone(item));

    await PE.renderMermaid(false);
    if (seq !== renderSeq) return;
    if (anchor) {
      const el = document.getElementById(decodeURIComponent(anchor));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }

  function toggleDone(item) {
    const now = !done.has(item.p);
    if (now) done.add(item.p); else done.delete(item.p);
    PE.store.set("pe-progress", [...done]);
    const cardEl = $("#complete-card"), btn = $("#complete-btn"), chip = $("#done-chip");
    cardEl.classList.toggle("done", now);
    cardEl.querySelector(".cc-emoji").textContent = now ? "🎉" : "🏁";
    cardEl.querySelector("h3").textContent = now ? "Nice work, this one's done!" : "Finished this page?";
    cardEl.querySelector("p").textContent = now ? "It's marked complete in your progress." : "Mark it complete to track your progress across the course.";
    btn.classList.toggle("is-done", now);
    btn.innerHTML = `${PE.icon("check")}${now ? "Completed" : "Mark as complete"}`;
    if (chip) chip.hidden = !now;
    renderSidebar();
    if (now) {
      const n = doneCount(TRACKED);
      const nx = nextUp();
      toast(n === TRACKED.length ? "🏆 You've completed the whole course!" : `🎉 Marked complete · Up next: ${label(nx)}`);
    }
  }

  /* ---------- Router ---------- */
  function parseHash() {
    const h = decodeURI(location.hash || "");
    if (!h.startsWith("#/") || h.length === 2) return { path: "home", anchor: null };
    const rest = h.slice(2), i = rest.indexOf("#");
    return { path: i < 0 ? rest : rest.slice(0, i), anchor: i < 0 ? null : rest.slice(i + 1) };
  }
  async function route() {
    const { path, anchor } = parseHash();
    closeDrawer();
    if (path === current && anchor) {
      const el = document.getElementById(anchor);
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    const item = find(path);
    current = item ? item.p : "home";
    document.body.classList.toggle("is-home", !item);
    renderCrumbs(item);
    markSidebar();
    if (item) await renderDoc(item, anchor); else renderHome();
    $("#main").focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", route);

  /* ---------- Global interactions ---------- */
  const openDrawer = () => { document.body.classList.add("nav-open"); $("#scrim").hidden = false; };
  function closeDrawer() { document.body.classList.remove("nav-open"); $("#scrim").hidden = true; }
  $("#menu-btn").addEventListener("click", () => (document.body.classList.contains("nav-open") ? closeDrawer() : openDrawer()));
  $("#scrim").addEventListener("click", closeDrawer);
  $("#search-btn").addEventListener("click", () => PE.palette.open());
  $("#to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  $("#lightbox").addEventListener("click", (e) => { if (e.target.closest("[data-close]") || e.target === e.currentTarget) PE.lightbox.close(); });

  document.addEventListener("click", (e) => {
    const head = e.target.closest(".side-stage-head");
    if (head) { toggleStage(head.closest(".side-stage")); return; }
    const zoom = e.target.closest(".zoom-btn, .figure img, .diagram .mermaid");
    if (zoom) { PE.lightbox.open(zoom.closest(".figure, .diagram")); return; }
    const home = e.target.closest("[data-scroll-home]");
    if (home) { pendingScroll = home.dataset.scrollHome; if (current === "home") { e.preventDefault(); renderHome(); } return; }
    const sc = e.target.closest("[data-scroll]");
    if (sc) { e.preventDefault(); const el = document.getElementById(sc.dataset.scroll); if (el) el.scrollIntoView({ behavior: "smooth" }); return; }
    const a = e.target.closest("a[data-anchor]");
    if (a) {
      const el = document.getElementById(a.dataset.anchor);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); history.replaceState(null, "", `#/${current}#${a.dataset.anchor}`); }
    }
  });

  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); PE.palette.isOpen() ? PE.palette.close() : PE.palette.open(); return; }
    if (e.key === "Escape") { if (PE.lightbox.isOpen()) PE.lightbox.close(); else if (PE.palette.isOpen()) PE.palette.close(); else closeDrawer(); return; }
    if (typing || PE.palette.isOpen() || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "/") { e.preventDefault(); PE.palette.open(); return; }
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      const idx = ORDER.findIndex((i) => i.p === current);
      const target = e.key === "ArrowRight" ? (idx < 0 ? ORDER[0] : ORDER[idx + 1]) : idx > 0 ? ORDER[idx - 1] : null;
      if (target) location.hash = `#/${target.p}`;
      else if (e.key === "ArrowLeft" && idx === 0) location.hash = "#/";
    }
  });

  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    $("#read-progress").style.width = `${max > 0 ? (100 * scrollY) / max : 0}%`;
    $("#to-top").classList.toggle("show", scrollY > 700);
  }, { passive: true });

  /* ---------- Boot ---------- */
  if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) { /* keep ⌘K */ } else { const k = document.querySelector(".st-kbd"); if (k) k.textContent = "Ctrl K"; }
  PE.hydrateIcons();
  paintTheme();
  setFocus(!!PE.store.get("pe-focus", false));
  renderSidebar();
  PE.palette.init();
  route();
})();