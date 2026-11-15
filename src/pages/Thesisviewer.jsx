import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const pad = (n) => String(n).padStart(2, "0");

/* cursor-following glow */
const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

/*
  View-only document reader.
  Pages are pre-rendered, watermarked images (the original PDF is never published),
  drawn on a canvas. Right click, drag, selection, print and common shortcuts are disabled,
  and the page is hidden when the window loses focus.
  Note: this deters casual copying; no website can fully block screenshots or screen recording.
*/
export default function ThesisViewer({ doc }) {
  const skip = doc.skip || [];
  const pages = Array.from({ length: doc.count }, (_, i) => i + 1).filter((n) => !skip.includes(n));
  const total = pages.length;
  const ext = doc.ext || "jpg";
  const src = (k) => `${doc.folder}page-${pad(pages[k])}.${ext}`;

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [away, setAway] = useState(false);
  const [error, setError] = useState(false);
  const canvasRef = useRef(null);

  const go = useCallback(
    (d) => setIdx((i) => Math.min(total - 1, Math.max(0, i + d))),
    [total]
  );

  /* draw the current page on the canvas */
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(false);
    let alive = true;
    const img = new Image();
    img.onload = () => {
      if (!alive || !canvasRef.current) return;
      const c = canvasRef.current;
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext("2d").drawImage(img, 0, 0);
      setLoading(false);
    };
    img.onerror = () => {
      if (!alive) return;
      setLoading(false);
      setError(true);
    };
    img.src = src(idx);
    if (idx + 1 < total) {
      const pre = new Image();
      pre.src = src(idx + 1);
    }
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, idx]);

  /* protections while the viewer is open */
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("tv-open");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(-1); }
      else if ((e.ctrlKey || e.metaKey) && ["s", "p", "c", "a", "u"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    const onKeyUp = (e) => {
      if (e.key === "PrintScreen") {
        try { navigator.clipboard.writeText(""); } catch (_) { /* ignore */ }
        setAway(true);
      }
    };
    const onBlur = () => setAway(true);
    const onVis = () => { if (document.hidden) setAway(true); };

    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVis);
      document.body.classList.remove("tv-open");
      document.body.style.overflow = prevOverflow;
    };
  }, [open, go]);

  const openViewer = () => { setIdx(0); setZoom(1); setAway(false); setOpen(true); };

  const stop = (e) => e.preventDefault();

  return (
    <>
      {/* BAND shown in the page */}
      <div className="doc-band spot reveal rv-scale" onMouseMove={spot}>
        <div className="doc-cover">
          <img src={src(0)} alt="" draggable={false} onContextMenu={stop} onError={(e) => { e.currentTarget.style.display = "none"; }} />
        </div>
        <div className="doc-info">
          <div className="doc-kicker">read the document</div>
          <div className="doc-title">{doc.title}</div>
          {doc.subtitle && <div className="doc-sub">{doc.subtitle}</div>}
          <div className="doc-note">View only — downloading and printing are disabled.</div>
          <button className="doc-btn" onClick={openViewer}>
            read the thesis <span>→</span>
          </button>
        </div>
      </div>

      {/* VIEWER */}
      {open &&
        createPortal(
          <div className="tv-overlay" onContextMenu={stop} onDragStart={stop}>
            <div className="tv-top">
              <div className="tv-title">{doc.title}</div>
              <div className="tv-tools">
                <button className="tv-btn" onClick={() => setZoom((z) => Math.max(0.7, +(z - 0.25).toFixed(2)))} aria-label="zoom out">−</button>
                <span className="tv-zoom">{Math.round(zoom * 100)}%</span>
                <button className="tv-btn" onClick={() => setZoom((z) => Math.min(2, +(z + 0.25).toFixed(2)))} aria-label="zoom in">+</button>
                <button className="tv-btn tv-close" onClick={() => setOpen(false)} aria-label="close">✕</button>
              </div>
            </div>

            <div className="tv-stage">
              <div className="tv-page" style={{ maxWidth: `${820 * zoom}px` }}>
                <canvas ref={canvasRef} className="tv-canvas" />
                <div className="tv-wm" />
              </div>
              {loading && <div className="tv-loading">loading…</div>}
              {error && (
                <div className="tv-loading tv-error">
                  page not found
                  <br />
                  check that the images are in
                  <br />
                  public/assets/thesis/
                </div>
              )}
            </div>

            <div className="tv-nav">
              <button className="tv-btn" onClick={() => go(-1)} disabled={idx === 0} aria-label="previous page">←</button>
              <div className="tv-progress">
                <div className="tv-bar" style={{ width: `${((idx + 1) / total) * 100}%` }} />
              </div>
              <span className="tv-count">{idx + 1} / {total}</span>
              <button className="tv-btn" onClick={() => go(1)} disabled={idx === total - 1} aria-label="next page">→</button>
            </div>

            {away && (
              <div className="tv-away" onClick={() => setAway(false)}>
                <div>viewing paused</div>
                <div className="tv-away-sub">click to resume</div>
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}