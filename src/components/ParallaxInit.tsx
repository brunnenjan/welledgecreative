"use client";

import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initParallax } from "@/lib/parallax/initParallax";

export default function ParallaxInit() {
  useLayoutEffect(() => {
    initParallax();
    const timeout = setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // ignore
      }
    }, 250);
    return () => clearTimeout(timeout);
  }, []);

  return null;
}
