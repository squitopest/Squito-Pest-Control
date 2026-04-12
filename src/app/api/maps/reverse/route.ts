import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "Missing lat/lng parameters" }, { status: 400 });
  }

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
       return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

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

    return NextResponse.json(data, { status: 400 });

  } catch (error: any) {
    console.error("Reverse Geocoding Proxy Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
