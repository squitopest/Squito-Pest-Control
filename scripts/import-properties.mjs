/**
 * Import Regrid Premium CSV into Supabase properties table.
 *
 * Usage:
 *   node scripts/import-properties.mjs path/to/ny_suffolk.csv SUFFOLK
 *   node scripts/import-properties.mjs path/to/ny_nassau.csv NASSAU
 *
 * Prerequisites:
 *   1. Run the SQL migration first (create_properties_table.sql)
 *   2. Set env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";
import { createReadStream } from "fs";
import { parse } from "csv-parse";

const CSV_PATH = process.argv[2];
const COUNTY = (process.argv[3] || "SUFFOLK").toUpperCase();

if (!CSV_PATH) {
  console.error("Usage: node scripts/import-properties.mjs <csv-path> [COUNTY]");
  process.exit(1);
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  console.error("Run with: dotenv -e .env.local -- node scripts/import-properties.mjs ...");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── Helpers ──────────────────────────────────────────────────
function toInt(val) {
  if (!val || val === "") return null;
  const n = parseInt(val, 10);
  return isNaN(n) ? null : n;
}
function toFloat(val) {
  if (!val || val === "") return null;
  const n = parseFloat(val);
  return isNaN(n) ? null : n;
}

// ─── Main ─────────────────────────────────────────────────────
async function main() {
  console.log(`\n📦 Importing ${COUNTY} properties from: ${CSV_PATH}\n`);

  const rows = [];
  let skipped = 0;
  let total = 0;

  const parser = createReadStream(CSV_PATH).pipe(
    parse({ columns: true, skip_empty_lines: true, trim: true })
  );

  for await (const row of parser) {
    total++;

    // Skip if no address
    const address = row.address?.trim();
    const city = row.scity?.trim();
    if (!address || !city) {
      skipped++;
      continue;
    }

    // Only include residential properties (optional filter)
    // Property classes 200-299 are residential in NY
    // We'll include everything and let the lookup handle it

    rows.push({
      address: address.toUpperCase(),
      street_number: row.saddno?.trim() || null,
      street_name: row.saddstr?.trim()?.toUpperCase() || null,
      street_suffix: row.saddsttyp?.trim()?.toUpperCase() || null,
      city: city.toUpperCase(),
      zip: row.szip5?.trim() || null,
      county: COUNTY,
      area_building: toInt(row.area_building),
      bldg_footprint_sqft: toInt(row.ll_bldg_footprint_sqft),
      bldg_count: toInt(row.ll_bldg_count),
      num_stories: toFloat(row.numstories),
      bedrooms: toInt(row.num_bedrooms),
      bathrooms: toFloat(row.num_bath),
      year_built: toInt(row.yearbuilt),
      lot_acres: toFloat(row.ll_gisacre || row.gisacre),
      lot_sqft: toInt(row.ll_gissqft || row.sqft),
      use_desc: row.usedesc?.trim() || null,
      parcel_id: row.parcelnumb?.trim() || null,
    });

    // Batch insert every 1000 rows
    if (rows.length >= 1000) {
      await insertBatch(rows);
      rows.length = 0;
    }
  }

  // Insert remaining rows
  if (rows.length > 0) {
    await insertBatch(rows);
  }

  console.log(`\n✅ Done! Total: ${total}, Imported: ${total - skipped}, Skipped: ${skipped}\n`);
}

let insertedCount = 0;

async function insertBatch(rows) {
  const { error } = await supabase.from("properties").insert(rows);
  if (error) {
    console.error(`❌ Batch insert error at row ${insertedCount}:`, error.message);
    // Try inserting one by one to find the problematic row
    let recovered = 0;
    for (const row of rows) {
      const { error: singleErr } = await supabase.from("properties").insert(row);
      if (!singleErr) recovered++;
    }
    console.log(`  Recovered ${recovered}/${rows.length} rows`);
    insertedCount += recovered;
  } else {
    insertedCount += rows.length;
  }

  if (insertedCount % 10000 === 0 || insertedCount < 5000) {
    console.log(`  📊 Inserted ${insertedCount.toLocaleString()} rows...`);
  }
}

main().catch(console.error);
