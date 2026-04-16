-- Tighten bookings RLS so anonymous visitors can create leads,
-- but only the backend service role can read or modify bookings.

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.bookings;
DROP POLICY IF EXISTS "Enable all access for service role" ON public.bookings;

CREATE POLICY "Allow anonymous booking inserts" ON public.bookings
    FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON public.bookings
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
