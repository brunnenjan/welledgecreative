// src/components/ForegroundLayerParallax.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { getGsap } from '@/lib/gsap';

type Props = {
  fgSrc: string;       // e.g. "/foreground_layer_2.png"
  heightVh?: number;   // 100 = full height
  fgSpeed?: number;    // 1.0 = normal, >1 scrolls faster upward
  fgDelta?: number;    // total yPercent shift (negative = up)
  ariaLabel?: string;
  className?: string;
};

export default function ForegroundLayerParallax({
  fgSrc,
  heightVh = 100,
  fgSpeed = 1.5,
  fgDelta = -30,
  ariaLabel,
  className = '',
}: Props) {
  const wrap = useRef<HTMLElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap?.() ?? {};
    if (!wrap.current || !fgRef.current || !gsap || !ScrollTrigger) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.to(fgRef.current, {
        yPercent: fgDelta * fgSpeed,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, [fgDelta, fgSpeed]);

  return (
    <section
      ref={wrap}
      className={`relative overflow-hidden bg-white ${className}`}
      style={{ height: `${heightVh}vh`, minHeight: '560px' }}
      aria-label={ariaLabel}
    >
      <div
        ref={fgRef}
        className="absolute inset-0 z-10 grid place-items-center will-change-transform"
      >
        <Image
          src={fgSrc}
          alt="" // decorative
          width={1800}
          height={900}
          className="w-[92vw] max-w-6xl h-auto"
        />
      </div>
    </section>
  );
}
