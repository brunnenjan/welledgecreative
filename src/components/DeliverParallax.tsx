"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PARALLAX_CONFIG } from "@/config/parallaxSettings";

gsap.registerPlugin(ScrollTrigger);

export default function DeliverParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [bucketInitialTop, setBucketInitialTop] = useState('clamp(-15vh, -10vh, -8vh)');
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

    // Disable all animations if reduced motion is preferred
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isMobile = isMobileCheck;
      const isTablet = window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;

      // Get device-specific config for deliver section
      const config = isMobile
        ? PARALLAX_CONFIG.deliver.mobile
        : isTablet
          ? PARALLAX_CONFIG.deliver.tablet
          : PARALLAX_CONFIG.deliver.desktop;

      const { bgSpeed, fgSpeed, bucketSpeed } = config;
      const scrollRange = "+=200%";
      const scrubValue = 3.8;

      // Background/Foreground parallax (desktop/tablet only)
      if (!isMobile) {
        // Background parallax (smoother, extended range)
        gsap.to(bgRef.current, {
          y: () => `${window.innerHeight * bgSpeed}px`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: scrollRange,
            scrub: scrubValue,
          },
        });

        // Foreground parallax (moves up, smoother, extended range)
        gsap.to(fgRef.current, {
          y: () => `-${window.innerHeight * fgSpeed}px`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: scrollRange,
            scrub: scrubValue,
          },
        });
      }

      // Bucket parallax (descends, smoother, extended range) - ALL DEVICES
      gsap.to(bucketRef.current, {
        y: () => `${window.innerHeight * bucketSpeed}px`,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: scrollRange,
          scrub: scrubValue,
        },
      });

      // Bucket fade/scale animation (appears from well cutout)
      gsap.fromTo(
        bucketRef.current,
        {
          opacity: 0,
          scale: 0.68,
          yPercent: -12,
        },
        {
          opacity: 1,
          scale: 1,
          yPercent: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 2.2,
          },
        }
      );

      // Title fade in with scroll control
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            opacity: 0,
            yPercent: 18,
          },
          {
            opacity: 1,
            yPercent: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "center center",
              scrub: 2.4,
            },
          }
        );
      }

      // Continuous bucket swing (all devices)
      const swingAngle = isMobile ? 1.2 : isTablet ? 1.7 : 2.1;
      const swingDuration = isMobile ? 4 : isTablet ? 3.6 : 3.2;

      gsap.fromTo(
        bucketRef.current,
        { rotation: -swingAngle },
        {
          rotation: swingAngle,
          transformOrigin: "50% 0%",
          duration: swingDuration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Set bucket initial position after mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isTablet = window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;
    const config = isMobile
      ? PARALLAX_CONFIG.deliver.mobile
      : isTablet
        ? PARALLAX_CONFIG.deliver.tablet
        : PARALLAX_CONFIG.deliver.desktop;
    setBucketInitialTop(`${config.bucketStart}px`);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="deliver"
      className="relative overflow-hidden bg-background"
      style={{
        minHeight: "100vh",
        height: "140vh",
        paddingTop: "clamp(3rem, 8vh, 6rem)",
        paddingBottom: "clamp(3rem, 8vh, 6rem)",
        paddingInline: "clamp(2rem, 5vw, 4rem)",
        zIndex: 10
      }}
    >
      {/* Background Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1] will-change-transform"
        aria-hidden
      >
        <Image
          src="/assets/parallax/section-deliver/parallax-bg-deliver.webp"
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
          top: bucketInitialTop,
          // 20% larger on mobile
          width: isMobile ? "min(108vw, 720px)" : "min(90vw, 600px)"
        }}
        aria-hidden
      >
        <Image
          src="/assets/parallax/section-deliver/parallax-bucket-deliver.webp"
          alt=""
          width={600}
          height={600}
          className="w-full h-auto drop-shadow-2xl"
          priority
        />
      </div>

      {/* Centered Title */}
      <div className="absolute inset-0 z-[45] flex items-center justify-center pointer-events-none">
        <h2
          ref={titleRef}
          className="text-center"
          style={{
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight: "900",
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          Deliver
        </h2>
      </div>

      {/* Foreground Cutout Layer */}
      <div
        ref={fgRef}
        className="pointer-events-none absolute left-0 right-0 z-[50] will-change-transform"
        style={{ top: "-5vh", height: "110%" }}
        aria-hidden
      >
        <Image
          src="/assets/parallax/section-deliver/parallax-foreground-deliver.webp"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}
