'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { getGsap } from '@/lib/gsap';
import { smoothScrollTo } from '@/lib/smoothScroll';

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    if (!root.current) return;

    // Scope animations to this section and auto-clean on unmount
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-title', { autoAlpha: 0, y: 20, duration: 0.8, ease: 'power2.out' })
        .from('.hero-sub',   { autoAlpha: 0, y: 12, duration: 0.6 }, '-=0.4')
        .from('.hero-cta',   { autoAlpha: 0,        duration: 0.4 }, '-=0.2');
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-20 md:grid-cols-2">
        <div>
          <h1 id="hero-title" className="hero-title text-4xl md:text-5xl font-bold tracking-tight">
            I go well deep.
          </h1>
          <p className="hero-sub mt-4 text-neutral-700 md:text-lg">
            Branding, Design & Websites – in die Tiefe gedacht.
          </p>
          <div className="hero-cta mt-6">
            <a
              href="#design-strategy"
              className="inline-flex items-center rounded-lg bg-black px-5 py-3 text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black"
              onClick={(event) => {
                event.preventDefault();
                smoothScrollTo('design-strategy');
              }}
            >
              Mehr erfahren
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full">
          <Image
            src="/assets/hero/hero-background.webp"
            alt="" /* decorative */
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
