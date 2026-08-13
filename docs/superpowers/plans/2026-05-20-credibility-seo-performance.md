# Credibility + SEO + Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the production 404 on client-side routes (ex: `/gallery`), tighten credibility conversion paths (proof + testimonials + CTA clarity), and ship small performance + SEO upgrades that help Vishnu’s site rank and convert globally.

**Architecture:** This is a Vite + React Router SPA hosted on Vercel. We rely on a catch-all rewrite to serve `index.html` for all non-file routes so the client router can take over. Credibility is expressed through case studies (numbers-first), reviews (human faces), consistent CTAs, and SEO primitives (meta tags, JSON-LD, sitemap with image entries).

**Tech Stack:** Vite, React, react-router-dom, motion, Tailwind, Vercel, Resend

---

### Task 1: Fix Vercel SPA Routing (Resolve `/gallery` 404)

**Files:**
- Modify: `vercel.json`

- [ ] **Step 1: Replace the current rewrite rule with Vercel’s recommended SPA catch-all**

Update `vercel.json` so the `rewrites` section becomes:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Keep existing `redirects` as-is.

- [ ] **Step 2: Build locally to ensure output includes `dist/index.html`**

Run:

```bash
npm run build
```

Expected: build succeeds and `dist/index.html` exists.

- [ ] **Step 3: Commit**

```bash
git add vercel.json
git commit -m "fix: SPA rewrite to index.html for client routes"
```

---

### Task 2: Make Case Study Images Non-Cropping (Full Image Visible)

**Files:**
- Modify: `src/pages/CaseStudies.tsx`

- [ ] **Step 1: Update the case study list image to avoid cropping**

In `src/pages/CaseStudies.tsx`, change the case-study card image from `object-cover` to `object-contain`, and keep a subtle background so it still looks premium.

Example target shape (exact class list may vary, but must include `object-contain`):

```tsx
className="h-full w-full object-contain opacity-75 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.01]"
```

- [ ] **Step 2: Run typecheck**

Run:

```bash
npm run lint
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/pages/CaseStudies.tsx
git commit -m "ui: show full case study images (no crop)"
```

---

### Task 3: Reduce Perceived Lag (Small, Safe Wins)

**Files:**
- Modify: `src/components/CircularTestimonials.tsx` (if needed)
- Modify: `src/pages/CaseStudies.tsx` (if needed)
- Modify: `src/pages/Gallery.tsx` (if needed)

- [ ] **Step 1: Ensure all non-hero images are `loading=\"lazy\"` and `decoding=\"async\"`**

Audit and add missing `loading="lazy"` + `decoding="async"` attributes on list/grid images (not the hero).

- [ ] **Step 2: Prefer reduced motion**

If any component runs continuous animation loops, guard them behind reduced-motion checks. Keep interactions (hover/click) but reduce “always running” animation on low-end devices.

- [ ] **Step 3: Commit**

```bash
git add src/components src/pages
git commit -m "perf: reduce jank with lazy images + reduced-motion guards"
```

---

### Task 4: Verification

**Files:**
- N/A (verification only)

- [ ] **Step 1: Run tests**

```bash
npm test
```

Expected: PASS.

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 3: Manual smoke**

Run dev server:

```bash
npm run dev
```

Confirm:
1. Assistant button renders bottom-right
2. `/gallery` page renders
3. Case studies cards render and images are visible (no crop)

---

### Task 5: Merge + Push

**Files:**
- N/A

- [ ] **Step 1: Merge the feature branch back to `main`**

```bash
git checkout main
git merge --no-ff feat/credibility-upgrades
```

- [ ] **Step 2: Push**

```bash
git push origin main
```

