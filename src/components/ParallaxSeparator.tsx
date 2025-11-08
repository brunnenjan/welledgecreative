"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_START = "top 130%";
const DEFAULT_END = "bottom top";
const HERO_FOLLOW_START = "top 125%";

type SeparatorConfig = {
  // Desktop values
  BG_SPEED: number;
  FG_SPEED: number;
  BUCKET_SPEED: number;
  SCRUB: number;
  SECTION_HEIGHT: string;
  BG_TOP: string;
  BG_HEIGHT: string;
  BUCKET_TOP: string;
  BUCKET_HEIGHT: string;
  FG_TOP: string;
  FG_MIN_HEIGHT: string;
  FG_FILL_TOP: string;
  FG_FILL_HEIGHT: string;

  // Mobile positioning (px or vh)
  BG_TOP_MOBILE?: string;
  FG_TOP_MOBILE?: string;
  BUCKET_TOP_MOBILE?: string;

  // Mobile Y-offset (vertical adjustment in vh or px)
  BG_OFFSET_Y_MOBILE?: string;   // Usually "0vh" (static)
  FG_OFFSET_Y_MOBILE?: string;   // Usually "0vh" (static mask)
  BUCKET_OFFSET_Y_MOBILE?: string; // Vertical drift amount (e.g., "6vh")

  // Mobile scaling (for crispness/coverage)
  BG_SCALE_MOBILE?: number;  // e.g., 1.2 = 120%
  FG_SCALE_MOBILE?: number;
  BUCKET_SCALE_MOBILE?: number;

  // Mobile parallax depth (0 = static, 0.5 = half speed, etc.)
  // DEPRECATED: Use OFFSET_Y_MOBILE instead for new mobile approach
  BG_DEPTH_MOBILE?: number;
  FG_DEPTH_MOBILE?: number;
  BUCKET_DEPTH_MOBILE?: number;

  // Mobile z-index overrides
  Z_BG_MOBILE?: number;
  Z_FG_MOBILE?: number;
  Z_BUCKET_MOBILE?: number;

  // Mobile-specific assets (optional, falls back to desktop assets)
  BG_IMAGE_MOBILE?: string;
  FG_IMAGE_MOBILE?: string;
  BUCKET_IMAGE_MOBILE?: string;

  // Existing optional fields
  BUCKET_FADE_IN_START?: number;
  BUCKET_FADE_IN_END?: number;
  TRIGGER_START?: string;
  TRIGGER_END?: string;
  HERO_START?: string;
  showMarkers: boolean;
};

type ParallaxSeparatorProps = {
  id: string;
  backgroundImage: string;
  bucketImage: string;
  foregroundImage: string;
  // Mobile-specific images (optional, falls back to desktop images)
  backgroundImageMobile?: string;
  bucketImageMobile?: string;
  foregroundImageMobile?: string;
  config: SeparatorConfig;
  isFirstAfterHero?: boolean;
};

export default function ParallaxSeparator({
  id,
  backgroundImage,
  bucketImage,
  foregroundImage,
  backgroundImageMobile,
  bucketImageMobile,
  foregroundImageMobile,
  config,
  isFirstAfterHero = false,
}: ParallaxSeparatorProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Detect breakpoint
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width <= 767) {
        setBreakpoint('mobile');
      } else if (width <= 1023) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const bucket = bucketRef.current;
    const fg = fgRef.current;

    if (!section || !bg || !bucket || !fg) return;

    const bucketImg = bucket.querySelector("img");
    const images = [bg, bucket, fg].flatMap((ref) =>
      Array.from(ref.querySelectorAll("img"))
    );

    const imagePromises = images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) return resolve();
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        })
    );

    let ctx: gsap.Context | null = null;

    Promise.allSettled(imagePromises).then(() => {
      gsap.set([bg, bucket, fg], { opacity: 1, visibility: "visible" });

      if (prefersReducedMotion) {
        gsap.set([bg, bucket, fg], { y: 0 });
        if (bucketImg) {
          gsap.set(bucketImg, { opacity: 1, y: 0 });
        }
        return;
      }

      if (bucketImg) {
        const hasFadeIn =
          config.BUCKET_FADE_IN_START !== undefined &&
          config.BUCKET_FADE_IN_END !== undefined;
        gsap.set(bucketImg, {
          opacity: hasFadeIn ? 0 : 1,
          y: 0,
        });
      }

      gsap.set(section, { opacity: 1 });

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(
          {
            isMobile: "(max-width: 767px)",
            isTablet: "(min-width: 768px) and (max-width: 1023px)",
            isDesktop: "(min-width: 1024px)",
          },
          (context) => {
            const { isMobile } = context.conditions as {
              isMobile: boolean;
              isTablet: boolean;
              isDesktop: boolean;
            };

            // Mobile: Use simplified 3-layer centered stack
            if (isMobile) {
              // Parse offset values (default to "0vh" if not specified)
              const bgOffsetY = config.BG_OFFSET_Y_MOBILE ?? "0vh";
              const fgOffsetY = config.FG_OFFSET_Y_MOBILE ?? "0vh";
              const bucketOffsetY = config.BUCKET_OFFSET_Y_MOBILE ?? "6vh";

              const timeline = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: section,
                  start: isFirstAfterHero
                    ? config.HERO_START ?? config.TRIGGER_START ?? HERO_FOLLOW_START
                    : config.TRIGGER_START ?? DEFAULT_START,
                  end: config.TRIGGER_END ?? DEFAULT_END,
                  scrub: config.SCRUB,
                  markers: config.showMarkers,
                },
              });

              // BG: static (no movement)
              if (parseFloat(bgOffsetY) !== 0) {
                timeline.to(bg, { y: bgOffsetY, duration: 1 }, 0);
              }

              // Bucket: minimal drift only
              if (parseFloat(bucketOffsetY) !== 0) {
                timeline.to(bucket, { y: bucketOffsetY, duration: 1 }, 0);
              }

              // FG: static mask (no movement)
              if (parseFloat(fgOffsetY) !== 0) {
                timeline.to(fg, { y: fgOffsetY, duration: 1 }, 0);
              }

              // Bucket fade-in if configured
              if (
                bucketImg &&
                config.BUCKET_FADE_IN_START !== undefined &&
                config.BUCKET_FADE_IN_END !== undefined
              ) {
                timeline.fromTo(
                  bucketImg,
                  { opacity: 0 },
                  {
                    opacity: 1,
                    duration: config.BUCKET_FADE_IN_END - config.BUCKET_FADE_IN_START,
                    ease: "power1.out",
                  },
                  config.BUCKET_FADE_IN_START
                );
              }
            }
            // Desktop: Keep existing parallax (unchanged)
            else {
              const timeline = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: section,
                  start: isFirstAfterHero
                    ? config.HERO_START ?? config.TRIGGER_START ?? HERO_FOLLOW_START
                    : config.TRIGGER_START ?? DEFAULT_START,
                  end: config.TRIGGER_END ?? DEFAULT_END,
                  scrub: config.SCRUB,
                  markers: config.showMarkers,
                },
              });

              // Desktop: Full parallax movement
              timeline.to(
                bg,
                { y: config.BG_SPEED, duration: 1 },
                0
              );

              timeline.to(
                bucket,
                { y: config.BUCKET_SPEED, duration: 1 },
                0
              );

              timeline.to(
                fg,
                { y: config.FG_SPEED, duration: 1 },
                0
              );

              // Bucket fade-in if configured
              if (
                bucketImg &&
                config.BUCKET_FADE_IN_START !== undefined &&
                config.BUCKET_FADE_IN_END !== undefined
              ) {
                timeline.fromTo(
                  bucketImg,
                  { opacity: 0 },
                  {
                    opacity: 1,
                    duration: config.BUCKET_FADE_IN_END - config.BUCKET_FADE_IN_START,
                    ease: "power1.out",
                  },
                  config.BUCKET_FADE_IN_START
                );
              }
            }

            ScrollTrigger.refresh();
          }
        );
      }, section);
    });

    return () => {
      ctx?.revert();
    };
  }, [prefersReducedMotion, isFirstAfterHero, config, breakpoint]);

  // Responsive values based on current breakpoint
  const isMobile = breakpoint === 'mobile';

  // Position values (mobile first, then tablet, then desktop fallback)
  const bgTop = isMobile && config.BG_TOP_MOBILE ? config.BG_TOP_MOBILE : config.BG_TOP;
  const bucketTop = isMobile && config.BUCKET_TOP_MOBILE ? config.BUCKET_TOP_MOBILE : config.BUCKET_TOP;
  const fgTop = isMobile && config.FG_TOP_MOBILE ? config.FG_TOP_MOBILE : config.FG_TOP;

  // Scale values (default to 1 if not specified)
  const bgScale = isMobile && config.BG_SCALE_MOBILE ? config.BG_SCALE_MOBILE : 1;
  const bucketScale = isMobile && config.BUCKET_SCALE_MOBILE ? config.BUCKET_SCALE_MOBILE : 1;
  const fgScale = isMobile && config.FG_SCALE_MOBILE ? config.FG_SCALE_MOBILE : 1;

  // Z-index values (use mobile overrides if provided)
  const bgZIndex = isMobile && config.Z_BG_MOBILE !== undefined ? config.Z_BG_MOBILE : 10;
  const bucketZIndex = isMobile && config.Z_BUCKET_MOBILE !== undefined ? config.Z_BUCKET_MOBILE : 40;
  const fgZIndex = isMobile && config.Z_FG_MOBILE !== undefined ? config.Z_FG_MOBILE : 50;

  // Art-directed images (mobile-specific or fallback to desktop)
  const bgImageSrc = isMobile && backgroundImageMobile ? backgroundImageMobile : backgroundImage;
  const bucketImageSrc = isMobile && bucketImageMobile ? bucketImageMobile : bucketImage;
  const fgImageSrc = isMobile && foregroundImageMobile ? foregroundImageMobile : foregroundImage;

  // Mobile: centered positioning for all layers
  return (
    <section
      ref={sectionRef}
      id={id}
      className="parallax-separator"
      style={{
        minHeight: config.SECTION_HEIGHT,
        "--parallax-bg-speed": `${config.BG_SPEED}`,
        "--parallax-fg-speed": `${config.FG_SPEED}`,
        "--parallax-bucket-speed": `${config.BUCKET_SPEED}`,
        "--separator-bucket-top": bucketTop,
        "--separator-bucket-top-mobile": bucketTop,
        position: "relative",
        isolation: "isolate",
      } as CSSProperties}
      aria-hidden="true"
    >
      <div className="parallax-separator__container" style={{ position: "relative", overflow: "hidden" }}>
        <div
          ref={bgRef}
          className="parallax-separator__layer parallax-separator__bg"
          style={{
            top: bgTop,
            height: config.BG_HEIGHT,
            zIndex: bgZIndex,
            ...(isMobile ? {
              left: "50%",
              transform: `translateX(-50%) scale(${bgScale})`,
              transformOrigin: "center top",
            } : {
              transform: bgScale !== 1 ? `scale(${bgScale})` : undefined,
              transformOrigin: "center top",
            }),
          }}
        >
          <img
            src={bgImageSrc}
            alt="Layered parallax background illustration"
            className="parallax-separator__image parallax-separator__image--bg"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div
          ref={bucketRef}
          className="parallax-separator__layer parallax-separator__bucket"
          style={{
            height: config.BUCKET_HEIGHT,
            top: bucketTop,
            zIndex: bucketZIndex,
            ...(isMobile ? {
              left: "50%",
              transform: `translateX(-50%) scale(${bucketScale})`,
              transformOrigin: "center top",
            } : {
              transform: bucketScale !== 1 ? `scale(${bucketScale})` : undefined,
              transformOrigin: "center top",
            }),
          }}
        >
          <img
            src={bucketImageSrc}
            alt="Suspended bucket illustration"
            className="parallax-separator__image parallax-separator__image--bucket profile-bucket-img"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div
          ref={fgRef}
          className="parallax-separator__layer parallax-separator__fg"
          style={{
            top: fgTop,
            minHeight: config.FG_MIN_HEIGHT,
            zIndex: fgZIndex,
            ...(isMobile ? {
              left: "50%",
              transform: `translateX(-50%) scale(${fgScale})`,
              transformOrigin: "center top",
            } : {
              transform: fgScale !== 1 ? `scale(${fgScale})` : undefined,
              transformOrigin: "center top",
            }),
          }}
        >
          <img
            src={fgImageSrc}
            alt="Foreground cutout framing the transition"
            className="parallax-separator__image parallax-separator__image--fg"
            loading="lazy"
            decoding="async"
          />
          {parseFloat(config.FG_FILL_HEIGHT) > 0 && (
            <div
              className="parallax-separator__fg-fill"
              style={{ top: config.FG_FILL_TOP, height: config.FG_FILL_HEIGHT }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
