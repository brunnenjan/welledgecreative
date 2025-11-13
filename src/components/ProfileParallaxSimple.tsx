// src/components/ProfileParallaxSimple.tsx
"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE_CONFIG } from "../lib/profileConfig";
import { PARALLAX_CONFIG } from "@/config/parallaxSettings";

gsap.registerPlugin(ScrollTrigger);

const CONFIG = PROFILE_CONFIG;

export default function ProfileParallaxSimple() {
  const sectionRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useRef(false);
  const [bucketInitialTop, setBucketInitialTop] = useState('clamp(-15vh, -10vh, -8vh)');
  const [bucketWidth, setBucketWidth] = useState('min(90vw, 900px)');

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const bg = section.querySelector('[data-layer="bg"]');
    const bucket = section.querySelector('[data-layer="bucket"]');
    const fg = section.querySelector('[data-layer="fg"]');
    const bucketImg = section.querySelector<HTMLImageElement>(".profile-bucket-img");
    if (!bg || !bucket || !fg || !bucketImg) {
      return;
    }

    let ctx: gsap.Context | null = null;

    const initParallax = () => {
      // Set initial visibility immediately to prevent black flash
      gsap.set([bg, bucket, fg], { opacity: 1, visibility: "visible" });

      const isMobileCheck = window.matchMedia("(max-width: 768px)").matches;

      if (prefersReducedMotion.current) {
        gsap.set([bg, bucket, fg], { y: 0 });
        gsap.set(bucketImg, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // Bucket visible from start - scrolls down naturally, no pop-in
      gsap.set(bucketImg, { opacity: 1, y: 0, scale: 1 });

      // Arrow starts hidden
      if (CONFIG.showArrow && arrowRef.current) {
        gsap.set(arrowRef.current, { opacity: 0 });
      }

      ctx = gsap.context(() => {
        const isMobile = isMobileCheck;
        const isTablet = window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;

        // Get device-specific config for profile section
        const config = isMobile
          ? PARALLAX_CONFIG.profile.mobile
          : isTablet
            ? PARALLAX_CONFIG.profile.tablet
            : PARALLAX_CONFIG.profile.desktop;

        const { bgSpeed, fgSpeed, bucketSpeed } = config;

        // Background/Foreground parallax (desktop/tablet only)
        if (!isMobile) {
          // Background parallax (smoother, extended range)
          gsap.to(bg, {
            y: () => `${window.innerHeight * bgSpeed}px`,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "+=220%",
              scrub: 3.8,
            },
          });

          // Foreground parallax (moves up, smoother, extended range)
          gsap.to(fg, {
            y: () => `-${window.innerHeight * Math.abs(fgSpeed)}px`,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "+=220%",
              scrub: 3.8,
            },
          });
        }

        // Bucket parallax (descends, smoother, extended range) - ALL DEVICES
        gsap.to(bucket, {
          y: () => `${window.innerHeight * bucketSpeed}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "+=220%",
            scrub: 3.8,
          },
        });

        // Arrow fade in and out (desktop only)
        if (!isMobile && CONFIG.showArrow && arrowRef.current) {
          const arrow = arrowRef.current;
          const arrowTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "+=220%",
              scrub: 3.8,
            },
          });

          arrowTimeline.fromTo(
            arrow,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.2,
              ease: "none",
            },
            CONFIG.ARROW_FADE_IN_PROGRESS
          );

          arrowTimeline.to(
            arrow,
            {
              opacity: 0,
              duration: 0.22,
              ease: "none",
            },
            CONFIG.ARROW_FADE_OUT_PROGRESS
          );
        }

        // Continuous bucket swing (all devices)
        const swingAngle = isMobile ? 1.0 : isTablet ? 1.6 : 2.2;
        const swingDuration = isMobile ? 4 : isTablet ? 3.6 : 3.2;

        gsap.fromTo(
          bucketImg,
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
      }, section);
    };

    const images = Array.from(section.querySelectorAll("img"));
    const imagePromises = images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) return resolve();
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        })
    );

    let isMounted = true;

    Promise.allSettled(imagePromises).then(() => {
      if (!isMounted) return;
      initParallax();
    });

    return () => {
      isMounted = false;
      ctx?.revert();
    };
  }, []);

  // Set bucket initial position and size after mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches;
    const config = isMobile
      ? PARALLAX_CONFIG.profile.mobile
      : isTablet
        ? PARALLAX_CONFIG.profile.tablet
        : PARALLAX_CONFIG.profile.desktop;
    setBucketInitialTop(`${config.bucketStart}px`);
    if ("bucketWidth" in config) {
      const vwCap = isMobile ? 120 : isTablet ? 105 : 90;
      setBucketWidth(`min(${vwCap}vw, ${config.bucketWidth}px)`);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="profile"
      className="profile-section relative overflow-hidden profile-bucket bg-background"
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
        data-layer="bg"
        className="absolute inset-0 z-[1] will-change-transform"
        aria-hidden
      >
        <img
          src="/assets/parallax/section-profile/parallax-bg-profile-secondary.webp"
          alt=""
          className="w-full h-full object-cover"
          width={1536}
          height={1024}
          loading="lazy"
          decoding="async"
          style={{
            display: "block",
            objectPosition: "center 40%",
            transform: "translateY(-0.5px) scale(1.01)",
          }}
        />
      </div>

      {/* Bucket with Profile */}
      <div
        data-layer="bucket"
        className="absolute left-1/2 -translate-x-1/2 z-[40] will-change-transform pointer-events-none"
        style={{
          top: bucketInitialTop,
          width: bucketWidth
        }}
        aria-hidden
      >
        <Image
          src="/assets/parallax/section-profile/parallax-bucket-profile-alt.webp"
          alt="Profile bucket"
          className="profile-bucket-img w-full h-auto"
          width={1920}
          height={1080}
          priority
          quality={90}
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 50vw"
          style={{
            display: "block",
            pointerEvents: "none",
            transform: "translateZ(0)",
          }}
        />
      </div>

      {/* Foreground Cutout Overlay */}
      <div
        data-layer="fg"
        className="pointer-events-none absolute left-0 right-0 z-[50] will-change-transform"
        style={{ top: "-5vh", height: "110%" }}
        aria-hidden
      >
        <img
          src="/assets/parallax/section-profile/parallax-foreground-profile-secondary.webp"
          alt="Foreground cutout framing the profile section"
          className="w-full h-full object-cover"
          width={1920}
          height={2702}
          loading="lazy"
          decoding="async"
          style={{
            display: "block",
            transform: "translateY(-0.5px) scale(1.01)",
          }}
        />
      </div>

      {/* Arrow "Plan Your Project" CTA - Desktop: positioned to the left, Mobile: below bucket pointing up */}
      {CONFIG.showArrow && (
        <>
          {/* Desktop Arrow - Left positioned, pointing right */}
          <button
            type="button"
            ref={arrowRef}
            className="fixed left-[15%] pointer-events-auto hidden md:flex cursor-pointer bg-transparent border-none"
            style={{
              top: "48%",
              transform: "translateY(-50%)",
              zIndex: 9999,
              opacity: 0,
            }}
            onClick={() => {
              const contactSection = document.getElementById("contact-section");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            aria-label="Plan your project"
          >
            <div className="flex items-center gap-4 transition-transform hover:scale-105">
              <div className="text-[#f58222] text-3xl md:text-4xl font-bold tracking-wide drop-shadow-lg">
                Plan Your Project
              </div>
              <svg
                width="120"
                height="60"
                viewBox="0 0 120 60"
                className="drop-shadow-lg"
                aria-hidden="true"
              >
                <path
                  d="M 5 30 Q 60 15, 110 30"
                  stroke="#f58222"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 110 30 L 95 22 M 110 30 L 95 38"
                  stroke="#f58222"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </button>

          {/* Mobile Arrow - Centered below bucket, pointing up */}
          <button
            type="button"
            className="absolute left-1/2 -translate-x-1/2 pointer-events-auto flex md:hidden cursor-pointer bg-transparent border-none"
            style={{
              top: "65%",
              zIndex: 60,
            }}
            onClick={() => {
              const contactSection = document.getElementById("contact-section");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            aria-label="Plan your project"
          >
            <div className="flex flex-col items-center gap-2 transition-transform hover:scale-105">
              <svg
                width="60"
                height="80"
                viewBox="0 0 60 80"
                className="drop-shadow-lg"
                aria-hidden="true"
              >
                {/* Curved arrow pointing up */}
                <path
                  d="M 30 75 Q 30 40, 30 10"
                  stroke="#f58222"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Arrow head pointing up */}
                <path
                  d="M 30 10 L 20 25 M 30 10 L 40 25"
                  stroke="#f58222"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-[#f58222] text-2xl font-bold tracking-wide drop-shadow-lg">
                Plan Your Project
              </div>
            </div>
          </button>
        </>
      )}

    </section>
  );
}
