/* jshint esversion: 6 */
import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: '"cloud.appwrite.io"',
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "api.veve.dev",
      },
    ],
  },
};

export default nextConfig;
