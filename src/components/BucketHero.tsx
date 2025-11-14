// src/components/BucketHero.tsx
"use client";

import { useLayoutEffect, useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_CONFIG } from "@/lib/heroConfig";
import { PARALLAX_CONFIG } from "@/config/parallaxSettings";
import { smoothScrollTo } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

const CONFIG = HERO_CONFIG;

export default function BucketHero() {
  const heroRef   = useRef<HTMLElement>(null);
  const pinRef    = useRef<HTMLDivElement>(null);
  const bgRef     = useRef<HTMLDivElement>(null);
  const fgRef     = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);
  const whitePanelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const swingTweenRef = useRef<gsap.core.Tween | null>(null);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [bucketInitialTop, setBucketInitialTop] = useState('-14vh');
  const [foregroundSrc, setForegroundSrc] = useState("/assets/hero/hero-foreground-desktop.webp");
  const [backgroundSrc, setBackgroundSrc] = useState("/assets/hero/hero-background.webp");
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef<number | null>(null);

  const handleForegroundFallback = useCallback(() => {
    setForegroundSrc((prev) => (prev === "/assets/hero/hero-foreground-desktop.webp" ? prev : "/assets/hero/hero-foreground-desktop.webp"));
  }, []);

  const handleBackgroundFallback = useCallback(() => {
    setBackgroundSrc((prev) => (prev === "/assets/hero/hero-background.webp" ? prev : "/assets/hero/hero-background.webp"));
  }, []);

  useLayoutEffect(() => {
    if (!heroRef.current || !pinRef.current || !bgRef.current || !fgRef.current || !bucketRef.current) {
      return;
    }

    const pinEl = pinRef.current;

    let ctx: gsap.Context | null = null;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ready = async () => {
      const imgs = [bgRef.current, fgRef.current]
        .map((ref) => Array.from(ref!.querySelectorAll("img")))
        .flat();

      await Promise.allSettled(
        imgs.map(
          (img) =>
            new Promise<void>((resolve) => {
              const el = img as HTMLImageElement;
              if (el.complete) {
                return resolve();
              }
              el.addEventListener("load", () => resolve(), { once: true });
              el.addEventListener("error", () => resolve(), { once: true });
            })
        )
      );
    };

    (async () => {
      await ready();

      ctx = gsap.context(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const isTablet = window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;

        // Ensure deterministic starting state
        gsap.set(bucketRef.current, { y: 0 });
        gsap.set(bgRef.current, { y: 0, xPercent: -50, x: 0 });
        gsap.set(fgRef.current, { y: 0, xPercent: -50, x: 0 });
        if (whiteOverlayRef.current) {
          gsap.set(whiteOverlayRef.current, { opacity: 0 });
        }
        if (whitePanelRef.current) {
          gsap.set(whitePanelRef.current, { opacity: 0, scaleY: 0, transformOrigin: "50% 0%" });
        }

        if (prefersReducedMotion) {
          return;
        }

        // Get device-specific config
        const config = isMobile
          ? PARALLAX_CONFIG.hero.mobile
          : isTablet
            ? PARALLAX_CONFIG.hero.tablet
            : PARALLAX_CONFIG.hero.desktop;

        const {
          bucketSpeed,
          bgSpeed,
          fgSpeed,
          bucketDropMultiplier = 1.8,
          pinMultiplier = 1.7,
          holdMultiplier = 2,
          scrub = 5.5,
          swingAngle = 1.1,
        } = config;

        const totalMultiplier = Math.max(0.1, pinMultiplier + holdMultiplier);
        const scrollDistance = () => window.innerHeight * totalMultiplier;
        const bucketDrop = () => window.innerHeight * bucketSpeed * bucketDropMultiplier;
        const scrubValue = scrub ?? 5.5;
        const timelineScrub = Math.min(1.25, Math.max(0.35, scrubValue * 0.2));

        const makeScrollTriggerConfig = () => ({
          trigger: heroRef.current,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          scrub: scrubValue,
          invalidateOnRefresh: true,
        });

        const resetHeroScene = () => {
          const timeline = timelineRef.current;
          const trigger = scrollTriggerRef.current;

          const overlayTargets = [
            whiteOverlayRef.current,
            whitePanelRef.current,
            contentRef.current,
          ].filter((node): node is HTMLDivElement => node instanceof HTMLElement);

          if (overlayTargets.length) {
            gsap.killTweensOf(overlayTargets);
          }

          if (whiteOverlayRef.current) {
            gsap.set(whiteOverlayRef.current, { opacity: 0 });
          }
          if (whitePanelRef.current) {
            gsap.set(whitePanelRef.current, { opacity: 0, scaleY: 0 });
          }
          if (contentRef.current) {
            gsap.set(contentRef.current, { opacity: 1 });
          }
          if (bucketRef.current) {
            gsap.set(bucketRef.current, { y: 0 });
          }
          if (bgRef.current) {
            gsap.set(bgRef.current, { y: 0, xPercent: -50, x: 0 });
          }
          if (fgRef.current) {
            gsap.set(fgRef.current, { y: 0, xPercent: -50, x: 0 });
          }

          if (timeline) {
            timeline.pause(0).progress(0);
          }

          trigger?.update();

          if (pinEl) {
            pinEl.style.visibility = "visible";
          }

          // Ensure bucket swing resumes after reset
          swingTweenRef.current?.resume();
        };

        const showPinned = () => {
          if (pinEl) {
            pinEl.style.visibility = "visible";
          }
        };

        const hidePinned = () => {
          if (pinEl) {
            pinEl.style.visibility = "hidden";
          }
        };

        // Mobile: simpler, no pinning
        const scrollTriggerOptions = isMobile
          ? {
              trigger: heroRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 1.5}`,
              scrub: 1,
              invalidateOnRefresh: true,
            }
          : {
              ...makeScrollTriggerConfig(),
              scrub: timelineScrub,
              pin: pinRef.current,
              pinSpacing: true,
              anticipatePin: 1,
              fastScrollEnd: true,
              onEnter: showPinned,
              onEnterBack: showPinned,
              onLeave: hidePinned,
              onLeaveBack: () => {
                showPinned();
                resetHeroScene();
              },
            };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: scrollTriggerOptions,
        });

        timelineRef.current = tl;
        scrollTriggerRef.current = tl.scrollTrigger ?? null;

        if (bucketRef.current) {
          // Mobile: simpler, shorter bucket drop
          const bucketDistance = isMobile
            ? () => window.innerHeight * 0.6
            : () => bucketDrop();

          tl.to(
            bucketRef.current,
            {
              y: bucketDistance,
              ease: "power1.inOut",
              duration: 1,
            },
            0
          );
        }

        if (whiteOverlayRef.current) {
          tl.to(
            whiteOverlayRef.current,
            { opacity: 1, ease: "sine.inOut", duration: 0.45 },
            0
          );
        }

        if (contentRef.current) {
          tl.to(
            contentRef.current,
            { opacity: 0, ease: "power2.out", duration: 0.5 },
            0.18
          );
        }

        // White panel animation (desktop/tablet only - mobile doesn't need the hold)
        if (!isMobile && whitePanelRef.current) {
          tl.to(
            whitePanelRef.current,
            { opacity: 1, ease: "sine.inOut", duration: 0.35 },
            0.35
          );
          tl.to(
            whitePanelRef.current,
            { scaleY: 1, ease: "none", duration: holdMultiplier },
            0.35
          );
        }

        // Parallax animations for background and foreground (desktop/tablet only)
        if (!isMobile) {
          gsap.to(bgRef.current, {
            y: () => window.innerHeight * bgSpeed,
            ease: "none",
            scrollTrigger: makeScrollTriggerConfig(),
          });

          gsap.to(fgRef.current, {
            y: () => -window.innerHeight * Math.abs(fgSpeed),
            ease: "none",
            scrollTrigger: makeScrollTriggerConfig(),
          });
        }

        // Bucket swing animation
        const swingDuration = isMobile ? 4 : isTablet ? 3.6 : 3.4;
        const swingAngleAdjusted = isMobile ? 0.8 : swingAngle;

        swingTweenRef.current = gsap.fromTo(
          bucketRef.current,
          { rotation: -swingAngleAdjusted },
          {
            rotation: swingAngleAdjusted,
            transformOrigin: "50% 0%",
            duration: swingDuration,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            repeatDelay: 0,
            yoyoEase: "sine.inOut",
          }
        );

        if (typeof window !== "undefined") {
          const heroDebug = window as unknown as Record<string, unknown>;
          heroDebug.__heroTimeline = tl;
          heroDebug.__heroReset = () => resetHeroScene();
        }
      }, heroRef);

      ScrollTrigger.refresh();
    })();

    const handleLoad = () => {
      ScrollTrigger.refresh(true);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      ctx?.revert();
      window.removeEventListener("load", handleLoad);
      timelineRef.current = null;
      scrollTriggerRef.current = null;
      swingTweenRef.current?.kill();
      swingTweenRef.current = null;
      if (pinEl) {
        pinEl.style.visibility = "";
      }
      if (typeof window !== "undefined") {
        const heroDebug = window as unknown as Record<string, unknown>;
        delete heroDebug.__heroTimeline;
        delete heroDebug.__heroReset;
      }
    };
  }, []);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Detect mobile for fixed positioning
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    if (isTouchDevice || !bgRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize to -1 to 1 range
      mouseX.current = (clientX / innerWidth - 0.5) * 2;
      mouseY.current = (clientY / innerHeight - 0.5) * 2;
    };

    const maxOffsetX = CONFIG.MOUSE_MAX_OFFSET_X ?? window.innerWidth * CONFIG.MOUSE_INTENSITY;
    const maxOffsetY = CONFIG.MOUSE_MAX_OFFSET_Y ?? window.innerHeight * CONFIG.MOUSE_INTENSITY;

    const animate = () => {
      const targetX = mouseX.current * maxOffsetX;
      const targetY = mouseY.current * maxOffsetY;

      currentX.current += (targetX - currentX.current) * CONFIG.MOUSE_EASE;
      currentY.current += (targetY - currentY.current) * CONFIG.MOUSE_EASE;

      if (bgRef.current) {
        gsap.set(bgRef.current, {
          x: currentX.current,
          y: currentY.current,
        });
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isTouchDevice]);

  // Set bucket initial position after mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isTablet = window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;
    const config = isMobile
      ? PARALLAX_CONFIG.hero.mobile
      : isTablet
        ? PARALLAX_CONFIG.hero.tablet
        : PARALLAX_CONFIG.hero.desktop;
    setBucketInitialTop(`${config.bucketStart}px`);
  }, []);

  // Set responsive foreground/background image sources
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateAssetSources = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const isTablet = window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;

      const fgSrc = isMobile
        ? "/assets/hero/hero-foreground-mobile.webp"
        : isTablet
          ? "/assets/hero/hero-foreground-tablet.webp"
          : "/assets/hero/hero-foreground-desktop.webp"; // Desktop

      const bgSrc = isMobile
        ? "/assets/hero/hero-background.webp"
        : isTablet
          ? "/assets/hero/hero-background.webp"
          : "/assets/hero/hero-background.webp";

      setForegroundSrc(fgSrc);
      setBackgroundSrc(bgSrc);
    };

    updateAssetSources();
    window.addEventListener('resize', updateAssetSources);

    return () => {
      window.removeEventListener('resize', updateAssetSources);
    };
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        id="hero"
        className="relative overflow-hidden bg-background"
        style={{
          minHeight: "100svh",
          height: isMobile ? "100vh" : "200vh",
          zIndex: isMobile ? 1 : 'auto'
        }}
      >
        <div ref={pinRef} className="relative h-full w-full will-change-transform">
        {/* Background Layer - stays fixed during pin */}
        <div
          ref={bgRef}
          className="hero-layer hero-layer--bg"
          aria-hidden
        >
          <Image
            key={backgroundSrc}
            src={backgroundSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-asset-image"
            onError={handleBackgroundFallback}
          />
        </div>

        {/* Text Content + Buttons - positioned in first 100vh */}
        <div className="absolute left-0 right-0 z-20 grid place-items-center text-center px-6" style={{ top: 0, height: '100vh', paddingTop: isMobile ? '2vh' : '0' }}>
          <div ref={contentRef} className="max-w-3xl flex flex-col items-center gap-4 sm:gap-5">
            <Image
              src="/assets/logo/well-edge-logo-retina.webp"
              alt="Well Edge Creative"
              width={420}
              height={160}
              priority
              className="w-auto max-w-[220px] sm:max-w-[240px] md:max-w-[320px] h-auto"
            />
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mt-6 sm:mt-6 md:mt-0">
              <span style={{ color: '#f58222' }}>Branding &amp; Web Design</span>{" "}
              <span className="text-white">that tells your story.</span>
            </h1>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed">
              I help founders build brands that connect with the right people.
            </p>
            <div className="mt-6 flex flex-row gap-3 items-center justify-center">
              <a
                href="#selected-projects"
                className="btn btn-primary min-w-[130px] sm:min-w-[200px] text-xs sm:text-base px-4 sm:px-6"
                onClick={(event) => {
                  event.preventDefault();
                  smoothScrollTo("selected-projects");
                }}
              >
                See my work
              </a>
              <a
                href="https://calendly.com/well-edge-creative/30min"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary min-w-[130px] sm:min-w-[200px] text-xs sm:text-base px-4 sm:px-6"
              >
                Book a call
              </a>
            </div>
            <button
              type="button"
              className="group mt-10 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.4em] text-white/80"
              onClick={() => {
                const target = document.getElementById("design-strategy");
                if (!target) return;
                smoothScrollTo(target, { block: "start" });
              }}
              aria-label="Scroll to explore"
            >
              <span className="group-hover:text-white transition-colors">Scroll to explore</span>
              <span className="hero-scroll-cue" aria-hidden="true">
                <span className="hero-scroll-dot" />
              </span>
            </button>
          </div>
        </div>

        {/* Bucket & Rope Layer - descends during pin */}
        <div
          ref={bucketRef}
          className={`absolute left-1/2 -translate-x-1/2 pointer-events-none will-change-transform ${isMobile ? 'z-[2]' : 'z-40'}`}
          style={{ top: bucketInitialTop, width: "max-content" }}
          aria-hidden
        >
          <Image
            src="/assets/hero/hero-bucket.webp"
            alt="Illustrated wooden bucket descending into the hero well"
            width={0}
            height={0}
            sizes="100vw"
            style={{ height: "clamp(420px, 80vh, 1000px)", width: "auto", display: "block" }}
            priority
          />
        </div>

        {/* Foreground Cutout Overlay - stays fixed during pin, full width at top, responsive */}
        <div
          ref={fgRef}
          className="hero-layer hero-layer--fg"
          aria-hidden
        >
          <Image
            key={foregroundSrc}
            src={foregroundSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-asset-image"
            onError={handleForegroundFallback}
          />
        </div>

        {/* Expanding white panel - extends the blank transition hold */}
        <div
          ref={whitePanelRef}
          className="pointer-events-none absolute left-0 right-0 top-0 z-[60] h-[200vh] origin-top will-change-transform"
          style={{
            background: "linear-gradient(to bottom, #ffffff 0%, #ffffff 45%, rgba(255,255,255,0.95) 70%, rgba(255,255,255,0.85) 100%)",
            opacity: 0,
            transform: "scaleY(0)",
            transformOrigin: "50% 0%",
          }}
          aria-hidden
        />
        {/* White overlay gradient fade for smooth transition (all devices) */}
        <div
          ref={whiteOverlayRef}
          className="pointer-events-none absolute inset-0 z-[70] will-change-transform"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 70%, rgba(255,255,255,1) 100%)",
            opacity: 0,
          }}
          aria-hidden
        />
      </div>
    </section>

    <style jsx>{`
      .hero-scroll-cue {
        display: inline-flex;
        align-items: flex-start;
        justify-content: center;
        width: 18px;
        height: 34px;
        border: 1.5px solid rgba(255, 255, 255, 0.45);
        border-radius: 9999px;
        padding: 5px 0;
        position: relative;
        overflow: hidden;
      }
      .hero-scroll-dot {
        width: 4px;
        height: 4px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.75);
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        animation: hero-dot-slide 1.6s ease-in-out infinite;
      }
      @keyframes hero-dot-slide {
        0% {
          opacity: 0;
          transform: translate(-50%, 0px);
        }
        20% {
          opacity: 1;
        }
        80% {
          opacity: 1;
          transform: translate(-50%, 16px);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, 22px);
        }
      }
    `}</style>
  </>
  );
}
