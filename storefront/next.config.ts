import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "italiacosmetics.com",
      },
    ],
  },
};

export default nextConfig;
