"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ContactFormStatic from "./ContactFormStatic";
import { useI18n } from "@/components/providers/I18nProvider";


export default function ContactSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const scrollRange = "+=200%";
      const scrubValue = 3.8;

      // Foreground parallax moves UP as you scroll down (like homepage)
      // Desktop/tablet only for stronger effect
      if (!isMobile && fgRef.current) {
        gsap.to(fgRef.current, {
          y: () => `-${window.innerHeight * 0.12}px`, // Matches homepage fgSpeed
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: scrollRange,
            scrub: scrubValue,
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="contact-section relative z-[70] overflow-hidden scroll-mt-16"
      aria-labelledby="contact-title"
    >
      <span id="contact" aria-hidden="true" className="sr-only" />
      {/* Foreground Overlay - Scrolls Up */}
      <div
        ref={fgRef}
        className="absolute left-0 right-0 bottom-0 z-5 pointer-events-none will-change-transform"
        aria-hidden
        style={{
          top: "-150px",
          backgroundImage: "url('/assets/parallax/section-contact/parallax-foreground-contact.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 pt-40 pb-[30vh] text-center md:gap-16 md:pt-48 lg:pt-56 md:pb-[24vh] lg:pb-[20vh]"
      >
        <div className="w-full space-y-8 md:space-y-10">
          <div className="space-y-4 text-center">
            <h2
              id="contact-title"
              className="text-4xl font-semibold leading-tight text-white md:text-5xl"
            >
              {t("contact.heading")}
            </h2>
            <p className="text-lg text-white/80 md:text-xl">
              {t("contact.paragraph")}
            </p>
          </div>

          <ContactFormStatic />

          <div className="space-y-3 text-center text-sm text-white/70 md:text-base">
            <p>
              {t("contact.emailPrompt")}{" "}
              <a
                href="mailto:info@well-edge-creative.com"
                className="underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
              >
                info@well-edge-creative.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="contact-bucket" aria-hidden>
        <div className="contact-bucket__inner">
          <Image
            src="/assets/parallax/section-contact/parallax-bucket-contact.webp"
            alt=""
            width={440}
            height={520}
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
