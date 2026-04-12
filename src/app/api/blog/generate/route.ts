import { createServiceClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

// Map pest categories to their corresponding blog images
const CATEGORY_IMAGES: Record<string, string> = {
  "Mosquitoes": "/blog-mosquito.png",
  "Termites": "/blog-termite.png",
  "Rodents": "/blog-mice.png",
  "Ants": "/blog-termite.png",
  "Cockroaches": "/blog-mosquito.png",
  "Ticks": "/blog-mosquito.png",
  "Spiders": "/blog-mice.png",
  "Bed Bugs": "/blog-termite.png",
  "Wasps": "/blog-mosquito.png",
  "Fleas": "/blog-mice.png",
  "Prevention": "/blog-mosquito.png",
  "Seasonal": "/blog-mosquito.png",
  "Identification": "/blog-termite.png",
  "Home Protection": "/blog-mice.png",
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

export async function GET(req: Request) {
  // Verify cron secret to prevent unauthorized access
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.BLOG_CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();

  try {
    // Get all existing slugs to avoid duplicates
    const { data: existingPosts } = await supabase
      .from("blog_posts")
      .select("slug");
    
    const existingSlugs = new Set((existingPosts || []).map((p: { slug: string }) => p.slug));

    // Find an unused topic
    const availableTopics = TOPIC_POOL.filter(t => !existingSlugs.has(t.slug_hint));
    
    if (availableTopics.length === 0) {
      return NextResponse.json({ message: "All topics have been covered. Add more topics to the pool." });
    }

    // Pick a random available topic
    const topic = availableTopics[Math.floor(Math.random() * availableTopics.length)];

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
      return NextResponse.json({ error: "OpenAI API error", details: err }, { status: 500 });
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
      return NextResponse.json({ error: "Failed to parse AI response", raw: rawContent }, { status: 500 });
    }

    // Get the appropriate image for this category
    const image = CATEGORY_IMAGES[topic.category] || "/blog-mosquito.png";

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
      return NextResponse.json({ error: "Failed to save post", details: insertError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Published: "${parsed.title}"`,
      slug: topic.slug_hint,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: "Generation failed", details: message }, { status: 500 });
  }
}
