"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
  BG_SPEED: 240,
  FG_SPEED: -300,
  BUCKET_SPEED: 560,
  BUCKET_START: -46,
  SECTION_HEIGHT: "120vh",
  SHOW_MARKERS: false,
} as const;

type DesignParallaxSeparatorProps = {
  id?: string;
  ariaHidden?: boolean;
};

export default function DesignParallaxSeparator({ id, ariaHidden = true }: DesignParallaxSeparatorProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const bg = section.querySelector('[data-layer="bg"]');
    const bucket = section.querySelector('[data-layer="bucket"]');
    const fg = section.querySelector('[data-layer="fg"]');

    if (!bg || !bucket || !fg) return;

    let ctx: gsap.Context | null = null;

    const init = () => {
      const computed = getComputedStyle(section);
      const bgSpeed = parseFloat(computed.getPropertyValue("--parallax-bg-speed")) || CONFIG.BG_SPEED;
      const fgSpeed = parseFloat(computed.getPropertyValue("--parallax-fg-speed")) || CONFIG.FG_SPEED;
      const bucketSpeed = parseFloat(computed.getPropertyValue("--parallax-bucket-speed")) || CONFIG.BUCKET_SPEED;
      const bucketStart = parseFloat(computed.getPropertyValue("--parallax-bucket-start")) || CONFIG.BUCKET_START;

      ctx = gsap.context(() => {
        gsap.to(bg, {
          y: bgSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.3,
            markers: CONFIG.SHOW_MARKERS,
            id: "design-bg",
          },
        });

        gsap.to(bucket, {
          y: bucketSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: `top+=${bucketStart}px bottom`,
            end: "bottom top",
            scrub: 1.3,
            markers: CONFIG.SHOW_MARKERS,
            id: "design-bucket",
          },
        });

        gsap.to(fg, {
          y: fgSpeed,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.3,
            markers: CONFIG.SHOW_MARKERS,
            id: "design-fg",
          },
        });
      }, section);
      ScrollTrigger.refresh();
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="profile-section relative bg-white overflow-hidden"
      style={{
        minHeight: CONFIG.SECTION_HEIGHT,
        "--parallax-bg-speed": `${CONFIG.BG_SPEED}`,
        "--parallax-fg-speed": `${CONFIG.FG_SPEED}`,
        "--parallax-bucket-speed": `${CONFIG.BUCKET_SPEED}`,
        "--parallax-bucket-start": `${CONFIG.BUCKET_START}`,
      } as CSSProperties}
      aria-hidden={ariaHidden}
    >
      {!ariaHidden && (
        <div className="sr-only">Overview — Discover, Design, Deliver.</div>
      )}
      <div
        data-layer="bg"
        className="absolute left-0 right-0 z-10"
        style={{ top: "-48vh", height: "120vh" }}
      >
        <img
          src="/assets/parallax/section-design/parallax-bg-design-secondary.webp"
          alt=""
          className="w-full h-full object-cover"
          width={1536}
          height={1024}
          style={{ display: "block", transform: "translateY(-0.5px) scale(1.01)" }}
        />
      </div>

      <div
        data-layer="bucket"
        className="absolute left-0 right-0 z-[40]"
        style={{ top: "-88vh", height: "92vh" }}
      >
        <img
          src="/assets/parallax/section-design/parallax-bucket-design-alt.webp"
          alt="Design bucket"
          className="profile-bucket-img"
          loading="lazy"
          decoding="async"
          width={1920}
          height={1080}
        />
      </div>

      <div
        data-layer="fg"
        className="absolute left-0 right-0 z-50 pointer-events-none"
        style={{ top: 0, minHeight: "220vh" }}
      >
        <img
          src="/assets/parallax/section-design/parallax-foreground-design-secondary.webp"
          alt=""
          className="w-full h-auto object-cover"
          width={2650}
          height={1490}
          style={{ display: "block", transform: "translateY(-0.5px) scale(1.01)" }}
        />
        <div
          className="absolute left-0 right-0 bg-white"
          style={{ top: "90vh", height: "200vh" }}
        />
      </div>

      <div
        className="absolute left-0 right-0 bg-white z-[20]"
        style={{ top: CONFIG.SECTION_HEIGHT, height: "90vh" }}
      />
    </section>
  );
}
