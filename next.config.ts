import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hrvnhcmvmkhcblbtuxvb.supabase.co",
      },
    ],
  },
};

export default nextConfig;
