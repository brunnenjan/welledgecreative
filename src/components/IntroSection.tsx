"use client";

import { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INTRO_CONFIG } from '@/lib/introConfig';
import { smoothScrollTo } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

const CONFIG = INTRO_CONFIG;

type IntroSectionProps = {
  sectionId?: string;
};

export default function IntroSection({ sectionId = "design-strategy" }: IntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const designHighlightRef = useRef<HTMLSpanElement>(null);
  const strategyHighlightRef = useRef<HTMLSpanElement>(null);
  const designTextRef = useRef<HTMLSpanElement>(null);
  const strategyTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      gsap.set(sectionRef.current, { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 });

      // Set initial states explicitly to prevent flash
      gsap.set([designHighlightRef.current, strategyHighlightRef.current], {
        scaleX: (prefersReducedMotion || isMobile) ? 1 : 0,
        transformOrigin: "left"
      });
      gsap.set([designTextRef.current, strategyTextRef.current], {
        color: (prefersReducedMotion || isMobile) ? "#ffffff" : "#1a1a1a"
      });

      if (prefersReducedMotion) return;

      // Simplified animation for mobile - fade in elements sequentially
      if (isMobile) {
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // Fade in entire section
        mobileTl.fromTo(
          sectionRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );

        // Fade in heading
        mobileTl.fromTo(
          headingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );

        // Fade in paragraph
        const paragraph = contentRef.current?.querySelector('[data-anim="intro-subheadline"]');
        if (paragraph) {
          mobileTl.fromTo(
            paragraph,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.2"
          );
        }

        // Fade in buttons
        const buttonsDiv = contentRef.current?.querySelector('[data-anim="intro-buttons"]');
        if (buttonsDiv) {
          mobileTl.fromTo(
            buttonsDiv,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.2"
          );
        }

        return;
      }

      gsap.to(sectionRef.current, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: CONFIG.TRIGGER_START,
          toggleActions: "play none none reverse",
        },
      });

      // Content animation - config-driven timing
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: CONFIG.TRIGGER_START,
          end: CONFIG.TRIGGER_END,
          scrub: CONFIG.SCRUB,
          toggleActions: 'play none none reverse',
        },
      });

      const emphasizeParagraph = (start: number) => {
        if (!contentRef.current) return;
        const paragraph = contentRef.current.querySelector<HTMLParagraphElement>('[data-anim="intro-subheadline"]');
        if (!paragraph) return;

        contentTl.fromTo(
          paragraph,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: CONFIG.PARAGRAPH_DURATION, ease: CONFIG.PARAGRAPH_EASE },
          start,
        );
      };

      // Animate entire heading appearing first (config-driven)
      contentTl.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: CONFIG.APPEAR_DURATION,
          ease: CONFIG.APPEAR_EASE,
        },
        CONFIG.APPEAR_DELAY
      );

      // Then animate highlights and color changes (config-driven timing)
      const highlightStart = CONFIG.HIGHLIGHT_START;

      // Design highlight (first)
      contentTl.fromTo(
        designHighlightRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: CONFIG.HIGHLIGHT_DURATION,
          ease: CONFIG.HIGHLIGHT_EASE,
        },
        highlightStart
      );

      contentTl.to(
        designTextRef.current,
        {
          color: "#ffffff",
          duration: CONFIG.TEXT_COLOR_DURATION,
          ease: CONFIG.TEXT_COLOR_EASE,
        },
        highlightStart + CONFIG.HIGHLIGHT_DURATION * CONFIG.TEXT_COLOR_OFFSET
      );

      // Strategy highlight (sequential - config-driven delay)
      const strategyStart = highlightStart + CONFIG.HIGHLIGHT_DURATION + CONFIG.HIGHLIGHT_DELAY_BETWEEN;

      contentTl.fromTo(
        strategyHighlightRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: CONFIG.HIGHLIGHT_DURATION,
          ease: CONFIG.HIGHLIGHT_EASE,
        },
        strategyStart
      );

      contentTl.to(
        strategyTextRef.current,
        {
          color: "#ffffff",
          duration: CONFIG.TEXT_COLOR_DURATION,
          ease: CONFIG.TEXT_COLOR_EASE,
        },
        strategyStart + CONFIG.HIGHLIGHT_DURATION * CONFIG.TEXT_COLOR_OFFSET
      );

      const paragraphStart = strategyStart + CONFIG.HIGHLIGHT_DURATION + CONFIG.PARAGRAPH_DELAY;
      emphasizeParagraph(paragraphStart);

      // Buttons appear - config-driven timing
      const buttonsDiv = contentRef.current?.querySelector('[data-anim="intro-buttons"]');
      if (buttonsDiv) {
        contentTl.fromTo(
          buttonsDiv,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: CONFIG.BUTTONS_DURATION, ease: CONFIG.BUTTONS_EASE },
          paragraphStart + CONFIG.BUTTONS_DELAY
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id={sectionId}
        className="relative z-[60] scroll-mt-16"
        style={{ backgroundColor: '#ffffff' }}
        aria-labelledby="design-strategy-title"
      >
        <div
        className="mx-auto max-w-5xl px-6 pt-[18vh] pb-40 md:pt-[26vh] md:pb-52"
        >
          <div className="text-center space-y-8">
            {/* Main Headline - Stacked with animated marker highlights */}
            <h1
              ref={headingRef}
              id="design-strategy-title"
              className="text-5xl md:text-7xl font-bold leading-[1.2] tracking-tight"
              style={{ color: '#1a1a1a' }}
            >
              <span className="inline-block relative">
                <span ref={designTextRef} className="relative z-10">Design</span>
                <span
                  ref={designHighlightRef}
                  className="absolute inset-0 bg-accent/80"
                  style={{
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    zIndex: -1,
                    margin: '-0.08em -0.15em',
                    backgroundColor: '#f58222'
                  }}
                />
              </span> that connects.<br />
              <span className="inline-block relative">
                <span ref={strategyTextRef} className="relative z-10">Strategy</span>
                <span
                  ref={strategyHighlightRef}
                  className="absolute inset-0 bg-accent/80"
                  style={{
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    zIndex: -1,
                    margin: '-0.08em -0.15em',
                    backgroundColor: '#f58222'
                  }}
                />
              </span> that lasts.
            </h1>

            {/* Subtle accent line */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-px bg-accent/30 w-12"></div>
              <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
              <div className="h-px bg-accent/30 w-12"></div>
            </div>

            {/* Content Block */}
            <div ref={contentRef} className="space-y-8">
              {/* Subheadline with highlighted word */}
              <p
              data-anim="intro-subheadline"
              className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: '#4a4a4a', opacity: 0 }}
            >
                I help founders turn ideas into brands that connect deeply and perform beautifully online.
            </p>

              <div
                data-anim="intro-buttons"
                className="pt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-3"
                style={{ opacity: 0 }}
              >
                <a
                  href="#selected-projects"
                  className="btn btn-primary min-w-[190px]"
                  onClick={(event) => {
                    event.preventDefault();
                    smoothScrollTo("selected-projects");
                  }}
                >
                  See my work
                </a>
                <a
                  href="https://calendly.com/well-edge-creative/30min"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary min-w-[190px]"
                >
                  Book a call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
