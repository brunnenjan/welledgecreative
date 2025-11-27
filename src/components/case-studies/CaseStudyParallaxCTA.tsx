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
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const initAnimations = (mobile: boolean) => {
      const ctx = gsap.context(() => {
        const isTabletViewport = !mobile && window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;
        const config = mobile ? PARALLAX_CONFIG.caseStudyCta.mobile : getDeviceConfig();
        const scrollRange = "+=200%";
        const fgShift = mobile ? 40 : Math.min(window.innerHeight * Math.abs(config.fgSpeed ?? 0.08), 160);
        const bucketShift = mobile ? 20 : Math.min(window.innerHeight * (config.bucketSpeed ?? 0.6), 200);
        const bucketRotation = mobile ? 0 : isTabletViewport ? 0.9 : 1.2;

        if (fgRef.current) {
          gsap.to(fgRef.current, {
            y: -fgShift,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: scrollRange,
              scrub: 2.5,
            },
          });
        }

        if (bucketRef.current) {
          gsap.set(bucketRef.current, { y: 80 });
          gsap.to(bucketRef.current, {
            y: 80 + bucketShift,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: scrollRange,
              scrub: 2.5,
            },
          });

          gsap.fromTo(
            bucketRef.current,
            { opacity: 0, yPercent: -12 },
            {
              opacity: 1,
              yPercent: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                end: "top 45%",
                scrub: 2,
              },
            }
          );

          gsap.fromTo(
            bucketRef.current,
            { rotation: -bucketRotation },
            {
              rotation: bucketRotation,
              transformOrigin: "50% 0%",
              duration: mobile ? 4.2 : 3.6,
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
                scrub: 2,
              },
            }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    };

    const cleanups: Array<(() => void) | undefined> = [];
    ScrollTrigger.matchMedia({
      "(max-width: 767px)": () => {
        const cleanup = initAnimations(true);
        cleanups.push(cleanup);
        return () => cleanup?.();
      },
      "(min-width: 768px)": () => {
        const cleanup = initAnimations(false);
        cleanups.push(cleanup);
        return () => cleanup?.();
      },
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup?.());
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
