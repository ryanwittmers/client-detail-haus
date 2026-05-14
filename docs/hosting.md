# Vercel Deploy Guide

This guide covers deploying the Detail Haus Next.js site to Vercel, from GitHub integration through custom domain setup.

## GitHub Repository

The codebase is already hosted at:

```
git@github.com:Fathom-Consulting/client-detail-haus.git
```

The Next.js application itself lives in the `detail-haus-site/` subdirectory (not the repo root). This is critical for Vercel configuration.

## Vercel Import

### Create a Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in to your Vercel account
2. Click **Add New** → **Project**
3. Select **Import Git Repository**
4. Search for and select `Fathom-Consulting/client-detail-haus`

### Configure Build Settings

On the import dialog, configure these settings:

- **Root Directory:** `detail-haus-site` — *This is critical.* The Next.js app is in a subdirectory, not the repo root. Vercel must know to build from this directory.
- **Framework Preset:** Next.js (should auto-detect)
- **Build Command:** `bun run build` — Vercel defaults to npm; override to use Bun.
- **Install Command:** `bun install` — Vercel defaults to npm; override to use Bun.
- **Output Directory:** `.next` (default, do not change)

### Deploy

Click **Deploy**. Vercel will:
- Install dependencies with `bun install`
- Build the site with `bun run build`
- Provision a URL like `detail-haus-site.vercel.app` (automatically assigned)
- Deploy the site

Build logs appear in the Vercel dashboard. First deploy takes ~2–5 minutes.

## Environment Variables

Set these in **Vercel Dashboard** → **Project Settings** → **Environment Variables**:

### Required

- **UPLOADTHING_TOKEN** — Required for image/file uploads on the contact form
  - Create an account at [uploadthing.com](https://uploadthing.com)
  - Create an app in the dashboard
  - Copy the API token and paste it into Vercel's environment variable settings
  - Apply to Production, Preview, and Development environments

### Optional (if used)

- **Google Reviews URL** — Currently has a `#` placeholder in `data/config.ts` → `googleReviewUrl`. Replace with the actual Google Business Profile review link when ready.
- **Instagram Widget ID** — If using an Elfsight Instagram widget, add the widget ID to `components/sections/Instagram.tsx` → `WIDGET_ID`.

## Custom Domain

### Add Domain in Vercel

1. In **Vercel Dashboard** → **Project Settings** → **Domains**
2. Enter the client's domain (e.g., `www.detailhaus.com` or `detailhaus.com`)
3. Vercel will display DNS records to add

### Update DNS at Registrar

Add one of the following to the domain registrar's DNS settings:

**For subdomains (www.detailhaus.com):**
- Record Type: CNAME
- Name: `www` (or your subdomain)
- Value: `cname.vercel-dns.com`

**For apex/root domain (detailhaus.com):**
- Record Type: A
- Name: `@` (or leave blank)
- Value: `76.76.21.21`

DNS propagation typically takes 24–48 hours. Once verified, Vercel automatically provisions an SSL certificate.

## Continuous Deployment

Any push to the `main` branch triggers an automatic redeploy:

```bash
git push origin main
```

Vercel watches the repo for commits and rebuilds the site automatically. Preview deployments are created for pull requests.

## Pre-Launch Checklist

Before going live, confirm:

- [ ] **UPLOADTHING_TOKEN** is set and contact form uploads work
- [ ] **Google Reviews URL** is updated in `data/config.ts` (or confirm the `#` placeholder is intentional)
- [ ] **Instagram widget ID** is configured in `components/sections/Instagram.tsx` (if Elfsight widget is used)
- [ ] **Accent color** is finalized — Option B (amber) is commented out in `app/globals.css`; uncomment to preview, confirm with client, then finalize choice
- [ ] **Custom domain** DNS records propagate and site is accessible at the client's domain
- [ ] **SSL certificate** is active (Vercel auto-provisions; check browser padlock)

## Troubleshooting

### Build fails during deploy

Check Vercel build logs (Dashboard → Deployments → Latest → View Logs). Common issues:
- Missing environment variables (especially `UPLOADTHING_TOKEN`)
- Build command mismatch (ensure it's `bun run build`)
- Root Directory not set to `detail-haus-site`

### Site unreachable after domain setup

Wait 24–48 hours for DNS propagation. Check status with:

```bash
nslookup www.detailhaus.com
```

Or use online tools like [DNS Checker](https://dnschecker.org).

### Image uploads fail

Verify `UPLOADTHING_TOKEN` is set in Vercel environment variables and matches the token from uploadthing.com dashboard.
