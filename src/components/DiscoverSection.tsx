"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DiscoverSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          end: "top 50%",
          scrub: 1.2,
          toggleActions: "play none none reverse",
        },
      });

      tl.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.5,
      })
      .from(textRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
      }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="discover"
      className="section discover-section"
      style={{
        background: "#ffffff",
        paddingBlock: "clamp(4rem, 10vw, 8rem)",
      }}
    >
      <div className="container mx-auto max-w-4xl px-6">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900"
        >
          Discover
        </h2>
        <p
          ref={textRef}
          className="text-lg md:text-xl leading-relaxed text-neutral-700"
        >
          I dig in with you to define who you serve and which niche truly fits. I clarify your positioning and turn it into clear brand signals—branding and design your ideal customers instantly recognize.
        </p>
      </div>
    </section>
  );
}
