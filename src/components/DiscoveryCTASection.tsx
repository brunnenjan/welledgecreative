"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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
  const bucketRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isHero || typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (fgRef.current) {
        gsap.to(fgRef.current, {
          y: () => `-${window.innerHeight * 0.04}px`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "+=180%",
            scrub: 2,
          },
        });
      }

      if (bucketRef.current) {
        gsap.to(bucketRef.current, {
          y: () => `${window.innerHeight * 0.08}px`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "+=200%",
            scrub: 3,
          },
        });
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
          "min-h-[65vh]",
          "w-full",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="absolute inset-0">
          <Image
            src="/assets/parallax/section-design/parallax-bg-design.webp"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/35" aria-hidden />
        <div ref={fgRef} className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/assets/parallax/section-design/parallax-foreground-design.webp"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover scale-[1.12]"
          />
        </div>
        <div
          ref={bucketRef}
          className="pointer-events-none absolute left-1/2 top-[8%] z-20 w-[clamp(12rem,30vw,18rem)] -translate-x-1/2"
          aria-hidden
        >
          <Image
            src="/assets/parallax/section-deliver/parallax-bucket-deliver.webp"
            alt=""
            width={600}
            height={600}
            className="w-full drop-shadow-2xl"
            priority
          />
        </div>
        <div className="relative z-10 flex min-h-[65vh] flex-col items-center justify-center gap-6 px-6 py-16 text-center text-white">
          <h2 className="max-w-4xl text-3xl font-serif font-semibold leading-tight md:text-4xl">
            {heading}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-white/85">
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
