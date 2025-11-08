// ========================================
// PARALLAX CONFIGURATION
// ========================================
// Adjust these values to control parallax behavior
// All sections share these settings

export const PARALLAX_SHARED_CONFIG = {

  // === ANIMATION SPEEDS ===
  BG_SPEED: 80,            // slow drift
  FG_SPEED: -180,          // foreground moves upward slightly faster
  BUCKET_SPEED: 360,       // bucket glide

  // === SCROLL SMOOTHNESS ===
  SCRUB: 1.6,

  // === SECTION SIZE ===
  SECTION_HEIGHT: "165vh",

  // === BACKGROUND LAYER ===
  BG_TOP: "38vh",
  BG_HEIGHT: "185vh",

  // === BUCKET LAYER ===
  BUCKET_TOP: "-38vh",
  BUCKET_HEIGHT: "170vh",

  // === FOREGROUND LAYER ===
  FG_TOP: "68vh",
  FG_MIN_HEIGHT: "380vh",

  // === WHITE FILL (inside foreground for coverage) ===
  FG_FILL_TOP: "210vh",
  FG_FILL_HEIGHT: "260vh",

  // === POST-SECTION WHITE SPACE (Profile section only) ===
  POST_FILL_HEIGHT: "140vh",

  // === TIMING (Profile section only) ===
  BUCKET_REVEAL_PROGRESS: 0.22,
  BUCKET_REVEAL_DURATION: 0.32,
  OVERLAY_FADE_IN_PROGRESS: 0.28,
  OVERLAY_FADE_OUT_PROGRESS: 0.72,
  ARROW_FADE_IN_PROGRESS: 0.32,
  ARROW_FADE_OUT_PROGRESS: 0.74,

} as const;

export type ParallaxSharedConfig = typeof PARALLAX_SHARED_CONFIG;
