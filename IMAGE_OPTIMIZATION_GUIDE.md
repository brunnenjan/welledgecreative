# Image Optimization Guide

## 🖼️ Current Optimizations Applied

### **1. Preloader Images**
✅ Logo SVG and full logo - using `priority` (above the fold)

### **2. Hero Section**
✅ Hero images use `priority` attribute (critical for LCP)
✅ Bucket, background, and foreground images load immediately

### **3. Logo Carousel**
✅ First set of logos: `loading="eager"`
✅ Clone sets: `loading="lazy"` (below initial viewport)

### **4. Testimonials**
✅ Avatar images: `loading="lazy"` (below the fold)

---

## 📋 Image Loading Strategy

### **Priority Loading** (Above the Fold)
Use `priority` prop for Next.js Image or `loading="eager"` for native img:

```tsx
// Next.js Image Component
<Image
  src="/hero-image.webp"
  priority  // ← Critical for LCP
  alt="Hero"
  width={1200}
  height={800}
/>

// Native img element
<img
  src="/logo.svg"
  loading="eager"  // ← Loads immediately
  alt="Logo"
/>
```

**Apply to:**
- Hero images (background, foreground, bucket)
- Logo in header
- First visible section images
- Preloader assets

### **Lazy Loading** (Below the Fold)
Use `loading="lazy"` for images users need to scroll to see:

```tsx
<Image
  src="/project-image.webp"
  loading="lazy"  // ← Deferred loading
  alt="Project"
  width={800}
  height={600}
/>
```

**Apply to:**
- Logo carousel clones (2nd, 3rd sets)
- Testimonial avatars
- Project images in grid
- Footer images
- Case study images

---

## 🎯 Next.js Image vs Native <img>

### **Use Next.js `<Image>`** when:
- ✅ Image is a static asset in `/public`
- ✅ You know dimensions (width/height)
- ✅ You want automatic optimization
- ✅ You need responsive srcset

```tsx
import Image from "next/image";

<Image
  src="/assets/hero.webp"
  alt="Hero"
  width={1200}
  height={800}
  priority
  sizes="100vw"
/>
```

### **Use Native `<img>`** when:
- ✅ External/dynamic URLs
- ✅ SVGs that need inline manipulation
- ✅ Complex CSS transforms
- ✅ Images already in optimal format

```tsx
<img
  src="/assets/logo.svg"
  alt="Logo"
  loading="lazy"
  decoding="async"
/>
```

---

## 📐 Responsive Images with `sizes`

The `sizes` prop tells the browser which image size to load based on viewport:

```tsx
<Image
  src="/hero.webp"
  alt="Hero"
  fill
  sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
/>
```

**Breakdown:**
- Mobile (≤768px): Full width (`100vw`)
- Tablet (≤1200px): Half width (`50vw`)
- Desktop (>1200px): Third width (`33vw`)

---

## ⚡ Performance Best Practices

### **1. Image Formats**
✅ **WebP** - Best for photos (already using!)
✅ **SVG** - Best for logos/icons
✅ **PNG** - Only for transparency if WebP not supported

### **2. Dimensions**
Always specify width/height to prevent layout shift:

```tsx
// ❌ BAD - causes layout shift
<img src="/image.jpg" alt="Photo" />

// ✅ GOOD - reserves space
<img
  src="/image.jpg"
  alt="Photo"
  width={800}
  height={600}
/>
```

### **3. Decoding**
Add `decoding="async"` to prevent blocking:

```tsx
<img
  src="/photo.jpg"
  alt="Photo"
  loading="lazy"
  decoding="async"  // ← Non-blocking
/>
```

### **4. Preload Critical Images**
For above-the-fold images, add to `<head>`:

```tsx
// In layout.tsx or page.tsx
<link
  rel="preload"
  as="image"
  href="/hero-background.webp"
  type="image/webp"
/>
```

---

## 🔍 Current Implementation Status

### ✅ **Already Optimized:**
1. **Preloader** - Priority loading for logo
2. **Hero Section** - Priority for background/foreground/bucket
3. **Logo Carousel** - Smart loading (eager for first set, lazy for clones)
4. **Testimonials** - Lazy loading for avatars

### 📊 **Performance Metrics to Monitor:**
- **LCP (Largest Contentful Paint)** - Should be < 2.5s
- **CLS (Cumulative Layout Shift)** - Should be < 0.1
- **Image Load Time** - Monitor in DevTools Network tab

---

## 🚀 Quick Optimization Checklist

When adding a new image:

1. **Is it above the fold?**
   - Yes → Use `priority` or `loading="eager"`
   - No → Use `loading="lazy"`

2. **Do you know dimensions?**
   - Yes → Add `width` and `height` props
   - No → Use `fill` with parent container

3. **Is it a static asset?**
   - Yes → Use Next.js `<Image>` component
   - No → Use native `<img>` with optimization attributes

4. **Is it critical for layout?**
   - Yes → Preload in `<head>`
   - No → Let browser prioritize naturally

---

## 📱 Mobile-Specific Optimizations

### **1. Responsive Images**
Serve smaller images on mobile:

```tsx
<Image
  src="/hero.webp"
  alt="Hero"
  width={1200}
  height={800}
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 80vw,
         1200px"
/>
```

### **2. Lazy Load Aggressively**
Mobile users scroll less, lazy load more:

```tsx
// Desktop: Load images 200px before viewport
// Mobile: Load images 50px before viewport
loading="lazy"
```

### **3. Reduce Hero Images**
Consider smaller hero images on mobile:

```tsx
const heroSrc = isMobile
  ? "/hero-mobile.webp"  // Smaller file
  : "/hero-desktop.webp"
```

---

## 🛠️ Tools for Optimization

### **Check Current Performance:**
```bash
# Run Lighthouse audit
npm run build
npm start
# Open Chrome DevTools > Lighthouse > Run Audit
```

### **Analyze Images:**
1. Chrome DevTools > Network > Filter by "Img"
2. Check file sizes and load times
3. Look for images > 200KB (consider optimization)

### **Optimize Images:**
```bash
# Convert to WebP (if needed)
cwebp input.jpg -o output.webp -q 80

# Optimize SVG
npx svgo input.svg -o output.svg
```

---

## 📊 Expected Results

After proper image optimization:

✅ **Faster Page Load** - Images load only when needed
✅ **Better LCP** - Hero images load immediately
✅ **Less Bandwidth** - Smaller images on mobile
✅ **No Layout Shift** - Dimensions prevent CLS
✅ **Smooth Scrolling** - Lazy loading doesn't block

---

## 🔧 Troubleshooting

### **Image loads too early:**
- Check if `loading="eager"` is unnecessary
- Consider changing to `loading="lazy"`

### **Image loads too late:**
- Add `priority` for critical images
- Consider preloading in `<head>`

### **Layout shift on load:**
- Always specify `width` and `height`
- Or use `fill` with parent container

### **Blurry images on high-DPI:**
- Use `sizes` prop for responsive loading
- Serve 2x images for retina displays

---

## 💡 Pro Tips

1. **Test on 3G** - Chrome DevTools > Network > Slow 3G
2. **Monitor with Lighthouse** - Run audits regularly
3. **Use WebP** - 30% smaller than JPEG with same quality
4. **Lazy load aggressively** - Only hero/logo need priority
5. **Set dimensions** - Prevent layout shift always

---

## 📚 Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web.dev Image Performance](https://web.dev/fast/#optimize-your-images)
- [Can I Use WebP](https://caniuse.com/webp)

---

**Remember:** Optimized images = Faster site = Better UX = Higher conversion! 🚀
