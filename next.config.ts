import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: i18n is handled via App Router [locale] folder structure and middleware
  // Do NOT add i18n config here - that's for Pages Router only
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // German domains → /de
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: '(welledgecreative\\.de|welledgecreative\\.com|well-edge-creative\\.de)',
          },
        ],
        destination: '/de',
        permanent: false,
      },
      // English domain → /en
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: '(well-edge-creative\\.com)',
          },
        ],
        destination: '/en',
        permanent: false,
      },
    ];
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  output: "standalone",
};

export default nextConfig;
