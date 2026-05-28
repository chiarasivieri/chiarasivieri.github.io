import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
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
          <li><Link to="/about">about me</Link></li>
          <li><Link to="/projects">projects</Link></li>
          <li><Link to="/contacts">contact me</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="home-hero">
        <p className="home-eyebrow">AI &amp; Web Developer</p>
        <h1 ref={null} className="home-hero-title">
          {typedText}<span className="home-cursor"></span>
        </h1>
        <p className={`home-sub${showSub ? ' visible' : ''}`}>
          Full-stack developer con focus su interfacce chiare, codice pulito e soluzioni che durano nel tempo.
        </p>
        <div className={`home-cta-row${showCta ? ' visible' : ''}`}>
          <Link to="/projects" className="home-btn">view projects</Link>
          <Link to="/contacts" className="home-btn home-btn-ghost">contact me →</Link>
        </div>
      </section>

      <div className="home-divider" />

      {/* SELECTED PROJECTS */}
      <section className="home-section">
        <p className="home-section-label">selected projects</p>
        <div className="home-projects">
          <Link to="/projects" className="home-card">
            <p className="home-card-tag">01 — computer vision</p>
            <h3>ArchivIA</h3>
            <p>Transfer learning model for POI recognition with full-stack web app.</p>
            <div className="home-stack">
              <span className="home-tag">PyTorch</span>
              <span className="home-tag">React</span>
              <span className="home-tag">FastAPI</span>
            </div>
          </Link>
          <Link to="/projects" className="home-card">
            <p className="home-card-tag">02 — AI for healthcare</p>
            <h3>AI.Turni</h3>
            <p>Shift planning web app with AI assistant for nursing coordinators at IOR Bologna. 🏆 Best poster award, May 2026.</p>
            <div className="home-stack">
              <span className="home-tag">Constrained Optimization</span>
              <span className="home-tag">React</span>
              <span className="home-tag">FastAPI</span>
            </div>
          </Link>
          <Link to="/projects" className="home-card">
            <p className="home-card-tag">03 — computer vision</p>
            <h3>LLMF</h3>
            <p>Full stack web app for real time fruit detection and classification via finetuned YOLOv8.</p>
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
        <span className="home-footer-left">© 2026 Chiara Sivieri — open to opportunities</span>
        <div className="home-footer-links">
          <a href="https://github.com/chiarasivieri" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/chiara-sivieri-604099332" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <Link to="/contacts">Email</Link>
        </div>
      </footer>

    </div>
  );
}