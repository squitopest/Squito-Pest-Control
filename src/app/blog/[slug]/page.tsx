import { notFound } from "next/navigation";
import { createAnonClient } from "@/lib/supabase";
import { blogPosts as staticPosts } from "@/data/blog";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  seo_description: string;
  date: string;
  category: string;
  read_time: string;
  image: string;
  content: string;
};

// Revalidate every hour
export const revalidate = 3600;

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      // Fallback to static posts
      const staticPost = staticPosts.find(p => p.slug === slug);
      if (!staticPost) return null;
      return {
        slug: staticPost.slug,
        title: staticPost.title,
        excerpt: staticPost.excerpt,
        seo_description: staticPost.seoDescription,
        date: staticPost.date,
        category: staticPost.category,
        read_time: staticPost.readTime,
        image: staticPost.image,
        content: staticPost.content,
      };
    }

    return data;
  } catch {
    // Fallback to static posts
    const staticPost = staticPosts.find(p => p.slug === slug);
    if (!staticPost) return null;
    return {
      slug: staticPost.slug,
      title: staticPost.title,
      excerpt: staticPost.excerpt,
      seo_description: staticPost.seoDescription,
      date: staticPost.date,
      category: staticPost.category,
      read_time: staticPost.readTime,
      image: staticPost.image,
      content: staticPost.content,
    };
  }
}

// Generate dynamic SEO metadata based on the blog post slug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Squito Pest Control",
    };
  }

  return {
    title: `${post.title} | Squito Blog`,
    description: post.seo_description,
    openGraph: {
      title: post.title,
      description: post.seo_description,
      type: "article",
      publishedTime: post.date,
      authors: ["Squito Pest Control"],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-24 relative bg-background">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      <article className="container mx-auto px-4 max-w-4xl relative z-10 animate-fade-in-up">
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Hero Image */}
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-10 border border-white/10">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>

        {/* Header */}
        <header className="mb-12 border-b border-white/10 pb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            {post.category}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-green-500" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-green-500" />
              {post.read_time}
            </div>
          </div>
        </header>

        {/* Content */}
        <div 
          className="max-w-none mb-16 text-white/80"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA Block */}
        <aside className="glass-card p-8 md:p-12 rounded-3xl border border-green-500/30 relative overflow-hidden text-center mt-24 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none" />
          <h3 className="text-3xl font-display font-bold text-white mb-4 relative z-10">Need Professional Assistance?</h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg relative z-10">
            Don&apos;t let pests ruin your peace of mind. Our experts are ready to protect your home with safe, guaranteed treatments.
          </p>
          <Link href="/plans" className="btn-primary inline-flex text-lg px-8 py-4 relative z-10">
            View Protection Plans
          </Link>
        </aside>
      </article>
    </main>
  );
}
