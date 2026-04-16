import { NextResponse } from "next/server";
import { validateEnv } from "@/lib/validateEnv";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");

  if (!input) {
    return NextResponse.json({ error: "Missing input parameter" }, { status: 400 });
  }

  try {
    validateEnv(["GOOGLE_MAPS_API_KEY"]);
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
       return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const response = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "suggestions.placePrediction.placeId,suggestions.placePrediction.text.text,suggestions.placePrediction.structuredFormat.mainText.text,suggestions.placePrediction.structuredFormat.secondaryText.text",
      },
      body: JSON.stringify({
        input,
        includedRegionCodes: ["us"],
        locationBias: {
          circle: {
            center: {
              latitude: 40.789142,
              longitude: -73.13496,
            },
            radius: 50000,
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Places Autocomplete API error:", data);
      return NextResponse.json({ error: "Autocomplete lookup failed." }, { status: 400 });
    }

    const predictions = (data.suggestions || [])
      .map((suggestion: any) => suggestion.placePrediction)
      .filter(Boolean)
      .map((prediction: any) => ({
        place_id: prediction.placeId,
        description: prediction.text?.text || "",
        structured_formatting: {
          main_text: prediction.structuredFormat?.mainText?.text || prediction.text?.text || "",
          secondary_text: prediction.structuredFormat?.secondaryText?.text || "",
        },
      }));

    return NextResponse.json({
      status: "OK",
      predictions,
    });

  } catch (error: any) {
    console.error("Autocomplete Proxy Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
