"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FOOTER_PARALLAX_CONFIG } from "@/lib/footerConfig";
import { getParallaxMultiplier } from "@/lib/responsiveParallaxBudgets";


const CONFIG = FOOTER_PARALLAX_CONFIG;

export default function FooterParallax() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const bucketBaseWidth = CONFIG.footerBucketBaseWidth * CONFIG.footerBucketScale;
  const bucketWidthStyle = `min(${bucketBaseWidth}px, ${CONFIG.footerBucketMaxViewportRatio * 100}vw)`;
  const glowWidth = bucketBaseWidth * CONFIG.footerBucketGlowWidthRatio;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const foreground = foregroundRef.current;
    const bg = bgRef.current;
    const bucket = bucketRef.current;

    if (!wrapper || !foreground || !bg || !bucket) return;

    const images = [
      ...Array.from(foreground.querySelectorAll<HTMLImageElement>("img")),
      ...Array.from(bucket.querySelectorAll<HTMLImageElement>("img")),
    ];

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
      const bucketStart = CONFIG.footerBucketStartOffset;
      const bucketEnd = CONFIG.footerBucketEndOffset;
      const bucketSpeedFactor = CONFIG.footerBucketScrollSpeed ?? 1;
      const triggerStart = CONFIG.footerBucketTriggerStart ?? "top bottom";
      const triggerEnd = CONFIG.footerBucketTriggerEnd ?? "bottom top";

      gsap.set(foreground, { y: CONFIG.footerFgStartOffset });
      gsap.set(bg, { y: 0 });
      gsap.set(bucket, {
        y: bucketStart,
        opacity: CONFIG.footerBucketStartOpacity,
        rotation: -CONFIG.footerBucketSwing,
      });
      if (glowRef.current) {
        gsap.set(glowRef.current, { opacity: 0.28, scale: 0.92 });
      }

      if (prefersReducedMotion) {
        gsap.set(bucket, { rotation: 0, y: bucketStart, opacity: CONFIG.footerBucketEndOpacity });
        if (glowRef.current) {
          gsap.set(glowRef.current, { opacity: 0.38, scale: 0.95 });
        }
        return;
      }

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(
          {
            isMobile: "(max-width: 767px)",
            isTablet: "(min-width: 768px) and (max-width: 1023px)",
            isDesktop: "(min-width: 1024px)",
          },
          (context) => {
            const { isMobile, isTablet } = context.conditions as {
              isMobile: boolean;
              isTablet: boolean;
            };

            // Get responsive multipliers
            const bgMultiplier = getParallaxMultiplier(isMobile, isTablet, 'bg');
            const bucketMultiplier = getParallaxMultiplier(isMobile, isTablet, 'mid');
            const fgMultiplier = getParallaxMultiplier(isMobile, isTablet, 'fg');

            const baseTimeline = gsap.timeline({
              defaults: { ease: CONFIG.footerEase },
              scrollTrigger: {
                trigger: wrapper,
                start: triggerStart,
                end: triggerEnd,
                scrub: CONFIG.SCRUB,
                markers: CONFIG.showMarkers,
              },
            });

            baseTimeline.to(
              foreground,
              { y: CONFIG.footerFgYMax * fgMultiplier, duration: CONFIG.footerFgDuration },
              0
            );
            baseTimeline.to(
              bg,
              { y: CONFIG.footerBgDriftY * bgMultiplier, duration: CONFIG.footerBgDuration },
              0
            );

            const bucketDistance = bucketEnd - bucketStart;
            const glowEl = glowRef.current;

            // Bucket swing only on desktop, no rotation on tablet/mobile
            let swingTween: gsap.core.Tween | null = null;
            if (!isMobile && !isTablet) {
              swingTween = gsap.fromTo(
                bucket,
                { rotation: -CONFIG.footerBucketSwing, transformOrigin: "50% 8%" },
                {
                  rotation: CONFIG.footerBucketSwing,
                  duration: CONFIG.footerBucketSwingDur,
                  ease: "sine.inOut",
                  repeat: -1,
                  yoyo: true,
                }
              );
            }

            ScrollTrigger.create({
              trigger: wrapper,
              start: triggerStart,
              end: triggerEnd,
              scrub: CONFIG.SCRUB,
              markers: CONFIG.showMarkers,
              onUpdate: ({ progress }) => {
                const scaled = Math.min(progress * bucketSpeedFactor, 1);
                const newY = bucketStart + (bucketDistance * scaled * bucketMultiplier);
                const newOpacity = gsap.utils.interpolate(
                  CONFIG.footerBucketStartOpacity,
                  CONFIG.footerBucketEndOpacity,
                  scaled
                );
                gsap.set(bucket, { y: newY, opacity: newOpacity });
                if (glowEl) {
                  gsap.set(glowEl, {
                    opacity: 0.32,
                    scale: 0.94,
                  });
                }
              },
              onKill: () => swingTween?.kill(),
            });

            // Ensure swing tween persists (desktop only)
            swingTween?.play();
          }
        );
      }, wrapper);
    });

    return () => {
      ctx?.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={wrapperRef}
      className="footer-parallax absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 10 }}
    >
      <div
        ref={bgRef}
        className="footer-parallax__bg"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${CONFIG.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
          pointerEvents: "none",
          zIndex: 0,
          transform: "translate3d(0, 0, 0)",
        }}
      />
      <div
        ref={bucketRef}
        className="footer-parallax__bucket"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          className="footer-parallax__bucket-glow"
          ref={glowRef}
          style={{
            width: `${glowWidth}px`,
            height: `${CONFIG.footerBucketGlowHeight}px`,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
            filter: "blur(10px)",
            opacity: 0.38,
            transform: `translateY(${CONFIG.footerBucketGlowOffset}px)`,
          }}
        />
        <img
          src={CONFIG.footerBucketImage}
          alt="Illustrated bucket highlighting the footer contact section"
          loading="lazy"
          decoding="async"
          width={Math.round(bucketBaseWidth)}
          height={Math.round(bucketBaseWidth * 1.2)}
          style={{
            width: bucketWidthStyle,
            height: "auto",
            objectFit: "contain",
            pointerEvents: "none",
            filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.32))",
          }}
        />
      </div>
      <div
        ref={foregroundRef}
        className="footer-parallax__fg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 2,
          transform: `translate3d(0, ${CONFIG.footerFgStartOffset}px, 0)`,
        }}
      >
        <img
          src="/assets/parallax/section-contact/parallax-foreground-contact.webp"
          alt="Rocky well foreground framing the contact section"
          loading="lazy"
          decoding="async"
          width={1920}
          height={1728}
          style={{
            width: "100%",
            maxWidth: "1600px",
            height: "auto",
            transform: "translateY(-0.5px) scale(1.01)",
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
