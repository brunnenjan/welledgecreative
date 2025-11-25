"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import DiscoveryCTASection from "@/components/DiscoveryCTASection";
import { useI18n } from "@/components/providers/I18nProvider";

const HERO_IMAGE = "/case-studies/brisa-bahia/gallery/mockup-picture-Logo.webp";
const MOODBOARD_IMAGE = "/case-studies/brisa-bahia/gallery/eb2e7ddd-moodboard.webp";
const BRAND_MINDMAP_IMAGE = "/case-studies/brisa-bahia/process/mind-map-stylized-branding.webp";
const WEBSITE_MINDMAP_IMAGE = "/case-studies/brisa-bahia/process/mind-map-stylized-website.webp";

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

const WEBSITE_PROCESS_IMAGES = [
  {
    src: "/case-studies/brisa-bahia/gallery/About-us-presentation.webp",
    alt: "About us presentation slide for the Brisa Bahía retreat experience",
    width: 1024,
    height: 1024,
  },
  {
    src: "/case-studies/brisa-bahia/gallery/Logo-gap-guide-brisabahia.webp",
    alt: "Logo spacing guide for the Brisa Bahía retreat center identity",
    width: 2048,
    height: 2048,
  },
];

const FINAL_SHOWCASE_IMAGES = [
  {
    src: HERO_IMAGE,
    alt: "Multi-device mockup showing the Brisa Bahía retreat center branding and website",
    width: 1920,
    height: 1080,
  },
  {
    src: MOODBOARD_IMAGE,
    alt: "Brisa Bahía moodboard with lush textures and facilitator rituals",
    width: 1920,
    height: 1080,
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
    src: "/case-studies/brisa-bahia/gallery/About-us-presentation.webp",
    alt: "Brisa Bahía about us presentation slide with facilitator messaging",
    width: 1024,
    height: 1024,
  },
  {
    src: "/case-studies/brisa-bahia/gallery/Logo-gap-guide-brisabahia.webp",
    alt: "Logo gap guide for the Brisa Bahía brand system",
    width: 2048,
    height: 2048,
  },
];

export default function CaseStudyContent() {
  const { t, getValue, locale } = useI18n();
  const [showOriginalTestimonial, setShowOriginalTestimonial] = useState(false);

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

  const websiteDesignCaptions = getValue<string[]>("caseStudyBrisaBahia.websiteDesign.after") ?? [];
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

  return (
    <>
      <Header />
      <main className="bg-white text-black">
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
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

        <section className="px-6 pb-20 pt-16">
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
          </div>
        </section>

        <section className="bg-neutral-50 px-6 py-20">
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

        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.challenge.heading")}</p>
              <h2 className="mt-3 text-3xl font-serif font-semibold">{t("caseStudyBrisaBahia.challenge.heading")}</h2>
              <p className="mt-4 text-lg leading-relaxed text-black/70">{t("caseStudyBrisaBahia.challenge.text")}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.goal.heading")}</p>
              <h2 className="mt-3 text-3xl font-serif font-semibold">{t("caseStudyBrisaBahia.goal.heading")}</h2>
              <p className="mt-4 text-lg leading-relaxed text-black/70">{t("caseStudyBrisaBahia.goal.text")}</p>
            </div>
          </div>
        </section>

        <section className="bg-neutral-50 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.brandIdentity.heading")}</p>
              <h2 className="mt-4 text-3xl font-serif font-semibold md:text-4xl">{t("caseStudyBrisaBahia.brandIdentity.heading")}</h2>
              <p className="mt-4 text-lg text-black/70">{t("caseStudyBrisaBahia.brandIdentity.intro")}</p>
            </div>

            <div className="mb-12 grid gap-10 lg:grid-cols-2">
              <div className="rounded-3xl bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.brandIdentity.logo")}</h3>
                <div className="flex items-center justify-center rounded-2xl bg-neutral-50 p-12 md:p-16">
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
              <div className="rounded-3xl bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.brandIdentity.moodboard")}</h3>
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={MOODBOARD_IMAGE}
                    alt="Brisa Bahía moodboard showing warm light and facilitator moments"
                    width={1920}
                    height={1080}
                    className="w-full"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    loading="lazy"
                  />
                </div>
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
              <div className="rounded-3xl bg-white p-8 shadow-lg">
                <Image
                  src="/case-studies/brisa-bahia/process/typography-fancy-mockup-brisa-bahia.webp"
                  alt="Typography pairing for Brisa Bahía retreat center brand"
                  width={2048}
                  height={2048}
                  className="w-full rounded-2xl"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  loading="lazy"
                />
                <p className="mt-4 text-sm text-black/60">{t("caseStudyBrisaBahia.brandIdentity.typography")}</p>
              </div>
              <div className="rounded-3xl bg-white p-8 shadow-lg">
                <Image
                  src="/case-studies/brisa-bahia/branding/Iconography-Brisa-Bahia-retreat-center-colombia.webp"
                  alt="Custom iconography for Brisa Bahía retreat center"
                  width={2048}
                  height={2048}
                  className="w-full rounded-2xl"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  loading="lazy"
                />
                <p className="mt-4 text-sm text-black/60">{t("caseStudyBrisaBahia.brandIdentity.iconography")}</p>
              </div>
            </div>

            <div className="rounded-3xl bg-[#fff7ef] p-8 shadow-inner">
              <h3 className="mb-6 text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.brandIdentity.brandMindmap.title")}</h3>
              <Image
                src={BRAND_MINDMAP_IMAGE}
                alt="Brand strategy mindmap for the Brisa Bahía retreat center"
                width={1956}
                height={1474}
                className="w-full rounded-2xl shadow-lg"
                sizes="(min-width: 1024px) 60vw, 100vw"
                loading="lazy"
              />
              <p className="mt-4 text-sm text-black/60">{t("caseStudyBrisaBahia.brandIdentity.brandMindmap.description")}</p>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl space-y-16">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.uxStructure.heading")}</p>
              <h2 className="mt-4 text-3xl font-serif font-semibold md:text-4xl">{t("caseStudyBrisaBahia.uxStructure.heading")}</h2>
              <p className="mt-4 text-lg text-black/70">{t("caseStudyBrisaBahia.uxStructure.intro")}</p>
            </div>

            <div className="rounded-3xl bg-[#fff7ef] p-8 shadow-inner">
              <h3 className="mb-4 text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.uxStructure.websiteMindmap.title")}</h3>
              <Image
                src={WEBSITE_MINDMAP_IMAGE}
                alt="Website mindmap for the Brisa Bahía retreat center experience"
                width={1956}
                height={1474}
                className="w-full rounded-2xl shadow-lg"
                sizes="(min-width: 1024px) 60vw, 100vw"
                loading="lazy"
              />
              <p className="mt-4 text-sm text-black/60">{t("caseStudyBrisaBahia.uxStructure.websiteMindmap.description")}</p>
            </div>

            <div className="rounded-3xl bg-neutral-50 p-6">
              <details>
                <summary className="cursor-pointer select-none text-lg font-semibold text-black">
                  {t("caseStudyBrisaBahia.uxStructure.wireframe.title")}
                </summary>
                <p className="mt-3 text-sm text-black/60">{t("caseStudyBrisaBahia.uxStructure.wireframe.description")}</p>
                <div className="mt-8 space-y-6">
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

        <section className="bg-neutral-50 px-6 py-20">
          <div className="mx-auto max-w-6xl space-y-16">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.websiteDesign.heading")}</p>
              <h2 className="mt-4 text-3xl font-serif font-semibold md:text-4xl">{t("caseStudyBrisaBahia.websiteDesign.heading")}</h2>
              <p className="mt-4 text-lg text-black/70">{t("caseStudyBrisaBahia.websiteDesign.intro")}</p>
            </div>

            <div className="space-y-12">
              {[
                {
                  src: "/case-studies/brisa-bahia/after/starting-page-brisa-bahia.webp",
                  alt: "Brisa Bahía homepage showcasing retreat center branding",
                  width: 2992,
                  height: 6764,
                  caption: websiteDesignCaptions[0],
                },
                {
                  src: "/case-studies/brisa-bahia/after/facility-page-brisa-bahia.webp",
                  alt: "Brisa Bahía facilities page detailing the eco retreat website structure",
                  width: 2992,
                  height: 10943,
                  caption: websiteDesignCaptions[1],
                },
              ].map((image) => (
                <figure key={image.src} className="space-y-4">
                  <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="w-full"
                      sizes="(min-width: 1024px) 80vw, 100vw"
                      loading="lazy"
                    />
                  </div>
                  {image.caption && <figcaption className="text-sm text-black/60">{image.caption}</figcaption>}
                </figure>
              ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {WEBSITE_PROCESS_IMAGES.map((image) => (
                <div key={image.src} className="rounded-3xl bg-white p-6 shadow-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="w-full rounded-2xl"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
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

        <section className="bg-neutral-50 px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.testimonial.heading")}</p>
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

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-black/50">{t("caseStudyBrisaBahia.finalShowcase.heading")}</p>
              <h2 className="mt-4 text-3xl font-serif font-semibold md:text-4xl">{t("caseStudyBrisaBahia.finalShowcase.heading")}</h2>
              <p className="mt-4 text-lg text-black/70">{t("caseStudyBrisaBahia.finalShowcase.subtitle")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {FINAL_SHOWCASE_IMAGES.map((image) => (
                <div key={image.src} className="overflow-hidden rounded-3xl bg-white shadow-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 45vw, 100vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-32">
          <div className="absolute inset-0">
            <Image
              src={HERO_IMAGE}
              alt="Brisa Bahía retreat center branding hero background"
              fill
              className="object-cover"
              sizes="100vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/65" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
            <h2 className="text-3xl font-serif font-semibold md:text-4xl">{t("caseStudyBrisaBahia.cta.heading")}</h2>
            <p className="mt-6 text-lg text-white/80">{t("caseStudyBrisaBahia.cta.text")}</p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-white px-10 py-4 text-lg font-semibold text-black transition hover:bg-accent hover:text-white"
              >
                {t("caseStudyBrisaBahia.cta.button")}
              </Link>
            </div>
          </div>
        </section>

        <div className="bg-white px-6 pb-16">
          <div className="mx-auto max-w-6xl">
            <DiscoveryCTASection
              heading={t("caseStudyBrisaBahia.discoveryCTA.heading")}
              paragraph={t("caseStudyBrisaBahia.discoveryCTA.paragraph")}
              buttonText={t("caseStudyBrisaBahia.discoveryCTA.button")}
              href="/contact?type=discovery-call"
              variant="light"
            />
          </div>
        </div>

        <section className="bg-neutral-100 px-6 py-12">
          <div className="mx-auto text-center">
            <Link href="/#selected-projects" className="font-medium text-accent underline-offset-4 hover:underline">
              {t("caseStudyBrisaBahia.backLink")}
            </Link>
          </div>
        </section>
      </main>
      <ContactSection />
      <Footer />
    </>
  );
}
