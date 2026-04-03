"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

const pests = [
  { emoji: "🦟", name: "Mosquito", href: "#contact" },
  { emoji: "🪳", name: "Cockroach", href: "#contact" },
  { emoji: "🐀", name: "Rat", href: "#contact" },
  { emoji: "🐭", name: "Mouse", href: "#contact" },
  { emoji: "🕷️", name: "Spider", href: "#contact" },
  { emoji: "🐜", name: "Ant", href: "#contact" },
  { emoji: "🛏️", name: "Bed Bug", href: "#contact" },
  { emoji: "🦗", name: "Tick", href: "#contact" },
  { emoji: "🐛", name: "Termite", href: "#contact" },
  { emoji: "🐝", name: "Wasp/Bee", href: "#contact" },
  { emoji: "🪰", name: "Fly", href: "#contact" },
  { emoji: "🌿", name: "Lanternfly", href: "#contact" },
];

export default function PestIdentifierModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up" 
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-surface border border-border w-full max-w-2xl rounded-2xl p-6 md:p-8 shadow-2xl relative flex flex-col max-h-[90vh]">
        <button 
          className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all" 
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-8 pr-8">
          <h2 className="text-3xl font-display font-bold text-white mb-2">What's Bugging You?</h2>
          <p className="text-white/60">Select the pest you're dealing with and we'll get you protected fast.</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4 overflow-y-auto pr-2 mb-6 hide-scrollbar flex-grow">
          {pests.map(pest => (
            <button
              key={pest.name}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${
                selected === pest.name 
                  ? "border-green-500 bg-green-500/10 scale-105 shadow-[0_0_15px_rgba(34,197,94,0.3)] ring-1 ring-green-500" 
                  : "border-white/10 hover:border-green-500/50 hover:bg-white/5 bg-background/50 hover:scale-105"
              }`}
              onClick={() => setSelected(pest.name)}
            >
              <span className="text-4xl mb-2 filter drop-shadow-md">{pest.emoji}</span>
              <span className={`text-sm font-semibold transition-colors ${selected === pest.name ? "text-green-400" : "text-white/80"}`}>{pest.name}</span>
            </button>
          ))}
        </div>

        {selected && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 animate-fade-in-up">
            <p className="text-white/90">Great! You selected: <strong className="text-green-400 text-lg">{selected}</strong></p>
            <a href="#contact" className="btn-primary w-full sm:w-auto justify-center py-2.5 px-6" onClick={onClose}>
              Get Treatment <ArrowRight size={16} />
            </a>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-white/10 text-center text-sm">
          <span className="text-white/50">Not sure? </span>
          <a href="tel:6312031000" className="text-green-400 font-semibold hover:text-green-300">
            Call us at (631) 203-1000
          </a>
        </div>
      </div>
    </div>
  );
}
