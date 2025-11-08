// ========================================
// BUCKET HERO SECTION CONFIGURATION
// ========================================
// Controls the hero section animations and parallax

export const HERO_CONFIG = {

  // === INTRO ANIMATION ===
  BUCKET_INTRO_Y: "-6vh",          // Initial bucket Y position
  BUCKET_INTRO_DURATION: 1.8,      // Duration of bucket drop-in
  BUCKET_INTRO_EASE: "sine.out",   // Easing for intro animation
  INTRO_PAUSE: 0.5,                // Pause after intro before scroll

  // === SCROLL PARALLAX ===
  SCROLL_DISTANCE: 6,              // Viewport heights for scroll
  SCRUB: 1.25,                     // Scroll smoothness

  BG_MOVE: -150,                   // Background parallax distance
  FG_MOVE: -450,                   // Foreground parallax distance
  BUCKET_MOVE: 200,                // Bucket descent distance

  // === BUCKET SWING ===
  BUCKET_SWING_ROT: 1.2,           // Swing rotation degrees
  BUCKET_SWING_DUR: 5.6,           // Swing duration (seconds)

  // === LAYOUT ===
  TRANSPARENT_SPACE: 130,          // vh - space after hero
  OVERSCAN: 60,                    // px - extra foreground height

  // === MOUSE PARALLAX (FUTURE) ===
  MOUSE_INTENSITY: 0.006,          // Legacy multiplier (kept for compatibility)
  MOUSE_EASE: 0.08,                // Lerp smoothing (0-1)
  MOUSE_MAX_OFFSET_X: 14,          // Max horizontal drift in px
  MOUSE_MAX_OFFSET_Y: 10,          // Max vertical drift in px

  // === MOBILE ADJUSTMENTS ===
  BG_SCALE_MOBILE: 1.05,           // Background scale on mobile (for crispness)
  HIDE_LOGO_MOBILE: true,          // Hide logo on mobile devices

} as const;

export type HeroConfig = typeof HERO_CONFIG;
