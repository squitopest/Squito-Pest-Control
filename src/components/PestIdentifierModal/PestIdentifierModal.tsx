"use client";

import { useState } from "react";
import { X, ArrowRight, ShieldAlert } from "lucide-react";

const pests = [
  { image: "/pests/pest_mosquito.png", name: "Mosquitoes", risk: "High", tip: "Rapidly breed in stagnant water. Dangerous carriers of disease requiring specialized barrier sprays to eradicate." },
  { image: "/pests/pest_termite.png", name: "Termites", risk: "Critical", tip: "Silently destroy structural wood from the inside out. By the time they are seen, the damage is already severe." },
  { image: "/pests/pest_cockroach.png", name: "Cockroaches", risk: "High", tip: "Highly resilient scavengers that spread harmful bacteria throughout your kitchen and food prep surfaces." },
  { image: "/pests/pest_bedbug.png", name: "Bed Bugs", risk: "High", tip: "Horrific parasites that hide in mattress seams and feed exclusively on human blood while you sleep." },
  { image: "/pests/pest_rat.png", name: "Rats", risk: "High", tip: "Destructive, intelligent rodents that gnaw through wires and drywall while spreading dangerous diseases." },
  { image: "/pests/pest_wasp.png", name: "Stinging Pests", risk: "Medium", tip: "Yellowjackets, hornets, and wasps form highly aggressive colonies that pose severe swarming dangers." },
  { image: "/pests/pest_mouse.png", name: "Mice", risk: "High", tip: "Micro-scavengers that can squeeze through holes the size of a dime, constantly contaminating surfaces." },
  { image: "/pests/pest_ant.png", name: "Ants", risk: "Medium", tip: "Massive hidden colonies requiring advanced queen-extermination baits to prevent constant interior swarms." },
  { image: "/pests/pest_tick.png", name: "Ticks", risk: "High", tip: "Dangerous yard parasites waiting in the grass to latch onto humans and pets, known for transmitting Lyme disease." },
  { image: "/pests/pest_spider.png", name: "Spiders", risk: "Medium", tip: "Unnerving arachnids that infiltrate structural voids and corners, building unsightly webs around the property." },
  { image: "/pests/pest_lanternfly.png", name: "Lanternflies", risk: "High", tip: "Highly destructive invasive bugs that multiply endlessly and decimate expensive yard foliage and trees." },
  { image: "/pests/pest_flea.png", name: "Fleas", risk: "Medium", tip: "Rapid-reproducing parasites that attack household pets and burrow deep into carpets and upholstery." },
];

export default function PestIdentifierModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<(typeof pests)[0] | null>(null);

  // Close modal when user clicks a link to the plans page
  const handleScrollToPlans = () => {
    onClose();
    setTimeout(() => {
      window.location.hash = "#plans";
    }, 100);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up" 
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-surface border border-border w-full max-w-4xl rounded-2xl p-6 md:p-8 shadow-2xl relative flex flex-col max-h-[90vh]">
        <button 
          className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all z-50" 
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-8 pr-8 shrink-0">
          <h2 className="text-3xl font-display font-bold text-white mb-2">Identify Your Target</h2>
          <p className="text-white/60">Match the pest you are dealing with to our database.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 overflow-hidden flex-grow relative">
          
          {/* Visual Grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 max-h-[50vh] md:max-h-full gap-3 overflow-y-auto pr-2 hide-scrollbar transition-all duration-300 ${selected ? "md:w-1/2" : "w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-6"}`}>
            {pests.map((pest, i) => (
              <button
                key={i}
                className={`relative aspect-square rounded-xl overflow-hidden bg-cover bg-center border transition-all duration-300 group ${
                  selected?.name === pest.name 
                    ? "border-green-500 ring-2 ring-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)] scale-[1.02] z-10" 
                    : "border-white/10 hover:border-green-500/50 cursor-pointer opacity-70 hover:opacity-100"
                }`}
                onClick={() => setSelected(pest)}
                style={{ backgroundImage: \`url(\${pest.image})\` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent transition-opacity" />
                <span className="absolute bottom-3 left-0 w-full text-center font-display font-bold text-white text-sm tracking-wide">
                  {pest.name}
                </span>
              </button>
            ))}
          </div>

          {/* Interactive Threat Panel */}
          {selected && (
            <div className="md:w-1/2 flex flex-col justify-between bg-black/40 border border-white/5 rounded-2xl p-6 overflow-y-auto animate-fade-in-up">
              <div>
                 <div className="flex items-center gap-3 mb-4">
                   <h3 className="text-3xl font-display font-bold text-white">{selected.name}</h3>
                   <span className={\`text-xs font-bold px-3 py-1 rounded-full border \${
                     selected.risk === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                     selected.risk === 'High' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                     'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                   }\`}>
                     Danger: {selected.risk}
                   </span>
                 </div>
                 
                 <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm leading-relaxed">
                   <ShieldAlert size={16} className="text-amber-500 mb-2 inline-block mr-2" />
                   <strong className="text-white/90 font-semibold tracking-wide uppercase text-xs">Threat Profile:</strong><br/>
                   {selected.tip}
                 </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-xl p-5 text-center mt-auto">
                 <p className="text-white font-bold mb-4">Don't let them take over your property.</p>
                 <button 
                  onClick={handleScrollToPlans}
                  className="w-full relative overflow-hidden inline-flex items-center justify-center px-6 py-4 font-bold text-white uppercase tracking-wider transition-all duration-300 bg-green-500 rounded-xl hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] group"
                 >
                   <span className="relative z-10 flex items-center gap-2">
                     View Protection Plans <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                   </span>
                 </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-sm shrink-0">
          <span className="text-white/50">Can't identify it? </span>
          <a href="tel:6312031000" className="text-green-400 font-semibold hover:text-green-300">
            Call us at (631) 203-1000
          </a>
        </div>
      </div>
    </div>
  );
}
