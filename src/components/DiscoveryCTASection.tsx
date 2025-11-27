"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

if (typeof window !== "undefined") {
}

type DiscoveryCTASectionProps = {
  heading: string;
  paragraph: string;
  buttonText: string;
  href: string;
  variant?: "light" | "dark" | "hero";
  className?: string;
};

export default function DiscoveryCTASection({
  heading,
  paragraph,
  buttonText,
  href,
  variant = "dark",
  className,
}: DiscoveryCTASectionProps) {
  const isLight = variant === "light";
  const isHero = variant === "hero";
  const isExternalLink = href.startsWith("http");
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isHero || typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const scrollRange = "+=220%";
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: () => `${window.innerHeight * 0.08}px`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: scrollRange,
            scrub: 3,
          },
        });
      }

      if (fgRef.current) {
        gsap.to(fgRef.current, {
          y: () => `-${window.innerHeight * 0.06}px`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: scrollRange,
            scrub: 3,
          },
        });
      }

      if (bucketRef.current) {
        gsap.to(bucketRef.current, {
          y: () => `${window.innerHeight * 0.12}px`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: scrollRange,
            scrub: 3.2,
          },
        });

        gsap.fromTo(
          bucketRef.current,
          { rotation: -2.5 },
          {
            rotation: 2.5,
            ease: "sine.inOut",
            duration: 3.8,
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
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 35%",
              scrub: 2,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isHero]);

  if (isHero) {
    return (
      <section
        ref={sectionRef}
        className={[
          "relative",
          "overflow-hidden",
          "w-full",
          "px-6",
          "pt-[22vh]",
          "pb-[26vh]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div ref={bgRef} className="absolute inset-0">
          <Image
            src="/assets/parallax/section-design/parallax-bg-design.webp"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/30" aria-hidden />
        <div ref={fgRef} className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/assets/parallax/section-design/parallax-foreground-design.webp"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover scale-[1.18]"
          />
        </div>
        <div
          ref={bucketRef}
          className="pointer-events-none absolute left-1/2 top-[8%] z-20 -translate-x-1/2"
          aria-hidden
        >
          <Image
            src="/assets/icons/bucket-delivery.svg"
            alt=""
            width={120}
            height={120}
            className="h-24 w-24 opacity-90 drop-shadow-[0_12px_25px_rgba(0,0,0,0.35)]"
            priority
          />
        </div>
        <div
          ref={contentRef}
          className="relative z-10 flex min-h-[20vh] flex-col items-center justify-center gap-6 text-center text-white"
        >
          <h2 className="max-w-4xl text-3xl font-serif font-semibold leading-tight md:text-4xl">
            {heading}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-white">
            {paragraph}
          </p>
          {isExternalLink ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#e87d2f] px-10 py-4 text-base font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              {buttonText}
            </a>
          ) : (
            <Link
              href={href}
              className="rounded-full bg-[#e87d2f] px-10 py-4 text-base font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              {buttonText}
            </Link>
          )}
        </div>
      </section>
    );
  }

  const sectionClasses = [
    "relative",
    "overflow-hidden",
    "rounded-[32px]",
    "px-6",
    "py-16",
    "md:py-20",
    isLight ? "bg-neutral-100" : "bg-gradient-to-br from-[#1b1b1b] via-[#27221d] to-[#3e2b1f]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const overlayClasses = [
    "h-full",
    "w-full",
    "bg-gradient-to-tr",
    isLight ? "from-white via-[#f5f0eb] to-[#efe9e2]" : "from-accent/20 via-transparent to-white/10",
  ].join(" ");

  const headingClasses = ["text-3xl", "font-serif", "font-semibold", "md:text-4xl", isLight ? "text-black" : "text-white"].join(
    " "
  );

  const paragraphClasses = ["mt-6", "text-lg", "leading-relaxed", isLight ? "text-black/70" : "text-white/80"].join(" ");

  const buttonClasses = [
    "mt-8",
    "inline-flex",
    "rounded-full",
    "px-8",
    "py-4",
    "text-base",
    "font-semibold",
    "transition",
    "bg-accent",
    "text-white",
    "hover:-translate-y-0.5",
    "shadow-[0_12px_28px_rgba(245,130,34,0.22)]",
    "hover:shadow-[0_16px_36px_rgba(245,130,34,0.28)]",
  ].join(" ");

  return (
    <section
      className={sectionClasses}
    >
      <div className="absolute inset-0 opacity-30">
        <div className={overlayClasses} />
      </div>
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className={headingClasses}>{heading}</h2>
        <p className={paragraphClasses}>{paragraph}</p>
        {isExternalLink ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses}
          >
            {buttonText}
          </a>
        ) : (
          <Link
            href={href}
            className={buttonClasses}
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
