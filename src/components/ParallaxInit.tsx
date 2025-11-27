"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initParallax } from "@/lib/parallax/initParallax";

export default function ParallaxInit() {
  useEffect(() => {
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
