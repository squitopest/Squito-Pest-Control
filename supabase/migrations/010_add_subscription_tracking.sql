-- Track Stripe subscription IDs + seasonal retention email state for
-- mosquito-&-tick packages. `stripe_subscription_id` links a booking to its
-- Stripe Subscription so the `customer.subscription.deleted` webhook can map
-- back to the booking. `season_end_email_sent_at` enforces idempotency on the
-- seasonal retention email (Stripe retries webhooks up to 3 days).

ALTER TABLE public.bookings
    ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
    ADD COLUMN IF NOT EXISTS season_end_email_sent_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS bookings_stripe_subscription_id_idx
    ON public.bookings (stripe_subscription_id)
    WHERE stripe_subscription_id IS NOT NULL;
