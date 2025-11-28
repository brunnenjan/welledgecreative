// src/components/Header.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import SideMenu from "@/components/SideMenu";
import { smoothScrollTo, smoothScrollToTop } from "@/lib/smoothScroll";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "design-strategy", label: "About" },
  { id: "profile", label: "Profile" },
  { id: "how-i-work", label: "How I Work" },
  { id: "selected-projects", label: "Projects" },
  { id: "logos", label: "Logos" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact-section", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => {
    smoothScrollToTop();
    setIsMenuOpen(false);
  };

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    smoothScrollTo(element, { block: "start" });

    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="mobile-header">
        <button
          type="button"
          className="mobile-header__logo-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <Image
            src="/assets/logo/well-edge-logo-retina.webp"
            alt="Well Edge Creative"
            width={120}
            height={45}
            className="mobile-header__logo"
            priority
          />
        </button>

        <button
          type="button"
          className="mobile-header__burger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="mobile-header__burger-line" />
          <span className="mobile-header__burger-line" />
          <span className="mobile-header__burger-line" />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        >
          <nav
            className="mobile-menu"
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile navigation"
          >
            <button
              type="button"
              className="mobile-menu__close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M24 8L8 24M8 8L24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <ul className="mobile-menu__list">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    className="mobile-menu__link"
                    onClick={() => handleNavClick(section.id)}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      <SideMenu />
    </>
  );
}
