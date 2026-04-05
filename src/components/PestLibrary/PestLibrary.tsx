"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, Camera, ShieldAlert, ArrowRight, AlertTriangle } from "lucide-react";

const pests = [
  { image: "/pests/pest_mosquito.png", name: "Mosquitoes", risk: "High", season: "Late Spring to Early Fall (Peaking July & August)", tip: "Mosquitoes thrive in warm, humid weather and breed rapidly in stagnant water. Female mosquitoes require a blood meal to produce eggs, making your backyard a prime hunting ground. Our approach focuses on disrupting their breeding cycle by eliminating standing water and applying specialized barrier sprays to surrounding foliage where they rest during the heat of the day." },
  { image: "/pests/pest_termite.png", name: "Termites", risk: "Critical", season: "Spring/Summer Swarming Season (Silent structural damage year-round)", tip: "Termites cause billions in property damage annually, silently eating the structural wood of your home from the inside out. By the time you notice them, the damage is often severe. We deploy industry-leading baiting systems around your property's perimeter. This approach safely eliminates the entire subterranean colony directly at its source, protecting your biggest investment." },
  { image: "/pests/pest_cockroach.png", name: "Cockroaches", risk: "High", season: "Year-Round (Highly active indoors during winter)", tip: "Cockroaches are highly resilient scavengers that contaminate food and spread harmful bacteria. Because they prefer dark, damp environments like basements and kitchens, they are incredibly difficult to eradicate with over-the-counter products. We utilize advanced baiting matrices and targeted crack-and-crevice treatments to eliminate both the visible roaches and the hidden nests behind your walls." },
  { image: "/pests/pest_bedbug.png", name: "Bed Bugs", risk: "High", season: "Year-Round (Spikes during summer travel seasons)", tip: "Bed bugs are master hitchhikers that feed exclusively on human blood while you sleep. They hide effortlessly in mattress seams, baseboards, and electrical outlets. Traditional sprays are notoriously ineffective against them. We deploy rigorous, heat-based treatments and specialized chemical applications that penetrate their hiding spots, ensuring complete eradication without destroying your furniture." },
  { image: "/pests/pest_rat.png", name: "Rats", risk: "High", season: "Year-Round (Invasions peak heavily in late Fall and Winter)", tip: "Rats are highly intelligent, destructive rodents that gnaw through wires, insulation, and drywall to build nests when temperatures drop outside. They carry severe diseases and reproduce astonishingly fast. Our eradication protocol involves comprehensive structural exclusion to seal entry points, paired with strategic, tamper-resistant bait stations to completely clear the local population." },
  { image: "/pests/pest_wasp.png", name: "Stinging Pests", risk: "Medium", season: "Late Summer to Early Fall", tip: "As summer ends, wasp, hornet, and yellowjacket colonies reach maximum size and become highly aggressive. Attempting to remove a nest without professional equipment can result in severe, dangerous swarming. Our technicians safely neutralize active, high-elevation nests and utilize preventative treatments along rooflines to stop all stinging insects from returning the following year." },
  { image: "/pests/pest_mouse.png", name: "Mice", risk: "High", season: "Fall through Winter (Seeking shelter as temperatures drop)", tip: "House mice can squeeze through holes the size of a dime. While smaller than rats, they contaminate surfaces with urine and droppings constantly as they forage. We focus on a multi-pronged approach: identifying and sealing micro-entry points around your foundation, and employing strategic interior trapping to eliminate the active population without using harmful broadcast poisons indoors." },
  { image: "/pests/pest_ant.png", name: "Ants", risk: "Medium", season: "Early Spring through Fall", tip: "Ants live in massive colonies often hidden deep underground or within wall voids. Spraying visible ants only kills a tiny fraction of the problem and often causes the colony to split. We use highly attractive horizontal transfer baits—ants carry this bait back to the nest, feeding it to the queen, which permanently destroys the entire colony from the inside out." },
  { image: "/pests/pest_tick.png", name: "Ticks", risk: "High", season: "Early Spring through Late Fall", tip: "Ticks are dangerous parasites known for transmitting Lyme disease and Rocky Mountain spotted fever. They wait in tall grass and low brush, latching onto passing humans and pets. Our local control program involves specialized yard barrier sprays that drastically reduce tick populations by up to 90%, creating a safe, protected zone around your property boundaries." },
  { image: "/pests/pest_spider.png", name: "Spiders", risk: "Medium", season: "Late Summer through Fall", tip: "As the weather cools, spiders move indoors seeking warmth and prey. While most house spiders are harmless, their webs are an unsightly nuisance and can indicate the presence of other insect populations they feed on. We clear existing webs and apply a protective perimeter barrier treatment to deter them from building new webs around your windows, eaves, and foundation." },
  { image: "/pests/pest_lanternfly.png", name: "Lanternflies", risk: "High", season: "Late Summer through First Frost", tip: "The Spotted Lanternfly is a highly destructive, invasive species that decimates local trees and crops by aggressively feeding on plant sap. They also excrete a sticky residue that causes dangerous mold growth on bark. We combat them by physically removing egg masses and applying targeted systemic tree treatments or direct-contact sprays depending on the severity of the infestation." },
  { image: "/pests/pest_flea.png", name: "Fleas", risk: "Medium", season: "Spring through Fall (Can survive indoors year-round)", tip: "Fleas typically enter your home via pets or wild yard animals, rapidly reproducing in carpets, bedding, and upholstery. Their bites cause severe itching and can transmit tapeworms. Complete eradication requires a simultaneous, coordinated approach: treating your pets, deep-cleaning the interior, and applying specialized yard treatments to break their life cycle permanently." },
];

const riskColors: Record<string, string> = {
  Low: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  High: "text-orange-400 bg-orange-500/10 border-orange-500/30",
  Critical: "text-red-400 bg-red-500/10 border-red-500/30",
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
  const [search, setSearch] = useState("");
  const [scanning, setScanning] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = pests.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Lock body scroll when modal is open
  const modalOpen = scanning || !!aiResult;
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
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setAiResult(null);
    setScanning(true);
    try {
      const base64 = await compressAndEncode(file);
      const response = await fetch("/api/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await response.json();
      if (data.error) {
        setAiResult({ identified: false, message: data.error });
      } else {
        setAiResult(data);
      }
    } catch {
      setAiResult({ identified: false, message: "Something went wrong. Please try again or call us at (631) 203-1000!" });
    } finally {
      setScanning(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const compressAndEncode = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 512;
        let w = img.width, h = img.height;
        if (w > h && w > maxDim) { h = (h / w) * maxDim; w = maxDim; }
        else if (h > maxDim) { w = (w / h) * maxDim; h = maxDim; }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const clearAiResult = () => {
    setAiResult(null);
    setPreviewUrl(null);
  };

  return (
    <section className="py-16 md:py-24 bg-surface" id="pest-library">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            🔍 Pest Library
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">
            What&apos;s Bugging You?{" "}
            <span className="gradient-text">Find Your Pest</span>
          </h2>
          <p className="text-white/70 max-w-2xl text-lg mb-8">
            Click on any pest below, or snap a photo to instantly identify what you&apos;re dealing with.
          </p>

          {/* Search + Camera Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg">
            <div className="relative w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search for a pest..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 outline-none transition-colors"
                id="pest-search"
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="group relative w-full sm:w-auto shrink-0 overflow-hidden rounded-xl p-[1px] focus:outline-none"
            >
              <span
                className="absolute inset-0 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "conic-gradient(from var(--angle, 0deg), #22c55e, #16a34a, #15803d, #4ade80, #22c55e)",
                  animation: "spin-border 3s linear infinite",
                }}
              />
              <span className="relative flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-surface/90 backdrop-blur-xl font-semibold text-sm text-white transition-all duration-300 group-hover:bg-green-500/10 whitespace-nowrap">
                <Camera size={18} className="text-green-400" />
                Snap &amp; Identify
              </span>
              <style>{`
                @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
                @keyframes spin-border { to { --angle: 360deg; } }
              `}</style>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
              id="library-pest-camera"
            />
          </div>
          <p className="text-white/30 text-xs mt-3">📷 Photos are processed securely and never stored.</p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filtered.map((pest, i) => (
              <button
                key={i}
                className={`relative aspect-square rounded-xl overflow-hidden bg-cover bg-center border transition-all duration-300 group ${
                  selected?.name === pest.name ? "border-green-500 ring-2 ring-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)] scale-105 z-10" : "border-border hover:border-white/20 hover:scale-105"
                }`}
                onClick={() => setSelected(selected?.name === pest.name ? null : pest)}
                style={{ backgroundImage: `url(${pest.image})` }}
                aria-label={`Select ${pest.name}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity ${selected?.name === pest.name ? 'opacity-90' : 'opacity-70 group-hover:opacity-40'}`} />
                <span className="absolute bottom-3 left-0 w-full text-center font-display font-semibold text-white/90 text-sm">
                  {pest.name}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-card rounded-2xl max-w-2xl mx-auto border-dashed border-border">
            <h3 className="text-xl font-bold text-white mb-2">Pest not found?</h3>
            <p className="text-white/60 mb-6 px-6">Don&apos;t worry, if it&apos;s bugging you, we most likely cover it! We handle dozens of specific unlisted pest variants across Long Island.</p>
            <a href="#contact" className="btn-primary">
              Contact Us for a Custom Quote
            </a>
          </div>
        )}

        {/* Pest Info panel */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-card w-full max-w-3xl rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh]">
              <div 
                className="w-full md:w-2/5 h-48 md:h-auto bg-cover bg-center shrink-0 border-b md:border-b-0 md:border-r border-border relative"
                style={{ backgroundImage: `url(${selected.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 md:hidden to-transparent" />
              </div>
              <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-display font-bold text-white">{selected.name}</h3>
                  <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-3 md:p-2 rounded-full transition-all mt-[-10px] mr-[-10px] md:m-0">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-green-400 mb-2">Active Season</h4>
                    <p className="text-white/80">{selected.season}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-green-400 mb-2">Behavior & Treatment</h4>
                    <p className="text-white/70 leading-relaxed text-sm md:text-base">{selected.tip}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                  <a href="#contact" className="btn-primary w-full sm:w-auto justify-center">
                    Get Treatment for {selected.name}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Result Modal */}
        {(scanning || aiResult) && (
          <div 
            className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up overflow-y-auto"
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
                      <div className="text-center">
                        <p className="text-white font-display font-bold text-lg">Analyzing...</p>
                        <p className="text-white/50 text-sm">Squito AI is identifying your pest</p>
                      </div>
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
                            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${riskColors[aiResult.riskLevel] || riskColors.Medium}`}>
                              {aiResult.riskLevel} Risk
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
                        <a href="/plans" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] text-sm">
                          View Protection Plans <ArrowRight size={16} />
                        </a>
                        <a href="#contact" onClick={clearAiResult} className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 text-white font-semibold rounded-xl transition-all text-sm">
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
                        <button onClick={() => fileInputRef.current?.click()} className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 hover:border-green-500/50 text-white font-semibold rounded-xl transition-all text-sm">
                          <Camera size={16} /> Try Another Photo
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

        <div className="text-center mt-12 text-white/50 text-sm">
          And much more... <a href="#contact" className="text-green-400 hover:text-green-300 font-medium">Call today!</a>
        </div>
      </div>
    </section>
  );
}
