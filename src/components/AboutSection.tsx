"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const CAPABILITIES = [
  {
    title: "Branding",
    text: "Positioning, design systems, guidelines, and launch assets that stay consistent.",
  },
  {
    title: "Websites",
    text: "Next.js builds, fast performance, content architecture, and purposeful animation.",
  },
  {
    title: "Advisory",
    text: "Clarity on roadmap, scope, and handover so your team keeps momentum post-launch.",
  },
];

const STATS = [
  { value: "10+ yrs", label: "Designing for founders & teams" },
  { value: "170+", label: "Brand & web projects shipped" },
  { value: "Remote", label: "Working with clients worldwide" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      const revealTargets = root.querySelectorAll<HTMLElement>("[data-reveal='fade-up']");

      revealTargets.forEach((target) => {
        gsap.fromTo(
          target,
          { y: 32, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: target,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section about-section scroll-mt-16"
      aria-labelledby="about-title"
    >
      <div className="container">
        <div className="about-header">
          <p className="eyebrow" data-reveal="fade-up">
            About
          </p>
          <h2 id="about-title" className="section-title" data-reveal="fade-up">
            Depth-driven design for founders who want clarity.
          </h2>
          <p className="lead" data-reveal="fade-up">
            I help brands tell stories that feel grounded and alive. Strategy, messaging, and identity come
            together so your website launches with confidence instead of guesswork.
          </p>
        </div>

        <div className="about-grid">
          {CAPABILITIES.map((item) => (
            <article key={item.title} className="about-card" data-reveal="fade-up">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="about-stats" data-reveal="fade-up">
          {STATS.map((stat) => (
            <div key={stat.value} className="about-stat">
              <span>{stat.value}</span>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
