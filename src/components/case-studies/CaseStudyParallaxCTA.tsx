"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PARALLAX_CONFIG } from "@/config/parallaxSettings";
import { getBackgroundSrc } from "@/utils/getBackgroundSrc";


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

  const getDeviceConfig = () => {
    if (typeof window === "undefined") {
      return PARALLAX_CONFIG.caseStudyCta.desktop;
    }
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const tablet = window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;
    if (mobile) return PARALLAX_CONFIG.caseStudyCta.mobile;
    if (tablet) return PARALLAX_CONFIG.caseStudyCta.tablet;
    return PARALLAX_CONFIG.caseStudyCta.desktop;
  };

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const bg = bgRef.current;
    const fg = fgRef.current;
    const bucket = bucketRef.current;
    if (!section || !bg || !fg || !bucket) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === section) {
        trigger.kill();
      }
    });

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const isTablet = window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;

      // Get device-specific config
      const config = isMobile
        ? PARALLAX_CONFIG.caseStudyCta.mobile
        : isTablet
          ? PARALLAX_CONFIG.caseStudyCta.tablet
          : PARALLAX_CONFIG.caseStudyCta.desktop;

      const { bgSpeed, fgSpeed, bucketSpeed } = config;
      const scrollRange = "+=200%";
      const scrubValue = 3.8;

      // Background/Foreground parallax (desktop/tablet only)
      if (!isMobile) {
        // Background parallax (moves down)
        gsap.to(bg, {
          y: () => `${window.innerHeight * bgSpeed}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: scrollRange,
            scrub: scrubValue,
          },
        });

        // Foreground parallax (moves up)
        gsap.to(fg, {
          y: () => `-${window.innerHeight * fgSpeed}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: scrollRange,
            scrub: scrubValue,
          },
        });
      }

      // Bucket parallax (descends) - ALL DEVICES
      gsap.to(bucket, {
        y: () => `${window.innerHeight * bucketSpeed}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: scrollRange,
          scrub: scrubValue,
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const config = getDeviceConfig();
    setBucketInitialTop(`${config.bucketStart}px`);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cs-cta relative"
      style={{
        minHeight: "100vh",
        height: "140vh",
        paddingTop: "clamp(10rem, 22vh, 14rem)",
        paddingBottom: "clamp(10rem, 22vh, 14rem)",
        paddingInline: "clamp(1.5rem, 5vw, 3rem)",
        zIndex: 10,
      }}
    >
      <div ref={bgRef} className="cs-cta-layer cs-cta-bg" aria-hidden>
        <Image src={bgSrc} alt="" fill sizes="100vw" quality={100} className="object-cover" />
      </div>
      <div className="cs-cta-overlay" aria-hidden />
      <div
        ref={bucketRef}
        className="cs-cta-bucket"
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
      <div ref={fgRef} className="cs-cta-layer cs-cta-fg" aria-hidden>
        <Image
          src="/assets/parallax/section-design/parallax-foreground-design.webp"
          alt=""
          fill
          sizes="100vw"
          quality={100}
          className="object-cover"
        />
      </div>
      <div className="cs-cta-content-wrapper">
        <div ref={contentRef} className="cs-cta-content">
          <p className="cs-cta-eyebrow">Discovery Call</p>
          <h2 className="cs-cta-heading">{heading}</h2>
          <p className="cs-cta-paragraph">{paragraph}</p>
          {href.startsWith("http") ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="cs-cta-button">
              {buttonText}
            </a>
          ) : (
            <Link href={href} className="cs-cta-button">
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
