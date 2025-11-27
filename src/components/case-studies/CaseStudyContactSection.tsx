"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactFormStatic from "@/components/ContactFormStatic";
import { useI18n } from "@/components/providers/I18nProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CaseStudyContactSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (fgRef.current) {
        gsap.fromTo(
          fgRef.current,
          { yPercent: 8, scale: 1.08 },
          {
            yPercent: -4,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2.8,
            },
          }
        );
      }

      if (bucketRef.current) {
        gsap.to(bucketRef.current, {
          y: () => `${window.innerHeight * 0.14}px`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 3.2,
          },
        });

        gsap.fromTo(
          bucketRef.current,
          { rotation: -2.5 },
          {
            rotation: 2.5,
            ease: "sine.inOut",
            duration: 5,
            repeat: -1,
            yoyo: true,
            transformOrigin: "50% 0%",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact-section" className="case-study-contact" aria-labelledby="case-study-contact-title">
      <div className="case-study-contact__scrim" aria-hidden="true" />
      <div ref={fgRef} className="case-study-contact__fg" aria-hidden="true">
        <Image
          src="/assets/parallax/section-contact/parallax-foreground-contact.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="case-study-contact__bucket-wrapper" aria-hidden="true">
        <div ref={bucketRef} className="case-study-contact__bucket">
          <Image
            src="/assets/parallax/section-contact/parallax-bucket-contact.webp"
            alt=""
            width={240}
            height={460}
            className="case-study-contact__bucket-img"
            priority={false}
          />
        </div>
      </div>

      <div className="case-study-contact__inner">
        <div className="case-study-contact__content">
          <h2 id="case-study-contact-title" className="case-study-contact__heading">
            {t("contact.heading")}
          </h2>
          <p className="case-study-contact__paragraph">{t("contact.paragraph")}</p>
        </div>

        <ContactFormStatic />

        <div className="case-study-contact__meta">
          <p>
            {t("contact.emailPrompt")}{" "}
            <a href="mailto:info@well-edge-creative.com" className="case-study-contact__email">
              info@well-edge-creative.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
