export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  seoDescription: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "prepare-yard-mosquito-season",
    title: "How to Prepare Your Long Island Yard for Mosquito Season",
    excerpt: "Spring is here, which means mosquito season is just around the corner. Learn exactly what to clear out of your yard to eliminate breeding grounds before they hatch.",
    seoDescription: "Learn the top tips for preparing your Long Island yard for mosquito season. Eliminate breeding grounds and protect your family from mosquito bites.",
    date: "Mar 15, 2026",
    category: "Prevention",
    readTime: "5 min read",
    image: "/blog-mosquito.jpg",
    content: `
      <p class="mb-6 text-lg text-white/80 leading-relaxed">Spring on Long Island brings warmer weather, blooming flowers, and the return of one of the region's most persistent pests — the mosquito. Every year, Nassau and Suffolk County residents battle these bloodsuckers from May through October. But what if you could dramatically cut their numbers before the first bite? The answer lies in preparation.</p>
      
      <p class="mb-8 text-white/70 leading-relaxed">By taking a few proactive steps in early spring, you can reduce the mosquito population around your home by up to 80%. Here's your complete guide to getting ahead of mosquito season on Long Island.</p>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">1. Eliminate Standing Water — Their Breeding Ground</h2>
      <p class="mb-4 text-white/70 leading-relaxed">This is the single most impactful thing you can do. Mosquitoes don't need a pond — a single female can lay up to 300 eggs in a space as small as a bottle cap filled with rainwater. Walk your entire property and audit these common culprits:</p>
      <ul class="list-disc pl-6 mb-8 text-white/70 space-y-3">
        <li><strong class="text-white">Clogged gutters</strong> — Decaying leaves create perfect stagnant pools along your roofline. Clean them out before April.</li>
        <li><strong class="text-white">Bird baths</strong> — Beautiful, but deadly if left unchanged. Flush and refill at least twice a week.</li>
        <li><strong class="text-white">Kids' toys and garden pots</strong> — Overturned frisbees, sand pails, and planter saucers all collect water after rain.</li>
        <li><strong class="text-white">Tarps and covers</strong> — Boat covers, grill covers, and pool tarps develop pockets of standing water.</li>
        <li><strong class="text-white">Tire swings and old tires</strong> — The curved interior of a tire is one of the most prolific mosquito nurseries in suburban yards.</li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">2. Maintain Your Landscaping</h2>
      <p class="mb-4 text-white/70 leading-relaxed">Adult mosquitoes spend the hottest hours of the day hiding in tall grass, overgrown hedges, and dense vegetation. By keeping your landscape trimmed, you eliminate their daytime resting spots and make your yard far less hospitable.</p>
      <ul class="list-disc pl-6 mb-8 text-white/70 space-y-3">
        <li>Mow your lawn weekly during peak season</li>
        <li>Trim hedges and bushes away from the foundation of your home</li>
        <li>Clear leaf litter and debris from garden beds</li>
        <li>Thin out dense ground cover like ivy, which traps moisture and shade</li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">3. Consider Natural Deterrents</h2>
      <p class="mb-4 text-white/70 leading-relaxed">While no plant alone will keep mosquitoes away, certain species can help when combined with other methods. Citronella, lavender, basil, and marigolds are all known to have mild repellent properties. Plant them along walkways, near patios, and around outdoor dining areas for an extra layer of defense.</p>
      <p class="mb-8 text-white/70 leading-relaxed">Bat houses and purple martin birdhouses can also attract natural mosquito predators to your property. A single bat can eat up to 1,000 mosquitoes per hour.</p>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">4. Understand Long Island's Mosquito Calendar</h2>
      <p class="mb-4 text-white/70 leading-relaxed">Long Island's mosquito season typically follows this pattern:</p>
      <ul class="list-disc pl-6 mb-8 text-white/70 space-y-3">
        <li><strong class="text-white">April–May:</strong> First eggs begin hatching as temperatures consistently hit 50°F+</li>
        <li><strong class="text-white">June–August:</strong> Peak season — populations explode after summer rain events</li>
        <li><strong class="text-white">September–October:</strong> Activity declines but doesn't disappear until the first hard frost</li>
      </ul>
      <p class="mb-8 text-white/70 leading-relaxed">The ideal time to start your prevention plan is <strong class="text-white">late March through mid-April</strong> — before the first generation of larvae fully matures.</p>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">5. When DIY Isn't Enough — Call in Professional Barrier Treatments</h2>
      <p class="mb-4 text-white/70 leading-relaxed">DIY prevention is essential, but it has limits. Professional mosquito barrier treatments are the gold standard for Long Island homeowners who want to actually enjoy their yards all summer without getting eaten alive.</p>
      <p class="mb-4 text-white/70 leading-relaxed">At Squito Pest Control, our technicians apply targeted, pet-safe barrier sprays to your entire yard perimeter, vegetation, and known breeding areas. These treatments:</p>
      <ul class="list-disc pl-6 mb-8 text-white/70 space-y-3">
        <li>Kill mosquitoes on contact</li>
        <li>Create a residual repellent barrier that lasts 3–4 weeks</li>
        <li>Are safe for children, pets, and pollinators when applied correctly</li>
        <li>Can reduce mosquito activity by up to 90% per treatment cycle</li>
      </ul>

      <div class="bg-green-500/10 border border-green-500/30 p-6 rounded-2xl my-10">
        <h4 class="text-green-400 font-bold text-lg mb-2">Ready to Take Back Your Yard?</h4>
        <p class="text-white/80 text-sm">Don't wait until you're covered in bites. Contact Squito Pest Control today for a free yard evaluation and get ahead of mosquito season before it starts.</p>
      </div>
    `
  },
  {
    slug: "flying-ants-vs-termites",
    title: "The Differences Between Flying Ants and Termites",
    excerpt: "Spotted flying insects in your home this spring? Don't panic yet. Here's how to easily tell the difference between harmless flying ants and home-destroying termites.",
    seoDescription: "How to tell the difference between flying ants and termites. A comprehensive guide with visual indicators for Long Island homeowners.",
    date: "Feb 28, 2026",
    category: "Identification",
    readTime: "4 min read",
    image: "/blog-termite.jpg",
    content: `
      <p class="mb-6 text-lg text-white/80 leading-relaxed">It's a homeowner's worst nightmare: you wake up one warm spring morning and find a cluster of small, winged insects swarming near your windowsill. Your stomach drops. Are these termites? Are they eating your house right now?</p>
      
      <p class="mb-8 text-white/70 leading-relaxed">Take a breath. While swarming termites are certainly cause for action, there's a very good chance you're looking at flying ants — which, while annoying, pose zero structural threat. Here's how to tell them apart with confidence.</p>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">The Wing Test</h2>
      <p class="mb-4 text-white/70 leading-relaxed">This is the fastest and most reliable way to identify what you're dealing with:</p>
      <ul class="list-disc pl-6 mb-8 text-white/70 space-y-3">
        <li><strong class="text-white">Termites:</strong> Have two pairs of wings that are <em>equal in length</em>. Their wings are often translucent and nearly twice as long as their body. They also shed their wings easily — you'll find scattered wings near windowsills.</li>
        <li><strong class="text-white">Flying Ants:</strong> Have two pairs of wings where the <em>front pair is noticeably larger</em> than the back pair. Their wings are more proportional to their body size.</li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">The Antenna Test</h2>
      <p class="mb-4 text-white/70 leading-relaxed">If you can get close enough (or use your phone's camera to zoom in), check the antennae:</p>
      <ul class="list-disc pl-6 mb-8 text-white/70 space-y-3">
        <li><strong class="text-white">Termites:</strong> Have straight, beaded antennae that look like a string of tiny pearls</li>
        <li><strong class="text-white">Flying Ants:</strong> Have distinctly bent or "elbowed" antennae with a sharp 90-degree angle</li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">The Body Shape Test</h2>
      <p class="mb-4 text-white/70 leading-relaxed">Look at the insect's midsection — this is a dead giveaway:</p>
      <ul class="list-disc pl-6 mb-8 text-white/70 space-y-3">
        <li><strong class="text-white">Termites:</strong> Have a broad, uniform waist. Their body is roughly the same width from head to abdomen — almost rectangular.</li>
        <li><strong class="text-white">Flying Ants:</strong> Have a dramatically pinched waist between their thorax and abdomen, giving them the classic "ant" hourglass figure.</li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Why Timing Matters on Long Island</h2>
      <p class="mb-4 text-white/70 leading-relaxed">Both termites and flying ants swarm in spring when temperatures rise and humidity increases. On Long Island, swarm season typically runs from late March through June. Termites tend to swarm on warm days following rain, usually between 10 AM and 2 PM. Flying ants typically swarm later in the season and are more scattered in their timing.</p>
      <p class="mb-8 text-white/70 leading-relaxed">If you're seeing swarms indoors — especially near your foundation, basement, or around wooden structures — that's a stronger indicator of termites, because it means the colony is likely <em>already established inside your home</em>.</p>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">The Cost of Getting It Wrong</h2>
      <p class="mb-4 text-white/70 leading-relaxed">Termite damage is no joke. According to the National Pest Management Association, termites cause over <strong class="text-white">$5 billion in property damage annually</strong> in the United States — and most homeowner's insurance policies don't cover it.</p>
      <p class="mb-8 text-white/70 leading-relaxed">A mature termite colony can consume up to 15 pounds of wood per week. By the time you notice visible damage — sagging floors, hollow-sounding wood, or crumbling drywall — the colony has likely been feeding for years.</p>

      <div class="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl my-10">
        <h4 class="text-red-400 font-bold text-lg mb-2">When to Call an Expert</h4>
        <p class="text-white/80 text-sm">If you suspect termites — or if you're simply not sure — do not wait. Contact Squito Pest Control immediately for a comprehensive termite inspection. We use advanced detection technology to locate colonies before they cause catastrophic damage. Early detection saves you thousands.</p>
      </div>
    `
  },
  {
    slug: "mice-in-winter-prevention",
    title: "Why Mice Enter Homes in the Winter and How to Stop Them",
    excerpt: "As temperatures drop on Long Island, rodents seek warmth and food. Discover the top 5 micro-entry points around your foundation and how to seal them properly.",
    seoDescription: "Prevent mice from entering your Long Island home this winter. Learn about micro-entry points and professional exclusion techniques.",
    date: "Jan 10, 2026",
    category: "Rodents",
    readTime: "6 min read",
    image: "/blog-mice.jpg",
    content: `
      <p class="mb-6 text-lg text-white/80 leading-relaxed">As winter settles over Long Island, you're not the only one looking to stay warm. Every fall and winter, thousands of Long Island homes become targets for house mice — tiny, determined rodents that can squeeze through openings you'd never think possible.</p>
      
      <p class="mb-8 text-white/70 leading-relaxed">Understanding why mice invade and where they get in is the first step to keeping them out permanently. This guide walks you through the science, the common entry points, and the professional solutions that actually work.</p>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Why Winter Drives Mice Indoors</h2>
      <p class="mb-4 text-white/70 leading-relaxed">House mice (<em>Mus musculus</em>) aren't built for cold weather. Unlike larger wildlife, they don't hibernate and have very little body fat to insulate them. When outdoor temperatures drop below 50°F, mice instinctively begin searching for three things:</p>
      <ul class="list-disc pl-6 mb-8 text-white/70 space-y-3">
        <li><strong class="text-white">Warmth</strong> — Your heated home radiates warmth through foundation cracks, creating a thermal beacon that mice can detect from surprising distances.</li>
        <li><strong class="text-white">Food</strong> — Even the crumbs under your toaster or a bag of dog food in the garage represent a feast.</li>
        <li><strong class="text-white">Shelter</strong> — Wall cavities, insulation, and cluttered storage areas provide perfect nesting material.</li>
      </ul>
      <p class="mb-8 text-white/70 leading-relaxed">A single pair of mice can produce up to <strong class="text-white">60 offspring per year</strong>. So that "one little mouse" you saw in November? By February, you could be hosting an entire colony.</p>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">The 1/4 Inch Rule</h2>
      <p class="mb-8 text-white/70 leading-relaxed">Here's the fact that shocks most homeowners: a house mouse can squeeze through a gap as small as <strong class="text-white">1/4 inch</strong> — roughly the diameter of a pencil. Their skulls are semi-flexible, and if the head fits, the rest of the body follows. This means gaps you've never noticed are wide-open doors for rodents.</p>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Top 5 Entry Points to Seal</h2>
      <p class="mb-4 text-white/70 leading-relaxed">During our inspections across Long Island, these are the entry points we find compromised most often:</p>
      
      <h3 class="text-xl font-bold text-white mt-8 mb-3">1. Weep Holes in Brick Facades</h3>
      <p class="mb-6 text-white/70 leading-relaxed">These small gaps in exterior brick are designed to let moisture escape. But they're perfectly sized for mice. Solution: install stainless steel weep hole covers that allow airflow but block rodents.</p>

      <h3 class="text-xl font-bold text-white mt-8 mb-3">2. Utility Line Penetrations</h3>
      <p class="mb-6 text-white/70 leading-relaxed">Where your AC lines, electrical cables, plumbing pipes, and gas lines enter the home, there's almost always a gap. These should be sealed with copper mesh and commercial-grade sealant — never expanding foam alone (mice chew right through it).</p>

      <h3 class="text-xl font-bold text-white mt-8 mb-3">3. Garage Door Seals</h3>
      <p class="mb-6 text-white/70 leading-relaxed">The rubber sweep at the bottom of your garage door deteriorates over time, creating gaps at the corners. Mice walk right underneath. Replace damaged sweeps annually and consider adding a rodent guard.</p>

      <h3 class="text-xl font-bold text-white mt-8 mb-3">4. Dryer Vents</h3>
      <p class="mb-6 text-white/70 leading-relaxed">External dryer vent flaps often get stuck open from lint buildup. This creates a warm, inviting tunnel directly into your home. Clean your dryer vent annually and ensure the external louver closes fully.</p>

      <h3 class="text-xl font-bold text-white mt-8 mb-3">5. Foundation Cracks</h3>
      <p class="mb-6 text-white/70 leading-relaxed">Even hairline cracks in your foundation can widen over time due to freeze-thaw cycles. Inspect your foundation perimeter every fall and patch any cracks wider than 1/4 inch.</p>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">Why DIY Traps Usually Fail</h2>
      <p class="mb-4 text-white/70 leading-relaxed">Store-bought snap traps and glue boards might catch a stray mouse, but they rarely solve an infestation. Here's why:</p>
      <ul class="list-disc pl-6 mb-8 text-white/70 space-y-3">
        <li>Traps only catch the boldest, most exploratory mice — the rest learn to avoid them</li>
        <li>Without sealing entry points, new mice replace the ones you catch</li>
        <li>Over-the-counter poisons can cause mice to die inside walls, creating terrible odors and attracting secondary pests</li>
        <li>Improper bait placement often results in zero catches despite heavy activity</li>
      </ul>

      <h2 class="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">The Professional Approach: Exclusion + Strategic Trapping</h2>
      <p class="mb-4 text-white/70 leading-relaxed">Professional rodent control isn't about setting better traps — it's about making your home impenetrable. At Squito Pest Control, our process includes:</p>
      <ul class="list-disc pl-6 mb-8 text-white/70 space-y-3">
        <li><strong class="text-white">Full exterior inspection</strong> — We walk your entire foundation perimeter, roofline, and utility entry points to identify every potential access point.</li>
        <li><strong class="text-white">Exclusion sealing</strong> — We seal all identified gaps with rodent-proof materials (copper mesh, steel wool, commercial sealants).</li>
        <li><strong class="text-white">Strategic interior trapping</strong> — Targeted placement along confirmed travel paths for rapid colony reduction.</li>
        <li><strong class="text-white">Follow-up monitoring</strong> — We return to verify the seal is holding and all activity has ceased.</li>
      </ul>

      <div class="bg-green-500/10 border border-green-500/30 p-6 rounded-2xl my-10">
        <h4 class="text-green-400 font-bold text-lg mb-2">Don't Wait Until You Hear Scratching in the Walls</h4>
        <p class="text-white/80 text-sm">If you've seen droppings, heard noises in your walls or ceiling, or spotted a mouse in your kitchen, the colony is likely already established. Contact Squito Pest Control for a professional exclusion inspection before the problem multiplies — literally.</p>
      </div>
    `
  }
];
