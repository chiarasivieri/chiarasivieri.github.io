import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";
import { projects } from "./Projects";
import ThesisViewer from "./ThesisViewer";
import { SupportDemo, ShiftEditDemo } from "./AppDemos";
import "./Projects.css";

/* cursor-following glow on glass cards */
const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

/* adds the "in" class to .reveal / .observe elements when they enter the viewport */
function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .observe");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

/* iridescent reading progress bar */
function useProgress(barRef, dep) {
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const k = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${k})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [dep, barRef]);
}

/* typewriter for the page title, like the other pages */
function useTyped(text) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    setTyped("");
    const timeouts = [];
    for (let i = 1; i <= text.length; i++) {
      timeouts.push(setTimeout(() => setTyped(text.slice(0, i)), 150 + i * 60));
    }
    return () => timeouts.forEach(clearTimeout);
  }, [text]);
  return typed;
}

/* ── Album: pile of screenshots, autoplay, 3D tilt ── */
function Album({ items }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const stackRef = useRef(null);
  const n = items.length;
  const go = (d) => setIdx((i) => (i + d + n) % n);

  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 4200);
    return () => clearInterval(t);
  }, [paused, n]);

  const onMove = (e) => {
    const el = stackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
  };
  const onLeave = () => {
    setPaused(false);
    if (stackRef.current) stackRef.current.style.transform = "";
  };

  return (
    <div
      className="album"
      onMouseEnter={() => setPaused(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="album-stack" ref={stackRef}>
        {items.map((it, i) => {
          const pos = (i - idx + n) % n; // 0 = front
          return (
            <figure
              key={i}
              className={`album-card pos-${Math.min(pos, 3)}`}
              onClick={() => pos === 0 && go(1)}
            >
              <img
                src={it.src}
                alt={it.caption}
                style={{
                  ...(it.fit ? { objectFit: it.fit } : {}),
                  ...(it.pos ? { objectPosition: it.pos } : {}),
                }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </figure>
          );
        })}
      </div>

      <div className="album-bar">
        <button className="album-btn" onClick={() => go(-1)} aria-label="previous">←</button>
        <span className="album-caption">
          {String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} — {items[idx].caption}
        </span>
        <button className="album-btn" onClick={() => go(1)} aria-label="next">→</button>
      </div>

      <div className="album-dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={`album-dot ${i === idx ? "on" : ""}`}
            onClick={() => setIdx(i)}
            aria-label={`image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Lightbox: full image + zoomed details ──
   item = { src, caption, zooms: [{ label, x, y, w, h }] }  (x, y, w, h in % of the image)
   Open the site with ?zoomtool in the address, then drag on the image to measure a new zoom. */
function Lightbox({ item, startView = -1, onClose }) {
  const zooms = item.zooms || [];
  const [view, setView] = useState(startView); // -1 = full image
  const [nat, setNat] = useState(null);
  const [sel, setSel] = useState(null);
  const [picked, setPicked] = useState("");
  const imgRef = useRef(null);
  const dragging = useRef(false);
  const zoomTool = typeof window !== "undefined" && window.location.search.includes("zoomtool");

  useEffect(() => {
    const img = new Image();
    img.onload = () => setNat({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = item.src;
  }, [item.src]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const n = zooms.length;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") setView((v) => (v + 1 >= n ? -1 : v + 1));
      else if (e.key === "ArrowLeft") setView((v) => (v - 1 < -1 ? n - 1 : v - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zooms.length, onClose]);

  const z = view >= 0 ? zooms[view] : null;

  /* zoom tool: drag a rectangle, get the numbers */
  const point = (e) => {
    const r = imgRef.current.getBoundingClientRect();
    return {
      x: Math.min(Math.max(e.clientX - r.left, 0), r.width),
      y: Math.min(Math.max(e.clientY - r.top, 0), r.height),
      w: r.width,
      h: r.height,
    };
  };
  const down = (e) => {
    if (!zoomTool || !imgRef.current) return;
    e.preventDefault();
    const p = point(e);
    dragging.current = true;
    setPicked("");
    setSel({ x0: p.x, y0: p.y, x1: p.x, y1: p.y, w: p.w, h: p.h });
  };
  const move = (e) => {
    if (!dragging.current) return;
    const p = point(e);
    setSel((s) => s && { ...s, x1: p.x, y1: p.y });
  };
  const up = () => {
    if (!dragging.current) return;
    dragging.current = false;
    setSel((s) => {
      if (!s) return s;
      const x = (Math.min(s.x0, s.x1) / s.w) * 100;
      const y = (Math.min(s.y0, s.y1) / s.h) * 100;
      const w = (Math.abs(s.x1 - s.x0) / s.w) * 100;
      const h = (Math.abs(s.y1 - s.y0) / s.h) * 100;
      if (w > 1 && h > 1) {
        const text = `{ label: "detail", x: ${x.toFixed(1)}, y: ${y.toFixed(1)}, w: ${w.toFixed(1)}, h: ${h.toFixed(1)} },`;
        setPicked(text);
        try { navigator.clipboard.writeText(text); } catch (_) { /* ignore */ }
      }
      return s;
    });
  };

  let stage = null;
  if (z && nat) {
    const ar = (z.w * nat.w) / (z.h * nat.h);
    stage = (
      <div
        className="lb-region"
        style={{
          width: `min(92vw, ${76 * ar}vh)`,
          aspectRatio: ar,
          backgroundImage: `url(${item.src})`,
          backgroundSize: `${10000 / z.w}% ${10000 / z.h}%`,
          backgroundPosition: `${z.w >= 100 ? 0 : (z.x / (100 - z.w)) * 100}% ${z.h >= 100 ? 0 : (z.y / (100 - z.h)) * 100}%`,
        }}
      />
    );
  } else if (!z) {
    stage = (
      <div className="lb-imgwrap" onMouseDown={down} onMouseMove={move} onMouseUp={up} onMouseLeave={up}>
        <img ref={imgRef} className="lb-img" src={item.src} alt={item.caption} draggable={false} />
        {sel && (
          <div
            className="lb-sel"
            style={{
              left: Math.min(sel.x0, sel.x1),
              top: Math.min(sel.y0, sel.y1),
              width: Math.abs(sel.x1 - sel.x0),
              height: Math.abs(sel.y1 - sel.y0),
            }}
          />
        )}
      </div>
    );
  }

  return createPortal(
    <div className="lb-overlay" onClick={onClose}>
      <div className="lb-top" onClick={(e) => e.stopPropagation()}>
        <div className="lb-title">{item.caption}</div>
        <button className="lb-close" onClick={onClose} aria-label="close">✕</button>
      </div>

      <div className="lb-stage" onClick={(e) => e.stopPropagation()}>{stage}</div>

      {zooms.length > 0 && (
        <div className="lb-chips" onClick={(e) => e.stopPropagation()}>
          <button className={`lb-chip ${view === -1 ? "on" : ""}`} onClick={() => setView(-1)}>full image</button>
          {zooms.map((zz, i) => (
            <button key={i} className={`lb-chip ${view === i ? "on" : ""}`} onClick={() => setView(i)}>
              {zz.label}
            </button>
          ))}
        </div>
      )}

      {zoomTool && (
        <div className="lb-pick" onClick={(e) => e.stopPropagation()}>
          {picked || "zoom tool: drag on the image to measure a detail (copied to the clipboard)"}
        </div>
      )}
    </div>,
    document.body
  );
}

/* ── Callouts: zoom inset + arrow pointing to a salient area of a screenshot ──
   callouts: [{ label, x, y, w, h, at: "br" | "bl" | "tr" | "tl", size: 0.36, src }]
   x, y, w, h = the area the arrow points to, in % of the image (same numbers the zoom tool gives).
   src (optional) = your own small screenshot to show in the inset; without it the area itself is enlarged. */
function exitPoint(rect, toward) {
  const cx = rect.x + rect.w / 2;
  const cy = rect.y + rect.h / 2;
  const dx = toward.x - cx;
  const dy = toward.y - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const sx = dx !== 0 ? rect.w / 2 / Math.abs(dx) : Infinity;
  const sy = dy !== 0 ? rect.h / 2 / Math.abs(dy) : Infinity;
  const s = Math.min(sx, sy);
  return { x: cx + dx * s, y: cy + dy * s };
}

let coCounter = 0;
function Callouts({ src, items, fit }) {
  const ref = useRef(null);
  const idRef = useRef(++coCounter);
  const [size, setSize] = useState(null);
  const [nat, setNat] = useState(null);
  const [own, setOwn] = useState({}); // natural sizes of the small screenshots (c.src)

  useEffect(() => {
    const img = new Image();
    img.onload = () => setNat({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = src;
  }, [src]);

  useEffect(() => {
    items.forEach((c) => {
      if (!c.src) return;
      const img = new Image();
      img.onload = () => setOwn((o) => ({ ...o, [c.src]: { w: img.naturalWidth, h: img.naturalHeight } }));
      img.src = c.src;
    });
  }, [items]);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (!size || !nat) return <div className="co-layer" ref={ref} />;

  const W = size.w;
  const H = size.h;
  const scale = fit === "contain" ? Math.min(W / nat.w, H / nat.h) : Math.max(W / nat.w, H / nat.h);
  const dw = nat.w * scale;
  const dh = nat.h * scale;
  const ox = (W - dw) / 2;
  const oy = 0;

  return (
    <div className="co-layer" ref={ref}>
      {items.map((c, i) => {
        const mine = c.src ? own[c.src] : null;
        if (c.src && !mine) return null; // small screenshot not found: draw nothing
        const box = { x: ox + (c.x / 100) * dw, y: oy + (c.y / 100) * dh, w: (c.w / 100) * dw, h: (c.h / 100) * dh };
        const ar = mine ? mine.w / mine.h : (c.w * nat.w) / (c.h * nat.h);
        let iw = W * (c.size || 0.36);
        let ih = iw / ar;
        const maxH = H * 0.55;
        if (ih > maxH) { ih = maxH; iw = ih * ar; }
        const at = c.at || (c.src ? "tr" : "br");
        const pad = 12;
        const inset = {
          x: at.includes("l") ? pad : W - iw - pad,
          y: at.includes("t") ? pad : H - ih - pad,
          w: iw,
          h: ih,
        };
        const from = exitPoint(inset, { x: box.x + box.w / 2, y: box.y + box.h / 2 });
        const to = exitPoint(box, { x: inset.x + inset.w / 2, y: inset.y + inset.h / 2 });
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2;
        const nx = -(to.y - from.y);
        const ny = to.x - from.x;
        const len = Math.hypot(nx, ny) || 1;
        const bend = Math.min(28, len * 0.18);
        const cx = mx + (nx / len) * bend;
        const cy = my + (ny / len) * bend;
        const ang = (Math.atan2(to.y - cy, to.x - cx) * 180) / Math.PI;
        const gid = `co-${idRef.current}-${i}`;

        return (
          <div key={i}>
            <div className="co-box" style={{ left: box.x, top: box.y, width: box.w, height: box.h }} />
            <div
              className="co-inset"
              style={{
                left: inset.x,
                top: inset.y,
                width: inset.w,
                height: inset.h,
                ...(mine
                  ? { backgroundImage: `url(${c.src})`, backgroundSize: "cover", backgroundPosition: "center" }
                  : {
                      backgroundImage: `url(${src})`,
                      backgroundSize: `${10000 / c.w}% ${10000 / c.h}%`,
                      backgroundPosition: `${c.w >= 100 ? 0 : (c.x / (100 - c.w)) * 100}% ${c.h >= 100 ? 0 : (c.y / (100 - c.h)) * 100}%`,
                    }),
              }}
            >
              {c.label && <div className="co-label">{c.label}</div>}
            </div>
            <svg className="co-svg" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
              <defs>
                <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1={from.x} y1={from.y} x2={to.x} y2={to.y}>
                  <stop offset="0" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <path
                className="co-path"
                pathLength="1"
                d={`M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`}
                fill="none"
                stroke={`url(#${gid})`}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                className="co-head"
                d="M 1 0 L -9 -5.5 L -9 5.5 Z"
                fill="#8b5cf6"
                transform={`translate(${to.x} ${to.y}) rotate(${ang})`}
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

/* ── Interactive demos that replace a screenshot ── */
const DEMOS = { support: SupportDemo, "shift-edit": ShiftEditDemo };
function DemoSlot({ name, caption }) {
  const Demo = DEMOS[name];
  if (!Demo) return null;
  return (
    <figure className="detail-shot demo-shot">
      <div className="shot-frame"><Demo /></div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/* ── Screenshot frame: shows an animated placeholder if the image is missing ── */
function Shot({ src, caption, n, fit, onOpen, callouts }) {
  const [failed, setFailed] = useState(!src);
  return (
    <figure
      className={`detail-shot spot ${onOpen && !failed ? "zoomable" : ""}`}
      onMouseMove={spot}
      onClick={() => onOpen && !failed && onOpen(-1)}
    >
      <div className="shot-frame">
        {failed ? (
          <div className="ph"><div className="ph-n">{n}</div></div>
        ) : (
          <img
            src={src}
            alt={caption}
            style={fit ? { objectFit: fit } : undefined}
            onError={() => setFailed(true)}
          />
        )}
        {callouts && !failed && <Callouts src={src} items={callouts} fit={fit} />}
      </div>
      {onOpen && !failed && <i className="shot-hint">⤢</i>}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/* ── Stat card with count-up ── */
function Stat({ value, label, suffix = "", prefix = "", delay = 0 }) {
  const ref = useRef(null);
  const isNum = typeof value === "number";
  const [shown, setShown] = useState(isNum ? 0 : value);

  useEffect(() => {
    if (!isNum) return;
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setShown(value); return; }
    let raf;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const dur = 1300;
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        setShown(Math.round(value * eased));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, isNum]);

  const text = typeof shown === "number" ? shown.toLocaleString("en-US") : shown;
  return (
    <div
      ref={ref}
      className="stat spot reveal rv-scale"
      style={{ "--d": delay }}
      onMouseMove={spot}
    >
      <div className="stat-value">{prefix}{text}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const barRef = useRef(null);
  const [lb, setLb] = useState(null);

  const detailed = projects.filter((p) => p.slug);
  const index = detailed.findIndex((p) => p.slug === slug);
  const proj = detailed[index];

  const typedTitle = useTyped(proj ? proj.title : "");

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  useReveal(slug);
  useProgress(barRef, slug);

  const nav = (
    <nav className="projects-nav">
      <Link to="/" className="projects-logo">cs.</Link>
      <ul className="projects-nav-links">
        <li><Link to="/">home</Link></li>
        <li><Link to="/about">about me</Link></li>
        <li><Link to="/projects" className="active">projects</Link></li>
        <li><Link to="/contacts">contact me</Link></li>
      </ul>
    </nav>
  );

  if (!proj) {
    return (
      <div className="projects-root">
        {nav}
        <div className="projects-aurora">
          <h1 className="projects-hero-title">Project not found</h1>
          <Link to="/projects" className="learn-more">← back to projects</Link>
        </div>
      </div>
    );
  }

  const next = detailed[(index + 1) % detailed.length];

  return (
    <div className="projects-root" key={slug}>
      <div className="read-progress" ref={barRef} />
      {nav}

      {/* HERO: aurora, text left, album right */}
      <section className="projects-aurora detail-hero">
        <div className="detail-orbs" aria-hidden="true">
          <span /><span /><span />
        </div>

        <div className="detail-hero-text">
          <Link to="/projects" className="learn-more">← back</Link>
          <p className="project-index detail-category">{proj.category}</p>
          <h1 className="projects-hero-title">
            {typedTitle}<span className="projects-hero-cursor"></span>
          </h1>
          <p className="project-desc detail-intro">{proj.description}</p>
        </div>

        {proj.gallery ? (
          <Album items={proj.gallery} />
        ) : (
          <div className="project-blob detail-blob">
            <img src={proj.image} alt={proj.title} />
          </div>
        )}
      </section>

      <div className="projects-divider" />

      {/* STATS */}
      {proj.stats && (
        <div className="detail-stats">
          {proj.stats.map((s, i) => (
            <Stat key={i} {...s} delay={i} />
          ))}
        </div>
      )}

      {/* VIEW-ONLY DOCUMENT */}
      {proj.document && (
        <div className="detail-doc">
          <ThesisViewer doc={proj.document} />
        </div>
      )}

      {/* FEATURES */}
      {proj.features && (
        <div className="detail-features">
          <p className="project-index detail-block-title reveal">what it does</p>
          {proj.note && <p className="detail-note reveal">{proj.note}</p>}
          {proj.features.map((f, i) => (
            <div key={i} className={`feature ${i % 2 === 1 ? "reverse" : ""} ${f.noShot ? "solo" : ""}`}>
              <div className="feature-text reveal">
                <p className="project-index">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="feature-title">{f.title}</h3>
                <p className="project-desc detail-desc">{f.text}</p>
              </div>
              {!f.noShot && (
                <div className="feature-shot reveal rv-scale">
                  {f.demo ? (
                    <DemoSlot name={f.demo} caption={f.caption} />
                  ) : (
                  <Shot
                    src={f.image}
                    caption={f.caption || f.title}
                    fit={f.fit}
                    callouts={f.callouts}
                    n={String(i + 1).padStart(2, "0")}
                    onOpen={
                      f.image
                        ? (k) => setLb({ item: { src: f.image, caption: f.caption || f.title, zooms: f.zooms }, view: k })
                        : undefined
                    }
                  />
                  )}
                  {f.image && f.zooms && (
                    <div className="zoom-chips">
                      {f.zooms.map((zz, k) => (
                        <button
                          key={k}
                          className="zoom-chip"
                          onClick={() =>
                            setLb({ item: { src: f.image, caption: f.caption || f.title, zooms: f.zooms }, view: k })
                          }
                        >
                          <i className="zoom-ico">⌕</i>
                          <b>{zz.label}</b>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ROADMAP */}
      {proj.roadmap && (
        <div className="detail-roadmap">
          <p className="project-index detail-block-title reveal">roadmap</p>
          <div className="timeline observe">
            {proj.roadmap.map((r, i) => (
              <div key={i} className={`tl-item reveal rv-left ${r.status}`}>
                <span className="tl-dot" />
                <p className="tl-status">{r.status === "now" ? "in progress" : r.status}</p>
                <h4 className="tl-title">{r.title}</h4>
                <p className="project-desc tl-text">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STACK */}
      <div className="detail-stack">
        <p className="project-index detail-block-title reveal">stack &amp; skills</p>
        <div className="detail-chips">
          {proj.skills.map((s, i) => (
            <span
              key={i}
              className="detail-chip reveal rv-scale"
              style={{ "--d": i * 0.5 }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* NEXT */}
      <div className="detail-next">
        <Link to="/projects" className="learn-more">← all projects</Link>
        <Link to={`/projects/${next.slug}`} className="learn-more">
          next: {next.title} <span>→</span>
        </Link>
      </div>

      <footer className="projects-footer">
        <span className="projects-footer-left">© 2026 Chiara Sivieri</span>
        <div className="projects-footer-links">
          <a href="https://github.com/chiarasivieri" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/chiara-sivieri-604099332" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </footer>

      {lb && (
        <Lightbox item={lb.item} startView={lb.view} onClose={() => setLb(null)} />
      )}
    </div>
  );
}