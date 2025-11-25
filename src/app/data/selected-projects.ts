export type SelectedProject = {
  slug: string;
  title: string;
  valueProp: string;
  tags: string[];
  url: string;
  image: string;
  award?: string;
};

export const selectedProjects: SelectedProject[] = [
  {
    slug: "brisa-bahia",
    title: "Brisa Bahía",
    valueProp: "Story-first retreat brand with booking-ready site.",
    tags: ["Branding", "Logo", "Web Design", "WordPress"],
    url: "/case-studies/brisa-bahia",
    image: "/case-studies/brisa-bahia/mockup-big-screen-tablet-mobile-webiste.webp",
  },
  {
    slug: "einfach-schee",
    title: "einfach-schee",
    valueProp: "End-to-end brand and site serving clients for years.",
    tags: ["Branding", "Web Design"],
    url: "https://einfach-schee.com",
    image: "/assets/misc/projects/einfach-schee.webp",
  },
  {
    slug: "virtuelles-fastnachtsmuseum",
    title: "Virtuelles Fastnachtsmuseum",
    valueProp: "Interactive digital exhibit brought to life with custom animations.",
    tags: ["Design", "Content", "Animation"],
    url: "https://virtuelles-fastnachtsmuseum.de",
    image: "/assets/misc/projects/virtuelles-fastnachtsmuseum.webp",
    award: "🏆 Award: German Media Award (Silver)",
  },
];
