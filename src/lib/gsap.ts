// src/lib/gsap.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register plugins once
if (typeof window !== "undefined") {
}

export function getGsap() {
  return { gsap, ScrollTrigger, ScrollSmoother };
}