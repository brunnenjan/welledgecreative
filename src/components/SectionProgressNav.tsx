"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { smoothScrollTo, smoothScrollToTop } from "@/lib/smoothScroll";
import { useI18n } from "@/components/providers/I18nProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type SectionItem = {
  id: string;
  labelKey: string;
  shortLabelKey?: string;
};

const SECTIONS: SectionItem[] = [
  { id: "hero", labelKey: "navigation.home" },
  { id: "design-strategy", labelKey: "navigation.about" },
  { id: "how-i-work", labelKey: "navigation.howIWork" },
  { id: "selected-projects", labelKey: "navigation.projects" },
  { id: "logos", labelKey: "navigation.logos" },
  { id: "testimonials", labelKey: "navigation.testimonials" },
  { id: "contact-section", labelKey: "navigation.contact" },
];

const INTERSECTION_ROOT_MARGIN = "-45% 0px -45%";
const INTERSECTION_THRESHOLDS = [0, 0.15, 0.30, 0.50, 0.70, 1];
const HOME_SCROLL_RESET = 160;

export default function SectionProgressNav() {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progressRatio, setProgressRatio] = useState(0);
  const ratiosRef = useRef<Record<string, number>>({});
  const hasMountedRef = useRef(false);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  const sectionIds = useMemo(() => SECTIONS.map((section) => section.id), []);
  const firstSectionId = sectionIds[0];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        if (!sectionId) return;
        ratiosRef.current[sectionId] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });

      const sorted = [...SECTIONS].sort((a, b) => {
        const ratioB = ratiosRef.current[b.id] ?? 0;
        const ratioA = ratiosRef.current[a.id] ?? 0;
        return ratioB - ratioA;
      });

      if (typeof window !== "undefined" && window.scrollY <= HOME_SCROLL_RESET && firstSectionId) {
        setActiveId((current) => (current === firstSectionId ? current : firstSectionId));
        return;
      }

      const best = sorted.find((section) => (ratiosRef.current[section.id] ?? 0) > 0.08);
      if (best) {
        setActiveId((current) => (current === best.id ? current : best.id));
      } else if (!best) {
        // if nothing intersects check viewport center
        const nearest = getActiveByViewport(sectionIds);
        if (nearest) {
          setActiveId((current) => (current === nearest ? current : nearest));
        }
      }
    };

    if (!("IntersectionObserver" in window)) {
      const fallbackId = getActiveByViewport(sectionIds);
      if (fallbackId) {
        setActiveId(fallbackId);
      }
      return;
    }

    const updateProgress = () => {
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];
      const getCenter = (element: HTMLElement) =>
        element.offsetTop + element.offsetHeight / 2;

      const start = getCenter(first);
      const end = getCenter(last);
      const midpoint = window.scrollY + window.innerHeight / 2;
      const ratio = end > start ? (midpoint - start) / (end - start) : 0;
      const clamped = Math.min(1, Math.max(0, ratio));
      setProgressRatio(clamped);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: INTERSECTION_ROOT_MARGIN,
      threshold: INTERSECTION_THRESHOLDS,
    });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    hasMountedRef.current = true;

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [sectionIds, firstSectionId]);

  // Ensure initial highlight on mount in case observer fires late
  useEffect(() => {
    if (!hasMountedRef.current) return;
    const fallback = getActiveByViewport(sectionIds);
    if (fallback) {
      setActiveId(fallback);
    }
  }, [sectionIds]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    let portal = document.getElementById("progress-nav-portal") as HTMLElement | null;
    let created = false;

    if (!portal) {
      portal = document.createElement("div");
      portal.id = "progress-nav-portal";
      document.body.appendChild(portal);
      created = true;
    }

    setPortalEl(portal);

    return () => {
      if (created && portal?.parentNode) {
        portal.parentNode.removeChild(portal);
      }
    };
  }, []);

  const activeIndex = activeId ? SECTIONS.findIndex((section) => section.id === activeId) : -1;

  const handleDotClick = (targetId: string) => {
    smoothScrollTo(targetId);
    setActiveId(targetId);
  };

  const handleHomeClick = () => {
    if (typeof window !== "undefined") {
      smoothScrollToTop();
      const heroDebug = window as unknown as Record<string, unknown>;
      const resetHero = heroDebug.__heroReset;
      if (typeof resetHero === "function") {
        (resetHero as () => void)();
      }
      if (firstSectionId) {
        setActiveId(firstSectionId);
      }
    }
  };

  const activeSection = SECTIONS.find((s) => s.id === activeId);
  const activeLabel = activeSection
    ? activeSection.shortLabelKey
      ? t(activeSection.shortLabelKey)
      : t(activeSection.labelKey)
    : null;

  if (!portalEl) {
    return null;
  }

  return createPortal(
    <>
      {/* Screen reader announcement for active section */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {activeLabel ? `${t("progressNav.currentSection")} ${activeLabel}` : ""}
      </div>

      <nav
        className="progress-nav"
        aria-label={t("progressNav.ariaLabel")}
      >
        <div className="progress-nav__lang">
          <LanguageSwitcher />
        </div>
        <button
          type="button"
          className="progress-nav__home"
          onClick={handleHomeClick}
          aria-label={t("progressNav.homeLabel")}
        >
          <Image
            src="/assets/logo/well-edge-logo-icon.webp"
            alt=""
            width={36}
            height={36}
            priority
          />
        </button>
        <div className="progress-nav__body">
          <div className="progress-nav__spine" aria-hidden>
            <div
              className="progress-nav__spine-fill"
              style={{ height: `${progressRatio * 100}%` }}
            />
          </div>
          <ul className="progress-nav__list">
            {SECTIONS.map((section, index) => {
              const isActive = section.id === activeId;
              const label = section.shortLabelKey ? t(section.shortLabelKey) : t(section.labelKey);
              const isVisited = !isActive && activeIndex !== -1 && index < activeIndex;
              const dotClass = `progress-nav__dot${isActive ? " is-active" : isVisited ? " is-visited" : ""}`;
              return (
                <li key={section.id} className="progress-nav__item">
                  <button
                    type="button"
                    className={dotClass}
                    aria-label={t(section.labelKey)}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => handleDotClick(section.id)}
                  >
                    <span className="progress-nav__dot-visual" aria-hidden />
                    <span className="progress-nav__label" aria-hidden>
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <nav className="progress-nav-mobile" aria-label={t("progressNav.ariaLabel")}>
        <ul className="progress-nav-mobile__list">
          {SECTIONS.map((section, index) => {
            const isActive = section.id === activeId;
            const isVisited = !isActive && activeIndex !== -1 && index < activeIndex;
            const dotClass = `progress-nav-mobile__dot${isActive ? " is-active" : isVisited ? " is-visited" : ""}`;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  className={dotClass}
                  aria-label={t(section.labelKey)}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => handleDotClick(section.id)}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </>,
    portalEl
  );
}

function getActiveByViewport(sectionIds: string[]) {
  if (typeof window === "undefined") return null;
  const viewportCenter = window.innerHeight / 2;
  let closestId: string | null = null;
  let smallestDistance = Number.POSITIVE_INFINITY;

  sectionIds.forEach((id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const distance = Math.abs(sectionCenter - viewportCenter);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestId = id;
    }
  });

  return closestId;
}
