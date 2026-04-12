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
    image: "/blog-mosquito.png",
    content: `
      <p class="mb-6 text-lg text-white/80 leading-relaxed">Spring on Long Island brings warmer weather, blooming flowers... and the return of mosquitoes. By taking action in early spring, you can dramatically reduce the mosquito population around your home before summer begins.</p>
      
      <h3 class="text-2xl font-bold text-white mt-10 mb-4 tracking-tight">1. Eliminate Standing Water</h3>
      <p class="mb-6 text-white/70 leading-relaxed">Mosquitoes need standing water to breed. A single female mosquito can lay hundreds of eggs in a tiny bottle cap. Audit your yard for:</p>
      <ul class="list-disc pl-6 mb-8 text-white/70 space-y-2">
        <li>Clogged gutters filled with decaying leaves</li>
        <li>Bird baths (change water twice a week)</li>
        <li>Old tires, buckets, and kids' toys</li>
        <li>Tarps covering boats or patio furniture</li>
      </ul>

      <h3 class="text-2xl font-bold text-white mt-10 mb-4 tracking-tight">2. Maintain Your Landscaping</h3>
      <p class="mb-6 text-white/70 leading-relaxed">Adult mosquitoes escape the heat of the day by resting in tall grass, weeds, and thick vegetation. Keeping your lawn mowed and bushes trimmed reduces their hiding spots.</p>

      <h3 class="text-2xl font-bold text-white mt-10 mb-4 tracking-tight">3. Call the Professionals</h3>
      <p class="mb-6 text-white/70 leading-relaxed">While DIY methods are great for prevention, professional barrier treatments provide the ultimate defense. Squito Pest Control uses targeted treatments to safely eliminate mosquitoes on contact and repel them for weeks.</p>
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
    image: "/blog-termite.png",
    content: `
      <p class="mb-6 text-lg text-white/80 leading-relaxed">It's a homeowner's worst nightmare: spotting swarms of small flying insects indoors during the first warm days of spring. Are they termites preparing to feast on your foundation, or just flying ants looking to mate?</p>
      
      <h3 class="text-2xl font-bold text-white mt-10 mb-4 tracking-tight">Wing Size and Shape</h3>
      <p class="mb-6 text-white/70 leading-relaxed"><strong>Termites:</strong> Possess two sets of wings that are equal in length. Their wings are often twice as long as their bodies.</p>
      <p class="mb-6 text-white/70 leading-relaxed"><strong>Flying Ants:</strong> Have two sets of wings, but the front wings are notably larger than the hind wings.</p>

      <h3 class="text-2xl font-bold text-white mt-10 mb-4 tracking-tight">Antennae</h3>
      <p class="mb-6 text-white/70 leading-relaxed"><strong>Termites:</strong> Have straight, beaded antennae.</p>
      <p class="mb-6 text-white/70 leading-relaxed"><strong>Flying Ants:</strong> Have noticeably "bent" or elbowed antennae.</p>

      <div class="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl my-8">
        <h4 class="text-red-400 font-bold mb-2">When to Call an Expert</h4>
        <p class="text-white/80 text-sm">If you suspect termites, do not wait. Termite damage accounts for billions of dollars in structural damage annually. Contact Squito Pest Control immediately for a comprehensive termite inspection.</p>
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
    image: "/blog-mice.png",
    content: `
      <p class="mb-6 text-lg text-white/80 leading-relaxed">As winter sets in on Long Island, humans aren't the only ones looking to stay warm indoors. Mice drop their outdoor inhibitions and aggressively seek shelter, warmth, and food sources—making your home a prime target.</p>
      
      <h3 class="text-2xl font-bold text-white mt-10 mb-4 tracking-tight">The 1/4 Inch Rule</h3>
      <p class="mb-6 text-white/70 leading-relaxed">A house mouse can squeeze through a gap as small as a quarter of an inch—roughly the size of a dime. Because of their flexible skeletal structure, if their head fits, the rest follows.</p>

      <h3 class="text-2xl font-bold text-white mt-10 mb-4 tracking-tight">Common Entry Points to Seal</h3>
      <ul class="list-disc pl-6 mb-8 text-white/70 space-y-2">
        <li><strong>Weep Holes:</strong> These are meant to let moisture escape brick facades, but are perfect rodent doors. Use specialized covers or steel wool.</li>
        <li><strong>Utility Lines:</strong> Gaps where AC lines, pipes, and electrical cables enter the home.</li>
        <li><strong>Garage Door Seals:</strong> Damaged rubber sweeps at the bottom of doors.</li>
        <li><strong>Dryer Vents:</strong> Ensure they have tight-fitting external louvers.</li>
      </ul>

      <h3 class="text-2xl font-bold text-white mt-10 mb-4 tracking-tight">The Danger of DIY Rodent Control</h3>
      <p class="mb-6 text-white/70 leading-relaxed">Store-bought snap traps might catch a rogue mouse, but they rarely solve an infestation. Worse, over-the-counter poisons can result in rodents dying inside walls, creating unbearable odors. Professional exclusion combined with strategic trapping is the only permanent solution.</p>
    `
  }
];
