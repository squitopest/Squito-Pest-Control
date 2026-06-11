export type Review = {
  name: string;
  town: string;
  stars: number;
  text: string;
  excerpt: string;
  date: string;
  featured?: boolean;
};

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Squito+-+Smart.+Safe.+Pest+Control#lrd=0x8920f6ac750cdccf:0xf5c5b4451a660a15,1,,,,";

export type ReviewPlatformId = "google" | "yelp" | "thumbtack";

export type ReviewPlatform = {
  id: ReviewPlatformId;
  label: string;
  url: string;
};

export const REVIEW_PLATFORMS: ReviewPlatform[] = [
  { id: "google", label: "Google", url: GOOGLE_REVIEWS_URL },
  { id: "yelp", label: "Yelp", url: "https://www.yelp.com/biz/squito-saint-james-2" },
  {
    id: "thumbtack",
    label: "Thumbtack",
    url: "https://www.thumbtack.com/ny/saint-james/exterminators/squito-smart-safe-pest-control/service/545675989991612425",
  },
];

export const reviews: Review[] = [
  {
    name: "Aleksis Knel",
    town: "Huntington",
    stars: 5,
    text: "We called Squito yesterday after spotting a pest in our bathroom, and they were amazing! They came within just a few hours no nonsense, no trying to upsell things we didn't need. Straightforward, professional, and efficient. They took care of everything quickly and cleaned up after. Honestly such a relief and a great experience. Highly recommend!",
    excerpt:
      "They came within just a few hours — no nonsense, no upsell. Straightforward, professional, and efficient.",
    date: "6 months ago",
    featured: true,
  },
  {
    name: "James Turzer",
    town: "Massapequa",
    stars: 5,
    text: "My highest recommendation for Squito. He was fast, reasonably priced, and very professional. A perfect job well done.",
    excerpt: "Fast, reasonably priced, and very professional. A perfect job well done.",
    date: "6 months ago",
  },
  {
    name: "Chris Sweeney",
    town: "Smithtown",
    stars: 5,
    text: "We had a hornets nest in a kitchen exhaust vent about 15 ft off the ground. Marc responded promptly and arrived as promised. He treated the exterior and the interior to insure he eliminated the hazard. He did a thorough job at a very reasonable price. Marc also gave us some pointers to keep them out. We would highly recommend him and wouldn't hesitate to use his company again.",
    excerpt:
      "Marc responded promptly and arrived as promised. Thorough job at a very reasonable price.",
    date: "6 months ago",
  },
  {
    name: "Colleen Mckeever",
    town: "Babylon",
    stars: 5,
    text: "I recently used Squito for a pest issue in my home, and I couldn't be happier with the service. From the first call, the customer service was professional and responsive. The technician, Mark was punctual, knowledgeable, and took the time to explain everything he was doing. What stood out most was that he used pet-safe products, which was a huge relief since I have two dogs at home.",
    excerpt:
      "Pet-safe products were a huge relief — punctual, knowledgeable, and explained everything clearly.",
    date: "10 months ago",
  },
  {
    name: "ChelbyV D",
    town: "Commack",
    stars: 5,
    text: "We've been using Squito Pest Control for a while now, and we can't recommend Marc enough! Marc is incredibly reliable and always texts me a few minutes before arriving so I can get our two little yappers inside. With our dogs and chickens free-roaming, it's essential that only pet-safe treatments are used. Marc uses organic compounds in our yard, and it's clear he truly cares about the safety of our animals.",
    excerpt:
      "Reliable, texts before arriving, and uses organic compounds safe for our dogs and chickens.",
    date: "8 months ago",
  },
  {
    name: "Tesha Dale",
    town: "Nassau County",
    stars: 5,
    text: "I had a great experience with Squito. The team was professional, punctual, and very thorough. They communicated clearly, explained what needed to be done, and followed through exactly as promised. What stood out most was the attention to detail and the friendly attitude. Everything was handled quickly and efficiently, and the results were even better than I expected. Pricing was fair and transparent.",
    excerpt: "Professional, punctual, and thorough. Pricing was fair and transparent.",
    date: "7 months ago",
  },
];

const HOMEPAGE_REVIEW_NAMES = [
  "Aleksis Knel",
  "Chris Sweeney",
  "Colleen Mckeever",
  "ChelbyV D",
] as const;

/** Curated set for the homepage sticky-stack (keeps scroll length manageable) */
export const homepageReviews: Review[] = HOMEPAGE_REVIEW_NAMES.flatMap((name) => {
  const review = reviews.find((r) => r.name === name);
  return review ? [review] : [];
});
