// ========================================
// PROFILE SECTION CONFIGURATION
// ========================================
// Controls the profile parallax section only

export const PROFILE_CONFIG = {

  // === ANIMATION SPEEDS ===
  BG_SPEED: 80,
  FG_SPEED: -180,
  BUCKET_SPEED: 360,

  // === SCROLL SMOOTHNESS ===
  SCRUB: 1.8,

  // === SECTION SIZE ===
  SECTION_HEIGHT: "170vh",

  // === BACKGROUND LAYER ===
  BG_TOP: "48vh",
  BG_HEIGHT: "190vh",

  // === BUCKET LAYER ===
  BUCKET_TOP: "10vh",
  BUCKET_HEIGHT: "175vh",

  // === FOREGROUND LAYER ===
  FG_TOP: "-10vh",
  FG_MIN_HEIGHT: "430vh",

  // === WHITE FILL ===
  FG_FILL_TOP: "0vh",
  FG_FILL_HEIGHT: "0vh",
  POST_FILL_HEIGHT: "120vh",

  // === TIMING ===
  BUCKET_REVEAL_PROGRESS: 0.26,     // When bucket appears (0-1)
  BUCKET_REVEAL_DURATION: 0.32,
  OVERLAY_FADE_IN_PROGRESS: 0.28,   // When profile info fades in
  OVERLAY_FADE_OUT_PROGRESS: 0.72,  // When profile info fades out
  ARROW_FADE_IN_PROGRESS: 0.32,     // When arrow appears
  ARROW_FADE_OUT_PROGRESS: 0.74,

  // === INFO HIGHLIGHT ===
  INFO_HIGHLIGHT_START: "top 60%",
  INFO_HIGHLIGHT_END: "bottom 58%",
  INFO_HIGHLIGHT_DURATION: 0.45,
  INFO_HIGHLIGHT_EASE: "power2.out",

  // === VISUAL ===
  showArrow: true,
  showMarkers: false,

} as const;

export type ProfileConfig = typeof PROFILE_CONFIG;
