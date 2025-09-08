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
  async redirects() {
    return [
      {
        source: "/:path*", // match all paths
        destination: "https://www.punesoftwaretechnologies.com/:path*", // redirect to non-www
        permanent: true, // 301 redirect
        has: [
          {
            type: "host",
            value: "www.punesoftwaretechnologies.com", // only if host is www
          },
        ],
      },
    ];
  },
};

export default nextConfig;
