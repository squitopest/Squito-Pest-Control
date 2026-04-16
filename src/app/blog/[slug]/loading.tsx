export default function BlogPostLoading() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="h-5 w-28 bg-white/5 rounded animate-pulse mb-8" />
        <div className="aspect-[21/9] rounded-2xl bg-white/5 animate-pulse mb-10" />
        <div className="space-y-5 mb-12">
          <div className="h-8 w-32 bg-white/5 rounded-full animate-pulse" />
          <div className="h-14 w-full bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-14 w-4/5 bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-5 w-56 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-6 w-full bg-white/5 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  );
}
