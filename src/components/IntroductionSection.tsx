"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";


export default function IntroductionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !textRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
      });

      tl.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      }).from(
        textRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="introduction"
      className="relative bg-white"
      style={{
        paddingTop: "clamp(4rem, 10vh, 8rem)",
        paddingBottom: "clamp(4rem, 10vh, 8rem)",
      }}
    >
      <div className="container mx-auto max-w-4xl px-6">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold mb-8 text-neutral-900"
        >
          Your brand deserves more than a template.
        </h2>
        <div ref={textRef} className="space-y-6 text-lg md:text-xl leading-relaxed text-neutral-700">
          <p>
            I help small businesses, retreat centers, and creative professionals build brands and websites that reflect who they truly are—not who they think they should be.
          </p>
          <p>
            Through strategy, design, and development, I&apos;ll uncover your unique position, clarify your message, and create a digital presence that feels authentic and attracts the right people.
          </p>
          <p>
            I go deeper than surface-level aesthetics. Ready to build something meaningful?
          </p>
        </div>
      </div>
    </section>
  );
}
