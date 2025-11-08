// src/components/SpacerParallaxSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { getGsap } from '@/lib/gsap';

type Props = {
  /** Total scroll distance of this spacer section (acts like vertical gap) */
  distance?: number;             // default 720
  /** Background image (fills the section) */
  bgSrc: string;
  /** Optional foreground mask image (white overlay with cutout) */
  fgSrc?: string;

  /** Should the foreground mask render? */
  showFg?: boolean;              // default true

  /** Optional mid image (bucket/profile/etc.). Only renders if showMid === true AND midSrc provided */
  showMid?: boolean;             // default false
  midSrc?: string;
  midW?: number;
  midH?: number;

  /** Parallax strengths per layer (in yPercent; negative moves upward) */
  bgY?: number;                  // default -8..-10 feels nice
  midY?: number;                 // default ~20
  fgY?: number;                  // default ~36

  /** Optional centered content on top of everything (e.g., a headline) */
  children?: React.ReactNode;
};

export default function SpacerParallaxSection({
  distance = 720,
  bgSrc,
  fgSrc,
  showFg = true,
  showMid = false,
  midSrc,
  midW = 340,
  midH = 440,
  bgY = -8,
  midY = 20,
  fgY = 36,
  children,
}: Props) {
  const wrap = useRef<HTMLElement>(null);
  const spacer = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    if (!wrap.current) return;

    // Accessibility: respect reduced motion
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    // Define the section's scroll length explicitly (no pinSpacing)
    if (spacer.current) spacer.current.style.height = `${distance}px`;

    const ctx = gsap.context(() => {
      // Pin section without auto spacing; spacing stays under the spacer div
      ScrollTrigger.create({
        trigger: wrap.current,
        start: 'top top',
        end: () => `+=${distance}`,
        pin: true,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // BG parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: bgY,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top top',
            end: () => `+=${distance}`,
            scrub: true,
          },
        });
      }

      // MID parallax (only if explicitly enabled AND source provided)
      if (showMid && midSrc && midRef.current) {
        gsap.to(midRef.current, {
          yPercent: midY,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top top',
            end: () => `+=${distance}`,
            scrub: true,
          },
        });
      }

      // FG parallax (only if requested and has a source)
      if (showFg && fgSrc && fgRef.current) {
        gsap.to(fgRef.current, {
          yPercent: fgY,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top top',
            end: () => `+=${distance}`,
            scrub: true,
          },
        });
      }
    }, wrap);

    return () => ctx.revert();
  }, [distance, bgY, midY, fgY, showMid, showFg, midSrc, fgSrc]);

  return (
    <section ref={wrap} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div ref={bgRef} className="absolute inset-0 -z-10">
          <Image src={bgSrc} alt="" fill sizes="100vw" className="object-cover" priority={false} />
        </div>

        {/* Optional MID (bucket/profile/whatever) — renders only if showMid && midSrc */}
        {showMid && midSrc ? (
          <div
            ref={midRef}
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 will-change-transform"
            style={{ width: midW, height: midH }}
            aria-hidden
          >
            <Image
              src={midSrc}
              alt=""
              width={midW}
              height={midH}
              className="select-none drop-shadow-xl"
            />
          </div>
        ) : null}

        {/* Optional Foreground mask */}
        {showFg && fgSrc ? (
          <div ref={fgRef} className="pointer-events-none absolute inset-0 z-20">
            <Image src={fgSrc} alt="" fill sizes="100vw" className="object-cover" />
          </div>
        ) : null}

        {/* Optional centered content (headline, etc.) */}
        {children ? (
          <div className="relative z-30 flex h-full items-center justify-center px-6">
            <div className="max-w-3xl text-center text-neutral-900">{children}</div>
          </div>
        ) : null}
      </div>

      {/* Defines the scroll distance (no automatic spacing) */}
      <div ref={spacer} />
    </section>
  );
}
