import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./About.css";

export default function About() {

  const [typedText, setTypedText] = useState('');
  const [typedSub, setTypedSub] = useState('');

  useEffect(() => {
    const title = 'About me';
    const sub = 'Written and directed by Naoki Urasawa';
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
  }, []);

  return (
    <div className="about-root">

      {/* NAV */}
      <nav className="about-nav">
        <Link to="/" className="about-logo">cs.</Link>
        <ul className="about-nav-links">
          <li><Link to="/">home</Link></li>
          <li><Link to="/about" className="active">about me</Link></li>
          <li><Link to="/projects">projects</Link></li>
          <li><Link to="/contacts">contact me</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="about-aurora">
        <p className="about-page-label">Ai and Web Developer</p>
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
          <h2>Hi, I'm Chiara.</h2>
          <p>
            Curiosity has always been my driving force. I'm a Computer Scientist and currently a Master's
            student in Artificial Intelligence at the University of Bologna, where I explore how technology
            can shape the future.
          </p>
          <p>
            Yet my interests go far beyond code and algorithms, I'm equally fascinated by literature and art.
            I believe that knowledge is most powerful when it's broad and interconnected, and I strive to keep
            a 360° perspective in everything I do.
          </p>
          <p>
            For me, learning is not just about acquiring skills, but about cultivating creativity, critical
            thinking, and a deeper understanding of the world.
          </p>
        </div>
      </section>

      <div className="about-divider" />

      {/* QUOTE */}
      <section className="about-quote-wrap">
        <div className="about-quote-card">
          <p className="about-quote-text">"Engineers turn dreams into reality."</p>
          <span className="about-quote-cite">— The Wind Rises, 2013</span>
        </div>
      </section>

      <div className="about-divider" />

      {/* GOAL */}
      <section className="about-goal-wrap">
        <p className="about-section-label">the next goal</p>
        <div className="about-goal-card">
          <p>
            Biomedical data analysis is an area where machine learning still has enormous, largely unexplored
            potential. I'm drawn to the challenge of extracting meaningful patterns from complex biosignals,
            where the complexity of the data reflects the complexity of the human body itself. It's a field
            where methodological rigor isn't optional: when model reliability directly affects clinical
            decisions, there's no room for shortcuts. That's exactly the kind of environment I want to work
            in, where the technical challenges are hard and the results actually matter.
          </p>
        </div>
      </section>

      <div className="about-divider" />

      {/* CV */}
      <section className="about-cv-wrap">
        <p className="about-section-label">curriculum vitae</p>
        <div className="about-cv-row">
          <a href="/assets/Chiara_Sivieri_CV_ENG.pdf" target="_blank" rel="noopener noreferrer" className="about-cv-btn">
            🇬🇧 preview english
          </a>
          <a href="/assets/CHIARA_SIVIERI_CV_IT.pdf" target="_blank" rel="noopener noreferrer" className="about-cv-btn">
            🇮🇹 preview italiano
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