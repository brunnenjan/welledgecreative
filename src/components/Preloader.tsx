"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const LOADING_PHRASES = [
  "Filling buckets...",
  "Digging well...",
  "Loading projects...",
  "Search for clarity...",
];

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!preloaderRef.current || !iconRef.current) return;

    // Disable scroll during loading
    document.body.style.overflow = "hidden";

    // Define all critical images to preload
    const criticalImages = [
      // Hero section
      "/assets/parallax/section-hero/parallax-bg-hero.webp",
      "/assets/parallax/section-hero/parallax-bucket-hero.webp",
      "/assets/parallax/section-hero/parallax-foreground-hero-only-well.webp",
      // Profile section
      "/assets/parallax/section-profile/parallax-bg-profile-secondary.webp",
      "/assets/parallax/section-profile/parallax-bucket-profile-alt.webp",
      "/assets/parallax/section-profile/parallax-foreground-profile-secondary.webp",
      // Discover section
      "/assets/parallax/section-discover/parallax-bg-discover.webp",
      "/assets/parallax/section-discover/parallax-bucket-discover.webp",
      "/assets/parallax/section-discover/parallax-foreground-discover.webp",
      // Design section
      "/assets/parallax/section-design/parallax-bg-design.webp",
      "/assets/parallax/section-design/parallax-bucket-design.webp",
      "/assets/parallax/section-design/parallax-foreground-design.webp",
      // Deliver section
      "/assets/parallax/section-deliver/parallax-bg-deliver.webp",
      "/assets/parallax/section-deliver/parallax-bucket-deliver.webp",
      "/assets/parallax/section-deliver/parallax-foreground-deliver.webp",
    ];

    // Create promises for all image loads
    const imagePromises = criticalImages.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve even on error to not block loading
          img.src = src;
        })
    );

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Icon animations - gentle pulse only, no rotation
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1.05,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Progress bar animation - faster initial fill
      if (progressFillRef.current) {
        tl.to(progressFillRef.current, {
          width: "90%",
          duration: 2,
          ease: "power2.inOut",
        });
      }

      // Text rotation
      const textInterval = setInterval(() => {
        setCurrentPhrase((prev) => (prev + 1) % LOADING_PHRASES.length);
      }, 1000);

      // Wait for all critical images to load
      Promise.all(imagePromises).then(() => {
        // Complete progress bar fill
        if (progressFillRef.current) {
          gsap.to(progressFillRef.current, {
            width: "100%",
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              clearInterval(textInterval);

              // Hide loading elements (icon, text, progress bar)
              const fadeOutElements = [iconRef.current, textRef.current, progressBarRef.current];
              gsap.to(fadeOutElements, {
                opacity: 0,
                duration: 0.4,
                ease: "power2.out",
              });

              // Show full logo
              if (logoTextRef.current) {
                gsap.to(logoTextRef.current, {
                  opacity: 1,
                  scale: 1,
                  duration: 0.6,
                  ease: "power2.out",
                  delay: 0.2,
                });
              }

              // Wait a bit, then fade out entire preloader
              gsap.delayedCall(1.2, () => {
                if (preloaderRef.current) {
                  gsap.to(preloaderRef.current, {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: () => {
                      setIsLoading(false);
                      document.body.style.overflow = "";
                    },
                  });
                }
              });
            },
          });
        }
      });

      return () => {
        clearInterval(textInterval);
      };
    }, preloaderRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  // Fade in/out text animation
  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [currentPhrase]);

  if (!isLoading) return null;

  return (
    <div
      ref={preloaderRef}
      id="preloader"
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--color-white)",
        zIndex: "var(--z-preloader)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-8)",
      }}
    >
      {/* Logo Icon - Spinning & Pulsing */}
      <div
        ref={iconRef}
        id="logo-icon"
        style={{
          width: "clamp(80px, 15vw, 120px)",
          height: "clamp(80px, 15vw, 120px)",
          position: "relative",
        }}
      >
        <Image
          src="/assets/logo/Icon-logo-well-edge-creative.svg"
          alt="Well Edge Creative Logo"
          fill
          priority
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Loading Text */}
      <p
        ref={textRef}
        style={{
          fontSize: "var(--text-lg)",
          fontWeight: 600,
          color: "var(--color-text-secondary)",
          letterSpacing: "0.05em",
          textAlign: "center",
        }}
      >
        {LOADING_PHRASES[currentPhrase]}
      </p>

      {/* Progress Bar */}
      <div
        ref={progressBarRef}
        style={{
          width: "clamp(200px, 50vw, 300px)",
          height: "4px",
          background: "var(--color-gray-200)",
          borderRadius: "var(--radius-full)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          ref={progressFillRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "0%",
            background: `linear-gradient(90deg, var(--color-accent-hover), var(--color-accent))`,
            borderRadius: "var(--radius-full)",
          }}
        />
      </div>

      {/* Full Logo - Hidden initially, revealed on completion */}
      <div
        ref={logoTextRef}
        id="logo-text"
        style={{
          opacity: 0,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0.95)",
          width: "clamp(220px, 40vw, 380px)",
          height: "auto",
        }}
      >
        <Image
          src="/assets/logo/well-edge-logo.webp"
          alt="Well Edge Creative"
          width={420}
          height={160}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}
