# Squito AI: Go-Live Security Checklist

This document contains the critical security steps to take before and during the official launch of Squito AI.

## 1. Lock Down Your Database (Supabase RLS)
Right now, you are using Supabase to store customer addresses and booking info. Supabase has a feature called **RLS (Row Level Security)**.
- **Action:** Go to your Supabase Dashboard -> Authentication -> Policies (or Table Editor -> `bookings` table). Ensure RLS is **Enabled** on the `bookings` table.
- **Why?** We constructed your backend so that all database writing happens *securely* on the server inside `/api/checkout`. By enabling RLS and blocking public access, you guarantee that no hacker can inspect the front-end code and maliciously read your entire list of customer addresses.

## 2. Guard Your API Keys with Your Life
If a hacker gets your OpenAI API key, they can run up thousands of dollars in charges. If they get your Stripe Secret, they can manipulate transactions.
- **Action:** 
  1. Ensure your `.env.local` file is NEVER uploaded to GitHub (it should already be ignored by default, but verify).
  2. In your Vercel Dashboard, go to **Settings > Environment Variables**. 
  3. Ensure that sensitive keys (like `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) do **NOT** start with `NEXT_PUBLIC_`. Any key starting with `NEXT_PUBLIC_` is visible to anyone who right-clicks your website. (Your Geoapify and Stripe *Publishable* keys are safe to be public).

## 3. Verify Stripe Webhook Signatures
We already wrote the code to verify Stripe webhook signatures, but it only works if you give it the correct live password.
- **Action:** When you switch to Stripe Live mode, you will create a new Live Webhook endpoint in the Stripe Dashboard. Stripe will give you a new **Signing Secret** (it usually starts with `whsec_`). 
- **Why?** You must paste this exact secret into Vercel as `STRIPE_WEBHOOK_SECRET`. This guarantees that when a "Purchase Successful" signal hits your server, it is *only* accepted if it was cryptographically signed by Stripe. (This prevents someone from downloading Postman and faking a successful checkout to get free service).

## 4. Protect Against Bot Spam (Rate Limiting)
Your `/api/identify` route uses AI Vision, which costs you a fraction of a cent per use. Unprotected, a malicious bot could upload 10,000 photos an hour and cost you real money. Your Contact Form could also get spammed by automated SEO bots.
- **Immediate Action:** Vercel has built-in DDoS protection, but I highly recommend going into your Vercel Dashboard, clicking on **Security**, and enabling their **Web Application Firewall (WAF)**.
- **Future Upgrade:** If you start getting spam submissions from the Contact Form through your Zapier, we should do a 15-minute upgrade to attach **Cloudflare Turnstile** (an invisible, user-friendly alternative to reCAPTCHA) to the "Request Free Inspection" button to guarantee only humans can click it.

## 5. Multi-Factor Authentication (MFA)
The weakest link in a bulletproof system is always human error.
- **Action:** Turn on Two-Factor Authentication (MFA/2FA) immediately for your **GitHub, Vercel, Supabase, and Stripe** accounts. If someone guesses your Vercel password, they bypass every security measure we've built.
