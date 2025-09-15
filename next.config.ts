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
        // Redirect non-www to www
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "punesoftwaretechnologies.com", // match non-www
          },
        ],
        destination: "https://www.punesoftwaretechnologies.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
