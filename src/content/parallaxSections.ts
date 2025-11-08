export type LayerConfig = {
  src: string;
  alt?: string;
  objectPosition?: string;
  priority?: boolean;
};

export type ParallaxConfig = {
  id: string;
  title?: string;
  heightVh: number;
  pin?: boolean;
  scrollEnd?: string;
  bucketStart?: number;
  bucketTravel?: number;
  bgTravel?: number;
  bucketSpeed?: number;
  bucketSize?: string;
  showBottomGradient?: boolean;
  debug?: boolean;
  foreground: LayerConfig;
  bucket: LayerConfig;
  background: LayerConfig;
};

const DEFAULT_BUCKET_START = -250;
const DEFAULT_BUCKET_TRAVEL = 40;
const DEFAULT_BG_TRAVEL = -18;
const DEFAULT_BUCKET_SPEED = 1;
const DEFAULT_BUCKET_SIZE = "clamp(30rem, 74vmin, 66rem)";

const IS_DEV = process.env.NODE_ENV !== "production";

export const PARALLAX_SECTIONS: ParallaxConfig[] = [
  {
    id: "bucket-discover",
    title: "DISCOVER",
    heightVh: 130,
    bucketStart: DEFAULT_BUCKET_START,
    bucketTravel: DEFAULT_BUCKET_TRAVEL,
    bgTravel: DEFAULT_BG_TRAVEL,
    bucketSpeed: DEFAULT_BUCKET_SPEED,
    bucketSize: DEFAULT_BUCKET_SIZE,
    debug: IS_DEV,
    foreground: {
      src: "/assets/parallax/section-discover/parallax-foreground-discover.webp",
      objectPosition: "center 55%",
    },
    bucket: {
      src: "/assets/parallax/section-discover/parallax-bucket-discover.webp",
      objectPosition: "center",
    },
    background: {
      src: "/assets/parallax/section-discover/parallax-bg-discover.webp",
      objectPosition: "center top",
    },
  },
  {
    id: "bucket-profile",
    title: "PROFILE",
    heightVh: 130,
    bucketStart: DEFAULT_BUCKET_START,
    bucketTravel: DEFAULT_BUCKET_TRAVEL,
    bgTravel: DEFAULT_BG_TRAVEL,
    bucketSpeed: DEFAULT_BUCKET_SPEED,
    bucketSize: "clamp(34rem, 80vmin, 70rem)",
    debug: IS_DEV,
    foreground: {
      src: "/assets/parallax/section-profile/parallax-foreground-profile.webp",
      objectPosition: "center 58%",
    },
    bucket: {
      src: "/assets/parallax/section-profile/parallax-bucket-profile.webp",
      objectPosition: "center",
    },
    background: {
      src: "/assets/parallax/section-profile/parallax-bg-profile.webp",
      objectPosition: "center 45%",
    },
  },
  {
    id: "bucket-design",
    title: "DESIGN",
    heightVh: 132,
    bucketStart: DEFAULT_BUCKET_START,
    bucketTravel: DEFAULT_BUCKET_TRAVEL,
    bgTravel: DEFAULT_BG_TRAVEL,
    bucketSpeed: DEFAULT_BUCKET_SPEED,
    bucketSize: "clamp(32rem, 76vmin, 68rem)",
    debug: IS_DEV,
    foreground: {
      src: "/assets/parallax/section-design/parallax-foreground-design.webp",
      objectPosition: "center 55%",
    },
    bucket: {
      src: "/assets/parallax/section-design/parallax-bucket-design.webp",
      objectPosition: "center",
    },
    background: {
      src: "/assets/parallax/section-design/parallax-bg-design.webp",
      objectPosition: "center 40%",
    },
  },
  {
    id: "bucket-deliver",
    title: "DELIVER",
    heightVh: 130,
    bucketStart: DEFAULT_BUCKET_START,
    bucketTravel: DEFAULT_BUCKET_TRAVEL,
    bgTravel: DEFAULT_BG_TRAVEL,
    bucketSpeed: DEFAULT_BUCKET_SPEED,
    bucketSize: DEFAULT_BUCKET_SIZE,
    debug: IS_DEV,
    foreground: {
      src: "/assets/parallax/section-deliver/parallax-foreground-deliver.webp",
      objectPosition: "center 55%",
    },
    bucket: {
      src: "/assets/parallax/section-deliver/parallax-bucket-deliver.webp",
      objectPosition: "center",
    },
    background: {
      src: "/assets/parallax/section-deliver/parallax-bg-deliver.webp",
      objectPosition: "center 42%",
    },
  },
];
