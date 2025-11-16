// src/components/ThirdParallaxSimple.tsx
"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEBUG = process.env.NODE_ENV !== "production";

// ============================================
// EINSTELLUNGEN - HIER ANPASSEN!
// ============================================
const CONFIG = {
  // BILDER - Design Section Images
  images: {
    background: "/assets/parallax/section-design/parallax-bg-design-secondary.webp",  // Design background
    foreground: "/assets/parallax/section-design/parallax-foreground-design-secondary.webp",    // Design foreground
    bucket: "/assets/parallax/section-design/parallax-bucket-design-alt.webp",             // Bucket with design
  },

  // BEWEGUNGEN (in Pixel)
  bgMove: 700,           // Background nach unten
  fgMove: -120,          // Foreground nach oben
  bucketMove: 1800,      // Bucket nach unten

  // STARTPOSITIONEN
  bgStartTop: "-40vh",
  bucketStartTop: "-100vh",

  // SECTION HÖHE
  sectionHeight: "180vh",

  // ARROW (falls gewünscht)
  showArrow: false,  // Kein Arrow in dieser Section

  // DEBUG
  showMarkers: DEBUG,
} as const;

export default function ThirdParallaxSimple() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const bg = section.querySelector('[data-layer="bg"]');
    const bucket = section.querySelector('[data-layer="bucket"]');
    const fg = section.querySelector('[data-layer="fg"]');

    if (!bg || !bucket || !fg) {
      console.error("❌ Layers not found!");
      return;
    }

    setTimeout(() => {
      // Background
      gsap.to(bg, {
        y: CONFIG.bgMove,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          markers: CONFIG.showMarkers,
          id: "bg-3",
        },
      });

      // Bucket
      gsap.to(bucket, {
        y: CONFIG.bucketMove,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          markers: CONFIG.showMarkers,
          id: "bucket-3",
        },
      });

      // Foreground
      gsap.to(fg, {
        y: CONFIG.fgMove,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          markers: CONFIG.showMarkers,
          id: "fg-3",
        },
      });
    }, 100);

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.id && ["bg-3", "bucket-3", "fg-3"].includes(st.vars.id as string)) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ minHeight: CONFIG.sectionHeight }}
    >
      {/* Background */}
      <div
        data-layer="bg"
        className="absolute left-0 right-0 z-10"
        style={{ top: CONFIG.bgStartTop, height: "100vh" }}
      >
        <img
          src={CONFIG.images.background}
          alt=""
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
      </div>

      {/* Bucket/Center Element */}
      <div
        data-layer="bucket"
        className="absolute left-0 right-0 z-[40]"
        style={{ top: CONFIG.bucketStartTop, height: "80vh" }}
      >
        <img
          src={CONFIG.images.bucket}
          alt=""
          className="w-full h-auto object-contain"
          style={{ display: "block", filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))" }}
        />
      </div>

      {/* Foreground mit Overscan */}
      <div
        data-layer="fg"
        className="absolute left-0 right-0 z-50 pointer-events-none"
        style={{ top: 0, minHeight: "800vh" }}
      >
        <img
          src={CONFIG.images.foreground}
          alt=""
          className="w-full h-auto object-cover"
          style={{ display: "block" }}
        />
        {/* Weißer Füller */}
        <div
          className="absolute left-0 right-0 bg-white"
          style={{ top: "95vh", height: "700vh" }}
        />
      </div>

      {/* Statischer weißer Block */}
      <div
        className="absolute left-0 right-0 bg-white z-[55]"
        style={{ top: CONFIG.sectionHeight, height: "200vh" }}
      />
    </section>
  );
}
