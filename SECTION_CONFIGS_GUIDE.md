# Parallax Section Configuration Guide

Each parallax section has its own configuration file!

---

## 📁 Configuration Files

### 1. Profile Section
**File:** `src/lib/profileConfig.ts`

### 2. Separator After Hero
**File:** `src/lib/separatorAfterHeroConfig.ts`

### 3. Separator After Process
**File:** `src/lib/separatorAfterProcessConfig.ts`

### 4. Separator After Logos
**File:** `src/lib/separatorAfterLogosConfig.ts`

---

## 🎛️ Settings in Each Config

All config files have the same structure:

```typescript
{
  // ANIMATION SPEEDS
  BG_SPEED: 60,           // Background speed
  FG_SPEED: -120,         // Foreground speed (negative = up)
  BUCKET_SPEED: 700,      // Bucket speed

  // SMOOTHNESS
  SCRUB: 2.2,             // Higher = smoother

  // SECTION SIZE
  SECTION_HEIGHT: "180vh",

  // BACKGROUND
  BG_TOP: "25vh",         // Start position
  BG_HEIGHT: "160vh",

  // BUCKET
  BUCKET_TOP: "-15vh",    // Start position (negative = higher)
  BUCKET_HEIGHT: "160vh",

  // FOREGROUND
  FG_TOP: "80vh",         // Start position
  FG_MIN_HEIGHT: "220vh",

  // WHITE FILL (inside foreground)
  FG_FILL_TOP: "500vh",
  FG_FILL_HEIGHT: "50vh",
}
```

### Profile Section Only:
```typescript
{
  POST_FILL_HEIGHT: "30vh",           // White space after section
  BUCKET_REVEAL_PROGRESS: 0.22,       // When bucket appears
  OVERLAY_FADE_IN_PROGRESS: 0.28,     // When info fades in
  OVERLAY_FADE_OUT_PROGRESS: 0.72,    // When info fades out
  ARROW_FADE_IN_PROGRESS: 0.32,       // When arrow appears
  ARROW_FADE_OUT_PROGRESS: 0.74,      // When arrow disappears
}
```

---

## 🎯 Quick Adjustments

### Move bucket lower in profile
1. Open `src/lib/profileConfig.ts`
2. Change `BUCKET_TOP: "-15vh"` → `"-10vh"`
3. Save

### Make separator bucket move faster
1. Open `src/lib/separatorAfterHeroConfig.ts` (or other separator)
2. Change `BUCKET_SPEED: 700` → `900`
3. Save

### Change foreground start position
1. Open any config file
2. Change `FG_TOP: "80vh"` → `"70vh"` (starts higher)
3. Save

---

## 💡 Common Values to Adjust

| Setting | What it does | Try these values |
|---------|--------------|------------------|
| BUCKET_TOP | Bucket starting height | -50vh to -10vh |
| BUCKET_SPEED | How fast bucket moves | 500-1000 |
| FG_TOP | Foreground start position | 50vh-90vh |
| SCRUB | Smoothness | 1.5-3.0 |
| BG_SPEED | Background drift | 40-100 |

---

## ⚡ Quick Tips

1. **Change ONE value at a time**
2. **Save the file** - see changes instantly
3. **Small increments**: ±5vh for positions, ±100 for speeds
4. **Profile is separate** - changes won't affect separators
5. **Each separator is independent** - adjust individually!

---

## 📊 Current Defaults

**Profile Section:**
- BUCKET_TOP: -15vh
- BUCKET_SPEED: 700
- FG_TOP: 80vh

**All Separators:**
- BUCKET_TOP: -50vh
- BUCKET_SPEED: 700
- FG_TOP: 65vh

---

**White space is in your images!** Add white pixels to foreground images for gaps.
