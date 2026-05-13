import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  basePath: process.env.NODE_ENV === 'production' ? '/ametas' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ametas/' : '',
  trailingSlash: true,
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  
  // These keys must be at the TOP LEVEL in Next.js 15/16
  allowedDevOrigins: ['192.168.36.72', 'localhost:3000', 'localhost:3001'],
  
  // Disable dev indicators during development if needed, 
  // but removed 'appIsrStatus' which was causing the build error in Next.js 15+
  devIndicators: {
    buildActivity: false,
  } as any,
};

export default nextConfig;
