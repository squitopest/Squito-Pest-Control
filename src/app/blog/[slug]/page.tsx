import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

// Generate dynamic SEO metadata based on the blog post slug
export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Squito Pest Control",
    };
  }

  return {
    title: `${post.title} | Squito Blog`,
    description: post.seoDescription,
    openGraph: {
      title: post.title,
      description: post.seoDescription,
      type: "article",
      publishedTime: post.date,
      authors: ["Squito Pest Control"],
    },
  };
}

export default function BlogPost({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

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

        {/* Header */}
        <header className="mb-12 border-b border-white/10 pb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            <span>{post.icon}</span> {post.category}
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
              {post.readTime}
            </div>
            <button className="flex items-center gap-2 hover:text-white transition-colors ml-auto sm:ml-0">
              <Share2 size={16} />
              Share
            </button>
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
            Don't let pests ruin your peace of mind. Our experts are ready to protect your home with safe, guaranteed treatments.
          </p>
          <Link href="/plans" className="btn-primary inline-flex text-lg px-8 py-4 relative z-10">
            View Protection Plans
          </Link>
        </aside>
      </article>
    </main>
  );
}
