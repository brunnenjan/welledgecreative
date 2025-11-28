// src/components/Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { smoothScrollTo, smoothScrollToTop } from "@/lib/smoothScroll";
import { useI18n } from "@/components/providers/I18nProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SECTIONS = [
  { id: "hero", labelKey: "navigation.home" },
  { id: "design-strategy", labelKey: "navigation.about" },
  { id: "profile", labelKey: "navigation.profile" },
  { id: "how-i-work", labelKey: "navigation.howIWork" },
  { id: "selected-projects", labelKey: "navigation.projects" },
  { id: "logos", labelKey: "navigation.logos" },
  { id: "testimonials", labelKey: "navigation.testimonials" },
  { id: "contact-section", labelKey: "navigation.contact" },
];

export default function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const portalContainerRef = useRef<HTMLDivElement | null>(null);

  // Check if we're on homepage
  const isHomePage = pathname === "/" || pathname === "/en" || pathname === "/de";

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const container = document.createElement("div");
    container.className = "mobile-header-root";
    document.body.appendChild(container);
    portalContainerRef.current = container;
    setPortalTarget(container);

    return () => {
      if (portalContainerRef.current && portalContainerRef.current.parentNode) {
        portalContainerRef.current.parentNode.removeChild(portalContainerRef.current);
      }
      portalContainerRef.current = null;
    };
  }, []);

  const scrollToTop = () => {
    if (isHomePage) {
      smoothScrollToTop();
    } else {
      window.location.href = "/";
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (sectionId: string) => {
    if (!isHomePage) {
      // Navigate to homepage with hash
      window.location.href = `/#${sectionId}`;
      setIsMenuOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (!element) return;

    smoothScrollTo(element, { block: "start" });

    setIsMenuOpen(false);
  };

  const headerMarkup = (
    <>
      <header className="mobile-header">
        <button
          type="button"
          className="mobile-header__logo-btn"
          onClick={scrollToTop}
          aria-label={t("header.aria.scrollTop")}
        >
          <Image
            src="/assets/logo/well-edge-logo-retina.webp"
            alt={t("header.logoAlt")}
            width={120}
            height={45}
            className="mobile-header__logo"
            priority
          />
        </button>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            type="button"
            className="mobile-header__burger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t("header.aria.closeMenu") : t("header.aria.openMenu")}
            aria-expanded={isMenuOpen}
          >
            <span className="mobile-header__burger-line" />
            <span className="mobile-header__burger-line" />
            <span className="mobile-header__burger-line" />
          </button>
        </div>
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
            aria-label={t("header.aria.mobileNav")}
          >
            <button
              type="button"
              className="mobile-menu__close"
              onClick={() => setIsMenuOpen(false)}
              aria-label={t("header.aria.closeMenu")}
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
                    {t(section.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-center">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </>
  );

  if (portalTarget) {
    return createPortal(headerMarkup, portalTarget);
  }

  return headerMarkup;
}
