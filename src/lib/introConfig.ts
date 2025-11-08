// ========================================
// INTRO SECTION (DESIGN STRATEGY) CONFIGURATION
// ========================================
// Controls the Design Strategy section timing and animations

export const INTRO_CONFIG = {

  // === SCROLL TRIGGER ===
  TRIGGER_START: "top 88%",       // Trigger earlier in viewport
  TRIGGER_END: "top 5%",          // Extend the scroll window
  SCRUB: 1.2,                     // Scroll smoothness

  // === HEADING APPEARANCE ===
  APPEAR_DELAY: 0,                 // Initial delay before heading appears
  APPEAR_DURATION: 1.6,            // Longer fade-in
  APPEAR_EASE: "power3.out",       // Softer easing

  // === HIGHLIGHT TIMING ===
  HIGHLIGHT_START: 0.12,           // Start earlier
  HIGHLIGHT_DURATION: 3.4,         // Longer highlight animation
  HIGHLIGHT_EASE: "power3.out",    // Softer easing

  HIGHLIGHT_DELAY_BETWEEN: 1.2,    // More breathing time

  // === TEXT COLOR TRANSITION ===
  TEXT_COLOR_OFFSET: 0.5,          // Slightly later
  TEXT_COLOR_DURATION: 2.1,        // Longer fade
  TEXT_COLOR_EASE: "power3.out",   // Softer easing

  // === PARAGRAPH & BUTTONS ===
  PARAGRAPH_DELAY: 0.6,            // Slight delay after highlight
  PARAGRAPH_DURATION: 1.4,         // Longer fade-in
  PARAGRAPH_EASE: "power3.out",    // Softer easing

  BUTTONS_DELAY: 0.5,              // After paragraph
  BUTTONS_DURATION: 1.1,           // Slightly longer fade
  BUTTONS_EASE: "power3.out",      // Softer easing

} as const;

export type IntroConfig = typeof INTRO_CONFIG;
