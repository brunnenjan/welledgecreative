"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * 🧭 FIX: Ensure GSAP ScrollTrigger refreshes after navigation & content load
 *
 * Problem:
 * When navigating between sections (via navbar or scrollTo),
 * ScrollTrigger sometimes initializes before DOM + images are fully rendered,
 * resulting in blank sections.
 *
 * Solution:
 * - Wait for Next.js route change or window load events
 * - Call ScrollTrigger.refresh() with a short timeout
 * - Optional: re-init parallax after refresh
 */
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollSmootherInit() {
  const pathname = usePathname();
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refreshGsap = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    refreshTimeoutRef.current = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("load", refreshGsap);
    const fontReady = document.fonts?.ready;
    if (fontReady) {
      fontReady.then(refreshGsap).catch(() => {
        // ignore font readiness errors
      });
    }

    return () => {
      window.removeEventListener("load", refreshGsap);
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    };
  }, [refreshGsap]);

  useEffect(() => {
    refreshGsap();
  }, [pathname, refreshGsap]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Initialize ScrollSmoother
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.6, // Lighter smoothing so sections don’t overshoot
      effects: true, // Enable data-speed attributes
      smoothTouch: 0.12, // Softer touch inertia for better control
    });

    return () => {
      smoother?.kill();
    };
  }, []);

  return null;
}
