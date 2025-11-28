"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";
import CaseStudyProgressNav from "@/components/CaseStudyProgressNav";
import CaseStudyParallaxCTA from "@/components/case-studies/CaseStudyParallaxCTA";
import CaseStudyContactSection from "@/components/case-studies/CaseStudyContactSection";
import { useI18n } from "@/components/providers/I18nProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type LightboxImage = { src: string; alt: string; width: number; height: number };

const HERO_IMAGE = "/case-studies/brisa-bahia/mockup-big-screen-tablet-mobile-webiste.webp";
const MOODBOARD_IMAGE = "/case-studies/brisa-bahia/process/Brisa-Bahia-moodboard-mockup.webp";
const TYPOGRAPHY_IMAGE = "/case-studies/brisa-bahia/process/typography-fancy-mockup-brisa-bahia.webp";
const BRAND_MINDMAP_IMAGE = "/case-studies/brisa-bahia/process/mind-map-stylized-branding.webp";
const WEBSITE_STRUCTURE_MINDMAP_IMAGE = "/case-studies/brisa-bahia/process/mind-map-stylized-website.webp";

const BRAND_IDENTITY_LIGHTBOX_IMAGES: LightboxImage[] = [
  {
    src: MOODBOARD_IMAGE,
    alt: "Moodboard mixing lush jungle textures, ocean breeze palettes, and facilitator rituals",
    width: 2464,
    height: 1668,
  },
  {
    src: TYPOGRAPHY_IMAGE,
    alt: "Typography pairing for Brisa Bahía retreat center brand",
    width: 2048,
    height: 2048,
  },
  {
    src: "/case-studies/brisa-bahia/branding/Iconography-Brisa-Bahia-retreat-center-colombia.webp",
    alt: "Custom iconography for Brisa Bahía retreat center",
    width: 2048,
    height: 2048,
  },
  {
    src: BRAND_MINDMAP_IMAGE,
    alt: "Brand strategy mindmap for the Brisa Bahía retreat center",
    width: 1956,
    height: 1474,
  },
];

const WEBSITE_DESIGN_LIGHTBOX_IMAGES: LightboxImage[] = [
  {
    src: "/case-studies/brisa-bahia/after/starting-page-brisa-bahia.webp",
    alt: "Brisa Bahía homepage showcasing retreat center branding",
    width: 2992,
    height: 6764,
  },
  {
    src: "/case-studies/brisa-bahia/after/facility-page-brisa-bahia.webp",
    alt: "Brisa Bahía facilities page detailing the eco retreat website structure",
    width: 2992,
    height: 10943,
  },
];

const BEFORE_AFTER = [
  {
    id: "hero",
    before: {
      src: "/case-studies/brisa-bahia/before/starting-page-bahia-lodge.webp",
      alt: "Before: Bahia Lodge homepage with outdated hostel visuals",
      width: 2992,
      height: 6764,
    },
    after: {
      src: "/case-studies/brisa-bahia/after/starting-page-brisa-bahia.webp",
      alt: "After: Brisa Bahía retreat center branding homepage with facilitator-focused storytelling",
      width: 2992,
      height: 6764,
    },
  },
  {
    id: "rooms",
    before: {
      src: "/case-studies/brisa-bahia/before/Bahia-Lodge-rooms-page-colombia.jpeg.webp",
      alt: "Before: Bahia Lodge rooms page lacking structure",
      width: 2992,
      height: 5333,
    },
    after: {
      src: "/case-studies/brisa-bahia/after/facility-page-brisa-bahia.webp",
      alt: "After: Brisa Bahía facilities page detailing the retreat center experience",
      width: 2992,
      height: 10943,
    },
  },
];

const WIRE_FRAME_SLICES = Array.from({ length: 6 }).map((_, index) => {
  const sliceNumber = String(index + 1).padStart(2, "0");
  return {
    src: `/case-studies/brisa-bahia/process/wireframes-desktop-slice-${sliceNumber}.webp`,
    alt: `Brisa Bahía retreat center website wireframe slice ${sliceNumber}`,
    width: 900,
    height: 1536,
  };
});

const WEBSITE_PROCESS_IMAGES: LightboxImage[] = [
  {
    src: "/assets/case-studies/brisa-bahia/gallery/About-us-presentation.webp",
    alt: "About us presentation slide for the Brisa Bahía retreat experience",
    width: 696,
    height: 696,
  },
  {
    src: "/case-studies/brisa-bahia/gallery/Logo-gap-guide-brisabahia.webp",
    alt: "Logo spacing guide for the Brisa Bahía retreat center identity",
    width: 2048,
    height: 2048,
  },
];

const FINAL_SHOWCASE_IMAGES: LightboxImage[] = [
  {
    src: MOODBOARD_IMAGE,
    alt: "Moodboard mixing lush jungle textures, ocean breeze palettes, and facilitator rituals",
    width: 2464,
    height: 1668,
  },
  {
    src: TYPOGRAPHY_IMAGE,
    alt: "Editorial serif headlines (Lora) paired with a humanist sans body for readability",
    width: 2048,
    height: 2048,
  },
  {
    src: "/case-studies/brisa-bahia/branding/Iconography-Brisa-Bahia-retreat-center-colombia.webp",
    alt: "Custom icon set for Brisa Bahía retreat center",
    width: 2048,
    height: 2048,
  },
  {
    src: "/case-studies/brisa-bahia/branding/color-palette.webp",
    alt: "Brisa Bahía color palette with botanical accents and retreat-inspired tones",
    width: 2048,
    height: 2048,
  },
  {
    src: HERO_IMAGE,
    alt: "Brisa Bahía retreat center branding and website displayed on desktop, tablet and mobile devices",
    width: 2688,
    height: 1792,
  },
  {
    src: "/case-studies/brisa-bahia/after/starting-page-brisa-bahia.webp",
    alt: "After: Brisa Bahía homepage with facilitator-focused storytelling",
    width: 2992,
    height: 6764,
  },
  {
    src: "/case-studies/brisa-bahia/after/facility-page-brisa-bahia.webp",
    alt: "After: Brisa Bahía facility page showcasing retreat amenities",
    width: 2992,
    height: 6764,
  },
  {
    src: "/case-studies/brisa-bahia/gallery/guidelines-page-3.webp",
    alt: "Brand guidelines page highlighting color usage for Brisa Bahía",
    width: 2828,
    height: 1591,
  },
  {
    src: "/case-studies/brisa-bahia/gallery/guidelines-page-5.webp",
    alt: "Typography and layout guidelines for the Brisa Bahía retreat center",
    width: 2692,
    height: 1514,
  },
  {
    src: "/assets/case-studies/brisa-bahia/gallery/About-us-presentation.webp",
    alt: "Brisa Bahía about us presentation slide with facilitator messaging",
    width: 696,
    height: 696,
  },
  {
    src: "/assets/case-studies/brisa-bahia/mobile-brisa-bahia-retreat.webp",
    alt: "Brisa Bahía retreat mobile screen showing responsive layouts",
    width: 2048,
    height: 2048,
  },
  {
    src: "/assets/case-studies/brisa-bahia/gallery/responsive-brisabahiatablet.webp",
    alt: "Responsive Brisa Bahía tablet layout showcasing breakpoints",
    width: 1800,
    height: 1200,
  },
  {
    src: "/case-studies/brisa-bahia/gallery/Logo-gap-guide-brisabahia.webp",
    alt: "Logo gap guide for the Brisa Bahía brand system",
    width: 2048,
    height: 2048,
  },
  {
    src: "/case-studies/brisa-bahia/gallery/mockup-picture-Logo.webp",
    alt: "Brisa Bahía logo mockup with natural leaf shadow overlay",
    width: 2048,
    height: 2048,
  },
];

const BRAND_IDENTITY_OFFSET = 0;
const WEBSITE_DESIGN_OFFSET = BRAND_IDENTITY_OFFSET + BRAND_IDENTITY_LIGHTBOX_IMAGES.length;
const WEBSITE_PROCESS_OFFSET = WEBSITE_DESIGN_OFFSET + WEBSITE_DESIGN_LIGHTBOX_IMAGES.length;
const UX_STRUCTURE_LIGHTBOX_IMAGES: LightboxImage[] = [
  {
    src: WEBSITE_STRUCTURE_MINDMAP_IMAGE,
    alt: "Website mindmap showing the complete Brisa Bahía structure",
    width: 2048,
    height: 1400,
  },
];
const UX_STRUCTURE_OFFSET = WEBSITE_PROCESS_OFFSET + WEBSITE_PROCESS_IMAGES.length;
const FINAL_SHOWCASE_OFFSET = UX_STRUCTURE_OFFSET + UX_STRUCTURE_LIGHTBOX_IMAGES.length;
const RESPONSIVE_IMAGE_SOURCES = [
  {
    src: "/assets/case-studies/brisa-bahia/gallery/responsive-brisabahiatablet.webp",
    label: "Tablet responsive overview",
  },
  {
    src: "/assets/case-studies/brisa-bahia/mobile-brisa-bahia-retreat.webp",
    label: "Mobile retreat homepage UI",
  },
];

export default function CaseStudyContent() {
  const { t, getValue, locale } = useI18n();
  const [showOriginalTestimonial, setShowOriginalTestimonial] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [pageVisible, setPageVisible] = useState(false);

  const challengeHeadingRef = useRef<HTMLHeadingElement>(null);
  const challengeHighlightRef = useRef<HTMLSpanElement>(null);
  const challengeTextRef = useRef<HTMLSpanElement>(null);
  const goalHeadingRef = useRef<HTMLHeadingElement>(null);
  const goalHighlightRef = useRef<HTMLSpanElement>(null);
  const goalTextRef = useRef<HTMLSpanElement>(null);

  // Combine all lightbox images
  const allLightboxImages = useMemo(
    () => [
      ...BRAND_IDENTITY_LIGHTBOX_IMAGES,
      ...WEBSITE_DESIGN_LIGHTBOX_IMAGES,
      ...WEBSITE_PROCESS_IMAGES,
      ...UX_STRUCTURE_LIGHTBOX_IMAGES,
      ...FINAL_SHOWCASE_IMAGES,
    ],
    []
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Challenge heading animation
      if (challengeHeadingRef.current && challengeHighlightRef.current && challengeTextRef.current) {
        gsap.fromTo(
          challengeHighlightRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: challengeHeadingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.fromTo(
          challengeTextRef.current,
          { color: "#1a1a1a" },
          {
            color: "#ffffff",
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: challengeHeadingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Goal heading animation (with delay after Challenge)
      if (goalHeadingRef.current && goalHighlightRef.current && goalTextRef.current) {
        gsap.fromTo(
          goalHighlightRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power1.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: goalHeadingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.fromTo(
          goalTextRef.current,
          { color: "#1a1a1a" },
          {
            color: "#ffffff",
            duration: 0.6,
            ease: "power1.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: goalHeadingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".case-section"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("case-section--visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const heroIntro = (getValue<string[]>("caseStudyBrisaBahia.hero.intro") ?? []).filter(Boolean);
  const heroMeta = [
    {
      label: t("caseStudyBrisaBahia.hero.meta.clientLabel"),
      value: t("caseStudyBrisaBahia.hero.meta.client"),
    },
    {
      label: t("caseStudyBrisaBahia.hero.meta.ownersLabel"),
      value: t("caseStudyBrisaBahia.hero.meta.owners"),
    },
    {
      label: t("caseStudyBrisaBahia.hero.meta.locationLabel"),
      value: t("caseStudyBrisaBahia.hero.meta.location"),
    },
    {
      label: t("caseStudyBrisaBahia.hero.meta.servicesLabel"),
      value: t("caseStudyBrisaBahia.hero.meta.services"),
    },
    {
      label: t("caseStudyBrisaBahia.hero.meta.timelineLabel"),
      value: t("caseStudyBrisaBahia.hero.meta.timeline"),
    },
  ];

  const websiteDesignCaptions = useMemo(
    () => getValue<string[]>("caseStudyBrisaBahia.websiteDesign.after") ?? [],
    [getValue]
  );
  const websiteDesignShowcase = useMemo(
    () =>
      WEBSITE_DESIGN_LIGHTBOX_IMAGES.map((image, index) => ({
        ...image,
        caption: websiteDesignCaptions[index],
      })),
    [websiteDesignCaptions]
  );
  const responsiveImages = useMemo(
    () =>
      RESPONSIVE_IMAGE_SOURCES.map((item) => {
        const finalIndex = FINAL_SHOWCASE_IMAGES.findIndex((image) => image.src === item.src);
        if (finalIndex === -1) {
          return null;
        }
        return {
          ...FINAL_SHOWCASE_IMAGES[finalIndex],
          finalIndex,
          label: item.label,
        };
      }).filter((image): image is LightboxImage & { finalIndex: number; label: string } => Boolean(image)),
    []
  );
  const resultItems = getValue<string[]>("caseStudyBrisaBahia.results.items") ?? [];

  const testimonialQuote = t("caseStudyBrisaBahia.testimonial.quote");
  const testimonialOriginal = t("caseStudyBrisaBahia.testimonial.originalQuote");
  const testimonialAuthor = t("caseStudyBrisaBahia.testimonial.author");
  const displayedTestimonial = useMemo(() => {
    if (locale === "en") {
      return testimonialQuote;
    }
    return showOriginalTestimonial ? testimonialOriginal : testimonialQuote;
  }, [locale, showOriginalTestimonial, testimonialQuote, testimonialOriginal]);

  const testimonialParagraphList = useMemo(
    () => displayedTestimonial.split("\n\n").filter(Boolean),
    [displayedTestimonial]
  );

  const shouldShowTranslationToggle = locale !== "en";

  useEffect(() => {
    const raf = requestAnimationFrame(() => setPageVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`case-study-fade ${pageVisible ? "is-visible" : ""}`}>
      <Header />
      <CaseStudyProgressNav />
      <main className="bg-white text-black">
        <section id="intro" className="case-section relative flex min-h-[70vh] items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={HERO_IMAGE}
              alt="Brisa Bahía retreat center branding and website shown across multiple devices"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/55" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center text-white">
            <p className="mb-6 text-sm uppercase tracking-[0.4em] text-white/80">{t("caseStudyBrisaBahia.hero.tagline")}</p>
            <h1 className="text-4xl font-serif font-semibold leading-tight md:text-5xl lg:text-6xl">
              {t("caseStudyBrisaBahia.hero.title")}
            </h1>
          </div>
        </section>

        <section id="before-after" className="case-section bg-neutral-50 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-4 text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.beforeAfter.heading")}</p>
              <h2 className="text-3xl font-serif font-semibold md:text-4xl">{t("caseStudyBrisaBahia.hero.tagline")}</h2>
              <p className="text-lg text-black/70">{t("caseStudyBrisaBahia.beforeAfter.subtitle")}</p>
            </div>
            <div className="space-y-12">
              {BEFORE_AFTER.map((pair) => (
                <div key={pair.id} className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
                  <div>
                    <p className="mb-3 text-sm font-medium uppercase tracking-wide text-black/60">
                      {t("caseStudyBrisaBahia.beforeAfter.beforeLabel")}
                    </p>
                    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                      <Image
                        src={pair.before.src}
                        alt={pair.before.alt}
                        width={pair.before.width}
                        height={pair.before.height}
                        className="w-full"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                      />
                    </div>
                  </div>
                  <div className="hidden text-4xl text-black/30 md:block" aria-hidden>
                    →
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-medium uppercase tracking-wide text-black/60">
                      {t("caseStudyBrisaBahia.beforeAfter.afterLabel")}
                    </p>
                    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                      <Image
                        src={pair.after.src}
                        alt={pair.after.alt}
                        width={pair.after.width}
                        height={pair.after.height}
                        className="w-full"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-black/50">{t("caseStudyBrisaBahia.beforeAfter.note")}</p>
          </div>
        </section>

        <section className="case-section px-6 pb-20 pt-16">
          <div className="mx-auto max-w-5xl space-y-10">
            <div className="space-y-6 text-lg leading-relaxed text-black/80">
              {heroIntro.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="grid gap-6 rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {heroMeta.map((item, index) => (
                <div key={index} className="border-t border-black/10 pt-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-black/50">{item.label}</p>
                  <p className="mt-2 font-serif text-lg text-black">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://brisabahia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-semibold text-accent underline-offset-4 transition-colors hover:text-accent/80"
                >
                  Visit Live Site →
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-black/60">
                <a href="#branding" className="transition hover:text-accent">Branding</a>
                <span>•</span>
                <a href="#challenge-goal" className="transition hover:text-accent">Challenge & Goal</a>
                <span>•</span>
                <a href="#process" className="transition hover:text-accent">Process</a>
                <span>•</span>
                <a href="#final-showcase" className="transition hover:text-accent">Gallery</a>
              </div>
            </div>

          </div>
        </section>

        <section className="case-section px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-serif font-semibold text-black/90">Logo Transformation</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-neutral-50 p-8">
                <p className="mb-4 text-center text-sm font-medium uppercase tracking-wide text-black/60">
                  Before — Bahia Lodge Logo
                </p>
                <div className="flex items-center justify-center rounded-xl bg-white p-12 shadow-md">
                  <Image
                    src="/case-studies/brisa-bahia/before/logo-Bahia-Lodge-capurgana-colombia.webp"
                    alt="Old Bahia Lodge logo before rebranding"
                    width={200}
                    height={160}
                    className="h-auto w-full max-w-[180px]"
                    sizes="180px"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="rounded-2xl bg-neutral-50 p-8">
                <p className="mb-4 text-center text-sm font-medium uppercase tracking-wide text-black/60">
                  After — Brisa Bahía Logo
                </p>
                <div className="flex items-center justify-center rounded-xl bg-white p-12 shadow-md">
                  <Image
                    src="/case-studies/brisa-bahia/branding/logo-main.webp"
                    alt="New Brisa Bahía logo after rebranding showing organic retreat center lettering"
                    width={444}
                    height={355}
                    className="h-auto w-full max-w-[220px]"
                    sizes="220px"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="challenge-goal" className="case-section bg-[#f7f7f7] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-center text-center">
                <h2
                  ref={challengeHeadingRef}
                  className="mb-8 text-4xl font-bold md:text-5xl"
                >
                  The{" "}
                  <span className="relative inline-block">
                    <span ref={challengeTextRef} className="relative z-10">
                      Challenge
                    </span>
                    <span
                      ref={challengeHighlightRef}
                      className="absolute inset-0 bg-accent"
                      style={{
                        transform: "scaleX(0)",
                        transformOrigin: "left",
                        zIndex: -1,
                        margin: "-0.1em -0.15em",
                        backgroundColor: "#f58222",
                      }}
                    />
                  </span>
                </h2>
                <p className="max-w-[560px] text-lg leading-relaxed text-black/70">
                  {t("caseStudyBrisaBahia.challenge.text")}
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <h2
                  ref={goalHeadingRef}
                  className="mb-8 text-4xl font-bold md:text-5xl"
                >
                  The{" "}
                  <span className="relative inline-block">
                    <span ref={goalTextRef} className="relative z-10">
                      Goal
                    </span>
                    <span
                      ref={goalHighlightRef}
                      className="absolute inset-0 bg-accent"
                      style={{
                        transform: "scaleX(0)",
                        transformOrigin: "left",
                        zIndex: -1,
                        margin: "-0.1em -0.15em",
                        backgroundColor: "#f58222",
                      }}
                    />
                  </span>
                </h2>
                <p className="max-w-[560px] text-lg leading-relaxed text-black/70">
                  {t("caseStudyBrisaBahia.goal.text")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="brand-identity" className="case-section bg-neutral-50 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.brandIdentity.heading")}</p>
              <h2 className="mt-4 text-3xl font-serif font-semibold md:text-4xl">{t("caseStudyBrisaBahia.brandIdentity.heading")}</h2>
              <p className="mt-4 text-lg text-black/70">{t("caseStudyBrisaBahia.brandIdentity.intro")}</p>
            </div>

            <div className="mb-12 grid gap-10 lg:grid-cols-2">
              <div className="rounded-3xl bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.brandIdentity.logo")}</h3>
                <div className="flex items-center justify-center rounded-2xl bg-neutral-50 p-16 md:p-20">
                  <Image
                    src="/case-studies/brisa-bahia/branding/logo-main.webp"
                    alt="Brisa Bahía logo showing organic retreat center lettering"
                    width={444}
                    height={355}
                    className="h-auto w-full max-w-[280px]"
                    sizes="280px"
                    loading="lazy"
                  />
                </div>
              </div>
              <div id="moodboard" className="rounded-3xl bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.brandIdentity.moodboard")}</h3>
                <button
                  onClick={() => openLightbox(BRAND_IDENTITY_OFFSET + 0)}
                  className="group w-full overflow-hidden rounded-2xl transition hover:shadow-xl"
                  type="button"
                >
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={MOODBOARD_IMAGE}
                      alt="Moodboard mixing lush jungle textures, ocean breeze palettes, and facilitator rituals"
                      className="w-full h-auto transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                      <svg
                        className="h-12 w-12 text-white opacity-0 transition group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="mb-12 grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <Image
                  src="/case-studies/brisa-bahia/branding/colors-before.webp"
                  alt="Before palette from Bahia Lodge"
                  width={1995}
                  height={1689}
                  className="w-full rounded-2xl shadow-lg"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  loading="lazy"
                />
                <p className="text-sm text-black/60">{t("caseStudyBrisaBahia.brandIdentity.colorsBefore")}</p>
              </div>
              <div className="space-y-4">
                <Image
                  src="/case-studies/brisa-bahia/branding/color-palette.webp"
                  alt="New Brisa Bahía retreat center color palette"
                  width={2912}
                  height={2275}
                  className="w-full rounded-2xl shadow-lg"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  loading="lazy"
                />
                <p className="text-sm text-black/60">{t("caseStudyBrisaBahia.brandIdentity.colorsAfter")}</p>
              </div>
            </div>

            <div className="mb-12 grid gap-8 lg:grid-cols-2">
              <div id="typography" className="rounded-3xl bg-white p-8 shadow-lg">
                <button
                  onClick={() => openLightbox(BRAND_IDENTITY_OFFSET + 1)}
                  className="group w-full overflow-hidden rounded-2xl transition hover:shadow-xl"
                  type="button"
                >
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={TYPOGRAPHY_IMAGE}
                      alt="Typography pairing for Brisa Bahía retreat center brand"
                      className="w-full h-auto transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                      <svg
                        className="h-12 w-12 text-white opacity-0 transition group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
                <p className="mt-4 text-sm text-black/60">{t("caseStudyBrisaBahia.brandIdentity.typography")}</p>
              </div>
              <div id="iconset" className="rounded-3xl bg-white p-8 shadow-lg">
                <button
                  onClick={() => openLightbox(BRAND_IDENTITY_OFFSET + 2)}
                  className="group w-full overflow-hidden rounded-2xl transition hover:shadow-xl"
                  type="button"
                >
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/case-studies/brisa-bahia/branding/Iconography-Brisa-Bahia-retreat-center-colombia.webp"
                      alt="Custom iconography for Brisa Bahía retreat center"
                      className="w-full h-auto transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                      <svg
                        className="h-12 w-12 text-white opacity-0 transition group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
                <p className="mt-4 text-sm text-black/60">{t("caseStudyBrisaBahia.brandIdentity.iconography")}</p>
              </div>
            </div>

            <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch">
              <div className="rounded-3xl bg-[#fff7ef] p-6 shadow-inner">
                <h3 className="mb-4 text-sm uppercase tracking-[0.4em] text-black/50">
                  {t("caseStudyBrisaBahia.brandIdentity.brandMindmap.title")}
                </h3>
                <button
                  onClick={() => openLightbox(BRAND_IDENTITY_OFFSET + 3)}
                  className="group block w-full"
                  type="button"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={BRAND_MINDMAP_IMAGE}
                      alt="Brand strategy mindmap for the Brisa Bahía retreat center"
                      className="mx-auto h-auto w-full max-w-[720px] transition duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/10">
                      <svg
                        className="h-12 w-12 text-white opacity-0 transition group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
                <p className="mt-4 text-sm text-black/60">
                  {t("caseStudyBrisaBahia.brandIdentity.brandMindmap.description")}
                </p>
              </div>
              <div className="rounded-3xl bg-white/95 p-8 shadow-lg">
                <div className="flex h-full flex-col justify-center space-y-4 text-black/80">
                  <p className="text-xs uppercase tracking-[0.35em] text-black/40">
                    {t("caseStudyBrisaBahia.brandIdentity.heading")}
                  </p>
                  <h3 className="text-2xl font-serif font-semibold leading-snug md:text-3xl">
                    {t("caseStudyBrisaBahia.brandIdentity.brandMindmap.title")}
                  </h3>
                  <p className="text-base leading-relaxed">
                    {t("caseStudyBrisaBahia.brandIdentity.intro")}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section id="website-structure" className="case-section px-6 py-20">
          <div className="mx-auto max-w-6xl space-y-16">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.uxStructure.heading")}</p>
              <h2 className="mt-4 text-3xl font-serif font-semibold md:text-4xl">{t("caseStudyBrisaBahia.uxStructure.heading")}</h2>
              <p className="mt-4 text-lg text-black/70">{t("caseStudyBrisaBahia.uxStructure.intro")}</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-stretch">
              <div className="rounded-3xl bg-white/95 p-8 shadow-lg">
                <div className="flex h-full flex-col justify-center space-y-4 text-black/80">
                  <p className="text-xs uppercase tracking-[0.35em] text-black/40">
                    {t("caseStudyBrisaBahia.uxStructure.heading")}
                  </p>
                  <h3 className="text-2xl font-serif font-semibold leading-snug md:text-3xl">
                    {t("caseStudyBrisaBahia.uxStructure.websiteMindmap.title")}
                  </h3>
                  <p className="text-base leading-relaxed">
                    {t("caseStudyBrisaBahia.uxStructure.intro")}
                  </p>
                </div>
              </div>
              <div className="rounded-3xl bg-[#fff7ef] p-6 shadow-inner">
                <h3 className="mb-4 text-sm uppercase tracking-[0.4em] text-black/50">
                  {t("caseStudyBrisaBahia.uxStructure.websiteMindmap.title")}
                </h3>
                <button
                  onClick={() => openLightbox(UX_STRUCTURE_OFFSET)}
                  className="group block w-full"
                  type="button"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={WEBSITE_STRUCTURE_MINDMAP_IMAGE}
                      alt="Website mindmap for the Brisa Bahía retreat center experience"
                      className="mx-auto h-auto w-full max-w-[760px] transition duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/10">
                      <svg
                        className="h-12 w-12 text-white opacity-0 transition group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
                <p className="mt-4 text-sm text-black/70">
                  {t("caseStudyBrisaBahia.uxStructure.websiteMindmap.description")}
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-neutral-50 p-6">
              <details>
                <summary className="cursor-pointer select-none text-lg font-semibold text-black">
                  {t("caseStudyBrisaBahia.uxStructure.wireframe.title")}
                </summary>
                <p className="mt-3 text-sm text-black/60">{t("caseStudyBrisaBahia.uxStructure.wireframe.description")}</p>
                <div className="mt-8 max-h-[80vh] space-y-6 overflow-y-auto rounded-xl border border-black/5 bg-neutral-100/50 p-4">
                  {WIRE_FRAME_SLICES.map((slice) => (
                    <div key={slice.src} className="mx-auto max-w-[920px] overflow-hidden rounded-2xl bg-white shadow-lg">
                      <Image
                        src={slice.src}
                        alt={slice.alt}
                        width={slice.width}
                        height={slice.height}
                        className="h-auto w-full"
                        sizes="(min-width: 1024px) 900px, 90vw"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </section>

        <section id="website-design" className="case-section bg-neutral-50 px-6 py-20">
          <div className="mx-auto max-w-6xl space-y-16">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.websiteDesign.heading")}</p>
              <h2 className="mt-4 text-3xl font-serif font-semibold md:text-4xl">{t("caseStudyBrisaBahia.websiteDesign.heading")}</h2>
              <p className="mt-4 text-lg text-black/70">{t("caseStudyBrisaBahia.websiteDesign.intro")}</p>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {websiteDesignShowcase.map((image, index) => (
                <figure key={image.src} className="space-y-4">
                  <button
                    type="button"
                    onClick={() => openLightbox(WEBSITE_DESIGN_OFFSET + index)}
                    className="group block w-full"
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-auto w-full transition duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                        <svg
                          className="h-12 w-12 text-white opacity-0 transition group-hover:opacity-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                  {image.caption && <figcaption className="text-sm text-black/60">{image.caption}</figcaption>}
                </figure>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {WEBSITE_PROCESS_IMAGES.map((image, index) => (
                <button
                  key={image.src}
                  onClick={() => openLightbox(WEBSITE_PROCESS_OFFSET + index)}
                  className="group overflow-hidden rounded-3xl bg-white shadow-lg transition hover:shadow-xl"
                  type="button"
                >
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                      <svg
                        className="h-12 w-12 text-white opacity-0 transition group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="mobile-breakpoints" className="case-section bg-neutral-50 px-6 py-20">
          <div className="mx-auto max-w-5xl space-y-12">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-black/50">Mobile Breakpoints</p>
              <h2 className="mt-4 text-3xl font-serif font-semibold md:text-4xl">Responsive Design</h2>
              <p className="mt-4 text-lg text-black/70">
                {t("caseStudyBrisaBahia.uxStructure.responsiveIntro")}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {responsiveImages.map((image) => (
                <div key={image.src} className="space-y-3">
                  <button
                    onClick={() => openLightbox(FINAL_SHOWCASE_OFFSET + image.finalIndex)}
                    className="group block overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                    type="button"
                  >
                    <div className="relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-auto w-full transition duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                        <svg
                          className="h-12 w-12 text-white opacity-0 transition group-hover:opacity-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                  <p className="text-sm text-black/60">{image.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="results" className="case-section px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.results.heading")}</p>
            <h2 className="mt-4 text-3xl font-serif font-semibold md:text-4xl">{t("caseStudyBrisaBahia.results.subtitle")}</h2>
            <div className="mt-10 space-y-5">
              {resultItems.map((item, index) => (
                <div key={index} className="flex gap-3 text-black/80">
                  <span className="text-accent font-semibold">✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonial" className="case-section bg-neutral-50 px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.testimonial.heading")}</p>

            <div className="mx-auto mb-6 mt-12 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 shadow-lg">
              <Image
                src="/assets/misc/testimonials/kary-nhung.webp"
                alt={testimonialAuthor}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-8 space-y-6 text-left text-lg leading-relaxed text-black/80">
              {testimonialParagraphList.map((paragraph, index) => (
                <p key={index} className="italic font-serif text-xl text-black/80">
                  {paragraph}
                </p>
              ))}
              <p className="text-base font-semibold text-black">{testimonialAuthor}</p>
              {shouldShowTranslationToggle && (
                <p className="text-sm text-black/50">
                  <span className="font-semibold">{t("caseStudyBrisaBahia.testimonial.translatedLabel")}</span> —{" "}
                  <button
                    type="button"
                    onClick={() => setShowOriginalTestimonial((prev) => !prev)}
                    className="underline hover:text-accent"
                  >
                    {showOriginalTestimonial
                      ? t("caseStudyBrisaBahia.testimonial.hideOriginal")
                      : t("caseStudyBrisaBahia.testimonial.viewOriginal")}
                  </button>
                </p>
              )}
            </div>
          </div>
        </section>

        <section id="gallery" className="case-section px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.finalShowcase.heading")}</p>
              <h2 className="mt-4 text-3xl font-serif font-semibold md:text-4xl">{t("caseStudyBrisaBahia.finalShowcase.heading")}</h2>
              <p className="mt-4 text-lg text-black/70">{t("caseStudyBrisaBahia.finalShowcase.subtitle")}</p>
            </div>
            <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
              {FINAL_SHOWCASE_IMAGES.map((image, index) => (
                <button
                  key={image.src}
                  onClick={() => openLightbox(FINAL_SHOWCASE_OFFSET + index)}
                  className="group mb-6 inline-block w-full overflow-hidden rounded-3xl bg-white shadow-lg transition hover:shadow-xl"
                  type="button"
                >
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                      <svg
                        className="h-12 w-12 text-white opacity-0 transition group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div id="cta" className="case-section case-section--flush px-0 case-study-cta-wrapper">
          <CaseStudyParallaxCTA
            heading={t("caseStudyBrisaBahia.discoveryCTA.heading")}
            paragraph={t("caseStudyBrisaBahia.discoveryCTA.paragraph")}
            buttonText={t("caseStudyBrisaBahia.discoveryCTA.button")}
            href="https://calendly.com/well-edge-creative/30min"
          />
        </div>
      </main>
      <CaseStudyContactSection />
      <Footer />
      {lightboxOpen && (
        <ImageLightbox
          images={allLightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
