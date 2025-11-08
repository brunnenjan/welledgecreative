"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";

const ASSETS = {
  background: "/assets/hero/hero-background.webp",
  foreground: "/assets/hero/hero-foreground-desktop.webp",
  bucket: "/assets/hero/hero-bucket.webp",
} as const;

export default function HeroParallaxClassic() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!gsap || !ScrollTrigger) {
      return;
    }

    const section = sectionRef.current;
    const background = backgroundRef.current;
    const bucket = bucketRef.current;

    if (!section || !background || !bucket) {
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          markers: process.env.NODE_ENV !== "production",
        },
      });

      timeline.fromTo(bucket, { yPercent: -6 }, { yPercent: 18 });
      timeline.fromTo(background, { yPercent: 0 }, { yPercent: -12 }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="hero-section" aria-label="Hero">
      <div ref={backgroundRef} className="hero-section__background image-wrapper">
        <Image
          src={ASSETS.background}
          alt="Textured cavern wall background"
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className="hero-section__foreground image-wrapper" aria-hidden>
        <Image
          src={ASSETS.foreground}
          alt="Foreground framing the hero scene"
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className="hero-section__content">
        <div className="hero-section__inner">
          <h1>
            <span className="hero-section__accent">Branding &amp; Web Design</span> that tells your story.
          </h1>
          <p>
            Strategy with depth. Design with clarity. From first spark to launch I build brands and websites that feel as considered as they look.
          </p>
          <div className="hero-section__actions">
            <a href="#my-work" className="btn btn-primary">
              See my work
            </a>
            <a
              href="https://calendly.com/well-edge-creative/30min"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              Book a call
            </a>
          </div>
        </div>
      </div>

      <div ref={bucketRef} className="hero-section__bucket">
        <Image
          src={ASSETS.bucket}
          alt="Illustrated bucket lowered into the hero well"
          width={560}
          height={820}
          priority
        />
      </div>
    </section>
  );
}
