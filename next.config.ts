import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'tickora-imagenes-evento.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'tickora-imagenes-eventos-prod.s3.us-east-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
