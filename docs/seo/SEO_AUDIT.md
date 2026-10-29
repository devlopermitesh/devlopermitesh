# SEO Audit — Mitesh Gehlot Portfolio

**Repository:** `devlopermitesh`  
**Framework:** Next.js 16.2.4 (App Router), React 19.2.4, TypeScript 5  
**CMS:** Payload CMS 3.84.1 (MongoDB)  
**Styling:** Tailwind CSS v4  
**Date:** 2026-10-29  
**Auditor:** OpenCode Technical SEO Agent  

## 1) Detected Architecture

- **App Router** structure under `app/` with route groups: `app/(app)/` (frontend) and `app/(payload)/` (admin/API). 
- **Root layout** at `app/(app)/layout.tsx` sets global metadata via `siteConfig` from `config/site.ts`, fonts, Header, and shared styling.
- **Single public page** at `app/(app)/(home)/page.tsx` (home) rendered with `force-dynamic` (pulls data from Payload global via `getPortfolioGlobal()`).
- **Payload CMS** configured at `payload.config.ts` with collections, globals, plugins (cloud storage), and API routes via `app/(payload)`.
- **Static assets** in `public/` (only SVGs currently; no robots.txt/sitemap/llms.txt/og-image/favicon assets beyond defaults present).
- **No middleware.ts**, no `app/robots.ts`/`app/sitemap.ts`, no `robots.txt`/`sitemap.xml` in public root.
- **Metadata** uses Next.js Metadata API in root layout. Per-page metadata not explicitly set on home (inherits root). 

**Site config (current):**
```ts
name: process.env.NEXT_PUBLIC_SITE_NAME || 'Mitesh Gehlot'
url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
title: process.env.NEXT_PUBLIC_SITE_TITLE || 'Mitesh Gehlot | Full-Stack Developer'
description: 'Portfolio of Mitesh Gehlot, a full-stack developer specializing in Next.js, React, TypeScript, and cloud-native applications.'
twitterHandle: '', ogImagePath: '/og-image.png', resumeUrl: ''
```

## 2) Audit Checklist Against Recommendations

| ID | Recommendation | Status | Evidence | Priority | Files Affected | Notes |
|---|---|---|---|---|---|---|
| A | Link Building Strategy | NOT_AUDITED | No strategy/docs. Git history clean. | High | `docs/seo/SEO_REMAINING_ACTIONS.md` | On-site prep to be documented; off-site requires auth/exec. |
| B | Implement robots.txt | NOT_AUDITED | No `public/robots.txt`, no `app/robots.ts`. | Medium | `public/robots.txt` or `app/robots.ts` | Need to allow public, block nothing critical; add sitemap URL when domain known. |
| C | Implement XML Sitemaps | NOT_AUDITED | No sitemap files/routes. | Medium | `app/sitemap.ts` or `public/sitemap.xml` | Include only indexable public URLs (home). Use absolute URLs from siteConfig.url. |
| D | Increase Title Tag Length | PARTIALLY_FIXED | Root title template exists (`%s | Mitesh Gehlot`). Home uses default `siteConfig.title` (length reasonable). No per-page custom titles beyond template. | Medium | `app/(app)/layout.tsx`, `config/site.ts` | Title is ~30 chars but descriptive; may want to ensure it's concise yet clear. Needs review per guidance (50-60 chars target, clarity first). |
| E | Fix Canonical Tag URLs | PARTIALLY_FIXED | Root has `alternates.canonical: '/'` (relative). With `metadataBase` set from `siteConfig.url`, Next resolves to absolute. But should ensure consistency and that domain is correct in prod. Also if domain unknown, needs config. | Medium | `app/(app)/layout.tsx` | Need to verify absolute canonical in output; ensure uses confirmed prod domain. |
| F | Add Schema Markup | NOT_AUDITED | No JSON-LD found. | Medium | Components/layout | Add Organization/WebSite/WebPage at minimum; reuse entity. |
| G | Use Keywords Across HTML Tags | PARTIALLY_FIXED | Keywords array in metadata present (generic). H1s/headings exist in components; need to audit for natural keyword usage, alt text, internal anchors. | Medium | Components, metadata | Avoid stuffing; use semantic variations. |
| H | Improve Site Load Speed | NOT_AUDITED | Dynamic rendering, fonts with `display: swap` (good). Images use next/image? Need to check. Large components? Tailwind v4. Possible render-blocking? Third-party? Need measurement. | Medium | Various | Measure first if possible. |
| I | Improve Heading Structure | NOT_AUDITED | Need to inspect headings in components (Hero, About, etc.) for H1-H6 hierarchy. | Low | Components | Ensure one clear H1 per page; logical order. |
| J | Add Identity Schema (GEO) | NOT_AUDITED | No Organization/Person schema with @id/sameAs. | Low | Schema/metadata | Add accurate entity; only verified sameAs. |
| K | Increase Page Text Content | NOT_AUDITED | Home is section-based; may be thin in some places depending on CMS data. Need to review content. | Low | Components/CMS content | Only add verified content; don't stuff. |
| L | Reduce Rendered Content (GEO) | NOT_AUDITED | Check DOM depth, duplicates. | Low | Components | Be careful not to remove useful content. |
| M | Optimize for Mobile PageSpeed Insights | NOT_AUDITED | Responsive classes present; need to check viewport, overflow, tap targets. | Low | CSS/components | Test at mobile sizes. |
| N | Defer Render-Blocking Resources | NOT_AUDITED | Fonts use next/font (self-hosted/optimized). Check scripts. | Low | Layout/config | Next/font handles fonts well. |
| O | Add DMARC Email Record | NOT_AUDITED | DNS not inspectable from repo; email mentioned in README (mailto). | Low | `docs/seo/SEO_REMAINING_ACTIONS.md` | Document plan; no DNS changes in code. |
| P | Add SPF Email Record | NOT_AUDITED | Same as above. | Low | `docs/seo/SEO_REMAINING_ACTIONS.md` | Document plan. |
| Q | Add Business Address and Phone Number | NOT_AUDITED | No visible address/phone in codebase. Online portfolio - likely online-only. | Low | Components/Footer/Contact | Don't invent; document if online-only. |
| R | Add Local Business Schema | NOT_APPLICABLE/NOT_AUDITED | Portfolio site, likely online-only service provider. Not obviously a local storefront. | Low | Schema | Only if qualifies with verified info. |
| S | Implement Analytics Tracking | NOT_AUDITED | No GA/gTag/analytics found. | Low | Config/layout | Privacy-conscious; need consent if required. Document setup. |
| T | Create and Link Facebook Page | NOT_AUDITED | No Facebook links found. | Low | Footer/social | Only if verified exists. |
| U | Create and Link Instagram Profile | NOT_AUDITED | No Instagram links found. | Low | Footer/social | Only if verified exists. |
| V | Create and Link YouTube Channel | NOT_AUDITED | No YouTube links found. | Low | Footer/social | Only if verified exists. |
| W | Implement llms.txt | NOT_AUDITED | No llms.txt. | Low (GEO) | `public/llms.txt` or route | Create if useful with real content/links. |
| X | Install a Facebook Pixel | NOT_AUDITED | None found. | Low | Config/layout | Only with auth + verified ID. |
| Y | Remove Inline Styles | NOT_AUDITED | Need to grep for style= attributes. | Low (Perf) | Components | Move to CSS/Tailwind. |
| Z | Remove Clear Text Email Addresses | PARTIALLY_FIXED | README has mailto; Footer/LetsTalk may have? Need to check components. | Low (Usability) | README, components | Keep if necessary, prefer form; but README is docs. |

## 3) Initial Observations

**Strengths:**
- Clean Next.js 16 App Router setup with proper metadata structure using Metadata API
- `metadataBase` set correctly from config
- Fonts use `next/font` with `display: swap`
- Semantic layout structure
- Dynamic content from CMS but structure is good
- Good robots directives in metadata (index/follow)
- OpenGraph and Twitter cards configured

**Issues Found:**
- No `robots.txt` or `sitemap.xml` files/routes
- No structured data (JSON-LD) at all
- Canonical is set to `'/'` (relative) - needs to be absolute/consistent; also root layout sets canonical to home which is fine for home but should be verified
- No llms.txt
- Inline styles? Need to check
- Email exposed in README as mailto (clear text) - docs file, but mentioned in audit
- No analytics, no social links configured (siteConfig has twitterHandle empty; components may have social links from CMS)
- Images: only SVGs in public; OG image path points to `/og-image.png` but not present in public (may cause issues)
- Home page uses `force-dynamic` - fine functionally but less ideal for static sitemap/caching; but we must not change without reason
- No explicit per-page metadata on home; relies on defaults

## 4) Quick Checks Needed

- [ ] Inspect all components for headings, inline styles, images, links
- [ ] Check if og-image.png exists anywhere
- [ ] Look up how social links are rendered (from CMS data)
- [ ] Check Footer/LetsTalk components for contact info
- [ ] Review if there might be other routes added later or just home
- [ ] Check for any existing SEO files in git history or elsewhere
