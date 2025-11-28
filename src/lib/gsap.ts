// src/lib/gsap.ts
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register plugins once
if (typeof window !== "undefined") {
}

export function getGsap() {
  return { gsap, ScrollTrigger, ScrollSmoother };
}