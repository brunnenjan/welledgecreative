# Parallax Adjustment Guide

All parallax settings are controlled from **ONE FILE**: `src/lib/parallaxConfig.ts`

**Note:** White space is now handled in the foreground images themselves. Adjust image height and add white space directly in your design files.

---

## 📍 Main Configuration File

**File:** `src/lib/parallaxConfig.ts`

All parallax sections use these shared settings. Changes here affect all sections.

---

## 🎛️ Settings You Can Adjust

### 1. Animation Speeds (Lines 11-13)

```typescript
BG_SPEED: 60,           // Background layer speed
FG_SPEED: -120,         // Foreground layer speed (negative = moves up)
BUCKET_SPEED: 700,      // Bucket scroll speed
```

**What it does:**
- Higher numbers = faster movement during scroll
- **BG_SPEED**: Background drift (try 40-100)
- **FG_SPEED**: Foreground upward motion (try -80 to -160)
- **BUCKET_SPEED**: How fast bucket descends (try 500-1000)

**Common adjustments:**
- Bucket too slow → Increase BUCKET_SPEED to 800-900
- Bucket too fast → Decrease BUCKET_SPEED to 500-600

---

### 2. Scroll Smoothness (Line 16)

```typescript
SCRUB: 2.2,             // Higher = smoother/slower
```

**What it does:**
- Controls how tightly scroll is tied to animation
- Higher = smoother, more "floaty"
- Lower = tighter, more responsive

**Try:** 1.5 (snappy) to 3.0 (very smooth)

---

### 3. Section Size (Line 19)

```typescript
SECTION_HEIGHT: "180vh",
```

**What it does:**
- Total height of the parallax section
- Affects how long the parallax effect lasts

**Try:** 150vh (shorter) to 220vh (longer)

---

### 4. Background Position (Lines 22-23)

```typescript
BG_TOP: "25vh",         // Starting position
BG_HEIGHT: "160vh",     // Background height
```

**What it does:**
- **BG_TOP**: Where background starts (higher = lower on screen)
- **BG_HEIGHT**: How tall the background layer is

**Adjust:** Change BG_TOP by ±10vh to move background up/down

---

### 5. Bucket Position (Lines 26-27)

```typescript
BUCKET_TOP: "-35vh",    // Starting position
BUCKET_HEIGHT: "160vh", // Bucket height
```

**What it does:**
- **BUCKET_TOP**: Where bucket starts (more negative = higher up = appears earlier)
- **BUCKET_HEIGHT**: How tall the bucket container is

**Common adjustments:**
- Bucket appears too early → Make less negative (e.g., `-30vh`)
- Bucket appears too late → Make more negative (e.g., `-40vh`)
- Bucket too low in frame → Increase to `-25vh`
- Bucket too high in frame → Decrease to `-45vh`

---

### 6. Foreground Position (Lines 30-31)

```typescript
FG_TOP: "50vh",         // Starting position
FG_MIN_HEIGHT: "220vh", // Minimum foreground height
```

**What it does:**
- **FG_TOP**: Where foreground starts (higher = starts lower on screen)
- **FG_MIN_HEIGHT**: Minimum height of foreground layer

**Adjust:** Change FG_TOP by ±10vh to move foreground layer start position

---

### 7. White Fill (Lines 34-35)

```typescript
FG_FILL_TOP: "500vh",   // Where white fill starts
FG_FILL_HEIGHT: "50vh", // White fill height
```

**What it does:**
- White rectangle inside foreground for additional coverage
- Usually doesn't need adjustment

---

### 8. Post-Profile White Space (Line 38)

```typescript
POST_FILL_HEIGHT: "30vh",
```

**What it does:**
- White space that appears AFTER the profile section ends
- Only applies to Profile section, not separators

**Adjust:** Increase to 50vh-100vh if you need more white space after profile

---

### 9. Timing (Profile Section Only) (Lines 42-47)

```typescript
BUCKET_REVEAL_PROGRESS: 0.12,     // When bucket appears
OVERLAY_FADE_IN_PROGRESS: 0.28,   // When profile info fades in
OVERLAY_FADE_OUT_PROGRESS: 0.72,  // When profile info fades out
ARROW_FADE_IN_PROGRESS: 0.32,     // When "That's Me" arrow appears
ARROW_FADE_OUT_PROGRESS: 0.74,    // When arrow disappears
```

**What it does:**
- Controls when elements appear/disappear during scroll
- Values between 0 (start) and 1 (end)
- Lower number = appears earlier

**Examples:**
- Profile info appears too late → Change OVERLAY_FADE_IN_PROGRESS to 0.20
- Arrow disappears too early → Change ARROW_FADE_OUT_PROGRESS to 0.80

---

## 🎯 Quick Adjustments

| Want to... | Change this | To this |
|-----------|-------------|---------|
| Move bucket lower in frame | BUCKET_TOP | Less negative (e.g., -25vh) |
| Move bucket higher in frame | BUCKET_TOP | More negative (e.g., -45vh) |
| Make bucket move faster | BUCKET_SPEED | Higher (e.g., 900) |
| Make bucket move slower | BUCKET_SPEED | Lower (e.g., 500) |
| Make everything smoother | SCRUB | Higher (e.g., 3.0) |
| Make everything snappier | SCRUB | Lower (e.g., 1.5) |
| Profile info appears earlier | OVERLAY_FADE_IN_PROGRESS | Lower (e.g., 0.20) |
| More white space after profile | POST_FILL_HEIGHT | Higher (e.g., 80vh) |

---

## 💡 Testing Tips

1. **Open the file**: `src/lib/parallaxConfig.ts`
2. **Make ONE small change** at a time (±5-10 units)
3. **Save** - browser updates instantly!
4. **Test scroll** through the section
5. **Adjust again** if needed

**Recommended increments:**
- Speeds: ±50-100
- Positions: ±5vh
- Timing: ±0.05
- SCRUB: ±0.3

---

## 📊 Current Values

| Setting | Current Value | Line |
|---------|---------------|------|
| BG_SPEED | 60 | 11 |
| FG_SPEED | -120 | 12 |
| BUCKET_SPEED | 700 | 13 |
| SCRUB | 2.2 | 16 |
| BUCKET_TOP | -35vh | 26 |
| FG_TOP | 50vh | 30 |
| POST_FILL_HEIGHT | 30vh | 38 |

---

## 🔧 For White Space Adjustments

**Important:** White space between sections is now handled in your foreground images.

To adjust gaps:
1. Open your foreground image in your design tool
2. Add white space at the top/bottom of the image
3. Export with the new dimensions
4. Replace the image file

This gives you more precise control and keeps the code simple!

---

**Need help?** All settings have inline comments in the config file explaining what they do.
