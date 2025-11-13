// src/components/ParallaxSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  // Asset paths
  bgSrc: string;
  fgSrc: string;
  bucketSrc?: string;

  // Display options
  showBucket?: boolean;
  showRope?: boolean;
  bucketFlipX?: boolean;
  bucketSwing?: boolean;

  // Layout
  sectionHeight?: number; // vh units
  bucketStartOffset?: number; // vh from top
  fgOverscan?: number; // vh extra height to prevent gaps
  fgTopOffset?: number; // negative value to pull foreground up and cover gaps

  // Parallax speeds (multiplier of scroll distance)
  bgSpeed?: number; // positive = moves down
  fgSpeed?: number; // negative = moves up
  bucketSpeed?: number; // positive = moves down

  // Bucket sizing
  bucketSize?: number; // scale multiplier

  // Delayed bucket animation
  bucketDelayProgress?: number; // scroll progress (px) before bucket starts moving
};

export default function ParallaxSection({
  bgSrc,
  fgSrc,
  bucketSrc = "/assets/parallax/section-contact/parallax-bucket-rope-angled.webp",
  showBucket = false,
  showRope = true,
  bucketFlipX = false,
  bucketSwing = true,
  sectionHeight = 80,
  bucketStartOffset = -12,
  fgOverscan: _fgOverscan = 60,
  fgTopOffset = -30,
  bgSpeed = 0.15,
  fgSpeed = -0.15,  // UNIFIED foreground speed across all sections
  bucketSpeed = 0.25,
  bucketSize = 1.0,
  bucketDelayProgress = 0,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);
  void _fgOverscan;

  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate final bucket scale: 20% larger on mobile
  const finalBucketScale = isMobile ? bucketSize * 1.2 : bucketSize;

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const fg = fgRef.current;
    const bucket = bucketRef.current;

    if (!section || !bg || !fg) return;

    let ticking = false;

    const updateParallax = () => {
      ticking = false;

      const rect = section.getBoundingClientRect();
      const scrollProgress = -rect.top; // Positive when section enters viewport

      // Apply parallax transforms
      bg.style.transform = `translate3d(0, ${scrollProgress * bgSpeed}px, 0)`;
      fg.style.transform = `translate3d(0, ${scrollProgress * fgSpeed}px, 0)`;

      if (bucket && showBucket) {
        // Delayed bucket animation: only start moving after delay threshold
        const bucketProgress = Math.max(0, scrollProgress - bucketDelayProgress);
        bucket.style.transform = `translate3d(0, ${bucketProgress * bucketSpeed}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      updateParallax();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [bgSpeed, fgSpeed, bucketSpeed, showBucket, bucketDelayProgress]);

  // Add subtle bucket swing animation
  useEffect(() => {
    if (!showBucket || !bucketSwing || !bucketRef.current) return;

    const bucket = bucketRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    // Add CSS animation inline
    bucket.style.animation = "bucket-swing 3.5s ease-in-out infinite alternate";
  }, [showBucket, bucketSwing]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black"
      style={{ height: `${sectionHeight}vh`, minHeight: "400px" }}
    >
      {/* Background Layer */}
      <div
        ref={bgRef}
        className="absolute left-0 right-0 z-[10] will-change-transform"
        style={{
          top: 0,
          opacity: 0.92,
        }}
      >
        <Image
          src={bgSrc}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100vw",
            height: "auto",
            display: "block",
          }}
          priority={false}
        />
      </div>

      {/* Bucket with Rope (optional) */}
      {showBucket && (
        <div
          ref={bucketRef}
          className="absolute left-0 z-[40] pointer-events-none will-change-transform"
          style={{
            top: `${bucketStartOffset}vh`,
            transformOrigin: "top center"
          }}
          aria-hidden
        >
          {/* Rope Extension */}
          {showRope && (
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: "100%",
                width: "3px",
                height: "120vh",
                background: "linear-gradient(to bottom, rgba(204,204,187,0.85), rgba(135,118,102,0.85))",
                opacity: 0.9,
              }}
            />
          )}

          {/* Bucket Image */}
          <Image
            src={bucketSrc}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: `${finalBucketScale * 100}vw`,
              height: "auto",
              display: "block",
              transform: bucketFlipX ? "scaleX(-1)" : undefined,
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
            }}
            priority={false}
          />
        </div>
      )}

      {/* Foreground Cutout Layer */}
      <div
        ref={fgRef}
        className="pointer-events-none absolute left-0 right-0 z-[50] will-change-transform"
        style={{
          top: `${fgTopOffset}vh`,
        }}
      >
        <Image
          src={fgSrc}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100vw",
            height: "auto",
            display: "block"
          }}
          priority={false}
        />
      </div>

      {/* Add inline keyframes for bucket swing */}
      <style jsx>{`
        @keyframes bucket-swing {
          0% {
            transform: translate3d(-50%, 0, 0) rotate(-1deg);
          }
          100% {
            transform: translate3d(-50%, 0, 0) rotate(1deg);
          }
        }
      `}</style>
    </section>
  );
}
