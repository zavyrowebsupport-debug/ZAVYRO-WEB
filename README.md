# ZAVYROWEB — Premium International Digital Agency

Production-ready digital flagship for **ZAVYROWEB**, a premium international digital agency specializing in bespoke website design, website redesign, technical SEO, Google Ads management, and digital growth.

---

## 1. Brand Identity & Overview

- **Brand**: ZAVYROWEB
- **Positioning**: Premium International Digital Agency
- **Phone / WhatsApp**: `0769154458` (International: `+212 769 154 458`)
- **Email**: `zavyrowebsupport@gmail.com`
- **Headquarters**: Casablanca, Morocco — Serving Global Clients
- **Primary Language**: English (Architected for international multilingual expansion)

---

## 2. Technical Stack

- **Framework**: React 19 + TypeScript (ES2022)
- **Build Tool**: Vite 8 with Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React
- **Typography**: Editorial serif headings (`Cormorant Garamond`) paired with modern sans-serif body typography (`Plus Jakarta Sans`)
- **Architecture**: Modular functional components, pure business logic decoupled into testable utility functions (`node:test`)
- **Testing**: Deterministic unit tests with Node test runner via `npx tsx --test`

---

## 3. Key Features & Modules

1. **Top Bar Contract**: Minimalist 3-zone header (Wordmark, single-line navigation links, "Start a Project" CTA) with responsive mobile drawer.
2. **Cinematic Hero**: Art-directed studio presentation featuring high-resolution photography, value proposition, and instant capability highlights.
3. **5 Core Services**:
   - Website Design & Development (Corporate, E-Commerce, Custom Web Apps)
   - Website Redesign & Optimization (Core Web Vitals, Modernization, UX)
   - SEO & Organic Growth (Technical SEO, Schema.org entity graphs, Indexation)
   - Google Ads & Digital Advertising (Search campaigns, GA4 conversion tracking)
   - Website Security & Maintenance (Hardening, backups, 24/7 monitoring)
4. **Selected Client Portfolio**:
   - Morocco Cars (Automotive & Car Rental)
   - ÉLAN (Premium E-Commerce)
   - ASD Garage (Automotive Performance Services)
   - Tichorte (Streetwear & Apparel Storefront)
   - Complete Case Study modal views with architecture, highlights, and verified outcomes.
5. **Interactive Project Scope & Budget Estimator**: Dynamic pricing and timeline estimation tool with instant WhatsApp export and inquiry pre-filling.
6. **Our Methodology**: Structured 4-phase delivery framework (01 Discover, 02 Strategize, 03 Build & Optimize, 04 Launch & Grow).
7. **Authentic Endorsement Protocol**: Dignified reference verification desk adhering to authenticity standards without fabricated reviews.
8. **Insights & Blog**: In-depth technical articles covering Core Web Vitals, Technical SEO, Google Ads tracking, and E-commerce checkout architecture.
9. **Interactive Contact & Lead Capture**: Fully validated form with anti-bot honeypot protection, data sanitization, and direct WhatsApp/email channels.
10. **International SEO**: Structured JSON-LD (Organization, WebSite), OpenGraph social cards, Twitter cards, canonical tags, `sitemap.xml`, and `robots.txt`.
11. **Security & Privacy**: Client data sanitization, CSP/security headers in `vercel.json`, and interactive Privacy Policy & Terms of Service modals.

---

## 4. Local Development

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
The server will start on `http://localhost:3000`.

### Run Unit Tests
```bash
npx tsx --test src/utils/validation.test.ts src/utils/pricing.test.ts
```

### Production Build
```bash
npm run build
```

---

## 5. Vercel Deployment Instructions

This repository is pre-configured for seamless zero-configuration deployment to [Vercel](https://vercel.com).

### Method A: Deploy via Vercel CLI
```bash
# 1. Install Vercel CLI (if not already installed)
npm i -g vercel

# 2. Deploy to preview
vercel

# 3. Deploy to production
vercel --prod
```

### Method B: Deploy via GitHub
1. Push this repository to your GitHub account.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import the repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build` (or `vite build`).
6. Output Directory: `dist`.
7. Click **Deploy**.

The included `vercel.json` automatically configures:
- Single-page application rewrites (`/(.*)` -> `/index.html`)
- HTTP security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`)
- Immutable caching headers for production static image assets.

---

## 6. Environment Variables

Defined in `.env.example`:
- `APP_URL`: The production URL of the agency website (e.g., `https://zavyroweb.com`).
- `GEMINI_API_KEY`: Injected automatically if AI Studio server-side integrations are active.

---

## 7. License & Credits

Designed and engineered for **ZAVYROWEB**. All brand assets, code, and case study presentations are proprietary.
