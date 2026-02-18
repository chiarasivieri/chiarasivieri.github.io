import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";
import "./Projects.css";

export default function Projects() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = FOG({
      el: vantaRef.current,
      THREE: THREE,
      highlightColor: "#D2AEFF",
      midtoneColor: "#AEDBFF",
      lowlightColor: "#FFD3AE",
      baseColor: "#000000",
      blurFactor: 0.7,
      speed: 1.2,
    });
    return () => vantaEffect.destroy();
  }, []);

  const projects = [
    {
      title: "ArchivIA",
      description:
        "Design and implementation of a computer vision model using transfer learning on a pre-trained neural network for the recognition of points of interest at the University of Ferrara, with the development of a complete web application (backend and frontend) to provide the user interface.",
      image: "assets/project1.JPG",
    },
    {
      title: "Predictive Analysis of Clinical Trial Failures",
      description:
        "Internship at the University of Ferrara focused on developing a Machine Learning model aimed at predicting the failure of clinical trials. The dataset used was large and included numerous clinical studies with unstructured textual descriptions. Implemented Natural Language Processing (NLP) techniques and developed an LSTM neural network for predictive model.",
      image: "assets/Project2.png",
    },
    {
      title: "Wedding Websites",
      description:
        "Developed websites for private clients. Responsible for the design, graphical layout, and technical implementation of an interactive and multimedia website.",
      image: "assets/project3.jpg",
    },
  ];

  return (
    <div className="projects-page">
      <section ref={vantaRef} className="projects-hero">
        <h1 className="projects-title">Projects</h1>
        <nav className="projects-menu">
          <Link to="/" className="projects-link">Home</Link>
          <Link to="/about" className="projects-link">About Me</Link>
          <Link to="/projects" className="projects-link active">Projects</Link>
          <Link to="/contacts" className="projects-link">Contacts</Link>
        </nav>
      </section>

      <div className="projects-list">
        {projects.map((proj, i) => (
          <section
            key={i}
            className={`project-section ${i % 2 === 1 ? "reverse" : ""}`}
          >
            <div className="project-photo-blob">
              <img src={proj.image} alt={proj.title} />
            </div>
            <div className="project-text">
              <h2>{proj.title}</h2>
              <p>{proj.description}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}