// src/components/LogosCarousel.tsx
"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { logos as logoData } from "@/app/data/logos";
import { LOGOS_CONFIG } from "@/lib/logosConfig";

gsap.registerPlugin(ScrollTrigger);

const CONFIG = LOGOS_CONFIG;

type Slide = (typeof logoData)[number] & { key: string; clone: boolean };

export default function LogosCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const brandingsHighlightRef = useRef<HTMLSpanElement>(null);
  const brandingsTextRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  const frameRef = useRef<number | null>(null);
  const resizeTimeoutRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const loopWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    isPausedRef.current = isPaused || prefersReducedMotion;
  }, [isPaused, prefersReducedMotion]);

  const slides: Slide[] = useMemo(
    () => [
      ...logoData.map((logo, index) => ({ ...logo, key: `logo-${index}`, clone: false })),
      ...logoData.map((logo, index) => ({ ...logo, key: `logo-${index}-clone-1`, clone: true })),
      ...logoData.map((logo, index) => ({ ...logo, key: `logo-${index}-clone-2`, clone: true })),
    ],
    []
  );

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(brandingsHighlightRef.current, {
        scaleX: prefersReducedMotion ? 1 : 0,
        transformOrigin: "left",
        backgroundColor: "#f58222",
      });
      gsap.set(brandingsTextRef.current, { color: prefersReducedMotion ? "#ffffff" : "#1a1a1a" });

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: CONFIG.TRIGGER_START,
          end: CONFIG.TRIGGER_END,
          scrub: CONFIG.SCRUB,
          toggleActions: "play none none reverse",
        },
      });

      tl.from(headerRef.current, {
        opacity: 0,
        y: 30,
        duration: CONFIG.APPEAR_DURATION,
        ease: CONFIG.APPEAR_EASE,
      }, CONFIG.APPEAR_DELAY);

      const brandingsStart = CONFIG.HIGHLIGHT_START + CONFIG.HIGHLIGHT_DELAY_BETWEEN;

      const highlightTimeline = gsap.timeline({ paused: true });

      highlightTimeline.add("brandingsHighlight", brandingsStart);

      highlightTimeline.fromTo(
        brandingsHighlightRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: CONFIG.HIGHLIGHT_DURATION,
          ease: CONFIG.HIGHLIGHT_EASE,
        },
        "brandingsHighlight"
      );

      highlightTimeline.to(
        brandingsTextRef.current,
        {
          color: "#ffffff",
          duration: CONFIG.TEXT_COLOR_DURATION,
          ease: CONFIG.TEXT_COLOR_EASE,
        },
        `brandingsHighlight+=${CONFIG.HIGHLIGHT_DURATION * CONFIG.TEXT_COLOR_OFFSET}`
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: CONFIG.TRIGGER_START,
        end: CONFIG.TRIGGER_END,
        onEnter: () => highlightTimeline.play(),
        onEnterBack: () => highlightTimeline.play(),
        onLeaveBack: () => highlightTimeline.reverse(),
      });

      const logoItems = Array.from(trackRef.current!.children).slice(0, logoData.length);
      const mm = gsap.matchMedia();

      mm.add({ isMobile: "(max-width: 767px)" }, (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };

        gsap.from(logoItems, {
          opacity: 0,
          y: isMobile ? CONFIG.CARDS_Y_MOBILE : CONFIG.CARDS_Y_DESKTOP,
          scale: CONFIG.CARDS_SCALE,
          duration: isMobile ? CONFIG.CARDS_DURATION_MOBILE : CONFIG.CARDS_DURATION_DESKTOP,
          stagger: isMobile ? CONFIG.CARDS_STAGGER_MOBILE : CONFIG.CARDS_STAGGER_DESKTOP,
          ease: CONFIG.CARDS_EASE,
          scrollTrigger: {
            trigger: trackRef.current,
            start: CONFIG.CARDS_START,
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const cancelAnimation = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    lastTimestampRef.current = null;
  }, []);

  const scrollBy = useCallback((direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track || loopWidthRef.current === 0) return;

    // Pause autoplay temporarily
    setIsPaused(true);

    // Calculate scroll distance (one card width + gap)
    const firstCard = track.querySelector<HTMLLIElement>('[data-clone="false"]');
    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;

    // Safari-compatible gap calculation
    const styles = window.getComputedStyle(track);
    const gapValue = styles.gap || styles.columnGap || '0px';
    const gap = parseFloat(gapValue) || 0;

    const scrollDistance = cardWidth + gap;

    // Update offset
    if (direction === 'right') {
      offsetRef.current += scrollDistance;
    } else {
      offsetRef.current -= scrollDistance;
    }

    // Keep within bounds using modulo
    if (loopWidthRef.current > 0) {
      offsetRef.current = ((offsetRef.current % loopWidthRef.current) + loopWidthRef.current) % loopWidthRef.current;
    }

    // Apply transform - Safari needs explicit units
    const roundedOffset = Math.round(offsetRef.current * 100) / 100;
    track.style.transform = `translate3d(${-roundedOffset}px, 0px, 0px)`;

    // Resume autoplay after a delay
    const timer = window.setTimeout(() => {
      setIsPaused(false);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  const measureLoopWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const primarySlides = Array.from(track.querySelectorAll<HTMLLIElement>('[data-clone="false"]'));
    const width = primarySlides.reduce((total, slide) => total + slide.getBoundingClientRect().width, 0);

    loopWidthRef.current = width;
    offsetRef.current = 0;
    track.style.transform = "translate3d(0px, 0px, 0px)";
  }, []);

  const startAnimation = useCallback(() => {
    if (prefersReducedMotion) return;
    const track = trackRef.current;
    if (!track || loopWidthRef.current === 0) return;

    cancelAnimation();

    const step = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }
      const delta = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      if (!isPausedRef.current && loopWidthRef.current > 0) {
        const distance = (CONFIG.MARQUEE_SPEED_PX_PER_SEC * delta) / 1000;
        offsetRef.current += distance;

        // Smooth looping using modulo
        offsetRef.current = offsetRef.current % loopWidthRef.current;

        // Use Math.round for pixel-perfect rendering - Safari needs explicit units
        const roundedOffset = Math.round(offsetRef.current * 100) / 100;
        if (track) {
          track.style.transform = `translate3d(${-roundedOffset}px, 0px, 0px)`;
        }
      }

      frameRef.current = window.requestAnimationFrame(step);
    };

    frameRef.current = window.requestAnimationFrame(step);
  }, [cancelAnimation, prefersReducedMotion]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (prefersReducedMotion) {
      cancelAnimation();
      track.style.transform = "translate3d(0px, 0px, 0px)";
      return;
    }

    let cancelled = false;

    const images = Array.from(track.querySelectorAll<HTMLImageElement>("img"));
    const waits = images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        })
    );

    Promise.all(waits).then(() => {
      if (cancelled) return;
      measureLoopWidth();
      startAnimation();
    });

    const handleResize = () => {
      if (cancelled) return;
      if (resizeTimeoutRef.current !== null) {
        window.clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = window.setTimeout(() => {
        if (cancelled) return;
        cancelAnimation();
        measureLoopWidth();
        startAnimation();
      }, CONFIG.RESIZE_DEBOUNCE_MS);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      cancelAnimation();
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current !== null) {
        window.clearTimeout(resizeTimeoutRef.current);
        resizeTimeoutRef.current = null;
      }
    };
  }, [cancelAnimation, measureLoopWidth, prefersReducedMotion, startAnimation]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pause = () => setIsPaused(true);
    const resume = () => setIsPaused(false);

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);
    container.addEventListener("focusin", pause);
    container.addEventListener("focusout", resume);

    return () => {
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
      container.removeEventListener("focusin", pause);
      container.removeEventListener("focusout", resume);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        setIsPaused((current) => !current);
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Touch swipe gestures for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const distance = touchStartX - touchEndX;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        scrollBy('right');
      } else if (isRightSwipe) {
        scrollBy('left');
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollBy]);

  return (
    <section
      ref={sectionRef}
      id="logos"
      className="logo-marquee relative z-[80] bg-white pt-12 md:pt-16 pb-20 md:pb-24"
      aria-labelledby="logos-title"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 md:mb-12 text-center">
          <h2
            ref={headerRef}
            id="logos-title"
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#1a1a1a" }}
          >
            <span className="inline-block align-middle">Logos &amp;</span>{" "}
            <span className="inline-block align-middle relative">
              <span ref={brandingsTextRef} className="relative z-10">Branding</span>
              <span
                ref={brandingsHighlightRef}
                className="absolute inset-0 bg-accent/80"
                style={{
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  zIndex: -1,
                  margin: "-0.08em -0.15em",
                  backgroundColor: "#f58222",
                }}
                aria-hidden="true"
              />
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#6a6a6a] max-w-2xl mx-auto">
            Identities crafted with my clients — each with its own story.
          </p>
        </div>

        <div className="logo-marquee__shell">
          <button
            type="button"
            className="logo-marquee__nav logo-marquee__nav--prev"
            onClick={() => scrollBy('left')}
            aria-label="Previous logos"
            disabled={prefersReducedMotion}
          >
            ‹
          </button>

          <div
            ref={containerRef}
            className="logo-marquee__viewport"
            role="region"
            aria-roledescription="carousel"
            aria-live="off"
            aria-label="Client logos"
            tabIndex={0}
          >
            <ul ref={trackRef} className="logo-marquee__track">
              {slides.map((logo, index) => (
                <li
                  key={logo.key}
                  className="logo-marquee__cell"
                  data-clone={logo.clone ? "true" : "false"}
                  aria-hidden={logo.clone ? true : undefined}
                >
                  <img
                    src={logo.src}
                    alt={logo.clone ? "" : logo.alt}
                    loading={index < logoData.length ? "eager" : "lazy"}
                    decoding="async"
                    width={logo.width}
                    height={logo.height}
                    className="logo-marquee__image"
                  />
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="logo-marquee__nav logo-marquee__nav--next"
            onClick={() => scrollBy('right')}
            aria-label="Next logos"
            disabled={prefersReducedMotion}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
