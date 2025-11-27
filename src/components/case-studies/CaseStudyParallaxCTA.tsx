"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type CaseStudyParallaxCTAProps = {
  heading: string;
  paragraph: string;
  buttonText: string;
  href: string;
};

const SCROLL_RANGE = "+=220%";

export default function CaseStudyParallaxCTA({ heading, paragraph, buttonText, href }: CaseStudyParallaxCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (fgRef.current) {
        gsap.fromTo(
          fgRef.current,
          { yPercent: -4, scale: 1.04 },
          {
            yPercent: 4,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: SCROLL_RANGE,
              scrub: 2.4,
            },
          }
        );
      }

      if (bucketRef.current) {
        gsap.to(bucketRef.current, {
          y: () => `${window.innerHeight * 0.12}px`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: SCROLL_RANGE,
            scrub: 3,
          },
        });

        gsap.fromTo(
          bucketRef.current,
          { rotation: -3 },
          {
            rotation: 3,
            ease: "sine.inOut",
            duration: 4,
            repeat: -1,
            yoyo: true,
            transformOrigin: "50% 0%",
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, yPercent: 12 },
          {
            opacity: 1,
            yPercent: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="case-study-cta">
      <div className="case-study-cta__bg" aria-hidden="true">
        <Image
          src="/assets/parallax/section-design/parallax-bg-design.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="case-study-cta__overlay" aria-hidden="true" />
      <div ref={fgRef} className="case-study-cta__fg" aria-hidden="true">
        <Image
          src="/assets/parallax/section-design/parallax-foreground-design.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div ref={bucketRef} className="case-study-cta__bucket" aria-hidden="true">
        <Image
          src="/assets/parallax/section-design/bucket-delivery.webp"
          alt=""
          width={220}
          height={520}
          className="case-study-cta__bucket-img"
          priority={false}
        />
      </div>
      <div ref={contentRef} className="case-study-cta__content">
        <p className="case-study-cta__eyebrow">Discovery Call</p>
        <h2 className="case-study-cta__heading">{heading}</h2>
        <p className="case-study-cta__paragraph">{paragraph}</p>
        {href.startsWith("http") ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="case-study-cta__button">
            {buttonText}
          </a>
        ) : (
          <Link href={href} className="case-study-cta__button">
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
