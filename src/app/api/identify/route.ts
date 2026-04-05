import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an expert entomologist and pest control specialist working for Squito Pest Control on Long Island, New York.

The user will send you a photo. Your job is to identify the pest in the image.

RULES:
1. If you can clearly identify a pest (insect, rodent, arachnid, etc.), respond with ONLY valid JSON in this exact format:
{
  "identified": true,
  "pestName": "Common name of the pest",
  "riskLevel": "Low" | "Medium" | "High" | "Critical",
  "season": "When this pest is most active on Long Island",
  "description": "2-3 sentences about this pest, the dangers it poses, and how Squito treats it. Be specific and authoritative.",
  "confidence": "High" | "Medium" | "Low"
}

2. If the image does NOT contain a pest, or is too blurry/unclear to identify, respond with ONLY:
{
  "identified": false,
  "message": "A friendly 1-sentence explanation of why you couldn't identify a pest."
}

3. NEVER respond with anything other than the JSON object. No markdown, no backticks, no extra text.
4. Common Long Island pests include: mosquitoes, ticks, termites, cockroaches, bed bugs, rats, mice, ants, wasps, hornets, yellowjackets, spiders, lanternflies, fleas, carpenter ants, centipedes, silverfish, earwigs, stink bugs, crickets, and more.`;

export async function POST(req: Request) {
  // Rate limit: 5 identifications per IP per minute
  const ip = getClientIp(req);
  if (!rateLimit(`identify:${ip}`, 5, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment before trying again." },
      { status: 429 }
    );
  }

  try {
    const { image } = await req.json();

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { error: "No image provided." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === "mock-key") {
      return NextResponse.json(
        { error: "AI service is not configured." },
        { status: 500 }
      );
    }

    // Call OpenAI Vision API directly (using gpt-4o-mini for cost efficiency)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: image.startsWith("data:") ? image : `data:image/jpeg;base64,${image}`,
                  detail: "low", // "low" = fixed 85 tokens, much cheaper than "high"
                },
              },
              {
                type: "text",
                text: "Identify the pest in this photo.",
              },
            ],
          },
        ],
        max_tokens: 300,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("OpenAI Vision API Error:", response.status, errBody);
      return NextResponse.json(
        { error: "Failed to analyze image." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content?.trim() || "";

    // Parse the JSON response from OpenAI
    try {
      const result = JSON.parse(raw);
      return NextResponse.json(result);
    } catch {
      console.error("Failed to parse OpenAI vision response:", raw);
      return NextResponse.json({
        identified: false,
        message: "We had trouble analyzing that image. Try a clearer photo or call us at (631) 203-1000!",
      });
    }
  } catch (error: any) {
    console.error("Identify API Error:", error.message);
    return NextResponse.json(
      { error: "An error occurred while processing the image." },
      { status: 500 }
    );
  }
}
