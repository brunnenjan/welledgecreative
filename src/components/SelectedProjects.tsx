// src/components/SelectedProjects.tsx
"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

type FeaturedProject = {
  slug: string;
  title: string;
  client: string;
  year: string;
  summary: string;
  role: string[];
  site?: string;
  images: { src: string; alt: string }[];
  challenge?: string;
  solution?: string;
  result?: string;
  award?: string;
};

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: "brisa-bahia",
    title: "Brisa Bahía — Retreat brand & website",
    client: "Brisa Bahía",
    year: "2025",
    summary: "Story-first brand system and fast, mobile-first website.",
    role: ["Branding", "Logo", "Webdesign", "Webdev (WordPress, PHP)"],
    site: "https://www.brisabahia.com/",
    images: [
      { src: "/assets/misc/projects/brisa-bahia.webp", alt: "Brisa Bahía hero" },
    ],
    challenge: "A new retreat needed a brand that felt warm, professional, and authentic — not corporate or generic.",
    solution: "Created a cohesive visual identity and storytelling-first website that reflects the retreat's unique character.",
    result: "A distinctive brand and fast, accessible site that attracts the right guests and communicates genuine hospitality.",
  },
  {
    slug: "virtuelles-fastnachtsmuseum",
    title: "Virtuelles Fastnachtsmuseum — digital exhibit",
    client: "Virtuelles Fastnachtsmuseum",
    year: "2022",
    summary: "Digital museum experience preserving cultural heritage.",
    role: ["UX", "Design", "Content Creation", "Animation"],
    site: "https://www.virtuelles-fastnachtsmuseum.de",
    images: [
      {
        src: "/assets/misc/projects/virtuelles-fastnachtsmuseum.webp",
        alt: "Virtuelles Fastnachtsmuseum hero",
      },
    ],
    challenge: "Making traditional cultural heritage accessible and engaging in a digital format for diverse audiences.",
    solution: "Designed an intuitive virtual museum experience with thoughtful UX that honors the content while making it discoverable.",
    result: "An accessible digital archive that preserves cultural heritage and reaches audiences beyond physical museum limitations.",
    award: "🏆 Award: German Media Award (Silver)",
  },
  {
    slug: "einfach-schee",
    title: "einfach-schee — full brand & site",
    client: "einfach-schee",
    year: "2017",
    summary: "End-to-end brand & website as a solo creator.",
    role: ["Branding", "Logo", "Webdesign", "Webdev"],
    site: "https://einfach-schee.com",
    images: [
      { src: "/assets/misc/projects/einfach-schee.webp", alt: "einfach-schee hero" },
    ],
    challenge: "Launching a personal brand from scratch with limited resources and no prior online presence.",
    solution: "Developed complete brand identity and custom website that established credibility and personality.",
    result: "A professional online presence that successfully attracted clients and established market position.",
  },
];

export default function SelectedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const highlightTextRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      // Heading fade-in
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
      });

      // Highlight animation
      if (highlightRef.current && highlightTextRef.current) {
        gsap.fromTo(
          highlightRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.fromTo(
          highlightTextRef.current,
          { color: "#1a1a1a" },
          {
            color: "#ffffff",
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power1.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (projectsRef.current) {
        const projectElements = Array.from(projectsRef.current.children);

        projectElements.forEach((project, index) => {
          const frame = project.querySelector('[data-anim="frame"]');
          const picture = project.querySelector('[data-anim="picture"]');
          const textbox = project.querySelector('[data-anim="textbox"]');
          const textElements = project.querySelectorAll('[data-anim="text"]');

          if (!frame || !picture || !textbox) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: project,
              start: "top 92%",
              end: "top 25%",
              scrub: 1.25,
            },
          });

          tl.fromTo(
            frame,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power1.out" }
          )
            .fromTo(
              picture,
              { opacity: 0, scale: 1.05 },
              { opacity: 1, scale: 1, duration: 1, ease: "power1.out" },
              "-=0.3"
            )
            .fromTo(
              textbox,
              { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
              { opacity: 1, x: 0, duration: 1, ease: "power1.out" },
              "-=0.4"
            )
            .fromTo(
              textElements,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power1.out" },
              "-=0.5"
            );
        });
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 30,
          duration: 1.2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 98%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[60] bg-white scroll-mt-16"
      id="selected-projects"
      aria-labelledby="selected-projects-title"
    >
      <div
        className="mx-auto max-w-7xl px-6 py-24 md:py-32 md:pl-[calc(1.5rem+25px)]"
      >
        <h2
          ref={headingRef}
          id="selected-projects-title"
          className="text-5xl md:text-7xl font-bold text-center mb-10 md:mb-12"
          style={{ color: "#1a1a1a" }}
        >
          Selected{" "}
          <span className="inline-block relative">
            <span ref={highlightTextRef} className="relative z-10">
              Projects
            </span>
            <span
              ref={highlightRef}
              className="absolute inset-0 bg-accent/80"
              style={{
                transform: "scaleX(0)",
                transformOrigin: "left",
                zIndex: -1,
                margin: "-0.1em -0.15em",
                backgroundColor: "#f58222",
              }}
            />
          </span>
        </h2>
        <p
          ref={subtitleRef}
          className="mx-auto mb-20 md:mb-32 max-w-3xl text-center text-base uppercase tracking-[0.3em] text-[#6a6a6a]"
        >
          Selected projects · Brand experience · Web design
        </p>

        <div ref={projectsRef} className="space-y-32 md:space-y-40">
          {FEATURED_PROJECTS.map((project, index) => {
            const isLeft = index % 2 === 0;
            const heroImage = project.images[0];

            return (
              <div
                key={project.slug}
                className={`flex flex-col ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}
              >
                <div
                  data-anim="frame"
                  className="flex-1 w-full relative"
                  style={{ opacity: 0 }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl">
                    <img
                      data-anim="picture"
                      src={heroImage?.src ?? ""}
                      alt={heroImage?.alt ?? project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      style={{ opacity: 0 }}
                    />
                  </div>
                </div>

                <div
                  data-anim="textbox"
                  className={`group flex-1 w-full space-y-4 ${isLeft ? "md:pl-12 md:pr-6" : "md:pr-12 md:pl-6"}`}
                  style={{ opacity: 0 }}
                >
                  <div
                    data-anim="text"
                    className="text-sm md:text-base uppercase tracking-wider text-neutral-400"
                    style={{ opacity: 0 }}
                  >
                    {project.client} · {project.year}
                  </div>

                  <h3
                    data-anim="text"
                    className="text-3xl md:text-4xl font-bold"
                    style={{ color: "#1a1a1a", opacity: 0 }}
                  >
                    {project.title}
                  </h3>

                  <p
                    data-anim="text"
                    className="text-lg md:text-xl leading-relaxed"
                    style={{ color: "#434343", opacity: 0 }}
                  >
                    {project.summary}
                  </p>
                  {project.slug === "virtuelles-fastnachtsmuseum" && (
                    <p
                      data-anim="text"
                      className="text-base md:text-lg leading-relaxed"
                      style={{ color: "#575757", opacity: 0 }}
                    >
                      Created design, animations, and content — including a 20-minute interactive Bruegel painting experience (also available in English).
                    </p>
                  )}

                  {(project.challenge || project.solution || project.result) && (
                    <div
                      data-anim="text"
                      className="space-y-3 pt-4 border-l-2 pl-4"
                      style={{ borderColor: "#f58222", opacity: 0 }}
                    >
                      {project.challenge && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#f58222" }}>
                            Challenge
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed" style={{ color: "#6a6a6a" }}>
                            {project.challenge}
                          </p>
                        </div>
                      )}
                      {project.solution && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#f58222" }}>
                            Solution
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed" style={{ color: "#6a6a6a" }}>
                            {project.solution}
                          </p>
                        </div>
                      )}
                      {project.result && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#f58222" }}>
                            Result
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed" style={{ color: "#6a6a6a" }}>
                            {project.result}
                          </p>
                          {project.award && (
                            <p className="text-sm md:text-base leading-relaxed font-semibold italic mt-2" style={{ color: "#f58222" }}>
                              {project.award}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    data-anim="text"
                    className="flex flex-wrap gap-2 pt-2"
                    style={{ opacity: 0 }}
                  >
                    {project.role.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 text-sm rounded-full border"
                        style={{
                          color: "#1a1a1a",
                          borderColor: "#e0e0e0",
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        {role}
                      </span>
                    ))}
                  </div>

                  <div
                    data-anim="text"
                    className="flex items-center gap-3 pt-6 text-sm font-semibold uppercase tracking-wider text-neutral-500"
                    style={{ opacity: 0 }}
                  >
                    <span>Case studies — Coming soon &rarr;</span>
                  </div>

                  {project.site && (
                    <div data-anim="text" style={{ opacity: 0 }}>
                      <a
                        href={project.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-base font-semibold text-neutral-600 underline-offset-4 transition-colors hover:text-accent"
                      >
                        Visit live site
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M5 15L15 5M9 5h6v6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div
          ref={ctaRef}
          className="flex justify-center mt-24 md:mt-32"
          style={{ opacity: 0 }}
        >
          <Link href="/work" className="btn btn-primary text-lg md:text-xl">
            See more of my work
          </Link>
        </div>
      </div>
    </section>
  );
}
