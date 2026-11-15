import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./About.css";
import { useLang, LangToggle } from "./i18n";

export default function About() {
  const { lang, t } = useLang();

  const [typedText, setTypedText] = useState('');
  const [typedSub, setTypedSub] = useState('');

  useEffect(() => {
    const title = t('aboutTitle');
    const sub = t('aboutSub');
    const CHAR_DELAY = 80;
    const SUB_DELAY = 50;
    const timeouts = [];
    const schedule = (fn, delay) => { const id = setTimeout(fn, delay); timeouts.push(id); };

    setTypedText('');
    setTypedSub('');

    for (let i = 1; i <= title.length; i++) {
      schedule(() => setTypedText(title.slice(0, i)), 200 + i * CHAR_DELAY);
    }

    const subStart = 200 + title.length * CHAR_DELAY + 400;
    for (let i = 1; i <= sub.length; i++) {
      schedule(() => setTypedSub(sub.slice(0, i)), subStart + i * SUB_DELAY);
    }

    return () => timeouts.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <div className="about-root">

      {/* NAV */}
      <nav className="about-nav">
        <Link to="/" className="about-logo">cs.</Link>
        <ul className="about-nav-links">
          <li><Link to="/">{t("home")}</Link></li>
          <li><Link to="/about" className="active">{t("about")}</Link></li>
          <li><Link to="/projects">{t("projects")}</Link></li>
          <li><Link to="/contacts">{t("contacts")}</Link></li>
          <li><LangToggle /></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="about-aurora">
        <p className="about-page-label">{t("aboutLabel")}</p>
        <h1 className="about-hero-title">
          {typedText}<span className="about-hero-cursor"></span>
        </h1>
        <p className="about-hero-sub">{typedSub}</p>
      </section>

      <div className="about-divider" />

      {/* BIO */}
      <section className="about-bio">
        <div className="about-blob">
          <img src="/assets/laurea.jpg" alt="Chiara Sivieri" />
        </div>
        <div className="about-bio-text">
          <h2>{t("hi")}</h2>
          <p>{t("bio1")}</p>
          <p>{t("bio2")}</p>
          <p>{t("bio3")}</p>
        </div>
      </section>

      <div className="about-divider" />

      {/* QUOTE */}
      <section className="about-quote-wrap">
        <div className="about-quote-row">
          <div className="about-quote-card">
            <p className="about-quote-text">{t("quote")}</p>
            <span className="about-quote-cite">{t("quoteCite")}</span>
          </div>
          <div className="about-quote-photo">
            <img src="/assets/about-2.jpg" alt="Chiara Sivieri" onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }} />
          </div>
        </div>
      </section>

      <div className="about-divider" />

      {/* GOAL */}
      <section className="about-goal-wrap">
        <p className="about-section-label">{t("goalLabel")}</p>
        <div className="about-goal-card">
          <p>{t("goal")}</p>
        </div>
      </section>

      <div className="about-divider" />

      {/* CV */}
      <section className="about-cv-wrap">
        <p className="about-section-label">{t("cvLabel")}</p>
        <div className="about-cv-row">
          <a href="/assets/Chiara_Sivieri_CV_ENG.pdf" target="_blank" rel="noopener noreferrer" className="about-cv-btn">
            🇬🇧 {t("cvEn")}
          </a>
          <a href="/assets/CHIARA_SIVIERI_CV_IT.pdf" target="_blank" rel="noopener noreferrer" className="about-cv-btn">
            🇮🇹 {t("cvIt")}
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="about-footer">
        <span className="about-footer-left">© 2026 Chiara Sivieri</span>
        <div className="about-footer-links">
          <a href="https://github.com/chiarasivieri" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/chiara-sivieri-604099332" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </footer>

    </div>
  );
}