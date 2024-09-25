/* jshint esversion: 6 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '"dash.fayevr.dev"',
      },
    ],
  },
};

export default nextConfig;