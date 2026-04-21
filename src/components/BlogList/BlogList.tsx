"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  read_time: string;
  image: string;
};

export default function BlogList({ posts }: { posts: Post[] }) {
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border cursor-pointer ${
              active === cat
                ? "bg-green-500 text-white border-green-500 shadow-[0_0_16px_rgba(34,197,94,0.4)]"
                : "bg-white/5 text-white/70 border-white/15 hover:border-green-500/50 hover:text-white hover:bg-green-500/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-fade-in-up">
        {filtered.map((post, index) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="group glass-card rounded-3xl border border-border hover:border-green-500/50 transition-all overflow-hidden flex flex-col h-full cursor-pointer relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            <div className="aspect-[16/9] bg-surface relative overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={70}
                priority={index === 0}
                className="object-cover group-hover:scale-110 transition-transform duration-500 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md border border-border text-xs text-white px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                {post.category}
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center justify-between text-sm text-white/50 mb-4">
                <span>{post.date}</span>
                <span>{post.read_time}</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-green-400 transition-colors leading-tight">
                {post.title}
              </h2>
              <p className="text-white/70 mb-6 flex-grow line-clamp-3">{post.excerpt}</p>
              <div className="text-green-400 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                Read Article <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
