"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const PROCESS_STEPS = [
  {
    id: "discover",
    title: "Discover",
    description: "Workshops, audience mapping, and content audits clarify what matters most.",
    bullets: ["Goals & constraints", "Voice & story framework", "Success metrics"],
  },
  {
    id: "profile",
    title: "Profile",
    description: "I shape the positioning, message, and narrative so every touchpoint feels aligned.",
    bullets: ["Messaging pillars", "Content outline & sitemap", "Brand narrative"],
  },
  {
    id: "design",
    title: "Design",
    description: "Identity, UI, and interactions are built as a coherent system, not one-off screens.",
    bullets: ["Logo & visual language", "Component-driven UI", "Motion direction"],
  },
  {
    id: "deliver",
    title: "Deliver",
    description: "I build in Next.js, document the system, and hand over what you need to launch.",
    bullets: ["Next.js build & QA", "SEO & performance passes", "Launch support"],
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.5 },
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      timeline.fromTo(
        root.querySelector("[data-animate='heading']"),
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1 },
      );

      const cards = root.querySelectorAll<HTMLElement>("[data-animate='card']");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            delay: index * 0.12,
            scrollTrigger: {
              trigger: card,
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
      id="process"
      className="section process-section bg-neutral-950 text-white scroll-mt-16"
      aria-labelledby="process-title"
    >
      <div className="container">
        <div className="process-header" data-animate="heading">
          <p className="eyebrow text-white/70">Process</p>
          <h2 id="process-title" className="section-title text-white">
            Structured sprints that keep strategy and craft aligned.
          </h2>
          <p className="lead text-white/70">
            From discovery to launch I move through tight feedback loops. Each phase sets up the next,
            so the handover and rollout feel as clear as the concept.
          </p>
        </div>

        <div className="process-grid">
          {PROCESS_STEPS.map((step) => (
            <article key={step.id} className="process-card" data-animate="card" id={`process-${step.id}`}>
              <div className="process-card__header">
                <span className="process-card__step">{step.title}</span>
              </div>
              <p className="process-card__description">{step.description}</p>
              <ul className="process-card__list">
                {step.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
