import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: undefined,
      allowedOrigins: undefined,
    },
  },
  images: {
    domains: ["imgs.search.brave.com", "upload.wikimedia.org", "i.ibb.co"],
  },
};

export default nextConfig;
