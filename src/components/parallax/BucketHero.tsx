"use client";

import Image from "next/image";
import { smoothScrollTo } from "@/lib/smoothScroll";

export default function BucketHero() {
  const handleScroll = () => {
    smoothScrollTo("design-strategy");
  };

  return (
    <div className="bucket-hero" role="presentation">
      <div className="bucket-hero__inner">
        <Image
          src="/assets/logo/well-edge-logo-retina.webp"
          alt="Well Edge Creative"
          width={420}
          height={160}
          priority
          className="mx-auto h-auto w-auto max-w-[320px]"
        />
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          <span style={{ color: "#ff7a00" }}>Branding &amp; Web Design</span>{" "}
          <span>that tells your story.</span>
        </h1>
        <p className="text-white/90 text-lg">
          Strategy with depth. Design with clarity. From first idea to launch.
        </p>
        <div className="bucket-hero__actions">
          <a
            href="#selected-projects"
            className="btn btn-primary min-w-[200px]"
            onClick={(event) => {
              event.preventDefault();
              smoothScrollTo("selected-projects");
            }}
          >
            See my work
          </a>
          <a
            href="https://calendly.com/well-edge-creative/30min"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary min-w-[200px]"
          >
            Book a call
          </a>
        </div>
        <button type="button" className="scroll-cue" onClick={handleScroll}>
          <span>Scroll to explore</span>
          <span className="scroll-cue__frame">
            <span className="scroll-cue__dot" />
          </span>
        </button>
      </div>
    </div>
  );
}
