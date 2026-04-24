-- Quick fix: lot_sqft can exceed INT range for large parcels
-- Run this in Supabase SQL Editor

-- First truncate the table (remove any partial import data)
TRUNCATE TABLE properties;

-- Change lot_sqft from INT to BIGINT
ALTER TABLE properties ALTER COLUMN lot_sqft TYPE BIGINT;
