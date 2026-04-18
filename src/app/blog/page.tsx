import { BookOpen } from "lucide-react";
import { createAnonClient } from "@/lib/supabase";
import BlogList from "@/components/BlogList/BlogList";
import { blogPosts as staticPosts } from "@/data/blog";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Blog | Squito Pest Control",
  description: "Expert pest control advice, seasonal tips, and guides for Long Island residents.",
  path: "/blog",
});

// Revalidate every hour so new posts appear without a full redeploy
export const revalidate = 3600;

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  read_time: string;
  image: string;
};

const BLOG_FETCH_TIMEOUT_MS = 1500;

function mapStaticPosts(): BlogPost[] {
  return staticPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    category: p.category,
    read_time: p.readTime,
    image: p.image,
  }));
}

async function getPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createAnonClient();
    const query = supabase
      .from("blog_posts")
      .select("slug, title, excerpt, date, category, read_time, image")
      .eq("published", true)
      .order("created_at", { ascending: false });

    const timeout = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), BLOG_FETCH_TIMEOUT_MS)
    );

    const result = await Promise.race([query, timeout]);

    if (!result) {
      return mapStaticPosts();
    }

    const { data, error } = result;

    if (error || !data || data.length === 0) {
      return mapStaticPosts();
    }

    return data;
  } catch {
    return mapStaticPosts();
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[600px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
           <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
             <BookOpen size={14} />
             Field Notes
           </div>
           <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
             Pest Control <span className="gradient-text">Insights</span>
           </h1>
           <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
             Expert advice, seasonal alerts, and comprehensive guides to keeping your Long Island property pest-free year-round.
           </p>
        </div>

        <BlogList posts={posts} />
      </div>
    </main>
  );
}
