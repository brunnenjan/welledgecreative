// ========================================
// FOOTER PARALLAX CONFIGURATION
// ========================================
// Controls the final section foreground/background motion

export const FOOTER_PARALLAX_CONFIG = {

  // === VISUALS ===
  backgroundImage: "/assets/parallax/section-contact/parallax-bg-contact.webp",

  // === SCROLL SMOOTHNESS ===
  SCRUB: 1.4,

  // === FOREGROUND MOTION ===
  footerFgStartOffset: -10,
  footerFgYMax: -260,

  // === BACKGROUND DRIFT ===
  footerBgDriftY: -48,

  // === BUCKET MOTION ===
  footerBucketImage: "/assets/parallax/section-contact/parallax-bucket-contact.webp",
  footerBucketStartOffset: -600,
  footerBucketEndOffset: -60,
  footerBucketStartOpacity: 0.0,
  footerBucketEndOpacity: 1,
  footerBucketSwing: 0.65,
  footerBucketSwingDur: 6.2,
  footerBucketBaseWidth: 320,
  footerBucketScale: 0.2,
  footerBucketMaxViewportRatio: 0.09,
  footerBucketGlowWidthRatio: 0.7,
  footerBucketGlowHeight: 48,
  footerBucketGlowOffset: 18,
  footerBucketDuration: 1.2,
  footerBucketScrollSpeed: 0.25,
  footerBucketTriggerStart: "top bottom",
  footerBucketTriggerEnd: "bottom top",

  // === ANIMATION PROFILE ===
  footerFgDuration: 1.2,
  footerBgDuration: 1.4,
  footerEase: "none",

  // === DEBUG ===
  showMarkers: false,

} as const;

export type FooterParallaxConfig = typeof FOOTER_PARALLAX_CONFIG;
