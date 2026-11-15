import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "./i18n";

/* Interactive replicas of two Rizzol.IA screens, built in HTML so the text stays editable. */

const SHIFT = {
  m:  { bg: "#c9dcfa", fg: "#2457c5", name: "Morning" },
  M:  { bg: "#e6e9f1", fg: "#2f3447", name: "Morning (day staff)" },
  I:  { bg: "#fde6cf", fg: "#c5441b", name: "Afternoon" },
  P:  { bg: "#f6c48f", fg: "#7a410d", name: "Afternoon (day staff)" },
  N:  { bg: "#1f2a50", fg: "#ffffff", name: "Night" },
  r:  { bg: "#e3e6f0", fg: "#5a6178", name: "Rest after night", italic: true },
  R:  { bg: "#e4f3e7", fg: "#1f6b3a", border: "#90cfa3", name: "Rest" },
  F:  { bg: "#f28c2e", fg: "#ffffff", name: "Leave" },
  A:  { bg: "#fbe0e0", fg: "#c0322c", name: "Absence" },
  RO: { bg: "#ececec", fg: "#333333", name: "Hours recovery" },
  S:  { bg: "#ece6fb", fg: "#6d2fdc", dashed: "#6d2fdc", name: "Free, to be assigned" },
  "--": { bg: "#f1f3f8", fg: "#9aa0b4", name: "No shift" },
};

function Cell({ code, onClick, manual, pulse, hl }) {
  const s = SHIFT[code];
  const style = { background: s.bg, color: s.fg };
  if (s.border) style.borderColor = s.border;
  if (s.dashed) { style.borderColor = s.dashed; style.borderStyle = "dashed"; }
  if (manual) { style.borderColor = "#8a3b1c"; style.borderStyle = "dashed"; }
  const cls = `dm-cell ${s.italic ? "it" : ""} ${pulse ? "pulse" : ""} ${hl ? "hl" : ""} ${onClick ? "click" : ""}`;
  const label = code === "--" ? "–" : code;
  if (!onClick) return <div className={cls} style={style} title={`${code} · ${s.name}`}>{label}</div>;
  return (
    <button type="button" className={cls} style={style} title={`${code} · ${s.name}`} onClick={onClick}>
      {label}
    </button>
  );
}

function Bar({ title }) {
  const { t } = useLang();
  return (
    <div className="dm-bar">
      <b>{title}</b>
      <i>{t("interactiveDemo")}</i>
    </div>
  );
}

/* ───────────────────────── Support: the purple S ───────────────────────── */

const SUP_DAYS = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const SUP_BACK = ["N", "r", "F", "F", "F", "F", "F", "S", "m", "I", "N"];
const SUP_PARTNER = ["N", "r", "R", "m", "I", "N", "r", "R", "m", "I", "N"];
const S_INDEX = 7; // day 11

const ICONS = {
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l5 5" />
    </svg>
  ),
  pencil: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l4-1 11-11-3-3L5 16z" />
    </svg>
  ),
};

const TILES_IT = {
  1: { title: "Quando compare", text: "Al rientro da ferie o malattia, nei giorni in cui il ciclo dei turni prevederebbe un riposo per riallinearsi con il partner di lavoro." },
  2: { title: "Cosa significa", text: "La persona è libera ma non ha un turno: conta 0 ore finché non le viene assegnato." },
  3: { title: "Cosa fa il coordinatore", text: "Clicca sulla cella e sceglie il turno dove serve, ad esempio per coprire un buco." },
};

const TILES = [
  {
    id: 1,
    icon: "calendar",
    title: "When it appears",
    text: "On the return from leave or sickness, on days when the shift cycle would prescribe a rest to realign with the work partner.",
  },
  {
    id: 2,
    icon: "search",
    title: "What it means",
    text: "The person is free but has no shift: she counts 0 hours until she is assigned.",
  },
  {
    id: 3,
    icon: "pencil",
    title: "What the coordinator does",
    text: "Clicks the cell and picks the shift where it is needed, for example to cover a gap.",
  },
];

export function SupportDemo() {
  const { lang } = useLang();
  const it = lang === "it";
  const [active, setActive] = useState(null);
  const [assigned, setAssigned] = useState(null);

  const back = SUP_BACK.map((c, i) => (i === S_INDEX && assigned ? assigned : c));

  const hlBack = (i) =>
    active === 1 ? i >= 2 && i <= S_INDEX : (active === 2 || active === 3) && i === S_INDEX;
  const hlPartner = (i) => active === 1 && i === S_INDEX;

  const choose = (id) => setActive((a) => (a === id ? null : id));

  return (
    <div className="dm-root">
      <Bar title={it ? "Griglia turni · rientro da assenza" : "Shift grid · returning from leave"} />
      <div className="dm-body">
        <div className="dm-scroll">
        <div className={`dm-grid s11 ${active ? "dim" : ""}`}>
          <div />
          {SUP_DAYS.map((d) => (
            <div key={d} className="dm-head">{d}</div>
          ))}

          <div className="dm-rowlabel">{it ? "Rientro da assenza" : "Back from leave"}</div>
          {back.map((c, i) => (
            <Cell
              key={i}
              code={c}
              hl={hlBack(i)}
              pulse={i === S_INDEX && !assigned && !active}
              manual={i === S_INDEX && !!assigned}
              onClick={i === S_INDEX ? () => setActive(3) : undefined}
            />
          ))}

          <div className="dm-rowlabel">{it ? "Partner di lavoro" : "Work partner"}</div>
          {SUP_PARTNER.map((c, i) => (
            <Cell key={i} code={c} hl={hlPartner(i)} />
          ))}
        </div>
        </div>

        <div className="dm-tiles">
          {TILES.map((t0) => { const t = it ? { ...t0, ...TILES_IT[t0.id] } : t0; return (
            <div
              key={t.id}
              role="button"
              tabIndex={0}
              className={`dm-tile ${active === t.id ? "on" : ""}`}
              onClick={() => choose(t.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && choose(t.id)}
            >
              <div className="dm-tile-head">
                <div className="dm-tile-ico">{ICONS[t.icon]}</div>
                <div className="dm-tile-title">{t.title}</div>
              </div>
              <div className="dm-tile-text">{t.text}</div>

              {t.id === 3 && active === 3 && (
                <div className="dm-tile-extra" onClick={(e) => e.stopPropagation()}>
                  {!assigned ? (
                    <>
                      <div className="dm-tile-hint">{it ? "Assegna il giorno 11:" : "Assign day 11:"}</div>
                      <div className="dm-assign">
                        {["m", "I", "N"].map((c) => (
                          <Cell key={c} code={c} onClick={() => setAssigned(c)} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="dm-tile-hint">
                        {it ? <>Assegnato <b>{assigned}</b>: ora conta nelle sue ore.</> : <>Assigned <b>{assigned}</b>: it now counts toward her hours.</>}
                      </div>
                      <button className="dm-link" onClick={() => setAssigned(null)}>{it ? "annulla" : "undo"}</button>
                    </>
                  )}
                </div>
              )}
            </div>
          ); })}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Edit a shift, with a reason ───────────────────────── */

const DAYS = [
  { d: 16, w: "Mon" }, { d: 17, w: "Tue" }, { d: 18, w: "Wed" }, { d: 19, w: "Thu" },
  { d: 20, w: "Fri" }, { d: 21, w: "Sat", we: true }, { d: 22, w: "Sun", we: true },
];
const PEOPLE = [
  { name: "Nurse A", tone: "#e1f3e4", row: ["N", "r", "R", "m", "I", "N", "r"] },
  { name: "Nurse B", tone: "#e0eefb", row: ["m", "I", "N", "r", "R", "m", "I"] },
  { name: "Nurse C", tone: "#fbe3e6", row: ["R", "m", "I", "N", "r", "R", "m"] },
];
const CODES = ["m", "M", "I", "P", "N", "r", "R", "--", "F", "A", "RO", "S"];
const REASONS = ["Personal request", "Organizational reason", "Other"];

function EditModal({ person, day, current, onCancel, onSave }) {
  const [code, setCode] = useState(current);
  const [reason, setReason] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const unchanged = code === current;
  const canSave = !unchanged && reason !== null;

  return createPortal(
    <div className="dm-overlay" onClick={onCancel}>
      <div className="dm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dm-modal-title">Edit shift</div>
        <div className="dm-modal-sub">{person} — {day.w} {day.d} November 2026</div>

        <div className="dm-codes">
          {CODES.map((c) => {
            const s = SHIFT[c];
            return (
              <button
                key={c}
                type="button"
                className={`dm-code ${code === c ? "sel" : ""}`}
                style={{
                  background: s.bg,
                  color: s.fg,
                  fontStyle: s.italic ? "italic" : "normal",
                  borderStyle: s.dashed ? "dashed" : "solid",
                  borderColor: code === c ? "#2f5b33" : s.dashed || s.border || "transparent",
                }}
                title={`${c} · ${s.name}`}
                onClick={() => setCode(c)}
              >
                {c === "--" ? "–" : c}
              </button>
            );
          })}
        </div>

        <div className="dm-reason-title">Reason for the change</div>
        {REASONS.map((r) => (
          <label key={r} className="dm-radio">
            <input type="radio" name="reason" checked={reason === r} onChange={() => setReason(r)} />
            {r}
          </label>
        ))}

        <div className="dm-actions">
          <div className="dm-hintline">
            {unchanged ? "Pick a different shift." : reason === null ? "A reason is required." : ""}
          </div>
          <button type="button" className="dm-btn" onClick={onCancel}>Cancel</button>
          <button
            type="button"
            className="dm-btn"
            disabled={!canSave}
            onClick={() => onSave(code, reason)}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function ShiftEditDemo() {
  const fresh = () => PEOPLE.map((p) => [...p.row]);
  const [grid, setGrid] = useState(fresh);
  const [manual, setManual] = useState({});
  const [history, setHistory] = useState([]);
  const [edit, setEdit] = useState(null); // { p, d }
  const [last, setLast] = useState(null); // "p-d" of the latest edited cell
  const [arrow, setArrow] = useState(null);

  const bodyRef = useRef(null);
  const labelRef = useRef(null);
  const cellRefs = useRef({});

  const save = (code, reason) => {
    const { p, d } = edit;
    const old = grid[p][d];
    setGrid((g) => g.map((row, i) => (i === p ? row.map((c, j) => (j === d ? code : c)) : row)));
    setManual((m) => ({ ...m, [`${p}-${d}`]: true }));
    setHistory((h) => [
      { when: `${DAYS[d].w} ${DAYS[d].d} Nov`, who: PEOPLE[p].name, change: `${old} → ${code}`, reason },
      ...h,
    ].slice(0, 3));
    setLast(`${p}-${d}`);
    setEdit(null);
  };

  const reset = () => {
    setGrid(fresh());
    setManual({});
    setHistory([]);
    setLast(null);
  };

  /* arrow from the callout to the edited cell */
  useLayoutEffect(() => {
    const measure = () => {
      if (!last) { setArrow(null); return; }
      const body = bodyRef.current;
      const cell = cellRefs.current[last];
      const label = labelRef.current;
      if (!body || !cell || !label) return;
      const b = body.getBoundingClientRect();
      const c = cell.getBoundingClientRect();
      const l = label.getBoundingClientRect();
      setArrow({
        w: b.width,
        h: b.height,
        sx: l.left - b.left + Math.min(40, l.width * 0.2),
        sy: l.top - b.top - 2,
        ex: c.left - b.left + c.width / 2,
        ey: c.bottom - b.top + 5,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [last, history.length]);

  const [lp, ld] = last ? last.split("-").map(Number) : [0, 0];

  return (
    <div className="dm-root">
      <Bar title="Nurses · November 2026" />
      <div className="dm-body" ref={bodyRef}>
        <div className="dm-grid w7">
          <div />
          {DAYS.map((x) => (
            <div key={x.d} className={`dm-head ${x.we ? "we" : ""}`}>{x.w} {x.d}</div>
          ))}
          {PEOPLE.map((p, i) => (
            <Row key={p.name}>
              <div className="dm-rowlabel" style={{ background: p.tone }}>{p.name}</div>
              {grid[i].map((c, j) => (
                <div key={j} ref={(el) => { cellRefs.current[`${i}-${j}`] = el; }}>
                  <Cell code={c} manual={!!manual[`${i}-${j}`]} onClick={() => setEdit({ p: i, d: j })} />
                </div>
              ))}
            </Row>
          ))}
        </div>

        <div className={`dm-hist ${last ? "with-callout" : ""}`}>
          <div className="dm-hist-title">
            <div>history</div>
            {history.length > 0 && <button className="dm-link" onClick={reset}>reset demo</button>}
          </div>
          {history.length === 0 && (
            <div className="dm-hist-empty">No changes yet. Click any cell to edit a shift.</div>
          )}
          {history.map((h, i) => (
            <div key={i} className="dm-hist-row">
              <b>{h.when}</b> · {h.who} · {h.change} · {h.reason}
            </div>
          ))}
        </div>

        {last && (
          <div className="dm-callout" ref={labelRef}>
            <div className="dm-callout-cell">
              <Cell code={grid[lp][ld]} manual />
            </div>
            <div>Edited shifts keep a dashed border, so they stand out from the generated ones.</div>
          </div>
        )}

        {last && arrow && (
          <svg
            key={history.length}
            className="dm-arrow"
            width={arrow.w}
            height={arrow.h}
            viewBox={`0 0 ${arrow.w} ${arrow.h}`}
          >
            <defs>
              <linearGradient id="dmGrad" gradientUnits="userSpaceOnUse" x1={arrow.sx} y1={arrow.sy} x2={arrow.ex} y2={arrow.ey}>
                <stop offset="0" stopColor="#38bdf8" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path
              className="dm-arrow-line"
              pathLength="1"
              d={`M ${arrow.sx} ${arrow.sy} C ${arrow.sx} ${arrow.sy - 38}, ${arrow.ex} ${arrow.ey + 38}, ${arrow.ex} ${arrow.ey}`}
              fill="none"
              stroke="url(#dmGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              className="dm-arrow-head"
              d={`M ${arrow.ex} ${arrow.ey - 1} L ${arrow.ex - 5} ${arrow.ey + 8} L ${arrow.ex + 5} ${arrow.ey + 8} Z`}
              fill="#8b5cf6"
            />
          </svg>
        )}
      </div>

      {edit && (
        <EditModal
          person={PEOPLE[edit.p].name}
          day={DAYS[edit.d]}
          current={grid[edit.p][edit.d]}
          onCancel={() => setEdit(null)}
          onSave={save}
        />
      )}
    </div>
  );
}

/* a row of grid children without adding a wrapper element */
function Row({ children }) {
  return <>{children}</>;
}