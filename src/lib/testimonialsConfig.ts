// ========================================
// TESTIMONIALS SECTION CONFIGURATION
// ========================================
// Controls the What Clients Say heading highlight timing

export const TESTIMONIALS_CONFIG = {

  // === SCROLL TRIGGER ===
  TRIGGER_START: "top 72%",        // When heading highlight begins
  TRIGGER_END: "top 40%",          // When highlight interaction zone ends

  // === HIGHLIGHT ANIMATION ===
  HIGHLIGHT_DURATION: 0.6,         // Duration of highlight expansion
  HIGHLIGHT_EASE: "power2.out",    // Ease for highlight chip

  // === TEXT COLOR ===
  TEXT_COLOR_DURATION: 0.6,        // Duration for text color change
  TEXT_COLOR_EASE: "power2.out",   // Ease for text color change

  // === EXCERPT ===
  EXCERPT_MAX_CHARS: 220,
  EXCERPT_SUFFIX: "…",

} as const;

export type TestimonialsConfig = typeof TESTIMONIALS_CONFIG;
