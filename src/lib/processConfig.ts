// Configuration for Process (How I Work) section animations

export const PROCESS_CONFIG = {
  // Bucket fade-in timing
  BUCKET_FADE_IN: {
    delay: 0.2,              // Delay before fade-in starts (seconds)
    duration: 1.2,           // Duration of fade-in animation (seconds)
    ease: "power2.out",      // Easing function
    offsetStart: "top 85%",  // Scroll position to trigger (earlier = bucket visible sooner)
  },

  // Section reveal timing
  START_OFFSET: 80,          // General section animation start (%)
} as const;
