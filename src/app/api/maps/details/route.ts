import { NextResponse } from "next/server";
import { validateEnv } from "@/lib/validateEnv";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const place_id = searchParams.get("place_id");

  if (!place_id) {
    return NextResponse.json({ error: "Missing place_id parameter" }, { status: 400 });
  }

  try {
    validateEnv(["GOOGLE_MAPS_API_KEY"]);
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    // Use Geocoding API or Places Details API to get precisely parsed address components.
    // Geocoding API is usually best for resolving a place_id to street/city/zip explicitly.
    const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0];
      const components = result.address_components;

      let streetNumber = "";
      let route = "";
      let city = "";
      let zipCode = "";

      // Parse Google Address Components into our flat payload structure
      for (const comp of components) {
        if (comp.types.includes("street_number")) streetNumber = comp.long_name;
        if (comp.types.includes("route")) route = comp.long_name;
        // City can be locality, sublocality, or neighborhood depending on NY mapping (e.g., Hamlet)
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

    return NextResponse.json(data, { status: 400 });

  } catch (error: any) {
    console.error("Details Proxy Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
