import { useSyncExternalStore } from "react";

/* ── tiny language store (no provider needed) ── */
const KEY = "cs-lang";
const listeners = new Set();
let lang = "en";
try {
  const saved = localStorage.getItem(KEY);
  if (saved === "it" || saved === "en") lang = saved;
  else if ((navigator.language || "").toLowerCase().startsWith("it")) lang = "it";
} catch (e) { /* storage unavailable */ }

export function setLang(next) {
  lang = next;
  try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
  try { document.documentElement.lang = next; } catch (e) { /* ignore */ }
  listeners.forEach((l) => l());
}

const subscribe = (cb) => { listeners.add(cb); return () => listeners.delete(cb); };
const getSnapshot = () => lang;

/* ── UI strings ── */
const UI = {
  en: {
    home: "home", about: "about me", projects: "projects", contacts: "contact me",
    projectsTitle: "Projects", projectsSub: "Ideas brought to life, one project at a time",
    skills: "skills", learnMore: "learn more", back: "← back", allProjects: "← all projects",
    next: "next:", whatItDoes: "what it does", roadmap: "roadmap", stack: "stack & skills",
    notFound: "Project not found", backToProjects: "← back to projects",
    done: "done", now: "in progress", nextStatus: "next", future: "future",
    fullImage: "full image", photo: "Photo", interactiveDemo: "interactive demo",
    readDoc: "read the document", viewOnly: "View only — downloading and printing are disabled.",
    readThesis: "read the thesis", paused: "viewing paused", resume: "click to resume", loading: "loading…",
    aboutLabel: "Ai and Web Developer", aboutTitle: "About me", aboutSub: "Written and directed by Naoki Urasawa",
    hi: "Hi, I'm Chiara.",
    bio1: "Curiosity has always been my driving force. I'm a Computer Scientist and currently a Master's student in Artificial Intelligence at the University of Bologna, where I explore how technology can shape the future.",
    bio2: "Yet my interests go far beyond code and algorithms, I'm equally fascinated by literature and art. I believe that knowledge is most powerful when it's broad and interconnected, and I strive to keep a 360° perspective in everything I do.",
    bio3: "For me, learning is not just about acquiring skills, but about cultivating creativity, critical thinking, and a deeper understanding of the world.",
    quote: "\"Engineers turn dreams into reality.\"", quoteCite: "— The Wind Rises, 2013",
    goalLabel: "the next goal",
    goal: "Biomedical data analysis is an area where machine learning still has enormous, largely unexplored potential. I'm drawn to the challenge of extracting meaningful patterns from complex biosignals, where the complexity of the data reflects the complexity of the human body itself. It's a field where methodological rigor isn't optional: when model reliability directly affects clinical decisions, there's no room for shortcuts. That's exactly the kind of environment I want to work in, where the technical challenges are hard and the results actually matter.",
    cvLabel: "curriculum vitae", cvEn: "preview english", cvIt: "preview italiano",
  },
  it: {
    home: "home", about: "chi sono", projects: "progetti", contacts: "contatti",
    projectsTitle: "Progetti", projectsSub: "Idee che prendono vita, un progetto alla volta",
    skills: "competenze", learnMore: "scopri di più", back: "← indietro", allProjects: "← tutti i progetti",
    next: "prossimo:", whatItDoes: "cosa fa", roadmap: "roadmap", stack: "stack e competenze",
    notFound: "Progetto non trovato", backToProjects: "← torna ai progetti",
    done: "completato", now: "in corso", nextStatus: "prossimo", future: "futuro",
    fullImage: "immagine intera", photo: "Foto", interactiveDemo: "demo interattiva",
    readDoc: "leggi il documento", viewOnly: "Sola lettura — download e stampa sono disabilitati.",
    readThesis: "leggi la tesi", paused: "visualizzazione in pausa", resume: "clicca per riprendere", loading: "caricamento…",
    aboutLabel: "AI e Web Developer", aboutTitle: "Chi sono", aboutSub: "Scritto e diretto da Naoki Urasawa",
    hi: "Ciao, sono Chiara.",
    bio1: "La curiosità è sempre stata la mia forza trainante. Sono un'informatica e attualmente frequento la laurea magistrale in Intelligenza Artificiale all'Università di Bologna, dove esploro come la tecnologia può plasmare il futuro.",
    bio2: "Eppure i miei interessi vanno ben oltre il codice e gli algoritmi: sono ugualmente affascinata dalla letteratura e dall'arte. Credo che la conoscenza sia più potente quando è ampia e interconnessa, e cerco di mantenere una prospettiva a 360° in tutto ciò che faccio.",
    bio3: "Per me imparare non significa solo acquisire competenze, ma coltivare creatività, pensiero critico e una comprensione più profonda del mondo.",
    quote: "\"Il progettista è colui che conferisce forma al sogno.\"", quoteCite: "— Si alza il vento, 2013",
    goalLabel: "il prossimo obiettivo",
    goal: "L'analisi di dati biomedici è un ambito in cui il machine learning ha ancora un potenziale enorme e in gran parte inesplorato. Mi attrae la sfida di estrarre pattern significativi da biosegnali complessi, dove la complessità dei dati riflette quella del corpo umano. È un campo in cui il rigore metodologico non è opzionale: quando l'affidabilità di un modello incide direttamente sulle decisioni cliniche, non ci sono scorciatoie. È esattamente l'ambiente in cui voglio lavorare, dove le sfide tecniche sono difficili e i risultati contano davvero.",
    cvLabel: "curriculum vitae", cvEn: "anteprima inglese", cvIt: "anteprima italiano",
  },
};

export function useLang() {
  const l = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const t = (key) => (UI[l] && UI[l][key]) ?? UI.en[key] ?? key;
  return { lang: l, setLang, t };
}

/* ── EN | IT switch, to place inside any nav ── */
export function LangToggle() {
  const { lang: l } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label="language">
      <button type="button" className={l === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
      <button type="button" className={l === "it" ? "on" : ""} onClick={() => setLang("it")}>IT</button>
    </div>
  );
}

/* ── merge the Italian overrides into a project ── */
export function localizeProject(p, l, IT) {
  const it = l === "it" && IT ? IT[p.slug || p.title] : null;
  const photoWord = UI[l].photo;
  const gallery = p.gallery && p.gallery.map((g) => ({ ...g, caption: (g.caption || "").replace(/^Photo/, photoWord) }));
  if (!it) return { ...p, gallery };
  const stat = (s, i) => {
    const x = it.stats && it.stats[i];
    if (x == null) return s;
    return Array.isArray(x) ? { ...s, label: x[0], value: x[1] } : { ...s, label: x };
  };
  return {
    ...p,
    gallery,
    category: it.category ?? p.category,
    description: it.description ?? p.description,
    note: it.note ?? p.note,
    stats: p.stats && p.stats.map(stat),
    features: p.features && p.features.map((f, i) => {
      const x = (it.features && it.features[i]) || {};
      return {
        ...f,
        title: x.title ?? f.title,
        text: x.text ?? f.text,
        caption: x.caption ?? f.caption,
        callouts: f.callouts && f.callouts.map((c, j) => ({ ...c, label: (x.callouts && x.callouts[j]) ?? c.label })),
      };
    }),
    roadmap: p.roadmap && p.roadmap.map((r, i) => ({
      ...r,
      title: (it.roadmap && it.roadmap[i] && it.roadmap[i][0]) ?? r.title,
      text: (it.roadmap && it.roadmap[i] && it.roadmap[i][1]) ?? r.text,
    })),
    document: p.document && it.document ? { ...p.document, ...it.document } : p.document,
  };
}