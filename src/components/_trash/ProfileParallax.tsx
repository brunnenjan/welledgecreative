// src/components/ProfileParallax.tsx
"use client";

import ParallaxTransition from "./ParallaxTransition";

// ============================================
// ANIMATION CONFIGURATION - ADJUST HERE
// ============================================

const ANIMATION_CONFIG = {
  // MOVEMENT DISTANCES (in pixels)
  // Positive = moves down, Negative = moves up
  bucketMove: 1400,        // Bucket descends from -60vh starting position
  foregroundPhase1: -500, // Foreground initial upward movement (reveal cutout)
  foregroundPhase2: -400, // Foreground continued upward movement (exit)
  backgroundMove: 250,     // Background slow downward drift (parallax depth)

  // TIMING (0.0 to 1.0, where 1.0 = end of scroll section)
  arrowAppears: 0.15,     // When "That's Me" arrow fades in
  arrowDisappears: 0.25,  // When arrow fades out
  foregroundPhase2Start: 0.50, // When foreground accelerates upward

  // SECTION PROPERTIES
  sectionHeight: 4.5,     // Section height in viewport units (vh)

  // POSITIONING
  bucketStartPosition: "-60vh",  // Bucket starts above viewport
  foregroundStartPosition: "20vh", // Foreground starts position
  arrowPosition: "left-[15%]",   // Arrow horizontal position
};

// ============================================

export default function ProfileParallax() {
  return (
    <ParallaxTransition
      backgroundSrc="/background_layer_profile.png"
      foregroundSrc="/foreground_layer_profile.png"
      centerElementSrc="/bucket-with-profile.png"
      showArrow={true}
      arrowLabel="That's Me!"
      arrowPosition={ANIMATION_CONFIG.arrowPosition}
      bgMove={ANIMATION_CONFIG.backgroundMove}
      fgMoveFirst={ANIMATION_CONFIG.foregroundPhase1}
      fgMoveSecond={ANIMATION_CONFIG.foregroundPhase2}
      centerMove={ANIMATION_CONFIG.bucketMove}
      scrollDistance={ANIMATION_CONFIG.sectionHeight}
      arrowShow={ANIMATION_CONFIG.arrowAppears}
      arrowHide={ANIMATION_CONFIG.arrowDisappears}
      continueAfter={ANIMATION_CONFIG.foregroundPhase2Start}
      centerElementTop={ANIMATION_CONFIG.bucketStartPosition}
      foregroundTop={ANIMATION_CONFIG.foregroundStartPosition}
    />
  );
}

