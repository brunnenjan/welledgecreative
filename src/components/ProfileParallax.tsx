"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProfileParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for bucket scaling
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current || !bgRef.current || !fgRef.current || !bucketRef.current) return;

    const isMobileCheck = window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Disable all animations on mobile to prevent glitches
    if (isMobileCheck || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isTablet = window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;

      // Parallax speeds (desktop and tablet only)
      const bgSpeed = isTablet ? 0.12 : 0.15;
      const fgSpeed = isTablet ? -0.1 : -0.12;
      const bucketSpeed = 0.5;

      // Background parallax
      gsap.to(bgRef.current, {
        y: () => `${window.innerHeight * bgSpeed}px`,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Foreground parallax (moves up)
      gsap.to(fgRef.current, {
        y: () => `-${window.innerHeight * fgSpeed}px`,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Bucket parallax (descends)
      gsap.to(bucketRef.current, {
        y: () => `${window.innerHeight * bucketSpeed}px`,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Subtle bucket swing (desktop/tablet only)
      gsap.to(bucketRef.current, {
        rotation: 1.5,
        transformOrigin: "50% 0%",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="profile"
      className="relative overflow-hidden bg-background"
      style={{
        minHeight: "100vh",
        height: "140vh",
        paddingTop: "clamp(3rem, 8vh, 6rem)",
        paddingBottom: "clamp(3rem, 8vh, 6rem)",
        paddingInline: "clamp(2rem, 5vw, 4rem)"
      }}
    >
      {/* Background Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1] will-change-transform"
        aria-hidden
      >
        <Image
          src="/assets/parallax/section-profile/parallax-bg-profile.webp"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Bucket */}
      <div
        ref={bucketRef}
        className="absolute left-1/2 -translate-x-1/2 z-[40] pointer-events-none will-change-transform"
        style={{
          top: "clamp(-15vh, -10vh, -8vh)",
          // 20% larger on mobile
          width: isMobile ? "min(108vw, 720px)" : "min(90vw, 600px)"
        }}
        aria-hidden
      >
        <Image
          src="/assets/parallax/section-profile/parallax-bucket-profile.webp"
          alt=""
          width={600}
          height={600}
          className="w-full h-auto drop-shadow-2xl"
          priority
        />
      </div>

      {/* Foreground Cutout Layer */}
      <div
        ref={fgRef}
        className="pointer-events-none absolute left-0 right-0 z-[50] will-change-transform"
        style={{ top: "-5vh", height: "110%" }}
        aria-hidden
      >
        <Image
          src="/assets/parallax/section-profile/parallax-foreground-profile.webp"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}
