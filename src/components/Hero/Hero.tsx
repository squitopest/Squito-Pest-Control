"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle, Star, Phone, Camera, X, ShieldAlert, AlertTriangle, Loader2, Upload } from "lucide-react";

const rotatingWords = ["Mosquitoes", "Termites", "Rodents", "Bed Bugs", "Cockroaches", "Spiders"];
const YOUTUBE_VIDEO_ID = "ouaGJXqUaXc";

// Risk level color mapping
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

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  
  // AI Pest Identifier State
  const [scanning, setScanning] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % rotatingWords.length);
        setAnimating(false);
      }, 400);
    }, 2800);

    const videoTimer = setTimeout(() => setVideoReady(true), 100);

    return () => {
      clearInterval(wordInterval);
      clearTimeout(videoTimer);
    };
  }, []);

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
      if (uploadInputRef.current) uploadInputRef.current.value = "";
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
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-32 lg:pt-24 pb-12 overflow-hidden" id="hero">
      
      {/* Background Video — deferred for better LCP */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[50%] left-[50%] w-[100vw] h-[100vw] lg:w-[100vw] lg:h-[56.25vw] -translate-x-1/2 -translate-y-1/2 min-h-screen min-w-[177.77vh]">
          {videoReady && (
            <iframe
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&iv_load_policy=3&enablejsapi=1`}
              allow="autoplay; encrypted-media"
              title="Background video"
            />
          )}
        </div>
        {/* Dark Overlays (Lightened at user request) */}
        <div className="absolute inset-0 bg-background/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background/100 z-10" />
      </div>

      <div className="container relative z-20 mx-auto px-4 lg:px-8 max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start gap-6 w-full animate-fade-in-up">
          
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
            <span className="text-sm font-medium text-white/90">5-Star Rated on Long Island</span>
          </div>

          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight">
            <span className="block text-white">Smart. Safe.</span>
            <span className="block gradient-text">Pest Control.</span>
          </h1>

          <div className="text-xl md:text-3xl font-display font-semibold text-white/90 flex items-center flex-wrap">
            <span>We eliminate&nbsp;</span>
            <span className="relative inline-block w-[160px] md:w-[220px] h-[36px] md:h-[40px] overflow-hidden">
              <span 
                className={`absolute left-0 top-0 text-green-400 transform transition-all duration-400 ${
                  animating ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
                }`}
              >
                {rotatingWords[wordIndex]}
              </span>
            </span>
          </div>

          <p className="text-lg text-white/70 max-w-xl leading-relaxed">
            No contracts. No shortcuts. Just results.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <a 
              href="/plans" 
              className="relative overflow-hidden inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] group w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2 shadow-sm">
                Get Protected <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 h-full w-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]" />
            </a>
            <div className="flex w-full sm:w-auto gap-2">
              <button
                className="group relative overflow-hidden flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-[14px] rounded-full border border-white/20 bg-white/5 text-white font-display font-semibold hover:bg-green-500/10 hover:border-green-500/50 transition-all backdrop-blur-md"
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                <Camera size={18} className="relative z-10 text-green-400" />
                <span className="relative z-10">Snap Photo</span>
              </button>
              
              <button
                className="group relative overflow-hidden flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-[14px] rounded-full border border-white/20 bg-white/5 text-white font-display font-semibold hover:bg-green-500/10 hover:border-green-500/50 transition-all backdrop-blur-md"
                onClick={() => uploadInputRef.current?.click()}
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                <Upload size={18} className="relative z-10 text-green-400" />
                <span className="relative z-10">Upload</span>
              </button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
              id="hero-pest-camera"
            />
            <input
              ref={uploadInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="hero-pest-upload"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6">
            {["No contracts", "100% satisfaction", "Pet & kid safe"].map((text) => (
              <div key={text} className="flex items-center gap-2 text-sm font-medium text-white/80">
                <CheckCircle size={16} className="text-green-500" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right Stats Card */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <div className="glass-card p-5 md:p-8 rounded-2xl w-full max-w-md animate-fade-in-up shadow-2xl border-green-500/20" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)] animate-pulse" />
              <span className="font-semibold text-white/90">Live Protection Active</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
              {[
                { num: "1,000+", label: "Homes Protected" },
                { num: "Same Day", label: "Service Available" },
                { num: "6+ Years", label: "Local Experience" },
                { num: "5.0 ★", label: "Average Rating" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xl md:text-2xl font-display font-bold text-white mb-1">{stat.num}</span>
                  <span className="text-xs md:text-sm text-green-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>

            <a 
              href="tel:6312031000" 
              className="group relative flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-green-500/10 border border-green-500/30 overflow-hidden transition-all duration-500 hover:border-green-500/80 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
            >
              {/* Animated shimmer */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <div className="relative z-10 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                <Phone size={16} className="text-green-400 group-hover:text-white transition-colors" />
              </div>
              <div className="relative z-10 flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-widest text-green-500/70 font-semibold leading-none mb-0.5">Call Now</span>
                <span className="text-lg font-display font-bold text-white tracking-wide">(631) 203-1000</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* AI Result Modal Overlay */}
      {(scanning || aiResult) && (
        <div 
          className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up overflow-y-auto"
          onClick={e => !scanning && e.target === e.currentTarget && clearAiResult()}
        >
          <div className="bg-surface border border-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden my-auto">
            {/* Image Preview + Scanning Overlay */}
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

            {/* Result Card */}
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
                      <button onClick={() => uploadInputRef.current?.click()} className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 hover:border-green-500/50 text-white font-semibold rounded-xl transition-all text-sm">
                        <Upload size={16} /> Upload Another
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
    </section>
  );
}
