"use client";

import { useState, useRef, useEffect } from "react";
import { X, Camera, ShieldAlert, ArrowRight, AlertTriangle, Phone, Shield } from "lucide-react";

// ─── EXPANDED LONG ISLAND PEST DATABASE ───
const pests = [
  // Row 1
  { image: "/pests/pest_mosquito.png", name: "Mosquitoes", risk: "High", season: "June – September", tip: "Mosquitoes thrive in Long Island's humid coastal summers, breeding rapidly in any stagnant water. Carriers of West Nile Virus and EEE. Our professional barrier treatments target foliage where adults rest, cutting populations dramatically." },
  { image: "/pests/pest_tick.png", name: "Ticks", risk: "High", season: "April – November", tip: "Long Island is one of the highest Lyme disease risk zones in the US. Deer ticks hide in leaf litter and tall grass, latching onto humans and pets. Our perimeter yard treatments reduce tick populations by up to 90%." },
  { image: "/pests/pest_termite.png", name: "Termites", risk: "Critical", season: "Year-Round", tip: "Long Island's sandy glacial soil is perfect for Eastern Subterranean Termites. They silently destroy structural wood from the inside out, causing billions in damage annually. We deploy advanced baiting systems to eliminate entire colonies at the source." },
  { image: "/pests/pest_cockroach.png", name: "Cockroaches", risk: "High", season: "Year-Round", tip: "German cockroaches are the most common indoor pest on Long Island, producing up to 400 offspring per female. They contaminate food and spread harmful bacteria. Our targeted crack-and-crevice treatments eliminate both visible roaches and hidden nests." },
  { image: "/pests/pest_bedbug.png", name: "Bed Bugs", risk: "High", season: "Year-Round", tip: "Bed bugs hitchhike via luggage and used furniture, hiding in mattress seams and baseboards. Traditional sprays are notoriously ineffective. We deploy specialized heat-based treatments for complete eradication." },
  { image: "/pests/pest_rat.png", name: "Rats", risk: "High", season: "Oct – Feb Peak", tip: "Norway rats dominate Long Island, gnawing through wires and drywall while carrying leptospirosis and salmonella. Our eradication protocol combines structural exclusion with strategic, tamper-resistant bait stations." },
  { image: "/pests/pest_wasp.png", name: "Wasps & Hornets", risk: "High", season: "July – October", tip: "Eastern Yellowjackets and Bald-faced Hornets reach maximum colony size in late summer and become hyper-aggressive. Our technicians safely neutralize nests and apply preventative treatments to rooflines and eaves." },
  { image: "/pests/pest_ant.png", name: "Ants", risk: "Medium", season: "March – October", tip: "Pavement ants and odorous house ants invade Long Island homes by the thousands. Spraying visible ants only kills a fraction. Our strategic baits are carried back to the queen, destroying the entire colony from within." },
  { image: "/pests/pest_lanternfly.png", name: "Lanternflies", risk: "High", season: "July – First Frost", tip: "The invasive Spotted Lanternfly is now established on Long Island, decimating trees and crops. They excrete honeydew causing dangerous mold growth. We remove egg masses and apply professional tree treatments." },
  // Row 2
  { image: "/pests/pest_mouse.png", name: "Mice", risk: "High", season: "Oct – March", tip: "House mice squeeze through gaps as small as a dime. White-footed mice on Long Island are also Lyme disease reservoirs. We seal micro-entry points and deploy strategic interior trapping without harmful broadcast poisons." },
  { image: "/pests/pest_spider.png", name: "Spiders", risk: "Medium", season: "Aug – November", tip: "Wolf spiders and yellow sac spiders are common on Long Island — brown recluses are NOT native here. We clear existing webs and apply a protective perimeter barrier to keep them from returning." },
  { image: "/pests/pest_flea.png", name: "Fleas", risk: "Medium", season: "May – October", tip: "Cat fleas enter Long Island homes via pets or wildlife like raccoons and feral cats. They reproduce explosively in carpets and upholstery. We coordinate comprehensive interior and exterior treatments to permanently break the life cycle." },
  { image: "/pests/pest_carpenter_ant.png", name: "Carpenter Ants", risk: "High", season: "March – October", tip: "Carpenter ants are especially destructive on Long Island, excavating galleries in moisture-damaged wood. Unlike termites, they don't eat wood — they hollow it out for nesting. Our specialized treatments target the satellite colonies and the main nest." },
  { image: "/pests/pest_stinkbug.png", name: "Stink Bugs", risk: "Medium", season: "Sept – November", tip: "Brown Marmorated Stink Bugs invade Long Island homes by the hundreds each fall, overwintering in wall voids and attics. We apply exterior perimeter treatments in early fall before they enter your home." },
  { image: "/pests/pest_silverfish.png", name: "Silverfish", risk: "Low", season: "Year-Round", tip: "Silverfish thrive in humid Long Island basements and bathrooms, feeding on paper, glue, and textiles. We use targeted professional treatments in wall voids combined with dehumidification strategies." },
  { image: "/pests/pest_centipede.png", name: "Centipedes", risk: "Low", season: "Spring – Fall", tip: "House centipedes are common in Long Island basements. While actually beneficial — they eat other pests — their alarming appearance sends most homeowners running. We reduce moisture and treat perimeter entry points." },
  { image: "/pests/pest_earwig.png", name: "Earwigs", risk: "Low", season: "June – August", tip: "European earwigs are attracted to moisture and mulch around Long Island home foundations. Despite the myth, they don't crawl into ears. We treat mulch beds, foundation perimeters, and entry points." },
  { image: "/pests/pest_cricket.png", name: "Camel Crickets", risk: "Low", season: "Late Summer – Fall", tip: "Camel crickets thrive in damp Long Island basements and crawl spaces. They don't chirp like house crickets, but they jump erratically when disturbed. We use perimeter treatments and address moisture issues." },
];

const row1 = pests.slice(0, 9);
const row2 = pests.slice(9);

const riskColors: Record<string, { badge: string; glow: string }> = {
  Low: { badge: "text-blue-400 bg-blue-500/15 border-blue-500/30", glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.25)]" },
  Medium: { badge: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30", glow: "group-hover:shadow-[0_0_30px_rgba(250,204,21,0.25)]" },
  High: { badge: "text-orange-400 bg-orange-500/15 border-orange-500/30", glow: "group-hover:shadow-[0_0_30px_rgba(251,146,60,0.25)]" },
  Critical: { badge: "text-red-400 bg-red-500/15 border-red-500/30", glow: "group-hover:shadow-[0_0_30px_rgba(248,113,113,0.25)]" },
};

type AIResult = {
  identified: true;
  pestName: string;
  riskLevel: string;
  season: string;
  description: string;
  confidence: string;
} | {
  identified: false;
  message: string;
};

export default function PestLibrary() {
  const [selected, setSelected] = useState<(typeof pests)[0] | null>(null);
  const [scanning, setScanning] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modalOpen = !!selected || scanning || !!aiResult;
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    setAiResult(null);
    setScanning(true);
    try {
      const base64 = await compressAndEncode(file);
      const res = await fetch("/api/identify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: base64 }) });
      const data = await res.json();
      setAiResult(data.error ? { identified: false, message: data.error } : data);
    } catch {
      setAiResult({ identified: false, message: "Something went wrong. Try again or call (631) 203-1000!" });
    } finally {
      setScanning(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const compressAndEncode = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let w = img.width, h = img.height;
      const max = 512;
      if (w > h && w > max) { h = (h / w) * max; w = max; }
      else if (h > max) { w = (w / h) * max; h = max; }
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });

  const clearAiResult = () => { setAiResult(null); setPreviewUrl(null); };

  const PestCard = ({ pest, idx }: { pest: typeof pests[0]; idx: number }) => {
    const colors = riskColors[pest.risk] || riskColors.Medium;
    return (
      <button
        key={idx}
        onClick={() => setSelected(pest)}
        className={`group relative shrink-0 snap-start w-[130px] sm:w-[240px] h-[170px] sm:h-[320px] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-green-500/50 ${colors.glow}`}
      >
        <img src={pest.image} alt={pest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <span className={`absolute top-2 sm:top-3 right-2 sm:right-3 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-2.5 py-[3px] sm:py-1 rounded-full border backdrop-blur-md ${colors.badge}`}>
          {pest.risk}
        </span>
        {/* Name + Season */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4">
          <h3 className="font-display font-bold text-white text-sm sm:text-lg leading-tight mb-0.5 sm:mb-1 drop-shadow-lg">{pest.name}</h3>
          <p className="text-white/50 text-[9px] sm:text-xs font-medium">📅 {pest.season}</p>
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Learn More →
          </span>
        </div>
      </button>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-surface overflow-hidden" id="pest-library">
      {/* Header */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            <Shield size={14} /> Pest Intelligence Database
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white tracking-tight">
            If you see pests,{" "}
            <span className="gradient-text">let Squito do the rest!</span>
          </h2>
          <p className="text-white/60 max-w-2xl text-lg mb-8">
            {pests.length} pests identified across Long Island. Tap any threat to see our expert treatment profile.
          </p>
          {/* Snap & Identify */}
          <div className="flex flex-col sm:flex-row gap-3 mb-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="group relative overflow-hidden rounded-xl p-[1px] focus:outline-none"
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
                Snap Photo
              </span>
            </button>

            <style>{`
              @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
              @keyframes spin-border { to { --angle: 360deg; } }
            `}</style>
          </div>
          <p className="text-white/25 text-xs">Photos are processed securely and never stored.</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="library-pest-camera" />
        </div>
      </div>

      {/* ─── SCROLLING ROW 1 (Left) ─── */}
      <div className="relative mb-4 w-full overflow-x-auto overflow-y-hidden hide-scrollbar snap-x cursor-grab active:cursor-grabbing">
        <div className="flex gap-3 sm:gap-4 w-max animate-marquee-left hover:[animation-play-state:paused] active:[animation-play-state:paused]">
          {[...row1, ...row1, ...row1].map((pest, i) => <PestCard pest={pest} idx={i} key={`r1-${i}`} />)}
        </div>
      </div>

      {/* ─── SCROLLING ROW 2 (Right) ─── */}
      <div className="relative w-full overflow-x-auto overflow-y-hidden hide-scrollbar snap-x cursor-grab active:cursor-grabbing">
        <div className="flex gap-3 sm:gap-4 w-max animate-marquee-right hover:[animation-play-state:paused] active:[animation-play-state:paused]">
          {[...row2, ...row2, ...row2].map((pest, i) => <PestCard pest={pest} idx={i} key={`r2-${i}`} />)}
        </div>
      </div>

      {/* Edge fade gradients */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left { animation: marquee-left 15s linear infinite; }
        .animate-marquee-right { animation: marquee-right 15s linear infinite; }
        @media (min-width: 640px) {
          .animate-marquee-left { animation: marquee-left 35s linear infinite; }
          .animate-marquee-right { animation: marquee-right 35s linear infinite; }
        }
      `}</style>

      {/* Bottom CTA */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl mt-12">
        <div className="text-center glass-card rounded-2xl p-8 md:p-12 border border-green-500/10 bg-gradient-to-r from-green-500/5 via-transparent to-emerald-500/5">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">Don&apos;t See Your Pest?</h3>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">We handle dozens of additional pest species across Nassau and Suffolk County. If it&apos;s bugging you, we&apos;ve got the solution.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="relative overflow-hidden inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] group">
              <span className="relative z-10 flex items-center gap-2">Get Free Inspection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
            </a>
            <a href="tel:6312031000" className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold text-sm hover:border-green-500/50 hover:bg-green-500/5 transition-all">
              <Phone size={16} className="text-green-400" />
              Call (631) 203-1000
            </a>
          </div>
        </div>
      </div>

      {/* ─── PEST DETAIL MODAL ─── */}
      {selected && (
        <div className="fixed inset-0 z-[9999] bg-background/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up overflow-y-auto" onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="bg-surface border border-border w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] my-auto">
            <div className="w-full md:w-2/5 h-56 md:h-auto bg-cover bg-center shrink-0 border-b md:border-b-0 md:border-r border-border relative" style={{ backgroundImage: `url(${selected.image})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 md:from-background/40 to-transparent" />
              <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border backdrop-blur-md ${(riskColors[selected.risk] || riskColors.Medium).badge}`}>
                {selected.risk} Risk
              </span>
            </div>
            <div className="p-6 md:p-8 flex-1 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-display font-bold text-white">{selected.name}</h3>
                <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-3 md:p-2 rounded-full transition-all shrink-0">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-1.5">📅 Active Season on Long Island</h4>
                  <p className="text-white/80 font-medium">{selected.season}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-1.5">🔬 Expert Treatment Profile</h4>
                  <p className="text-white/70 leading-relaxed text-sm md:text-base">{selected.tip}</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <a href="/plans" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] text-sm w-full sm:w-auto">
                  View Plans <ArrowRight size={16} />
                </a>
                <a href="#contact" onClick={() => setSelected(null)} className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/5 border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 text-white font-semibold rounded-xl transition-all text-sm w-full sm:w-auto">
                  Get Free Inspection
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── AI RESULT MODAL ─── */}
      {(scanning || aiResult) && (
        <div className="fixed inset-0 z-[9999] bg-background/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up overflow-y-auto" onClick={e => !scanning && e.target === e.currentTarget && clearAiResult()}>
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
                    <p className="text-white/50 text-sm">Squito Pest Control is identifying your pest</p>
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
                          <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${(riskColors[aiResult.riskLevel] || riskColors.Medium).badge}`}>
                            {aiResult.riskLevel} Risk
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/50">
                          <ShieldAlert size={14} className="text-green-400" />
                          Confidence: {aiResult.confidence}
                        </div>
                      </div>
                      <button onClick={clearAiResult} className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all shrink-0"><X size={16} /></button>
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
                      <a href="/plans" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all text-sm">View Plans <ArrowRight size={16} /></a>
                      <a href="#contact" onClick={clearAiResult} className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 hover:border-green-500/50 text-white font-semibold rounded-xl transition-all text-sm">Get Free Inspection</a>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center"><AlertTriangle size={24} className="text-yellow-400" /></div>
                    <h3 className="text-xl font-display font-bold text-white mb-2">Couldn&apos;t Identify</h3>
                    <p className="text-white/60 text-sm mb-5 max-w-sm mx-auto">{aiResult.message}</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button onClick={() => fileInputRef.current?.click()} className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl transition-all text-sm"><Camera size={16} /> Try Again</button>
                      <a href="tel:6312031000" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all text-sm">Call (631) 203-1000</a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
