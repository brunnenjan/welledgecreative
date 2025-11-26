// src/components/SelectedProjects.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/components/providers/I18nProvider";
import { smoothScrollTo } from "@/lib/smoothScroll";
gsap.registerPlugin(ScrollTrigger);

type FeaturedProject = {
  slug: string;
  year: string;
  site?: string;
  images: { src: string; altKey: string }[];
};

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: "brisa-bahia",
    year: "2025",
    site: "/case-studies/brisa-bahia",
    images: [
      { src: "/case-studies/brisa-bahia/mockup-big-screen-tablet-mobile-webiste.webp", altKey: "selectedProjects.projects.brisa-bahia.imageAlt" },
    ],
  },
  {
    slug: "virtuelles-fastnachtsmuseum",
    year: "2022",
    site: "https://www.virtuelles-fastnachtsmuseum.de",
    images: [
      {
        src: "/assets/misc/projects/virtuelles-fastnachtsmuseum.webp",
        altKey: "selectedProjects.projects.virtuelles-fastnachtsmuseum.imageAlt",
      },
    ],
  },
  {
    slug: "einfach-schee",
    year: "2017 – heute",
    site: "https://einfach-schee.com",
    images: [
      { src: "/assets/misc/projects/einfach-schee.webp", altKey: "selectedProjects.projects.einfach-schee.imageAlt" },
    ],
  },
];

export default function SelectedProjects() {
  const { t, getValue, locale } = useI18n();
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
          {t("selectedProjects.heading.prefix")}{" "}
          <span className="inline-block relative">
            <span ref={highlightTextRef} className="relative z-10">
              {t("selectedProjects.heading.highlight")}
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
          className="mx-auto mb-20 md:mb-32 max-w-3xl text-center text-base text-[#6a6a6a]"
        >
          {t("selectedProjects.subtitle")}
        </p>

        <div ref={projectsRef} className="space-y-32 md:space-y-40">
          {FEATURED_PROJECTS.map((project, index) => {
            const isLeft = index % 2 === 0;
            const heroImage = project.images[0];
            const baseKey = `selectedProjects.projects.${project.slug}`;
            const client = t(`${baseKey}.client`);
            const title = t(`${baseKey}.title`);
            const summary = t(`${baseKey}.summary`);
            const extraNote = getValue<string>(`${baseKey}.extraNote`);
            const challenge = getValue<string>(`${baseKey}.challenge`);
            const solution = getValue<string>(`${baseKey}.solution`);
            const result = getValue<string>(`${baseKey}.result`);
            const award = getValue<string>(`${baseKey}.award`);
            const roles = getValue<string[]>(`${baseKey}.roles`) ?? [];
            const heroAlt = heroImage ? t(heroImage.altKey) : title;

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
                    <Image
                      data-anim="picture"
                      src={heroImage?.src ?? ""}
                      alt={heroAlt}
                      fill
                      priority={false}
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 60vw, 640px"
                      className="object-cover"
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
                    {client} · {project.year}
                  </div>

                  <h3
                    data-anim="text"
                    className="text-3xl md:text-4xl font-bold"
                    style={{ color: "#1a1a1a", opacity: 0 }}
                  >
                    {title}
                  </h3>

                  <p
                    data-anim="text"
                    className="text-lg md:text-xl leading-relaxed"
                    style={{ color: "#434343", opacity: 0 }}
                  >
                    {summary}
                  </p>
                  {extraNote && (
                    <p
                      data-anim="text"
                      className="text-base md:text-lg leading-relaxed"
                      style={{ color: "#575757", opacity: 0 }}
                    >
                      {extraNote}
                    </p>
                  )}

                  {(challenge || solution || result) && (
                    <div
                      data-anim="text"
                      className="space-y-3 pt-4 border-l-2 pl-4"
                      style={{ borderColor: "#f58222", opacity: 0 }}
                    >
                      {challenge && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#f58222" }}>
                            {t("selectedProjects.blocks.challenge")}
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed" style={{ color: "#6a6a6a" }}>
                            {challenge}
                          </p>
                        </div>
                      )}
                      {solution && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#f58222" }}>
                            {t("selectedProjects.blocks.solution")}
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed" style={{ color: "#6a6a6a" }}>
                            {solution}
                          </p>
                        </div>
                      )}
                      {result && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#f58222" }}>
                            {t("selectedProjects.blocks.result")}
                          </h4>
                          <p className="text-sm md:text-base leading-relaxed" style={{ color: "#6a6a6a" }}>
                            {result}
                          </p>
                          {award && (
                            <p className="text-sm md:text-base leading-relaxed font-semibold italic mt-2" style={{ color: "#f58222" }}>
                              {award}
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
                    {roles.map((role) => (
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

                  {project.slug === "brisa-bahia" ? (
                    <div data-anim="text" style={{ opacity: 0 }}>
                      <Link
                        href={`/${locale}/case-studies/brisa-bahia`}
                        className="inline-flex items-center gap-2 text-base font-semibold text-accent underline-offset-4 transition-colors hover:text-accent/80"
                      >
                        {t("selectedProjects.cta.brisaBahiaCaseStudy")}
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M5 10h10m-4-4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </div>
                  ) : (
                    <div
                      data-anim="text"
                      className="flex items-center gap-3 pt-6 text-sm font-semibold uppercase tracking-wider text-neutral-500"
                      style={{ opacity: 0 }}
                    >
                      <span>{t("selectedProjects.cta.caseStudiesComing")}</span>
                    </div>
                  )}

                  {project.site && (
                    <div data-anim="text" style={{ opacity: 0 }}>
                      <a
                        href={project.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-base font-semibold text-neutral-600 underline-offset-4 transition-colors hover:text-accent"
                      >
                        {t("selectedProjects.cta.visitSite")}
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
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-24 md:mt-32"
          style={{ opacity: 0 }}
        >
          <Link href={`/${locale}/work`} className="btn btn-primary text-lg md:text-xl">
            {t("selectedProjects.cta.seeMore")}
          </Link>
          <button
            type="button"
            onClick={() => {
              smoothScrollTo("contact-section");
            }}
            className="btn btn-secondary text-lg md:text-xl"
          >
            {t("profile.planProject")}
          </button>
        </div>
      </div>
    </section>
  );
}
