// ========================================
// PARALLAX SETTINGS CONFIGURATION
// ========================================
// Centralized parallax configuration for all sections (Hero, Profile, Discover, Design, Deliver)
// Each section has device-specific settings (mobile, tablet, desktop)

export const PARALLAX_CONFIG = {
  hero: {
    mobile: {
      bgSpeed: 1.06,
      fgSpeed: -0.15,
      bucketSpeed: 0.08,
      bucketStart: -220, // Initial Y offset (negative = above viewport)
      bucketDropMultiplier: 1.6,
      pinMultiplier: 1.6,
      holdMultiplier: 2,
      scrub: 5.5,
      swingAngle: 1.1,
    },
    tablet: {
      bgSpeed: 0.085,
      fgSpeed: -0.2,
      bucketSpeed: 0.1,
      bucketStart: -100,
      bucketDropMultiplier: 1.75,
      pinMultiplier: 1.7,
      holdMultiplier: 2,
      scrub: 5.5,
      swingAngle: 1.5,
    },
    desktop: {
      bgSpeed: 0.1,
      fgSpeed: -0.24,
      bucketSpeed: 0.11,
      bucketStart: -140,
      bucketDropMultiplier: 1.9,
      pinMultiplier: 1.8,
      holdMultiplier: 2,
      scrub: 5.5,
      swingAngle: 1.8,
    },
  },
  profile: {
    mobile: {
      bgSpeed: 0.1,
      fgSpeed: -0.08,
      bucketSpeed: 0.4,
      bucketStart: 60,
      bucketWidth: 1440, // 2x larger bucket on mobile (720 * 2)
    },
    tablet: {
      bgSpeed: 0.12,
      fgSpeed: 0,
      bucketSpeed: 0.42,
      bucketStart: -20,
      bucketWidth: 1150,
    },
    desktop: {
      bgSpeed: 0.15,
      fgSpeed: -0.12,
      bucketSpeed: 0.4,
      bucketStart: -180,
      bucketWidth: 1350, // 1.5× base size (900 × 1.5)
    },
  },
  discover: {
    mobile: {
      bgSpeed: 0.1,
      fgSpeed: -0.08,
      bucketSpeed: 0.5,
      bucketStart: -60,
    },
    tablet: {
      bgSpeed: 0.12,
      fgSpeed: -0.1,
      bucketSpeed: 0.6,
      bucketStart: -280,
    },
    desktop: {
      bgSpeed: 0.15,
      fgSpeed: -0.12,
      bucketSpeed: 0.75,
      bucketStart: -250,
    },
  },
  design: {
    mobile: {
      bgSpeed: 0.1,
      fgSpeed: -0.08,
      bucketSpeed: 0.6,
      bucketStart: 50,
    },
    tablet: {
      bgSpeed: 0.12,
      fgSpeed: -0.1,
      bucketSpeed: 0.6,
      bucketStart: -60,
    },
    desktop: {
      bgSpeed: 0.15,
      fgSpeed: -0.12,
      bucketSpeed: 0.85,
      bucketStart: -100,
    },
  },
  deliver: {
    mobile: {
      bgSpeed: 0.1,
      fgSpeed: -0.08,
      bucketSpeed: 0.5,
      bucketStart: 50,
    },
    tablet: {
      bgSpeed: 0.12,
      fgSpeed: -0.1,
      bucketSpeed: 0.6,
      bucketStart: -80,
    },
    desktop: {
      bgSpeed: 0.15,
      fgSpeed: -0.12,
      bucketSpeed: 0.75,
      bucketStart: -100,
    },
  },
  caseStudyCta: {
    mobile: {
      bgSpeed: 0.1,
      fgSpeed: -0.08,
      bucketSpeed: 0.55,
      bucketStart: -120,
    },
    tablet: {
      bgSpeed: 0.12,
      fgSpeed: -0.1,
      bucketSpeed: 0.65,
      bucketStart: -260,
    },
    desktop: {
      bgSpeed: 0.15,
      fgSpeed: -0.12,
      bucketSpeed: 0.85,
      bucketStart: -380,
    },
  },
} as const;

// Type helper for device detection
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// Type helper for section names
export type SectionName = keyof typeof PARALLAX_CONFIG;

// Helper function to get section config for a device
export function getSectionConfig(section: SectionName, device: DeviceType) {
  return PARALLAX_CONFIG[section][device];
}
