export default function BlogLoading() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <div className="h-8 w-36 mx-auto rounded-full bg-white/5 animate-pulse mb-6" />
          <div className="h-14 w-full max-w-xl mx-auto rounded-2xl bg-white/5 animate-pulse mb-6" />
          <div className="h-6 w-full max-w-2xl mx-auto rounded-xl bg-white/5 animate-pulse" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="glass-card rounded-3xl overflow-hidden border border-white/5">
              <div className="aspect-[16/9] bg-white/5 animate-pulse" />
              <div className="p-8 space-y-4">
                <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
                <div className="h-8 w-full bg-white/5 rounded animate-pulse" />
                <div className="h-8 w-4/5 bg-white/5 rounded animate-pulse" />
                <div className="h-20 w-full bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
