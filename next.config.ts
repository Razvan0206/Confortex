import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webp only: AVIF decoding of the hero delayed LCP paint by ~0.9 s under 4x CPU throttling (Lighthouse lcp-breakdown)
  images: { formats: ["image/webp"], qualities: [60, 75] },
  // old WordPress product URLs -> new product pages (keeps inbound links alive)
  async redirects() {
    return [
      { source: "/project/centrade-de-tratare-a-aerului", destination: "/produse/centrale-de-tratare-a-aerului", permanent: true },
      { source: "/project/:slug", destination: "/produse/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
