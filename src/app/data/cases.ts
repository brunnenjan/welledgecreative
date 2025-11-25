export type Case = {
  slug: string;
  title: string;
  client: string;
  sector: "Retreat" | "Education" | "Healthcare" | "Small Business" | "Music" | "Hospitality";
  year: string;
  role: string[];
  outcome: string;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  site?: string;
  color?: string;
  images: { src: string; alt: string }[];
};

export const cases: Case[] = [
  {
    slug: "brisa-bahia",
    title: "Brisa Bahía — Retreat brand & website",
    client: "Brisa Bahía",
    sector: "Retreat",
    year: "2025",
    role: ["Branding","Logo","Webdesign","Webdev (WordPress)"],
    outcome: "Clear offers, premium feel, booking-ready flow.",
    summary: "Story-first brand system and fast, mobile-first website on WordPress.",
    problem: "Needed a premium presence and a clear path to booking across devices.",
    approach: "Defined positioning and story, created logo suite & visual system, rebuilt existing WordPress site with smooth scroll depth.",
    result: "Visitors grasp the offer quickly and move confidently toward contact/booking.",
    site: "/case-studies/brisa-bahia",
    color: "#0B4216",
    images: [
      {
        src: "/case-studies/brisa-bahia/mockup-big-screen-tablet-mobile-webiste.webp",
        alt: "Brisa Bahía retreat center branding and website displayed on desktop, tablet and mobile devices",
      },
    ],
  },
  {
    slug: "einfach-schee",
    title: "einfach-schee — full brand & site",
    client: "einfach-schee",
    sector: "Small Business",
    year: "einfach schee, 2017 - heute",
    role: ["Branding","Logo","Webdesign","Webdev"],
    outcome: "Clear identity and website that's delivered value for years.",
    summary: "End-to-end brand & website as a solo creator.",
    problem: "Needed a clear brand and simple, maintainable website.",
    approach: "Logo & palette, brand kit, clean site structure.",
    result: "Sustained use and recognition over years.",
    images: [
      { src: "/assets/misc/projects/einfach-schee.webp", alt: "einfach-schee hero" },
    ],
  },
  {
    slug: "lisa-mary",
    title: "Lisa Mary — artist logo",
    client: "Lisa Mary",
    sector: "Music",
    year: "2019",
    role: ["Logo","Branding"],
    outcome: "Distinct mark used across merch and car branding.",
    summary: "Bold logo people recognize.",
    problem: "Artist needed a distinctive, versatile mark.",
    approach: "Iterated monogram/wordmark concepts; tested on merch.",
    result: "Adopted widely; consistent on merch and vehicle.",
    images: [
      { src: "/assets/misc/logos/lisa-mary.webp", alt: "Lisa Mary logo" },
    ],
  },
];
