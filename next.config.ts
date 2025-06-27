import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dl.dropboxusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
