import { createServiceClient } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Fallback images mapped to pest categories (used when DALL-E generation fails)
const CATEGORY_IMAGES: Record<string, string> = {
  "Mosquitoes": "/blog-mosquito.jpg",
  "Termites": "/blog-termite.jpg",
  "Rodents": "/blog-mice.jpg",
  "Ants": "/blog-termite.jpg",
  "Cockroaches": "/blog-mosquito.jpg",
  "Ticks": "/blog-mosquito.jpg",
  "Spiders": "/blog-mice.jpg",
  "Bed Bugs": "/blog-termite.jpg",
  "Wasps": "/blog-mosquito.jpg",
  "Fleas": "/blog-mice.jpg",
  "Prevention": "/blog-mosquito.jpg",
  "Seasonal": "/blog-mosquito.jpg",
  "Identification": "/blog-termite.jpg",
  "Home Protection": "/blog-mice.jpg",
};

// Pool of SEO-optimized topics for Long Island pest control
const TOPIC_POOL = [
  { keyword: "tick prevention Long Island summer", category: "Ticks", slug_hint: "tick-prevention-tips" },
  { keyword: "signs of carpenter ant damage in your home", category: "Ants", slug_hint: "carpenter-ant-damage-signs" },
  { keyword: "when to call exterminator for bed bugs", category: "Bed Bugs", slug_hint: "when-to-call-bed-bug-exterminator" },
  { keyword: "cockroach prevention kitchen tips", category: "Cockroaches", slug_hint: "cockroach-prevention-kitchen" },
  { keyword: "wasp nest removal safety guide", category: "Wasps", slug_hint: "safe-wasp-nest-removal" },
  { keyword: "common spiders found on Long Island", category: "Spiders", slug_hint: "common-long-island-spiders" },
  { keyword: "flea treatment for homes with pets", category: "Fleas", slug_hint: "flea-treatment-homes-pets" },
  { keyword: "seasonal pest calendar New York", category: "Seasonal", slug_hint: "ny-seasonal-pest-calendar" },
  { keyword: "how to identify bed bug bites vs mosquito bites", category: "Identification", slug_hint: "bed-bug-vs-mosquito-bites" },
  { keyword: "best time to spray for mosquitoes Long Island", category: "Mosquitoes", slug_hint: "best-time-spray-mosquitoes" },
  { keyword: "rat vs mouse droppings identification guide", category: "Rodents", slug_hint: "rat-vs-mouse-droppings" },
  { keyword: "how to keep spiders out of basement", category: "Spiders", slug_hint: "keep-spiders-out-basement" },
  { keyword: "are carpenter bees destroying your deck", category: "Wasps", slug_hint: "carpenter-bees-deck-damage" },
  { keyword: "stink bug season Long Island fall", category: "Seasonal", slug_hint: "stink-bug-season-fall" },
  { keyword: "how to tell if you have a rodent infestation", category: "Rodents", slug_hint: "signs-rodent-infestation" },
  { keyword: "child safe pest control methods", category: "Prevention", slug_hint: "child-safe-pest-control" },
  { keyword: "why do I have ants in my kitchen in spring", category: "Ants", slug_hint: "spring-kitchen-ants" },
  { keyword: "Long Island tick borne diseases Lyme disease", category: "Ticks", slug_hint: "tick-borne-diseases-long-island" },
  { keyword: "how to prevent cockroaches in apartment", category: "Cockroaches", slug_hint: "prevent-cockroaches-apartment" },
  { keyword: "mosquito-borne diseases on Long Island", category: "Mosquitoes", slug_hint: "mosquito-diseases-long-island" },
  { keyword: "how to pest-proof your home before winter", category: "Home Protection", slug_hint: "pest-proof-home-winter" },
  { keyword: "does mulch attract termites", category: "Termites", slug_hint: "mulch-attract-termites" },
  { keyword: "natural mosquito repellent backyard", category: "Mosquitoes", slug_hint: "natural-mosquito-repellent-backyard" },
  { keyword: "what attracts mice to your house", category: "Rodents", slug_hint: "what-attracts-mice" },
];

function getPublishedDateSlug() {
  return new Date().toISOString().slice(0, 10);
}

function buildRecurringSlug(baseSlug: string) {
  return `${baseSlug}-${getPublishedDateSlug()}`;
}

function isAuthorizedCronRequest(req: Request) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return true;
  }

  // Keep a manual fallback so the route can still be triggered intentionally
  // outside Vercel Cron Jobs when needed.
  const { searchParams } = new URL(req.url);
  const legacySecret = searchParams.get("secret");
  return Boolean(process.env.BLOG_CRON_SECRET && legacySecret === process.env.BLOG_CRON_SECRET);
}

/**
 * Generate a unique blog hero image using DALL-E 3 and upload it to Supabase Storage.
 * Returns the public URL on success, or null on failure.
 */
async function generateAndUploadImage(
  topic: { keyword: string; category: string; slug_hint: string },
  supabase: ReturnType<typeof createServiceClient>
): Promise<string | null> {
  try {
    const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!geminiApiKey) {
      console.error("GOOGLE_GEMINI_API_KEY not configured");
      return null;
    }

    // Map categories to specific visual subjects for accurate image generation
    const PEST_VISUAL_SUBJECTS: Record<string, string> = {
      "Mosquitoes": "a close-up of a mosquito on skin or hovering near a backyard patio at dusk, with warm lighting",
      "Termites": "termite damage on wood framing inside a home, showing worker termites and damaged grain, macro detail",
      "Rodents": "a house mouse peeking out from behind a kitchen baseboard or near a foundation crack, realistic and detailed",
      "Ants": "a trail of carpenter ants marching along a wooden windowsill or door frame, sharp macro photography",
      "Cockroaches": "a German cockroach on a kitchen counter near crumbs, photorealistic macro with shallow depth of field",
      "Ticks": "a close-up of a deer tick on a green leaf blade in a grassy Long Island yard, sharp macro photography",
      "Spiders": "a common house spider in its web in a basement corner or garage, photorealistic with dramatic lighting",
      "Bed Bugs": "a close-up of bed bugs on a white mattress seam, realistic clinical macro photography style",
      "Wasps": "a paper wasp nest under a residential home eave with wasps visible, shot from a safe distance",
      "Fleas": "a close-up of a flea on pet fur, ultra-macro photography with sharp detail",
      "Prevention": "a homeowner inspecting the perimeter of a clean, well-maintained Long Island suburban home exterior",
      "Seasonal": "a split-season suburban yard scene showing seasonal pest activity, professional editorial style",
      "Identification": "a side-by-side comparison scene of common household pests in a clinical identification setting",
      "Home Protection": "a professional pest control technician inspecting and sealing entry points on a suburban home exterior",
    };

    const pestSubject = PEST_VISUAL_SUBJECTS[topic.category] || `a realistic scene of ${topic.category.toLowerCase()} pests in a suburban home`;
    const imagePrompt = `Professional pest control blog hero image: ${pestSubject}. Wide landscape composition (16:9), photorealistic, high resolution, well-lit photography suitable for a premium dark-themed website. Suburban Long Island, New York setting. No text, no watermarks, no logos. Clean modern editorial photography.`;

    // Step 1: Generate image with Nano Banana 2 (gemini-3.1-flash-image-preview)
    const ai = new GoogleGenAI({ apiKey: geminiApiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: imagePrompt,
    });

    // Step 2: Extract the base64 image data from the response
    const parts = response.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p: { inlineData?: { data?: string; mimeType?: string } }) => p.inlineData?.data);

    if (!imagePart?.inlineData?.data) {
      console.error("No image data returned from Nano Banana 2");
      return null;
    }

    const imageBuffer = Buffer.from(imagePart.inlineData.data, "base64");
    const mimeType = imagePart.inlineData.mimeType || "image/png";
    const ext = mimeType.includes("jpeg") ? "jpg" : "png";
    const fileName = `${topic.slug_hint}.${ext}`;

    // Step 3: Upload directly to Supabase Storage (no download needed — already in memory)
    const { error: uploadError } = await supabase
      .storage
      .from("blog-images")
      .upload(fileName, imageBuffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError.message);
      return null;
    }

    // Step 4: Return the public URL
    const { data: urlData } = supabase
      .storage
      .from("blog-images")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (err) {
    console.error("Nano Banana 2 image generation failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

export async function GET(req: Request) {
  if (!isAuthorizedCronRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();

  try {
    // Get all existing slugs to avoid duplicates
    const { data: existingPosts } = await supabase
      .from("blog_posts")
      .select("slug");
    
    const existingSlugs = new Set((existingPosts || []).map((p: { slug: string }) => p.slug));

    // Prefer unused topics first so the early publishing cadence builds breadth.
    const availableTopics = TOPIC_POOL.filter(t => !existingSlugs.has(t.slug_hint));

    const baseTopicPool = availableTopics.length > 0 ? availableTopics : TOPIC_POOL;
    const selectedTopic = baseTopicPool[Math.floor(Math.random() * baseTopicPool.length)];
    const topic = {
      ...selectedTopic,
      slug_hint: availableTopics.length > 0
        ? selectedTopic.slug_hint
        : buildRecurringSlug(selectedTopic.slug_hint),
    };

    // Generate the blog post using OpenAI
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const systemPrompt = `You are a professional pest control content writer for Squito Pest Control, a premier pest control company serving Long Island, New York (Nassau and Suffolk County). 

Your writing style is:
- Professional but approachable
- Authoritative and factual
- Locally relevant to Long Island homeowners
- SEO-optimized with natural keyword usage
- Actionable with practical advice

You MUST respond with valid JSON only. No markdown, no code blocks, just raw JSON.`;

    const userPrompt = `Write a complete, high-quality blog post about: "${topic.keyword}"

The article should be 800-1200 words, comprehensive, and formatted with HTML tags for display on a dark-themed website.

Return a JSON object with these exact fields:
{
  "title": "A compelling, SEO-friendly title (50-70 characters)",
  "excerpt": "A 1-2 sentence preview that hooks the reader (under 160 characters)",
  "seo_description": "An SEO meta description optimized for search engines (under 160 characters)",
  "read_time": "X min read",
  "content": "Full HTML content of the article"
}

For the HTML content, use these CSS classes:
- Paragraphs: <p class="mb-6 text-white/70 leading-relaxed">
- First paragraph: <p class="mb-6 text-lg text-white/80 leading-relaxed">
- H2 headings: <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">
- H3 headings: <h3 class="text-xl font-bold text-white mt-8 mb-3">
- Bullet lists: <ul class="list-disc pl-6 mb-8 text-white/70 space-y-3">
- Bold text in lists: <strong class="text-white">
- Green callout box: <div class="bg-green-500/10 border border-green-500/30 p-6 rounded-2xl my-10"> with <h4 class="text-green-400 font-bold text-lg mb-2"> and <p class="text-white/80 text-sm">
- Warning box: <div class="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl my-10"> with <h4 class="text-red-400 font-bold text-lg mb-2">

Include a green callout box at the end encouraging the reader to contact Squito Pest Control.
Make the article specific to Long Island, NY where relevant.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Blog generation OpenAI API error:", err);
      return NextResponse.json({ error: "OpenAI API error" }, { status: 500 });
    }

    const aiData = await response.json();
    const rawContent = aiData.choices?.[0]?.message?.content;

    if (!rawContent) {
      return NextResponse.json({ error: "No content generated" }, { status: 500 });
    }

    // Parse the AI response — strip markdown code fences if present
    let parsed;
    try {
      const cleaned = rawContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response for blog generation.");
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    // Generate a unique hero image with Nano Banana 2 and upload to Supabase Storage
    const generatedImageUrl = await generateAndUploadImage(topic, supabase);

    // Use the generated image URL, or fall back to a static category image
    const image = generatedImageUrl || CATEGORY_IMAGES[topic.category] || "/blog-mosquito.jpg";

    // Format the date
    const now = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    // Save to Supabase
    const newPost = {
      slug: topic.slug_hint,
      title: parsed.title,
      excerpt: parsed.excerpt,
      seo_description: parsed.seo_description,
      date: formattedDate,
      category: topic.category,
      read_time: parsed.read_time || "5 min read",
      image,
      content: parsed.content,
      published: true,
    };

    const { error: insertError } = await supabase
      .from("blog_posts")
      .insert(newPost);

    if (insertError) {
      console.error("Failed to save generated blog post:", insertError.message);
      return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Published: "${parsed.title}"`,
      slug: topic.slug_hint,
      imageGenerated: !!generatedImageUrl,
      imageUrl: image,
      reusedTopicPool: availableTopics.length === 0,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Blog generation failed:", message);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
