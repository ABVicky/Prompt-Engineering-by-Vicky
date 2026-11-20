/* Cinematic layer: kinetic hero words, scroll reveals, count-up stats, cursor light
   and tilt. Re-applies itself whenever the reader swaps the page in #view.
   Does nothing that moves when the user prefers reduced motion.
   (c) 2026 Manikarnika Technologies - manikarnikatechnologies.in */
(function () {
  "use strict";
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const view = document.getElementById("view");
  if (!view) return;

  // Ambient backdrop + grain (decorative only)
  const aurora = document.createElement("div");
  aurora.className = "cine-aurora"; aurora.setAttribute("aria-hidden", "true");
  aurora.innerHTML = "<span></span><span></span><span></span>";
  const grain = document.createElement("div");
  grain.className = "cine-grain"; grain.setAttribute("aria-hidden", "true");
  document.body.prepend(aurora);
  document.body.appendChild(grain);

  const io = "IntersectionObserver" in window && !reduce
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })
    : null;

  function reveal(els, stagger) {
    els.forEach((el, k) => {
      if (el.classList.contains("cine-reveal") || el.closest(".home-hero")) return;
      if (!io) { el.classList.add("is-in"); return; }
      el.classList.add("cine-reveal");
      if (stagger) el.style.setProperty("--d", String(k % 6));
      io.observe(el);
    });
  }

  function splitWords(h1) {
    if (h1.dataset.cine) return;
    h1.dataset.cine = "1";
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const s = document.createElement("span");
            s.className = "cine-word"; s.style.setProperty("--i", String(i++)); s.textContent = part;
            frag.appendChild(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== "BR") {
          if (n.classList.contains("grad-text")) {
            // keep the gradient continuous across the phrase: animate the span as one word
            n.classList.add("cine-word"); n.style.setProperty("--i", String(i++));
          } else walk(n);
        }
      });
    };
    walk(h1);
  }

  function countUp(el) {
    const m = el.textContent.match(/^(\D*)(\d+)(.*)$/);
    if (!m || reduce) return;
    const [, pre, num, post] = m, target = +num, t0 = performance.now(), dur = 1400;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + Math.round(target * e) + post;
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = pre + "0" + post;
    requestAnimationFrame(step);
  }

  function apply() {
    if (!reduce) {
      view.classList.remove("cine-cut"); void view.offsetWidth; view.classList.add("cine-cut");
    }
    const hero = view.querySelector(".home-hero");
    if (hero) {
      const h1 = hero.querySelector("h1");
      if (h1 && !reduce) { splitWords(h1); document.documentElement.classList.add("cine-ready"); }
      view.querySelectorAll(".stat-card b").forEach((b) => {
        if (b.dataset.cine) return; b.dataset.cine = "1";
        if (io) { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { countUp(b); o.disconnect(); } }); o.observe(b); }
      });
      reveal([...view.querySelectorAll(".stats-row > *, .continue-card, .tracks-header, .track-card, .home-section > .sec-title, .home-section > .sec-sub, .path-step, .stage-head, .mod-card, .feature, .author-card")], true);
      view.querySelectorAll(".sec-title, .stage-head").forEach((el) => io ? io.observe(el) : el.classList.add("is-in"));
    } else {
      reveal([...view.querySelectorAll(".md > h2, .md .figure, .md .diagram, .md .callout, .md table, .md pre, .md details, #complete-card")], false);
    }
    view.querySelectorAll(".mod-card, .stat-card, .feature, .track-card, .path-step").forEach((c) => c.classList.add("cine-tilt"));
  }

  // Cursor light + tilt (event delegation, one rAF per frame)
  if (fine && !reduce) {
    let raf = 0, last = null;
    const SEL = ".mod-card, .stat-card, .feature, .track-card, .path-step, .continue-card, .author-card, .home-hero";
    document.addEventListener("pointermove", (ev) => {
      last = ev;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = last.target.closest && last.target.closest(SEL);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (last.clientX - r.left) / r.width, y = (last.clientY - r.top) / r.height;
        el.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        el.style.setProperty("--my", (y * 100).toFixed(1) + "%");
        if (el.classList.contains("home-hero")) {
          const art = el.querySelector(".hero-art img");
          if (art) {
            art.style.setProperty("--px", ((x - .5) * 18).toFixed(1) + "px");
            art.style.setProperty("--py", ((y - .5) * 14).toFixed(1) + "px");
            art.style.setProperty("--ry", ((x - .5) * 8).toFixed(2) + "deg");
            art.style.setProperty("--rx", ((.5 - y) * 6).toFixed(2) + "deg");
          }
        } else if (el.classList.contains("cine-tilt")) {
          el.style.setProperty("--ry", ((x - .5) * 6).toFixed(2) + "deg");
          el.style.setProperty("--rx", ((.5 - y) * 6).toFixed(2) + "deg");
        }
      });
    }, { passive: true });
  }

  new MutationObserver(() => apply()).observe(view, { childList: true });
  apply();
})();
