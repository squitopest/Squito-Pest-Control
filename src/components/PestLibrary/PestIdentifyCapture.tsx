"use client";

import {
  useCallback,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { X, Camera, ShieldAlert, ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useModalDismiss } from "@/lib/useModalDismiss";

type AIResult =
  | { identified: true; pestName: string; riskLevel: string; season: string; description: string; confidence: string }
  | { identified: false; message: string };

const AI_RISK_META: Record<string, { dot: string; badge: string }> = {
  Critical: { dot: "bg-red-500", badge: "bg-red-900/60 border-red-700/50 text-red-300" },
  High: { dot: "bg-orange-500", badge: "bg-orange-900/60 border-orange-700/50 text-orange-300" },
  Medium: { dot: "bg-yellow-400", badge: "bg-yellow-900/60 border-yellow-700/50 text-yellow-300" },
  Low: { dot: "bg-sky-400", badge: "bg-sky-900/60 border-sky-700/50 text-sky-300" },
};

function compressAndEncode(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      const canvas = document.createElement("canvas");
      let w = img.width;
      let h = img.height;
      const max = 512;
      if (w > h && w > max) {
        h = (h / w) * max;
        w = max;
      } else if (h > max) {
        w = (w / h) * max;
        h = max;
      }
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(img.src);
      reject(e);
    };
    img.src = URL.createObjectURL(file);
  });
}

export type PestIdentifyCaptureHandle = {
  openFilePicker: () => void;
};

/**
 * Hidden file input + AI identify modal. Renders id="library-pest-camera" so Hero and
 * other CTAs can trigger it via getElementById or ref.
 */
const PestIdentifyCapture = forwardRef<PestIdentifyCaptureHandle>(function PestIdentifyCapture(
  _props,
  ref
) {
  const [scanning, setScanning] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(ref, () => ({
    openFilePicker: () => fileInputRef.current?.click(),
  }));

  const clearAiResult = useCallback(() => {
    setAiResult(null);
    setPreviewUrl(null);
  }, []);

  const modalOpen = scanning || !!aiResult;
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  // Don't allow Escape to dismiss while we're mid-API call — that could look
  // like the request succeeded. Only wire dismiss when a result is on screen.
  useModalDismiss(!!aiResult && !scanning, clearAiResult, closeButtonRef);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
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
      setAiResult({
        identified: false,
        message: "Something went wrong. Try again or call (631) 203-1000!",
      });
    } finally {
      setScanning(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        id="library-pest-camera"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {(scanning || aiResult) && (
        <div
          role="dialog"
          aria-modal="true"
          aria-busy={scanning || undefined}
          aria-label={scanning ? "Identifying pest" : "Pest identification result"}
          className="fixed inset-0 z-[9999] bg-background/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up overflow-y-auto"
          onClick={(e) => !scanning && e.target === e.currentTarget && clearAiResult()}
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
                          <span
                            className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${
                              (AI_RISK_META[aiResult.riskLevel] ?? AI_RISK_META.Low).badge
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                (AI_RISK_META[aiResult.riskLevel] ?? AI_RISK_META.Low).dot
                              }`}
                            />
                            {aiResult.riskLevel}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/50">
                          <ShieldAlert size={14} className="text-green-400" />
                          Confidence: {aiResult.confidence}
                        </div>
                      </div>
                      <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={clearAiResult}
                        aria-label="Close identification result"
                        className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all shrink-0"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-1">
                          Active Season
                        </h4>
                        <p className="text-white/70 text-sm">{aiResult.season}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-1">
                          Expert Assessment
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed">{aiResult.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/plans"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all text-sm"
                      >
                        View Plans <ArrowRight size={16} />
                      </Link>
                      <Link
                        href="/#contact"
                        onClick={clearAiResult}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 hover:border-green-500/50 text-white font-semibold rounded-xl transition-all text-sm"
                      >
                        Get Free Inspection
                      </Link>
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
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl transition-all text-sm"
                      >
                        <Camera size={16} /> Try Again
                      </button>
                      <a
                        href="tel:6312031000"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all text-sm"
                      >
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
    </>
  );
});

export default PestIdentifyCapture;
