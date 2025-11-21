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
          <Image
            src="/case-studies/brisa-bahia/hero.jpg"
            alt="Brisa Bahía retreat center"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 text-center text-white px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Brisa Bahía — Giving a Hidden Retreat Center a Clear Identity and a Digital Presence
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Brand Identity · UX Structure · Website Design · Retreat Positioning
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center mb-12">
            <div className="md:col-span-2">
              <p className="text-lg md:text-xl leading-relaxed text-black/80">
                Brisa Bahía is a retreat center on the secluded north coast of Colombia. When I stepped into the project, they were still using the website from the previous owner — outdated, misaligned, and targeting the wrong audience. My role was to bring their true retreat vision to life through a complete rebrand and a new website built from scratch.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/case-studies/brisa-bahia/branding/logo-main.png"
                alt="Brisa Bahía logo"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/case-studies/brisa-bahia/gallery/gallery-01.jpg"
              alt="Brisa Bahía atmosphere"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-64"
            />
            <Image
              src="/case-studies/brisa-bahia/gallery/gallery-04.jpg"
              alt="Brisa Bahía detail"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-64"
            />
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The Challenge</h2>
          <p className="text-lg leading-relaxed text-black/80 mb-12">
            Brisa Bahía was transitioning from a simple guesthouse to a holistic retreat center, but their digital presence still communicated something entirely different. There was no identity, no structure, and no visibility. Without a website that reflected their new purpose, they had no way to reach facilitators or communicate what makes their space special.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-black/60 mb-2">Before</p>
              <Image
                src="/case-studies/brisa-bahia/before/old-homepage.jpg"
                alt="Old Brisa Bahía homepage"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-black/60 mb-2">Before</p>
              <Image
                src="/case-studies/brisa-bahia/before/old-rooms.jpg"
                alt="Old Brisa Bahía rooms page"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Goal Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The Goal</h2>
          <p className="text-lg leading-relaxed text-black/80 mb-12">
            Our goal was to create a brand, a structure, and a website that express what Brisa Bahía truly is — a place for retreat facilitators, wellness teachers, and conscious travelers. We wanted a digital home that feels like the retreat itself: warm, natural, and meaningful.
          </p>
          <Image
            src="/case-studies/brisa-bahia/branding/color-palette.png"
            alt="Brisa Bahía color palette"
            width={800}
            height={400}
            className="rounded-lg object-contain w-full"
          />
        </div>
      </section>

      {/* Branding Transformation Section */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The Brand Transformation</h2>

          {/* Why Rebrand */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Why a Complete Rebrand Was Essential</h3>
            <p className="text-lg leading-relaxed text-black/80 mb-4">
              The old identity was generic and forgettable — a simple text logo with no visual character. It communicated nothing about the retreat&apos;s values, location, or the transformative experiences it offers. Worse, it attracted the wrong audience: tourists looking for cheap beach accommodations rather than facilitators seeking a meaningful space for their retreats.
            </p>
            <p className="text-lg leading-relaxed text-black/80">
              We needed a brand that would instantly communicate Brisa Bahía&apos;s positioning: a premium, nature-connected retreat center for wellness professionals and conscious travelers. Every element — from the logo to the color palette — had to work together to tell this story.
            </p>
          </div>

          {/* Brand Strategy */}
          <div className="mb-12 p-6 bg-white rounded-lg border border-neutral-200">
            <h3 className="text-xl font-semibold mb-4">The Brand Strategy</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="font-medium text-accent mb-2">Positioning</p>
                <p className="text-sm text-black/70">Premium retreat space for facilitators and wellness teachers seeking authentic Colombian coastal experiences.</p>
              </div>
              <div>
                <p className="font-medium text-accent mb-2">Tone</p>
                <p className="text-sm text-black/70">Warm, grounded, peaceful. Professional yet approachable. Nature-connected without being cliché.</p>
              </div>
              <div>
                <p className="font-medium text-accent mb-2">Audience</p>
                <p className="text-sm text-black/70">Retreat facilitators, yoga teachers, wellness practitioners looking to host transformative experiences.</p>
              </div>
            </div>
          </div>

          {/* Logo Before/After */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-4">Logo Evolution</h3>
            <p className="text-black/80 mb-6">
              The new logo needed to be more than just pretty — it had to encapsulate the retreat&apos;s essence. We drew inspiration from the coastal breeze (&quot;brisa&quot;), the bay (&quot;bahía&quot;), and the organic shapes found in nature. The result is a mark that feels both grounded and flowing, professional yet warm.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-lg border border-neutral-200">
                <p className="text-sm font-medium text-black/60 mb-4">Before</p>
                <div className="flex items-center justify-center h-32">
                  <Image
                    src="/case-studies/brisa-bahia/branding/logo-before.png"
                    alt="Old Brisa Bahía logo - generic text"
                    width={250}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-black/60 mt-4 text-center">Generic text logo with no personality</p>
              </div>
              <div className="bg-white p-8 rounded-lg border-2 border-accent/30">
                <p className="text-sm font-medium text-accent mb-4">After</p>
                <div className="flex items-center justify-center h-32">
                  <Image
                    src="/case-studies/brisa-bahia/branding/logo-main.png"
                    alt="New Brisa Bahía logo"
                    width={250}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-black/60 mt-4 text-center">Custom mark inspired by coastal waves and natural forms</p>
              </div>
            </div>
          </div>

          {/* Color Palette Comparison */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-4">Color Palette</h3>
            <p className="text-black/80 mb-6">
              Colors set the emotional tone of a brand. The old palette was cold and disconnected — it could have belonged to any business. The new palette is rooted in Brisa Bahía&apos;s environment: the warm sand, tropical foliage, ocean tones, and golden sunsets. These colors evoke the feelings guests experience when they arrive: calm, connected, and inspired.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-black/60 mb-4">Before</p>
                <Image
                  src="/case-studies/brisa-bahia/branding/colors-before.png"
                  alt="Old color palette - limited and generic"
                  width={600}
                  height={200}
                  className="rounded-lg object-contain w-full bg-white p-4"
                />
                <p className="text-sm text-black/60 mt-2">Limited palette with no cohesion</p>
              </div>
              <div>
                <p className="text-sm font-medium text-accent mb-4">After</p>
                <Image
                  src="/case-studies/brisa-bahia/branding/color-palette.png"
                  alt="New color palette - warm, natural, cohesive"
                  width={600}
                  height={200}
                  className="rounded-lg object-contain w-full bg-white p-4"
                />
                <p className="text-sm text-black/60 mt-2">Warm, earthy tones inspired by the Colombian coast</p>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-4">Typography System</h3>
            <p className="text-black/80 mb-6">
              Typography carries the voice of a brand. We paired an elegant serif for headlines — warm and timeless — with a clean sans-serif for body text that ensures readability across all devices. Together, they strike the balance between premium feel and approachable clarity that Brisa Bahía needed.
            </p>
            <Image
              src="/case-studies/brisa-bahia/branding/typography.png"
              alt="Brisa Bahía typography system"
              width={800}
              height={400}
              className="rounded-lg object-contain w-full bg-white p-6"
            />
          </div>

          {/* Brand Applications */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Brand in Action</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Image
                src="/case-studies/brisa-bahia/branding/mockup-business-card.jpg"
                alt="Business card mockup"
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-48"
              />
              <Image
                src="/case-studies/brisa-bahia/branding/mockup-social.jpg"
                alt="Social media mockup"
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-48"
              />
              <Image
                src="/case-studies/brisa-bahia/branding/mockup-signage.jpg"
                alt="Signage mockup"
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-48 col-span-2 md:col-span-1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">The Process</h2>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">1. Brand Strategy</h3>
                <p className="text-black/80 leading-relaxed">
                  We defined the core identity, the values, and the true target audience of Brisa Bahía — retreat facilitators seeking a peaceful, inspiring space.
                </p>
              </div>
              <Image
                src="/case-studies/brisa-bahia/process/mindmap.jpg"
                alt="Brand strategy mindmap"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full"
              />
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Image
                src="/case-studies/brisa-bahia/branding/icons.png"
                alt="Brisa Bahía icon system"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full md:order-1"
              />
              <div className="md:order-2">
                <h3 className="text-xl font-semibold mb-4">2. Branding System</h3>
                <p className="text-black/80 leading-relaxed">
                  I created a complete brand identity: logo, color palette, typography, icon system, and a visual direction inspired by nature.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">3. UX & Structure</h3>
                <p className="text-black/80 leading-relaxed">
                  We redesigned the entire information architecture: retreats, facilities, food, accommodation, experiences, and the inquiry process.
                </p>
              </div>
              <Image
                src="/case-studies/brisa-bahia/process/wireframes-desktop.jpg"
                alt="Desktop wireframes"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full"
              />
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Image
                src="/case-studies/brisa-bahia/process/ui-elements.jpg"
                alt="UI elements"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full md:order-1"
              />
              <div className="md:order-2">
                <h3 className="text-xl font-semibold mb-4">4. Website Design & Development</h3>
                <p className="text-black/80 leading-relaxed">
                  I built the new website from scratch with modern UI, clean UX, emotional storytelling, and a strong visual identity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Before & After</h2>

          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-black/60 mb-2">Before</p>
                <Image
                  src="/case-studies/brisa-bahia/before/old-homepage.jpg"
                  alt="Old homepage"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-accent mb-2">After</p>
                <Image
                  src="/case-studies/brisa-bahia/after/homepage-new.jpg"
                  alt="New homepage"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-black/60 mb-2">Before</p>
                <Image
                  src="/case-studies/brisa-bahia/before/old-gallery.jpg"
                  alt="Old gallery"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-accent mb-2">After</p>
                <Image
                  src="/case-studies/brisa-bahia/after/hosting-retreats.jpg"
                  alt="New hosting section"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The Results</h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">✓</span>
                <span className="text-black/80">A clear and cohesive brand identity.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">✓</span>
                <span className="text-black/80">Website traffic increased immediately after launch.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">✓</span>
                <span className="text-black/80">First retreat inquiries and bookings through the new site.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">✓</span>
                <span className="text-black/80">Facilitators from abroad started reaching out.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">✓</span>
                <span className="text-black/80">Full-center rentals became possible.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">✓</span>
                <span className="text-black/80">The center now has visibility in the international retreat world.</span>
              </li>
            </ul>

            <Image
              src="/case-studies/brisa-bahia/after/rooms-new.jpg"
              alt="New rooms section"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Gallery</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Image
              src="/case-studies/brisa-bahia/gallery/gallery-01.jpg"
              alt="Gallery image 1"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 md:h-64"
            />
            <Image
              src="/case-studies/brisa-bahia/gallery/gallery-02.jpg"
              alt="Gallery image 2"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 md:h-64"
            />
            <Image
              src="/case-studies/brisa-bahia/gallery/gallery-03.jpg"
              alt="Gallery image 3"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 md:h-64"
            />
            <Image
              src="/case-studies/brisa-bahia/gallery/gallery-04.jpg"
              alt="Gallery image 4"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 md:h-64"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/case-studies/brisa-bahia/gallery/gallery-04.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-20 max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Create a Meaningful Digital Identity for Your Retreat
          </h2>
          <p className="text-lg text-white/90 mb-8">
            If you&apos;re building a retreat center or wellness space and want a brand and website that clearly communicate your vision, I&apos;d be happy to help you bring it to life.
          </p>
          <button
            onClick={() => smoothScrollTo("contact-section")}
            className="btn btn-primary text-lg px-8 py-4"
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
