"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { useI18n } from "@/components/providers/I18nProvider";

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
              src="/case-studies/brisa-bahia/hero-devices.webp"
              alt="Brisa Bahía website displayed on desktop, tablet, and mobile devices showcasing the complete rebrand"
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
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {t("caseStudyBrisaBahia.hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Results / Success Highlights - FIRST */}
        <section className="py-24 px-6 bg-neutral-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              {t("caseStudyBrisaBahia.results.heading")}
            </h2>
            <p className="text-xl text-accent font-medium mb-12">
              {t("caseStudyBrisaBahia.results.subtitle")}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {Array.isArray(results) && results.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-accent mt-1 text-lg flex-shrink-0">✓</span>
                  <span className="text-black/70">{item}</span>
                </div>
              ))}
            </div>

            {/* Client Quote Highlight */}
            <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-accent">
              <p className="text-xl font-serif italic text-black/80 mb-2">
                {t("caseStudyBrisaBahia.results.clientFeedback")}
              </p>
              <p className="text-black/60 text-sm">
                {t("caseStudyBrisaBahia.results.clientName")}
              </p>
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 items-start">
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                  {t("caseStudyBrisaBahia.overview.heading")}
                </h2>
                <p className="text-lg leading-relaxed text-black/70">
                  {t("caseStudyBrisaBahia.overview.text")}
                </p>
                <p className="text-lg leading-relaxed text-black/80 font-medium">
                  {t("caseStudyBrisaBahia.overview.transformation")}
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-black/50 uppercase tracking-wide mb-1">Client</p>
                  <p className="text-black/80">{t("caseStudyBrisaBahia.overview.client")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black/50 uppercase tracking-wide mb-1">Location</p>
                  <p className="text-black/80">{t("caseStudyBrisaBahia.overview.location")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black/50 uppercase tracking-wide mb-1">Services</p>
                  <p className="text-black/80">{t("caseStudyBrisaBahia.overview.services")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black/50 uppercase tracking-wide mb-1">Year</p>
                  <p className="text-black/80">{t("caseStudyBrisaBahia.overview.year")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Process */}
        <section className="py-24 px-6 bg-neutral-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              {t("caseStudyBrisaBahia.process.heading")}
            </h2>
            <p className="text-lg text-black/70 mb-16">
              {t("caseStudyBrisaBahia.process.subtitle")}
            </p>

            {/* Discovery & Strategy */}
            <div className="mb-20">
              <h3 className="text-2xl font-semibold mb-6">
                {t("caseStudyBrisaBahia.process.discovery.title")}
              </h3>
              <p className="text-black/70 leading-relaxed mb-8 max-w-3xl">
                {t("caseStudyBrisaBahia.process.discovery.text")}
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Image
                    src="/case-studies/brisa-bahia/process/mind-map-stylized-branding.webp"
                    alt="Brand strategy mindmap showing core values, audience insights, and competitive positioning"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-lg w-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <Image
                    src="/case-studies/brisa-bahia/process/mind-map-stylized-website.webp"
                    alt="Website strategy mindmap outlining information architecture and user flows"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-lg w-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Naming & Storytelling */}
            <div className="mb-20">
              <h3 className="text-2xl font-semibold mb-6">
                {t("caseStudyBrisaBahia.process.naming.title")}
              </h3>
              <p className="text-black/70 leading-relaxed max-w-3xl">
                {t("caseStudyBrisaBahia.process.naming.text")}
              </p>
            </div>

            {/* Visual Identity */}
            <div className="mb-20">
              <h3 className="text-2xl font-semibold mb-6">
                {t("caseStudyBrisaBahia.process.identity.title")}
              </h3>
              <p className="text-black/70 leading-relaxed mb-8 max-w-3xl">
                {t("caseStudyBrisaBahia.process.identity.text")}
              </p>

              {/* Logo */}
              <div className="mb-12">
                <h4 className="text-lg font-medium mb-6 text-black/60">
                  {t("caseStudyBrisaBahia.branding.logo")}
                </h4>
                <div className="bg-white p-12 rounded-xl shadow-lg flex items-center justify-center">
                  <Image
                    src="/case-studies/brisa-bahia/branding/logo-main.webp"
                    alt="New Brisa Bahía logo featuring organic shapes inspired by coastal waves and tropical leaves"
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
                      src="/case-studies/brisa-bahia/branding/colors-before.webp"
                      alt="Old color palette showing limited, cold, disconnected colors"
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
                      src="/case-studies/brisa-bahia/branding/color-palette.webp"
                      alt="New color palette with warm earthy tones inspired by Colombian coast"
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
                  src="/case-studies/brisa-bahia/process/typography-presenting.webp"
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
                  src="/case-studies/brisa-bahia/branding/Iconography-Brisa-Bahia-retreat-center-colombia.webp"
                  alt="Custom icon set for Brisa Bahía featuring nature-inspired icons for services and amenities"
                  width={1200}
                  height={600}
                  className="rounded-xl shadow-lg w-full"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* UX & Web Design */}
            <div className="mb-20">
              <h3 className="text-2xl font-semibold mb-6">
                {t("caseStudyBrisaBahia.process.uxWeb.title")}
              </h3>
              <p className="text-black/70 leading-relaxed mb-8 max-w-3xl">
                {t("caseStudyBrisaBahia.process.uxWeb.text")}
              </p>
              <Image
                src="/case-studies/brisa-bahia/process/wireframes-desktop.webp"
                alt="Desktop wireframes showing the new website structure, page layouts, and user flow"
                width={1400}
                height={800}
                className="rounded-xl shadow-lg w-full"
                sizes="100vw"
              />
            </div>

            {/* Implementation */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                {t("caseStudyBrisaBahia.process.implementation.title")}
              </h3>
              <p className="text-black/70 leading-relaxed max-w-3xl">
                {t("caseStudyBrisaBahia.process.implementation.text")}
              </p>
            </div>
          </div>
        </section>

        {/* The Challenge - MOVED DOWN */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8">
              {t("caseStudyBrisaBahia.challenge.heading")}
            </h2>
            <p className="text-lg leading-relaxed text-black/70 mb-12">
              {t("caseStudyBrisaBahia.challenge.text")}
            </p>

            {/* Before Images */}
            <div className="space-y-8">
              <p className="text-sm font-medium text-black/50 uppercase tracking-wide">Before</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Image
                    src="/case-studies/brisa-bahia/before/starting-page-bahia-lodge.webp"
                    alt="Old Bahía Lodge homepage with cluttered layout and generic hotel styling"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-lg w-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <Image
                    src="/case-studies/brisa-bahia/before/Bahia-Lodge-rooms-page-colombia.jpeg.webp"
                    alt="Old Bahía Lodge rooms page with basic accommodation listing style"
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
                    src="/case-studies/brisa-bahia/before/logo-Bahia-Lodge-capurgana-colombia.webp"
                    alt="Old Bahía Lodge logo with generic text-based design"
                    width={400}
                    height={200}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Results: After */}
        <section className="py-24 px-6 bg-neutral-50">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm font-medium text-accent uppercase tracking-wide mb-8">After</p>

            <div className="space-y-16">
              {/* Homepage */}
              <div>
                <Image
                  src="/case-studies/brisa-bahia/after/starting-page-brisa-bahia.webp"
                  alt="New Brisa Bahía homepage with clean, emotional, story-driven design"
                  width={1400}
                  height={800}
                  className="rounded-xl shadow-lg w-full"
                  sizes="100vw"
                />
              </div>

              {/* Facilities Page */}
              <div>
                <Image
                  src="/case-studies/brisa-bahia/after/facility-page-brisa-bahia.webp"
                  alt="New Brisa Bahía facilities page showcasing the retreat space for facilitators"
                  width={1400}
                  height={800}
                  className="rounded-xl shadow-lg w-full"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Final Showcase / Gallery */}
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
                  src="/case-studies/brisa-bahia/gallery/About-us-presentation.webp"
                  alt="Brand presentation slide showing company story, values, and mission"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg w-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="break-inside-avoid">
                <Image
                  src="/case-studies/brisa-bahia/gallery/Logo-gap-guide-brisabahia.webp"
                  alt="Logo spacing guidelines showing clear space rules and minimum sizes"
                  width={600}
                  height={800}
                  className="rounded-xl shadow-lg w-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="break-inside-avoid">
                <Image
                  src="/case-studies/brisa-bahia/gallery/guidelines-page-3.webp"
                  alt="Brand guidelines page demonstrating color applications across materials"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg w-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="break-inside-avoid">
                <Image
                  src="/case-studies/brisa-bahia/gallery/guidelines-page-5.webp"
                  alt="Brand guidelines page showing typography usage and hierarchy"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg w-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="break-inside-avoid">
                <Image
                  src="/case-studies/brisa-bahia/gallery/mockup-picture-Logo.webp"
                  alt="Logo mockup showing real-world application on signage"
                  width={600}
                  height={600}
                  className="rounded-xl shadow-lg w-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
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

        {/* CTA Section */}
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0">
            <Image
              src="/case-studies/brisa-bahia/hero-devices.webp"
              alt="Brisa Bahía retreat branding and website on multiple devices"
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
