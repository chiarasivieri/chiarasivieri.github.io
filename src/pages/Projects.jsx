import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Projects.css";

function SkillsDropdown({ skills }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`skills-dropdown ${open ? "open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(o => !o)}
    >
      <button className="skills-trigger">
        skills <span className="skills-arrow">▾</span>
      </button>
      <div className="skills-menu">
        {skills.map((skill, i) => (
          <span key={i} className="skills-item">{skill}</span>
        ))}
      </div>
    </div>
  );
}

const projects = [
  {
    title: "AI.Turni",
    category: "AI for healthcare",
    description:
      "Design and development of a web application to support healthcare staff shift planning at the Istituto Ortopedico Rizzoli of Bologna. The system combines an algorithm for schedule generation with an AI assistant (Rizzol.IA) that allows coordinators and hospital staff to query and modify shifts, optimizing the organizational workload across the entire facility. The project won the best poster award at a national nursing conference in May 2026.",
    image: "/assets/aiturni.jpeg",
    skills: ["Python", "React", "FastAPI", "Constrained Optimization", "LLM Integration", "Healthcare AI", "UI/UX Design"],
  },
  {
    title: "LLMF",
    category: "computer vision",
    description:
      "Design and development of a complete web application for automated fruit recognition and classification, built to optimize costs and processing times in agricultural companies. The system uses custom weights obtained by fine-tuning YOLOv8 on a multi-class fruit dataset, enabling real-time detection with bounding box annotation. The project includes a full stack implementation.",
    image: "/assets/llmf.jpeg",
    skills: ["YOLOv8", "Fine Tuning", "Python", "Computer Vision", "Object Detection", "React", "FastAPI", "REST APIs"],
  },
  {
    title: "Aegis",
    category: "cybersecurity",
    description:
      "Design and development of a cybersecurity ecosystem aimed at protecting digital media from unauthorized distribution. The system implements a forensic steganography engine capable of embedding invisible, non-repudiable signatures. Resilience against aggressive manipulation is achieved through a proprietary algorithm combining DCT with Spatial Redundancy (Tiling) and a Grid Search recovery system.",
    image: "/assets/project4.jpg",
    skills: ["Python", "Flutter", "Dart", "Flask", "OpenCV", "Digital Forensics", "Steganography", "Secure Coding", "UI/UX Design", "REST APIs"],
  },
  {
    title: "ArchivIA",
    category: "computer vision",
    description:
      "Design and implementation of a computer vision model using transfer learning on a pre-trained neural network for the recognition of points of interest at the University of Ferrara, with the development of a complete web application (backend and frontend) to provide the user interface.",
    image: "/assets/project1.JPG",
    skills: ["Computer Vision", "Transfer Learning", "Fine Tuning", "PyTorch", "React", "FastAPI", "Python"],
  },
  {
    title: "Clinical Trial Prediction",
    category: "machine learning",
    description:
      "Internship at the University of Ferrara focused on developing a Machine Learning model aimed at predicting the failure of clinical trials. Implemented Natural Language Processing (NLP) techniques and developed an LSTM neural network on large datasets with unstructured textual descriptions.",
    image: "/assets/Project2.png",
    skills: ["NLP", "LSTM", "Machine Learning", "Python", "Pandas", "Scikit-learn", "Tensorflow", "Keras"],
  },
  {
    title: "Wedding Websites",
    category: "web development",
    description:
      "Developed websites for private clients. Responsible for the design, graphical layout, and technical implementation of interactive and multimedia websites.",
    image: "/assets/project3.jpg",
    skills: ["HTML", "CSS", "JavaScript", "React", "UI Design", "Responsive Design", "Tailwind CSS", "PHP"],
  },
];

export default function Projects() {

      const [typedText, setTypedText] = useState('');
  const [typedSub, setTypedSub] = useState('');

  useEffect(() => {
    const title = 'Projects';
    const sub = 'Ideas brought to life, one project at a time';
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
    <div className="projects-root">

      {/* NAV */}
      <nav className="projects-nav">
        <Link to="/" className="projects-logo">cs.</Link>
        <ul className="projects-nav-links">
          <li><Link to="/">home</Link></li>
          <li><Link to="/about">about me</Link></li>
          <li><Link to="/projects" className="active">projects</Link></li>
          <li><Link to="/contacts">contact me</Link></li>
        </ul>
      </nav>

            {/* HERO */}
      <section className="projects-aurora">
        <h1 className="projects-hero-title">
          {typedText}<span className="projects-hero-cursor"></span>
        </h1>
        <p className="projects-hero-sub">{typedSub}</p>
      </section>

      <div className="projects-divider" />

      {/* LIST */}
      <div className="projects-list">
        {projects.map((proj, i) => (
          <div
            key={i}
            className={`project-item ${i % 2 === 1 ? "reverse" : ""}`}
          >
            <div className="project-blob">
              <img src={proj.image} alt={proj.title} />
            </div>
            <div className="project-text">
              <p className="project-index">{String(i + 1).padStart(2, "0")} — {proj.category}</p>
              <h2 className="project-title">{proj.title}</h2>
              <p className="project-desc">{proj.description}</p>
              <SkillsDropdown skills={proj.skills} />
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="projects-footer">
        <span className="projects-footer-left">© 2026 Chiara Sivieri</span>
        <div className="projects-footer-links">
          <a href="https://github.com/chiarasivieri" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/chiara-sivieri-604099332" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </footer>

    </div>
  );
}