-- Migration: 00_init.sql
-- Description: Creates the core bookings table for handling leads before they are confirmed by Stripe.

-- 1. Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_type TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    service_date TEXT,
    stripe_session_id TEXT UNIQUE,
    stripe_payment_status TEXT DEFAULT 'pending', -- pending, paid, failed, expired
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Setup Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Allow anyone to insert a new booking (Anon can create a lead)
CREATE POLICY "Enable insert for anonymous users" ON public.bookings
    FOR INSERT 
    WITH CHECK (true);

-- Allow service role (backend) to do anything
CREATE POLICY "Enable all access for service role" ON public.bookings
    USING (true)
    WITH CHECK (true);

-- 4. Trigger for timestamp update
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_modtime
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
