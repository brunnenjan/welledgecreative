"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { smoothScrollTo } from "@/lib/smoothScroll";

export default function BrisaBahiaCaseStudy() {
  return (
    <>
      <Header />
      <main className="bg-white text-black">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0">
            <picture>
              <source
                srcSet="/case-studies/brisa-bahia/brisa-bahia hero.webp"
                type="image/webp"
              />
              <Image
                src="/case-studies/brisa-bahia/brisa-bahia hero.jpg"
                alt="Brisa Bahía retreat center overlooking the Caribbean coast of Colombia"
                fill
                className="object-cover"
                priority
              />
            </picture>
          </div>
          <div className="relative z-20 text-center text-white px-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-serif">
              Brisa Bahía — Retreat Center Rebrand & Website
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Brand Strategy · Visual Identity · UX Design · Website Development
            </p>
          </div>
        </section>

        {/* Project Intro */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 items-start mb-16">
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                  Giving a Hidden Retreat Center a Clear Identity
                </h2>
                <p className="text-lg leading-relaxed text-black/70">
                  Brisa Bahía is a retreat center on the secluded north coast of Colombia. When I joined the project, they were still using the website and branding from the previous owner — outdated, misaligned, and targeting the wrong audience.
                </p>
                <p className="text-lg leading-relaxed text-black/70">
                  My role was to bring their true retreat vision to life through a complete rebrand and a new website built from scratch.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-black/50 uppercase tracking-wide mb-1">Client</p>
                  <p className="text-black/80">Brisa Bahía</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black/50 uppercase tracking-wide mb-1">Location</p>
                  <p className="text-black/80">Capurganá, Colombia</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black/50 uppercase tracking-wide mb-1">Services</p>
                  <p className="text-black/80">Branding, Logo Design, Web Design, Development</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black/50 uppercase tracking-wide mb-1">Year</p>
                  <p className="text-black/80">2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Challenge */}
        <section className="py-24 px-6 bg-neutral-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8">The Challenge</h2>
            <p className="text-lg leading-relaxed text-black/70 mb-12">
              Brisa Bahía was transitioning from a simple guesthouse (&quot;Bahía Lodge&quot;) to a holistic retreat center, but their digital presence still communicated something entirely different. The old branding was generic, the website was cluttered, and there was no clear positioning for retreat facilitators.
            </p>

            {/* Before Images */}
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-black/60">The Old Brand & Website</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Image
                    src="/case-studies/brisa-bahia/before/starting-page-bahia-lodge.jpg"
                    alt="Old Bahía Lodge homepage - cluttered layout with generic hotel styling"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-lg w-full"
                  />
                  <p className="text-sm text-black/50 mt-3">Old Homepage</p>
                </div>
                <div>
                  <Image
                    src="/case-studies/brisa-bahia/before/Bahia-Lodge-rooms-page-colombia.jpeg.jpg"
                    alt="Old Bahía Lodge rooms page - basic accommodation listing"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-lg w-full"
                  />
                  <p className="text-sm text-black/50 mt-3">Old Rooms Page</p>
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
                  <p className="text-sm text-black/50 mt-3 text-center">Old Logo</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Goal */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8">The Goal</h2>
            <p className="text-lg leading-relaxed text-black/70 mb-6">
              Create a brand, structure, and website that express what Brisa Bahía truly is — a place for retreat facilitators, wellness teachers, and conscious travelers seeking a peaceful, inspiring space.
            </p>
            <p className="text-lg leading-relaxed text-black/70">
              The new digital presence had to feel like the retreat itself: warm, natural, and meaningful.
            </p>
          </div>
        </section>

        {/* Process: Brand Strategy */}
        <section className="py-24 px-6 bg-neutral-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">The Process</h2>
            <p className="text-lg text-black/70 mb-16">A structured approach from strategy to launch.</p>

            {/* Step 1: Brand Strategy */}
            <div className="mb-24">
              <h3 className="text-2xl font-semibold mb-6">1. Brand Strategy & Discovery</h3>
              <p className="text-black/70 leading-relaxed mb-8 max-w-3xl">
                We started with deep research into the retreat&apos;s values, target audience, and competitive landscape. Through collaborative workshops, we defined the core identity and positioning.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Image
                    src="/case-studies/brisa-bahia/process/mind-map-stylized-branding.jpg"
                    alt="Brand strategy mindmap showing core values, audience insights, and positioning"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-lg w-full"
                  />
                  <p className="text-sm text-black/50 mt-3">Branding Mind Map</p>
                </div>
                <div>
                  <Image
                    src="/case-studies/brisa-bahia/process/mind-map-stylized-website.jpg"
                    alt="Website strategy mindmap outlining structure and user flows"
                    width={800}
                    height={600}
                    className="rounded-xl shadow-lg w-full"
                  />
                  <p className="text-sm text-black/50 mt-3">Website Mind Map</p>
                </div>
              </div>
            </div>

            {/* Step 2: Visual Identity */}
            <div className="mb-24">
              <h3 className="text-2xl font-semibold mb-6">2. Visual Identity System</h3>
              <p className="text-black/70 leading-relaxed mb-8 max-w-3xl">
                The new identity needed to capture the essence of Brisa Bahía: the coastal breeze, natural elements, and the feeling of peaceful escape. Every element was designed to work together as a cohesive system.
              </p>

              {/* Logo */}
              <div className="mb-12">
                <h4 className="text-lg font-medium mb-6 text-black/60">Logo Design</h4>
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
                <h4 className="text-lg font-medium mb-6 text-black/60">Color Palette Evolution</h4>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Image
                      src="/case-studies/brisa-bahia/branding/colors-before.jpg"
                      alt="Old color palette - limited, cold, disconnected colors"
                      width={800}
                      height={400}
                      className="rounded-xl shadow-lg w-full"
                    />
                    <p className="text-sm text-black/50 mt-3">Before: Limited palette with no cohesion</p>
                  </div>
                  <div>
                    <Image
                      src="/case-studies/brisa-bahia/branding/color-palette.jpg"
                      alt="New color palette - warm earthy tones inspired by Colombian coast"
                      width={800}
                      height={400}
                      className="rounded-xl shadow-lg w-full"
                    />
                    <p className="text-sm text-black/50 mt-3">After: Warm, natural tones from the environment</p>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="mb-12">
                <h4 className="text-lg font-medium mb-6 text-black/60">Typography System</h4>
                <Image
                  src="/case-studies/brisa-bahia/process/typography-presenting.jpg"
                  alt="Typography system showing elegant serif headlines paired with clean sans-serif body text"
                  width={1200}
                  height={600}
                  className="rounded-xl shadow-lg w-full"
                />
                <p className="text-sm text-black/50 mt-3">Elegant serif headlines for warmth, clean sans-serif for readability</p>
              </div>

              {/* Iconography */}
              <div>
                <h4 className="text-lg font-medium mb-6 text-black/60">Custom Iconography</h4>
                <Image
                  src="/case-studies/brisa-bahia/branding/Iconography-Brisa-Bahia-retreat-center-colombia.jpg"
                  alt="Custom icon set for Brisa Bahía - nature-inspired icons for services and amenities"
                  width={1200}
                  height={600}
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </div>

            {/* Step 3: UX & Wireframes */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">3. UX Structure & Wireframes</h3>
              <p className="text-black/70 leading-relaxed mb-8 max-w-3xl">
                We redesigned the entire information architecture to clearly communicate the retreat&apos;s offerings: hosting retreats, facilities, food, accommodation, experiences, and the inquiry process.
              </p>
              <div>
                <picture>
                  <source
                    srcSet="/case-studies/brisa-bahia/process/wireframes-desktop.webp"
                    type="image/webp"
                  />
                  <Image
                    src="/case-studies/brisa-bahia/process/wireframes-desktop.jpg"
                    alt="Desktop wireframes showing the new website structure and page layouts"
                    width={1400}
                    height={800}
                    className="rounded-xl shadow-lg w-full"
                  />
                </picture>
                <p className="text-sm text-black/50 mt-3">Desktop Wireframes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Results: Before & After */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">The Results</h2>
            <p className="text-lg text-black/70 mb-16">A complete transformation of the digital presence.</p>

            <div className="space-y-16">
              {/* Homepage Comparison */}
              <div>
                <h3 className="text-xl font-semibold mb-8">Homepage Transformation</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm font-medium text-black/50 mb-3">Before</p>
                    <Image
                      src="/case-studies/brisa-bahia/before/starting-page-bahia-lodge.jpg"
                      alt="Old Bahía Lodge homepage"
                      width={800}
                      height={600}
                      className="rounded-xl shadow-lg w-full"
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
                    />
                  </div>
                </div>
              </div>

              {/* Facilities Page */}
              <div>
                <h3 className="text-xl font-semibold mb-8">Facilities & Hosting Page</h3>
                <Image
                  src="/case-studies/brisa-bahia/after/facility-page-brisa-bahia.jpg"
                  alt="New Brisa Bahía facilities page - showcasing the retreat space for facilitators"
                  width={1400}
                  height={800}
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-24 px-6 bg-neutral-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-12">Impact & Outcomes</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 text-lg">✓</span>
                  <span className="text-black/70">Clear, cohesive brand identity that stands out</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 text-lg">✓</span>
                  <span className="text-black/70">Website traffic increased immediately after launch</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 text-lg">✓</span>
                  <span className="text-black/70">First retreat inquiries through the new site</span>
                </li>
              </ul>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 text-lg">✓</span>
                  <span className="text-black/70">International facilitators started reaching out</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 text-lg">✓</span>
                  <span className="text-black/70">Full-center rentals became possible</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1 text-lg">✓</span>
                  <span className="text-black/70">Visibility in the international retreat world</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Brand Guidelines Gallery */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-center">Brand Guidelines & Assets</h2>
            <p className="text-lg text-black/70 mb-16 text-center max-w-2xl mx-auto">
              A comprehensive brand system delivered with full guidelines for consistent application.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <Image
                src="/case-studies/brisa-bahia/gallery/About-us-presentation.jpg"
                alt="Brand presentation showing company story and values"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-auto"
              />
              <Image
                src="/case-studies/brisa-bahia/gallery/Logo-gap-guide-brisabahia.jpg"
                alt="Logo spacing and clear space guidelines"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-auto"
              />
              <Image
                src="/case-studies/brisa-bahia/gallery/Guidelines_Brisa Bahia (1)_Page_3.jpg"
                alt="Brand guidelines page showing color applications"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-auto"
              />
              <Image
                src="/case-studies/brisa-bahia/gallery/Guidelines_Brisa Bahia (1)_Page_5.jpg"
                alt="Brand guidelines page showing typography usage"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-auto"
              />
              <Image
                src="/case-studies/brisa-bahia/gallery/mockup-picture-Logo.jpg"
                alt="Logo mockup in real-world application"
                width={600}
                height={400}
                className="rounded-xl shadow-lg w-full h-auto col-span-2 md:col-span-2"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0">
            <Image
              src="/case-studies/brisa-bahia/brisa-bahia hero.jpg"
              alt="Brisa Bahía retreat atmosphere"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-20 max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              Ready to Transform Your Retreat&apos;s Presence?
            </h2>
            <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto">
              If you&apos;re building a retreat center or wellness space and want a brand and website that clearly communicate your vision, let&apos;s talk.
            </p>
            <button
              onClick={() => smoothScrollTo("contact-section")}
              className="btn btn-primary text-lg px-10 py-4"
            >
              Start Your Project
            </button>
          </div>
        </section>

        {/* Back Link */}
        <section className="py-12 px-6 bg-neutral-100">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/#selected-projects"
              className="text-accent hover:underline font-medium"
            >
              ← Back to all projects
            </Link>
          </div>
        </section>
      </main>
      <ContactSection />
      <Footer />
    </>
  );
}
