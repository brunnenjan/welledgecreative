"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Motion for the Tribal Tulum sketch: photos drift slower than the page (parallax),
 * and blocks rise in as they come into view. Nothing moves for visitors who ask for reduced motion.
 */
export default function TribalMotion() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const frame = el.parentElement ?? el;
        gsap.fromTo(
          el,
          { yPercent: -9 },
          { yPercent: 9, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          delay: Number(el.dataset.rise || 0) * 0.12,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => {
      window.clearTimeout(t);
      mm.revert();
    };
  }, []);
  return null;
}
