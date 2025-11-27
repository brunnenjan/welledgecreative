"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PARALLAX_CONFIG } from "@/config/parallaxSettings";
import { getBackgroundSrc } from "@/utils/getBackgroundSrc";

gsap.registerPlugin(ScrollTrigger);

type CaseStudyParallaxCTAProps = {
  heading: string;
  paragraph: string;
  buttonText: string;
  href: string;
};

export default function CaseStudyParallaxCTA({ heading, paragraph, buttonText, href }: CaseStudyParallaxCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [bucketInitialTop, setBucketInitialTop] = useState("clamp(-15vh, -10vh, -8vh)");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [bgSrc, setBgSrc] = useState("/assets/parallax/section-design/parallax-bg-design.webp");

  // Detect viewport for responsive asset + sizing
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      const tablet = window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;
      setIsMobile(mobile);
      setIsTablet(tablet);
      setBgSrc(getBackgroundSrc("/assets/parallax/section-design/parallax-bg-design", mobile));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
      const isTabletViewport = window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;
      const config = isMobileViewport
        ? PARALLAX_CONFIG.deliver.mobile
        : isTabletViewport
          ? PARALLAX_CONFIG.deliver.tablet
          : PARALLAX_CONFIG.deliver.desktop;
      const { bgSpeed, fgSpeed, bucketSpeed } = config;
      const scrollRange = "+=200%";
      const scrubValue = 3.8;

      if (!isMobileViewport && bgRef.current) {
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
      }

      if (!isMobileViewport && fgRef.current) {
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

      if (bucketRef.current) {
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

        gsap.fromTo(
          bucketRef.current,
          { opacity: 0, scale: 0.68, yPercent: -12 },
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

        const swingAngle = isMobileViewport ? 1.2 : isTabletViewport ? 1.7 : 2.1;
        const swingDuration = isMobileViewport ? 4 : isTabletViewport ? 3.6 : 3.2;

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
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, yPercent: 18 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const tablet = window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;
    const config = mobile
      ? PARALLAX_CONFIG.deliver.mobile
      : tablet
        ? PARALLAX_CONFIG.deliver.tablet
        : PARALLAX_CONFIG.deliver.desktop;
    setBucketInitialTop(`${config.bucketStart}px`);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cs-cta relative overflow-hidden"
      style={{
        minHeight: "100vh",
        height: "140vh",
        paddingTop: "clamp(3rem, 8vh, 6rem)",
        paddingBottom: "clamp(3rem, 8vh, 6rem)",
        paddingInline: "clamp(1.5rem, 5vw, 3rem)",
        zIndex: 10,
      }}
    >
      <div ref={bgRef} className="cs-cta__layer cs-cta__bg" aria-hidden>
        <Image src={bgSrc} alt="" fill sizes="100vw" quality={100} className="object-cover" />
      </div>
      <div className="cs-cta__overlay" aria-hidden />
      <div
        ref={bucketRef}
        className="cs-cta__bucket"
        style={{
          top: bucketInitialTop,
          width: isMobile ? "min(108vw, 720px)" : isTablet ? "min(65vw, 450px)" : "min(90vw, 600px)",
        }}
        aria-hidden
      >
        <Image
          src="/assets/parallax/section-design/bucket-delivery.webp"
          alt=""
          width={600}
          height={600}
          loading="lazy"
          quality={100}
          sizes="(max-width: 768px) 70vw, 600px"
          className="w-full h-auto drop-shadow-2xl"
        />
      </div>
      <div ref={fgRef} className="cs-cta__layer cs-cta__fg" aria-hidden>
        <Image
          src="/assets/parallax/section-design/parallax-foreground-design.webp"
          alt=""
          fill
          sizes="100vw"
          quality={100}
          className="object-cover"
        />
      </div>
      <div ref={contentRef} className="cs-cta__content">
        <p className="cs-cta__eyebrow">Discovery Call</p>
        <h2 className="cs-cta__heading">{heading}</h2>
        <p className="cs-cta__paragraph">{paragraph}</p>
        {href.startsWith("http") ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="cs-cta__button">
            {buttonText}
          </a>
        ) : (
          <Link href={href} className="cs-cta__button">
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
