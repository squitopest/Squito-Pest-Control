import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");

  if (!input) {
    return NextResponse.json({ error: "Missing input parameter" }, { status: 400 });
  }

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
       return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    // Classic Places Autocomplete API
    // Biased to Long Island coordinates, restricted to US
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&components=country:us&location=40.789142,-73.134960&radius=50000&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' || data.status === 'ZERO_RESULTS') {
      return NextResponse.json(data);
    }

    // If classic API fails, fallback to try Places API (New)
    console.error("Classic AutoComplete error or disabled:", data.status, data.error_message);
    return NextResponse.json(data, { status: 400 });

  } catch (error: any) {
    console.error("Autocomplete Proxy Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
