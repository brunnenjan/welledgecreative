"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ContactFormStatic from "@/components/ContactFormStatic";
import { useI18n } from "@/components/providers/I18nProvider";


export default function CaseStudyContactSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (!sectionRef.current || !fgRef.current || !bucketRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const scrollRange = "+=200%";
      const scrubValue = 3.8;

      // Foreground parallax moves UP as you scroll down (like homepage)
      // Desktop/tablet only for stronger effect
      if (!isMobile) {
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

        // Bucket also moves (lighter than foreground)
        gsap.to(bucketRef.current, {
          y: () => `${window.innerHeight * 0.08}px`,
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
      className="contact-section-case relative z-[70] scroll-mt-16"
      aria-labelledby="cs-contact-title"
    >
      <span aria-hidden="true" className="sr-only" />
      <div className="contact-bg-case" aria-hidden />
      <div
        ref={fgRef}
        className="contact-fg-case"
        aria-hidden
        style={{
          backgroundImage: "url('/assets/parallax/section-contact/parallax-foreground-contact.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 pt-40 pb-[30vh] text-center md:gap-16 md:pt-48 lg:pt-56 md:pb-[24vh] lg:pb-[20vh]">
        <div className="w-full space-y-8 md:space-y-10">
          <div className="space-y-4 text-center">
            <h2 id="cs-contact-title" className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              {t("contact.heading")}
            </h2>
            <p className="text-lg text-white/80 md:text-xl">{t("contact.paragraph")}</p>
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

      <div ref={bucketRef} className="contact-bucket-case" aria-hidden>
        <Image
          src="/assets/parallax/section-contact/parallax-bucket-contact.webp"
          alt=""
          width={440}
          height={520}
          loading="lazy"
        />
      </div>
    </section>
  );
}
