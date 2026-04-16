-- Bring the bookings table in line with the fields used by checkout and webhook flows.
-- This keeps Stripe payments, internal notifications, and booked service details in sync.

ALTER TABLE public.bookings
    ADD COLUMN IF NOT EXISTS service_time TEXT,
    ADD COLUMN IF NOT EXISTS street TEXT,
    ADD COLUMN IF NOT EXISTS city TEXT,
    ADD COLUMN IF NOT EXISTS plan_id TEXT,
    ADD COLUMN IF NOT EXISTS full_name TEXT,
    ADD COLUMN IF NOT EXISTS email TEXT,
    ADD COLUMN IF NOT EXISTS phone TEXT;

