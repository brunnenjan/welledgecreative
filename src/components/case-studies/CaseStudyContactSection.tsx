"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactFormStatic from "@/components/ContactFormStatic";
import { useI18n } from "@/components/providers/I18nProvider";


export default function CaseStudyContactSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    const fg = fgRef.current;
    const bucket = bucketRef.current;
    if (!section || !fg || !bucket) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === section) {
        trigger.kill();
      }
    });

    const match = ScrollTrigger.matchMedia({
      "(max-width: 1023px)": () => {
        const fgTween = gsap.to(fg, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        const bucketTween = gsap.to(bucket, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        return () => {
          fgTween.kill();
          bucketTween.kill();
        };
      },
      "(min-width: 1024px)": () => {
        const fgTween = gsap.to(fg, {
          y: -90,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
        const bucketTween = gsap.to(bucket, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        return () => {
          fgTween.kill();
          bucketTween.kill();
        };
      },
    }) as unknown as { revert: () => void };

    return () => {
      match.revert();
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
