"use client";

import { useState, useRef, useEffect } from "react";
import { X, Camera, ShieldAlert, ArrowRight, AlertTriangle, Shield, ChevronRight } from "lucide-react";
import NextImage from "next/image";
import { PESTS, CATEGORIES, RISK_META, type Pest, type PestCategory } from "@/data/pests";

type AIResult =
  | { identified: true; pestName: string; riskLevel: string; season: string; description: string; confidence: string }
  | { identified: false; message: string };

const AI_RISK_META: Record<string, { dot: string; badge: string }> = {
  Critical: { dot: "bg-red-500",    badge: "bg-red-900/60 border-red-700/50 text-red-300" },
  High:     { dot: "bg-orange-500", badge: "bg-orange-900/60 border-orange-700/50 text-orange-300" },
  Medium:   { dot: "bg-yellow-400", badge: "bg-yellow-900/60 border-yellow-700/50 text-yellow-300" },
  Low:      { dot: "bg-sky-400",    badge: "bg-sky-900/60 border-sky-700/50 text-sky-300" },
};

export default function PestLibrary() {
  const [activeCategory, setActiveCategory] = useState<PestCategory | "All">("All");
  const [selected, setSelected] = useState<Pest | null>(null);
  const [scanning, setScanning] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayed = activeCategory === "All" ? PESTS : PESTS.filter(p => p.category === activeCategory);

  const modalOpen = !!selected || scanning || !!aiResult;
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && hash !== "pest-library") {
        const match = PESTS.find(p => p.slug === hash || p.name.toLowerCase().replace(/\s+/g, "-") === hash);
        if (match) setSelected(match);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Revoke the preview object URL whenever it changes to avoid memory leaks
  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    setAiResult(null);
    setScanning(true);
    try {
      const base64 = await compressAndEncode(file);
      const res = await fetch("/api/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await res.json();
      setAiResult(data.error ? { identified: false, message: data.error } : data);
    } catch {
      setAiResult({ identified: false, message: "Something went wrong. Try again or call (631) 203-1000!" });
    } finally {
      setScanning(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const compressAndEncode = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        const canvas = document.createElement("canvas");
        let w = img.width, h = img.height;
        const max = 512;
        if (w > h && w > max) { h = (h / w) * max; w = max; }
        else if (h > max) { w = (w / h) * max; h = max; }
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = (e) => { URL.revokeObjectURL(img.src); reject(e); };
      img.src = URL.createObjectURL(file);
    });

  const clearAiResult = () => { setAiResult(null); setPreviewUrl(null); };

  return (
    <div className="min-h-screen bg-surface" id="pest-library">
      {/* ── Page Header ── */}
      <div className="bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-10 md:py-14">
          <div className="flex flex-col items-center text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
              <Shield size={14} /> Long Island Pest Intelligence
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-3 text-white tracking-tight">
              Long Island{" "}
              <span className="gradient-text">Pest Library</span>
            </h1>
            <p className="text-white/60 max-w-xl text-sm md:text-base mb-6">
              The 28 most common species found on Long Island — we treat hundreds more. Tap any pest for our expert treatment profile.
            </p>

            {/* Snap & Identify */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="group relative overflow-hidden rounded-xl p-[1px] focus:outline-none mb-1"
            >
              <span
                className="absolute inset-0 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "conic-gradient(from var(--angle, 0deg), #22c55e, #16a34a, #15803d, #4ade80, #22c55e)",
                  animation: "spin-border 3s linear infinite",
                }}
              />
              <span className="relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface/90 backdrop-blur-xl font-semibold text-sm text-white transition-all duration-300 group-hover:bg-green-500/10 whitespace-nowrap">
                <Camera size={18} className="text-green-400" />
                Snap &amp; Identify Your Pest
              </span>
            </button>
            <p className="text-white/25 text-xs">Photos are processed securely and never stored.</p>

            <style>{`
              @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
              @keyframes spin-border { to { --angle: 360deg; } }
            `}</style>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-8">
        {/* ── Filter Tabs ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {(["All", ...CATEGORIES] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-green-500 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.35)]"
                  : "bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  {PESTS.filter(p => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Pest Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {displayed.map(pest => {
            const meta = RISK_META[pest.risk];
            return (
              <button
                key={pest.slug}
                onClick={() => setSelected(pest)}
                className="group relative rounded-xl overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl aspect-[2/3]"
              >
                <NextImage
                  src={pest.image}
                  alt={pest.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-all duration-500 group-hover:scale-105 brightness-90 saturate-[0.65] group-hover:brightness-100 group-hover:saturate-100"
                />
                <div className="absolute inset-0 mix-blend-multiply pointer-events-none" style={{ backgroundColor: "rgba(5,46,22,0.15)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5" />
                <div className={`absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm ${meta.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${meta.dot}`} />
                  {pest.risk}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-display font-bold text-white text-sm leading-tight mb-0.5">{pest.name}</h3>
                  <p className="text-white/45 text-[10px] italic truncate">{pest.scientificName}</p>
                </div>
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full p-1">
                    <ChevronRight size={12} className="text-white" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Count footer ── */}
        <p className="text-center text-white/30 text-xs mt-8">
          Showing {displayed.length} of {PESTS.length} pest species tracked on Long Island
        </p>
      </div>

      <input ref={fileInputRef} id="library-pest-camera" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      {/* ── Pest Detail Modal ── */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] bg-background/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up overflow-y-auto"
          onClick={e => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="bg-surface border border-border w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] my-auto">
            <div className="w-full md:w-2/5 h-56 md:h-auto shrink-0 border-b md:border-b-0 md:border-r border-border relative overflow-hidden">
              <NextImage src={selected.image} alt={selected.name} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 md:from-background/40 to-transparent" />
              <span className={`absolute top-4 left-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded border backdrop-blur-md ${RISK_META[selected.risk].badge}`}>
                <span className={`w-2 h-2 rounded-full shrink-0 ${RISK_META[selected.risk].dot}`} />
                {selected.risk}
              </span>
            </div>
            <div className="p-6 md:p-8 flex-1 overflow-y-auto">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white">{selected.name}</h3>
                  <p className="text-white/40 text-sm italic mt-0.5">{selected.scientificName}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-3 md:p-2 rounded-full transition-all shrink-0 ml-4">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-5 mt-5">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-1.5">Active Season</h4>
                  <p className="text-white/80 font-medium text-sm">{selected.season}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-1.5">Overview</h4>
                  <p className="text-white/70 leading-relaxed text-sm">{selected.overview}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-1.5">Danger to Your Family</h4>
                  <p className="text-white/70 leading-relaxed text-sm">{selected.dangerToFamily}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-2">Warning Signs</h4>
                  <ul className="space-y-1.5">
                    {selected.signs.map((sign, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 mt-1.5" />
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-2">Prevention Tips</h4>
                  <ul className="space-y-1.5">
                    {selected.preventionTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 mt-1.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-1.5">Life Cycle</h4>
                  <p className="text-white/70 leading-relaxed text-sm">{selected.lifeCycle}</p>
                </div>
                <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-1.5">⚡ Did You Know?</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{selected.funFact}</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <a href="/plans" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] text-sm w-full">
                  View Plans <ArrowRight size={16} />
                </a>
                <a href="/#contact" onClick={() => setSelected(null)} className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/5 border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 text-white font-semibold rounded-xl transition-all text-sm w-full">
                  Get Free Inspection
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── AI Identify Modal ── */}
      {(scanning || aiResult) && (
        <div
          className="fixed inset-0 z-[9999] bg-background/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up overflow-y-auto"
          onClick={e => !scanning && e.target === e.currentTarget && clearAiResult()}
        >
          <div className="bg-surface border border-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden my-auto">
            {previewUrl && (
              <div className="relative w-full h-48 sm:h-64 bg-black/40 overflow-hidden">
                <img src={previewUrl} alt="Pest photo" className="w-full h-full object-contain" />
                {scanning && (
                  <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-2 border-green-500/30 border-t-green-500 animate-spin" />
                      <Camera size={24} className="absolute inset-0 m-auto text-green-400" />
                    </div>
                    <p className="text-white font-display font-bold text-lg">Analyzing...</p>
                    <p className="text-white/50 text-sm">Squito AI is identifying your pest</p>
                  </div>
                )}
              </div>
            )}
            {aiResult && !scanning && (
              <div className="p-6">
                {aiResult.identified ? (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="text-2xl font-display font-bold text-white">{aiResult.pestName}</h3>
                          <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${(AI_RISK_META[aiResult.riskLevel] ?? AI_RISK_META.Low).badge}`}>
                            <span className={`w-2 h-2 rounded-full shrink-0 ${(AI_RISK_META[aiResult.riskLevel] ?? AI_RISK_META.Low).dot}`} />
                            {aiResult.riskLevel}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/50">
                          <ShieldAlert size={14} className="text-green-400" />
                          Confidence: {aiResult.confidence}
                        </div>
                      </div>
                      <button onClick={clearAiResult} className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all shrink-0">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-1">Active Season</h4>
                        <p className="text-white/70 text-sm">{aiResult.season}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-1">Expert Assessment</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{aiResult.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href="/plans" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all text-sm">
                        View Plans <ArrowRight size={16} />
                      </a>
                      <a href="/#contact" onClick={clearAiResult} className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 hover:border-green-500/50 text-white font-semibold rounded-xl transition-all text-sm">
                        Get Free Inspection
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
                      <AlertTriangle size={24} className="text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-2">Couldn&apos;t Identify</h3>
                    <p className="text-white/60 text-sm mb-5 max-w-sm mx-auto">{aiResult.message}</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button onClick={() => fileInputRef.current?.click()} className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl transition-all text-sm">
                        <Camera size={16} /> Try Again
                      </button>
                      <a href="tel:6312031000" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all text-sm">
                        Call (631) 203-1000
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
