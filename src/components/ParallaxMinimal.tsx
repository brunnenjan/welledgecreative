// src/components/ParallaxMinimal.tsx
"use client";
/* eslint-disable @next/next/no-img-element */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";


const CFG = {
  sectionMinH: "180vh",
  bgY: -120,
  fgY: -220,
  bucketY: 9000,
  fgTop: "12vh",
  bucketTop: "-36vh",
  assets: {
    bg: "/assets/parallax/section-profile/parallax-bg-profile-secondary.webp",
    fg: "/assets/parallax/section-profile/parallax-foreground-profile-secondary.webp",
    bucket: "/assets/parallax/section-profile/parallax-bucket-profile-alt.webp",
  },
} as const;

export default function ParallaxMinimal() {
  const container = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const fg = useRef<HTMLDivElement>(null);
  const bucket = useRef<HTMLDivElement>(null);
  const { bgY, fgY, bucketY } = CFG;

  const isDev = process.env.NODE_ENV !== "production";

  useLayoutEffect(() => {
    if (!container.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(bg.current, {
        y: bgY,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: isDev,
          id: "pm-bg",
        },
      });

      gsap.to(fg.current, {
        y: fgY,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: isDev,
          id: "pm-fg",
        },
      });

      gsap.to(bucket.current, {
        y: bucketY,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: isDev,
          id: "pm-bucket",
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [isDev, bgY, fgY, bucketY]);

  return (
    <section
      ref={container}
      className="relative bg-white overflow-visible"
      style={{ minHeight: CFG.sectionMinH, isolation: "isolate", zIndex: 1 }}
    >
      {/* Background */}
      <div ref={bg} className="absolute left-0 right-0 top-0 z-10 will-change-transform">
        <img src={CFG.assets.bg} alt="" className="block w-full h-auto" />
      </div>

      {/* Bucket */}
      <div
        ref={bucket}
        className="absolute left-0 w-full z-40 pointer-events-none will-change-transform"
        style={{ top: CFG.bucketTop }}
      >
        <img src={CFG.assets.bucket} alt="" className="block w-full h-auto" />
      </div>

      {/* Foreground mit Overscan */}
      <div
        ref={fg}
        className="absolute left-0 right-0 z-50 pointer-events-none will-change-transform"
        style={{ top: CFG.fgTop, minHeight: "320vh" }}
      >
        <div className="absolute left-0 right-0 bg-white" style={{ top: "-320vh", height: "320vh" }} />
        <img src={CFG.assets.fg} alt="" className="block w-full h-auto" />
        <div className="absolute left-0 right-0 bg-white" style={{ bottom: "-320vh", height: "320vh" }} />
      </div>
    </section>
  );
}
