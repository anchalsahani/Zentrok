
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.vox-cdn.com"], // whitelist your image domain
  },
};

export default nextConfig;
