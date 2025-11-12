# CSS Variables Design System Guide

## 🎨 Why CSS Variables?

Previously, when we changed the brand colors from `#ff7a00` to `#f58222`, we had to update **40+ files**. With CSS variables, you can now change colors, fonts, spacing, and more in **ONE PLACE**.

## 📍 Where to Find Them

All design tokens are centralized in:
```
src/app/globals.css
```

Look for the `:root` block at the top of the file.

## 🎯 Quick Examples

### Colors

**Instead of hardcoding:**
```css
.button {
  background: #f58222;
  color: #ffffff;
}
```

**Use variables:**
```css
.button {
  background: var(--color-accent);
  color: var(--color-white);
}
```

**In React inline styles:**
```tsx
<div style={{ color: 'var(--color-accent)' }}>
  Hello World
</div>
```

### Typography

```css
.heading {
  font-family: var(--font-sans);
  font-size: var(--text-4xl);
  color: var(--color-text-primary);
}
```

### Spacing

```css
.card {
  padding: var(--space-6);
  margin-bottom: var(--space-12);
  border-radius: var(--radius-lg);
}
```

## 📦 Available Variable Categories

### 🎨 Colors

#### Brand Colors
- `--color-accent` → `#f58222` (Hellorange - primary brand)
- `--color-accent-hover` → `#d35c2c` (Dunkelorange - darker variant)
- `--color-accent-light` → `rgba(245, 130, 34, 0.1)` (10% opacity)
- `--color-accent-rgb` → `245, 130, 34` (for custom rgba usage)

#### Base Colors
- `--color-white` → `#ffffff`
- `--color-black` → `#000000`
- `--color-background` → `#ffffff`
- `--color-foreground` → `#171717`

#### Neutral Grays
- `--color-gray-50` → `#fafafa` (lightest)
- `--color-gray-100` → `#f5f5f5`
- `--color-gray-200` → `#e5e5e5`
- `--color-gray-300` → `#d4d4d4`
- `--color-gray-400` → `#a3a3a3`
- `--color-gray-500` → `#737373`
- `--color-gray-600` → `#6a6a6a`
- `--color-gray-700` → `#525252`
- `--color-gray-800` → `#404040`
- `--color-gray-900` → `#1a1a1a` (darkest)

#### Text Colors
- `--color-text-primary` → `#1a1a1a` (main body text)
- `--color-text-secondary` → `#6a6a6a` (muted text)
- `--color-text-tertiary` → `#a3a3a3` (very subtle text)
- `--color-text-inverse` → `#ffffff` (text on dark backgrounds)

### 📝 Typography

#### Font Families
- `--font-sans` → Geist Sans + system fallbacks
- `--font-mono` → Geist Mono + monospace fallbacks

#### Font Sizes
- `--text-xs` → `0.75rem` (12px)
- `--text-sm` → `0.875rem` (14px)
- `--text-base` → `1rem` (16px)
- `--text-lg` → `1.125rem` (18px)
- `--text-xl` → `1.25rem` (20px)
- `--text-2xl` → `1.5rem` (24px)
- `--text-3xl` → `1.875rem` (30px)
- `--text-4xl` → `2.25rem` (36px)
- `--text-5xl` → `3rem` (48px)
- `--text-6xl` → `3.75rem` (60px)

### 📏 Spacing

- `--space-1` → `0.25rem` (4px)
- `--space-2` → `0.5rem` (8px)
- `--space-3` → `0.75rem` (12px)
- `--space-4` → `1rem` (16px)
- `--space-6` → `1.5rem` (24px)
- `--space-8` → `2rem` (32px)
- `--space-12` → `3rem` (48px)
- `--space-16` → `4rem` (64px)
- `--space-24` → `6rem` (96px)

### 🔘 Border Radius

- `--radius-sm` → `0.375rem` (6px)
- `--radius-md` → `0.5rem` (8px)
- `--radius-lg` → `0.75rem` (12px)
- `--radius-xl` → `1rem` (16px)
- `--radius-2xl` → `1.5rem` (24px)
- `--radius-full` → `9999px` (fully circular)

### 🌫️ Shadows

- `--shadow-sm` → Small shadow
- `--shadow-md` → Medium shadow
- `--shadow-lg` → Large shadow
- `--shadow-xl` → Extra large shadow
- `--shadow-accent` → Accent-colored shadow
- `--shadow-accent-hover` → Accent hover shadow

### ⏱️ Transitions

- `--transition-fast` → `150ms ease`
- `--transition-base` → `250ms ease`
- `--transition-slow` → `350ms ease`

### 📐 Layout

- `--container-max-width` → `72rem` (1152px)
- `--container-padding` → `clamp(1.5rem, 5vw, 3rem)`
- `--progress-nav-left` → Responsive navigation positioning

### 📚 Z-Index Scale

- `--z-negative` → `-1`
- `--z-base` → `0`
- `--z-dropdown` → `1000`
- `--z-sticky` → `1100`
- `--z-fixed` → `1200`
- `--z-modal` → `1300`
- `--z-popover` → `1400`
- `--z-tooltip` → `1500`
- `--z-preloader` → `9999`

## 🔧 How to Make Changes

### Example 1: Change Brand Color

**Old way:** Find and replace `#f58222` in 40+ files 😰

**New way:** Edit ONE line in `globals.css` 😎

```css
:root {
  --color-accent: #e63946; /* Change to red */
}
```

**Result:** Entire site updates instantly!

### Example 2: Adjust Spacing

```css
:root {
  --space-8: 3rem; /* Change from 2rem to 3rem */
}
```

All elements using `var(--space-8)` will update automatically.

### Example 3: Add a New Color

```css
:root {
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
}
```

Then use them anywhere:
```css
.success-badge {
  background: var(--color-success);
}
```

## 🎯 Best Practices

### ✅ DO

```css
/* Use semantic variable names */
color: var(--color-text-primary);
background: var(--color-accent);
padding: var(--space-6);
border-radius: var(--radius-lg);
```

### ❌ DON'T

```css
/* Avoid hardcoded values */
color: #1a1a1a;
background: #f58222;
padding: 1.5rem;
border-radius: 12px;
```

### 🔄 Migration Tips

When you find hardcoded values in the codebase:

1. Check if a variable already exists for that value
2. Replace the hardcoded value with `var(--variable-name)`
3. If no variable exists, consider adding one to `:root`

## 📊 Using with RGBA

For transparent colors, use the RGB variable:

```css
/* Instead of: rgba(245, 130, 34, 0.5) */
background: rgba(var(--color-accent-rgb), 0.5);

/* Or use the pre-defined light variant */
background: var(--color-accent-light); /* 10% opacity */
```

## 🚀 Benefits

1. **Single Source of Truth**: Change once, update everywhere
2. **Consistency**: Ensures design system adherence
3. **Maintainability**: Easy to update and scale
4. **Performance**: Browser-native, no build step needed
5. **Dark Mode Ready**: Easy to add theme switching later
6. **Documentation**: Variables are self-documenting

## 🎨 Future Enhancements

You can easily add:

- Dark mode variants
- Multiple brand themes
- Seasonal color schemes
- A/B testing colors
- Client-specific branding

Just define new color variables and swap them in/out as needed!

## 📝 Quick Reference

```css
/* Common Patterns */

/* Button */
.btn {
  background: var(--color-accent);
  color: var(--color-white);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  font-size: var(--text-base);
  transition: var(--transition-base);
  box-shadow: var(--shadow-accent);
}

.btn:hover {
  background: var(--color-accent-hover);
  box-shadow: var(--shadow-accent-hover);
}

/* Card */
.card {
  background: var(--color-white);
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

/* Text */
.heading {
  font-family: var(--font-sans);
  font-size: var(--text-4xl);
  color: var(--color-text-primary);
}

.subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
}
```

## 🆘 Need Help?

If you're unsure which variable to use:
1. Check the variable list above
2. Look at similar components in the codebase
3. When in doubt, ask!

---

**Remember:** The goal is consistency and maintainability. Every hardcoded value you replace with a variable makes future updates easier! 🎉
