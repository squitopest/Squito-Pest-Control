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
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }
    const url = `https://places.googleapis.com/v1/places/${place_id}`;

    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "addressComponents.longText,addressComponents.types,formattedAddress",
      },
    });
    const data = await response.json();

    if (response.ok && data.addressComponents) {
      const components = data.addressComponents;

      let streetNumber = "";
      let route = "";
      let city = "";
      let zipCode = "";

      // Parse Google Address Components into our flat payload structure
      for (const comp of components) {
        if (comp.types.includes("street_number")) streetNumber = comp.longText;
        if (comp.types.includes("route")) route = comp.longText;
        // City can be locality, sublocality, or neighborhood depending on NY mapping (e.g., Hamlet)
        if (comp.types.includes("locality")) city = comp.longText;
        if (!city && comp.types.includes("sublocality")) city = comp.longText;
        if (!city && comp.types.includes("neighborhood")) city = comp.longText;
        if (!city && comp.types.includes("postal_town")) city = comp.longText;
        if (comp.types.includes("postal_code")) zipCode = comp.longText;
      }

      return NextResponse.json({
        street: `${streetNumber} ${route}`.trim(),
        city: city,
        zipCode: zipCode,
        formatted: data.formattedAddress,
      });
    }

    return NextResponse.json({ error: "Address details lookup failed." }, { status: 400 });

  } catch (error: any) {
    console.error("Details Proxy Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
