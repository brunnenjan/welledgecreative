export type LogoItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  variant?: "wide" | "tall" | "square";
};

export const logos: LogoItem[] = [
  { src: "/assets/misc/logos/ata-solo.webp", alt: "ATA Solo", width: 240, height: 240, variant: "square" },
  { src: "/assets/misc/logos/einfach-schee (1).webp", alt: "einfach-schee", width: 360, height: 180, variant: "wide" },
  { src: "/assets/misc/logos/freiheitszirkus.webp", alt: "Freiheitszirkus", width: 360, height: 180, variant: "wide" },
  { src: "/assets/misc/logos/kulturerbe-fastnacht.webp", alt: "Kulturerbe Fastnacht", width: 360, height: 180, variant: "wide" },
  { src: "/assets/misc/logos/wegmann-unternehmensberatung.webp", alt: "Wegmann Unternehmensberatung", width: 360, height: 180, variant: "wide" },
  { src: "/assets/misc/logos/lisa-mary.webp", alt: "Lisa Mary", width: 240, height: 240, variant: "square" },
  { src: "/assets/misc/logos/logo-black.webp", alt: "Well Edge Creative", width: 240, height: 240, variant: "square" },
  { src: "/assets/misc/logos/reutter-farms.webp", alt: "Reutter Farms", width: 300, height: 210, variant: "square" },
  { src: "/assets/misc/logos/rocklore.webp", alt: "Rocklore Irish Pub", width: 360, height: 180, variant: "wide" }
];
