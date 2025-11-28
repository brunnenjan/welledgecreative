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
    if (typeof window === "undefined") {
      console.log('[CaseStudyParallaxCTA] Server-side, skipping');
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      console.log('[CaseStudyParallaxCTA] Reduced motion preferred, skipping');
      return;
    }

    if (!sectionRef.current || !bgRef.current || !fgRef.current || !bucketRef.current) {
      console.log('[CaseStudyParallaxCTA] Refs not ready:', {
        section: !!sectionRef.current,
        bg: !!bgRef.current,
        fg: !!fgRef.current,
        bucket: !!bucketRef.current
      });
      return;
    }

    console.log('[CaseStudyParallaxCTA] All refs ready, preparing initialization');

    // Wait for page to be fully ready before initializing animations
    const initializeAnimations = () => {
      console.log('[CaseStudyParallaxCTA] initializeAnimations called');

      const ctx = gsap.context(() => {
        console.log('[CaseStudyParallaxCTA] Inside gsap.context');

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const isTablet = window.matchMedia("(min-width: 769px) and (max-width: 1023px)").matches;

        console.log('[CaseStudyParallaxCTA] Device:', { isMobile, isTablet });

        // Get device-specific config
        const config = isMobile
          ? PARALLAX_CONFIG.caseStudyCta.mobile
          : isTablet
            ? PARALLAX_CONFIG.caseStudyCta.tablet
            : PARALLAX_CONFIG.caseStudyCta.desktop;

        console.log('[CaseStudyParallaxCTA] Config:', config);

      const { bgSpeed, fgSpeed, bucketSpeed, swingAngle } = config;
      const scrollRange = "+=200%";
      const scrubValue = 3.8;

      // Background/Foreground parallax (desktop/tablet only)
      if (!isMobile) {
        console.log('[CaseStudyParallaxCTA] Setting up bg/fg parallax');

        // Background parallax (moves down)
        gsap.to(bgRef.current, {
          y: () => `${window.innerHeight * bgSpeed}px`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: scrollRange,
            scrub: scrubValue,
            onEnter: () => console.log('[CaseStudyParallaxCTA] BG animation entered'),
            onUpdate: (self) => console.log('[CaseStudyParallaxCTA] BG progress:', self.progress),
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
            onEnter: () => console.log('[CaseStudyParallaxCTA] FG animation entered'),
          },
        });
      } else {
        console.log('[CaseStudyParallaxCTA] Mobile - skipping bg/fg parallax');
      }

      // Bucket parallax (descends) - ALL DEVICES
      console.log('[CaseStudyParallaxCTA] Setting up bucket parallax');
      gsap.to(bucketRef.current, {
        y: () => `${window.innerHeight * bucketSpeed}px`,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: scrollRange,
          scrub: scrubValue,
          onEnter: () => console.log('[CaseStudyParallaxCTA] BUCKET animation entered'),
          onUpdate: (self) => console.log('[CaseStudyParallaxCTA] BUCKET progress:', self.progress),
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

      // Highlight animation for "retreat" - comes in even later during scroll
      highlightRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.set(ref, {
            scaleX: 0,
            transformOrigin: "left",
            backgroundColor: "#f58222",
          });

          gsap.to(ref, {
            scaleX: 1,
            ease: "power2.out",
            duration: 0.7,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 45%", // Starts even later (was 60%)
              end: "top 15%",   // Ends even later (was 30%)
              scrub: 1.5,       // Even slower scrub for very gradual animation
              toggleActions: "play none none reverse",
            },
            delay: 0.3, // Increased delay before animation starts
          });
        }
      });

        console.log('[CaseStudyParallaxCTA] All animations configured');

        // Force refresh after animations are set up
        requestAnimationFrame(() => {
          console.log('[CaseStudyParallaxCTA] requestAnimationFrame refresh');
          ScrollTrigger.refresh(true);
        });

        // Additional refresh after a short delay to catch late-loading elements
        setTimeout(() => {
          console.log('[CaseStudyParallaxCTA] 100ms delayed refresh');
          ScrollTrigger.refresh(true);
        }, 100);

        // Log all ScrollTriggers
        setTimeout(() => {
          const triggers = ScrollTrigger.getAll();
          console.log('[CaseStudyParallaxCTA] Active ScrollTriggers:', triggers.length);
          triggers.forEach((trigger, i) => {
            console.log(`  Trigger ${i}:`, {
              trigger: trigger.trigger,
              start: trigger.start,
              end: trigger.end,
              progress: trigger.progress
            });
          });
        }, 200);
      }, sectionRef);

      return ctx;
    };

    // Wait for page to be fully loaded before initializing
    let ctx: gsap.Context | null = null;
    let mounted = true;

    const init = () => {
      if (!mounted) return;

      // Double-check elements still exist
      if (!sectionRef.current || !bgRef.current || !fgRef.current || !bucketRef.current) {
        console.log('[CaseStudyParallaxCTA] Elements not ready, retrying...');
        setTimeout(init, 100);
        return;
      }

      console.log('[CaseStudyParallaxCTA] Initializing animations');
      ctx = initializeAnimations();
    };

    // Start initialization after a delay to ensure everything is loaded
    const timeoutId = setTimeout(init, 200);

    // Cleanup function
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      if (ctx) ctx.revert();
    };
  }, []);

  // Refresh on page visibility and on mount to fix frozen state
  useEffect(() => {
    console.log('[CaseStudyParallaxCTA] Setting up refresh timers');

    // Multiple refreshes at different intervals to catch all loading stages
    const refreshTimers = [
      setTimeout(() => {
        console.log('[CaseStudyParallaxCTA] Refresh at 200ms');
        ScrollTrigger.refresh(true);

        // Force a tiny scroll to trigger animations
        window.scrollBy(0, 1);
        setTimeout(() => window.scrollBy(0, -1), 10);
      }, 200),
      setTimeout(() => {
        console.log('[CaseStudyParallaxCTA] Refresh at 400ms');
        ScrollTrigger.refresh(true);

        // Another scroll nudge
        window.scrollBy(0, 1);
        setTimeout(() => window.scrollBy(0, -1), 10);
      }, 400),
      setTimeout(() => {
        console.log('[CaseStudyParallaxCTA] Refresh at 800ms');
        ScrollTrigger.refresh(true);

        // Final scroll nudge
        window.scrollBy(0, 1);
        setTimeout(() => window.scrollBy(0, -1), 10);
      }, 800),
      setTimeout(() => {
        console.log('[CaseStudyParallaxCTA] FINAL refresh at 1200ms');
        ScrollTrigger.refresh(true);

        // Final aggressive scroll nudge
        const currentScroll = window.scrollY;
        window.scrollTo(0, currentScroll + 5);
        setTimeout(() => window.scrollTo(0, currentScroll), 50);
      }, 1200),
    ];

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('[CaseStudyParallaxCTA] Page visible - refreshing');
        setTimeout(() => {
          ScrollTrigger.refresh(true);
        }, 100);
      }
    };

    // Refresh on window load as well
    const handleLoad = () => {
      console.log('[CaseStudyParallaxCTA] Window loaded - refreshing');
      ScrollTrigger.refresh(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('load', handleLoad);

    return () => {
      refreshTimers.forEach(timer => clearTimeout(timer));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('load', handleLoad);
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
              // Match "retreat" or "Marke" for highlighting
              const regex = /(retreat|Marke)/gi;
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
