-- Persist the selected residential size tier so booking ops and reporting
-- match the quote and checkout experience shown on the website.

ALTER TABLE public.bookings
    ADD COLUMN IF NOT EXISTS property_size TEXT;
