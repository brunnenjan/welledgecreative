'use client';

export default function ServicesSection() {
  // Section scrolls up naturally after hero pin ends

  return (
    <section
      id="leistungen"
      className="relative z-[60] bg-background text-foreground scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        {/* Services Header */}
        <header className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-accent mb-6">
            Services
          </h2>
          <p className="max-w-3xl text-foreground/70 text-lg md:text-xl leading-relaxed">
            From initial idea to finished website I guide you with clear strategy, strong design,
            and technical excellence. My story-first, mobile-first approach ensures your brand stands out.
          </p>
        </header>

        {/* Service Offerings */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8">
            What I Offer
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Strategy Sprint */}
            <article className="rounded-2xl border border-foreground/20 p-6 hover:border-accent/50 transition-colors">
              <h4 className="text-xl font-semibold mb-3">Strategy Sprint</h4>
              <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                Clarify your brand positioning and create a roadmap for growth. Perfect for startups and businesses needing strategic direction.
              </p>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Brand positioning & messaging framework</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Content map + homepage wireframe</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>3-6 month implementation roadmap</span>
                </li>
              </ul>
              <p className="mt-6 text-accent font-semibold">From €1,200</p>
            </article>

            {/* Brand Essentials */}
            <article className="rounded-2xl border border-foreground/20 p-6 hover:border-accent/50 transition-colors">
              <h4 className="text-xl font-semibold mb-3">Brand Essentials</h4>
              <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                Build a cohesive visual identity that tells your story. From logo to brand guidelines, everything you need to stand out.
              </p>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Logo suite with variations, colors & typography</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Brand kit for social media & documents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Key brand visuals & style guide</span>
                </li>
              </ul>
              <p className="mt-6 text-accent font-semibold">From €2,800</p>
            </article>

            {/* Launch Website */}
            <article className="rounded-2xl border border-foreground/20 p-6 hover:border-accent/50 transition-colors">
              <h4 className="text-xl font-semibold mb-3">Launch Website</h4>
              <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                Modern, fast, and conversion-focused websites built with Next.js. Optimized for performance and search engines.
              </p>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>3–5 custom pages built with Next.js</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Smooth GSAP animations & parallax effects</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Mobile-first design, on-page SEO & analytics</span>
                </li>
              </ul>
              <p className="mt-6 text-accent font-semibold">From €4,500</p>
            </article>
          </div>
        </div>

        {/* Additional Services Info */}
        <div className="mt-12 rounded-2xl border border-foreground/20 p-6">
          <h3 className="text-xl font-bold">Also working with Startups & SMBs</h3>
          <p className="mt-2 text-foreground/70">
            Same process, adapted to your stage. Tell me your goals — I&apos;ll shape the scope and timeline with you.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <a
            href="https://calendly.com/well-edge-creative/30min"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary inline-block text-lg"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
}
