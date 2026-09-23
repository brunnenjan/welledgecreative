"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import Header from "@/components/Header";
import { useI18n } from "@/components/providers/I18nProvider";
import { smoothScrollTo } from "@/lib/smoothScroll";
import styles from "./retreats.module.css";

type PackageItem = { tag: string; title: string; description: string; items: string[]; cta: string };
type ProcessStep = { title: string; text: string };
type Differentiator = { title: string; text: string };
type CaseStudy = {
  tag: string;
  client: string;
  location: string;
  title: string;
  challenge: string;
  work: string;
  result: string;
  cta?: string;
};
type GalleryItem = { label: string; caption: string };
type Gallery = { heading: string; intro: string; items: GalleryItem[] };

const RELAUNCH_SHOTS = [
  { src: "/assets/misc/projects/vietnam-detox-relaunch-hero.webp", alt: "Vietnam Detox relaunch homepage hero: German Buchinger Fasting, Vietnamese Healing Wisdom" },
  { src: "/assets/misc/projects/vietnam-detox-relaunch-booking.webp", alt: "Vietnam Detox retreat overview page showing real availability by month" },
  { src: "/assets/misc/projects/vietnam-detox-relaunch-an-retreat.webp", alt: "An Retreat page at Legacy Yen Tu MGallery" },
];

function Arrow() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function RetreatsContent() {
  const { t, getValue, locale } = useI18n();
  const text = (key: string) => t(`retreatsPage.${key}`);
  const list = <T,>(key: string) => getValue<T[]>(`retreatsPage.${key}`) ?? [];

  const struggleItems = list<string>("struggle.items");
  const questions = list<string>("philosophy.questions");
  const packages = list<PackageItem>("packages.items");
  const capabilities = list<string>("capabilities.items");
  const crmItems = list<string>("crm.items");
  const processSteps = list<ProcessStep>("process.steps");
  const differentiators = list<Differentiator>("differentiators.items");
  const brisaBahia = getValue<CaseStudy>("retreatsPage.caseStudies.brisaBahia");
  const vietnamDetox = getValue<CaseStudy>("retreatsPage.caseStudies.vietnamDetox");
  const vietnamDetoxGallery = getValue<Gallery>("retreatsPage.caseStudies.vietnamDetoxGallery");

  const discoveryHref = `/${locale}/contact?type=discovery-call`;

  const highlightRef = useRef<HTMLSpanElement>(null);
  const highlightTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!highlightRef.current || !highlightTextRef.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: highlightRef.current,
          start: "top 95%",
          end: "bottom 80px",
          toggleActions: "play reverse play reverse",
        },
      });
      timeline
        .fromTo(highlightRef.current, { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", duration: 0.6, ease: "power1.out" }, 0)
        .fromTo(highlightTextRef.current, { color: "#1a1a1a" }, { color: "#ffffff", duration: 0.6, ease: "power1.out" }, 0);
    });
    return () => media.revert();
  }, [locale]);

  const jump = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    smoothScrollTo(id);
  };

  return (
    <>
      <Header className={styles.header} />
      <main className={styles.page}>
        {/* Hero */}
        <section className={`${styles.wrap} ${styles.hero}`}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              {text("hero.eyebrow")}
            </p>
            <h1>
              {text("hero.headline.prefix")}
              <br />
              <span key={locale} ref={highlightRef} className={styles.heroHighlight}>
                <span ref={highlightTextRef} className={styles.highlightText}>
                  {text("hero.headline.highlight")}
                </span>
              </span>
            </h1>
            <p className={styles.lead}>{text("hero.subheadline")}</p>
            <div className={styles.actions}>
              <Link href={discoveryHref} className="btn btn-primary">
                {text("hero.primaryCta")}
                <Arrow />
              </Link>
              <a href="#packages" onClick={jump("packages")} className={styles.textLink}>
                {text("hero.secondaryCta")}
                <Arrow />
              </a>
            </div>
            <p className={styles.proof}>{text("hero.proof")}</p>
          </div>
        </section>

        <nav className={`${styles.wrap} ${styles.jumpNav}`} aria-label="Section navigation">
          {[
            { id: "struggle", key: "struggle.heading" },
            { id: "packages", key: "packages.heading" },
            { id: "case-studies", key: "caseStudies.heading" },
            { id: "process", key: "process.heading" },
          ].map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={jump(item.id)}>
              {text(item.key)}
              <Arrow />
            </a>
          ))}
        </nav>

        {/* Struggle */}
        <section id="struggle" className={styles.struggleBand}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.struggleHead}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                {text("struggle.eyebrow")}
              </p>
              <h2>{text("struggle.heading")}</h2>
              <p>{text("struggle.intro")}</p>
            </div>
            <ul className={styles.struggleGrid}>
              {struggleItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.struggleOutro}>{text("struggle.outro")}</p>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <h2>{text("packages.heading")}</h2>
              <p>{text("packages.intro")}</p>
            </div>
            <div className={styles.packageGrid}>
              {packages.map((pkg, i) => (
                <div key={pkg.title} className={`${styles.packageCard} ${i === 1 ? styles.featured : ""}`}>
                  <span className={styles.packageTag}>{pkg.tag}</span>
                  <h3>{pkg.title}</h3>
                  <p>{pkg.description}</p>
                  <ul className={styles.packageList}>
                    {pkg.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href={discoveryHref} className="btn btn-primary">
                    {pkg.cta}
                  </Link>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "72px" }}>
              <h3>{text("capabilities.heading")}</h3>
              <p style={{ marginTop: "12px", color: "#616161", maxWidth: "42rem" }}>{text("capabilities.intro")}</p>
              <div className={styles.capPills}>
                {capabilities.map((item) => (
                  <span key={item} className={styles.capPill}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "56px" }} className={styles.crmCard}>
              <span className={styles.crmTag}>{text("crm.tag")}</span>
              <div className={styles.crmGrid}>
                <div>
                  <h2>{text("crm.title")}</h2>
                  <p>{text("crm.description")}</p>
                </div>
                <div>
                  <ul className={styles.crmList}>
                    {crmItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className={styles.crmNote}>{text("crm.note")}</p>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className={styles.section} style={{ background: "#f7f7f7" }}>
          <div className={styles.wrap}>
            <div className={styles.philoGrid}>
              <div>
                <h2>{text("philosophy.heading")}</h2>
                <p className={styles.lead}>{text("philosophy.intro")}</p>
              </div>
              <div>
                <p className={styles.questionsIntro}>{text("philosophy.questionsIntro")}</p>
                <ul className={styles.questionList}>
                  {questions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
                <p className={styles.philoOutro}>{text("philosophy.outro")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Case studies */}
        <section id="case-studies" className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <h2>{text("caseStudies.heading")}</h2>
              <p>{text("caseStudies.intro")}</p>
            </div>
            <div className={styles.caseStack}>
              {brisaBahia && (
                <div className={styles.caseCard}>
                  <div className={styles.caseImage}>
                    <Image
                      src="/case-studies/brisa-bahia/mockup-big-screen-tablet-mobile-webiste.webp"
                      alt="Brisa Bahía retreat center branding and website displayed on desktop, tablet and mobile devices"
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                  <div className={styles.caseBody}>
                    <span className={styles.caseTag}>{brisaBahia.tag}</span>
                    <div className={styles.caseMeta}>
                      {brisaBahia.client} · {brisaBahia.location}
                    </div>
                    <h3>{brisaBahia.title}</h3>
                    <p>{brisaBahia.challenge}</p>
                    <p>{brisaBahia.work}</p>
                    <p className={styles.caseResult}>{brisaBahia.result}</p>
                    {brisaBahia.cta && (
                      <Link href={`/${locale}/case-studies/brisa-bahia`} className={styles.caseCta}>
                        {brisaBahia.cta}
                        <Arrow />
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {vietnamDetox && (
                <div className={styles.caseCard}>
                  <div className={styles.caseImage}>
                    <Image
                      src="/assets/misc/projects/vietnam-detox-device-mockup-2026.webp"
                      alt="The relaunched Vietnam Detox homepage shown on desktop, tablet and mobile devices"
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                  <div className={styles.caseBody}>
                    <span className={styles.caseTag}>{vietnamDetox.tag}</span>
                    <div className={styles.caseMeta}>
                      {vietnamDetox.client} · {vietnamDetox.location}
                    </div>
                    <h3>{vietnamDetox.title}</h3>
                    <p>{vietnamDetox.challenge}</p>
                    <p>{vietnamDetox.work}</p>
                    <p className={styles.caseResult}>{vietnamDetox.result}</p>
                  </div>
                </div>
              )}
            </div>

            {vietnamDetoxGallery && (
              <div className={styles.relaunchGallery}>
                <h3>{vietnamDetoxGallery.heading}</h3>
                <p>{vietnamDetoxGallery.intro}</p>
                <div className={styles.relaunchGrid}>
                  {RELAUNCH_SHOTS.map((shot, i) => {
                    const item = vietnamDetoxGallery.items[i];
                    return (
                      <figure key={shot.src} className={styles.relaunchShot}>
                        <div className={styles.relaunchImage}>
                          <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 900px) 100vw, 33vw" />
                        </div>
                        <figcaption>
                          <div className={styles.relaunchLabel}>{item?.label}</div>
                          <p>{item?.caption}</p>
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Process */}
        <section id="process" className={styles.section} style={{ background: "#f7f7f7" }}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <h2>{text("process.heading")}</h2>
            </div>
            <ol className={styles.steps}>
              {processSteps.map((step, i) => (
                <li key={step.title}>
                  <span className={styles.stepNumber}>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Differentiators */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <h2>{text("differentiators.heading")}</h2>
            </div>
            <div className={styles.diffGrid}>
              {differentiators.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className={styles.section} style={{ background: "#f7f7f7" }}>
          <div className={styles.wrap}>
            <div className={styles.about}>
              <div className={styles.aboutRow}>
                <Image
                  src="/assets/profile/profile-jan-2026-v2.webp"
                  alt="Jan, founder of Well Edge Creative"
                  width={280}
                  height={315}
                  className={styles.aboutPhoto}
                />
                <div>
                  <h2>{text("about.heading")}</h2>
                  <p>{text("about.text")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className={`${styles.wrap} ${styles.closing}`}>
          <div className={styles.closingCard}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              {text("hero.eyebrow")}
            </p>
            <h2>{text("finalCta.heading")}</h2>
            <p className={styles.lead}>{text("finalCta.paragraph")}</p>
            <div className={styles.actions}>
              <Link href={discoveryHref} className="btn btn-primary">
                {text("finalCta.button")}
                <Arrow />
              </Link>
            </div>
            <span className={styles.closingEmail}>
              <a href="mailto:info@well-edge-creative.com">info@well-edge-creative.com</a>
            </span>
          </div>
        </section>
      </main>
    </>
  );
}
