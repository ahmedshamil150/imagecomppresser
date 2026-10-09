# PicShrink — Free Image Compressor & Resizer

Browser-based image compression, resizing, and format conversion (JPG, PNG, WebP, AVIF). All processing happens client-side — files are never uploaded. Built with Next.js 16 (App Router, Turbopack), Tailwind CSS 4, and a WebAssembly AVIF encoder.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production build:

```bash
npm run build
npm start
```

## Configuration

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL — powers canonical URLs, sitemap, OG tags |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shown on contact/about/legal pages |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher ID (`ca-pub-…`). Empty = no ads |

## Project structure

```
app/                  # Routes (App Router)
  page.tsx            # Home: tool + FAQ + tool directory
  compress-image/ resize-image/ bulk-image-compressor/   # Tool landings
  png-to-jpg/ jpg-to-webp/ webp-to-jpg/ png-to-webp/     # Converters
  blog/               # MDX blog (index + [slug])
  how-it-works/ formats/ about/ contact/ privacy/ terms/
  robots.ts sitemap.ts  # SEO files
components/           # ImageTool (client engine), ToolPage, FAQ/Steps + schema
content/blog/*.mdx    # Blog posts
lib/image.ts          # decode → resize → encode pipeline (client only)
lib/seo.ts            # metadata + JSON-LD builders
lib/posts.ts          # MDX frontmatter loader
public/llms.txt       # LLM crawler summary (AEO)
```

## SEO / AEO / GEO checklist (done at launch)

- [x] Unique title, meta description, canonical + hreflang `en`/`x-default` per page
- [x] JSON-LD: `WebApplication`, `FAQPage`, `HowTo`, `Article`, `BreadcrumbList`, `WebSite`, `Organization`
- [x] `robots.ts` (AI crawlers explicitly allowed), `sitemap.ts`, `app/icon.svg`
- [x] Answer-first intro paragraph on every page; FAQ in crawlable HTML
- [x] `public/llms.txt` + `public/llms-full.txt`
- [x] Static prerendering of all pages (fast TTFB, crawlable HTML)
- [ ] Submit to Google Search Console + Bing Webmaster after deploy
- [ ] Verify `NEXT_PUBLIC_SITE_URL` matches the production domain before submitting

## AdSense launch steps

1. Publish and get organic traffic (apply after ~30 days with content).
2. Ensure privacy, terms, about, contact pages are live (they are).
3. Create ad units in AdSense, then set `NEXT_PUBLIC_ADSENSE_CLIENT` and update slot IDs in `components/AdSlot.tsx` calls (`1000000001`–`1000000004`).
4. Ads only render after the user accepts the consent banner — for EU/UK compliance, consider replacing the banner with Google Funding Choices (a certified CMP) before serving personalized ads.
5. Fallback networks if rejected: Ezoic, Adsterra, Media.net.

## Adding blog posts

Create `content/blog/<slug>.mdx`:

```mdx
---
title: "Post title"
description: "150–160 char meta description"
date: "2026-10-05"
tags: ["tag"]
---

Answer-first paragraph…

## Section heading
…
```

Posts are picked up automatically by the blog index, sitemap, and `[slug]` route.

## Deploy (Vercel)

1. Push to GitHub and import into Vercel.
2. Set the three env vars (production).
3. Deploy — every page is static, so the Hobby tier is plenty.
