/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // 🔥 deaktiviert /_next/image Optimierung
  },
  assetPrefix: "/",   // relative Pfade für statisches Hosting
  basePath: "",        // leer, da Domain direkt auf /well-edge zeigt
};

module.exports = nextConfig; // ✅ CommonJS statt export default
