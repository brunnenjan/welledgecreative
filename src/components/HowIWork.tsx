// src/components/HowIWork.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_CONFIG } from "@/lib/processConfig";

gsap.registerPlugin(ScrollTrigger);

const HOW_I_WORK_START_OFFSET = PROCESS_CONFIG.START_OFFSET;

const phases = [
  {
    number: "01",
    title: "Discover",
    description:
      "We define your purpose, audience, and message. This step builds the strategic foundation your brand needs — clear positioning, meaningful storytelling, and a direction that actually moves you forward.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Your brand identity takes shape: logo, colors, typography, visual system. Everything is crafted to reflect your purpose and create instant recognition.",
  },
  {
    number: "03",
    title: "Deliver",
    description:
      "We turn strategy and design into a ready-to-launch digital experience. Your website becomes clear, intuitive, emotional — and aligned with your long-term goals.",
  },
];

export default function HowIWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const workHighlightRef = useRef<HTMLSpanElement>(null);
  const workTextRef = useRef<HTMLSpanElement>(null);
  const phasesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !phasesRef.current) return;

    const ctx = gsap.context(() => {
      // Heading fade-in
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: `top ${HOW_I_WORK_START_OFFSET}%`,
          toggleActions: "play none none reverse",
        },
      });

      // Highlight "work" - orange background slide-in
      if (workHighlightRef.current && workTextRef.current) {
        gsap.fromTo(
          workHighlightRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: `top ${HOW_I_WORK_START_OFFSET}%`,
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.fromTo(
          workTextRef.current,
          { color: "#1a1a1a" },
          {
            color: "#ffffff",
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: `top ${HOW_I_WORK_START_OFFSET}%`,
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Phases - individual reveal (each phase has its own trigger)
      // SMOOTHER & LANGSAMER für mehr Chill-Vibes
      const phaseElements = Array.from(phasesRef.current!.children);
      phaseElements.forEach((phase) => {
          gsap.from(phase, {
            opacity: 0,
            y: 120,
            duration: 2,              // Länger für weiche Übergänge
            ease: "power1.out",
            scrollTrigger: {
              trigger: phase,
              start: `top ${HOW_I_WORK_START_OFFSET + 5}%`,
              end: "top 50%",
              scrub: 1.35,
              toggleActions: "play none none reverse",
            },
          });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-i-work"
      className="relative z-[60] bg-white scroll-mt-16"
    >
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-24 md:pt-20 md:pb-32">
        {/* Header */}
        <h2
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold text-center mb-8 md:mb-12"
          style={{ color: "#1a1a1a" }}
        >
          That&rsquo;s how I{" "}
          <span className="inline-block relative">
            <span ref={workTextRef} className="relative z-10">
              work.
            </span>
            <span
              ref={workHighlightRef}
              className="absolute inset-0 bg-accent/80"
              style={{
                transform: "scaleX(0)",
                transformOrigin: "left",
                zIndex: -1,
                margin: "-0.1em -0.15em",
                backgroundColor: "#f58222",
              }}
            />
          </span>
        </h2>

        <p className="mx-auto mt-2 mb-16 max-w-3xl text-center text-base md:text-lg text-[#6a6a6a]">
          Every project follows a transparent, strategic process designed to uncover clarity and deliver lasting results.
        </p>

        {/* Phases - Vertical Stack */}
        <div ref={phasesRef} className="space-y-16 md:space-y-20">
          {phases.map((phase, index) => (
            <div
              key={phase.number}
              className={`flex flex-col md:flex-row gap-6 md:gap-12 items-start${index === phases.length - 1 ? ' mb-24 md:mb-32' : ''}`}
            >
              {/* Number */}
              <div
                className="text-6xl md:text-7xl font-bold flex-shrink-0"
                style={{ color: "#f58222" }}
              >
                {phase.number}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <h3
                  className="text-3xl md:text-4xl font-bold"
                  style={{ color: "#1a1a1a" }}
                >
                  {phase.title}
                </h3>
                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{ color: "#6a6a6a" }}
                >
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
