// ========================================
// CENTRAL SCROLL CONFIGURATION
// ========================================
// Master control for all scroll-based animations
// Adjust values here to control animation behavior across the entire site

import { PARALLAX_CONFIG } from './parallaxSettings';

// ========================================
// GLOBAL ANIMATION TOGGLES
// ========================================
export const GLOBAL_ANIMATION_SETTINGS = {
  // Enable/disable animations per device type
  enableAnimations: {
    mobile: true,      // Enable all animations on mobile
    tablet: true,      // Enable all animations on tablet
    desktop: true,     // Enable all animations on desktop
  },

  // Enable/disable specific animation types per device
  enableParallax: {
    background: {
      mobile: false,   // Background parallax on mobile (disabled for performance)
      tablet: true,    // Background parallax on tablet
      desktop: true,   // Background parallax on desktop
    },
    foreground: {
      mobile: false,   // Foreground parallax on mobile (disabled for performance)
      tablet: true,    // Foreground parallax on tablet
      desktop: true,   // Foreground parallax on desktop
    },
    bucket: {
      mobile: true,    // Bucket parallax on mobile (enabled - lightweight)
      tablet: true,    // Bucket parallax on tablet
      desktop: true,   // Bucket parallax on desktop
    },
  },

  // Enable/disable bucket animations
  enableBucketAnimations: {
    fade: true,        // Fade in/out animations
    scale: true,       // Scale animations
    swing: true,       // Continuous swing animation
  },
};

// ========================================
// SCROLL TRIGGER DEFAULTS
// ========================================
export const SCROLL_TRIGGER_DEFAULTS = {
  // Default ScrollTrigger configuration
  markers: false,                    // Show debug markers (set to true for debugging)
  anticipatePin: 1,                  // Anticipate pinning for smoother performance

  // Default start/end positions (can be overridden per section)
  defaultStart: "top bottom",        // When element enters viewport
  defaultEnd: "+=200%",              // Scroll distance for animation

  // Default scrub values (higher = smoother but slower)
  scrubDefault: 3.8,                 // Default scrub for parallax
  scrubFast: 1,                      // Fast scrub for quick animations
  scrubSlow: 5.5,                    // Slow scrub for smooth, gradual animations
};

// ========================================
// DEVICE BREAKPOINTS (matches CSS)
// ========================================
export const BREAKPOINTS = {
  mobile: "(max-width: 768px)",
  tablet: "(min-width: 769px) and (max-width: 1024px)",
  desktop: "(min-width: 1025px)",
} as const;

// ========================================
// SECTION-SPECIFIC CONFIGURATIONS
// ========================================

/**
 * HERO SECTION SCROLL CONFIG
 * Controls the main hero section with bucket drop animation
 */
export const HERO_SCROLL_CONFIG = {
  // Override defaults for hero section
  enablePinning: {
    mobile: false,     // Disable pinning on mobile for simpler scroll
    tablet: true,      // Enable pinning on tablet
    desktop: true,     // Enable pinning on desktop
  },

  // Bucket animation settings
  bucket: {
    // Initial position (negative = above viewport)
    startPosition: {
      mobile: PARALLAX_CONFIG.hero.mobile.bucketStart,
      tablet: PARALLAX_CONFIG.hero.tablet.bucketStart,
      desktop: PARALLAX_CONFIG.hero.desktop.bucketStart,
    },
    // Drop distance multiplier
    dropDistance: {
      mobile: PARALLAX_CONFIG.hero.mobile.bucketDropMultiplier,
      tablet: PARALLAX_CONFIG.hero.tablet.bucketDropMultiplier,
      desktop: PARALLAX_CONFIG.hero.desktop.bucketDropMultiplier,
    },
    // Swing animation angle (degrees)
    swingAngle: {
      mobile: PARALLAX_CONFIG.hero.mobile.swingAngle,
      tablet: PARALLAX_CONFIG.hero.tablet.swingAngle,
      desktop: PARALLAX_CONFIG.hero.desktop.swingAngle,
    },
  },

  // Parallax speeds (0 = no movement, higher = faster)
  parallaxSpeed: {
    background: {
      mobile: PARALLAX_CONFIG.hero.mobile.bgSpeed,
      tablet: PARALLAX_CONFIG.hero.tablet.bgSpeed,
      desktop: PARALLAX_CONFIG.hero.desktop.bgSpeed,
    },
    foreground: {
      mobile: PARALLAX_CONFIG.hero.mobile.fgSpeed,
      tablet: PARALLAX_CONFIG.hero.tablet.fgSpeed,
      desktop: PARALLAX_CONFIG.hero.desktop.fgSpeed,
    },
  },
};

/**
 * PARALLAX SECTIONS SCROLL CONFIG
 * Controls Profile, Discover, Design, Deliver sections
 */
export const PARALLAX_SECTIONS_CONFIG = {
  profile: {
    // Bucket starts below on mobile, above on desktop
    bucketStart: {
      mobile: PARALLAX_CONFIG.profile.mobile.bucketStart,
      tablet: PARALLAX_CONFIG.profile.tablet.bucketStart,
      desktop: PARALLAX_CONFIG.profile.desktop.bucketStart,
    },
    // Bucket size adjustments
    bucketWidth: {
      mobile: PARALLAX_CONFIG.profile.mobile.bucketWidth,
      tablet: PARALLAX_CONFIG.profile.tablet.bucketWidth,
      desktop: PARALLAX_CONFIG.profile.desktop.bucketWidth,
    },
    // Scroll speeds
    bucketSpeed: {
      mobile: PARALLAX_CONFIG.profile.mobile.bucketSpeed,
      tablet: PARALLAX_CONFIG.profile.tablet.bucketSpeed,
      desktop: PARALLAX_CONFIG.profile.desktop.bucketSpeed,
    },
  },

  discover: {
    bucketStart: {
      mobile: PARALLAX_CONFIG.discover.mobile.bucketStart,
      tablet: PARALLAX_CONFIG.discover.tablet.bucketStart,
      desktop: PARALLAX_CONFIG.discover.desktop.bucketStart,
    },
    bucketSpeed: {
      mobile: PARALLAX_CONFIG.discover.mobile.bucketSpeed,
      tablet: PARALLAX_CONFIG.discover.tablet.bucketSpeed,
      desktop: PARALLAX_CONFIG.discover.desktop.bucketSpeed,
    },
  },

  design: {
    bucketStart: {
      mobile: PARALLAX_CONFIG.design.mobile.bucketStart,
      tablet: PARALLAX_CONFIG.design.tablet.bucketStart,
      desktop: PARALLAX_CONFIG.design.desktop.bucketStart,
    },
    bucketSpeed: {
      mobile: PARALLAX_CONFIG.design.mobile.bucketSpeed,
      tablet: PARALLAX_CONFIG.design.tablet.bucketSpeed,
      desktop: PARALLAX_CONFIG.design.desktop.bucketSpeed,
    },
  },

  deliver: {
    bucketStart: {
      mobile: PARALLAX_CONFIG.deliver.mobile.bucketStart,
      tablet: PARALLAX_CONFIG.deliver.tablet.bucketStart,
      desktop: PARALLAX_CONFIG.deliver.desktop.bucketStart,
    },
    bucketSpeed: {
      mobile: PARALLAX_CONFIG.deliver.mobile.bucketSpeed,
      tablet: PARALLAX_CONFIG.deliver.tablet.bucketSpeed,
      desktop: PARALLAX_CONFIG.deliver.desktop.bucketSpeed,
    },
  },
};

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Check if animations should be enabled for a device type
 */
export function shouldEnableAnimations(device: 'mobile' | 'tablet' | 'desktop'): boolean {
  return GLOBAL_ANIMATION_SETTINGS.enableAnimations[device];
}

/**
 * Check if parallax should be enabled for a specific layer and device
 */
export function shouldEnableParallax(
  layer: 'background' | 'foreground' | 'bucket',
  device: 'mobile' | 'tablet' | 'desktop'
): boolean {
  return GLOBAL_ANIMATION_SETTINGS.enableParallax[layer][device];
}

/**
 * Get scroll trigger configuration with device-specific overrides
 */
export function getScrollTriggerConfig(overrides?: Record<string, unknown>) {
  return {
    markers: SCROLL_TRIGGER_DEFAULTS.markers,
    anticipatePin: SCROLL_TRIGGER_DEFAULTS.anticipatePin,
    start: SCROLL_TRIGGER_DEFAULTS.defaultStart,
    end: SCROLL_TRIGGER_DEFAULTS.defaultEnd,
    scrub: SCROLL_TRIGGER_DEFAULTS.scrubDefault,
    ...overrides,
  };
}

// ========================================
// USAGE EXAMPLES
// ========================================

/*
// Example 1: Check if bucket parallax should run on mobile
const isMobile = window.matchMedia(BREAKPOINTS.mobile).matches;
if (shouldEnableParallax('bucket', isMobile ? 'mobile' : 'desktop')) {
  // Create bucket parallax animation
}

// Example 2: Get scroll trigger config with custom values
const scrollConfig = getScrollTriggerConfig({
  start: "top top",
  scrub: SCROLL_TRIGGER_DEFAULTS.scrubFast,
});

// Example 3: Disable all mobile animations globally
GLOBAL_ANIMATION_SETTINGS.enableAnimations.mobile = false;

// Example 4: Adjust hero bucket start position for mobile
HERO_SCROLL_CONFIG.bucket.startPosition.mobile = -300; // px

// Example 5: Change parallax speed for desktop background
HERO_SCROLL_CONFIG.parallaxSpeed.background.desktop = 0.15;
*/
