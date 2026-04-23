-- Persist specialty-service checkout details so ops, success pages, and
-- webhook notifications can reflect exactly what the customer configured.

ALTER TABLE public.bookings
    ADD COLUMN IF NOT EXISTS service_type TEXT,
    ADD COLUMN IF NOT EXISTS service_id TEXT,
    ADD COLUMN IF NOT EXISTS pricing_selection JSONB,
    ADD COLUMN IF NOT EXISTS quoted_price_cents INTEGER,
    ADD COLUMN IF NOT EXISTS service_summary TEXT;
