'use client';

export default function About() {
  return (
    <section className="relative z-[60] bg-background text-foreground scroll-mt-16">
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-32 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-accent">
          About temporarily moved
        </h1>
        <p className="text-foreground/70 text-lg md:text-xl leading-relaxed">
          I&apos;m refreshing this section. In the meantime, explore the updated profile,
          process, and client stories on the homepage.
        </p>
      </div>
    </section>
  );
}

/*
Original content kept for quick restoration:

import { useEffect, useRef } from 'react';
import { getGsap } from '@/lib/gsap';

export function AboutLegacy() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    if (!root.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 40,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative z-[60] bg-background text-foreground scroll-mt-16">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <h2 className="reveal text-4xl md:text-5xl font-bold tracking-tight text-accent mb-6">About Me</h2>
        <p className="reveal mt-2 max-w-2xl text-foreground/70 text-lg md:text-xl leading-relaxed">
          I help brands tell a clear story – strategically, visually strong, and technically sound.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: 'Branding', text: 'Positioning, design systems, guidelines.' },
            { title: 'Websites', text: 'Next.js, performance, GSAP animations.' },
            { title: 'Consulting', text: 'Clear roadmaps, scalable processes.' },
          ].map((item) => (
            <div key={item.title} className="reveal rounded-2xl border border-foreground/20 p-6">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-foreground/70">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
*/
