"use client";

import { smoothScrollTo } from "@/lib/smoothScroll";

export default function IntroContent() {
  return (
    <section id="intro" className="section intro-content scroll-mt-16" aria-labelledby="intro-title">
      <div className="container">
        <h2 id="intro-title">
          Branding &amp; Web Design that tells your story.
        </h2>
        <p>
          Strategy with depth. Design with clarity. I carry projects from the first spark to launch with a process
          that keeps decisions purposeful and timelines sharp.
        </p>
        <div className="intro-actions">
          <a
            className="btn btn-primary min-w-[200px]"
            href="#process"
            onClick={(event) => {
              event.preventDefault();
              smoothScrollTo("process");
            }}
          >
            Explore the process
          </a>
          <a
            className="btn btn-secondary min-w-[200px]"
            href="https://calendly.com/well-edge-creative/30min"
            target="_blank"
            rel="noreferrer"
          >
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}
