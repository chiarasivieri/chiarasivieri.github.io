import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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

export const projects = [
  {
    slug: "ai-turni",
    title: "AI.Turni",
    category: "AI for healthcare",
    description:
      "Design and development of a web application to support healthcare staff shift planning at the Istituto Ortopedico Rizzoli of Bologna. The system combines an algorithm for schedule generation with an AI assistant (Rizzol.IA) that allows coordinators and hospital staff to query and modify shifts, optimizing the organizational workload across the entire facility. The project won the best poster award at a national nursing conference in May 2026.",
    image: "/assets/aiturni.jpeg",
    skills: ["React", "Node.js", "Express", "PostgreSQL", "Prisma", "Python", "FastAPI", "Constrained Optimization", "LLM Integration", "Healthcare AI", "UI/UX Design"],
    gallery: [
      { src: "/assets/album/aiturni-1.jpg", caption: "Photo 1" },
      { src: "/assets/album/aiturni-2.jpg", caption: "Photo 2" },
      { src: "/assets/album/aiturni-3.jpg", caption: "Photo 3", fit: "contain" },
    ],
    stats: [
      { value: 3, label: "core modules: solver, assistant, admin" },
      { value: "Local", label: "LLM, data stays in the hospital" },
      { value: "Best Poster", label: "award, May 2026" },
    ],
    features: [
      {
        title: "Automatic monthly planning",
        text: "A constrained-optimization solver generates the whole month respecting each ward's rules: minimum staff per shift, night rotations, fixed day staff and substitutes who cover absences.",
        image: "/assets/aiturni-1.png",
        caption: "Generated schedule",
      },
      {
        title: "Coordinator always in control",
        text: "Any shift can be edited by hand, with a mandatory reason. Manual changes are visibly marked, every edit is kept in the change history, and a confirmed month can be frozen.",
        image: "/assets/aiturni-5.png",
        caption: "Manual edit with reason",
        callouts: [
          { label: "edited shifts are marked", src: "/assets/aiturni-celle-modificate.png", x: 32, y: 21.6, w: 18, h: 7.6, at: "tr", size: 0.32 },
        ],
      },
      {
        title: "Absences and constraints",
        text: "Leave, sick days and other absence types are recorded in a few clicks, even for future dates. Personal constraints are checked day by day when the plan is generated.",
        image: "/assets/aiturni-2.png",
        caption: "Staff management",
      },
      {
        title: "Support: a free person to assign",
        text: "When someone comes back from leave, the shift cycle sometimes prescribes a rest day to realign with their work partner. On those days the app marks the person as free (the dashed purple S): available, with no shift and zero hours until the coordinator assigns one with a click, for example to cover a gap.",
        demo: "support",
        caption: "Try it: click the S cell",
      },
      {
        title: "Rizzol.IA, the assistant",
        text: "A chat assistant to query and modify shifts in natural language. The language model runs locally, so hospital data never leaves the infrastructure.",
        noShot: true,
      },
      {
        title: "Admin panel and roles",
        text: "Wards, staff, users and permissions are managed from a dedicated panel, with different roles for IT, administration and coordinators.",
        noShot: true,
      },
      {
        title: "Presented at the Rizzoli",
        text: "After winning the Best Poster Award in May 2026, the project was presented at the 3rd International Day of Orthopedic Nursing & Allied Health Professions, the celebration hosted by the Istituto Ortopedico Rizzoli of Bologna (30 October – 5 November 2026).",
        noShot: true,
      },
    ],
    roadmap: [
      { status: "done", title: "Solver and ward rules", text: "Automatic generation for nurses and healthcare assistants, with per-ward configuration." },
      { status: "done", title: "Traceability", text: "Manual edits with reasons, change history, month freezing." },
      { status: "done", title: "Admin panel", text: "Roles, wards, staff and users management." },
      { status: "done", title: "Presented at the International Day", text: "3rd International Day of Orthopedic Nursing & Allied Health Professions, Istituto Ortopedico Rizzoli, October–November 2026." },
      { status: "now", title: "Pilot wards", text: "Field trials in two wards with coordinators and nurses, measuring workload before and after with the same questionnaire." },
      { status: "next", title: "Doctors' roster", text: "A dedicated section with the doctors' list and shift grid." },
      { status: "next", title: "Hospital deployment", text: "Moving from local testing to the hospital's own infrastructure." },
      { status: "future", title: "More wards", text: "Extending the app to other wards of the institute." },
    ],
  },
  {
    slug: "llmf",
    title: "LLMF",
    category: "computer vision",
    description:
      "Design and development of a complete web application for automated fruit recognition and classification, built to optimize costs and processing times in agricultural companies. The system uses custom weights obtained by fine-tuning YOLOv8 on a multi-class fruit dataset, enabling real-time detection with bounding box annotation. The project includes a full stack implementation.",
    image: "/assets/llmf.jpeg",
    skills: ["YOLOv8", "Instance Segmentation", "Fine Tuning", "ByteTrack", "OpenCV", "Python", "FastAPI", "React", "Vite", "SQLite", "REST APIs", "Edge Computing"],
    gallery: [
      { src: "/assets/album/llmf-1.jpg", caption: "Photo 1" },
      { src: "/assets/album/llmf-2.jpg", caption: "Photo 2" },
      { src: "/assets/album/llmf-3.jpg", caption: "Photo 3" },
    ],
    stats: [
      { value: 4, label: "specialized models" },
      { value: 3, label: "separate counts, never merged" },
      { value: 17, label: "species in the measurement tables" },
      { value: 12, label: "sample frames per video" },
    ],
    note: "I designed and developed this application. As it is not my own property, I cannot publish its actual screens: the images shown are illustrative examples.",
    features: [
      {
        title: "Detection and segmentation",
        text: "Specialized YOLOv8 segmentation models, fine-tuned on fruit datasets, find and outline each fruit in an image. Models can be switched on and off individually, so each crop gets the model that fits it best.",
        image: "/assets/llmf/03-inferenza-kiwi.png",
        caption: "Kiwi Segment model on a field photo",
      },
      {
        title: "Review and dataset building",
        text: "Results can be checked and edited with box and segmentation tools, and labeled data exported in YOLO, JSON or CSV. Metadata travel inside the image itself (EXIF), so a labeled photo can be re-imported without losing its labels.",
        image: "/assets/llmf/04-annotate-modale.png",
        caption: "Annotation view",
      },
      {
        title: "Counting fruit in video",
        text: "A ByteTrack tracker tuned for fruit follows each piece along the footage, and a virtual line counts crossings. The app keeps three counts separate (line, tracking, peak) instead of merging them into one number: each is valid for a different kind of shot, and the interface says which one to trust.",
        image: "/assets/llmf/video-1.png",
        caption: "Video processing results",
      },
      {
        title: "Size, caliber and weight",
        text: "From each segmentation mask the system estimates diameter, commercial caliber and weight per species. The pixel-to-millimeter scale comes from a calibration chain (ArUco marker, known reference object, EXIF, or declared distance), and the method used is always shown next to the measurements.",
        noShot: true,
      },
      {
        title: "Offline and in the loop",
        text: "Everything runs locally with lightweight libraries and no external services, so it works offline on edge devices. Sample frames from each video can be sent back to the dataset, turning the cases where the model fails into material for retraining.",
        noShot: true,
      },
    ],
    roadmap: [
      { status: "done", title: "Image pipeline", text: "Multi-model inference, annotation tools, export in three formats." },
      { status: "done", title: "Video pipeline", text: "Tracking, line-crossing counts, per-fruit measurements, annotated video." },
      { status: "done", title: "Calibration and verification", text: "Calibration chain and sample frames to check results by eye." },
      { status: "next", title: "Uncertainty band", text: "An occlusion index to show counts as a range, for example 57 to 68, instead of a single number." },
      { status: "next", title: "Calibration in the interface", text: "Input fields for the ArUco marker and reference objects, for absolute-scale measurements." },
      { status: "next", title: "Validation on real footage", text: "Tuning tracker parameters on videos from real orchards." },
      { status: "future", title: "More species", text: "Extending the models to crops already covered by the measurement tables." },
      { status: "future", title: "Yield estimation and robotics", text: "Using the counts and segmentation coordinates as a data source for harvest estimates and robotic picking." },
    ],
  },
  {
    slug: "aegis",
    title: "Aegis",
    category: "cybersecurity",
    description:
      "Design and development of a cybersecurity ecosystem aimed at protecting digital media from unauthorized distribution. The system implements a forensic steganography engine capable of embedding invisible, non-repudiable signatures. Resilience against aggressive manipulation is achieved through a proprietary algorithm combining DCT with Spatial Redundancy (Tiling) and a Grid Search recovery system.",
    image: "/assets/project4.jpg",
    skills: ["Python", "Flask", "Flutter", "Dart", "OpenCV", "NumPy", "Pillow", "Digital Forensics", "Steganography", "Secure Coding", "UI/UX Design", "REST APIs"],
    stats: [
      { value: 2, label: "layers of protection" },
      { value: 30, suffix: "%", label: "crop, signature still found" },
      { value: 70, suffix: "%", label: "JPEG quality, signature still found" },
    ],
    note: "The app has been shut down, so the images shown are illustrative recreations of the interface, with demo data.",
    features: [
      {
        title: "An invisible signature",
        text: "Aegis was born from a simple problem: once an image has been legitimately received, nothing stops its unauthorized spread. Instead of encrypting the image, the system marks it with an invisible watermark carrying sender and recipient, so that a leaked copy can be traced back.",
        image: "/assets/aegis/01-secure-sending.png",
        caption: "Secure sending",
      },
      {
        title: "Two layers of defense",
        text: "The algorithm, called Aegis Combo, stacks a fragile layer and a robust one. LSB embedding checks that a file is bit-for-bit identical to the original, while a signature written in the DCT frequency domain (8x8 blocks, the same used by JPEG) survives compression and noise.",
        image: "/assets/aegis/02-two-layers.png",
        caption: "Two layers, one signature",
      },
      {
        title: "Surviving a crop",
        text: "The signature is repeated over the whole image (tiling), so a cropped fragment still contains a full copy. Cropping breaks the alignment with the DCT grid, so extraction runs a grid search, sliding the reading window pixel by pixel until the watermark becomes readable.",
        image: "/assets/aegis/03-crop-recovery.png",
        caption: "Recovery after a 30% crop",
      },
      {
        title: "Non-repudiation built into the flow",
        text: "In the Flutter app, users register, log in and send images to existing users only. The recipient finds the image in a pending inbox and must explicitly accept it to download it: accepting applies a second signature, binding the file to the person who received it.",
        image: "/assets/aegis/04-inbox.png",
        caption: "Pending images and acceptance",
      },
      {
        title: "Forensic verification",
        text: "A dedicated page lets an analyst upload a suspicious image and get a structured report: detected technique, sender, recipient, confidence and the raw signature. All the extraction logic lives on the server, so the method cannot be reverse-engineered from the mobile app.",
        image: "/assets/aegis/05-verification.png",
        caption: "Verification report",
      },
      {
        title: "Tested, with honest limits",
        text: "The DCT layer detected the signature after JPEG compression at 90% and 70%, added noise and a 30% crop, where plain LSB failed every time. Screenshots are the open problem: rescaling changes the block size, and the search covers translation but not scale.",
        image: "/assets/aegis/06-robustness.png",
        caption: "Robustness tests",
      },
    ],
    roadmap: [
      { status: "done", title: "Watermarking engine", text: "LSB, DCT and the combined Aegis Combo with tiling and grid search." },
      { status: "done", title: "App and backend", text: "Flutter client, Flask API and an admin verification page." },
      { status: "done", title: "Robustness tests", text: "Compression, noise, resizing and cropping stress tests." },
      { status: "next", title: "Scale-resilient extraction", text: "Neural networks (AIgis) to read the watermark from screenshots and photos of screens." },
      { status: "next", title: "Production hardening", text: "Strong endpoint authentication, rate limiting, HTTPS and audit logs for chain of custody." },
      { status: "future", title: "Ephemeral viewing", text: "One-time view inside the app, with screenshots blocked at system level." },
      { status: "future", title: "Proactive scanning", text: "Crawlers that look for unauthorized copies online and alert the victim." },
      { status: "future", title: "Strong attribution", text: "Asymmetric cryptographic signatures tying each watermark to the sender's digital identity." },
    ],
  },
  {
    slug: "archivia",
    title: "ArchivIA",
    category: "computer vision",
    description:
      "Design and implementation of a computer vision model using transfer learning on a pre-trained neural network for the recognition of points of interest at the University of Ferrara, with the development of a complete web application (backend and frontend) to provide the user interface.",
    image: "/assets/project1.JPG",
    skills: ["Computer Vision", "Transfer Learning", "Fine Tuning", "TensorFlow", "Keras", "EfficientNetV2", "Data Augmentation", "OpenCV", "Python", "React", "FastAPI"],
    stats: [
      { value: 2, label: "training phases" },
      { value: "V2-B0", label: "EfficientNet backbone" },
      { value: "EXIF", label: "labels written into the files" },
    ],
    note: "I designed and developed this application. As it is not my own property, I cannot publish its actual screens: the images shown are illustrative recreations of the interface, with demo data.",
    features: [
      {
        title: "Recognizing places",
        text: "An internship project for the e-learning office of the University of Ferrara: a deep learning model that recognizes where a photo or video was taken, to sort a growing archive of university footage automatically. It builds on EfficientNetV2-B0, pre-trained on ImageNet, and adapts it with transfer learning.",
        noShot: true,
      },
      {
        title: "Training in two phases",
        text: "First only the final classifier is trained, with the pre-trained network frozen. Then the whole model is unfrozen and fine-tuned with a very low learning rate to specialize it on the university's own places. Data augmentation (rotations, zoom, flips) keeps it from overfitting.",
        noShot: true,
      },
      {
        title: "Videos, not just photos",
        text: "For a video, frames are extracted at regular intervals and classified one by one, and a majority vote decides the place of the whole clip. A sharpness score then keeps only the best frames, discarding blurred or shaky ones.",
        noShot: true,
      },
      {
        title: "Labels that stay with the file",
        text: "The predicted place is written directly into the image's EXIF metadata, so any photo manager can read and filter it. A confidence threshold keeps uncertain predictions out, and every run leaves a log and a results table, so each decision can be traced back.",
        image: "/assets/archivia/metadata.png",
        caption: "Metadata written into the file",
      },
      {
        title: "A web app for everyone",
        text: "A full web application, with a React frontend and a FastAPI backend, lets anyone upload images and get them classified automatically, without touching code or notebooks.",
        image: "/assets/archivia/app-archive.png",
        caption: "The archive",
      },
      {
        title: "Upload and classify",
        text: "Photos and videos are dropped into the app, checked in a short list and sent to the model with one click. Each file comes back labeled with the place it shows.",
        image: "/assets/archivia/app-upload.png",
        caption: "Upload and classification",
      },
      {
        title: "Search by place",
        text: "Once classified, files can be found by typing a place name and narrowed down by type, place or date, so a whole collection becomes searchable without manual tagging.",
        image: "/assets/archivia/app-search.png",
        caption: "Search results",
      },
    ],
    roadmap: [
      { status: "done", title: "Model and training", text: "Transfer learning with two-phase training and data augmentation." },
      { status: "done", title: "Video pipeline", text: "Frame extraction, majority vote and sharpness-based frame selection." },
      { status: "done", title: "Metadata and traceability", text: "EXIF tagging, run logs and a results table." },
      { status: "done", title: "Web application", text: "Upload images and get them classified automatically from the browser." },
      { status: "next", title: "From notebook to scripts", text: "Modular command-line scripts that run on the office's NAS, independent from Colab and Google Drive." },
      { status: "next", title: "Automatic tagging in place", text: "A scheduled job that tags new photos directly in their EXIF fields, without copying files." },
      { status: "next", title: "Dozens of classes", text: "Class weights for unbalanced data, larger architectures and hierarchical classification." },
      { status: "future", title: "Feedback and active learning", text: "Correcting wrong tags from the interface and saving the corrections to retrain the model over time." },
    ],
  },
  {
    slug: "clinical-trial-prediction",
    title: "Clinical Trial Prediction",
    category: "machine learning",
    description:
      "Internship at the University of Ferrara focused on developing a Machine Learning model aimed at predicting the failure of clinical trials. Implemented Natural Language Processing (NLP) techniques and developed an LSTM neural network on large datasets with unstructured textual descriptions.",
    image: "/assets/Project2.png",
    skills: ["NLP", "LSTM", "Machine Learning", "Deep Learning", "Python", "Pandas", "NLTK", "Scikit-learn", "Tensorflow", "Keras", "Keras Tuner", "SMOTE"],
    gallery: [
      { src: "/assets/album/ctp-1.jpg", caption: "Photo 1" },
      { src: "/assets/album/ctp-2.jpg", caption: "Photo 2" },
      { src: "/assets/album/ctp-3.jpg", caption: "Photo 3" },
    ],
    document: {
      title: "Applicazione di tecniche di Machine Learning e NLP per l'analisi predittiva del fallimento negli studi clinici",
      subtitle: "Bachelor's thesis in Computer Science · Università degli Studi di Ferrara · A.Y. 2023–24",
      folder: "/assets/thesis/",
      count: 44,
      skip: [],
      ext: "jpg",
    },
    stats: [
      { value: 488440, label: "clinical trials analyzed" },
      { value: 11, label: "columns kept out of 51" },
      { value: "20:1", label: "class imbalance handled" },
      { value: 5, label: "folds of cross-validation" },
    ],
    features: [
      {
        title: "Predicting which trials fail",
        text: "My bachelor's thesis in Computer Science at the University of Ferrara. Starting from the text of a clinical trial (summary, conditions, interventions, outcomes), a neural network estimates whether the study will end successfully or fail, to help avoid investing time and resources in trials likely to be abandoned.",
        image: "/assets/clinical/dataset.png",
        caption: "Excerpt of the ClinicalTrials.gov data",
      },
      {
        title: "From 488,000 trials to a clean dataset",
        text: "The raw data came from ClinicalTrials.gov: 488,440 studies and 51 columns. I kept the 11 that matter, removed trials with unknown status and turned the study status into a binary target. Duplicates were detected by hashing each sequence, and missing values were deliberately kept rather than imputed, to avoid distorting the distribution.",
        noShot: true,
      },
      {
        title: "Turning text into numbers",
        text: "An NLP pipeline lowercases the text, strips punctuation and numbers, removes English stop words and tokenizes it into padded sequences over a 10,000-word vocabulary. An embedding layer then maps each word to a 128-dimensional vector, so that words used in similar contexts end up close together.",
        image: "/assets/clinical/pipeline.png",
        caption: "Text preprocessing steps",
      },
      {
        title: "Taming a 20 to 1 imbalance",
        text: "Failed trials are rare compared to successful ones, with a ratio of almost 20 to 1. To keep the model from simply favoring the majority class, I combined SMOTE oversampling of the minority class with random undersampling of the majority one, with fixed seeds for reproducibility.",
        noShot: true,
      },
      {
        title: "An LSTM tuned automatically",
        text: "The model is a Keras LSTM with a variable number of recurrent and dense layers, with Batch Normalization and Dropout against overfitting. Layers, units, dropout rate and learning rate are chosen by a Keras Tuner random search, and the model is validated with 5-fold cross-validation and an independent test set, looking at precision, recall and F1 and not just accuracy.",
        image: "/assets/clinical/architecture.png",
        caption: "Model structure",
      },
    ],
    roadmap: [
      { status: "done", title: "Data cleaning and NLP", text: "Column selection, text preprocessing, duplicate removal." },
      { status: "done", title: "Imbalance handling", text: "SMOTE combined with undersampling." },
      { status: "done", title: "LSTM with automatic tuning", text: "Keras Tuner search and 5-fold cross-validation." },
      { status: "next", title: "Transformer models", text: "Architectures better at generalizing on underrepresented classes." },
      { status: "next", title: "Text data augmentation", text: "Automatic paraphrasing and back-translation to enrich the rarer class." },
      { status: "future", title: "Advanced tuning", text: "Bayesian Optimization or Hyperband instead of random search." },
      { status: "future", title: "More computing power", text: "GPU or TPU training for larger, more precise models." },
    ],
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
  const [typedText, setTypedText] = useState("");
  const [typedSub, setTypedSub] = useState("");

  useEffect(() => {
    const title = "Projects";
    const sub = "Ideas brought to life, one project at a time";
    const CHAR_DELAY = 80;
    const SUB_DELAY = 50;
    const timeouts = [];
    const schedule = (fn, delay) => {
      const id = setTimeout(fn, delay);
      timeouts.push(id);
    };
    setTypedText("");
    setTypedSub("");
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
              <div className="project-actions">
                <SkillsDropdown skills={proj.skills} />
                {proj.slug && (
                  <Link to={`/projects/${proj.slug}`} className="learn-more">
                    learn more <span>→</span>
                  </Link>
                )}
              </div>
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