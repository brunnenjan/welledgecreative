# Scroll Configuration Guide

## Overview

This guide explains how to use the **central scroll configuration system** to control all scroll-based animations across the website.

All scroll and parallax settings are now centralized in two files:
- `src/config/scrollConfig.ts` - High-level animation controls and toggles
- `src/config/parallaxSettings.ts` - Detailed per-section, per-device values

## Quick Start

### Location
```
src/config/
├── scrollConfig.ts         ← Main control file (start here)
└── parallaxSettings.ts     ← Detailed settings (advanced)
```

### Common Tasks

#### 1. Disable Mobile Animations Globally
```typescript
// In src/config/scrollConfig.ts
export const GLOBAL_ANIMATION_SETTINGS = {
  enableAnimations: {
    mobile: false,  // ← Set to false
    tablet: true,
    desktop: true,
  },
};
```

#### 2. Enable Background Parallax on Mobile
```typescript
// In src/config/scrollConfig.ts
export const GLOBAL_ANIMATION_SETTINGS = {
  enableParallax: {
    background: {
      mobile: true,  // ← Set to true (currently false for performance)
      tablet: true,
      desktop: true,
    },
  },
};
```

#### 3. Adjust Hero Bucket Start Position
```typescript
// In src/config/scrollConfig.ts
export const HERO_SCROLL_CONFIG = {
  bucket: {
    startPosition: {
      mobile: -300,   // ← Change value (negative = higher up)
      tablet: -100,
      desktop: -140,
    },
  },
};
```

#### 4. Change Scroll Animation Speed
```typescript
// In src/config/scrollConfig.ts
export const SCROLL_TRIGGER_DEFAULTS = {
  scrubDefault: 3.8,   // ← Higher = smoother but slower
  scrubFast: 1,        // ← Lower = faster, more responsive
  scrubSlow: 5.5,      // ← Higher = very smooth, gradual
};
```

## Configuration Structure

### Global Settings

#### Animation Toggles
Control which animation types run on which devices:

```typescript
GLOBAL_ANIMATION_SETTINGS = {
  enableAnimations: {
    mobile: boolean    // Master switch for mobile
    tablet: boolean    // Master switch for tablet
    desktop: boolean   // Master switch for desktop
  },

  enableParallax: {
    background: { mobile, tablet, desktop }  // BG layer parallax
    foreground: { mobile, tablet, desktop }  // FG layer parallax
    bucket: { mobile, tablet, desktop }      // Bucket parallax
  },

  enableBucketAnimations: {
    fade: boolean      // Fade in/out
    scale: boolean     // Scale up/down
    swing: boolean     // Continuous swing
  }
}
```

**Current Defaults:**
- ✅ Mobile: Bucket animations ON, BG/FG parallax OFF (performance)
- ✅ Tablet: All animations ON
- ✅ Desktop: All animations ON

#### Scroll Trigger Defaults
Control ScrollTrigger behavior globally:

```typescript
SCROLL_TRIGGER_DEFAULTS = {
  markers: false,              // Show debug markers
  anticipatePin: 1,            // Pinning performance
  defaultStart: "top bottom",  // When animation starts
  defaultEnd: "+=200%",        // Scroll distance
  scrubDefault: 3.8,          // Default smoothness
  scrubFast: 1,               // Fast animations
  scrubSlow: 5.5,             // Slow, smooth animations
}
```

### Device Breakpoints

Matches CSS media queries:

```typescript
BREAKPOINTS = {
  mobile: "(max-width: 768px)",
  tablet: "(min-width: 769px) and (max-width: 1024px)",
  desktop: "(min-width: 1025px)",
}
```

### Hero Section Config

Control the main hero section bucket animation:

```typescript
HERO_SCROLL_CONFIG = {
  enablePinning: {
    mobile: false,    // No pinning on mobile (simple scroll)
    tablet: true,     // Pin section on tablet
    desktop: true,    // Pin section on desktop
  },

  bucket: {
    startPosition: {  // Initial Y offset (negative = above viewport)
      mobile: -220px,
      tablet: -100px,
      desktop: -140px,
    },
    dropDistance: {   // How far bucket drops
      mobile: 1.6,
      tablet: 1.75,
      desktop: 1.9,
    },
    swingAngle: {     // Swing animation angle (degrees)
      mobile: 1.1,
      tablet: 1.5,
      desktop: 1.8,
    },
  },

  parallaxSpeed: {    // 0 = no movement, higher = faster
    background: { mobile, tablet, desktop },
    foreground: { mobile, tablet, desktop },
  },
}
```

### Parallax Sections Config

Control Profile, Discover, Design, Deliver sections:

```typescript
PARALLAX_SECTIONS_CONFIG = {
  profile: {
    bucketStart: {     // Initial position
      mobile: 120px,   // Below viewport (positive)
      tablet: -80px,   // Above viewport (negative)
      desktop: -120px,
    },
    bucketWidth: {     // Bucket size
      mobile: 720px,
      tablet: 1150px,
      desktop: 1350px,
    },
    bucketSpeed: {     // Scroll speed
      mobile: 0.3,
      tablet: 0.42,
      desktop: 0.4,
    },
  },
  // ... similar for discover, design, deliver
}
```

## Helper Functions

Use these functions in your components:

```typescript
// Check if animations should run
import { shouldEnableAnimations } from '@/config/scrollConfig';

const isMobile = window.matchMedia("(max-width: 768px)").matches;
if (shouldEnableAnimations(isMobile ? 'mobile' : 'desktop')) {
  // Create animations
}
```

```typescript
// Check if specific parallax should run
import { shouldEnableParallax } from '@/config/scrollConfig';

if (shouldEnableParallax('bucket', 'mobile')) {
  // Create bucket parallax
}
```

```typescript
// Get scroll trigger config with overrides
import { getScrollTriggerConfig } from '@/config/scrollConfig';

const config = getScrollTriggerConfig({
  start: "top top",
  scrub: 1,
});
```

## Common Scenarios

### Scenario 1: Mobile Performance Issues
**Problem:** Animations are laggy on mobile
**Solution:**
```typescript
// Disable heavy parallax on mobile
enableParallax: {
  background: { mobile: false, ... },
  foreground: { mobile: false, ... },
  bucket: { mobile: true, ... },  // Keep bucket (lightweight)
}
```

### Scenario 2: Bucket Starts Too Low
**Problem:** Bucket is visible before animation starts
**Solution:**
```typescript
// Move bucket higher (more negative)
HERO_SCROLL_CONFIG.bucket.startPosition.mobile = -300; // Was -220
```

### Scenario 3: Animations Feel Too Slow
**Problem:** Scroll animations lag behind scrolling
**Solution:**
```typescript
// Reduce scrub value (faster, more responsive)
SCROLL_TRIGGER_DEFAULTS.scrubDefault = 1.5; // Was 3.8
```

### Scenario 4: Animations Too Fast/Jerky
**Problem:** Animations don't feel smooth
**Solution:**
```typescript
// Increase scrub value (smoother, more gradual)
SCROLL_TRIGGER_DEFAULTS.scrubDefault = 5.5; // Was 3.8
```

## Advanced: Per-Device Customization

Use ScrollTrigger.matchMedia() in components:

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BREAKPOINTS, HERO_SCROLL_CONFIG } from '@/config/scrollConfig';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({
  [BREAKPOINTS.mobile]: () => {
    const config = HERO_SCROLL_CONFIG.bucket.startPosition.mobile;
    // Mobile-specific animations
  },

  [BREAKPOINTS.tablet]: () => {
    const config = HERO_SCROLL_CONFIG.bucket.startPosition.tablet;
    // Tablet-specific animations
  },

  [BREAKPOINTS.desktop]: () => {
    const config = HERO_SCROLL_CONFIG.bucket.startPosition.desktop;
    // Desktop-specific animations
  },
});
```

## Debugging

### Enable ScrollTrigger Markers
```typescript
// In src/config/scrollConfig.ts
SCROLL_TRIGGER_DEFAULTS.markers = true;  // Shows visual markers
```

### Check Current Device Settings
```typescript
import { BREAKPOINTS } from '@/config/scrollConfig';

const isMobile = window.matchMedia(BREAKPOINTS.mobile).matches;
const isTablet = window.matchMedia(BREAKPOINTS.tablet).matches;
const isDesktop = window.matchMedia(BREAKPOINTS.desktop).matches;

console.log({ isMobile, isTablet, isDesktop });
```

## Best Practices

1. **Always test on real devices** - Not just browser resize
2. **Start conservative on mobile** - Disable heavy animations first
3. **Use scrub for smoothness** - Higher values = smoother
4. **Negative values = above viewport** - For bucket positions
5. **Keep bucket animations lightweight** - Safe for mobile
6. **Document your changes** - Add comments when customizing

## File Structure

```
src/
├── config/
│   ├── scrollConfig.ts          ← Main control (edit this first)
│   └── parallaxSettings.ts      ← Detailed values (advanced)
├── components/
│   ├── BucketHero.tsx           ← Uses hero config
│   ├── ProfileParallaxSimple.tsx ← Uses profile config
│   ├── DiscoverParallax.tsx     ← Uses discover config
│   ├── DesignParallax.tsx       ← Uses design config
│   └── DeliverParallax.tsx      ← Uses deliver config
└── lib/
    └── gsap.ts                  ← GSAP initialization
```

## Quick Reference

| Setting | Location | Mobile Default | Purpose |
|---------|----------|----------------|---------|
| Background Parallax | `GLOBAL_ANIMATION_SETTINGS.enableParallax.background.mobile` | `false` | BG layer movement |
| Foreground Parallax | `GLOBAL_ANIMATION_SETTINGS.enableParallax.foreground.mobile` | `false` | FG layer movement |
| Bucket Parallax | `GLOBAL_ANIMATION_SETTINGS.enableParallax.bucket.mobile` | `true` | Bucket movement |
| Hero Bucket Start | `HERO_SCROLL_CONFIG.bucket.startPosition.mobile` | `-220px` | Initial bucket Y |
| Scrub Speed | `SCROLL_TRIGGER_DEFAULTS.scrubDefault` | `3.8` | Animation smoothness |
| Debug Markers | `SCROLL_TRIGGER_DEFAULTS.markers` | `false` | Visual debugging |

## Support

For questions or issues with scroll configuration:
1. Check this guide first
2. Review `scrollConfig.ts` comments
3. Test with `markers: true` enabled
4. Check browser console for errors

---

**Last Updated:** 2025-01-13
**Version:** 1.0
