import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-24c34059b34943d1a950bfdb90169a52.r2.dev",
        port: "",
        pathname: "/**", // Allow all paths
      },
    ],
  },
};

export default nextConfig;
