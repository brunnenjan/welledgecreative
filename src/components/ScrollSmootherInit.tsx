"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isIosChrome, isIosBrowser } from "@/utils/device";

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
      ScrollTrigger.refresh(true);
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
    if (isIosChrome()) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Initialize ScrollSmoother - disable on mobile to prevent jitter
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: isMobile ? 0 : 1.2, // Disable smooth scroll on mobile to prevent jitter
      effects: true, // Enable data-speed attributes
      smoothTouch: 0, // Disable touch smoothing to prevent conflicts
    });

    return () => {
      smoother?.kill();
    };
  }, []);

  useEffect(() => {
    // Enable normalizeScroll for all iOS browsers to prevent scroll jitter
    if (!isIosBrowser()) return;
    const normalizer = ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
      lockAxis: false,
      momentum: (self: { velocityY: number }) => Math.min(3, self.velocityY / 1000),
      type: "touch,wheel,pointer",
    });
    return () => {
      const normalizerInstance = normalizer as { kill?: () => void } | undefined;
      normalizerInstance?.kill?.();
    };
  }, []);

  return null;
}
