# Parallax System Documentation

## Overview

This project uses a minimal-surface-area parallax scrollytelling system powered by GSAP ScrollTrigger. Parallax effects are **enabled only on landscape viewports ≥768px wide**. Phone portrait users see static fallback compositions with a "rotate your phone" notice.

## Folder Layout

```
/public/parallax/
  section-hero/
    foreground/     # FG cutout PNG (transparent center)
    bucket/         # Bucket PNG with alpha
    background/     # BG texture/gradient
    fallback/       # composed_mobile.jpg for phone portrait
  section-discover/
    foreground/
    bucket/
    background/
    fallback/
  section-profile/
    foreground/
    bucket/
    background/
    fallback/
  section-design/
    foreground/
    bucket/
    background/
    fallback/
  section-deliver/
    foreground/
    bucket/
    background/
    fallback/

/content/
  parallaxSections.ts   # Central config for all 5 sections

/components/parallax/
  IsolatedScene.tsx     # Section container
  ParallaxSection.tsx   # Main 3-layer parallax component
  RotateNotice.tsx      # Phone portrait notice

/lib/
  breakpoints.ts        # Viewport breakpoints & media queries
  gsapClient.ts         # Client-side GSAP loader

/hooks/
  useHydrated.ts
  useMediaQuery.ts
  useOrientation.ts
  usePrefersReducedMotion.ts

/styles/
  parallax.css          # Parallax-specific styles
```

## Asset Requirements

### Foreground (FG) Export with Safe Area

When exporting the foreground cutout layer:

1. **Transparent Center**: The foreground is a white "plate" with a transparent hole in the center where the bucket is visible
2. **Safe Area**: Ensure a minimum 15% safe margin on all sides to prevent clipping during parallax movement
3. **Dimensions**: Export at 1920×1080 or higher for crisp rendering on retro displays
4. **Format**: PNG with alpha channel
5. **Object Position**: Default is `center 55%` but can be customized per section

### Bucket Layer

- PNG with alpha channel
- Centered composition
- Export at 2x resolution for sharpness
- Typical size: 600-800px width

### Background Layer

- Full-width texture or gradient
- JPG or PNG depending on transparency needs
- Export at 1920×1080 or higher
- Default object position: `center top`

### Mobile Fallback

- Composed static image showing all layers merged
- Format: JPG for smaller file size
- Dimensions: 768×1024 (portrait orientation)
- This is shown on phone portrait when parallax is disabled

## Three Tuning Knobs

Each section in `/content/parallaxSections.ts` exposes these controls:

### 1. `heightVh` (default: 130)
- Section height in viewport height units
- Range: 100-200vh
- Affects scroll duration and parallax range

### 2. `speeds` (default: `{ fg: 0.35, bucket: 0.52, bg: 0.14, bucketX: 0.06 }`)
- `fg`: Foreground vertical speed multiplier
- `bucket`: Bucket vertical speed multiplier
- `bg`: Background vertical speed multiplier
- `bucketX`: Bucket horizontal drift multiplier
- Lower = slower movement, Higher = faster movement

### 3. `offsetsVh` (default: `{ fg: 0, bucket: -8, bg: 0 }`)
- Initial vertical offset in viewport height percent
- Negative values shift layer up, positive shifts down
- Use to align layers at scroll start position

## Configuration Example

```typescript
{
  id: "bucket-hero",
  heightVh: 130,
  foregroundSrc: "/parallax/section-hero/foreground/fg.png",
  bucketSrc: "/parallax/section-hero/bucket/bucket.png",
  backgroundSrc: "/parallax/section-hero/background/bg.png",
  fallbackMobileSrc: "/parallax/section-hero/fallback/composed_mobile.jpg",
  objectPositionFG: "center 55%",
  objectPositionBG: "center top",
  speeds: { fg: 0.35, bucket: 0.52, bg: 0.14, bucketX: 0.06 },
  offsetsVh: { fg: 0, bucket: -8, bg: 0 },
}
```

## Mini QA Checklist

Before deploying a new parallax section:

- [ ] **Desktop landscape (≥1024px)**: Verify smooth parallax movement for all 3 layers
- [ ] **Tablet landscape (768-1023px)**: Confirm parallax still works, bucket visible
- [ ] **Phone portrait (<768px)**: Check static fallback loads, "rotate" notice appears
- [ ] **Phone landscape**: Verify parallax activates correctly
- [ ] **Reduced Motion**: Confirm animations respect `prefers-reduced-motion` setting
- [ ] **Asset Quality**: All images sharp on retina displays (2x DPI)
- [ ] **Layer Alignment**: Foreground cutout properly reveals bucket at start position
- [ ] **Scroll Range**: Section height feels natural, not too rushed or too slow
- [ ] **Performance**: No jank during scroll, smooth 60fps on mid-range devices

## Editing a Section

1. Update config in `/content/parallaxSections.ts`
2. Adjust `heightVh`, `speeds`, or `offsetsVh` values
3. Save and refresh browser (hard reload: Cmd+Shift+R / Ctrl+Shift+F5)
4. If changing assets, replace files in `/public/parallax/section-{name}/` folders
5. Keep filenames consistent: `fg.png`, `bucket.png`, `bg.png`, `composed_mobile.jpg`

## Adding a New Section

1. Create folder: `/public/parallax/section-{name}/{foreground,bucket,background,fallback}/`
2. Export and place assets in respective folders
3. Add new config object to `PARALLAX_SECTIONS` array in `/content/parallaxSections.ts`
4. Component will automatically render via `map()` in `/app/page.tsx`

## Technical Notes

- **GSAP Context**: Each section uses isolated GSAP context with proper cleanup
- **ScrollTrigger Refresh**: Automatically refreshed after timeline creation to prevent timing issues
- **Transform Rounding**: Y values are rounded with `Math.round()` to reduce sub-pixel shimmer
- **Media Query**: Parallax only activates when `(min-width: 768px) and (orientation: landscape)`
- **Hydration Safe**: Uses `useHydrated` hook to prevent SSR/CSR mismatches
- **CSS Containment**: Scenes use `contain: layout paint` for performance isolation

## Troubleshooting

**Parallax not moving:**
- Check browser console for GSAP errors
- Verify viewport is ≥768px wide and in landscape orientation
- Confirm `speeds` values are not zero or undefined

**Bucket not visible:**
- Verify foreground cutout has transparent center
- Check `offsetsVh.bucket` value (negative = shift up)
- Inspect z-index layers: BG (z-0), Bucket (z-20), FG (z-30)

**Mobile fallback not showing:**
- Confirm `fallbackMobileSrc` path is correct
- Check image exists at `/public/parallax/section-{name}/fallback/composed_mobile.jpg`
- Verify viewport is <768px wide or portrait orientation

**Shimmer/jitter during scroll:**
- Already mitigated with `Math.round()` on transform values
- Ensure images are properly optimized and not too large
- Check for competing CSS transforms on parent elements

## Performance Tips

1. **Image Optimization**: Use WebP format where supported, fallback to optimized JPG/PNG
2. **Lazy Loading**: Only the first section (hero) uses `priority`, others lazy-load
3. **Transform Only**: Parallax uses only `transform` properties (GPU-accelerated)
4. **Isolated Contexts**: Each section has independent GSAP context, prevents memory leaks
5. **Reduced Motion**: Respects accessibility preferences, disables parallax when requested
