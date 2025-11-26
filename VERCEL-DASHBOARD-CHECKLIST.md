# Vercel Dashboard Checklist

## 🎯 What You Need to Do Manually

This checklist covers the Vercel Dashboard tasks that need to be completed manually to unify your deployment structure.

---

## A) Vercel Dashboard Configuration

### ✅ Step 1: Set Production Branch to `main`

1. Open [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **`welledgecreative`** project
3. Navigate to **Settings** (left sidebar)
4. Click on **Git** section
5. Scroll to **Production Branch**
6. Ensure it's set to: **`main`**
7. If not, click **Edit** and change to `main`
8. Click **Save**

**Why:** This ensures that pushes to `main` branch trigger production deployments.

---

### ✅ Step 2: Remove Duplicate `welledgecreative-dev` Project (If Exists)

1. In Vercel Dashboard, look for a separate project named **`welledgecreative-dev`**
2. If it exists:
   - Click on the `welledgecreative-dev` project
   - Navigate to **Settings** → **Advanced** (scroll down)
   - Click **Delete Project** (bottom of page)
   - Type the project name to confirm
   - Click **Delete**

3. If it doesn't exist, skip this step ✅

**Why:** Having two separate projects causes confusion. One project with different branches (main/dev) is cleaner.

---

### ✅ Step 3: Clean Up Old Preview Deployments

1. In your main **`welledgecreative`** project
2. Click **Deployments** tab (left sidebar)
3. Look for old or unnecessary preview deployments
4. For each unwanted deployment:
   - Click the three dots menu (⋯) on the right
   - Select **Delete**
   - Confirm deletion

**Optional:** You can keep recent `dev` branch previews for testing.

**Why:** Reduces clutter and makes it easier to identify current deployments.

---

### ✅ Step 4: Verify Latest Deployment on `main`

1. In **Deployments** tab
2. Filter by: **Branch: main** (use filter dropdown)
3. Check the top (most recent) deployment:
   - Should show **"Production"** badge
   - Should have ✅ green checkmark (Ready)
   - Should show recent timestamp (within last 5-10 minutes)
   - Commit message should be: "Merge dev: Complete Brisa Bahía case study..."

**If you don't see this:**
- Click the three dots (⋯) next to the latest `main` deployment
- Select **Redeploy**
- Wait for deployment to complete (2-3 minutes)

---

## B) Verify Production Deployment

### ✅ Step 5: Wait for Deployment to Complete

1. In Vercel Dashboard → Deployments
2. Watch the latest deployment status
3. Wait until you see:
   - ✅ **Green checkmark** (not yellow spinner)
   - Status: **"Ready"**
   - Duration: Build time (usually 1-3 minutes)

**Tip:** Click on the deployment to see detailed build logs if needed.

---

### ✅ Step 6: Check Domain Configuration

1. Navigate to **Settings** → **Domains**
2. Verify your production domain is listed
3. Status should show: ✅ **Valid Configuration**
4. Domain should point to: **`main` branch**

**If domain shows error:**
- Click **Refresh** or **Edit**
- Follow Vercel's domain configuration steps
- Wait for DNS propagation (5-15 minutes)

---

## C) Test Live Site

### ✅ Step 7: Clear Browser Cache

**Before testing, clear your cache:**

**Option 1: Hard Refresh**
- **Mac:** `Cmd + Shift + R`
- **Windows/Linux:** `Ctrl + Shift + R`

**Option 2: Open Incognito/Private Mode**
- **Chrome:** `Cmd/Ctrl + Shift + N`
- **Safari:** `Cmd + Shift + N`
- **Firefox:** `Cmd/Ctrl + Shift + P`

**Option 3: Clear All Cache**
- Chrome: Settings → Privacy and Security → Clear browsing data
- Safari: Safari → Preferences → Privacy → Manage Website Data → Remove All
- Firefox: History → Clear Recent History

---

### ✅ Step 8: Verify Key Features on Live Site

Visit your production domain and check:

**Homepage:**
- [ ] Brisa Bahía project thumbnail shows correct image (mockup-big-screen-tablet-mobile-webiste.webp)
- [ ] "Brisa Bahía — Case Study →" link works (not "Coming soon")
- [ ] Navigation header is visible
- [ ] All sections load correctly

**Brisa Bahía Case Study Page:**
- [ ] Global Header navigation is visible at top
- [ ] "Back to Projects" link appears below header
- [ ] Hero section displays correctly
- [ ] Challenge & Goal sections are side-by-side (desktop)
- [ ] Only words "Challenge" and "Goal" have orange highlight
- [ ] Sections are top-aligned (not centered vertically)
- [ ] Gallery displays in masonry layout (3 columns on desktop)
- [ ] Clicking gallery images opens lightbox/modal
- [ ] Lightbox works correctly:
  - [ ] ESC key closes it
  - [ ] Clicking outside closes it
  - [ ] Arrow keys navigate through images
  - [ ] Counter shows (e.g., "3 / 12")
- [ ] Images load in high quality (no pixelation)
- [ ] CTA button is orange with shadow
- [ ] "Visit live site" links work (brisabahia.com)
- [ ] Kary & Nhung testimonial portrait displays

**Mobile Testing:**
- [ ] Open site on phone or tablet
- [ ] Test lightbox swipe gestures (swipe left/right to navigate)
- [ ] Verify responsive layout looks correct
- [ ] Check navigation menu works

---

### ✅ Step 9: Check for Console Errors

1. Open browser DevTools:
   - **Mac:** `Cmd + Option + I`
   - **Windows/Linux:** `F12` or `Ctrl + Shift + I`

2. Click **Console** tab
3. Refresh page
4. Look for errors (red text)

**Expected:** No critical errors

**If you see errors:**
- Screenshot the errors
- Check if features still work
- Minor warnings are usually okay

---

## D) Monitor and Document

### ✅ Step 10: Save Deployment URLs

Document these URLs for future reference:

```
Production: [Your production domain]
Dev Preview: https://well-edge-git-dev-welledgecreative.vercel.app
Vercel Project: https://vercel.com/[your-username]/welledgecreative
```

---

### ✅ Step 11: Set Up Deployment Notifications (Optional)

1. In Vercel Dashboard → Settings → **Notifications**
2. Enable:
   - Deployment Success
   - Deployment Failed
   - Domain Configuration Changed
3. Choose notification method:
   - Email
   - Slack (if connected)
4. Save settings

**Why:** You'll get notified immediately when deployments complete or fail.

---

## E) Common Issues & Solutions

### Issue: "Changes not visible on production site"

**Solutions:**
1. ✅ Verify latest deployment on `main` is marked as "Production" (not "Preview")
2. ✅ Hard refresh browser (`Cmd/Ctrl + Shift + R`)
3. ✅ Wait 2-5 minutes for CDN propagation
4. ✅ Test in incognito mode
5. ✅ Check if correct domain is configured in Vercel
6. ✅ Manually redeploy if needed

### Issue: "Lightbox still shows black screen"

**Solutions:**
1. ✅ Verify deployment completed successfully (green checkmark)
2. ✅ Clear browser cache completely (not just hard refresh)
3. ✅ Test in different browser
4. ✅ Check browser console for JavaScript errors
5. ✅ Verify images exist in `/public/case-studies/brisa-bahia/gallery/`

### Issue: "Deployment failed"

**Solutions:**
1. ✅ Click on failed deployment in Vercel Dashboard
2. ✅ Read build logs for error messages
3. ✅ Common causes:
   - TypeScript errors (run `npm run lint` locally)
   - Missing dependencies (run `npm install` locally)
   - Invalid JSON (check locale files)
   - Image path errors
4. ✅ Fix locally, commit, and push again

### Issue: "Preview deployments not working"

**Solutions:**
1. ✅ Settings → Git → Verify "Preview Deployments" is enabled
2. ✅ Check that `dev` branch is not in ignored branches list
3. ✅ Ensure GitHub integration is connected
4. ✅ Push changes to `dev` branch again

---

## F) Maintenance Schedule

### Weekly:
- [ ] Check deployment status
- [ ] Review any failed deployments

### Monthly:
- [ ] Clean up old preview deployments
- [ ] Review Vercel usage metrics
- [ ] Check for pending Vercel/Next.js updates

### Quarterly:
- [ ] Update dependencies (`npm update`)
- [ ] Review and optimize image assets
- [ ] Test all features thoroughly

---

## 📞 Need Help?

If you encounter issues:

1. **Check DEPLOYMENT.md** for detailed workflow
2. **Review Vercel build logs** for specific errors
3. **Test locally first:** `npm run build`
4. **Vercel Documentation:** https://vercel.com/docs
5. **Vercel Support:** https://vercel.com/support

---

## ✅ Checklist Summary

Quick reference of all steps:

- [ ] Set production branch to `main` in Vercel Settings
- [ ] Remove `welledgecreative-dev` project (if exists)
- [ ] Clean up old preview deployments
- [ ] Verify latest `main` deployment is marked as Production
- [ ] Check domain configuration
- [ ] Clear browser cache
- [ ] Test all key features on live site
- [ ] Check browser console for errors
- [ ] Document deployment URLs
- [ ] Set up deployment notifications (optional)

---

**Status:** ✅ Git merge completed and pushed to `main`
**Next:** Complete Vercel Dashboard configuration above
**Date:** 2025-11-26
