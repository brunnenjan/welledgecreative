// ========================================
// LOGOS & BRANDINGS SECTION CONFIGURATION
// ========================================
// Controls the Logos & Brandings section timing and animations

export const LOGOS_CONFIG = {

  // === MARQUEE ===
  MARQUEE_SPEED_PX_PER_SEC: 38,
  RESIZE_DEBOUNCE_MS: 180,

  // === SCROLL TRIGGER ===
  TRIGGER_START: "top 75%",       // When section enters
  TRIGGER_END: "top 25%",         // When animation completes
  SCRUB: 1.2,                     // Scroll smoothness

  // === HEADING APPEARANCE ===
  APPEAR_DELAY: 0,                 // Initial delay before heading appears
  APPEAR_DURATION: 0.35,           // How long heading fade-in takes
  APPEAR_EASE: "power1.out",       // Easing for heading appearance

  // === HIGHLIGHT TIMING ===
  HIGHLIGHT_START: 0.28,           // When highlight (Branding) starts
  HIGHLIGHT_DURATION: 1.0,         // Duration of each highlight animation
  HIGHLIGHT_EASE: "power1.inOut",  // Easing for highlight

  HIGHLIGHT_DELAY_BETWEEN: 0.35,   // Padding before text highlight begins

  // === TEXT COLOR TRANSITION ===
  TEXT_COLOR_OFFSET: 0.5,          // Start at 50% through highlight
  TEXT_COLOR_DURATION: 0.8,        // Duration of color transition
  TEXT_COLOR_EASE: "power1.inOut", // Easing for color change

  // === LOGO CARDS ANIMATION ===
  CARDS_START: "top 82%",          // When cards start animating
  CARDS_DURATION_MOBILE: 0.5,      // Duration on mobile
  CARDS_DURATION_DESKTOP: 0.65,    // Duration on desktop
  CARDS_STAGGER_MOBILE: 0.07,      // Stagger delay on mobile
  CARDS_STAGGER_DESKTOP: 0.09,     // Stagger delay on desktop
  CARDS_Y_MOBILE: 18,              // Y offset on mobile
  CARDS_Y_DESKTOP: 32,             // Y offset on desktop
  CARDS_SCALE: 0.94,               // Initial scale for cards
  CARDS_EASE: "power2.out",        // Easing for cards

} as const;

export type LogosConfig = typeof LOGOS_CONFIG;
