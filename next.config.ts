/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization for AVIF/WebP support
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Caching headers for static assets
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Production optimization
  output: 'standalone',
};

module.exports = nextConfig;
