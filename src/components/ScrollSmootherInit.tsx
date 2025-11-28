"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

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

export default function ScrollSmootherInit() {
  const pathname = usePathname();
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refreshGsap = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    refreshTimeoutRef.current = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("load", refreshGsap);

    // Refresh immediately on page visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        ScrollTrigger.refresh(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const fontReady = document.fonts?.ready;
    if (fontReady) {
      fontReady.then(refreshGsap).catch(() => {
        // ignore font readiness errors
      });
    }

    // Initial immediate refresh
    ScrollTrigger.refresh(true);

    return () => {
      window.removeEventListener("load", refreshGsap);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    };
  }, [refreshGsap]);

  useEffect(() => {
    refreshGsap();
  }, [pathname, refreshGsap]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const images = Array.from(document.images || []);
    if (images.length === 0) {
      refreshGsap();
      return;
    }

    let pending = 0;

    const handleSettled = () => {
      pending -= 1;
      if (pending <= 0) {
        refreshGsap();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        return;
      }
      pending += 1;
      img.addEventListener("load", handleSettled, { once: true });
      img.addEventListener("error", handleSettled, { once: true });
    });

    if (pending === 0) {
      refreshGsap();
    }

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleSettled);
        img.removeEventListener("error", handleSettled);
      });
    };
  }, [refreshGsap]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Enable ScrollSmoother on desktop only (disable on mobile/tablet to prevent scroll blocking)
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: isMobile ? 0 : 1.2, // Smooth scroll only on desktop (1024px+)
      effects: true,
      smoothTouch: 0, // Never smooth on touch devices
    });

    return () => {
      smoother?.kill();
    };
  }, []);

  useEffect(() => {
    // normalizeScroll disabled - was interfering with native scroll
    return;
  }, []);

  return null;
}
