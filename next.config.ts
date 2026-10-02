import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // old WordPress product URLs -> new product pages (keeps inbound links alive)
  async redirects() {
    return [
      { source: "/project/centrade-de-tratare-a-aerului", destination: "/produse/centrale-de-tratare-a-aerului", permanent: true },
      { source: "/project/:slug", destination: "/produse/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
