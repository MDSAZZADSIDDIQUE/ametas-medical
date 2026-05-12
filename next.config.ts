import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // These keys must be at the TOP LEVEL in Next.js 15/16
  allowedDevOrigins: ['192.168.36.72', 'localhost:3000'],
  
  // Turning off the status indicators to reduce WebSocket traffic
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
