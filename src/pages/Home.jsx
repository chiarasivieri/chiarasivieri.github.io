import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang, LangToggle } from "./i18n";
import "./Home.css";

export default function Home() {
  const { t } = useLang();
  const [typedText, setTypedText] = useState('');
  const [showSub, setShowSub] = useState(false);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const text = "Chiara Sivieri";
    const CHAR_DELAY = 80;
    const timeouts = [];
    const schedule = (fn, delay) => { const id = setTimeout(fn, delay); timeouts.push(id); };

    setTypedText('');
    setShowSub(false);
    setShowCta(false);

    for (let i = 1; i <= text.length; i++) {
      schedule(() => setTypedText(text.slice(0, i)), 300 + i * CHAR_DELAY);
    }

    const end = 300 + text.length * CHAR_DELAY + 500;
    schedule(() => setShowSub(true), end);
    schedule(() => setShowCta(true), end + 200);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="home-root">

      {/* NAVBAR */}
      <nav className="home-nav">
        <Link to="/" className="home-logo">cs.</Link>
        <ul className="home-nav-links">
          <li><Link to="/about">{t("about")}</Link></li>
          <li><Link to="/projects">{t("projects")}</Link></li>
          <li><Link to="/contacts">{t("contacts")}</Link></li>
          <li><LangToggle /></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="home-hero">
        <p className="home-eyebrow">{t("homeEyebrow")}</p>
        <h1 ref={null} className="home-hero-title">
          {typedText}<span className="home-cursor"></span>
        </h1>
        <p className={`home-sub${showSub ? ' visible' : ''}`}>
          {t("homeSub")}
        </p>
        <div className={`home-cta-row${showCta ? ' visible' : ''}`}>
          <Link to="/projects" className="home-btn">{t("viewProjects")}</Link>
          <Link to="/contacts" className="home-btn home-btn-ghost">{t("contactArrow")}</Link>
        </div>
      </section>

      <div className="home-divider" />

      {/* SELECTED PROJECTS */}
      <section className="home-section">
        <p className="home-section-label">{t("selected")}</p>
        <div className="home-projects">
          <Link to="/projects/archivia" className="home-card">
            <p className="home-card-tag">01 — {t("tagCV")}</p>
            <h3>ArchivIA</h3>
            <p>{t("cardArchivia")}</p>
            <div className="home-stack">
              <span className="home-tag">PyTorch</span>
              <span className="home-tag">React</span>
              <span className="home-tag">FastAPI</span>
            </div>
          </Link>
          <Link to="/projects/ai-turni" className="home-card">
            <p className="home-card-tag">02 — {t("tagHealth")}</p>
            <h3>AI.Turni</h3>
            <p>{t("cardTurni")}</p>
            <div className="home-stack">
              <span className="home-tag">Constrained Optimization</span>
              <span className="home-tag">React</span>
              <span className="home-tag">FastAPI</span>
            </div>
          </Link>
          <Link to="/projects/llmf" className="home-card">
            <p className="home-card-tag">03 — {t("tagCV")}</p>
            <h3>LLMF</h3>
            <p>{t("cardLlmf")}</p>
            <div className="home-stack">
              <span className="home-tag">YOLOv8</span>
              <span className="home-tag">Python</span>
              <span className="home-tag">Fine Tuning</span>
            </div>
          </Link>
        </div>
      </section>

      <div className="home-divider" />

      {/* FOOTER */}
      <footer className="home-footer">
        <span className="home-footer-left">{t("footerLeft")}</span>
        <div className="home-footer-links">
          <a href="https://github.com/chiarasivieri" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/chiara-sivieri-604099332" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <Link to="/contacts">{t("email")}</Link>
        </div>
      </footer>

    </div>
  );
}