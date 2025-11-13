// src/components/DesignContent.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { smoothScrollTo } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

export default function DesignContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const designTextRef = useRef<HTMLSpanElement>(null);
  const designHighlightRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current || !designTextRef.current || !designHighlightRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Set initial states explicitly to prevent flash
      gsap.set(designHighlightRef.current, {
        scaleX: prefersReducedMotion ? 1 : 0,
        transformOrigin: "left",
      });

      gsap.set(designTextRef.current, {
        color: prefersReducedMotion ? "#ffffff" : "#1a1a1a",
      });

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          end: "top 20%",
          scrub: 1.35,
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
        }
      )
        .fromTo(
          designHighlightRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 2.1,
            ease: "power3.out",
          },
          "-=0.9"
        )
        .to(
          designTextRef.current,
          {
            color: "#ffffff",
            duration: 1.6,
            ease: "power3.out",
          },
          "-=1.4"
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.25,
            ease: "power3.out",
          },
          "-=0.9"
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative scroll-mt-16"
      style={{
        backgroundColor: '#ffffff',
        paddingTop: "clamp(4rem, 10vh, 8rem)",
        paddingBottom: "clamp(8rem, 15vh, 12rem)",
        zIndex: 10
      }}
    >
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <h2
          ref={headlineRef}
          className="text-5xl md:text-7xl font-bold leading-[1.2] tracking-tight mb-12"
          style={{ color: '#1a1a1a' }}
        >
          <span className="inline-block relative">
            <span ref={designTextRef} className="relative z-10">Design</span>
            <span
              ref={designHighlightRef}
              className="absolute inset-0 bg-accent/80"
              style={{
                transform: "scaleX(0)",
                transformOrigin: "left",
                zIndex: -1,
                margin: "-0.08em -0.15em",
                backgroundColor: '#f58222',
              }}
            />
          </span>{" "}
          that speaks for itself.
        </h2>
        <div ref={textRef} className="space-y-6 text-lg md:text-xl leading-relaxed text-neutral-700 max-w-3xl mx-auto mb-10">
          <p>
            Every project is an opportunity to create something that not only looks beautiful but also <span className="font-semibold text-neutral-900 text-[1.08em]">communicates clearly</span> and <span className="font-semibold text-neutral-900 text-[1.08em]">resonates deeply</span> with its audience.
          </p>
          <p
            className="pt-4 text-[1.3rem] italic"
            style={{ color: "#4a4a4a", fontWeight: 300 }}
          >
            Good design doesn&rsquo;t need explanation — it speaks for itself through clarity, purpose, and impact.
          </p>
        </div>

        {/* "Plan your Project" button - all devices, no arrows */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => smoothScrollTo("contact-section")}
          className="inline-flex items-center justify-center px-8 py-4 text-base font-medium uppercase tracking-wider transition-all rounded-full hover:scale-105 hover:shadow-lg"
          style={{
            backgroundColor: '#f58222',
            color: '#ffffff',
            letterSpacing: '0.12em',
          }}
          aria-label="Plan your project - scroll to contact form"
        >
          Plan your Project
        </button>
      </div>
    </section>
  );
}
