# Security checklist (free tier)

This project adds **HSTS**, **rate limits** on sensitive API routes, and standard HTTP headers in `next.config.js`. Complete these **dashboard-only** steps on your production domain to reduce abuse and key misuse.

## Google Cloud: restrict the Maps API key

The server uses `GOOGLE_MAPS_API_KEY` in API routes (Places, Geocoding). Keep the key **only in Vercel environment variables**, never in client-side code or the repo.

1. Open [Google Cloud Console](https://console.cloud.google.com/) and select the project that owns the key.
2. Go to **APIs & Services** → **Credentials** → edit the key.
3. Under **API restrictions**, choose **Restrict key** and enable only the APIs this app uses (e.g. **Places API**, **Places API (New)** if applicable, **Geocoding API**).
4. Under **Application restrictions**:
   - **Server-only key (this repo):** Vercel serverless has **no fixed outbound IP**, so **IP restriction** is usually impractical. **Application restrictions: None** plus tight **API restrictions** (step 3) is a common approach.
   - If you **also** use the **same** key in the browser (not recommended), use **HTTP referrers** and list `https://your-production-domain/*` and `http://localhost:3000/*` for local dev.

Re-test the booking flow and address autocomplete after changing restrictions.

## Cloudflare (free plan): proxy and baseline protection

If your DNS is not already on Cloudflare, you can move **nameservers** to Cloudflare (free) and proxy the site (“orange cloud”) for:

- CDN caching for static assets
- Basic DDoS mitigation at the edge
- Optional security settings (level, bot tools available on the free tier—names change over time in the dashboard)

**Steps (high level):**

1. Sign up at [Cloudflare](https://www.cloudflare.com/) and **Add a site** with your domain.
2. Update your domain registrar to use the **nameservers** Cloudflare provides.
3. Add an **A** or **CNAME** record pointing to your host (e.g. Vercel); enable the **proxied** (orange cloud) state for the records that should go through Cloudflare.
4. Set **SSL/TLS** to **Full (strict)** when your origin (e.g. Vercel) serves valid HTTPS.

If you use Vercel, follow Vercel’s docs for using a custom domain with Cloudflare to avoid redirect loops.

## Vercel

- Keep **production** secrets (`STRIPE_WEBHOOK_SECRET`, `CRON_SECRET`, Supabase keys, etc.) only in the Vercel project **Environment Variables**, not in the repo.
- For preview deployments, consider **Deployment Protection** if previews should not be public.

## Rate limiting note

In-memory rate limits in this app apply **per serverless instance**. For stricter, global limits later, consider a shared store (e.g. Redis via Upstash free tier) without changing route behavior from the client’s perspective.
