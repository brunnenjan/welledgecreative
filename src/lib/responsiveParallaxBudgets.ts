// ========================================
// RESPONSIVE PARALLAX BUDGETS
// ========================================
// Movement budgets for tablet and mobile devices
// Desktop (≥1024px) uses full config values
// Tablet/Mobile use percentage-based reductions

/**
 * Movement budget percentages by device
 * These represent the maximum vertical travel as % of section height
 */
export const PARALLAX_MOVEMENT_BUDGETS = {
  // Desktop: ≥1024px - Full parallax with pinning
  desktop: {
    bgMax: 1.0,      // 100% of configured movement
    midMax: 1.0,     // 100% of configured movement
    fgMax: 1.0,      // 100% of configured movement
    enablePinning: true,
  },

  // Tablet: 768-1023px - Reduced parallax, no pinning
  tablet: {
    bgMax: 0.08,     // 6-8% vertical movement
    midMax: 0.12,    // 10-12% vertical movement
    fgMax: 0.16,     // 14-16% vertical movement
    enablePinning: false,
  },

  // Mobile: <768px - Minimal parallax, no pinning
  mobile: {
    bgMax: 0.04,     // 3-4% vertical movement
    midMax: 0.08,    // 6-8% vertical movement
    fgMax: 0.10,     // 8-10% vertical movement
    enablePinning: false,
  },
} as const;

/**
 * Calculate movement multiplier based on device and layer
 * @param isMobile - Is mobile viewport
 * @param isTablet - Is tablet viewport
 * @param layer - Which layer (bg/mid/fg)
 * @returns Movement multiplier to apply to base speed
 */
export function getParallaxMultiplier(
  isMobile: boolean,
  isTablet: boolean,
  layer: 'bg' | 'mid' | 'fg'
): number {
  if (isMobile) {
    switch (layer) {
      case 'bg': return PARALLAX_MOVEMENT_BUDGETS.mobile.bgMax;
      case 'mid': return PARALLAX_MOVEMENT_BUDGETS.mobile.midMax;
      case 'fg': return PARALLAX_MOVEMENT_BUDGETS.mobile.fgMax;
    }
  }

  if (isTablet) {
    switch (layer) {
      case 'bg': return PARALLAX_MOVEMENT_BUDGETS.tablet.bgMax;
      case 'mid': return PARALLAX_MOVEMENT_BUDGETS.tablet.midMax;
      case 'fg': return PARALLAX_MOVEMENT_BUDGETS.tablet.fgMax;
    }
  }

  // Desktop: full movement
  return 1.0;
}

/**
 * Check if pinning should be enabled for current viewport
 */
export function shouldEnablePinning(isMobile: boolean, isTablet: boolean): boolean {
  if (isMobile) return PARALLAX_MOVEMENT_BUDGETS.mobile.enablePinning;
  if (isTablet) return PARALLAX_MOVEMENT_BUDGETS.tablet.enablePinning;
  return PARALLAX_MOVEMENT_BUDGETS.desktop.enablePinning;
}

export type ParallaxBudgets = typeof PARALLAX_MOVEMENT_BUDGETS;
