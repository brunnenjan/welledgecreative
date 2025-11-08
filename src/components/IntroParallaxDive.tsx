"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

const MOTION_RANGE = 60;
const ROTATION_RANGE = 6;

export default function IntroParallaxDive() {
  const sectionRef = useRef<HTMLElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);
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
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    const bucket = bucketRef.current;
    if (!section || !bucket) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const progress = total <= 0 ? 0 : (window.innerHeight - rect.top) / total;
      const clamped = Math.min(Math.max(progress, 0), 1);
      const translate = (clamped * MOTION_RANGE) - MOTION_RANGE / 2;
      const rotate = (clamped * ROTATION_RANGE) - ROTATION_RANGE / 2;
      bucket.style.transform = `translateY(${translate}px) rotate(${rotate}deg)`;
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="intro-dive-section scroll-mt-16"
      aria-labelledby="intro-dive-title"
    >
      <div className="intro-dive-inner">
        <div className="intro-dive-visual" aria-hidden>
          <div
            ref={bucketRef}
            className={`intro-dive-bucket${prefersReducedMotion ? " is-static" : ""}`}
          >
            <img
              src="/assets/parallax/section-design/parallax-bucket-design-alt.webp"
              alt=""
              width={280}
              height={320}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="intro-dive-copy">
          <p id="intro-dive-title" className="intro-dive-heading">
            Ready to dive into the deep — where clarity and creativity meet.
          </p>
          <p className="intro-dive-subheading">
            Every project begins with curiosity.
          </p>
          <button
            type="button"
            className="intro-dive-scroll"
            onClick={() => smoothScrollTo("design-strategy")}
          >
            Scroll to explore
          </button>
        </div>
      </div>
    </section>
  );
}
