import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";
import emailjs from 'emailjs-com';
import "./Contacts.css";
import GitHubProfile from '../components/GitHubProfile';

export default function Contacts() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const vantaRef = useRef(null);

  useEffect(() => {
    emailjs.init('slfVIsE9hXXD2VtnE');

    const vantaEffect = FOG({
      el: vantaRef.current,
      THREE: THREE,
      highlightColor: "#c7dcec",
      midtoneColor: "#b2b2d8",
      lowlightColor: "#b2b2d8",
      baseColor: "#000000",
      blurFactor: 0.7,
      speed: 1.2,
    });
    return () => vantaEffect.destroy();
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
    <div className="about">
      <section ref={vantaRef} className="about-hero">
        <h1 className="about-title">Contacts</h1>
        <nav className="about-menu">
          <Link to="/" className="about-link">Home</Link>
          <Link to="/about" className="about-link">About Me</Link>
          <Link to="/projects" className="about-link">Projects</Link>
          <Link to="/contacts" className="about-link active">Contacts</Link>
        </nav>
      </section>

      <section className="linkedin-section">
        <p>Follow me on <a href="https://www.linkedin.com/in/chiara-sivieri-604099332" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
      </section>

      <div className="contact-container">
        <section className="contact-form-column">
          <h2>Get in Touch</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
            <button type="submit">Send Message</button>
            {sent && <p className="sent-message">✓ Email sent!</p>}
          </form>
        </section>

        <section className="github-profile-column">
          <h2>Find Me on GitHub</h2>
          <GitHubProfile username="chiarasivieri" />
        </section>
      </div>
    </div>
  );
}