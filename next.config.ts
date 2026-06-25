import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.higgs.ai",
      },
      {
        protocol: "https",
        hostname: "d8j0ntlcm91z4.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "motionsites.ai",
      },
      {
        protocol: "https",
        hostname: "shrug-person-78902957.figma.site",
      },
      {
        protocol: "https",
        hostname: "svgl.app",
      },
    ],
  },
};

export default nextConfig;
