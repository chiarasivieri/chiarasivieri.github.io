import { useEffect, useRef } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = FOG({
      el: vantaRef.current,
      THREE: THREE,
      highlightColor: 0xff5f6d, // rosa
      midtoneColor: 0x5b86e5,   // blu
      lowlightColor: 0x111111,  // quasi nero
      baseColor: 0x000000,      // sfondo
      blurFactor: 0.7,
      speed: 1.2,
    });
    return () => vantaEffect.destroy();
  }, []);

  return (
    <section ref={vantaRef} className="hero">
      <div className="hero-overlay">
        <h1 className="hero-title">Chiara Sivieri</h1>
        <p className="hero-subtitle">AI and Web Developer</p>

        {/* MINI MENU */}
        <nav className="hero-menu">
          <Link to="/about" className="hero-link">About Me</Link>
          <Link to="/projects" className="hero-link">Projects</Link>
          <Link to="/contacts" className="hero-link">Contacts</Link>
        </nav>
      </div>
    </section>
  );
}
