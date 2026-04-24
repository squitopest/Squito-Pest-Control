-- ============================================================
-- Supabase migration: Create properties lookup table
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Drop if exists (for re-running during development)
DROP TABLE IF EXISTS properties;

CREATE TABLE properties (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  
  -- Address fields (used for lookup)
  address       TEXT NOT NULL,           -- full street: "24 EDGEMERE DR"
  street_number TEXT,                    -- "24"
  street_name   TEXT,                    -- "EDGEMERE"
  street_suffix TEXT,                    -- "DR"
  city          TEXT NOT NULL,           -- "SOUTHAMPTON"
  zip           TEXT,                    -- "11968"
  county        TEXT NOT NULL DEFAULT 'SUFFOLK',
  
  -- Building data (what we need for pricing)
  area_building         INT,            -- living area sqft from assessor
  bldg_footprint_sqft   INT,            -- footprint sqft from satellite
  bldg_count            SMALLINT,       -- number of buildings on parcel
  num_stories           REAL,           -- number of stories
  bedrooms              SMALLINT,
  bathrooms              REAL,
  year_built             SMALLINT,
  
  -- Lot data (for M&T yard pricing)
  lot_acres              REAL,
  lot_sqft               INT,
  
  -- Metadata
  use_desc               TEXT,          -- property type description
  parcel_id              TEXT,          -- original parcel number
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Enable trigram extension FIRST (needed for fuzzy matching)
-- ============================================================
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ============================================================
-- Indexes for fast address lookups
-- ============================================================

-- Primary lookup: zip + street number + street name (fastest)
CREATE INDEX idx_properties_zip_addr 
  ON properties (zip, street_number, street_name);

-- Fallback: city + street name
CREATE INDEX idx_properties_city_street 
  ON properties (city, street_name);

-- Full address text search (for fuzzy matching)
CREATE INDEX idx_properties_address 
  ON properties USING gin (address gin_trgm_ops);

-- ============================================================
-- Row Level Security (public read-only, no write from client)
-- ============================================================
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (the data is public county records)
CREATE POLICY "Public read access" ON properties
  FOR SELECT USING (true);

-- No insert/update/delete from anon — only service role can write
-- (This is the default when no INSERT/UPDATE/DELETE policies exist)
