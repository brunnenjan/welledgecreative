// ========================================
// SEPARATOR AFTER HERO CONFIGURATION
// ========================================
// Controls the separator between Hero and Intro sections

export const SEPARATOR_AFTER_HERO_CONFIG = {

  // === ANIMATION SPEEDS ===
  BG_SPEED: 100,           // Background layer speed
  FG_SPEED: -120,         // Foreground layer speed (negative = moves up)
  BUCKET_SPEED: 1000,      // Bucket scroll speed

  // === SCROLL SMOOTHNESS ===
  SCRUB: 2.2,             // Higher = smoother/slower (try 1.5-3)

  // === SECTION SIZE ===
  SECTION_HEIGHT: "180vh",

  // === BACKGROUND LAYER ===
  BG_TOP: "20vh",          // Starting position (desktop)
  BG_TOP_MOBILE: "-30vh",   // Starting position (mobile - anchored to stay behind)
  BG_HEIGHT: "140vh",

  // === BUCKET LAYER ===
  BUCKET_TOP: "-300vh",    // Starting position (desktop - more negative = higher up)
  BUCKET_TOP_MOBILE: "5vh", // Mobile: slightly below top
  BUCKET_HEIGHT: "25vh",

  // === FOREGROUND LAYER ===
  FG_TOP: "0vh",           // Starting position (desktop)
  FG_TOP_MOBILE: "-5vh",   // Starting position (mobile - slightly higher)
  FG_MIN_HEIGHT: "520vh",

  // === MOBILE Y-OFFSET (vertical drift during scroll) ===
  BG_OFFSET_Y_MOBILE: "0vh",     // BG: static (no movement)
  FG_OFFSET_Y_MOBILE: "0vh",     // FG: static mask (no movement)
  BUCKET_OFFSET_Y_MOBILE: "6vh", // Bucket: minimal vertical drift (6% of section height)

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
  FG_FILL_TOP: "440vh",
  FG_FILL_HEIGHT: "330vh",

  // === BUCKET FADE-IN ===
  BUCKET_FADE_IN_START: 0.33,    // When bucket starts fading in (0-1)
  BUCKET_FADE_IN_END: 0.35,      // When bucket is fully visible (0-1)

  // === TRIGGER POSITIONS ===
  TRIGGER_START: "top 120%",
  HERO_START: "top 115%",
  TRIGGER_END: "bottom top",

  // === VISUAL ===
  showMarkers: false,

} as const;

export type SeparatorAfterHeroConfig = typeof SEPARATOR_AFTER_HERO_CONFIG;
