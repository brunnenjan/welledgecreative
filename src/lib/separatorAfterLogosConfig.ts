// ========================================
// SEPARATOR AFTER LOGOS CONFIGURATION
// ========================================
// Controls the separator after Logos carousel

export const SEPARATOR_AFTER_LOGOS_CONFIG = {

  // === ANIMATION SPEEDS ===
   BG_SPEED: 150,           // Background layer speed
  FG_SPEED: -250,         // Foreground layer speed (negative = moves up)
  BUCKET_SPEED: 1200,      // Bucket scroll speed

  // === SCROLL SMOOTHNESS ===
  SCRUB: 2.2,             // Higher = smoother/slower (try 1.5-3)

  // === SECTION SIZE ===
  SECTION_HEIGHT: "220vh",

  // === BACKGROUND LAYER ===
  BG_TOP: "-20vh",         // Starting position (desktop)
  BG_TOP_MOBILE: "-60vh",  // Starting position (mobile - higher to stay behind)
  BG_HEIGHT: "220vh",

  // === BUCKET LAYER ===
  BUCKET_TOP: "0vh",       // Starting position (desktop)
  BUCKET_TOP_MOBILE: "30vh", // Mobile: higher to compensate for less movement
  BUCKET_HEIGHT: "0vh",

  // === FOREGROUND LAYER ===
  FG_TOP: "-20vh",         // Starting position (desktop)
  FG_TOP_MOBILE: "15vh",  // Starting position (mobile - slightly higher)
  FG_MIN_HEIGHT: "420vh",

  // === MOBILE Y-OFFSET (vertical drift during scroll) ===
  BG_OFFSET_Y_MOBILE: "0vh",     // BG: static (no movement)
  FG_OFFSET_Y_MOBILE: "0vh",     // FG: static mask (no movement)
  BUCKET_OFFSET_Y_MOBILE: "7vh", // Bucket: minimal vertical drift (7% of section height)

  // === MOBILE SCALING (for crispness/coverage) ===
  BG_SCALE_MOBILE: 1.1,    // 110% scale for better coverage
  FG_SCALE_MOBILE: 1.0,    // 100% scale
  BUCKET_SCALE_MOBILE: 1.0, // 100% scale

  // === MOBILE PARALLAX DEPTH (DEPRECATED - use OFFSET_Y_MOBILE instead) ===
  // BG_DEPTH_MOBILE: 0.03,   // Nearly static background
  // FG_DEPTH_MOBILE: 0.06,   // Minimal foreground movement
  // BUCKET_DEPTH_MOBILE: 0.1, // Slightly more bucket movement

  // === MOBILE Z-INDEX (ensures proper stacking) ===
  Z_BG_MOBILE: 5,          // Background lowest
  Z_FG_MOBILE: 50,         // Foreground highest
  Z_BUCKET_MOBILE: 40,     // Bucket middle

  // === WHITE FILL ===
  FG_FILL_TOP: "0vh",
  FG_FILL_HEIGHT: "0vh",

  // === TRIGGER POSITIONS ===
  TRIGGER_START: "top 135%",
  TRIGGER_END: "bottom top",

  // === VISUAL ===
  showMarkers: false,

} as const;

export type SeparatorAfterLogosConfig = typeof SEPARATOR_AFTER_LOGOS_CONFIG;
