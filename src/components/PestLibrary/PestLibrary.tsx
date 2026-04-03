"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

const pests = [
  { image: "/pests/pest_mosquito.png", name: "Mosquitoes", risk: "High", season: "Late Spring to Early Fall (Peaking July & August)", tip: "Mosquitoes thrive in warm, humid weather and breed rapidly in stagnant water. Female mosquitoes require a blood meal to produce eggs, making your backyard a prime hunting ground. Our approach focuses on disrupting their breeding cycle by eliminating standing water and applying specialized barrier sprays to surrounding foliage where they rest during the heat of the day." },
  { image: "/pests/pest_termite.png", name: "Termites", risk: "Critical", season: "Spring/Summer Swarming Season (Silent structural damage year-round)", tip: "Termites cause billions in property damage annually, silently eating the structural wood of your home from the inside out. By the time you notice them, the damage is often severe. We deploy industry-leading Sentricon® baiting stations around your property's perimeter. This system safely eliminates the entire subterranean colony directly at its source, protecting your biggest investment." },
  { image: "/pests/pest_cockroach.png", name: "Cockroaches", risk: "High", season: "Year-Round (Highly active indoors during winter)", tip: "Cockroaches are highly resilient scavengers that contaminate food and spread harmful bacteria. Because they prefer dark, damp environments like basements and kitchens, they are incredibly difficult to eradicate with over-the-counter products. We utilize advanced baiting matrices and targeted crack-and-crevice treatments to eliminate both the visible roaches and the hidden nests behind your walls." },
  { image: "/pests/pest_bedbug.png", name: "Bed Bugs", risk: "High", season: "Year-Round (Spikes during summer travel seasons)", tip: "Bed bugs are master hitchhikers that feed exclusively on human blood while you sleep. They hide effortlessly in mattress seams, baseboards, and electrical outlets. Traditional sprays are notoriously ineffective against them. We deploy rigorous, heat-based treatments and specialized chemical applications that penetrate their hiding spots, ensuring complete eradication without destroying your furniture." },
  { image: "/pests/pest_rat.png", name: "Rats", risk: "High", season: "Year-Round (Invasions peak heavily in late Fall and Winter)", tip: "Rats are highly intelligent, destructive rodents that gnaw through wires, insulation, and drywall to build nests when temperatures drop outside. They carry severe diseases and reproduce astonishingly fast. Our eradication protocol involves comprehensive structural exclusion to seal entry points, paired with strategic, tamper-resistant bait stations to completely clear the local population." },
  { image: "/pests/pest_wasp.png", name: "Stinging Pests", risk: "Medium", season: "Late Summer to Early Fall", tip: "As summer ends, wasp, hornet, and yellowjacket colonies reach maximum size and become highly aggressive. Attempting to remove a nest without professional equipment can result in severe, dangerous swarming. Our technicians safely neutralize active, high-elevation nests and utilize preventative treatments along rooflines to stop all stinging insects from returning the following year." },
  { image: "/pests/pest_mouse.png", name: "Mice", risk: "High", season: "Fall through Winter (Seeking shelter as temperatures drop)", tip: "House mice can squeeze through holes the size of a dime. While smaller than rats, they contaminate surfaces with urine and droppings constantly as they forage. We focus on a multi-pronged approach: identifying and sealing micro-entry points around your foundation, and employing strategic interior trapping to eliminate the active population without using harmful broadcast poisons indoors." },
  { image: "/pests/pest_ant.png", name: "Ants", risk: "Medium", season: "Early Spring through Fall", tip: "Ants live in massive colonies often hidden deep underground or within wall voids. Spraying visible ants only kills a tiny fraction of the problem and often causes the colony to split. We use highly attractive horizontal transfer baits—ants carry this bait back to the nest, feeding it to the queen, which permanently destroys the entire colony from the inside out." },
  { image: "/pests/pest_tick.png", name: "Ticks", risk: "High", season: "Early Spring through Late Fall", tip: "Ticks are dangerous parasites known for transmitting Lyme disease and Rocky Mountain spotted fever. They wait in tall grass and low brush, latching onto passing humans and pets. Our local control program involves specialized yard barrier sprays that drastically reduce tick populations by up to 90%, creating a safe, protected zone around your property boundaries." },
  { image: "/pests/pest_spider.png", name: "Spiders", risk: "Medium", season: "Late Summer through Fall", tip: "As the weather cools, spiders move indoors seeking warmth and prey. While most house spiders are harmless, their webs are an unsightly nuisance and can indicate the presence of other insect populations they feed on. We clear existing webs and apply a protective perimeter barrier treatment to deter them from building new webs around your windows, eaves, and foundation." },
  { image: "/pests/pest_lanternfly.png", name: "Lanternflies", risk: "High", season: "Late Summer through First Frost", tip: "The Spotted Lanternfly is a highly destructive, invasive species that decimates local trees and crops by aggressively feeding on plant sap. They also excrete a sticky residue that causes dangerous mold growth on bark. We combat them by physically removing egg masses and applying targeted systemic tree treatments or direct-contact sprays depending on the severity of the infestation." },
  { image: "/pests/pest_flea.png", name: "Fleas", risk: "Medium", season: "Spring through Fall (Can survive indoors year-round)", tip: "Fleas typically enter your home via pets or wild yard animals, rapidly reproducing in carpets, bedding, and upholstery. Their bites cause severe itching and can transmit tapeworms. Complete eradication requires a simultaneous, coordinated approach: treating your pets, deep-cleaning the interior, and applying specialized insect growth regulators (IGRs) to your yard to break their life cycle permanently." },
];

export default function PestLibrary() {
  const [selected, setSelected] = useState<(typeof pests)[0] | null>(null);
  const [search, setSearch] = useState("");

  const filtered = pests.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-24 bg-surface" id="pest-library">
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
            Click on any pest to learn about the risk level and how we treat it.
          </p>
          <div className="relative w-full max-w-md">
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
            <p className="text-white/60 mb-6 px-6">Don't worry, if it's bugging you, we most likely cover it! We handle dozens of specific unlisted pest variants across Long Island.</p>
            <a href="#contact" className="btn-primary">
              Contact Us for a Custom Quote
            </a>
          </div>
        )}

        {/* Info panel */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-card w-full max-w-3xl rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
              <div 
                className="w-full md:w-2/5 h-48 md:h-auto bg-cover bg-center shrink-0 border-b md:border-b-0 md:border-r border-border relative"
                style={{ backgroundImage: `url(${selected.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 md:hidden to-transparent" />
              </div>
              <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-display font-bold text-white">{selected.name}</h3>
                  <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all">
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

        <div className="text-center mt-12 text-white/50 text-sm">
          And much more... <a href="#contact" className="text-green-400 hover:text-green-300 font-medium">Call today!</a>
        </div>
      </div>
    </section>
  );
}
