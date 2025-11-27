"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactFormStatic from "@/components/ContactFormStatic";
import { useI18n } from "@/components/providers/I18nProvider";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudyContactSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;
      if (fgRef.current) {
        gsap.to(fgRef.current, {
          y: "-55%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom-=25% top",
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
            end: "+=200%",
            scrub: 3,
          },
        });

        gsap.fromTo(
          bucketRef.current,
          { rotation: -2.5 },
          {
            rotation: 2.5,
            transformOrigin: "50% 0%",
            duration: 5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="cs-contact-section relative z-[70] overflow-hidden scroll-mt-16"
      aria-labelledby="cs-contact-title"
    >
      <span aria-hidden="true" className="sr-only" />
      <div className="cs-contact-bg" aria-hidden />
      <div
        ref={fgRef}
        className="cs-contact-fg"
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

      <div ref={bucketRef} className="cs-contact-bucket" aria-hidden>
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
