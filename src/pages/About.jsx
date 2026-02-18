import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";
import "./About.css";

export default function About() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = FOG({
      el: vantaRef.current,
      THREE: THREE,
      highlightColor: 0x00ffff,
      midtoneColor: 0x00ff99,
      lowlightColor: 0x888888,
      baseColor: 0x000000,
      blurFactor: 0.7,
      speed: 1.2,
    });
    return () => vantaEffect.destroy();
  }, []);

  return (
    <div className="about">
      <section ref={vantaRef} className="about-hero">
        <h1 className="about-title">About Me</h1>
        <nav className="about-menu">
          <Link to="/" className="about-link">Home</Link>
          <Link to="/about" className="about-link active">About Me</Link>
          <Link to="/projects" className="about-link">Projects</Link>
          <Link to="/contacts" className="about-link">Contacts</Link>
        </nav>
      </section>

      <section className="about-section">
        <div className="about-photo-blob">
          <img src="assets/laurea.jpg" alt="Chiara Sivieri" />
        </div>
        <div className="about-text">
          <h2>Chiara</h2>
          <p>
            Curiosity has always been my driving force. I'm a Computer Scientist and currently a Master's student
            in Artificial Intelligence at the University of Bologna, where I explore how technology can shape the future.
            Yet my interests go far beyond code and algorithms, I'm equally fascinated by literature and art.
            I believe that knowledge is most powerful when it's broad and interconnected,
            and I strive to keep a 360° perspective in everything I do.
          </p>
          <p>
            For me, learning is not just about acquiring skills, but about cultivating creativity,
            critical thinking, and a deeper understanding of the world.
          </p>
        </div>
      </section>

      <section className="about-extra">
        <h2 className="about-subtitle">What I Bring to the Table</h2>
      </section>

      <section className="infinite-gallery">
        <div className="scroll-track">
          {[
            { title: "unhealthy screentime", image: "assets/screentime.png" },
            { title: "fun facts", image: "assets/funfact.jpeg" },
            { title: "extreme awkwardness", image: "assets/awkward.jpeg" },
            { title: "unfunny jokes", image: "assets/unfunny.png" },
            { title: "headache", image: "assets/headache.jpg" },
            { title: "Coca Cola", image: "assets/cocacola.jpeg" },
            { title: "Random Knowledge", image: "assets/random.jpeg" },
            { title: "Lack of Sleep", image: "assets/sleep.webp" },
          ].map((item, i) => (
            <div key={i} className="scroll-card">
              <img src={item.image} alt={item.title} />
              <div className="scroll-title">{item.title}</div>
            </div>
          ))}
          {[
            { title: "unhealthy screentime", image: "assets/screentime.png" },
            { title: "fun facts", image: "assets/funfact.jpeg" },
            { title: "extreme awkwardness", image: "assets/awkward.jpeg" },
            { title: "unfunny jokes", image: "assets/unfunny.png" },
            { title: "headache", image: "assets/headache.jpg" },
            { title: "Coca Cola", image: "assets/cocacola.jpeg" },
            { title: "Random Knowledge", image: "assets/random.jpeg" },
            { title: "Lack of Sleep", image: "assets/sleep.webp" },
          ].map((item, i) => (
            <div key={`dup-${i}`} className="scroll-card">
              <img src={item.image} alt={item.title} />
              <div className="scroll-title">{item.title}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}