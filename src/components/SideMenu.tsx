"use client";

import { useEffect, useState } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

const SECTIONS: { id: string; label: string }[] = [
  { id: "hero", label: "Home" },
  { id: "design-strategy", label: "About" },
  { id: "profile", label: "Profile" },
  { id: "how-i-work", label: "How I Work" },
  { id: "selected-projects", label: "Projects" },
  { id: "logos", label: "Logos" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact-section", label: "Contact" },
];

const OPEN_CLASS = "side-menu--open";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isOpen) {
      html.classList.add(OPEN_CLASS);
    } else {
      html.classList.remove(OPEN_CLASS);
    }
    return () => html.classList.remove(OPEN_CLASS);
  }, [isOpen]);

  const scrollTo = (id: string) => {
    smoothScrollTo(id);
    setIsOpen(false);
  };

  return (
    <aside className={`side-menu ${isOpen ? "is-open" : ""}`} aria-label="Section navigation">
      <button
        type="button"
        className="side-menu__toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="side-menu__panel" aria-hidden={!isOpen && undefined}>
        <ul>
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <button type="button" onClick={() => scrollTo(section.id)}>
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
