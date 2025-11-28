"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PARALLAX_CONFIG } from "@/config/parallaxSettings";
import { getBackgroundSrc } from "@/utils/getBackgroundSrc";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


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
  const highlightRefs = useRef<(HTMLSpanElement | null)[]>([]);
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

    if (!sectionRef.current || !bgRef.current || !fgRef.current || !bucketRef.current) return;

    // Wait for page to be fully ready before initializing animations
    const initializeAnimations = () => {
      const ctx = gsap.context(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const isTablet = window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;

        // Get device-specific config
        const config = isMobile
          ? PARALLAX_CONFIG.caseStudyCta.mobile
          : isTablet
            ? PARALLAX_CONFIG.caseStudyCta.tablet
            : PARALLAX_CONFIG.caseStudyCta.desktop;

      const { bgSpeed, fgSpeed, bucketSpeed, swingAngle } = config;
      const scrollRange = "+=200%";
      const scrubValue = 3.8;

      // Background/Foreground parallax (desktop/tablet only)
      if (!isMobile) {
        // Background parallax (moves down)
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

        // Foreground parallax (moves up)
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

      // Bucket parallax (descends) - ALL DEVICES
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

      // Bucket swing animation
      if (swingAngle) {
        gsap.to(bucketRef.current, {
          rotation: swingAngle,
          transformOrigin: "center top",
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: scrollRange,
            scrub: scrubValue,
          },
        });
      }

      // Highlight animation for multiple highlighted words with stagger
      const highlightTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      });

      highlightRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.set(ref, {
            scaleX: 0,
            transformOrigin: "left",
            backgroundColor: "#f58222",
          });

          // Add each highlight to timeline with stagger
          highlightTimeline.to(
            ref,
            {
              scaleX: 1,
              ease: "power2.out",
              duration: 0.3,
            },
            index * 0.15 // Stagger delay in timeline
          );
        }
      });

        // Force refresh after animations are set up
        requestAnimationFrame(() => {
          ScrollTrigger.refresh(true);
        });

        // Additional refresh after a short delay to catch late-loading elements
        setTimeout(() => {
          ScrollTrigger.refresh(true);
        }, 100);
      }, sectionRef);

      return ctx;
    };

    // Wait for next frame to ensure DOM is ready
    let ctx: gsap.Context | null = null;

    const timeoutId = setTimeout(() => {
      ctx = initializeAnimations();
    }, 50);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (ctx) ctx.revert();
    };
  }, []);

  // Refresh on page visibility and on mount to fix frozen state
  useEffect(() => {
    // Immediate refresh on component mount
    const refreshOnMount = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 150);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setTimeout(() => {
          ScrollTrigger.refresh(true);
        }, 100);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(refreshOnMount);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
        <Image src={bgSrc} alt="" fill sizes="100vw" quality={90} className="object-cover" />
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
          src="/assets/parallax/section-discover/parallax-bucket-discover.webp"
          alt=""
          width={600}
          height={600}
          quality={90}
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
          quality={90}
          className="object-cover"
        />
      </div>
      <div className="cs-cta-content-wrapper">
        <div ref={contentRef} className="cs-cta-content">
          <p className="cs-cta-eyebrow">Discovery Call</p>
          <h2 className="cs-cta-heading">
            {(() => {
              // Match "retreat brand", "website", "Marke", or "Website" for highlighting
              const regex = /(retreat brand|website|Marke|Website)/gi;
              const parts = heading.split(regex);
              let highlightIndex = 0;

              return parts.map((part, index) => {
                if (part && part.match(regex)) {
                  const currentHighlightIndex = highlightIndex;
                  highlightIndex++;
                  return (
                    <span key={index} className="inline-block relative whitespace-nowrap">
                      <span className="relative z-10" style={{ color: "#ffffff" }}>{part}</span>
                      <span
                        ref={(el) => { highlightRefs.current[currentHighlightIndex] = el; }}
                        className="absolute inset-0"
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
                  );
                }
                return <span key={index}>{part}</span>;
              });
            })()}
          </h2>
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
