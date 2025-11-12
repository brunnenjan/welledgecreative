// src/components/WorkShowcase.tsx
"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { cases } from "@/app/data/cases";

gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
  // Animation timing
  frameDuration: 0.8,
  pictureDuration: 1.0,
  textboxDuration: 1.0,
  textDuration: 0.6,

  // Scroll-based trigger points
  triggerStart: "top 75%",
  triggerEnd: "top 25%",
  scrub: 0.8,

  // DEBUG
  showMarkers: false,
} as const;

export default function WorkShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const workHighlightRef = useRef<HTMLSpanElement>(null);
  const workTextRef = useRef<HTMLSpanElement>(null);
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
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
          markers: CONFIG.showMarkers,
          id: "work-heading",
        },
      });

      // Highlight "Work" - orange background slide-in
      if (workHighlightRef.current && workTextRef.current) {
        gsap.fromTo(
          workHighlightRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.fromTo(
          workTextRef.current,
          { color: "#1a1a1a" },
          {
            color: "#ffffff",
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Animate each project individually with scroll-based sequence
      if (projectsRef.current) {
        const projectElements = Array.from(projectsRef.current.children);

        projectElements.forEach((project, index) => {
          const frame = project.querySelector('[data-anim="frame"]');
          const picture = project.querySelector('[data-anim="picture"]');
          const textbox = project.querySelector('[data-anim="textbox"]');
          const textElements = project.querySelectorAll('[data-anim="text"]');

          if (!frame || !picture || !textbox) return;

          // Create a timeline for each project
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: project,
              start: CONFIG.triggerStart,
              end: CONFIG.triggerEnd,
              scrub: CONFIG.scrub,
              markers: CONFIG.showMarkers,
              id: `project-${index}`,
            },
          });

          // Sequence: Frame → Picture → Textbox → Text
          tl.fromTo(
            frame,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: CONFIG.frameDuration, ease: "power2.out" }
          )
          .fromTo(
            picture,
            { opacity: 0, scale: 1.05 },
            { opacity: 1, scale: 1, duration: CONFIG.pictureDuration, ease: "power1.out" },
            "-=0.3"
          )
          .fromTo(
            textbox,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            { opacity: 1, x: 0, duration: CONFIG.textboxDuration, ease: "power2.out" },
            "-=0.4"
          )
          .fromTo(
            textElements,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: CONFIG.textDuration, stagger: 0.1, ease: "power1.out" },
            "-=0.5"
          );
        });
      }

      // CTA button fade-in
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
            markers: CONFIG.showMarkers,
            id: "work-cta",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Use first 3 case studies
  const featuredCases = cases.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      className="relative z-[60] bg-white scroll-mt-16"
      id="work"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Header */}
        <h2
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold text-center mb-20 md:mb-32"
          style={{ color: "#1a1a1a" }}
        >
          My{" "}
          <span className="inline-block relative">
            <span ref={workTextRef} className="relative z-10">
              Work
            </span>
            <span
              ref={workHighlightRef}
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

        {/* Projects - Alternating Layout */}
        <div ref={projectsRef} className="space-y-32 md:space-y-40">
          {featuredCases.map((project, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={project.slug}
                className={`flex flex-col ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 md:gap-12 items-center`}
              >
                {/* Image Frame */}
                <div
                  data-anim="frame"
                  className="flex-1 w-full relative"
                  style={{ opacity: 0 }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl">
                    <img
                      data-anim="picture"
                      src={project.images[0].src}
                      alt={project.images[0].alt}
                      className="w-full h-full object-cover"
                      style={{ opacity: 0 }}
                    />
                  </div>
                </div>

                {/* Textbox */}
                <div
                  data-anim="textbox"
                  className="flex-1 w-full space-y-4"
                  style={{ opacity: 0 }}
                >
                  {/* Client/Year */}
                  <div
                    data-anim="text"
                    className="text-sm md:text-base uppercase tracking-wider"
                    style={{ color: "#f58222", opacity: 0 }}
                  >
                    {project.client} · {project.year}
                  </div>

                  {/* Title */}
                  <h3
                    data-anim="text"
                    className="text-3xl md:text-4xl font-bold"
                    style={{ color: "#1a1a1a", opacity: 0 }}
                  >
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p
                    data-anim="text"
                    className="text-lg md:text-xl leading-relaxed"
                    style={{ color: "#6a6a6a", opacity: 0 }}
                  >
                    {project.summary}
                  </p>

                  {/* Roles */}
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

                  {/* View Project Link */}
                  {project.site && (
                    <div data-anim="text" style={{ opacity: 0 }}>
                      <a
                        href={project.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-lg font-semibold mt-4 group"
                        style={{ color: "#f58222" }}
                      >
                        View Project
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="transition-transform group-hover:translate-x-1"
                        >
                          <path
                            d="M4 10h12m0 0l-4-4m4 4l-4 4"
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

        {/* CTA Button */}
        <div
          ref={ctaRef}
          className="flex justify-center mt-24 md:mt-32"
          style={{ opacity: 0 }}
        >
          <Link
            href="/work"
            className="px-8 py-4 text-lg md:text-xl font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              backgroundColor: "#f58222",
              color: "#ffffff",
            }}
          >
            See more of my work
          </Link>
        </div>
      </div>
    </section>
  );
}
