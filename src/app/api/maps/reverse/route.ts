import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { validateEnv } from "@/lib/validateEnv";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  if (!rateLimit(`maps-reverse:${ip}`, 60, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down and try again shortly." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const rawLat = searchParams.get("lat");
  const rawLng = searchParams.get("lng");

  if (!rawLat || !rawLng) {
    return NextResponse.json({ error: "Missing lat/lng parameters" }, { status: 400 });
  }

  // Coerce to numbers and range-check before we ever put them in a URL — stops
  // both query-string injection and malformed requests hitting Google's API.
  const lat = Number(rawLat);
  const lng = Number(rawLng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return NextResponse.json({ error: "Invalid lat/lng values" }, { status: 400 });
  }

  try {
    validateEnv(["GOOGLE_MAPS_API_KEY"]);
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
       return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      // Find the first result that is a street address
      const result = data.results.find((r: any) => r.types.includes("street_address") || r.types.includes("premise")) || data.results[0];
      const components = result.address_components;

      let streetNumber = "";
      let route = "";
      let city = "";
      let zipCode = "";

      for (const comp of components) {
        if (comp.types.includes("street_number")) streetNumber = comp.long_name;
        if (comp.types.includes("route")) route = comp.long_name;
        if (comp.types.includes("locality")) city = comp.long_name;
        if (!city && comp.types.includes("sublocality")) city = comp.long_name;
        if (!city && comp.types.includes("neighborhood")) city = comp.long_name;
        if (comp.types.includes("postal_code")) zipCode = comp.long_name;
      }

      return NextResponse.json({
        street: `${streetNumber} ${route}`.trim(),
        city: city,
        zipCode: zipCode,
        formatted: result.formatted_address,
      });
    }

    // Don't forward Google's raw error payload to the browser — log it server-side
    // and return a generic message.
    console.error("Reverse Geocoding upstream error", {
      status: data?.status,
      error_message: data?.error_message,
    });
    return NextResponse.json({ error: "Could not resolve that location." }, { status: 400 });

  } catch (error: any) {
    console.error("Reverse Geocoding Proxy Error:", error?.message || error);
    return NextResponse.json({ error: "Reverse geocoding failed." }, { status: 500 });
  }
}
