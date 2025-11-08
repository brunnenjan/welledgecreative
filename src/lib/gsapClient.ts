"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  if (process.env.NODE_ENV !== "production") {
    console.info("[GSAP] ScrollTrigger registered ✅");
  }
}

export { gsap, ScrollTrigger };
