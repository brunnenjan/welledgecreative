// src/components/Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

export default function Header({ className = "" }: { className?: string }) {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const portalContainerRef = useRef<HTMLDivElement | null>(null);
  const previousPathnameRef = useRef(pathname);

  // Check if we're on homepage
  const isHomePage = pathname === "/" || pathname === "/en" || pathname === "/de";

  // Scroll to top when navigating back to homepage
  useEffect(() => {
    if (previousPathnameRef.current !== pathname && isHomePage) {
      // Delay to ensure page has loaded
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 0);
    }
    previousPathnameRef.current = pathname;
  }, [pathname, isHomePage]);

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

  useEffect(() => {
    if (!isMenuOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const menu = portalContainerRef.current?.querySelector<HTMLElement>(".mobile-menu");
    const focusable = () => Array.from(menu?.querySelectorAll<HTMLElement>("button, a[href]") ?? []);
    focusable()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isMenuOpen]);

  const scrollToTop = () => {
    if (isHomePage) {
      smoothScrollToTop();
    } else {
      router.push(`/${locale}`);
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);

    if (!isHomePage) {
      // Navigate to homepage, then scroll to section
      router.push(`/${locale}#${sectionId}`);
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          smoothScrollTo(element, { block: "start" });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(sectionId);
    if (!element) return;

    smoothScrollTo(element, { block: "start" });
  };

  const headerMarkup = (
    <div className={className}>
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
    </div>
  );

  if (portalTarget) {
    return createPortal(headerMarkup, portalTarget);
  }

  return headerMarkup;
}
