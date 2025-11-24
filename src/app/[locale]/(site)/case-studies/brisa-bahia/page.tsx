"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { useI18n } from "@/components/providers/I18nProvider";
import { smoothScrollTo } from "@/lib/smoothScroll";

export default function BrisaBahiaCaseStudy() {
  const { t } = useI18n();

  const results = t("caseStudyBrisaBahia.results.items") as unknown as string[];

  return (
    <>
      <Header />
      <main className="bg-white text-black">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0">
            <Image
              src="/case-studies/brisa-bahia/hero-devices.jpg"
              alt="Brisa Bahía website shown on multiple devices - desktop, tablet, and mobile"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="relative z-20 text-center text-white px-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-serif">
              {t("caseStudyBrisaBahia.hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              {t("caseStudyBrisaBahia.hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Project Intro */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 items-start mb-16">
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                  {t("caseStudyBrisaBahia.intro.heading")}
                </h2>
                <p className="text-lg leading-relaxed text-black/70">
                  {t("caseStudyBrisaBahia.intro.text1")}
                </p>
                <p className="text-lg leading-relaxed text-black/70">
                  {t("caseStudyBrisaBahia.intro.text2")}
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-black/50 uppercase tracking-wide mb-1">Client</p>
                  <p className="text-black/80">{t("caseStudyBrisaBahia.intro.client")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black/50 uppercase tracking-wide mb-1">Location</p>
                  <p className="text-black/80">{t("caseStudyBrisaBahia.intro.location")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black/50 uppercase tracking-wide mb-1">Services</p>
                  <p className="text-black/80">{t("caseStudyBrisaBahia.intro.services")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black/50 uppercase tracking-wide mb-1">Year</p>
                  <p className="text-black/80">{t("caseStudyBrisaBahia.intro.year")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Challenge */}
        <section className="py-24 px-6 bg-neutral-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8">
              {t("caseStudyBrisaBahia.challenge.heading")}
            </h2>
            <p className="text-lg leading-relaxed text-black/70 mb-12">
              {t("caseStudyBrisaBahia.challenge.text")}
            </p>

            {/* Before Images */}
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Image
                    src="/case-studies/brisa-bahia/before/starting-page-bahia-lodge.jpg"
                    alt="Old Bahía Lodge homepage - cluttered layout with generic hotel styling"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-lg w-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <Image
                    src="/case-studies/brisa-bahia/before/Bahia-Lodge-rooms-page-colombia.jpeg.jpg"
                    alt="Old Bahía Lodge rooms page - basic accommodation listing"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-lg w-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="max-w-[200px]">
                  <Image
                    src="/case-studies/brisa-bahia/before/logo-Bahia-Lodge-capurgana-colombia.jpeg"
                    alt="Old Bahía Lodge logo - generic text-based logo"
                    width={400}
                    height={200}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Goal */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8">
              {t("caseStudyBrisaBahia.goal.heading")}
            </h2>
            <p className="text-lg leading-relaxed text-black/70 mb-6">
              {t("caseStudyBrisaBahia.goal.text1")}
            </p>
            <p className="text-lg leading-relaxed text-black/70">
              {t("caseStudyBrisaBahia.goal.text2")}
            </p>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 px-6 bg-neutral-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              {t("caseStudyBrisaBahia.process.heading")}
            </h2>
            <p className="text-lg text-black/70 mb-16">
              {t("caseStudyBrisaBahia.process.subtitle")}
            </p>

            {/* Step 1: Brand Strategy */}
            <div className="mb-24">
              <h3 className="text-2xl font-semibold mb-6">
                {t("caseStudyBrisaBahia.process.step1.title")}
              </h3>
              <p className="text-black/70 leading-relaxed mb-8 max-w-3xl">
                {t("caseStudyBrisaBahia.process.step1.text")}
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Image
                    src="/case-studies/brisa-bahia/process/mind-map-stylized-branding.jpg"
                    alt="Brand strategy mindmap showing core values, audience insights, and positioning"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-lg w-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <Image
                    src="/case-studies/brisa-bahia/process/mind-map-stylized-website.jpg"
                    alt="Website strategy mindmap outlining structure and user flows"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-lg w-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Visual Identity */}
            <div className="mb-24">
              <h3 className="text-2xl font-semibold mb-6">
                {t("caseStudyBrisaBahia.process.step2.title")}
              </h3>
              <p className="text-black/70 leading-relaxed mb-8 max-w-3xl">
                {t("caseStudyBrisaBahia.process.step2.text")}
              </p>

              {/* Logo */}
              <div className="mb-12">
                <h4 className="text-lg font-medium mb-6 text-black/60">
                  {t("caseStudyBrisaBahia.branding.logo")}
                </h4>
                <div className="bg-white p-12 rounded-xl shadow-lg flex items-center justify-center">
                  <Image
                    src="/case-studies/brisa-bahia/branding/logo-main.png"
                    alt="New Brisa Bahía logo - organic shapes inspired by coastal waves and tropical leaves"
                    width={400}
                    height={200}
                    className="max-w-[300px] w-full"
                  />
                </div>
              </div>

              {/* Color Palette */}
              <div className="mb-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Image
                      src="/case-studies/brisa-bahia/branding/colors-before.jpg"
                      alt="Old color palette - limited, cold, disconnected colors"
                      width={800}
                      height={400}
                      className="rounded-xl shadow-lg w-full"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <p className="text-sm text-black/50 mt-3">
                      {t("caseStudyBrisaBahia.branding.colorsBefore")}
                    </p>
                  </div>
                  <div>
                    <Image
                      src="/case-studies/brisa-bahia/branding/color-palette.jpg"
                      alt="New color palette - warm earthy tones inspired by Colombian coast"
                      width={800}
                      height={400}
                      className="rounded-xl shadow-lg w-full"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <p className="text-sm text-black/50 mt-3">
                      {t("caseStudyBrisaBahia.branding.colorsAfter")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="mb-12">
                <Image
                  src="/case-studies/brisa-bahia/process/typography-presenting.jpg"
                  alt="Typography system showing elegant serif headlines paired with clean sans-serif body text"
                  width={1200}
                  height={600}
                  className="rounded-xl shadow-lg w-full"
                  sizes="100vw"
                />
                <p className="text-sm text-black/50 mt-3">
                  {t("caseStudyBrisaBahia.branding.typography")}
                </p>
              </div>

              {/* Iconography */}
              <div>
                <h4 className="text-lg font-medium mb-6 text-black/60">
                  {t("caseStudyBrisaBahia.branding.icons")}
                </h4>
                <Image
                  src="/case-studies/brisa-bahia/branding/Iconography-Brisa-Bahia-retreat-center-colombia.jpg"
                  alt="Custom icon set for Brisa Bahía - nature-inspired icons for services and amenities"
                  width={1200}
                  height={600}
                  className="rounded-xl shadow-lg w-full"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Step 3: UX & Wireframes */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                {t("caseStudyBrisaBahia.process.step3.title")}
              </h3>
              <p className="text-black/70 leading-relaxed mb-8 max-w-3xl">
                {t("caseStudyBrisaBahia.process.step3.text")}
              </p>
              <Image
                src="/case-studies/brisa-bahia/process/wireframes-desktop.jpg"
                alt="Desktop wireframes showing the new website structure and page layouts"
                width={1400}
                height={800}
                className="rounded-xl shadow-lg w-full"
                sizes="100vw"
              />
            </div>
          </div>
        </section>

        {/* Results: Before & After */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              {t("caseStudyBrisaBahia.results.heading")}
            </h2>
            <p className="text-lg text-black/70 mb-16">
              {t("caseStudyBrisaBahia.results.subtitle")}
            </p>

            <div className="space-y-16">
              {/* Homepage Comparison */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-medium text-black/50 mb-3">Before</p>
                  <Image
                    src="/case-studies/brisa-bahia/before/starting-page-bahia-lodge.jpg"
                    alt="Old Bahía Lodge homepage"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-lg w-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent mb-3">After</p>
                  <Image
                    src="/case-studies/brisa-bahia/after/starting-page-brisa-bahia.jpg"
                    alt="New Brisa Bahía homepage - clean, emotional, story-driven"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-lg w-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Facilities Page */}
              <div>
                <Image
                  src="/case-studies/brisa-bahia/after/facility-page-brisa-bahia.jpg"
                  alt="New Brisa Bahía facilities page - showcasing the retreat space for facilitators"
                  width={1400}
                  height={800}
                  className="rounded-xl shadow-lg w-full"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Outcomes */}
            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {Array.isArray(results) && results.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-accent mt-1 text-lg">✓</span>
                  <span className="text-black/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-24 px-6 bg-neutral-50">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-serif italic text-black/80 mb-8 leading-relaxed">
              &ldquo;{t("caseStudyBrisaBahia.testimonial.quote")}&rdquo;
            </blockquote>
            <div className="space-y-2">
              <p className="font-semibold text-black">
                {t("caseStudyBrisaBahia.testimonial.author")}
              </p>
              <p className="text-black/60">
                {t("caseStudyBrisaBahia.testimonial.role")}
              </p>
              <p className="text-sm text-black/40 mt-4">
                {t("caseStudyBrisaBahia.testimonial.translatorNote")}{" "}
                <a href="#" className="underline hover:text-accent">
                  {t("caseStudyBrisaBahia.testimonial.viewOriginal")}
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Masonry Gallery */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-center">
              {t("caseStudyBrisaBahia.gallery.heading")}
            </h2>
            <p className="text-lg text-black/70 mb-16 text-center max-w-2xl mx-auto">
              {t("caseStudyBrisaBahia.gallery.subtitle")}
            </p>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              <div className="break-inside-avoid">
                <Image
                  src="/case-studies/brisa-bahia/gallery/About-us-presentation.jpg"
                  alt="Brand presentation showing company story and values"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg w-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="break-inside-avoid">
                <Image
                  src="/case-studies/brisa-bahia/gallery/Logo-gap-guide-brisabahia.jpg"
                  alt="Logo spacing and clear space guidelines"
                  width={600}
                  height={800}
                  className="rounded-xl shadow-lg w-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="break-inside-avoid">
                <Image
                  src="/case-studies/brisa-bahia/gallery/guidelines-page-3.jpg"
                  alt="Brand guidelines page showing color applications"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg w-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="break-inside-avoid">
                <Image
                  src="/case-studies/brisa-bahia/gallery/guidelines-page-5.jpg"
                  alt="Brand guidelines page showing typography usage"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg w-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="break-inside-avoid">
                <Image
                  src="/case-studies/brisa-bahia/gallery/mockup-picture-Logo.jpg"
                  alt="Logo mockup in real-world application"
                  width={600}
                  height={600}
                  className="rounded-xl shadow-lg w-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0">
            <Image
              src="/case-studies/brisa-bahia/hero-devices.jpg"
              alt="Brisa Bahía retreat branding"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="relative z-20 max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              {t("caseStudyBrisaBahia.cta.heading")}
            </h2>
            <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto">
              {t("caseStudyBrisaBahia.cta.text")}
            </p>
            <a
              href="https://calendly.com/well-edge-creative/30min"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary text-lg px-10 py-4 inline-block"
            >
              {t("caseStudyBrisaBahia.cta.button")}
            </a>
          </div>
        </section>

        {/* Back Link */}
        <section className="py-12 px-6 bg-neutral-100">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/#selected-projects"
              className="text-accent hover:underline font-medium"
            >
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
