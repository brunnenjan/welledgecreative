// ========================================
// SEPARATOR AFTER PROCESS CONFIGURATION
// ========================================
// Controls the separator after "How I Work" section

export const SEPARATOR_AFTER_PROCESS_CONFIG = {

  // === ANIMATION SPEEDS ===
  BG_SPEED: -150,           // Background layer speed
  FG_SPEED: 150,         // Foreground layer speed (negative = moves up)
  BUCKET_SPEED: 1400,      // Bucket scroll speed

  // === SCROLL SMOOTHNESS ===
  SCRUB: 2.2,             // Higher = smoother/slower (try 1.5-3)

  // === SECTION SIZE ===
  SECTION_HEIGHT: "250vh",

  // === BACKGROUND LAYER ===
  BG_TOP: "40vh",          // Starting position (desktop)
  BG_TOP_MOBILE: "-40vh",   // Starting position (mobile - higher to stay behind)
  BG_HEIGHT: "160vh",

  // === BUCKET LAYER ===
  BUCKET_TOP: "20vh",      // Starting position (desktop)
  BUCKET_TOP_MOBILE: "20vh", // Mobile: higher to compensate for less movement
  BUCKET_HEIGHT: "0vh",

  // === FOREGROUND LAYER ===
  FG_TOP: "-25vh",         // Starting position (desktop)
  FG_TOP_MOBILE: "0vh",  // Starting position (mobile - slightly higher)
  FG_MIN_HEIGHT: "120vh",

  // === MOBILE Y-OFFSET (vertical drift during scroll) ===
  BG_OFFSET_Y_MOBILE: "0vh",     // BG: static (no movement)
  FG_OFFSET_Y_MOBILE: "0vh",     // FG: static mask (no movement)
  BUCKET_OFFSET_Y_MOBILE: "8vh", // Bucket: minimal vertical drift (8% of section height)

  // === MOBILE SCALING (for crispness/coverage) ===
  BG_SCALE_MOBILE: 1.1,    // 110% scale for better coverage
  FG_SCALE_MOBILE: 1.0,    // 100% scale
  BUCKET_SCALE_MOBILE: 1.0, // 100% scale

  // === MOBILE PARALLAX DEPTH (DEPRECATED - use OFFSET_Y_MOBILE instead) ===
  // BG_DEPTH_MOBILE: 0.02,   // Nearly static background
  // FG_DEPTH_MOBILE: 0.05,   // Minimal foreground movement
  // BUCKET_DEPTH_MOBILE: 0.08, // Slightly more bucket movement

  // === MOBILE Z-INDEX (ensures proper stacking) ===
  Z_BG_MOBILE: 5,          // Background lowest
  Z_FG_MOBILE: 50,         // Foreground highest
  Z_BUCKET_MOBILE: 40,     // Bucket middle

  // === WHITE FILL ===
  FG_FILL_TOP: "0vh",
  FG_FILL_HEIGHT: "0vh",

  // === BUCKET FADE-IN ===
  BUCKET_FADE_IN_START: 0.15,    // When bucket starts fading in (0-1 progress)
  BUCKET_FADE_IN_END: 0.17,      // When bucket is fully visible (0-1 progress)

  // === TRIGGER POSITIONS ===
  TRIGGER_START: "top 135%",
  TRIGGER_END: "bottom top",

  // === VISUAL ===
  showMarkers: false,

} as const;

export type SeparatorAfterProcessConfig = typeof SEPARATOR_AFTER_PROCESS_CONFIG;
