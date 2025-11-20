import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: i18n is handled via App Router [locale] folder structure and middleware
  // Do NOT add i18n config here - that's for Pages Router only
  images: {
    formats: ["image/avif", "image/webp"],
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
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  output: "standalone",
};

export default nextConfig;
