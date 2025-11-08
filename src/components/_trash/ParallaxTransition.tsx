// src/components/ParallaxTransition.tsx
"use client";
/* eslint-disable @next/next/no-img-element */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxTransitionProps {
  // Layer images
  backgroundSrc: string;
  foregroundSrc: string;
  centerElementSrc: string;

  // Optional arrow/label
  showArrow?: boolean;
  arrowLabel?: string;
  arrowPosition?: string; // e.g., "left-[15%]"

  // Animation configuration
  bgMove?: number;          // Background vertical movement (negative = up, positive = down)
  fgMoveFirst?: number;     // Foreground first phase movement (negative = up)
  fgMoveSecond?: number;    // Foreground second phase movement (negative = up)
  centerMove?: number;      // Center element movement (positive = down)
  scrollDistance?: number;  // Total scroll distance in pixels (default 2500)

  // Timing configuration (0-1, timeline progress)
  arrowShow?: number;       // When arrow appears (0-1)
  arrowHide?: number;       // When arrow disappears (0-1)
  continueAfter?: number;   // When second phase starts (0-1)

  // Positioning
  centerElementTop?: string; // e.g., "-40vh"
  foregroundTop?: string;    // e.g., "15vh"
}

export default function ParallaxTransition({
  backgroundSrc,
  foregroundSrc,
  centerElementSrc,
  showArrow = false,
  arrowLabel = "That's Me!",
  arrowPosition = "left-[15%]",
  bgMove = -150,
  fgMoveFirst = -400,
  fgMoveSecond = 0,
  centerMove = 600,
  scrollDistance = 2500,
  arrowShow = 0.35,
  arrowHide = 0.55,
  continueAfter = 0.6,
  centerElementTop = "-40vh",
  foregroundTop = "15vh",
}: ParallaxTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !bgRef.current || !fgRef.current || !centerRef.current) return;
    if (showArrow && !arrowRef.current) return;

    let ctx: gsap.Context | null = null;

    const ready = async () => {
      const imgs = [bgRef.current, fgRef.current, centerRef.current].map((ref) =>
        Array.from(ref!.querySelectorAll("img"))
      ).flat();
      await Promise.allSettled(
        imgs.map(
          (img) =>
            new Promise<void>((resolve) => {
              const el = img as HTMLImageElement;
              if (el.complete) return resolve();
              el.addEventListener("load", () => resolve(), { once: true });
              el.addEventListener("error", () => resolve(), { once: true });
            })
        )
      );
    };

    (async () => {
      await ready();

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        // Skip animations, show final state
        if (centerRef.current) centerRef.current.style.transform = `translateY(${centerMove}px)`;
        if (fgRef.current) fgRef.current.style.transform = `translateY(${fgMoveFirst}px)`;
        if (bgRef.current) bgRef.current.style.transform = `translateY(${bgMove}px)`;
        return;
      }

      ctx = gsap.context(() => {
        // Create single timeline with one ScrollTrigger
        // This controls all 3 phases: Entry → Hold → Exit
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 1,                    // Smooth 1-second delay
            pin: true,
            pinSpacing: true,            // Prevent layout collapse/whitespace
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // markers: true,            // Uncomment to debug
          },
          defaults: { ease: "none" },
        });

        // PHASE 1: ENTRY (0 → 0.3)
        // Layers scroll in naturally and meet at center
        // No animations needed - they're already centered via CSS

        // PHASE 2: HOLD (0.3 → 0.6)
        // Everything stays pinned at center - no movement

        // Arrow appears during hold phase
        if (showArrow && arrowRef.current) {
          tl.fromTo(
            arrowRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: "power2.out" },
            arrowShow
          );
          tl.to(
            arrowRef.current,
            { opacity: 0, duration: 0.2, ease: "power2.in" },
            arrowHide
          );
        }

        // PHASE 3: EXIT (0.6 → 1.0)
        // Layers separate and move in different directions
        tl.to(bgRef.current!, { y: bgMove }, continueAfter);
        tl.to(fgRef.current!, { y: fgMoveFirst }, continueAfter);
        tl.to(centerRef.current!, { y: centerMove }, continueAfter);

      }, sectionRef);

      ScrollTrigger.refresh();
    })();

    return () => {
      ctx?.revert();
    };
  }, [bgMove, fgMoveFirst, fgMoveSecond, centerMove, scrollDistance, arrowShow, arrowHide, continueAfter, showArrow]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-visible bg-white"
      style={{
        minHeight: "300vh",
        isolation: "isolate",
        zIndex: 50
      }}
    >
      <div className="sticky top-0 h-screen overflow-visible relative">
        {/* Background Layer */}
        <div
          ref={bgRef}
          className="absolute left-0 right-0 top-0 z-[10] will-change-transform"
          style={{ opacity: 0.92 }}
        >
          <img
            src={backgroundSrc}
            alt=""
            loading="eager"
            style={{
              width: "100vw",
              height: "auto",
              display: "block",
            }}
          />
        </div>

        {/* Center Element (Bucket) */}
        <div
          ref={centerRef}
          className="absolute left-0 w-full z-[40] pointer-events-none will-change-transform"
          style={{
            top: centerElementTop,
          }}
          aria-hidden
        >
          <img
            src={centerElementSrc}
            alt=""
            loading="eager"
            style={{
              width: "100vw",
              height: "auto",
              display: "block",
              filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))",
            }}
          />
        </div>

        {/* Foreground Cutout Layer */}
        <div
          ref={fgRef}
          className="pointer-events-none absolute left-0 right-0 z-[50] will-change-transform"
          style={{
            top: foregroundTop,
            minHeight: "300vh",
          }}
        >
          {/* White fill at top - extends upward */}
          <div
            className="absolute left-0 right-0 bg-white"
            style={{
              top: "-300vh",
              height: "300vh"
            }}
          />

          <img
            src={foregroundSrc}
            alt=""
            loading="eager"
            style={{
              width: "100vw",
              height: "auto",
              display: "block"
            }}
          />

          {/* White fill at bottom - extends downward */}
          <div
            className="absolute left-0 right-0 bg-white"
            style={{
              bottom: "-300vh",
              height: "300vh"
            }}
          />
        </div>

        {/* Optional Arrow - Fixed in viewport center */}
        {showArrow && (
          <div
            ref={arrowRef}
            className={`fixed ${arrowPosition} pointer-events-none opacity-0`}
            style={{
              top: "50vh",
              transform: "translateY(-50%)",
              zIndex: 9999,
              willChange: "opacity"
            }}
          >
            <div className="flex items-center gap-4">
              <div className="text-[#ff7a00] text-3xl md:text-4xl font-bold tracking-wide drop-shadow-lg">
                {arrowLabel}
              </div>
              <svg
                width="120"
                height="60"
                viewBox="0 0 120 60"
                className="drop-shadow-lg"
              >
                <path
                  d="M 5 30 Q 60 15, 110 30"
                  stroke="#ff7a00"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 110 30 L 95 22 M 110 30 L 95 38"
                  stroke="#ff7a00"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
