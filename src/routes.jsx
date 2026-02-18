// routes.jsx - VERSIONE CORRETTA

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Projects from './pages/Projects';
import Home from './pages/Home';
import Contacts from './pages/Contacts';

export default function AppRoutes() {
  return (
    // Rimuovi completamente il prop 'basename'
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Router>
  );
}