import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Me" },
  { to: "/projects", label: "Projects" },
  { to: "/contacts", label: "Contacts" },
];

export default function MobileNav({ title }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="mobile-nav-bar" ref={menuRef}>
      <span className="mobile-nav-title">{title}</span>

      <button
        className={`hamburger-btn ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      <div className={`liquid-dropdown ${open ? "active" : ""}`}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`dropdown-link ${location.pathname === to ? "active" : ""}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}