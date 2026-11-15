"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Lets the proposal's blocks rise in gently as they come into view. */
export default function ProposalMotion({ selector }: { selector: string }) {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) =>
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }),
      );
    });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      window.clearTimeout(t);
      mm.revert();
    };
  }, [selector]);
  return null;
}
