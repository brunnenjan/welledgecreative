"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TESTIMONIALS_CONFIG } from "@/lib/testimonialsConfig";
import Image from "next/image";
import { useI18n } from "@/components/providers/I18nProvider";

gsap.registerPlugin(ScrollTrigger);

type TestimonialEntry = {
  id: string;
  name: string;
  role: string;
  quote: string;
  excerpt: string;
  rating: number;
  avatar: string;
  site?: string;
};

const AUTOPLAY_INTERVAL = 6000;
const REVIEWS_SOURCE = "/reviews.json";
const FALLBACK_AVATAR = "/assets/profile/profile-jan.webp";
const PER_VIEW = 3;

const createExcerpt = (quote: string, maxChars: number, suffix: string) => {
  if (quote.length <= maxChars) return quote;
  const truncated = quote.slice(0, maxChars);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace === -1) {
    return `${truncated}${suffix}`;
  }
  return `${truncated.slice(0, lastSpace)}${suffix}`;
};

const getPositionClass = (
  currentIndex: number,
  slideIndex: number,
  length: number,
  enablePeek: boolean,
) => {
  if (length <= 0) return "hidden";
  if (length === 1) return "selected";

  const diff = (slideIndex - currentIndex + length) % length;

  if (diff === 0) return "selected";
  if (diff === 1) return "next";
  if (diff === length - 1) return "prev";

  if (enablePeek && diff === 2) return "peek-right";
  if (enablePeek && diff === length - 2) return "peek-left";

  return diff < length / 2 ? "hidden-right" : "hidden-left";
};

export default function TestimonialsSection() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const pointerState = useRef<{ active: boolean; startX: number }>({ active: false, startX: 0 });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleHighlightRef = useRef<HTMLSpanElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);

  const [testimonials, setTestimonials] = useState<TestimonialEntry[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [modalData, setModalData] = useState<TestimonialEntry | null>(null);
  const modalTriggerRef = useRef<HTMLButtonElement | null>(null);
  const modalCloseRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const carouselClassName = isReady ? "testimonial-carousel" : "testimonial-carousel loading";

  const total = testimonials.length;
  const hasPeekPositions = total > PER_VIEW;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handle = () => setPrefersReducedMotion(media.matches);
    handle();
    media.addEventListener("change", handle);
    return () => media.removeEventListener("change", handle);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadTestimonials = async () => {
      try {
        const response = await fetch(REVIEWS_SOURCE, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Failed to load testimonials: ${response.status}`);
        }

        const payload = (await response.json()) as Partial<TestimonialEntry>[];
        if (!isMounted) return;

        const normalised = payload
          .map((entry, index) => {
            if (!entry) return null;
            const id = String(entry.id ?? `testimonial-${index}`);
            const name = (entry.name ?? "").trim();
            const role = (entry.role ?? "").trim();
            const quote = (entry.quote ?? "").trim();
            const rawRating = typeof entry.rating === "number" ? entry.rating : Number(entry.rating ?? 0);
            const rating = Number.isFinite(rawRating) ? Math.min(Math.max(rawRating, 0), 5) : 0;
            const avatarPath = (entry.avatar ?? "").trim();
            const site = typeof entry.site === "string" ? entry.site.trim() : "";
            const avatar = avatarPath
              ? avatarPath.startsWith("/")
                ? avatarPath
                : `/${avatarPath.replace(/^\/+/u, "")}`
              : FALLBACK_AVATAR;

            if (!name || !role || !quote) {
              return null;
            }

            const excerpt = createExcerpt(
              quote,
              TESTIMONIALS_CONFIG.EXCERPT_MAX_CHARS,
              TESTIMONIALS_CONFIG.EXCERPT_SUFFIX
            );

            return {
              id,
              name,
              role,
              quote,
              excerpt,
              rating,
              avatar,
              site: site || undefined,
            };
          })
          .filter((item) => Boolean(item)) as TestimonialEntry[];

        setTestimonials(normalised);
        setLoadError(normalised.length === 0);
      } catch (error) {
        console.error("Testimonials load error", error);
        if (isMounted) {
          setLoadError(true);
          setTestimonials([]);
        }
      }
    };

    loadTestimonials();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const heading = titleRef.current;
    const highlight = titleHighlightRef.current;
    const text = titleTextRef.current;

    if (!heading || !highlight || !text) return;

    gsap.set(highlight, {
      scaleX: prefersReducedMotion ? 1 : 0,
      transformOrigin: "left",
      backgroundColor: "#f58222",
    });

    gsap.set(text, { color: prefersReducedMotion ? "#ffffff" : "#1a1a1a" });

    if (prefersReducedMotion) return;

    const highlightTimeline = gsap.timeline({ paused: true });

    highlightTimeline
      .to(
        highlight,
        {
          scaleX: 1,
          duration: TESTIMONIALS_CONFIG.HIGHLIGHT_DURATION,
          ease: TESTIMONIALS_CONFIG.HIGHLIGHT_EASE,
        },
        0
      )
      .to(
        text,
        {
          color: "#ffffff",
          duration: TESTIMONIALS_CONFIG.TEXT_COLOR_DURATION,
          ease: TESTIMONIALS_CONFIG.TEXT_COLOR_EASE,
        },
        0
      );

    const highlightTrigger = ScrollTrigger.create({
      trigger: heading,
      start: TESTIMONIALS_CONFIG.TRIGGER_START,
      end: TESTIMONIALS_CONFIG.TRIGGER_END,
      onEnter: () => highlightTimeline.play(),
      onEnterBack: () => highlightTimeline.play(),
      onLeaveBack: () => highlightTimeline.reverse(),
    });

    return () => {
      highlightTimeline.kill();
      highlightTrigger.kill();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const viewport = containerRef.current;
    if (!viewport) return;

    const syncIfReady = () => {
      const width = viewport.getBoundingClientRect().width;
      if (width > 0) {
        setIsReady(true);
      }
    };

    const raf = requestAnimationFrame(syncIfReady);
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setIsReady(true);
          break;
        }
      }
    });
    resizeObserver.observe(viewport);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const viewport = containerRef.current;
    if (!viewport) return;

    const imgs = viewport.querySelectorAll<HTMLImageElement>("img");
    if (imgs.length === 0) {
      setIsReady(true);
      return;
    }

    let pending = 0;
    const onSettled = () => {
      pending -= 1;
      if (pending <= 0) {
        setIsReady(true);
      }
    };

    imgs.forEach((img) => {
      if (img.complete) return;
      pending += 1;
      img.addEventListener("load", onSettled, { once: true });
      img.addEventListener("error", onSettled, { once: true });
    });

    if (pending === 0) {
      setIsReady(true);
    }

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("load", onSettled);
        img.removeEventListener("error", onSettled);
      });
    };
  }, []);

  useEffect(() => {
    if (total === 0) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex((prev) => {
      if (prev < 0) return 0;
      if (prev >= total) return total - 1;
      return prev;
    });
  }, [total]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (prefersReducedMotion || isPaused || total <= 1) return;
    if (!isReady) return;
    stopAutoplay();
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => {
        if (total <= 1) return prev;
        return (prev + 1) % total;
      });
    }, AUTOPLAY_INTERVAL);
  }, [prefersReducedMotion, isPaused, total, stopAutoplay, isReady]);

  useEffect(() => {
    if (isReady) {
      startAutoplay();
    }
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay, isReady]);

  const goToNext = useCallback(() => {
    if (total <= 1 || !isReady) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total, isReady]);

  const goToPrev = useCallback(() => {
    if (total <= 1 || !isReady) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total, isReady]);

  const pause = useCallback(() => {
    setIsPaused(true);
    stopAutoplay();
  }, [stopAutoplay]);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (!isPaused && isReady) {
      startAutoplay();
    }
  }, [isPaused, startAutoplay, isReady]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (total <= 1) return;
    const targetElement = event.target as HTMLElement | null;
    if (targetElement?.closest(".testimonial-readmore") || targetElement?.closest(".testimonial-verify")) {
      return;
    }
    pointerState.current = { active: true, startX: event.clientX };
    event.currentTarget.setPointerCapture(event.pointerId);
    pause();
  };

  const finishPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerState.current.active) return;
    const targetElement = event.target as HTMLElement | null;
    if (targetElement?.closest(".testimonial-readmore") || targetElement?.closest(".testimonial-verify")) {
      pointerState.current.active = false;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      return;
    }
    const delta = event.clientX - pointerState.current.startX;
    pointerState.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (Math.abs(delta) > 48) {
      if (delta < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    resume();
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerState.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    resume();
  };

  const announcement = useMemo(() => {
    if (total === 0) {
      return loadError ? t("testimonials.status.unavailable") : t("testimonials.status.loading");
    }

    const safeIndex = ((currentIndex % total) + total) % total;
    return `${t("testimonials.announcement.prefix")} ${safeIndex + 1} ${t("testimonials.announcement.connector")} ${total}`;
  }, [currentIndex, total, loadError, t]);

  const disableNavigation = total <= 1 || !isReady;
  const handleDotSelect = (index: number) => {
    if (!isReady || total <= 1) return;
    pause();
    const nextIndex = ((index % total) + total) % total;
    setCurrentIndex(nextIndex);
    resume();
  };

  const openModal = useCallback((entry: TestimonialEntry, trigger?: HTMLButtonElement) => {
    pause();
    if (trigger) {
      modalTriggerRef.current = trigger;
    }
    setModalData({ ...entry });
    document.body.classList.add('modal-open');
  }, [pause]);

  const closeModal = useCallback(() => {
    setModalData(null);
    document.body.classList.remove('modal-open');
    resume();
    // Return focus to the button that opened the modal
    if (modalTriggerRef.current) {
      modalTriggerRef.current.focus();
    }
  }, [resume]);

  const navigateModal = useCallback((direction: 'prev' | 'next') => {
    if (!modalData) return;
    const currentIndex = testimonials.findIndex(t => t.name === modalData.name && t.quote === modalData.quote);
    if (currentIndex === -1) return;

    const newIndex = direction === 'next'
      ? (currentIndex + 1) % testimonials.length
      : (currentIndex - 1 + testimonials.length) % testimonials.length;

    setModalData({ ...testimonials[newIndex] });
  }, [modalData, testimonials]);

  useEffect(() => {
    if (!modalData) return;

    const focusTimeout = window.setTimeout(() => {
      if (modalCloseRef.current) {
        modalCloseRef.current.focus({ preventScroll: true });
      } else if (modalRef.current) {
        modalRef.current.focus({ preventScroll: true });
      }
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimeout);
    };
  }, [modalData, closeModal]);

  return (
    <section
      id="testimonials"
      className="section bg-white scroll-mt-16 testimonials-section"
      style={{
        paddingTop: 'clamp(4rem, 12vh, 8rem)',
        paddingBottom: 'clamp(4rem, 10vh, 7rem)'
      }}
      aria-labelledby="testimonials-title"
    >
      <div className="container text-center">
        <h2 ref={titleRef} id="testimonials-title" className="section-title">
          {t("testimonials.heading.prefix")}{" "}
          <span className="relative inline-block">
            <span
              ref={titleTextRef}
              className="relative z-10"
              style={{ color: "#1a1a1a" }}
            >
              {t("testimonials.heading.highlight")}
            </span>
            <span
              ref={titleHighlightRef}
              className="absolute inset-0 bg-accent/80"
              style={{
                transformOrigin: "left",
                transform: "scaleX(0)",
                margin: "-0.1em 0",
                backgroundColor: "#f58222",
                zIndex: -1,
              }}
            />
          </span>{" "}
          {t("testimonials.heading.suffix")}
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl text-[#6a6a6a]">
          {t("testimonials.description")}
        </p>

        <div
          className="testimonial-shell"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <button
            type="button"
            className="testimonial-button"
            aria-label={t("testimonials.buttons.prev")}
            onClick={() => {
              pause();
              goToPrev();
              resume();
            }}
            disabled={disableNavigation}
          >
            ‹
          </button>

          <div className={carouselClassName}>
            <div
              ref={containerRef}
              className="testimonial-viewport"
              tabIndex={0}
              role="region"
              aria-roledescription="carousel"
              aria-label={t("testimonials.carouselAria")}
              onFocus={pause}
              onBlur={resume}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  pause();
                  goToNext();
                  resume();
                } else if (event.key === "ArrowLeft") {
                  pause();
                  goToPrev();
                  resume();
                }
              }}
              onPointerDown={handlePointerDown}
              onPointerUp={finishPointer}
              onPointerCancel={handlePointerCancel}
            >
              {total === 0 ? (
                <div className="testimonial-empty" role="status">
                  {loadError ? t("testimonials.status.empty") : t("testimonials.status.loading")}
                </div>
              ) : (
                <ul className="testimonial-track">
                  {testimonials.map((data, index) => {
                    const ratingLabel = `${t("testimonials.ratingPrefix")} ${data.rating.toFixed(1)} ${t("testimonials.ratingSuffix")}`;
                    const roundedRating = Math.round(data.rating);
                    const position = getPositionClass(currentIndex, index, total, hasPeekPositions);
                    const isHidden =
                      position === "hidden-left" ||
                      position === "hidden-right" ||
                      position === "hidden";
                    const isSelected = position === "selected";
                    const isFocusable = isSelected;
                    const disableMotion = prefersReducedMotion ? { transition: "none" } : undefined;

                    return (
                      <li
                        key={`${data.id}-${index}`}
                        className={`testimonial-slide ${position}`}
                        data-position={position}
                        aria-hidden={isHidden}
                        tabIndex={isFocusable ? 0 : -1}
                        style={disableMotion}
                        onClick={(event) => {
                          const target = event.target as HTMLElement;
                          if (target && target.closest(".testimonial-readmore")) {
                            return;
                          }
                          if (index === currentIndex) return;
                          pause();
                          setCurrentIndex(index);
                          resume();
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            if (index === currentIndex) return;
                            pause();
                            setCurrentIndex(index);
                            resume();
                          }
                        }}
                      >
                        <article className="testimonial-card">
                          <figure className="p-8">
                            <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-100">
                              <Image
                                src={data.avatar}
                                alt=""
                                width={96}
                                height={96}
                                loading="lazy"
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <blockquote className="testimonial-quote">
                              <p>&ldquo;{data.excerpt}&rdquo;</p>
                            </blockquote>
                            {isSelected && (
                              <button
                                type="button"
                                className="testimonial-readmore"
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  openModal(data, event.currentTarget);
                                }}
                              >
                                {t("testimonials.buttons.readMore")}
                              </button>
                            )}

                            <figcaption className="testimonial-meta mt-auto items-center text-center gap-4">
                              <div className="flex flex-col gap-1">
                                <span className="text-base font-semibold text-[#1a1a1a]">
                                  {data.name}
                                </span>
                                <span className="text-sm text-[#6a6a6a]">
                                  {data.role}
                                </span>
                              </div>

                              <div className="testimonial-rating justify-center text-[#f6a65d]" aria-label={ratingLabel}>
                                {Array.from({ length: 5 }).map((_, starIndex) => (
                                  <svg
                                    key={`${data.id}-star-${starIndex}`}
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill={starIndex < roundedRating ? "currentColor" : "rgba(246, 166, 93, 0.25)"}
                                    aria-hidden="true"
                                  >
                                    <path d="M12 2.75l2.8 5.68 6.27.91-4.53 4.41 1.07 6.23L12 16.98l-5.61 2.95 1.07-6.23-4.53-4.41 6.27-.91L12 2.75z" />
                                  </svg>
                                ))}
                                <span className="ml-2 text-sm font-medium text-[#1a1a1a]">
                                  {data.rating.toFixed(1)}
                                </span>
                              </div>

                              {data.site && (
                                <a
                                  href={data.site}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="testimonial-verify justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f58222]"
                                  onClick={(event) => event.stopPropagation()}
                                >
                                  Website
                                </a>
                              )}
                            </figcaption>
                          </figure>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <button
            type="button"
            className="testimonial-button"
            aria-label={t("testimonials.buttons.next")}
            onClick={() => {
              pause();
              goToNext();
              resume();
            }}
            disabled={disableNavigation}
          >
            ›
          </button>

          {total > 1 && (
            <ul className="testimonial-pagination" role="tablist" aria-label={t("testimonials.paginationLabel")}>
              {testimonials.map((_, index) => {
                const isActive = index === currentIndex;
                return (
                  <li key={`pagination-${index}`}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`${t("testimonials.jumpTo")} ${index + 1}`}
                      className={`testimonial-pagination__dot${isActive ? ' is-active' : ''}`}
                      onClick={() => handleDotSelect(index)}
                    />
                  </li>
                );
              })}
            </ul>
          )}

          <div className="sr-only" aria-live="polite">
            {announcement}
          </div>
        </div>
      </div>

      {/* Modal/Lightbox */}
      {modalData && (
        <div
          className="testimonial-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            ref={modalRef}
            className="testimonial-modal-content"
            onClick={(event) => event.stopPropagation()}
            tabIndex={-1}
          >
            <button
              type="button"
              className="testimonial-modal-close"
              onClick={closeModal}
              aria-label={t("testimonials.buttons.closeModal")}
              ref={modalCloseRef}
            >
              ×
            </button>

            {/* Navigation Arrows */}
            <button
              type="button"
              className="testimonial-modal-nav testimonial-modal-nav-prev"
              onClick={() => navigateModal('prev')}
              aria-label={t("testimonials.buttons.prev")}
            >
              ‹
            </button>
            <button
              type="button"
              className="testimonial-modal-nav testimonial-modal-nav-next"
              onClick={() => navigateModal('next')}
              aria-label={t("testimonials.buttons.next")}
            >
              ›
            </button>

            <div className="testimonial-modal-body">
              <div className="mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-neutral-200 bg-neutral-100">
                <Image
                  src={modalData.avatar || FALLBACK_AVATAR}
                  alt={modalData.name}
                  width={128}
                  height={128}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 id="modal-title">{modalData.name}</h3>
              <p>{modalData.role}</p>

              <div className="testimonial-modal-rating">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <svg
                    key={`modal-star-${starIndex}`}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={starIndex < Math.round(modalData.rating) ? "currentColor" : "rgba(246, 166, 93, 0.25)"}
                    aria-hidden="true"
                  >
                    <path d="M12 2.75l2.8 5.68 6.27.91-4.53 4.41 1.07 6.23L12 16.98l-5.61 2.95 1.07-6.23-4.53-4.41 6.27-.91L12 2.75z" />
                  </svg>
                ))}
                <span>{modalData.rating.toFixed(1)}</span>
              </div>

              <blockquote className="testimonial-modal-quote">
                “{modalData.quote}”
              </blockquote>

              {modalData.site && (
                <a
                  href={modalData.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="testimonial-modal-link"
                >
                  {t("testimonials.buttons.visitSite")}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
