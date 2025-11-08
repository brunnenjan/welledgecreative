// src/components/ProfileParallaxClean.tsx
"use client";
/* eslint-disable @next/next/no-img-element */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  parallaxBackground: -120,
  parallaxForeground: -180,
  pinScrollDistance: 1200,
  bucketDescent: 600,
  arrowFadeIn: 0.3,
  arrowFadeOut: 0.6,
  bucketStartTop: "-40vh",
  foregroundStartTop: "15vh",
  phase1MinHeightPx: 1200,
} as const;

export default function ProfileParallaxClean() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || !backgroundRef.current || !foregroundRef.current || !bucketRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const getHeaderH = () =>
      (document.querySelector("header") as HTMLElement | null)?.offsetHeight || 0;

    const waitForImages = async () => {
      const imgs = Array.from(container.querySelectorAll("img"));
      if (!imgs.length) return;
      await Promise.allSettled(
        imgs.map((img) =>
          (img as HTMLImageElement).complete
            ? Promise.resolve()
            : new Promise<void>((res) => {
                img.addEventListener("load", () => res(), { once: true });
                img.addEventListener("error", () => res(), { once: true });
              })
        )
      );
    };

    const showLayers = () => gsap.set([backgroundRef.current, foregroundRef.current, bucketRef.current], { autoAlpha: 1 });
    const hideLayers = () => gsap.set([backgroundRef.current, foregroundRef.current, bucketRef.current], { autoAlpha: 0 });

    const ctx = gsap.context(() => {
      const init = async () => {
        await waitForImages();

        if (prefersReducedMotion) {
          gsap.set(backgroundRef.current, { y: CONFIG.parallaxBackground });
          gsap.set(foregroundRef.current, { y: CONFIG.parallaxForeground });
          gsap.set(bucketRef.current, { y: CONFIG.bucketDescent });
          return;
        }

        // Start: alles unsichtbar
        hideLayers();

        // Sichtbarkeits-Gate: erst zeigen, wenn die Section wirklich dran ist
        ScrollTrigger.create({
          trigger: container,
          start: "top 98%",
          end: () => `top+=${getHeaderH()} top`,
          onEnter: showLayers,
          onEnterBack: showLayers,
          onLeave: hideLayers,
          onLeaveBack: hideLayers,
          id: "p0-visibility",
          markers: false, // zum Debuggen true
        });

        // ---------- PHASE 1: PARALLAX (ohne Pin) ----------
        gsap.to(backgroundRef.current, {
          y: CONFIG.parallaxBackground,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: container,
            start: "top 98%",
            end: () => `top+=${getHeaderH()} top`,
            scrub: true,
            id: "p1-bg",
            markers: { startColor: "blue", endColor: "blue", fontSize: "12px", indent: 20 },
            invalidateOnRefresh: true,
          },
        });

        gsap.to(foregroundRef.current, {
          y: CONFIG.parallaxForeground,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: container,
            start: "top 98%",
            end: () => `top+=${getHeaderH()} top`,
            scrub: true,
            id: "p1-fg",
            markers: { startColor: "green", endColor: "green", fontSize: "12px", indent: 40 },
            invalidateOnRefresh: true,
          },
        });

        // ---------- PHASE 2: PIN + BUCKET + ARROW ----------
        const pinTimeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: container,
            start: () => `top+=${getHeaderH()} top`,
            end: () => `+=${CONFIG.pinScrollDistance}`,
            scrub: 1,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            id: "p2-pin",
            markers: { startColor: "red", endColor: "red", fontSize: "12px", indent: 60 },
            invalidateOnRefresh: true,
            onLeave: hideLayers,
            onLeaveBack: showLayers,
          },
        });

        pinTimeline.to(bucketRef.current, { y: CONFIG.bucketDescent }, 0);

        if (arrowRef.current) {
          pinTimeline.fromTo(arrowRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, CONFIG.arrowFadeIn);
          pinTimeline.to(arrowRef.current, { autoAlpha: 0, duration: 0.25 }, CONFIG.arrowFadeOut);
        }

        ScrollTrigger.refresh();
      };

      init();
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="relative overflow-visible bg-white"
        style={{ isolation: "isolate", zIndex: 50, minHeight: `${CONFIG.phase1MinHeightPx}px` }}
      >
        {/* Background Layer - z-10 */}
        <div ref={backgroundRef} className="absolute left-0 right-0 top-0 z-10 will-change-transform" style={{ opacity: 0.92 }}>
          <img src="/background_layer_profile.png" alt="" className="w-full h-auto block" loading="eager" />
        </div>

        {/* Bucket - z-40 */}
        <div
          ref={bucketRef}
          className="absolute left-0 w-full z-40 will-change-transform pointer-events-none"
          style={{ top: CONFIG.bucketStartTop }}
        >
          <img
            src="/bucket-with-profile.png"
            alt=""
            className="w-full h-auto block"
            style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))" }}
            loading="eager"
          />
        </div>

        {/* Foreground mit Cutout + Overscan - z-50 */}
        <div
          ref={foregroundRef}
          className="absolute left-0 right-0 z-50 will-change-transform pointer-events-none"
          style={{ top: CONFIG.foregroundStartTop, minHeight: "300vh" }}
        >
          {/* Overscan oben (verhindert Lücken) */}
          <div className="absolute left-0 right-0 bg-white" style={{ top: "-300vh", height: "300vh" }} />
          <img src="/foreground_layer_profile.png" alt="" className="w-full h-auto block" loading="eager" />
          {/* Overscan unten */}
          <div className="absolute left-0 right-0 bg-white" style={{ bottom: "-300vh", height: "300vh" }} />
        </div>

        {/* Arrow (fixed in viewport) */}
        <div
          ref={arrowRef}
          className="fixed left-[15%] pointer-events-none"
          style={{ top: "50vh", transform: "translateY(-50%)", zIndex: 9999, willChange: "opacity", opacity: 0 }}
        >
          <div className="flex items-center gap-4">
            <div className="text-[#ff7a00] text-3xl md:text-4xl font-bold tracking-wide drop-shadow-lg">That&rsquo;s Me!</div>
            <svg width="120" height="60" viewBox="0 0 120 60" className="drop-shadow-lg" aria-hidden>
              <path d="M 5 30 Q 60 15, 110 30" stroke="#ff7a00" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 110 30 L 95 22 M 110 30 L 95 38" stroke="#ff7a00" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* Spacer für die Pin-Phase (weil pinSpacing:false) */}
      <div aria-hidden style={{ height: `${CONFIG.pinScrollDistance}px` }} />
    </>
  );
}
