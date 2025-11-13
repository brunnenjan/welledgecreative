// src/components/ProfileContent.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { smoothScrollTo } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

export default function ProfileContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const designsTextRef = useRef<HTMLSpanElement>(null);
  const designsHighlightRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for "That's Me" button
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current || !designsTextRef.current || !designsHighlightRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Set initial states explicitly to prevent flash
      gsap.set(designsHighlightRef.current, {
        scaleX: prefersReducedMotion ? 1 : 0,
        transformOrigin: "left",
      });

      gsap.set(designsTextRef.current, {
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
          designsHighlightRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 2.1,
            ease: "power3.out",
          },
          "-=0.9"
        )
        .to(
          designsTextRef.current,
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
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[60] scroll-mt-16"
      style={{
        backgroundColor: '#ffffff',
        paddingTop: "clamp(4rem, 10vh, 8rem)",
        paddingBottom: "clamp(8rem, 15vh, 12rem)",
      }}
    >
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl font-bold leading-[1.2] tracking-tight mb-12"
          style={{ color: '#1a1a1a' }}
        >
          <span className="inline-block relative">
            <span ref={designsTextRef} className="relative z-10">Designs</span>
            <span
              ref={designsHighlightRef}
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
        </h1>
        <div ref={textRef} className="space-y-6 text-lg md:text-xl leading-relaxed text-neutral-700 max-w-3xl mx-auto">
          <p>
            I&rsquo;m <span className="font-semibold text-neutral-900 text-[1.1em]">Jan</span>, a designer and storyteller with a background in Online Media (B.Sc.). Since 2017, I&rsquo;ve been helping <span className="font-semibold text-neutral-900 text-[1.08em]">small businesses</span>, <span className="font-semibold text-neutral-900 text-[1.08em]">start ups</span> und <span className="font-semibold text-neutral-900 text-[1.08em]">Retreat- &amp; Wellness Centern</span> build story-driven brands and websites that <span className="font-semibold text-neutral-900 text-[1.08em]">stand out</span> and stand for something.
          </p>
          <p
            className="pt-4 text-[1.3rem] italic"
            style={{ color: "#4a4a4a", fontWeight: 300 }}
          >
            Great design begins with curiosity and ends in clarity — that&rsquo;s the edge I bring to every project.
          </p>
        </div>

        {/* "That's Me" button - mobile only */}
        {isMobile && (
          <button
            type="button"
            onClick={() => smoothScrollTo("profile")}
            className="mt-12 inline-flex items-center gap-2 px-6 py-3 text-sm font-medium uppercase tracking-wider transition-all rounded-full"
            style={{
              backgroundColor: '#f58222',
              color: '#ffffff',
              letterSpacing: '0.1em',
            }}
            aria-label="Scroll to profile"
          >
            <span>That&rsquo;s Me</span>
            <span className="text-xl" aria-hidden="true">↑</span>
          </button>
        )}
      </div>
    </section>
  );
}
