import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export const metadata = {
  title: "Blog | Squito Pest Control",
  description: "Expert pest control advice, seasonal tips, and guides for Long Island residents.",
};

export default function BlogPage() {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
           {blogPosts.map((post) => (
             <Link href={`/blog/${post.slug}`} key={post.slug} className="group glass-card rounded-3xl border border-border hover:border-green-500/50 transition-all overflow-hidden flex flex-col h-full cursor-pointer relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <div className="aspect-[16/9] bg-surface relative overflow-hidden">
                   <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 will-change-transform" />
                   <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                   <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md border border-border text-xs text-white px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                      {post.category}
                   </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                   <div className="flex items-center justify-between text-sm text-white/50 mb-4">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                   </div>
                   <h2 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-green-400 transition-colors leading-tight">
                      {post.title}
                   </h2>
                   <p className="text-white/70 mb-6 flex-grow line-clamp-3">
                      {post.excerpt}
                   </p>
                   <div className="text-green-400 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                      Read Article <ArrowRight size={18} />
                   </div>
                </div>
             </Link>
           ))}
        </div>

        <div className="text-center">
           <button className="px-8 py-3 rounded-full border border-border text-white hover:bg-white/5 transition-colors font-semibold">
              Load More Posts
           </button>
        </div>
      </div>
    </main>
  );
}
