"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useI18n } from "@/components/providers/I18nProvider";
import styles from "./HomeDiscoveryCTA.module.css";

function Arrow() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The discovery call invitation on the home page, in the style of the sections around it: a bold
 * heading with one word set on the orange bar, and the hanging bucket of design tools beside it.
 */
export default function HomeDiscoveryCTA() {
  const { t, locale } = useI18n();
  const heading = t("homeDiscoveryCta.heading");
  const highlight = t("homeDiscoveryCta.highlight");
  const [before, after] = heading.includes(highlight) ? heading.split(highlight) : [heading, ""];

  const headingRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = { trigger: headingRef.current, start: "top 90%", toggleActions: "play none none reverse" };
      gsap.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power1.out", scrollTrigger: trigger });
      gsap.fromTo(markRef.current, { color: "#1a1a1a" }, { color: "#ffffff", duration: 0.6, ease: "power1.out", scrollTrigger: trigger });
    });
    return () => mm.revert();
  }, [locale]);

  return (
    <section className={styles.section} aria-labelledby="discovery-title">
      <div className={styles.card}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            {t("homeDiscoveryCta.eyebrow")}
          </p>
          <h2 id="discovery-title" ref={headingRef} className={styles.heading}>
            {before}
            {heading.includes(highlight) ? (
              <span className={styles.mark}>
                <span ref={markRef} className={styles.markText}>
                  {highlight}
                </span>
                <span ref={barRef} className={styles.markBar} aria-hidden />
              </span>
            ) : null}
            {after}
          </h2>
          <p className={styles.lead}>{t("homeDiscoveryCta.paragraph")}</p>
          <div className={styles.actions}>
            <Link href={`/${locale}/contact?type=discovery-call`} className="btn btn-primary">
              {t("homeDiscoveryCta.button")}
              <Arrow />
            </Link>
            <Link href={`/${locale}/retreats`} className={styles.textLink}>
              {t("homeDiscoveryCta.secondary")}
              <Arrow />
            </Link>
          </div>
        </div>
        <div className={styles.visual} aria-hidden>
          <div className={styles.bucket}>
            <Image
              src="/assets/parallax/section-design/bucket-delivery.webp"
              alt=""
              fill
              sizes="(max-width: 900px) 90vw, 40vw"
              className={styles.bucketImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
