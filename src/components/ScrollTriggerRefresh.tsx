"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


/**
 * One-time ScrollTrigger refresh after all images/assets load
 * to ensure correct measurements and prevent layout issues
 */
export default function ScrollTriggerRefresh() {
  useEffect(() => {
    // Wait for window load (all images and assets)
    const handleLoad = () => {
      // Small delay to ensure layout is settled
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    if (document.readyState === "complete") {
      // Page already loaded
      handleLoad();
    } else {
      // Wait for load event
      window.addEventListener("load", handleLoad, { once: true });
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return null;
}
