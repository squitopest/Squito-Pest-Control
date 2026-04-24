import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { createServiceClient } from "@/lib/supabase";
import { resolvePropertySizeFromSqft } from "@/data/plans";
import { resolveYardSizeFromLotAcres } from "@/data/mosquitoTickPackages";

/**
 * GET /api/maps/property?address=123+Main+St,+Bay+Shore,+NY+11706
 *
 * Looks up property data from our own Supabase database (populated
 * from Regrid county assessor CSV data). Zero external API calls.
 *
 * Returns square footage, lot size, and pre-resolved pricing tiers.
 */

const PER_MINUTE_LIMIT = 10;
const DAILY_LIMIT = 30;
const dailyUsage = new Map<string, { count: number; resetAt: number }>();

export async function GET(request: Request) {
  const ip = getClientIp(request);

  // ── Rate limiting ──
  if (!rateLimit(`maps-property:${ip}`, PER_MINUTE_LIMIT, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down and try again shortly." },
      { status: 429 }
    );
  }

  const now = Date.now();
  const daily = dailyUsage.get(ip);
  if (daily && now < daily.resetAt) {
    if (daily.count >= DAILY_LIMIT) {
      return NextResponse.json(
        { error: "Daily lookup limit reached. Please try again tomorrow." },
        { status: 429 }
      );
    }
    daily.count++;
  } else {
    dailyUsage.set(ip, { count: 1, resetAt: now + 86_400_000 });
  }

  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address || address.trim().length < 5) {
    return NextResponse.json(
      { error: "Missing or invalid address parameter" },
      { status: 400 }
    );
  }

  const FALLBACK = {
    found: false,
    sqft: null,
    lotSizeSqft: null,
    lotSizeAcres: null,
    yearBuilt: null,
    bedrooms: null,
    bathrooms: null,
    propertyType: null,
    propertySize: null,
    mosquitoTickSize: null,
    source: "fallback" as const,
  };

  try {
    // Parse address into components
    // Google gives us: "1546 Potter Boulevard, Bay Shore, NY 11706"
    const trimmed = address.trim();
    const parts = trimmed.split(",").map((p) => p.trim());

    let streetFull = parts[0] || "";
    const cityPart = parts.length >= 3 ? parts[1] : parts.length === 2 ? parts[1] : "";
    const stateZip = parts.length >= 3 ? parts[2] : "";

    // Extract zip from "NY 11706"
    const zipMatch = stateZip.match(/\d{5}/);
    const zip = zipMatch ? zipMatch[0] : null;

    // Extract city (remove state if present)
    const city = cityPart.replace(/,?\s*(NY|New York)\s*/i, "").trim();

    // Extract street number and name
    const streetMatch = streetFull.match(/^(\d+[-\w]*)\s+(.+)$/);
    const streetNumber = streetMatch ? streetMatch[1] : null;
    let streetRemainder = streetMatch ? streetMatch[2] : streetFull;

    // Normalize street suffixes for matching
    const suffixMap: Record<string, string> = {
      BOULEVARD: "BLVD", AVENUE: "AVE", STREET: "ST",
      DRIVE: "DR", COURT: "CT", PLACE: "PL",
      LANE: "LN", ROAD: "RD", CIRCLE: "CIR",
      TERRACE: "TER", PARKWAY: "PKWY", HIGHWAY: "HWY",
      TURNPIKE: "TPKE", TRAIL: "TRL", CROSSING: "XING",
      EXTENSION: "EXT", EXPRESSWAY: "EXPY",
    };

    // Normalize the street name to uppercase
    streetRemainder = streetRemainder.toUpperCase();

    // Try to split off the suffix
    const streetWords = streetRemainder.split(/\s+/);
    const lastWord = streetWords[streetWords.length - 1];
    const normalizedSuffix = suffixMap[lastWord] || lastWord;
    const streetName = streetWords.slice(0, -1).join(" ");

    // Regrid CSV stores street_name as "POTTER BLV" (name+suffix together)
    // and city as the township (e.g., "ISLIP") not the hamlet ("Bay Shore")
    // So we need flexible matching strategies.

    console.log(
      `[PropertyDB] Looking up: num="${streetNumber}" street="${streetName}" suffix="${normalizedSuffix}" city="${city}" zip="${zip}"`
    );

    const supabase = createServiceClient();
    let match = null;

    // Strategy 1: zip + street_number + street_name pattern
    // Use ILIKE with the street name to match "POTTER BLV", "POTTER BLVD", etc.
    if (zip && streetNumber && streetName) {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("zip", zip)
        .eq("street_number", streetNumber)
        .ilike("street_name", `${streetName}%`)
        .limit(1)
        .maybeSingle();
      match = data;
      if (match) console.log(`[PropertyDB] ✅ Matched via zip+number+street`);
    }

    // Strategy 2: Just zip + full address pattern (handles any naming quirks)
    if (!match && zip && streetNumber) {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("zip", zip)
        .ilike("address", `${streetNumber} ${streetName}%`)
        .limit(1)
        .maybeSingle();
      match = data;
      if (match) console.log(`[PropertyDB] ✅ Matched via zip+address pattern`);
    }

    // Strategy 3: street_number + street_name pattern (ignore city/zip entirely)
    if (!match && streetNumber && streetName) {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("street_number", streetNumber)
        .ilike("street_name", `${streetName}%`)
        .limit(3);
      // If exactly one result, use it. If multiple, try to narrow by zip.
      if (data && data.length === 1) {
        match = data[0];
        console.log(`[PropertyDB] ✅ Matched via number+street (unique)`);
      } else if (data && data.length > 1 && zip) {
        match = data.find((r: any) => r.zip === zip) || data[0];
        console.log(`[PropertyDB] ✅ Matched via number+street (${data.length} results, picked by zip)`);
      }
    }

    if (!match) {
      console.log(`[PropertyDB] No match found`);
      return NextResponse.json(FALLBACK);
    }

    // Use area_building (living area) if available, otherwise footprint
    const sqft: number | null = match.area_building || match.bldg_footprint_sqft || null;
    const lotSizeSqft: number | null = match.lot_sqft || null;
    const lotSizeAcres: number | null = match.lot_acres
      ? Math.round(match.lot_acres * 100) / 100
      : null;

    console.log(
      `[PropertyDB] Found: ${match.address}, ${match.city} — sqft=${sqft} (living=${match.area_building}, footprint=${match.bldg_footprint_sqft}), lot=${lotSizeAcres}ac, beds=${match.bedrooms}, year=${match.year_built}`
    );

    return NextResponse.json({
      found: true,
      sqft,
      lotSizeSqft,
      lotSizeAcres,
      yearBuilt: match.year_built,
      bedrooms: match.bedrooms,
      bathrooms: match.bathrooms,
      propertyType: match.use_desc,
      propertySize: sqft ? resolvePropertySizeFromSqft(sqft) : null,
      mosquitoTickSize: lotSizeAcres
        ? resolveYardSizeFromLotAcres(lotSizeAcres)
        : sqft
          ? resolvePropertySizeFromSqft(sqft)
          : null,
      source: "db" as const,
    });
  } catch (error: any) {
    console.error("[PropertyDB] Lookup error:", error?.message || error);
    return NextResponse.json(FALLBACK);
  }
}
