-- Migration: 006_align_bookings_schema.sql
--
-- Brings the production `public.bookings` table back in line with what the
-- application code in src/app/api/checkout/route.ts and
-- src/app/api/webhook/stripe/route.ts expect.
--
-- Observed drift on prod (Apr 2026):
--   * column is named `status` instead of `stripe_payment_status`
--   * `city` column is missing (code always sends it)
--   * `updated_at` column + auto-update trigger from 00_init are missing
--
-- This migration is idempotent — safe to run multiple times.

BEGIN;

-- 1. Align the payment status column name.
-- If prod has the legacy `status` column, rename it to `stripe_payment_status`.
-- If neither exists yet, create `stripe_payment_status` with the documented default.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'bookings'
          AND column_name = 'status'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'bookings'
          AND column_name = 'stripe_payment_status'
    ) THEN
        ALTER TABLE public.bookings RENAME COLUMN status TO stripe_payment_status;
    END IF;
END $$;

ALTER TABLE public.bookings
    ADD COLUMN IF NOT EXISTS stripe_payment_status TEXT DEFAULT 'pending';

-- 2. Add the missing `city` column used by the checkout insert + webhook email.
ALTER TABLE public.bookings
    ADD COLUMN IF NOT EXISTS city TEXT;

-- 3. Restore the `updated_at` timestamp column and trigger from 00_init.
ALTER TABLE public.bookings
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE
    DEFAULT timezone('utc'::text, now()) NOT NULL;

CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS update_bookings_modtime ON public.bookings;
CREATE TRIGGER update_bookings_modtime
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();

COMMIT;
