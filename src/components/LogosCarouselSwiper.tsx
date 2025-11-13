// src/components/LogosCarouselSwiper.tsx
"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { logos as logoData } from "@/app/data/logos";
import { LOGOS_CONFIG } from "@/lib/logosConfig";
import type { Swiper as SwiperType } from "swiper";

gsap.registerPlugin(ScrollTrigger);

const CONFIG = LOGOS_CONFIG;

export default function LogosCarouselSwiper() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const brandingsHighlightRef = useRef<HTMLSpanElement>(null);
  const brandingsTextRef = useRef<HTMLSpanElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const swiperInstanceRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // GSAP header animation
  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(brandingsHighlightRef.current, {
        scaleX: prefersReducedMotion ? 1 : 0,
        transformOrigin: "left",
        backgroundColor: "#f58222",
      });
      gsap.set(brandingsTextRef.current, { color: prefersReducedMotion ? "#ffffff" : "#1a1a1a" });

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: CONFIG.TRIGGER_START,
          end: CONFIG.TRIGGER_END,
          scrub: CONFIG.SCRUB,
          toggleActions: "play none none reverse",
        },
      });

      tl.from(headerRef.current, {
        opacity: 0,
        y: 30,
        duration: CONFIG.APPEAR_DURATION,
        ease: CONFIG.APPEAR_EASE,
      }, CONFIG.APPEAR_DELAY);

      const brandingsStart = CONFIG.HIGHLIGHT_START + CONFIG.HIGHLIGHT_DELAY_BETWEEN;

      const highlightTimeline = gsap.timeline({ paused: true });

      highlightTimeline.add("brandingsHighlight", brandingsStart);

      highlightTimeline.fromTo(
        brandingsHighlightRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: CONFIG.HIGHLIGHT_DURATION,
          ease: CONFIG.HIGHLIGHT_EASE,
        },
        "brandingsHighlight"
      );

      highlightTimeline.to(
        brandingsTextRef.current,
        {
          color: "#ffffff",
          duration: CONFIG.TEXT_COLOR_DURATION,
          ease: CONFIG.TEXT_COLOR_EASE,
        },
        `brandingsHighlight+=${CONFIG.HIGHLIGHT_DURATION * CONFIG.TEXT_COLOR_OFFSET}`
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: CONFIG.TRIGGER_START,
        end: CONFIG.TRIGGER_END,
        onEnter: () => highlightTimeline.play(),
        onEnterBack: () => highlightTimeline.play(),
        onLeaveBack: () => highlightTimeline.reverse(),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Initialize Swiper
  useEffect(() => {
    if (!swiperRef.current || prefersReducedMotion) return;

    // Dynamically load Swiper
    const loadSwiper = async () => {
      const Swiper = (await import('swiper')).default;
      const { Autoplay, FreeMode } = await import('swiper/modules');

      const swiper = new Swiper(swiperRef.current!, {
        modules: [Autoplay, FreeMode],
        loop: true,
        freeMode: {
          enabled: true,
          momentum: true,
          momentumRatio: 0.6,
          momentumVelocityRatio: 0.8,
        },
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 40,
        speed: 5000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        on: {
          touchStart: function(swiper) {
            if (swiper.autoplay) {
              swiper.autoplay.stop();
            }
          },
          touchEnd: function(swiper) {
            if (swiper.autoplay) {
              swiper.autoplay.start();
            }
          },
        },
      });

      swiperInstanceRef.current = swiper;
    };

    loadSwiper();

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="logos"
      className="logo-marquee relative z-[80] bg-white pt-12 md:pt-16 pb-20 md:pb-24"
      aria-labelledby="logos-title"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 md:mb-12 text-center">
          <h2
            ref={headerRef}
            id="logos-title"
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#1a1a1a" }}
          >
            <span className="inline-block align-middle">Logos &amp;</span>{" "}
            <span className="inline-block align-middle relative">
              <span ref={brandingsTextRef} className="relative z-10">Branding</span>
              <span
                ref={brandingsHighlightRef}
                className="absolute inset-0 bg-accent/80"
                style={{
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  zIndex: -1,
                  margin: "-0.08em -0.15em",
                  backgroundColor: "#f58222",
                }}
                aria-hidden="true"
              />
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#6a6a6a] max-w-2xl mx-auto">
            Identities crafted with my clients — each with its own story.
          </p>
        </div>

        <div
          ref={swiperRef}
          className="swiper logo-slider"
          role="region"
          aria-label="Client logos"
        >
          <div className="swiper-wrapper">
            {logoData.map((logo, index) => (
              <div key={`logo-${index}`} className="swiper-slide logo-slide">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  width={logo.width}
                  height={logo.height}
                  className="logo-marquee__image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
