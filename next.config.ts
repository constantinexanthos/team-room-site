import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence "multiple lockfiles" warning when this site lives under the
  // user's home dir (which has its own package-lock.json).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
