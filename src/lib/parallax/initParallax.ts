import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

let initialized = false;

export function initParallax() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });
}
