# Deployment Guide - Well Edge Creative

This document outlines the deployment process and workflow for the Well Edge Creative portfolio website.

## Repository Structure

- **Repository:** `brunnenjan/welledgecreative`
- **Production Branch:** `main` (live website)
- **Development Branch:** `dev` (testing and preview)

## Vercel Configuration

### Single Project Setup (Recommended)

The project should use **ONE Vercel project** for both production and preview deployments:

**Project Name:** `welledgecreative`

**Branch Configuration:**
- **Production Branch:** `main` → Deploys to production domain
- **Preview Branch:** `dev` → Deploys to preview URL (`well-edge-git-dev-welledgecreative.vercel.app`)

### Setting Up Production Branch in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the `welledgecreative` project
3. Navigate to **Settings** → **Git**
4. Under **Production Branch**, ensure it's set to `main`
5. Save changes

### Removing Duplicate Projects

If you have a separate `welledgecreative-dev` project:

1. Go to Vercel Dashboard
2. Select the `welledgecreative-dev` project
3. Navigate to **Settings** → **Advanced**
4. Scroll to bottom and click **Delete Project**
5. Confirm deletion

This ensures all deployments use a single project with different branches.

## Git Workflow

### Development Workflow

```bash
# 1. Work on dev branch
git checkout dev

# 2. Make changes and commit
git add .
git commit -m "Description of changes"

# 3. Push to dev branch for preview
git push origin dev
# This triggers automatic preview deployment on Vercel

# 4. Test on preview URL:
# https://well-edge-git-dev-welledgecreative.vercel.app
```

### Production Deployment

```bash
# 1. Ensure dev branch is up to date
git checkout dev
git pull origin dev

# 2. Switch to main branch
git checkout main

# 3. Merge dev into main
git merge dev

# 4. Push to main branch
git push origin main
# This triggers automatic production deployment on Vercel
```

### Quick Production Deploy

```bash
# One-liner to merge and push (from dev branch)
git checkout main && git merge dev && git push origin main && git checkout dev
```

## Vercel Deployment Process

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

1. **Push to `dev`** → Preview deployment
   - URL: `https://well-edge-git-dev-welledgecreative.vercel.app`
   - Status: Shows as "Preview" in Vercel Dashboard

2. **Push to `main`** → Production deployment
   - URL: Your production domain
   - Status: Shows as "Production" in Vercel Dashboard

### Manual Redeployment

If you need to manually trigger a deployment:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select `welledgecreative` project
3. Click **Deployments** tab
4. Find the deployment you want to redeploy
5. Click the three dots (⋯) menu → **Redeploy**
6. Confirm redeployment

### Checking Deployment Status

1. Go to Vercel Dashboard → `welledgecreative` → **Deployments**
2. Filter by branch:
   - `main` = Production deployments
   - `dev` = Preview deployments
3. Look for:
   - ✅ Green checkmark = Successfully deployed
   - 🔴 Red X = Failed deployment
   - 🔄 Yellow spinner = Building

## Post-Deployment Verification

After a production deployment, follow these steps:

### 1. Wait for Deployment to Complete

- Check Vercel Dashboard for green checkmark
- Wait 1-2 minutes for CDN propagation

### 2. Clear Browser Cache

**Hard Refresh:**
- **Mac:** `Cmd + Shift + R`
- **Windows/Linux:** `Ctrl + Shift + R`

**Clear Cache:**
- Chrome: Settings → Privacy → Clear browsing data
- Safari: Develop → Empty Caches
- Firefox: History → Clear Recent History

### 3. Test in Incognito/Private Mode

- Chrome: `Cmd/Ctrl + Shift + N`
- Safari: `Cmd + Shift + N`
- Firefox: `Cmd/Ctrl + Shift + P`

### 4. Verify Key Features

Checklist for Brisa Bahía case study:

- [ ] Global Header navigation visible on case study page
- [ ] "Back to Projects" link works correctly
- [ ] Gallery displays in masonry layout (3 columns on desktop)
- [ ] Clicking gallery images opens lightbox
- [ ] Lightbox features work:
  - [ ] ESC key closes lightbox
  - [ ] Click outside closes lightbox
  - [ ] Arrow keys navigate images
  - [ ] Mobile swipe works (test on phone/tablet)
- [ ] Challenge & Goal sections display top-aligned
- [ ] Only words "Challenge" and "Goal" are highlighted (not entire headings)
- [ ] CTA button is orange with shadow effects
- [ ] Homepage thumbnail shows correct mockup image
- [ ] Images load in high quality (no pixelation)
- [ ] Live site links work (brisabahia.com)

## Troubleshooting

### Changes Not Visible After Deployment

**Possible Causes:**

1. **Browser Cache**
   - Solution: Hard refresh (`Cmd/Ctrl + Shift + R`)
   - Alternative: Test in incognito mode

2. **CDN Cache**
   - Solution: Wait 2-5 minutes for Vercel Edge Network propagation
   - Check deployment timestamp in Vercel Dashboard

3. **Wrong Deployment Active**
   - Solution: Go to Vercel Dashboard → Deployments
   - Verify the latest deployment on `main` branch is "Production"
   - If not, manually redeploy

4. **Deployment Failed**
   - Check Vercel Dashboard for error messages
   - Review build logs for errors
   - Run `npm run build` locally to test

### Build Failures

If deployment fails during build:

```bash
# Test build locally
npm run build

# Check for TypeScript errors
npm run lint

# Review error messages
# Fix issues and push again
```

Common issues:
- TypeScript type errors
- Missing dependencies
- Invalid JSON in locale files
- Image path errors

### Preview Deployment Not Working

If `dev` branch doesn't deploy to preview:

1. Check Vercel Dashboard → Settings → Git
2. Ensure "Preview Deployments" is enabled
3. Verify `dev` branch is not ignored
4. Check deployment logs for errors

## Cache Management

### Vercel Edge Network Cache

Vercel automatically caches static assets. To force cache invalidation:

1. **Wait 2-5 minutes** after deployment
2. **Hard refresh** browser
3. **Manual redeploy** if needed (forces new cache)

### Browser Cache Headers

The project uses Next.js default caching:
- Static assets: Long cache duration
- HTML pages: Short cache, revalidate
- API routes: No cache

## Environment Variables

If you add environment variables:

1. Add to Vercel Dashboard → Settings → Environment Variables
2. Specify for each environment:
   - Production (main branch)
   - Preview (dev branch)
   - Development (local)
3. Redeploy after adding new variables

## Best Practices

### Before Merging to Main

1. ✅ Test thoroughly on dev preview URL
2. ✅ Run build locally: `npm run build`
3. ✅ Check for TypeScript errors: `npm run lint`
4. ✅ Verify all features work on mobile and desktop
5. ✅ Review Vercel preview deployment logs

### After Production Deploy

1. ✅ Monitor Vercel Dashboard for successful deployment
2. ✅ Hard refresh production site
3. ✅ Test key user journeys
4. ✅ Check mobile responsiveness
5. ✅ Verify no console errors (browser DevTools)

### Regular Maintenance

- Clean up old preview deployments monthly
- Review and update dependencies quarterly
- Monitor Vercel usage and performance metrics
- Keep `dev` and `main` branches synchronized

## Quick Reference

### URLs

- **Production:** Your live domain
- **Dev Preview:** `https://well-edge-git-dev-welledgecreative.vercel.app`
- **Vercel Dashboard:** `https://vercel.com/dashboard`
- **GitHub Repo:** `https://github.com/brunnenjan/welledgecreative`

### Commands

```bash
# Switch branches
git checkout dev
git checkout main

# Merge dev to main
git checkout main && git merge dev

# Push to remote
git push origin main
git push origin dev

# Build locally
npm run build

# Run dev server
npm run dev

# Lint code
npm run lint
```

## Support

If you encounter issues not covered in this guide:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
3. Check GitHub Actions (if configured)
4. Contact Vercel Support (if needed)

---

**Last Updated:** 2025-11-26
**Project:** Well Edge Creative Portfolio
**Framework:** Next.js 15.4.6
**Deployment Platform:** Vercel
