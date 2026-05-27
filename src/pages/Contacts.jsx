import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';
import "./Contacts.css";
import GitHubProfile from '../components/GitHubProfile';

export default function Contacts() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitHover, setSubmitHover] = useState(false);
  const [sent, setSent] = useState(false);
    const [typedText, setTypedText] = useState('');
  const [typedSub, setTypedSub] = useState('');

  useEffect(() => {
    emailjs.init('slfVIsE9hXXD2VtnE');
    const title = 'Contact me';
    const sub = 'let\'s keep in touch';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_kynsooo', 'template_6v078jf', e.target)
      .then(() => {
        setSent(true);
        setTimeout(() => setSent(false), 4000);
      })
      .catch(() => alert('Failed to send message.'));
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contacts-root">

      {/* NAV */}
      <nav className="contacts-nav">
        <Link to="/" className="contacts-logo">cs.</Link>
        <ul className="contacts-nav-links">
          <li><Link to="/">home</Link></li>
          <li><Link to="/about">about me</Link></li>
          <li><Link to="/projects">projects</Link></li>
          <li><Link to="/contacts" className="active">contact me</Link></li>
        </ul>
      </nav>

            {/* HERO */}
      <section className="contacts-aurora">
        <h1 className="contacts-hero-title">
          {typedText}<span className="contacts-hero-cursor"></span>
        </h1>
        <p className="contacts-hero-sub">{typedSub}</p>
      </section>

      <div className="contacts-divider" />

      {/* SOCIAL PILLS */}
      <div className="contacts-social">
        <div className="iri-wrap">
          <a
            href="https://www.linkedin.com/in/chiara-sivieri-604099332"
            target="_blank"
            rel="noopener noreferrer"
            className="contacts-social-btn"
          >
            linkedin
          </a>
        </div>
        <div className="iri-wrap">
          <a
            href="https://github.com/chiarasivieri"
            target="_blank"
            rel="noopener noreferrer"
            className="contacts-social-btn"
          >
            github
          </a>
        </div>
      </div>

      <div className="contacts-divider" />

      {/* GRID */}
      <div className="contacts-grid">

        {/* FORM */}
        <div className="contacts-card">
          <p className="contacts-card-label">get in touch</p>
          <form className="contacts-form" onSubmit={handleSubmit}>
            <input
              className="contacts-input"
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              className="contacts-input"
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <textarea
              className="contacts-input contacts-textarea"
              name="message"
              placeholder="Your message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
            <div className={`contacts-submit-wrap${submitHover ? " hovered" : ""}`}>
              <button
                type="submit"
                className="contacts-submit"
                onMouseEnter={() => setSubmitHover(true)}
                onMouseLeave={() => setSubmitHover(false)}
              >send message →</button>
            </div>
            {sent && <p className="contacts-sent">✓ message sent!</p>}
          </form>
        </div>

        {/* GITHUB */}
        <div className="contacts-card contacts-gh">
          <p className="contacts-card-label">find me on github</p>
          <div className="contacts-gh-inner">
            <GitHubProfile username="chiarasivieri" />
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="contacts-footer">
        <span className="contacts-footer-left">© 2026 Chiara Sivieri</span>
        <div className="contacts-footer-links">
          <a href="https://github.com/chiarasivieri" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/chiara-sivieri-604099332" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </footer>

    </div>
  );
}