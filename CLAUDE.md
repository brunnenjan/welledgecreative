# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio website for Well Edge Creative, a branding and web design agency. The site features custom GSAP-powered parallax animations, particularly a signature "bucket in a well" effect that serves as the hero section.

**Tech Stack:**
- Next.js 15.4.6 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4 (via PostCSS plugin)
- GSAP 3 with ScrollTrigger
- German language content (lang="de")

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

The dev server runs on http://localhost:3000

## Architecture

### Route Structure

The site uses Next.js App Router with the following pages:
- `/` - Home page with BucketHero and initial content sections
- `/work` - Case studies grid (WorkGrid component)
- `/about` - About section with GSAP scroll-reveal animations
- `/services` - Services page
- `/approach` - Approach page
- `/contact` - Contact page

### Component Architecture

**Hero Components:**
- `BucketHero.tsx` - Main hero with GSAP ScrollTrigger pinning, parallax layers (background, foreground cutout), and animated bucket
- `ParallaxSection.tsx` - Reusable parallax section with configurable speeds for bg/fg layers and optional bucket

**Layout Components:**
- `Header.tsx` - Fixed header with scroll-based styling (white bg initially, black/blur on scroll)
- Navigation uses hash links for same-page sections (e.g., `/#leistungen`)

**Content Components:**
- `WorkGrid.tsx`, `WorkCard.tsx` - Display case studies from `src/app/data/cases.ts`
- `Section.tsx`, `ContentBlock.tsx` - Reusable content sections
- Various parallax/foreground components for visual effects

### GSAP Integration

**GSAP Setup:**
- GSAP and ScrollTrigger are centralized in `src/lib/gsap.ts`
- Uses `getGsap()` helper to ensure plugins are registered only on client
- All GSAP components are client components (`"use client"`)

**Key Patterns:**
1. Always use `gsap.context()` for cleanup
2. Wrap initialization in `useLayoutEffect` (or `useEffect` for non-critical animations)
3. Return cleanup function: `ctx?.revert()`
4. Check `window.matchMedia('(prefers-reduced-motion: reduce)')` before animations
5. Use `will-change-transform` class for animated elements
6. Wait for images to load before initializing ScrollTrigger (see BucketHero.tsx:37-53)

**BucketHero Parallax Logic:**
- Pins the hero section using ScrollTrigger
- Background moves down slowly, foreground cutout moves up faster
- Bucket descends into the well with subtle swing animation
- Uses viewport height (vh) units for scroll distances

### Styling System

**Theme Variables (in globals.css):**
```css
--background: #0a0a0a (dark)
--foreground: #ededed (light text)
--accent: #ff7a00 (orange)
--accent-hover: #e66d00
```

**Key Utility Classes:**
- `.btn-accent` - Orange button styling
- `.link-accent` - Orange link with hover opacity
- `.foreground-fade` - Gradient mask for foreground layers
- `.bucket-swing` - Keyframe animation for bucket swinging
- `.will-change-transform` - Performance optimization for animated elements

**Accessibility:**
- `.skip-link` - Skip to content link
- `.sr-only` - Screen reader only content
- `:focus-visible` - Custom focus styling with accent color
- Respects `prefers-reduced-motion`

### Data Management

**Case Studies:**
- Defined in `src/app/data/cases.ts` as typed array
- Type: `Case` with fields: slug, title, client, sector, year, role[], outcome, summary, problem, approach, result, site?, color?, images[]
- Sectors: "Retreat" | "Education" | "Healthcare" | "Small Business" | "Music" | "Hospitality"

### Path Aliases

TypeScript is configured with `@/*` alias mapping to `./src/*`:
```typescript
import { getGsap } from '@/lib/gsap';
import WorkGrid from '@/components/WorkGrid';
```

### Image Assets

Images are stored in `/public`:
- `/public/background-Section-1.png` - Section backgrounds
- `/public/bucket-rope-long-angled.png` - Bucket with rope asset
- `/public/foreground_Startingpage.png` - Foreground cutout layers
- `/public/well_deep_down_2.jpg` - Well background
- `/public/cases/[slug]/` - Case study images

Use Next.js `<Image>` component with:
- `priority` for above-fold images
- `fill` for container-fitted images
- `sizes` for responsive images

## Development Notes

1. **GSAP ScrollTrigger**: Always call `ScrollTrigger.refresh()` after dynamic content loads or layout changes
2. **Client vs Server**: GSAP components must use `"use client"` directive
3. **Performance**: Images use hardware acceleration via `will-change-transform` but remain visible
4. **Turbopack**: Dev server uses Turbopack for fast refresh
5. **Strict Mode**: TypeScript strict mode is enabled
6. **Language**: Content is in German; consider this when adding text
